import React from 'react'
import { useSelector } from 'react-redux'
import { shell } from 'electron'
import { EventNote, LocalLibrary, MenuBook, Notes, People, Person, TurnedIn, Videocam } from '@material-ui/icons'
import moment from 'moment'
import styled from '@emotion/styled'

import { IEvent } from 'domain/event'
import { ICourse } from 'domain/course'
import { RootState } from 'store'
import { APP_COLORS } from 'base/theme/theme'
import { eventColor, eventFullText } from 'utils/courseTypes'
import InfoWithIcon from 'components/InfoWithIcon'

// START TEST DATA
const additional: { [key: string]: string } = {
  Konsultacje: 'wt 16-18 227 B-2, czw 17-19 168 C-3',
  'Czy ziomek jest spoko': 'W sumie git',
  'Test emoji 😶🤐😗✌😐🤙': 'Idk chyba działa',
}

// END TEST DATA

const EventInfoWrapper = styled.div`
  padding: 16px;
`

const Title = styled.p`
  font-weight: 700;
  margin: 0;
  margin-bottom: 24px;
`

const InfoGrid = styled.p`
  margin: 0;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-auto-rows: auto;
  grid-gap: 8px;
  margin-bottom: 24px;

  @media (max-width: 1200px) {
    // TODO: use variable
    grid-template-columns: 1fr;
  }
`

const Subheader = styled.p`
  margin: 0;
  margin-bottom: 10px;
  font-weight: 700;
  font-size: 14px;
`

const NoInfoText = styled.p`
  margin: 0;
  margin-bottom: 24px;
  font-size: 12px;
  color: rgba(0, 0, 0, 0.54);
  text-align: center;
`

const NoEventText = styled.p`
  font-size: 14px;
  font-weight: 600;
  color: rgba(0, 0, 0, 0.54);
`

interface Props {
  event?: IEvent
}

const EventInfo = ({ event }: Props) => {
  const courses = useSelector((state: RootState) => state.courses)

  if (!event) {
    return (
      <EventInfoWrapper>
        <NoEventText>Wybierz zajęcia, aby zobaczyć ich szczegóły ;)</NoEventText>
      </EventInfoWrapper>
    )
  }

  const eventCourse: ICourse | undefined = courses.find(
    (course) => course.name.startsWith(event.name) && course.type === event.type
  )

  const { name, type, start, end, lecturer, platform, additional } = event
  const mergedPlatforms = { ...eventCourse?.platforms, ...platform }
  const mergedAdditional = { ...eventCourse?.additional, ...additional }
  const mappedAdditional = Object.entries(mergedAdditional)
  const hasPlatforms = !!Object.values(mergedPlatforms).length
  const color = eventColor(type)

  const handleOpenLink = (url: string) => () => shell.openExternal(url)

  return (
    <EventInfoWrapper>
      <Title>{name}</Title>
      <InfoGrid>
        <InfoWithIcon icon={MenuBook} title="Zajęcia" color={color}>
          {eventFullText(type)}
        </InfoWithIcon>
        <InfoWithIcon icon={TurnedIn} title="Kod grupy" color={color}>
          {eventCourse?.classesCode}
        </InfoWithIcon>
        <InfoWithIcon icon={EventNote} title="Termin" color={color}>
          {moment(start).format('dddd, HH:mm')} - {moment(end).format('HH:mm')}
        </InfoWithIcon>
        <InfoWithIcon icon={Person} title="Prowadzący" color={color}>
          {lecturer?.split(', ').map((value) => (
            <div key={value}>{value}</div>
          ))}
        </InfoWithIcon>
      </InfoGrid>

      <Subheader>Zdalne nauczanie</Subheader>

      {!hasPlatforms && <NoInfoText>Nie znaleziono informacji o zdalnym nauczaniu dla tych zajęć</NoInfoText>}

      {hasPlatforms && (
        <InfoGrid>
          {mergedPlatforms?.zoom?.url && (
            <InfoWithIcon
              onClick={handleOpenLink(mergedPlatforms.zoom.url)}
              icon={Videocam}
              title="ZOOM"
              color={APP_COLORS.brand.zoom}
            >
              {mergedPlatforms.zoom.recurrent ? 'spotkanie cotygodniowe' : 'spotkanie jednorazowe'}
            </InfoWithIcon>
          )}
          {mergedPlatforms.teams && (
            <InfoWithIcon
              onClick={handleOpenLink(mergedPlatforms.teams.url)}
              icon={People}
              title="Teams"
              color={APP_COLORS.brand.teams}
            >
              {mergedPlatforms.teams.name}
            </InfoWithIcon>
          )}
          {mergedPlatforms.ePortal && (
            <InfoWithIcon
              onClick={handleOpenLink(mergedPlatforms.ePortal.url)}
              icon={LocalLibrary}
              title="EPortal"
              color={APP_COLORS.brand.ePortal}
            >
              {mergedPlatforms.ePortal.name}
            </InfoWithIcon>
          )}
        </InfoGrid>
      )}

      <Subheader>Pozostałe</Subheader>

      {!mappedAdditional.length && <NoInfoText>Nie znaleziono pozostałych informacji dla tego kursu</NoInfoText>}

      {mappedAdditional?.map(([key, value]) => (
        <InfoWithIcon key={key} title={key} icon={Notes}>
          {value}
        </InfoWithIcon>
      ))}
    </EventInfoWrapper>
  )
}

export default EventInfo
