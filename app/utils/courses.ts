import { parseRecurringDateToString } from './date'

export const normalizeCourse = (course: ICourseWithEvents): ICourse => {
  const { events, ...courseWithoutEvents } = course

  const result = events.reduce<{
    lecturer: { [name: string]: number }
    start: { [date: string]: number }
    end: { [date: string]: number }
  }>(
    (counter, event) => {
      const { lecturer } = event
      const start = parseRecurringDateToString(event.start)
      const end = parseRecurringDateToString(event.end)

      return {
        lecturer: lecturer ? { ...counter.lecturer, [lecturer]: (counter.lecturer[lecturer] ?? 0) + 1 } : {},
        start: { ...counter.start, [start]: (counter.start[start] ?? 0) + 1 },
        end: { ...counter.end, [end]: (counter.end[end] ?? 0) + 1 },
      }
    },
    { lecturer: {}, start: {}, end: {} }
  )

  const findMostPopular = (key: 'lecturer' | 'start' | 'end') =>
    Object.keys(result[key]).find(
      (item, _, array) => !array.some((otherItem) => result[key][item] < result[key][otherItem])
    )

  const lecturer = findMostPopular('lecturer')
  const start = findMostPopular('start')
  const end = findMostPopular('end')

  return {
    ...courseWithoutEvents,
    start: start || course.start,
    end: end || course.end,
    lecturer: lecturer || course.lecturer,
  }
}

export const mapEventsToCourses = (events: IEvent[]): ICourse[] => {
  const courses = events.reduce<ICourseWithEvents[]>((courses, event) => {
    const foundCourseIndex = courses.findIndex((course) => course.name === event.name && course.type === event.type)

    if (foundCourseIndex < 0) {
      const { name, type, start, end, lecturer } = event
      const newCourse: ICourseWithEvents = {
        name,
        type,
        start,
        end,
        lecturer,
        platforms: {},
        additional: {},
        events: [event],
      }
      return [...courses, newCourse]
    }

    const foundCourse = courses[foundCourseIndex]

    return [
      ...courses.filter((_, index) => index !== foundCourseIndex),
      { ...foundCourse, events: [...foundCourse.events, event] },
    ]
  }, [])

  return courses.map((course) => normalizeCourse(course))
}
