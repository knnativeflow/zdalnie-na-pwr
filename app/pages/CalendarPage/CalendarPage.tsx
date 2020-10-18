import React, { useMemo, useState } from 'react'
import { useSelector } from 'react-redux'
import Button from '@material-ui/core/Button'

import StudentMailModal from 'components/StudentMailModal'
import Calendar from 'components/Calendar'
import { RootState } from 'store'

import styles from './CalendarPage.scss'

const CalendarPage = (): JSX.Element => {
  const [isOpenStudentMailModal, setIsOpenStudentMailModal] = useState(false)
  const courses = useSelector((state: RootState) => state.courseList)

  const events = useMemo<IEventFullCalendar[]>(
    () =>
      courses.reduce<IEventFullCalendar[]>((events, course) => {
        return [
          ...events,
          ...course.events.map((event) => ({
            start: event.start,
            end: event.end,
            title: event.title,
            resource: event,
          })),
        ]
      }, []),
    [courses]
  )

  return (
    <div className={styles.root}>
      <div className={styles.header}>
        <h1>Kalendarz</h1>
        <Button onClick={() => setIsOpenStudentMailModal(true)} variant="outlined" color="primary">
          Pobierz dane z poczty
        </Button>
      </div>
      <Calendar events={events} />
      <StudentMailModal open={isOpenStudentMailModal} onClose={() => setIsOpenStudentMailModal(false)} />
    </div>
  )
}

export default CalendarPage
