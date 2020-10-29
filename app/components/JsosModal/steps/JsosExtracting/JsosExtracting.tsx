import React, { useEffect, useState } from 'react'
import { Dialog, DialogTitle, DialogContent, CircularProgress } from '@material-ui/core'
import { Alert } from '@material-ui/lab'

import { jsosExtractor } from 'features/jsos'
import styles from './JsosExtracting.scss'
import { useDispatch } from 'react-redux'

import { addEvents } from 'actions/events'
import { addCourses } from 'actions/courses'
import iCalendar from 'features/iCalendar/ICalendar'

interface Props {
  open: boolean
  onSuccess: () => void
  onClose: () => void
}

const JsosExtracting = (props: Props) => {
  const { open, onSuccess, onClose } = props
  const [error, setError] = useState<string>('')
  const [isFetching, setIsFetching] = useState(true)
  const dispatch = useDispatch()

  const fetchJsosData = async () => {
    try {
      setIsFetching(true)
      const courses = await jsosExtractor.fetchCourseList()
      dispatch(addCourses(courses))

      const calendar = await jsosExtractor.downloadCalendar()
      const events = iCalendar.getEventsFromString(calendar)
      dispatch(addEvents(events))
      onSuccess()
    } catch (err) {
      console.error(err)
      setError(err.message)
    } finally {
      setIsFetching(false)
    }
  }

  useEffect(() => {
    fetchJsosData()
  }, [])

  return (
    <Dialog open={open} onClose={onClose} classes={{ paper: styles.root }}>
      <DialogTitle>Pobieranie danych z JSOSa.</DialogTitle>
      {isFetching && (
        <DialogContent classes={{ root: styles.loader_wrapper }}>
          <CircularProgress color="secondary" />
        </DialogContent>
      )}
      {!!error && (
        <Alert severity="error" classes={{ root: styles.alert }}>
          {error}
        </Alert>
      )}
    </Dialog>
  )
}

export default JsosExtracting
