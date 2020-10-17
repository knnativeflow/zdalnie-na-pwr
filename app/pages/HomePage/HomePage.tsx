import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import routes from 'constants/routes.json'
import moment from 'moment'

import Button from '@material-ui/core/Button'

import mailer from 'features/mailer/Mailer'
import Calendar from 'components/Calendar'

import LoginStudentMailModal from 'components/LoginStudentMailModal'
import UploadICalendarFileModal from 'components/UploadICalendarFileModal'

import styles from './HomePage.scss'

moment.locale('pl')

const HomePage = () => {
  const [events, setEvents] = useState<IEvent[]>([])
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

  useEffect(() => {
    console.log(courses)

    // if (courses[0]) {
    // }
    // console.log('date', moment('19 październik 2020 9:15', 'DD MMMM YYYY hh:mm'))
  }, [courses])

  const [
    isOpenLoginStudentMailModal,
    setIsOpenLoginStudentMailModal,
  ] = useState(!events.length)

  const handleSubmitLoginStudentMail = (username: string, password: string) => {
    console.log('dane logowania', username, password)
  }

  const handleUploadICalendar = (eventsFromICS: IEvent[]) =>
    setEvents(eventsFromICS)

  return (
    <div className={styles.root}>
      <h1 className={styles.header}>Home view</h1>
      <Link to={routes.CALENDAR}>To calendar</Link>
      {/*<Button*/}
      {/*  onClick={handleUploadICalendar}*/}
      {/*  variant="contained"*/}
      {/*  color="primary"*/}
      {/*>*/}
      {/*  Wgraj iCalendar*/}
      {/*</Button>*/}
      <div className={styles.container}>
        {!!events.length && <Calendar events={events} />}
        <UploadICalendarFileModal
          open={!events.length}
          onSubmit={handleUploadICalendar}
          onClose={() => {}}
        />
        {/*<LoginStudentMailModal*/}
        {/*  open={isOpenLoginStudentMailModal}*/}
        {/*  onSubmit={handleSubmitLoginStudentMail}*/}
        {/*  onClose={() => setIsOpenLoginStudentMailModal(false)}*/}
        {/*/>*/}
      </div>
    </div>
  )
}

export default HomePage
