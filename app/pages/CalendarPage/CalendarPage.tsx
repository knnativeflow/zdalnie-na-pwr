import React, { useMemo } from 'react'
import { useSelector } from 'react-redux'
import styled from '@emotion/styled'

import Calendar from 'components/Calendar'
import { RootState } from 'store'

import { IEventFullCalendar } from 'domain/event'
import { eventColor } from 'utils/courseTypes'
import EventInfo from 'components/EventInfo'
import useEventCompositeKey from 'hooks/useEventCompositeKey'

const CalendarPageWrapper = styled.div`
  display: flex;
  height: 100%;
`

const CalendarWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 16px;
  height: 100%;
  overflow-y: auto;
`

const EventDetailsWrapper = styled.div`
  flex: 1;
  min-width: 500px;
  display: flex;
  flex-direction: column;
  background: #f5f9fd;
  overflow: auto;

  @media (max-width: 1200px) {
    min-width: 300px;
  }
`

const CalendarPage = () => {
  const { findEventByCompositeKey, setCompositeKey } = useEventCompositeKey()
  const events = useSelector((state: RootState) => state.events)
  const courses = useSelector((state: RootState) => state.courses)

  // TODO: move it to calendar component
  const parsedEvents = useMemo<IEventFullCalendar[]>(
    () =>
      events.reduce<IEventFullCalendar[]>((events, event) => {
        const course = courses.find(({ classesCode }) => classesCode === event.code)

        return [
          ...events,
          {
            start: event.start,
            end: event.end,
            title: event.name,
            color: eventColor(event.type),
            resource: { ...event, course },
          },
        ]
      }, []),
    [events, courses]
  )

  const choosenEventInfo = parsedEvents.map(({ resource }) => resource).find(findEventByCompositeKey)
  return (
    <>
      <CalendarPageWrapper>
        <CalendarWrapper>
          <Calendar events={parsedEvents} onEventClick={({ code, start }) => setCompositeKey({ code, start })} />
        </CalendarWrapper>
        <EventDetailsWrapper>
          <EventInfo event={choosenEventInfo} />
        </EventDetailsWrapper>
      </CalendarPageWrapper>
    </>
  )
}

export default CalendarPage
