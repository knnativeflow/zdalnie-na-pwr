import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core'
import studentMail from 'features/studentMail'
import { addZoomLinks } from 'actions/events'
import { IEventZoomLink } from 'domain/event'

import styles from './FetchLink.scss'

interface Props {
  open: boolean
  onSuccess: () => void
  onClose: () => void
}

const FetchLink = (props: Props) => {
  const { open, onSuccess, onClose } = props
  // TODO: handle all errors and display
  const [, setError] = useState<string>('')
  const [isFetching, setIsFetching] = useState(true)
  const [links, setLinks] = useState<IEventZoomLink[]>([])
  const dispatch = useDispatch()

  const getZoomLinks = useCallback(async () => {
    try {
      const zoomLinks = await studentMail.getZoomLinks()

      dispatch(addZoomLinks(zoomLinks))

      setLinks(zoomLinks)
    } catch (err) {
      setError(err.message)
    } finally {
      setIsFetching(false)
    }
  }, [dispatch])

  const handleAccept = () => {
    onSuccess()
  }

  useEffect(() => {
    void getZoomLinks()
  }, [getZoomLinks])

  return (
    <Dialog open={open} onClose={onClose} classes={{ paper: styles.root }}>
      <DialogTitle>Pobieranie linków do zajęć</DialogTitle>
      {isFetching ? (
        <DialogContent>
          <DialogContentText>Aplikacja przeszukuje ostatnie wiadomości na skrzynce pocztowej.</DialogContentText>
        </DialogContent>
      ) : (
        <>
          <DialogContent>
            <DialogContentText>Aplikacja znalazła {links.length} linki do zajęć.</DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleAccept} color="primary" variant="contained">
              Przejdź do kalendarza
            </Button>
          </DialogActions>
        </>
      )}
    </Dialog>
  )
}

export default FetchLink
