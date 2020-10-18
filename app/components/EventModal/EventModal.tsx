import React from 'react'
import { shell } from 'electron'
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@material-ui/core'
import moment from 'moment'

import styles from './EventModal.scss'

interface Props {
  event: IEvent
  onClose: () => void
}

const MS_TEAMS_URL = 'https://teams.microsoft.com/_#/school//?ctx=teamsGrid'

const EventModal = (props: Props) => {
  const { event, onClose } = props
  const { title, start, end, description: lecturer, platform } = event
  const hasZoomLink = !!platform.zoom

  const handleOpenLink = (link: string) => shell.openExternal(link)

  return (
    <Dialog open>
      <DialogTitle id="form-dialog-title">{title}</DialogTitle>
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
          {Object.keys(platform).map((key) => (
            <li key={key}>
              <b>{platform[key].name}:</b> <a onClick={() => handleOpenLink(platform[key].url)}>{platform[key].url} </a>
            </li>
          ))}
          {!hasZoomLink && (
            <li className={styles.item}>
              <b>Teams: </b><a onClick={() => handleOpenLink(MS_TEAMS_URL)}> przejdź do MS Teamsów</a>
              <br />(nie znaleźliśmy linka do Zooma w twoich wiadmościach, prawdopodobnie masz zajęcia na Teamsach lub link do Zooma został wysłany przez wiadomość na JSOSie, którego jeszcze nie wspieramy #comingSoon)
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
