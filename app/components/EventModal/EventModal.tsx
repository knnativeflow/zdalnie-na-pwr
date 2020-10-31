import React from 'react'
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid } from '@material-ui/core'
import { EventNote, LocalLibrary, MenuBook, Notes, People, Person, TurnedIn, Videocam } from '@material-ui/icons'
import moment from 'moment'
import { shell } from 'electron'

import { eventColor, eventFullText } from 'utils/courseTypes'
import InfoWithIcon, { ButtonInfoWithIcon } from 'components/InfoWithIcon'
import { APP_COLORS } from 'base/theme/theme'

// START TEST DATA
const platform: IPlatforms = {
  zoom: {
    weekly: true,
    url: 'https://google.com',
  },
  teams: {
    name: 'Oracle - projekt, Z00-21g',
    url: 'https://google.com',
  },
  ePortal: {
    name: 'Baza danych Oracle - programowanie',
    url: 'https://google.com',
  },
}

const additional: { [key: string]: string } = {
  Konsultacje: 'wt 16-18 227 B-2, czw 17-19 168 C-3',
  'Czy ziomek jest spoko': 'W sumie git',
  'Test emoji 😶🤐😗✌😐🤙': 'Idk chyba działa',
}

const code = 'Z00-21g'

// END TEST DATA

interface Props {
  event?: IEvent
  onClose: () => void
  isOpen: boolean
}

const EventModal = (props: Props) => {
  const { event, onClose, isOpen } = props
  if (!event) return null

  const { name, type, start, end, lecturer /* , code, additional, platform */ } = event
  const mappedAdditional = Object.entries(additional)
  const hasPlatforms = !!Object.values(platform).length

  const handleOpenLink = (url: string) => () => shell.openExternal(url)

  return (
    <Dialog open={isOpen} onClose={onClose}>
      <DialogTitle>{name}</DialogTitle>
      <DialogContent>
        <Box mb={2}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <InfoWithIcon icon={MenuBook} title="Zajęcia" color={eventColor(type)}>
                {eventFullText(type)}
              </InfoWithIcon>
            </Grid>
            <Grid item xs={6}>
              <InfoWithIcon icon={TurnedIn} title="Kod grupy">
                {code}
              </InfoWithIcon>
            </Grid>
            <Grid item xs={12} sm={6}>
              <InfoWithIcon icon={EventNote} title="Termin">
                {moment(start).format('dddd, HH:mm')} - {moment(end).format('HH:mm')}
              </InfoWithIcon>
            </Grid>
            <Grid item xs={12} sm={6}>
              <InfoWithIcon icon={Person} title="Prowadzący">
                {lecturer?.split(', ').map((value) => (
                  <div key={value}>{value}</div>
                ))}
              </InfoWithIcon>
            </Grid>
          </Grid>
        </Box>

        <Box pb={1} pt={2}>
          <Box fontWeight="bold" mb={2} fontSize="subtitle1.fontSize">
            Zdalne nauczanie
          </Box>

          {!hasPlatforms && (
            <Box
              textAlign="center"
              display="flex"
              alignItems="center"
              justifyContent="center"
              color="text.secondary"
              fontSize="subtitle2.fontSize"
              py={1}
            >
              Nie znaleziono informacji o zdalnym nauczaniu w tym kursie
            </Box>
          )}

          {hasPlatforms && (
            <Grid container spacing={1}>
              {platform?.zoom?.url && (
                <Grid item xs={12} sm={6}>
                  <ButtonInfoWithIcon
                    onClick={handleOpenLink(platform.zoom.url)}
                    icon={Videocam}
                    title="ZOOM"
                    color={APP_COLORS.brand.zoom}
                  >
                    {platform.zoom.weekly ? 'spotkanie cotygodniowe' : 'spotkanie jednorazowe'}
                  </ButtonInfoWithIcon>
                </Grid>
              )}
              {platform.teams && (
                <Grid item xs={12} sm={6}>
                  <ButtonInfoWithIcon
                    onClick={handleOpenLink(platform.teams.url)}
                    icon={People}
                    title="Teams"
                    color={APP_COLORS.brand.teams}
                  >
                    {platform.teams.name}
                  </ButtonInfoWithIcon>
                </Grid>
              )}
              {platform.ePortal && (
                <Grid item xs={12} sm={6}>
                  <ButtonInfoWithIcon
                    onClick={handleOpenLink(platform.ePortal.url)}
                    icon={LocalLibrary}
                    title="EPortal"
                    color={APP_COLORS.brand.ePortal}
                  >
                    {platform.ePortal.name}
                  </ButtonInfoWithIcon>
                </Grid>
              )}
            </Grid>
          )}
        </Box>

        <Box pb={1} pt={2}>
          <Box fontWeight="bold" mb={2} fontSize="subtitle1.fontSize">
            Pozostałe
          </Box>

          {!mappedAdditional.length && (
            <Box
              textAlign="center"
              display="flex"
              alignItems="center"
              justifyContent="center"
              color="text.secondary"
              fontSize="subtitle2.fontSize"
              py={1}
            >
              Nie znaleziono pozostałych informacji w tym kursie
            </Box>
          )}

          {!!mappedAdditional.length && (
            <Grid container spacing={2}>
              {mappedAdditional.map(([key, value]) => (
                <Grid key={key} item xs={12}>
                  <InfoWithIcon title={key} icon={Notes}>
                    {value}
                  </InfoWithIcon>
                </Grid>
              ))}
            </Grid>
          )}
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Zamknij</Button>
      </DialogActions>
    </Dialog>
  )
}

export default EventModal

EventModal.defaultProps = {
  event: undefined,
}
