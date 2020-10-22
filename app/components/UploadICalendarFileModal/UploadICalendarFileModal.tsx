import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from '@material-ui/core'

import { remote } from 'electron'
import iCalendar from 'features/iCalendar'
import { addEvents } from 'actions/events'

interface Props {
  open: boolean
  onSubmit: (events: IEvent[]) => void
  onClose: () => void
}

const UploadICalendarFileModal = (props: Props): JSX.Element => {
  const { open, onSubmit, onClose } = props
  const [, setError] = useState<string>('')
  const [isLoading, setIsLoading] = useState(false)
  const dispatch = useDispatch()

  const handleUpload = () => {
    setIsLoading(true)

    remote.dialog
      .showOpenDialog({
        title: 'Wybierz plik iCalendar',
        properties: ['openFile'],
        filters: [{ name: 'ICS', extensions: ['ics'] }],
      })
      .then((result) => {
        if (result.canceled) {
          setIsLoading(false)
          return []
        }

        const path = result.filePaths[0]
        const events = iCalendar.getEvents(path)

        dispatch(addEvents(events))
        onSubmit(events)
        onClose()

        return events
      })
      .catch(() => setError('Wystąpił błąd z wgraniem pliku iCalendar'))
  }

  return (
    <Dialog open={open} onClose={onClose} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">Wgrywanie pliku iCalendar</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Wgraj plik iCalendar z JSOSa w celu uzupełnienia lokalnego kalendarza w aplikacji. Dane nie są przesyłane do
          twórców aplikacji.
        </DialogContentText>
        <DialogContentText>
          Nie możesz przejść dalej bez wgrania pliku. Aplikacja bez niego nie działa i nie będzie oferowała
          funkcjonalności.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        {/* TODO: handle press enter and esc buttons */}
        <Button onClick={handleUpload} color="primary" variant="contained" type="submit" disabled={isLoading}>
          {isLoading ? 'Loading...' : 'Wgraj'}
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default UploadICalendarFileModal
