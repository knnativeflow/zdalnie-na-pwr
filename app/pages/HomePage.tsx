import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import routes from 'constants/routes.json'
import moment from 'moment'

import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'

import { remote } from 'electron'
import ical from 'ical'

import mailer from 'features/mailer/Mailer'

import styles from './HomePage.css'

moment.locale('pl')

interface IEvent {
  title: string
  start: Date
  end: Date
  allDay: boolean
  resource: unknown
}

const HomePage = () => {
  const [events, setEvents] = useState<Array<IEvent>>([])
  const [courses, setCourses] = useState([])

  const handleUploadICalendar = () => {
    remote.dialog
      .showOpenDialog({ title: 'testowy tytul', properties: ['openFile'] })
      // eslint-disable-next-line promise/always-return
      .then((result) => {
        const path = result.filePaths[0]
        const data = ical.parseFile(path)

        const parsedEvents = Object.keys(data).reduce<IEvent[]>(
          (aggregateEvents: IEvent[], eventKey: string) => {
            const event = data[eventKey]

            if (event.summary && event.start && event.end) {
              // const date = moment(
              //   '19 październik 2020 15:15',
              //   'DD MMMM YYYY hh:mm'
              // )

              // if (date.isSame(moment(event.start))) {
              //   console.log('jesttestsdf')
              // }

              const foundCourse = courses.find((course) =>
                moment(course.time, 'DD MMMM YYYY hh:mm').isSame(
                  moment(event.start)
                )
              )

              if (foundCourse) {
                console.log('found course', foundCourse)
              }

              // console.log(date, moment(event.start), date === moment(event.start))
              return [
                ...aggregateEvents,
                {
                  title: event.summary,
                  start: event.start,
                  end: event.end,
                  allDay: false,
                  resource: { event, foundCourse },
                },
              ]
            }

            return aggregateEvents
          },
          []
        )

        setEvents(parsedEvents)
      })
      .catch((err) => console.log('err', err))
  }

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

  useEffect(() => {
    getMails()
  }, [])

  useEffect(() => {
    console.log(courses)

    // if (courses[0]) {
    // }
    // console.log('date', moment('19 październik 2020 9:15', 'DD MMMM YYYY hh:mm'))
  }, [courses])

  return (
    <div>
      <h1 className={styles.header}>Home view</h1>
      <Link to={routes.CALENDAR}>To calendar</Link>
      <button onClick={handleUploadICalendar}>Wgraj iCalendar</button>
      <div className={styles.container}>
        <FullCalendar
          plugins={[dayGridPlugin]}
          initialView="dayGridWeek"
          events={events}
          eventClick={(event) =>
            console.log(event.event.extendedProps.resource)
          }
        />
      </div>
    </div>
  )
}

export default HomePage
