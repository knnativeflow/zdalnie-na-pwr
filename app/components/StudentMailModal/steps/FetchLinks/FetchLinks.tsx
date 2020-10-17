import React, { useEffect, useState } from 'react'
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core'
import studentMail from 'features/studentMail'

import styles from './FetchLink.scss'

interface ICourseZoomLinkStudentMail {
  name: string
  date: Date
  link: string
}

interface Props {
  open: boolean
  onSuccess: (courses: ICourseZoomLinkStudentMail[]) => void
  onClose: () => void
}

const FetchLink = (props: Props) => {
  const { open, onSuccess, onClose } = props
  // TODO: handle all errors
  const [error, setError] = useState<string>('')
  const [isFetching, setIsFetching] = useState(true)
  const [links, setLinks] = useState<ICourseZoomLinkStudentMail[]>([])

  const getZoomLinks = async () => {
    try {
      const links = await studentMail.getZoomLinks()
      setLinks(links)
    } catch (err) {
      console.log('err', err)
    } finally {
      setIsFetching(false)
    }
  }

  const handleAccept = () => {
    onSuccess(links)
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
