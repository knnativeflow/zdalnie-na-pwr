import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core'
import studentMail from 'features/studentMail'
import { addZoomLinks } from 'actions/courseList'

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

  const getZoomLinks = async () => {
    try {
      const links = await studentMail.getZoomLinks()

      dispatch(addZoomLinks(links))
      setLinks(links)
    } catch (err) {
      setError(err.message)
    } finally {
      setIsFetching(false)
    }
  }

  const handleAccept = () => {
    // onSuccess(links)
    onSuccess()
  }

  useEffect(() => {
    getZoomLinks()
  }, [])

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
