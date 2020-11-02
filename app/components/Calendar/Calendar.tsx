import React, { useRef } from 'react'
import FullCalendar, { EventClickArg } from '@fullcalendar/react'
import timeGridPlugin from '@fullcalendar/timegrid'
import locale from '@fullcalendar/core/locales/pl'

import { IEvent, IEventFullCalendar } from 'domain/event'
import { FaChevronLeft, FaChevronRight } from 'react-icons/all'
import styled from '@emotion/styled'
import { EventContentArg } from '@fullcalendar/core'

interface Props {
  events: IEventFullCalendar[]
  onEventClick: (arg: IEvent) => void
}

// DO DOKOŃCZENIA

const CalendarWrapper = styled.div`
  display: flex;
  height: 100%;
  overflow: hidden;

  .fc-toolbar.fc-header-toolbar {
    margin-bottom: 10px;
  }

  .fc-toolbar-chunk {
    display: flex;
  }

  .fc-button-primary {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .fc-direction-ltr .fc-toolbar > * > :not(:first-of-type) {
    margin-left: 8px;
  }

  .fc-view-harness {
    overflow-y: auto;
  }
`

const Title = styled.p`
  font-weight: 700;
  margin: 0;
  position: absolute;
`

const EventContent = styled.p`
  margin: 0;
  display: flex;
  flex-direction: column;
  padding: 3px;
  padding-bottom: 8px;
  height: 100%;
`

const EventHeader = styled.span`
  display: flex;
  justify-content: space-between;
  font-size: 11px;
  opacity: 0.8;
  flex: 1;
`

const EventType = styled.span`
  font-weight: 700;
`

const EventName = styled.span`
  margin: 0;
  font-weight: 600;
  font-size: 13px;
  line-height: 1.2;
  overflow-wrap: break-word;
`

const Calendar = ({ events, onEventClick }: Props) => {
  const calendarRef = useRef<FullCalendar | null>(null)

  const handleClickEvent = (event: EventClickArg) => {
    onEventClick(event.event.extendedProps.resource)
  }

  const customButtons = {
    prevButton: {
      text: <FaChevronLeft />,
      click: () => {
        if (!calendarRef.current) return
        const cal = calendarRef.current.getApi()
        if (!cal) return
        cal.prev()
      },
    },
    nextButton: {
      text: <FaChevronRight />,
      click: () => {
        if (!calendarRef.current) return
        const cal = calendarRef.current.getApi()
        if (!cal) return
        cal.next()
      },
    },
  }

  // TODO: improve styles
  const renderEventContent = (eventInfo: EventContentArg) => {
    const event = eventInfo.event.extendedProps.resource
    return (
      <EventContent>
        <EventHeader>
          {eventInfo.timeText} <EventType>{event.type}</EventType>
        </EventHeader>
        <EventName>{event.name}</EventName>
      </EventContent>
    )
  }

  return (
    <CalendarWrapper>
      <Title>Plan zajęć</Title>
      <FullCalendar
        ref={calendarRef}
        height="auto"
        timeZone="local"
        plugins={[timeGridPlugin]}
        initialView="timeGridWeek"
        allDaySlot={false}
        slotDuration="00:30:00"
        slotMinTime="07:00:00"
        slotMaxTime="21:30:00"
        events={events}
        locale={locale}
        eventClick={handleClickEvent}
        // weekends
        nowIndicator
        slotLabelFormat={{
          hour: 'numeric',
          minute: '2-digit',
          omitZeroMinute: false,
        }}
        buttonIcons={false}
        // @ts-ignore
        customButtons={customButtons}
        headerToolbar={{
          left: '',
          center: '',
          right: 'today prevButton nextButton',
        }}
        firstDay={1}
        eventContent={renderEventContent}
      />
    </CalendarWrapper>
  )
}

export default Calendar
