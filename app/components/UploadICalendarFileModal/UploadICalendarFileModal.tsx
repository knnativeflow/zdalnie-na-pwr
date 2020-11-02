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
  onJsos: () => void
}

const UploadICalendarFileModal = (props: Props): JSX.Element => {
  const { open, onSubmit, onClose, onJsos } = props
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

  const handleJsosSignInAndCalendarDownload = () => {
    onJsos()
  }

  return (
    <Dialog open={open} onClose={onClose} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">Wgrywanie pliku iCalendar</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Do poprawnego działania nasza aplikacja potrzebuje kalandarza z Twoimi kursami z portalu JSOS. Żadne dane nie
          są przesyłane na zewnętrze serwery, wszystko dzieje się na Twoim komputerze.
        </DialogContentText>
        <DialogContentText>
          Plik iCalendar zostanie automatycznie pobrany jeśli wybierzesz opcje "Zaloguj się i pobierz z JSOS" lub możesz
          pobrać i wgrać go ręcznie.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        {/* TODO: handle press enter and esc buttons */}
        <Button
          onClick={handleJsosSignInAndCalendarDownload}
          color="primary"
          variant="contained"
          type="submit"
          disabled={isLoading}
        >
          Zaloguj się i pobierz z JSOS
        </Button>
        <Button onClick={handleUpload} color="primary" variant="contained" type="submit" disabled={isLoading}>
          {isLoading ? 'Loading...' : 'Wgraj'}
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default UploadICalendarFileModal
