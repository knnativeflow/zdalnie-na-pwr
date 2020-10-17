import React from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import locale from '@fullcalendar/core/locales/pl'

import styles from './Calendar.scss'

interface Event {
  title: string
  start: Date
  end: Date
  allDay: boolean
  resource: unknown // TODO: change
}

interface Props {
  events: Event[]
}

const Calendar = (props: Props) => {
  const { events } = props

  return (
    <div className={styles.root}>
      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView="dayGridWeek"
        firstDay={1}
        events={events}
        locale={locale}
        // eventClick={(event) =>
        //   console.log(event.event.extendedProps.resource)
        // }
      />
    </div>
  )
}

export default Calendar
