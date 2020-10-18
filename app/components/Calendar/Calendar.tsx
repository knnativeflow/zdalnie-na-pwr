import React from 'react'
import FullCalendar, { EventClickArg } from '@fullcalendar/react'
import timeGridPlugin from '@fullcalendar/timegrid'
import locale from '@fullcalendar/core/locales/pl'

import styles from './Calendar.scss'

interface Props {
  events: IEvent[]
}

const Calendar = (props: Props) => {
  const { events } = props

  const handleClickEvent = (event: EventClickArg) => {
    console.log(event.event.extendedProps)
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
        duration={{ days: 5 }}
      />
    </div>
  )
}

export default Calendar
