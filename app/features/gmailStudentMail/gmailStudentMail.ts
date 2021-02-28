import imap from 'imap-simple'
import moment from 'moment'
import ical from 'node-ical'
import { Base64 } from 'js-base64'
import { IEventZoomLink } from 'domain/event'
import { SmailErrors } from 'features/studentMail/StudentMail'

interface Attachment {
  filename: string
  data: Buffer
}

class GmailStudentMail {
  private config: imap.ImapSimpleOptions | null = null

  private configImapFactory = (login: string, password: string): imap.ImapSimpleOptions => ({
    imap: {
      user: `${login}@student.pwr.edu.pl`,
      password,
      host: 'imap.gmail.com',
      port: 993,
      tls: true,
      tlsOptions: {
        rejectUnauthorized: false,
      },
      authTimeout: 5000,
    },
  })

  private parseFileToEvent(file: string) {
    const events = ical.sync.parseICS(file)

    const eventKeys = Object.keys(events)

    if (eventKeys.length !== 1) {
      console.error('StudentMail.ts', 'getEventFromMail', 'Invalid ical file', file)
      return null
    }

    const event = events[eventKeys[0]]

    if (!(event.start instanceof Date) || typeof event.summary !== 'string' || typeof event.description !== 'string') {
      console.error('StudentMail.ts', 'getEventFromMail', 'Invalid first event in ical file', event)
      return null
    }

    const foundUrl = event.description.match(/https:\/\/pwr-edu.zoom.us\/j\/[0-9]+(\?pwd=[a-zA-Z0-9]+)*/g)?.[0]

    if (!foundUrl || !event.summary || !event.start) {
      return null
    }

    return {
      url: foundUrl,
      courseName: event.summary,
      date: moment(event.start).format('YYYY-MM-DDTHH:mm:ss'),
    }
  }

  public async login(login: string, password: string) {
    try {
      const config = this.configImapFactory(login, password)
      await imap.connect(config)
      this.config = config
    } catch {
      throw new Error(SmailErrors.WRONG_LOGIN_PASSWORD)
    }
  }

  public async getZoomLinks(): Promise<IEventZoomLink[]> {
    if (!this.config) {
      throw new Error(SmailErrors.WRONG_LOGIN_PASSWORD)
    }

    return imap.connect(this.config).then((connection) => {
      moment.locale('en')

      return connection
        .openBox('INBOX')
        .then(() => {
          const searchQuery = [
            ['SUBJECT', 'Planowany termin'],
            ['SINCE', moment().subtract(1, 'weeks').format('MMMM DD, YYYY')],
          ]

          const fetchOptions = {
            bodies: ['HEADER.FIELDS (FROM TO SUBJECT DATE)'],
            struct: true,
            markSeen: false,
          }

          return connection.search(searchQuery, fetchOptions)
        })
        .then((messages) => {
          return messages.reduce<Promise<Attachment[]>>(async (promiseAgg, message) => {
            // @ts-ignore
            const parts = imap.getParts(message.attributes.struct) as { disposition?: { type: string } }[]
            const attachments = await promiseAgg

            const attachmentsFromCurrentMessage = await parts
              .filter((part) => part.disposition && part.disposition.type.toUpperCase() === 'ATTACHMENT')
              .reduce<Promise<Attachment[]>>(async (promiseAgg, part) => {
                const agg = await promiseAgg
                const file = await connection.getPartData(message, part).then((partData) => ({
                  // @ts-ignore
                  filename: part.disposition.params.filename as string,
                  data: partData as Buffer,
                }))

                return file.filename === 'ical.ics' ? [...agg, file] : agg
              }, Promise.resolve([]))

            return [...attachments, ...attachmentsFromCurrentMessage]
          }, Promise.resolve([]))
        })
        .then((attachments) =>
          attachments.reduce<IEventZoomLink[]>((events, attachment) => {
            const utf8File = Base64.fromUint8Array(attachment.data, true)
            const decodedFile = Base64.decode(utf8File)

            const event = this.parseFileToEvent(decodedFile)

            return event ? [...events, event] : events
          }, [])
        )
        .finally(() => {
          moment.locale('pl')
        })
    })
  }
}

export default new GmailStudentMail()
