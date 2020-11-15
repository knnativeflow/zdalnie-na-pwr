import React, { useRef } from 'react'
import FullCalendar, { EventClickArg } from '@fullcalendar/react'
import timeGridPlugin from '@fullcalendar/timegrid'
import locale from '@fullcalendar/core/locales/pl'
import { EventContentArg } from '@fullcalendar/core'
import { FaChevronLeft, FaChevronRight, FaLink } from 'react-icons/all'
import styled from '@emotion/styled'
import { Tooltip } from '@material-ui/core'

import { IEvent, IEventFullCalendar, IEventWithCourse } from 'domain/event'
import { PlatformType } from 'domain/course'

interface Props {
  events: IEventFullCalendar[]
  onEventClick: (arg: IEvent) => void
}

// DO DOKOŃCZENIA

const CalendarWrapper = styled.div`
  display: flex;
  height: 100%;
  overflow: hidden;

  --fc-border-color: #dfeafa;

  .fc-scrollgrid {
    border: none;
  }

  .fc-timegrid-slots {
    border: 1px solid var(--fc-border-color, #ddd);
  }

  .fc-col-header-cell-cushion {
    font-size: 13px;
  }

  .fc-timegrid-axis {
    border: none;
  }

  .fc-theme-standard th {
    border: none;
  }

  .fc-scrollgrid-section-sticky > * {
    background: #e7f1ff;
    padding: 6px 0;
  }

  .fc-timegrid-slot-label-cushion {
    font-size: 13px;
    color: #7e91a9;
  }

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

  .fc-button-primary {
    background: #1e97ff;
    border: none;
    border-color: transparent;
    border-radius: 8px;

    &:hover {
      background: #0d74ce;
    }

    &:focus,
    &:active {
      box-shadow: none;
      border-color: transparent;
    }

    &:disabled {
      background: #a5a5a5;
    }
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

const EventLink = styled.span`
  width: 18px;
  height: 18px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  position: absolute;
  right: -1px;
  bottom: -1px;
  font-size: 12px;
`

const EventName = styled.span`
  margin: 0;
  font-weight: 600;
  font-size: 13px;
  line-height: 1.2;
  overflow-wrap: break-word;
`

const TYPES = [PlatformType.ZOOM, PlatformType.TEAMS]

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

  const renderEventContent = (eventInfo: EventContentArg) => {
    const event = eventInfo.event.extendedProps.resource as IEventWithCourse
    const platforms = { ...event.platforms, ...event.course?.platforms }
    const hasLink = TYPES.some((item) => platforms[item])

    return (
      <EventContent>
        <EventHeader>
          {eventInfo.timeText} <EventType>{event.type}</EventType>
        </EventHeader>
        <EventName>{event.name}</EventName>
        {hasLink && (
          <Tooltip
            title={Object.keys(platforms)
              .filter((namePlatform) => namePlatform !== PlatformType.EPORTAL)
              .join(', ')}
            aria-label="platformy"
          >
            <EventLink style={{ background: eventInfo.backgroundColor }}>
              <FaLink />
            </EventLink>
          </Tooltip>
        )}
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
