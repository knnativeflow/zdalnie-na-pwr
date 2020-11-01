import React, { useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Button from '@material-ui/core/Button'

import Calendar from 'components/Calendar'
import { RootState } from 'store'

import { SmailRefresher } from 'features/synchronization'
import { eventColor } from 'utils/courseTypes'
import { IEventFullCalendar } from 'domain/event'
import styles from './CalendarPage.scss'
import { addZoomLinks } from '../../actions/events'
import { CircularProgress } from '@material-ui/core'

const CalendarPage = (): JSX.Element => {
  const [isSmailRefreshing, setIsSmailRefreshing] = useState(false)
  const events = useSelector((state: RootState) => state.events)
  const dispatch = useDispatch()

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

  const refreshSmail = async () => {
    try {
      setIsSmailRefreshing(true)
      const zoomLinks = await SmailRefresher.refresh()
      dispatch(addZoomLinks(zoomLinks, false))
    } catch(e) {
      console.error(e)
    } finally {
      setIsSmailRefreshing(false)
    }
  }

  return (
    <div className={styles.root}>
      <div className={styles.header}>
        <h1>Kalendarz</h1>
        <Button onClick={refreshSmail} variant="outlined" color="primary">
          {isSmailRefreshing ? <CircularProgress size={24} /> : 'Odśwież pocztę studencką'}
        </Button>
      </div>
      <Calendar events={parsedEvents} />
    </div>
  )
}

export default CalendarPage
