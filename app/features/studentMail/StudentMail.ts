import superagent from 'superagent'
import moment from 'moment'
import cheerio from 'cheerio'
import ical from 'node-ical'
import { isRight } from 'fp-ts/Either'
import { IEventZoomLink } from 'domain/event'
import { ICourseTeamsLink } from 'domain/course'
import { loginResponseDecoder } from './decoders'

const STUDENT_MAIL_URL = 'https://s.student.pwr.edu.pl'

interface IBaseMail {
  id: number
  author: string
  topic: string
}

interface IFullMail {
  id: number
  authorName: string
  authorEmail: string
  topic: string
  content: string
}

const promiseTimeout = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

class StudentMail {
  private token = ''

  private static parseResponse(text: string): Promise<Array<unknown>> {
    const possiblyArrayAsString = text.replace('while(1);', '')
    // eslint-disable-next-line no-eval
    const possiblyArray = eval(possiblyArrayAsString)

    return Array.isArray(possiblyArray)
      ? Promise.resolve(possiblyArray)
      : Promise.reject(new Error('Unrecognized variable type.'))
  }

  private async getEventFromMail(mailId: number): Promise<IEventZoomLink> {
    const response = await superagent.get(`${STUDENT_MAIL_URL}/iwc/svc/wmap/attach/ical.ics`).query({
      token: this.token,
      mbox: 'INBOX',
      uid: mailId,
      number: 2,
      type: 'text',
      subtype: 'calendar',
      attachment: 1,
    })

    const events = ical.sync.parseICS(response.text)

    const eventKeys = Object.keys(events)

    if (eventKeys.length !== 1) {
      throw new Error('Unexpected ical file')
    }

    const event = events[eventKeys[0]]

    if (!(event.start instanceof Date) || typeof event.summary !== 'string' || typeof event.description !== 'string') {
      throw new Error('Invalid data in ical')
    }

    return {
      url: event.description.split('\n')[0],
      courseName: event.summary,
      date: moment(event.start).format('YYYY-MM-DDTHH:mm:ss'),
    }
  }

  public async login(username: string, password: string) {
    const response: superagent.Response = await superagent
      .post(`${STUDENT_MAIL_URL}/iwc/svc/iwcp/login.iwc`)
      .type('form')
      .send({
        username,
        password,
        'fmt-out': 'text/json',
      })

    const json: unknown = JSON.parse(response.text)
    const decoded = loginResponseDecoder.decode(json)

    if (!isRight(decoded)) {
      throw new Error('Błędna odpowiedź serwera poczty studenckiej')
    }

    const errorCode = decoded.right.iwcp['error-code']

    if (errorCode === '1') {
      throw new Error('Błędy login lub hasło')
    }

    if (errorCode !== '0') {
      throw new Error('Nieznany błąd')
    }

    this.token = decoded.right.iwcp.loginResponse?.appToken.split('=')[1] || ''
  }

  public async getZoomLinks(): Promise<IEventZoomLink[]> {
    const baseMailList = await this.getMailList(10, { subject: 'Planowany termin zdalnych zajęć' })

    return baseMailList.reduce<Promise<IEventZoomLink[]>>(async (promiseAgg, mail) => {
      const agg = await promiseAgg
      const event = await this.getEventFromMail(mail.id)

      await promiseTimeout(200)
      return [...agg, event]
    }, Promise.resolve([]))
  }

  public async getTeamsLinks(): Promise<ICourseTeamsLink[]> {
    const baseMailList = await this.getMailList(20, {
      subject: 'You have been added to a class team in Microsoft Teams',
      from: 'noreply@email.teams.microsoft.com',
      since: '29-Sep-2020',
    })

    return baseMailList.reduce<Promise<ICourseTeamsLink[]>>(async (promiseAgg, mail) => {
      const agg = await promiseAgg
      const fullMail = await this.getMail(mail)

      if (!fullMail) {
        return agg
      }

      const selector = cheerio.load(fullMail.content)

      const url = selector('a').attr('href') ?? ''
      const name = selector('h3').eq(1).text() ?? ''
      const code = name.match(/[A-Z]+[0-9]{2}-[0-9]{2}[a-z]+/g)?.[0] ?? ''

      await promiseTimeout(200)
      return [...agg, { name, code, url }]
    }, Promise.resolve([]))
  }

  private async getMailList(
    count: number,
    query: { subject?: string; since?: string; from?: string }
  ): Promise<IBaseMail[]> {
    let queryString = 'UNDELETED'

    if (query.subject) {
      queryString += ` SUBJECT "${query.subject}"`
    }

    if (query.from) {
      queryString += ` FROM "${query.from}"`
    }

    if (query.since) {
      queryString += ` SINCE "${query.since}"`
    }

    const response = await superagent.get(`${STUDENT_MAIL_URL}/iwc/svc/wmap/mbox.mjs`).query({
      rev: 3,
      sid: '',
      mbox: 'INBOX',
      count: count || 15,
      date: true,
      lang: 'pl',
      sortby: 'recv',
      sortorder: 'R',
      start: 0,
      srch: queryString,
      token: this.token,
    })

    const parsedResponse: Array<unknown> = await StudentMail.parseResponse(response.text)
    const mailList = parsedResponse[6]

    if (!Array.isArray(mailList)) {
      return Promise.reject(new Error('Unrecognized variable type.'))
    }

    return mailList.map<IBaseMail>((mail) => ({
      id: mail[0],
      author: mail[4],
      topic: mail[5],
    }))
  }

  public async getMail(mail: IBaseMail): Promise<IFullMail | null> {
    const response = await superagent.get(`${STUDENT_MAIL_URL}/iwc/svc/wmap/msg.mjs`).query({
      uid: mail.id,
      token: this.token,
      rev: 3,
      sid: '',
      mbox: 'INBOX',
      process: 'html%2Cjs%2Ctarget%2Cbinhex%2Clink',
      lang: 'pl',
      security: false,
    })

    const parsedResponse: Array<unknown> = await StudentMail.parseResponse(response.text)

    if (Array.isArray(parsedResponse[8]) && parsedResponse[8].length !== 3) {
      return null
    }

    // @ts-ignore
    const content = parsedResponse[8][1][6]

    return {
      id: mail.id,
      topic: mail.topic,
      authorName: mail.author,
      authorEmail: '',
      content,
    }
  }
}

const studentMail = new StudentMail()

export default studentMail
