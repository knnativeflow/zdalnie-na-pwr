import React, { useMemo, useState } from 'react'
import { useSelector } from 'react-redux'
import Button from '@material-ui/core/Button'

import StudentMailModal from 'components/StudentMailModal'
import Calendar from 'components/Calendar'
import { RootState } from 'store'

import { eventColor } from 'utils/courseTypes'
import { IEventFullCalendar } from 'domain/event'
import styles from './CalendarPage.scss'

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
            color: eventColor(event.type),
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
