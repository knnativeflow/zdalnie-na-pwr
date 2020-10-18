import ical from 'ical'
import moment from 'moment'

const getEventsFromIcal = (path: string) => {
  return ical.parseFile(path)
}

const parseEvents = (icalEvents: ical.FullCalendar): IEvent[] => {
  return Object.keys(icalEvents).reduce<IEvent[]>((aggregateEvents: IEvent[], eventKey: string) => {
    const { start, end, summary, location, uid, description } = icalEvents[eventKey]

    if (start && end && uid) {
      return [
        ...aggregateEvents,
        {
          title: summary || '',
          start: moment(start).format('YYYY-MM-DDTkk:mm:ss'),
          end: moment(end).format('YYYY-MM-DDTkk:mm:ss'),
          allDay: false,
          resource: {
            summary: summary || '',
            description: description || '',
            location: location || '',
            uid,
            platform: {},
          },
        },
      ]
    }
    return aggregateEvents
  }, [])
}

const normalizeCourse = (course: ICourse) => {
  const { events } = course

  const result = events.reduce<{
    lecturer: { [name: string]: number }
    start: { [date: string]: number }
    end: { [date: string]: number }
  }>(
    (counter, event) => {
      const lecturer = event.resource.description
      const start = moment(event.start).format('dddd, kk:mm')
      const end = moment(event.end).format('dddd, kk:mm')

      const lecturerCounter = { ...counter.lecturer, [lecturer]: (counter.lecturer[lecturer] ?? 0) + 1 }
      const startCounter = { ...counter.start, [start]: (counter.start[start] ?? 0) + 1 }
      const endCounter = { ...counter.end, [end]: (counter.end[end] ?? 0) + 1 }

      return { lecturer: lecturerCounter, start: startCounter, end: endCounter }
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
    ...course,
    start: start || course.start,
    end: end || course.end,
    lecturer: lecturer || course.lecturer,
  }
}

const mapEventsToCourses = (events: IEvent[]): ICourse[] => {
  const courses = events.reduce<ICourse[]>((courses, event) => {
    const foundCourseIndex = courses.findIndex((course) => course.name === event.title)

    if (foundCourseIndex < 0) {
      const newCourse: ICourse = {
        name: event.title,
        type: event.title.substring(0, 1) as CourseType,
        start: moment(event.start).format('dddd, kk:mm'),
        end: moment(event.end).format('dddd, kk:mm'),
        lecturer: event.resource.description,
        events: [event],
        platforms: {},
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

const getCourses = (path: string) => {
  const iCalendarEvents = getEventsFromIcal(path)
  const events = parseEvents(iCalendarEvents)

  return mapEventsToCourses(events)
}

export default {
  getCourses,
}
