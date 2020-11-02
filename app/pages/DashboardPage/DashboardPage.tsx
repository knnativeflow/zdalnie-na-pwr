import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import moment from 'moment'

import EventInfo from 'components/EventInfo'
import { IEvent } from 'domain/event'
import { RootState } from 'store'
import { eventColor } from 'utils/courseTypes'
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
  Wrapper,
  Title,
} from './DashboardPage.styled'

type EventItemProps = { event: IEvent; onClick: () => void }

const EventItem = ({ event, onClick }: EventItemProps) => {
  const color = eventColor(event.type)
  return (
    <EventItemWrapper>
      <EventItemButton type="button" onClick={onClick}>
        <EventItemColor color={color} />
        <EventInfoContent>
          <EventItemTime>{moment(event.start).fromNow()}</EventItemTime>
          <EventItemName>{event.name}</EventItemName>
        </EventInfoContent>
      </EventItemButton>
    </EventItemWrapper>
  )
}

const isEndTimeAfterPresent = (event: IEvent) => new Date(event.end).getTime() > new Date().getTime()
const sortByEndTime = (a: IEvent, b: IEvent) => (new Date(a.end).getTime() > new Date(b.end).getTime() ? 1 : -1)

const DashboardPage = () => {
  const [choosenEvent, setChoosenEvent] = useState<IEvent>()
  const events = useSelector((state: RootState) => state.events)

  const comingEvents = events.filter(isEndTimeAfterPresent).sort(sortByEndTime).slice(0, 5)

  return (
    <Wrapper>
      <ComingLessonsWrapper>
        <Title>Zbliżające się zajęcia</Title>
        <EventsList>
          {comingEvents.map((event) => (
            <EventItem key={event.start + event.name} {...{ event }} onClick={() => setChoosenEvent(event)} />
          ))}
        </EventsList>
      </ComingLessonsWrapper>
      <EventInfoWrapper>
        <EventInfo event={choosenEvent} />
      </EventInfoWrapper>
    </Wrapper>
  )
}

export default DashboardPage
