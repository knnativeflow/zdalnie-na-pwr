import React from 'react'
import { shell } from 'electron'
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@material-ui/core'
import moment from 'moment'

import styles from './EventModal.scss'

interface Props {
  event: IEvent
  onClose: () => void
}

// TODO: remove it
// const MS_TEAMS_URL = 'https://teams.microsoft.com/_#/school//?ctx=teamsGrid'

const EventModal = (props: Props) => {
  const { event, onClose } = props
  const { name, type, start, end, lecturer, platform } = event

  const handleOpenLink = (link: string) => shell.openExternal(link)

  return (
    <Dialog open>
      <DialogTitle id="form-dialog-title">
        {type} {name}
      </DialogTitle>
      <DialogContent>
        <ul className={styles.list}>
          <li className={styles.item}>
            <b>Termin: </b>
            {moment(start).format('dddd, kk:mm')} - {moment(end).format('kk:mm')}
          </li>
          <li className={styles.item}>
            <b>Prowadzcy: </b>
            {lecturer}
          </li>
          {platform.zoom && (
            <li>
              <b>Zoom: </b>
              <a onClick={() => platform?.zoom?.url && handleOpenLink(platform.zoom.url)}>{platform.zoom.url} </a>
              {!platform.zoom.weekly && ' (nowy link co tydzień)'}
            </li>
          )}
        </ul>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary" variant="contained">
          Zamknij
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default EventModal
