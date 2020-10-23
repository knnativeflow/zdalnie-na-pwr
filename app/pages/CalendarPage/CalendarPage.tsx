import React, { useMemo, useState } from 'react'
import { useSelector } from 'react-redux'
import Button from '@material-ui/core/Button'

import StudentMailModal from 'components/StudentMailModal'
import Calendar from 'components/Calendar'
import { RootState } from 'store'

import styles from './CalendarPage.scss'

const EVENTS_COLORS = {
  W: '#00a65a',
  C: '#f39c12',
  L: '#3c8dbc',
  S: '#45b6b0',
  P: '#00c0ef',
}

const DEFAULT_EVENT_COLOR = '#aaa'

const CalendarPage = (): JSX.Element => {
  const [isOpenStudentMailModal, setIsOpenStudentMailModal] = useState(false)
  const events = useSelector((state: RootState) => state.events)

  const parsedEvents = useMemo<IEventFullCalendar[]>(
    () =>
      events.reduce<IEventFullCalendar[]>((events, event) => {
        return [
          ...events,
          {
            start: event.start,
            end: event.end,
            title: `${event.type} ${event.name}`,
            color: EVENTS_COLORS[event.type] ?? DEFAULT_EVENT_COLOR,
            resource: event,
          },
        ]
      }, []),
    [events]
  )

  return (
    <div className={styles.root}>
      <div className={styles.header}>
        <h1>Kalendarz</h1>
        <Button onClick={() => setIsOpenStudentMailModal(true)} variant="outlined" color="primary">
          Pobierz dane z poczty
        </Button>
      </div>
      <Calendar events={parsedEvents} />
      <StudentMailModal open={isOpenStudentMailModal} onClose={() => setIsOpenStudentMailModal(false)} />
    </div>
  )
}

export default CalendarPage
