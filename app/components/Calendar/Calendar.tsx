import React, { useState } from 'react'
import FullCalendar, { EventClickArg } from '@fullcalendar/react'
import timeGridPlugin from '@fullcalendar/timegrid'
import locale from '@fullcalendar/core/locales/pl'

import EventModal from 'components/EventModal'
import styles from './Calendar.scss'

interface Props {
  events: IEventFullCalendar[]
}

const Calendar = (props: Props) => {
  const { events } = props
  const [selectedEvent, setSelectedEvent] = useState<IEvent | null>(null)

  const handleClickEvent = (event: EventClickArg) => {
    setSelectedEvent(event.event.extendedProps.resource)
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
        slotLabelFormat={{
          hour: 'numeric',
          minute: '2-digit',
          omitZeroMinute: false,
        }}
      />
      {selectedEvent && <EventModal event={selectedEvent} onClose={() => setSelectedEvent(null)} />}
    </div>
  )
}

export default Calendar
