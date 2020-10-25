import jsosAuth, {HttpMethod} from './JsosAuth'

class JsosExtractor {


  public async downloadCalendar(): Promise<string> {
    await this.switchToActiveStudentIfNessecery()

    const response = await jsosAuth.requestWithAuthorization({
      method: HttpMethod.GET,
      url: 'https://jsos.pwr.edu.pl/index.php/student/zajecia/iCalendar'
    })
    return response.body
  }

  private async switchToActiveStudentIfNessecery() {

    const {selector} = await jsosAuth.requestWithAuthorization({
      method: HttpMethod.GET,
      url: 'https://jsos.pwr.edu.pl/index.php/student/zajecia'
    })
    console.log(selector)
    if (selector) {

      const selectedOption = selector('#wyborPK option').filter((_, element) => !!selector(element).attr('selected'))
      const isCurrentStudentActive = selector(selectedOption).text().includes('Aktywny')
      console.log(isCurrentStudentActive)
      const activeStudents = selector('#wyborPK option').filter((_,element) => selector(element).text().includes('Aktywny')).map((_, el)=> selector(el).attr('value'))
      console.log(activeStudents[0], typeof activeStudents[0])

      const activeStudentId = activeStudents[0]
      console.log('Aktywny student to:' + activeStudentId)

      await jsosAuth.requestWithAuthorization({
        form: {
          'idSluchacza': activeStudentId
        },
        method: HttpMethod.POST,
        addCsrfToken: true,
        url: 'https://jsos.pwr.edu.pl/index.php/site/zmienPK'
      })
    }

  }
}

export default new JsosExtractor()
