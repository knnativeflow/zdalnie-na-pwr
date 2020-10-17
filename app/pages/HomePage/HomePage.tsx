import React, { useEffect, useState } from 'react'
import moment from 'moment'

import Button from '@material-ui/core/Button'

import Calendar from 'components/Calendar'

import StudentMailModal from 'components/StudentMailModal'
import UploadICalendarFileModal from 'components/UploadICalendarFileModal'

import styles from './HomePage.scss'

moment.locale('pl')

const HomePage = () => {
  const [events, setEvents] = useState<IEvent[]>([])
  const [isOpenStudentMailModal, setIsOpenStudentMailModal] = useState(false)

  const [courses, setCourses] = useState([])

  const getMails = async () => {
    await mailer.login()
    const ids = await mailer.getListMail()

    const courses = ids.map(async (id: number) => {
      return await mailer.getMail(id)
    })

    Promise.all(courses)
      .then((result) => setCourses(result))
      .catch((err) => console.log('err', err))
  }

  // useEffect(() => {
  //   getMails()
  // }, [])

  const handleUploadICalendar = (eventsFromICS: IEvent[]) => setEvents(eventsFromICS)

  return (
    <div className={styles.root}>
      <div className={styles.header}>
        <h1>Zajęcia</h1>
        <Button onClick={() => setIsOpenStudentMailModal(true)} variant="outlined" color="primary">
          Pobierz dane z poczty
        </Button>
      </div>
      {!!events.length && <Calendar events={events} />}
      <UploadICalendarFileModal open={!events.length} onSubmit={handleUploadICalendar} onClose={() => {}} />
      <StudentMailModal open={isOpenStudentMailModal} onClose={() => setIsOpenStudentMailModal(false)} />
    </div>
  )
}

export default HomePage
