import superagent from 'superagent'
import jsonp from 'superagent-jsonp'

const MAILER_URL = 'https://s.student.pwr.edu.pl'

class Mailer {
  private token: string = ''

  public async login() {
    const result: unknown = await superagent
      .post(`${MAILER_URL}/iwc/svc/iwcp/login.iwc`)
      .type('form')
      .send({
        username: '238481',
        password: 'iPhone50',
        chkpreloginip: true,
        token: 'badtoken',
        'fmt-out': 'text/json',
      })
    // .end()

    // if (result.) {
    //
    // }
    // console.log('token', JSON.parse(result.text).iwcp.loginResponse.appToken.split('=')[1])
    // eslint-disable-next-line prefer-destructuring
    this.token = JSON.parse(result.text).iwcp.loginResponse.appToken.split(
      '='
    )[1]
  }

  public async getListMail() {
    const result = await superagent.get(
      `${MAILER_URL}/iwc/svc/wmap/mbox.mjs?rev=3&sid=&mbox=INBOX&count=60&date=true&lang=pl&sortby=recv&sortorder=R&start=0&srch=UNDELETED&token=${this.token}`
    )
    // .use(jsonp)
    // .end((err, res) => {
    //   console.log('err', err)
    //   console.log('res', res)
    // })
    // .set('Content-Type', 'application/json')
    // .query({  })
    // .end()

    const step1 = result.text.split('\n').slice(2, -2).join('').slice(0, -1)
    const step2 = eval(step1)

    const mailIds = step2.reduce((foundIds, item) => {
      // planoway termin zdalnego spotkania
      if (item[5].search('Planowany termin zdalnych') > -1) {
        return [...foundIds, item[0]]
      }
      return foundIds
    }, [])

    return mailIds

    // const step2 = step1.replace(/\[/ig, '').replace(/\]/ig, '')
    // console.log('step2',step2)
    //
    // const step3 = step2.split(',')
    // console.log('step3',  step3)

    //   .forEach((line) => {
    //     console.log('1',line.split(',')[1])
    //   })
    // console.log('json', result.text.split(';')[1].split('\n'))
    // const temp = result.text.split(';')[1].split('\n')

    // console.log(temp[1])
    // const parser = new DOMParser()

    // const temp2 = parser.parseFromString(temp[2], 'text/html')
    // console.log(temp[])
    // console.log(result.text.split(';')[1])

    // console.log(JSON.parse(result.text))
  }

  public async getMail(id: number) {
    const result = await superagent.get(
      `${MAILER_URL}/iwc/svc/wmap/msg.mjs?rev=3&sid=&mbox=INBOX&uid=${id}&process=html%2Cjs%2Ctarget%2Cbinhex%2Clink&security=false&lang=pl&token=${this.token}`
    )

    // dla planowanego terminu spotkania a nie planowanego terminu zajec sa inne wartosci!!!
    const step1 = result.text.replace('while(1);', '') //.split('\n').slice(1).join('')
    const step2 = eval(step1)
    const step3 = step2[8][1][6]
    const step4 = step3.search('Zajęcia z ') //Spotkanie Wstep do inzy...

    const step5 = step3.search(' w terminie ') //w terminie
    const courseName = step3.substring(step4 + 10, step5)

    const step6 = step3.search(' odbędą się za') //odbedzie sie
    const time = step3.substring(step5 + 12, step6)

    // to dziala zawsze
    const step7 = step3.search('Link do spotkania:<BR><BR><A HREF="')
    const step8 = step3.search('" target="l">https://pwr-edu.zoom.us')

    const link = step3.substring(step7 + 35, step8)

    return {
      courseName,
      time,
      link,
    }
  }
}

const mailer = new Mailer()

export default mailer
