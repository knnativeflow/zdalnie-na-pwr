import superagent from 'superagent'
import moment from 'moment'

const STUDENT_MAIL_URL = 'https://s.student.pwr.edu.pl'

interface ILoginResponse {
  iwcp: {
    'error-code': string
    message?: string | undefined
    loginResponse?: {
      message: string
      sessionIdKey: string
      appToken: string
      userLang: string
      cacheBustId: string
      nextURI: string
    }
  }
}

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

  private static findZoomLink(contentMail: string): IEventZoomLink {
    const startCourseNameIndex = contentMail.search('Zajęcia z ') + 10
    const endCourseNameIndex = contentMail.search(' w terminie ')
    const courseName = contentMail.substring(startCourseNameIndex, endCourseNameIndex)

    const startDateCourse = endCourseNameIndex + 12
    const endDateCourse = contentMail.search(' odbędą się za')
    const stringDate = contentMail.substring(startDateCourse, endDateCourse)
    const date = moment(stringDate, 'DD MMMM YYYY hh:mm').format('YYYY-MM-DDTkk:mm:ss')

    const startLinkIndex = contentMail.search('Link do spotkania:<BR><BR><A HREF="') + 35
    const endLinkIndex = contentMail.search('" target="l">https://pwr-edu.zoom.us')
    const link = contentMail.substring(startLinkIndex, endLinkIndex)

    return {
      courseName,
      date,
      link,
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
    const json: ILoginResponse = JSON.parse(response.text)

    // TODO: add decoder

    const errorCode = json.iwcp['error-code']

    if (errorCode !== '0') {
      if (errorCode === '1') {
        throw new Error('Błędy login lub hasło')
      }

      throw new Error('Nieznany błąd')
    }

    this.token = json.iwcp.loginResponse?.appToken.split('=')[1] || ''
  }

  public async getZoomLinks() {
    const baseMailList = await this.getMailList()
    const mailList = await Promise.all(baseMailList.map(async (mail) => this.getMail(mail)))

    return mailList.reduce<IEventZoomLink[]>((aggregate, mail) => {
      if (mail) {
        const foundLink = StudentMail.findZoomLink(mail.content)

        return foundLink ? [...aggregate, foundLink] : aggregate
      }

      return aggregate
    }, [])
  }

  private async getMailList(): Promise<IBaseMail[]> {
    const response = await superagent.get(`${STUDENT_MAIL_URL}/iwc/svc/wmap/mbox.mjs`).query({
      rev: 3,
      sid: '',
      mbox: 'INBOX',
      count: 60,
      date: true,
      lang: 'pl',
      sortby: 'recv',
      sortorder: 'R',
      start: 0,
      srch: 'UNDELETED SUBJECT "Planowany termin zdalnych zajęć"',
      token: this.token,
    })

    // TODO: add decoder
    const parsedResponse: Array<unknown> = await StudentMail.parseResponse(response.text)
    const mailList = parsedResponse[6]

    // TODO: remove after added decoder
    if (!Array.isArray(mailList)) {
      return Promise.reject(new Error('Unrecognized variable type.'))
    }

    return mailList.map<IBaseMail>((mail) => ({
      id: mail[0],
      author: mail[4],
      topic: mail[5],
    }))
  }

  private async getMail(mail: IBaseMail): Promise<IFullMail | null> {
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

    // TODO: add decoder
    const parsedResponse: Array<unknown> = await StudentMail.parseResponse(response.text)

    // TODO: handle case where length === 1
    if (Array.isArray(parsedResponse[8]) && parsedResponse[8].length !== 3) {
      return null
    }

    // TODO: fix after added decoder
    // @ts-ignore
    const authorEmail = parsedResponse[8][0][5][10][1].match(/([\w\.]+@pwr\.edu\.pl)/g)[0]
    // @ts-ignore
    const content = parsedResponse[8][1][6]

    return {
      id: mail.id,
      topic: mail.topic,
      authorName: mail.author,
      authorEmail,
      content,
    }
  }
}

const studentMail = new StudentMail()

export default studentMail
