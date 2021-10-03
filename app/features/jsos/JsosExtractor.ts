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

export class EducationProgram {
  constructor(readonly name: string, readonly id: string) {}
}

class JsosExtractor {
  public async fetchActiveEducationPrograms(): Promise<EducationProgram[]> {
    const { selector } = await jsosAuth.requestWithAuthorization({
      method: HttpMethod.GET,
      url: 'https://jsos.pwr.edu.pl/index.php/student/zajecia',
    })

    if (selector) {
      const activeEducationPrograms: EducationProgram[] = []

      selector('#wyborPK option')
        .filter((_, element) => selector(element).text().includes('Aktywny'))
        .each((_, el) => {
          const value = selector(el).attr('value')
          if (value) {
            activeEducationPrograms.push(new EducationProgram(selector(el).text(), value))
          }
        })

      return activeEducationPrograms
    }
    throw new Error('Błąd podczas pobierania toków studiów.')
  }

  public async fetchCourseList(educationProgram: EducationProgram): Promise<ICourse[]> {
    await this.switchToActiveStudent(educationProgram)
    const { selector } = await jsosAuth.requestWithAuthorization({
      method: HttpMethod.POST,
      url: 'https://jsos.pwr.edu.pl/index.php/student/zajecia',
      form: {
        YII_CSRF_TOKEN: jsosAuth.csrfToken.value,
        idSemestru: '807',
      },
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
    if (!dateColumn.text().trim().length || dateColumn.text().includes('Bez terminu')) {
      return { start: 'Bez terminu', end: 'Bez terminu', isTP: false, isTN: false }
    }

    const day = dateColumn.text().split(',')?.[0].trim()
    // @ts-ignore
    const [, hours] = dateColumn
      .html()
      .replace(/<sup>/g, ':')
      .replace(/<\/sup>/g, '')
      .split(',')
    const [isTP, isTN] = [hours.includes('TP'), hours.includes('TN')]
    const [startHour, endHour] = hours.replace(/TP|TN/, '').trim().split('-')
    return {
      start: `${day} ${startHour}`,
      end: `${day} ${endHour}`,
      isTP,
      isTN,
    }
  }

  public async downloadCalendar(educationProgram: EducationProgram): Promise<string> {
    await this.switchToActiveStudent(educationProgram)

    const response = await jsosAuth.requestWithAuthorization({
      method: HttpMethod.GET,
      url: 'https://jsos.pwr.edu.pl/index.php/student/zajecia/iCalendar',
    })
    return response.body
  }

  private async switchToActiveStudent({ id }: EducationProgram) {
    await jsosAuth.requestWithAuthorization({
      form: {
        idSluchacza: id,
      },
      method: HttpMethod.POST,
      addCsrfToken: true,
      url: 'https://jsos.pwr.edu.pl/index.php/site/zmienPK',
    })
  }
}

export default new JsosExtractor()
