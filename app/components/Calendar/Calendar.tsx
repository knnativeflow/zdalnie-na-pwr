import React from 'react'
import FullCalendar, { EventClickArg } from '@fullcalendar/react'
import timeGridPlugin from '@fullcalendar/timegrid'
import locale from '@fullcalendar/core/locales/pl'

import EventModal from 'components/EventModal'
import useModal from 'hooks/useModal'
import styles from './Calendar.scss'

interface Props {
  events: IEventFullCalendar[]
}

const Calendar = (props: Props) => {
  const { events } = props
  const [isModalOpen, openModal, closeModal, modalParams] = useModal<IEvent>()

  const handleClickEvent = (event: EventClickArg) => {
    openModal(event.event.extendedProps.resource)
  }

  return (
    <div className={styles.root}>
      <FullCalendar
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
      />
      <EventModal isOpen={isModalOpen} event={modalParams} onClose={closeModal} />
    </div>
  )
}

export default Calendar
