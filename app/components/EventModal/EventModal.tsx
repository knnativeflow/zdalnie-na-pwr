import React from 'react'
import { useSelector } from 'react-redux'
import { Box, Dialog, DialogActions, DialogContent, DialogTitle, Grid } from '@material-ui/core'
import moment from 'moment'
import { shell } from 'electron'

import { eventColor, eventFullText } from 'utils/courseTypes'
import InfoWithIcon from 'components/InfoWithIcon'
import { THEME } from 'base/theme/theme'
import { ICourse } from 'domain/course'
import { IEvent } from 'domain/event'
import { RootState } from 'store'
import {
  FaBookOpen,
  FaBookReader,
  FaCalendarAlt,
  FaChalkboardTeacher,
  FaClipboard,
  FaHashtag,
  FaUserFriends,
  FaVideo,
  FaVideoSlash,
} from 'react-icons/all'
import Button from 'components/Button'

/*
 * For now thi component is replaced with EventInfo
 * It's still here because it'll be used in the future for small windows
 */

// END TEST DATA
interface Props {
  event?: IEvent
  onClose: () => void
  isOpen: boolean
}

const EventModal = ({ event, onClose, isOpen }: Props) => {
  const courses = useSelector((state: RootState) => state.courses)

  if (!event) return null

  const eventCourse: ICourse | undefined = courses.find(
    (course) => course.name.startsWith(event.name) && course.type === event.type
  )

  const { name, type, start, end, lecturer, platform, additional } = event
  const mergedPlatforms = { ...(eventCourse?.platforms || {}), ...platform }
  const mergedAdditional = { ...(eventCourse?.additional || {}), ...additional }
  const mappedAdditional = Object.entries(mergedAdditional)
  const hasPlatforms = !!Object.values(mergedPlatforms).length

  const handleOpenLink = (url: string) => () => shell.openExternal(url)

  return (
    <Dialog open={isOpen} onClose={onClose}>
      <DialogTitle>{name}</DialogTitle>
      <DialogContent>
        <Box mb={2}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <InfoWithIcon icon={FaBookOpen} title="Zajęcia" color={eventColor(type)}>
                {eventFullText(type)}
              </InfoWithIcon>
            </Grid>
            <Grid item xs={6}>
              <InfoWithIcon icon={FaHashtag} title="Kod grupy">
                {eventCourse?.classesCode}
              </InfoWithIcon>
            </Grid>
            <Grid item xs={12} sm={6}>
              <InfoWithIcon icon={FaCalendarAlt} title="Termin">
                {moment(start).format('dddd, HH:mm')} - {moment(end).format('HH:mm')}
              </InfoWithIcon>
            </Grid>
            <Grid item xs={12} sm={6}>
              <InfoWithIcon icon={FaChalkboardTeacher} title="Prowadzący">
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
              {mergedPlatforms.zoom &&
                (mergedPlatforms.zoom.url ? (
                  <Grid item xs={12} sm={6}>
                    <InfoWithIcon
                      onClick={handleOpenLink(mergedPlatforms.zoom.url)}
                      icon={FaVideo}
                      title="ZOOM"
                      color={THEME.colors.brand.zoom}
                    >
                      {mergedPlatforms.zoom.recurrent ? 'spotkanie cotygodniowe' : 'spotkanie jednorazowe'}
                    </InfoWithIcon>
                  </Grid>
                ) : (
                  <Grid item xs={12} sm={6}>
                    <InfoWithIcon icon={FaVideoSlash} title="ZOOM" disabled>
                      brak aktualnego linka
                    </InfoWithIcon>
                  </Grid>
                ))}
              {mergedPlatforms?.teams && (
                <Grid item xs={12} sm={6}>
                  <InfoWithIcon
                    onClick={handleOpenLink(mergedPlatforms.teams?.url)}
                    icon={FaUserFriends}
                    title="Teams"
                    color={THEME.colors.brand.teams}
                  >
                    {mergedPlatforms.teams?.name}
                  </InfoWithIcon>
                </Grid>
              )}
              {mergedPlatforms?.ePortal && (
                <Grid item xs={12} sm={6}>
                  <InfoWithIcon
                    onClick={handleOpenLink(mergedPlatforms.ePortal?.url)}
                    icon={FaBookReader}
                    title="EPortal"
                    color={THEME.colors.brand.ePortal}
                  >
                    {mergedPlatforms.ePortal?.name}
                  </InfoWithIcon>
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
              Nie dodano dodatkowych danych o zajęciach lub kursie.
            </Box>
          )}

          {!!mappedAdditional.length && (
            <Grid container spacing={2}>
              {mappedAdditional.map(([key, value]) => (
                <Grid key={key} item xs={12}>
                  <InfoWithIcon title={key} icon={FaClipboard}>
                    {value}
                  </InfoWithIcon>
                </Grid>
              ))}
            </Grid>
          )}
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} compact>
          Zamknij
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default EventModal

EventModal.defaultProps = {
  event: undefined,
}
