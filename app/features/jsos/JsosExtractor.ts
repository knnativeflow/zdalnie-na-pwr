import { ICourse, WeekType } from 'domain/course'
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
  ) {}
}

class JsosExtractor {
  public async fetchCourseList(): Promise<ICourse[]> {
    await this.switchToActiveStudentIfNecessary()
    const { selector } = await jsosAuth.requestWithAuthorization({
      method: HttpMethod.GET,
      url: 'https://jsos.pwr.edu.pl/index.php/student/zajecia',
    })
    if (selector) {
      return selector('.dane-content tbody tr')
        .map((_, element) => {
          const courseCodeAndTitle = selector(element).find('td').eq(0)
          // @ts-ignore
          const [courseCode] = courseCodeAndTitle.html().split('<br>')
          const [, name] = courseCodeAndTitle.text().split(courseCode)
          const lecturer = selector(element).find('td').eq(1).text()
          const classesCode = selector(element).find('td').eq(2).text()
          const { start, end, isTP, isTN } = this.extractDate(selector, element)
          const hoursInSemester = selector(element).find('td').eq(4).text()
          const ECTSes = selector(element).find('td').eq(5).text()

          return {
            name,
            type: courseCode.slice(-1),
            start,
            end,
            lecturer,
            courseCode,
            classesCode,
            inWeeks: isTN ? WeekType.TN : isTP ? WeekType.TP : WeekType.ALL,
            hoursInSemester,
            ECTSes,
            platforms: {},
            note: '',
          }
        })
        .get()
    }

    throw new Error('Bład poczas parsowania strony z zajęciami.')
  }

  private extractDate(
    selector: CheerioSelector,
    element: CheerioElement
  ): { isTN: boolean; isTP: boolean; start: string; end: string } {
    const dateColumn = selector(element).find('td').eq(3)
    if(!dateColumn.text().trim().length ||  dateColumn.text().includes('Bez terminu')) {
      return { start: 'Bez terminu', end: 'Bez terminu', isTP: false, isTN: false }
    }

    const day = dateColumn.text().split(',')?.[0].trim()
    // @ts-ignore
    const [, hours] = dateColumn.html().replace(/<sup>/g, ':').replace(/<\/sup>/g, '').split(',')
    const [isTP, isTN] = [hours.includes('TP'), hours.includes('TN')]
    const [startHour, endHour] = hours.replace(/TP|TN/, '').trim().split('-')
    return {
      start: `${day} ${startHour}`,
      end: `${day} ${endHour}`,
      isTP,
      isTN,
    }
  }

  public async downloadCalendar(): Promise<string> {
    await this.switchToActiveStudentIfNecessary()

    const response = await jsosAuth.requestWithAuthorization({
      method: HttpMethod.GET,
      url: 'https://jsos.pwr.edu.pl/index.php/student/zajecia/iCalendar',
    })
    return response.body
  }

  private async switchToActiveStudentIfNecessary() {
    const { selector } = await jsosAuth.requestWithAuthorization({
      method: HttpMethod.GET,
      url: 'https://jsos.pwr.edu.pl/index.php/student/zajecia',
    })
    if (selector) {
      const selectedOption = selector('#wyborPK option').filter((_, element) => !!selector(element).attr('selected'))
      const isCurrentStudentActive = selector(selectedOption).text().includes('Aktywny')

      if(!isCurrentStudentActive) {
        const activeStudents = selector('#wyborPK option')
          .filter((_, element) => selector(element).text().includes('Aktywny'))
          .map((_, el) => selector(el).attr('value'))

        const activeStudentId = activeStudents[0]

        await jsosAuth.requestWithAuthorization({
          form: {
            idSluchacza: activeStudentId,
          },
          method: HttpMethod.POST,
          addCsrfToken: true,
          url: 'https://jsos.pwr.edu.pl/index.php/site/zmienPK',
        })
      }
    }
  }
}

export default new JsosExtractor()
