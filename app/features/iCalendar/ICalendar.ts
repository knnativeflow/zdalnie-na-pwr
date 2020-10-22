import ical, { VEvent } from 'node-ical'
import { parseDateToString } from 'helpers/date'

const getEventsFromIcalFile = (path: string) => {
  return ical.sync.parseFile(path)
}

const parseEvents = (icalEvents: ical.CalendarResponse): IEvent[] => {
  return Object.keys(icalEvents).reduce<IEvent[]>((aggregateEvents: IEvent[], eventKey: string) => {
    if (icalEvents[eventKey].type !== 'VEVENT') {
      return aggregateEvents
    }

    const { start, end, summary, description } = icalEvents[eventKey] as VEvent

    // TODO: add decoder

    if (start && end && summary && summary.length > 2) {
      return [
        ...aggregateEvents,
        {
          name: summary.substring(2),
          type: summary.substring(0, 1) as CourseType,
          code: null,
          start: parseDateToString(start),
          end: parseDateToString(end),
          lecturer: description || null,
          platform: {},
          additional: {},
        },
      ]
    }
    return aggregateEvents
  }, [])
}

const getEvents = (path: string): IEvent[] => {
  const iCalendarEvents = getEventsFromIcalFile(path)

  return parseEvents(iCalendarEvents)
}

export default {
  getEvents,
}
