import jsosAuth, { HttpMethod } from './JsosAuth'

export class ExtractedCourse {
  constructor(
    readonly courseCode: string,
    readonly title: string,
    readonly tutor: string,
    readonly classesCode: string,
    readonly hoursInSemester: string,
    readonly ECTSes: string,
    readonly startDate: string,
    readonly endDate: string,
    readonly isTP: boolean,
    readonly isTN: boolean
  ) {
  }
}

class JsosExtractor {

  public async fetchCourseList(): Promise<ExtractedCourse[]> {
    await this.switchToActiveStudentIfNecessary()
    const { selector } = await jsosAuth.requestWithAuthorization({
      method: HttpMethod.GET,
      url: 'https://jsos.pwr.edu.pl/index.php/student/zajecia'
    })

    if (selector) {
      return selector('.dane-content tbody tr').map((_, element) => {
        const courseCodeAndTitle = selector(element).find('td').eq(0)
        const [courseCode] = courseCodeAndTitle.html().split('<br>')
        const [,title] = courseCodeAndTitle.text().split(courseCode)
        const tutor = selector(element).find('td').eq(1).text()
        const classesCode = selector(element).find('td').eq(2).text()
        const [day] = selector(element).find('td').eq(3).text().split(',')
        const [, hours] = selector(element).find('td').eq(3).html().replace(/<sup>/g, ':').replace(/<\/sup>/g, '').split(',')
        const [isTP, isTN] = [hours.includes('TP'), hours.includes('TN')]
        const [startHour, endHour] = hours.replace(/TP|TN/, '').trim().split('-')
        const hoursInSemester = selector(element).find('td').eq(4).text()
        const ECTSes = selector(element).find('td').eq(5).text()
        return new ExtractedCourse(
          courseCode,
          title,
          tutor,
          classesCode,
          hoursInSemester,
          ECTSes,
          `${day} ${startHour}`,
          `${day} ${endHour}`,
          isTP,
          isTN
          )
      }).get()
    } else {
      throw new Error('Bład poczas parsowania strony z zajęciami.')
    }
  }

  public async downloadCalendar(): Promise<string> {
    await this.switchToActiveStudentIfNecessary()

    const response = await jsosAuth.requestWithAuthorization({
      method: HttpMethod.GET,
      url: 'https://jsos.pwr.edu.pl/index.php/student/zajecia/iCalendar'
    })
    return response.body
  }

  private async switchToActiveStudentIfNecessary() {

    const { selector } = await jsosAuth.requestWithAuthorization({
      method: HttpMethod.GET,
      url: 'https://jsos.pwr.edu.pl/index.php/student/zajecia'
    })
    console.log(selector)
    if (selector) {

      const selectedOption = selector('#wyborPK option').filter((_, element) => !!selector(element).attr('selected'))
      const isCurrentStudentActive = selector(selectedOption).text().includes('Aktywny')
      console.log(isCurrentStudentActive)
      const activeStudents = selector('#wyborPK option').filter((_, element) => selector(element).text().includes('Aktywny')).map((_, el) => selector(el).attr('value'))
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
