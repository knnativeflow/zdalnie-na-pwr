import React from 'react'
import { EventNote, LocalLibrary, MenuBook, Notes, People, Person, TurnedIn, Videocam } from '@material-ui/icons'
import moment from 'moment'
import { shell } from 'electron'

import { eventColor, eventFullText } from 'utils/courseTypes'
import InfoWithIcon from 'components/InfoWithIcon'
import { APP_COLORS } from 'base/theme/theme'
import { IEvent } from 'domain/event'
import styled from '@emotion/styled'

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

interface Props {
  event?: IEvent
}

const EventInfo = ({ event }: Props) => {
  if (!event) return null

  const { name, type, start, end, lecturer, platform /* , code, additional, platform */ } = event
  const mappedAdditional = Object.entries(additional)
  const hasPlatforms = !!Object.values(platform).length
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
          {code}
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
          {platform?.zoom?.url && (
            <InfoWithIcon
              onClick={handleOpenLink(platform.zoom.url)}
              icon={Videocam}
              title="ZOOM"
              color={APP_COLORS.brand.zoom}
            >
              {platform.zoom.weekly ? 'spotkanie cotygodniowe' : 'spotkanie jednorazowe'}
            </InfoWithIcon>
          )}
          {platform.teams && (
            <InfoWithIcon
              onClick={handleOpenLink(platform.teams.url)}
              icon={People}
              title="Teams"
              color={APP_COLORS.brand.teams}
            >
              {platform.teams.name}
            </InfoWithIcon>
          )}
          {platform.ePortal && (
            <InfoWithIcon
              onClick={handleOpenLink(platform.ePortal.url)}
              icon={LocalLibrary}
              title="EPortal"
              color={APP_COLORS.brand.ePortal}
            >
              {platform.ePortal.name}
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
