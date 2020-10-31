import React, { useRef } from 'react'
import FullCalendar, { EventClickArg } from '@fullcalendar/react'
import timeGridPlugin from '@fullcalendar/timegrid'
import locale from '@fullcalendar/core/locales/pl'

import EventModal from 'components/EventModal'
import useModal from 'hooks/useModal'
import { IEvent, IEventFullCalendar } from 'domain/event'
import { FaChevronLeft, FaChevronRight } from 'react-icons/all'
import { IconType } from 'react-icons'
import styles from './Calendar.scss'

interface Props {
  events: IEventFullCalendar[]
}

const CalendarButton = ({ icon: Icon }: { icon: IconType }) => (
  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '1.5rem' }}>
    <Icon />
  </div>
)

const Calendar = (props: Props) => {
  const { events } = props
  const [isModalOpen, openModal, closeModal, modalParams] = useModal<IEvent>()
  const calendarRef = useRef<FullCalendar | null>(null)

  const handleClickEvent = (event: EventClickArg) => {
    openModal(event.event.extendedProps.resource)
  }

  const customButtons = {
    prevButton: {
      text: <CalendarButton icon={FaChevronLeft} />,
      click: () => {
        if (!calendarRef.current) return
        const cal = calendarRef.current.getApi()
        if (!cal) return
        cal.prev()
      },
    },
    nextButton: {
      text: <CalendarButton icon={FaChevronRight} />,
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
    <div className={styles.root}>
      <FullCalendar
        ref={(ref) => {
          calendarRef.current = ref
        }}
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
        buttonIcons={false}
        customButtons={customButtons}
        headerToolbar={{
          right: 'today prevButton nextButton',
        }}
      />
      <EventModal isOpen={isModalOpen} event={modalParams} onClose={closeModal} />
    </div>
  )
}

export default Calendar
