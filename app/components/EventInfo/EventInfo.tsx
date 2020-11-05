import React from 'react'
import { useSelector } from 'react-redux'
import { shell } from 'electron'
import moment from 'moment'
import styled from '@emotion/styled'
import {
  FaBookOpen,
  FaCalendarAlt,
  FaChalkboardTeacher,
  FaHashtag,
  FaUserFriends,
  FaVideo,
  FaVideoSlash,
} from 'react-icons/all'

import { IEvent } from 'domain/event'
import { ICourse } from 'domain/course'
import { RootState } from 'store'
import { THEME } from 'base/theme/theme'
import { eventColor, eventFullText } from 'utils/courseTypes'
import InfoWithIcon from 'components/InfoWithIcon'

const EventInfoWrapper = styled.div`
  padding: 16px;
`

const Title = styled.p`
  font-weight: 700;
  margin: 0;
  margin-bottom: 24px;
`

const InfoGrid = styled.div`
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
  const events = useSelector((state: RootState) => state.events)

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

  const { name, type, start, end, lecturer, platforms: platformsEvent } = event
  const mergedPlatforms = { ...eventCourse?.platforms, ...platformsEvent }
  const usingZoomPlatform = events.some((event) => event.code === eventCourse?.classesCode && event.platforms.zoom)
  const hasPlatforms = !!Object.values(mergedPlatforms).length || usingZoomPlatform
  const color = eventColor(type)

  const handleOpenLink = (url: string) => () => shell.openExternal(url)

  return (
    <EventInfoWrapper>
      <Title>{name}</Title>
      <InfoGrid>
        <InfoWithIcon icon={FaBookOpen} title="Zajęcia" color={color}>
          {eventFullText(type)}
        </InfoWithIcon>
        <InfoWithIcon icon={FaHashtag} title="Kod grupy" color={color}>
          {eventCourse?.classesCode}
        </InfoWithIcon>
        <InfoWithIcon icon={FaCalendarAlt} title="Termin" color={color}>
          {moment(start).format('dddd, HH:mm')} - {moment(end).format('HH:mm')}
        </InfoWithIcon>
        <InfoWithIcon icon={FaChalkboardTeacher} title="Prowadzący" color={color}>
          {lecturer?.split(', ').map((value) => (
            <span key={value}>{value}</span>
          ))}
        </InfoWithIcon>
      </InfoGrid>

      <Subheader>Zdalne nauczanie</Subheader>

      {!hasPlatforms && <NoInfoText>Nie znaleziono informacji o zdalnym nauczaniu dla tych zajęć</NoInfoText>}

      {hasPlatforms && (
        <InfoGrid>
          {mergedPlatforms.zoom?.url && (
            <InfoWithIcon
              onClick={handleOpenLink(mergedPlatforms.zoom.url)}
              icon={FaVideo}
              title="ZOOM"
              color={THEME.colors.brand.zoom}
            >
              {platformsEvent.zoom ? 'spotkanie jednorazowe' : 'spotkanie cotygodniowe'}
            </InfoWithIcon>
          )}
          {usingZoomPlatform && !mergedPlatforms.zoom && (
            <InfoWithIcon icon={FaVideoSlash} title="ZOOM" asDisabledButton>
              brak aktualnego linka
            </InfoWithIcon>
          )}
          {mergedPlatforms.teams && (
            <InfoWithIcon
              onClick={handleOpenLink(mergedPlatforms.teams.url)}
              icon={FaVideoSlash}
              title="Teams"
              color={THEME.colors.brand.teams}
            >
              {mergedPlatforms.teams.name}
            </InfoWithIcon>
          )}
          {mergedPlatforms.ePortal && (
            <InfoWithIcon
              onClick={handleOpenLink(mergedPlatforms.ePortal.url)}
              icon={FaUserFriends}
              title="EPortal"
              color={THEME.colors.brand.ePortal}
            >
              {mergedPlatforms.ePortal.name}
            </InfoWithIcon>
          )}
        </InfoGrid>
      )}

      <Subheader>Pozostałe</Subheader>
      <NoInfoText>Nie znaleziono pozostałych informacji dla tego kursu</NoInfoText>
      {/* TODO: add note from course */}
    </EventInfoWrapper>
  )
}

export default EventInfo
