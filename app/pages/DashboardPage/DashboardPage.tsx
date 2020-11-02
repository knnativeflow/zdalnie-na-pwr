import styled from '@emotion/styled'
import EventInfo from 'components/EventInfo'
import { IEvent } from 'domain/event'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from 'store'
import { eventColor } from 'utils/courseTypes'
import moment from 'moment'

const Wrapper = styled.div`
  display: flex;
  height: 100%;
`

const Title = styled.p`
  font-weight: 700;
  margin: 0;
  margin-bottom: 24px;
`

const ComingLessonsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 16px;
  flex: 1;
  overflow: auto;
`

const EventInfoWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  background: #f5f9fd;
  overflow: auto;
`

const EventsList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
`

const EventItemWrapper = styled.li`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
`

const EventItemButton = styled.button`
  width: 100%;
  background: none;
  border: none;
  display: flex;
  background: #f3f5f8;
  border-radius: 16px;
  padding: 20px;
`

const EventItemColor = styled.div<{ color: string }>`
  width: 8px;
  height: 45px;
  background: ${({ color }) => color};
  margin-right: 16px;
  border-radius: 5px;
`

const EventInfoContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`

const EventItemTime = styled.p`
  margin: 0;
  font-weight: 600;
  font-size: 14px;
  color: #405775;
`

const EventItemName = styled.p`
  margin: 0;
  font-weight: 900;
  font-size: 18px;
  color: #405775;
`

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

const isEndTimeMoreThanPresent = (event: IEvent) => new Date(event.end).getTime() > new Date().getTime()
const sortByEndTime = (a: IEvent, b: IEvent) => (new Date(a.end).getTime() > new Date(b.end).getTime() ? 1 : -1)

const DashboardPage = () => {
  const [choosenEvent, setChoosenEvent] = useState<IEvent>()
  const events = useSelector((state: RootState) => state.events)

  const comingEvents = events.filter(isEndTimeMoreThanPresent).sort(sortByEndTime).slice(0, 5)

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
