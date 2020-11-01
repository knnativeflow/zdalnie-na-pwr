import styled from '@emotion/styled'
import EventInfo from 'components/EventInfo'
import { IEvent } from 'domain/event'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from 'store'

const Wrapper = styled.div`
  display: flex;
  height: 100%;
`

const ComingLessonsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 16px;
  flex: 1;
`

const EventInfoWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  background: #f5f9fd;
  overflow: auto;
`

const DashboardPage = () => {
  const [choosenEvent, setChoosenEvent] = useState<IEvent>()
  const events = useSelector((state: RootState) => state.events)

  const comingEvents = events.filter((event) => new Date(event.end).getTime() > new Date().getTime()).slice(0, 5)

  return (
    <Wrapper>
      <ComingLessonsWrapper>
        <p>Zbliżające się zajęcia</p>
        <ul>
          {comingEvents.map((event) => (
            <li key={event.start + event.name}>
              <button type="button" onClick={() => setChoosenEvent(event)}>
                {event.name} - {event.start}
              </button>
            </li>
          ))}
        </ul>
      </ComingLessonsWrapper>
      <EventInfoWrapper>
        <EventInfo event={choosenEvent} />
      </EventInfoWrapper>
    </Wrapper>
  )
}

export default DashboardPage
