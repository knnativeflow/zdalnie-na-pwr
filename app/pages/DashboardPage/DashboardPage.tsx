import React from 'react'
import { useSelector } from 'react-redux'
import moment from 'moment'

import useEventCompositeKey from 'hooks/useEventCompositeKey'
import useForceRender from 'hooks/useForceRender'
import EventInfo from 'components/EventInfo'
import { IEvent, IEventWithCourse } from 'domain/event'
import { RootState } from 'store'
import { eventColor, eventFullText } from 'utils/courseTypes'
import {
  ComingLessonsWrapper,
  EventInfoContent,
  EventInfoWrapper,
  EventItemButton,
  EventItemColor,
  EventItemName,
  EventItemTime,
  EventItemWrapper,
  EventsList,
  Title,
  Wrapper,
} from './DashboardPage.styled'

type EventItemProps = { event: IEventWithCourse; onClick: () => void }
const ONE_MINUTE_IN_MS = 1000 * 60

const EventItem = ({ event, onClick }: EventItemProps) => {
  const color = eventColor(event.type)
  const eventTypeFullText = eventFullText(event.type).toLowerCase()

  return (
    <EventItemWrapper>
      <EventItemButton type="button" onClick={onClick}>
        <EventItemColor color={color} />
        <EventInfoContent>
          <EventItemTime>
            {moment().isAfter(moment(event.start))
              ? 'w trakcie'
              : `${moment(event.start).fromNow()} ${eventTypeFullText}`}
          </EventItemTime>
          <EventItemName>{event.name}</EventItemName>
        </EventInfoContent>
      </EventItemButton>
    </EventItemWrapper>
  )
}

const isEndTimeAfterPresent = (event: IEvent) => new Date(event.end).getTime() > new Date().getTime()
const sortByEndTime = (a: IEvent, b: IEvent) => (new Date(a.end).getTime() > new Date(b.end).getTime() ? 1 : -1)

const DashboardPage = () => {
  useForceRender({ intervalTime: ONE_MINUTE_IN_MS })
  const { findEventByCompositeKey, setCompositeKey } = useEventCompositeKey()
  const events = useSelector((state: RootState) => state.events)
  const courses = useSelector((state: RootState) => state.courses)

  const comingEvents = events.filter(isEndTimeAfterPresent).sort(sortByEndTime).slice(0, 5)
  const comingEventsWithCourses: IEventWithCourse[] = comingEvents.map((event) => {
    const course = courses.find(({ classesCode }) => classesCode === event.code)

    return {
      ...event,
      course,
    }
  })

  const choosenEventInfo = comingEventsWithCourses.find(findEventByCompositeKey)
  return (
    <Wrapper>
      <ComingLessonsWrapper>
        <Title>Zbliżające się zajęcia</Title>
        <EventsList>
          {comingEventsWithCourses.map((event) => (
            <EventItem key={event.start + event.name} {...{ event }} onClick={() => setCompositeKey(event)} />
          ))}
        </EventsList>
      </ComingLessonsWrapper>
      <EventInfoWrapper>
        <EventInfo event={choosenEventInfo} />
      </EventInfoWrapper>
    </Wrapper>
  )
}

export default DashboardPage
