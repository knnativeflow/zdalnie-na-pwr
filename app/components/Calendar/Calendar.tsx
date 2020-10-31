import React, { useRef } from 'react'
import FullCalendar, { EventClickArg } from '@fullcalendar/react'
import timeGridPlugin from '@fullcalendar/timegrid'
import locale from '@fullcalendar/core/locales/pl'

import { IEvent, IEventFullCalendar } from 'domain/event'
import { FaChevronLeft, FaChevronRight } from 'react-icons/all'
import styled from '@emotion/styled'

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
  .fc-button {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .fc-view-harness {
    overflow-y: auto;
  }
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

  // @ts-ignore
  return (
    <CalendarWrapper>
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
        weekends
        nowIndicator
        slotLabelFormat={{
          hour: 'numeric',
          minute: '2-digit',
          omitZeroMinute: false,
        }}
        viewHeight="500px"
        buttonIcons={false}
        customButtons={customButtons}
        headerToolbar={{
          left: '',
          center: '',
          right: 'today prevButton nextButton',
        }}
      />
    </CalendarWrapper>
  )
}

export default Calendar
