import React from 'react'
import { useSelector } from 'react-redux'
import { shell } from 'electron'
import moment from 'moment'
import styled from '@emotion/styled'
import {
  FaBookOpen,
  FaBookReader,
  FaCalendarAlt,
  FaChalkboardTeacher,
  FaHashtag,
  FaUserFriends,
  FaVideo,
  FaVideoSlash,
} from 'react-icons/all'

import { IEventWithCourse } from 'domain/event'
import { RootState } from 'store'
import { THEME } from 'base/theme/theme'
import { eventColor, eventFullText } from 'utils/courseTypes'
import InfoWithIcon from 'components/InfoWithIcon'
import EventInfoNote from './EventInfoNote'
import EventInfoLinksModal from './EventInfoLinksModal'

const EventInfoWrapper = styled.div`
  padding: 16px;
`

const Title = styled.p`
  font-weight: 700;
  margin: 0 0 24px;
`

const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-auto-rows: auto;
  grid-gap: 8px;
  margin: 0 0 24px;

  @media (max-width: 1200px) {
    // TODO: use variable
    grid-template-columns: 1fr;
  }
`

const NoInfoText = styled.p`
  margin: 0 0 24px;
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
  event?: IEventWithCourse
}

const EventInfo = ({ event }: Props) => {
  const events = useSelector((state: RootState) => state.events)

  if (!event) {
    return (
      <EventInfoWrapper>
        <NoEventText>Wybierz zajęcia, aby zobaczyć ich szczegóły ;)</NoEventText>
      </EventInfoWrapper>
    )
  }

  const eventCourse = event.course

  if (!eventCourse) return <EventInfoWrapper>Nastąpił błąd :(</EventInfoWrapper>
  const { note, classesCode } = eventCourse

  const { name, type, start, end, lecturer, platforms: platformsEvent } = event
  const mergedPlatforms = { ...eventCourse.platforms, ...platformsEvent }
  const usingZoomPlatform = events.some((event) => event.code === classesCode && event.platforms.zoom)
  const hasPlatforms = !!Object.values(mergedPlatforms).filter((plaform) => !!plaform).length || usingZoomPlatform
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
          {classesCode}
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

      <EventInfoLinksModal {...{ classesCode, color, eventCourse }} />

      {!hasPlatforms && <NoInfoText>Nie znaleziono informacji o zdalnym nauczaniu dla tych zajęć</NoInfoText>}

      {hasPlatforms && (
        <InfoGrid>
          {eventCourse.platforms.zoom?.url && (
            <InfoWithIcon
              onClick={handleOpenLink(eventCourse.platforms.zoom.url)}
              icon={FaVideo}
              title="ZOOM"
              color={THEME.colors.brand.zoom}
            >
              spotkanie odnawialne
            </InfoWithIcon>
          )}
          {event.platforms.zoom?.url && (
            <InfoWithIcon
              onClick={handleOpenLink(event.platforms.zoom.url)}
              icon={FaVideo}
              title="ZOOM"
              color={THEME.colors.brand.zoom}
            >
              spotkanie jednorazowe
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
              icon={FaUserFriends}
              title={mergedPlatforms.teams.name && 'Teams'}
              color={THEME.colors.brand.teams}
            >
              {mergedPlatforms.teams.name ?? <b>Teams</b>}
            </InfoWithIcon>
          )}
          {mergedPlatforms.ePortal && (
            <InfoWithIcon
              onClick={handleOpenLink(mergedPlatforms.ePortal.url)}
              icon={FaBookReader}
              title={mergedPlatforms.ePortal.name && 'ePortal'}
              color={THEME.colors.brand.ePortal}
            >
              {mergedPlatforms.ePortal.name ?? <b>ePortal</b>}
            </InfoWithIcon>
          )}
        </InfoGrid>
      )}

      <EventInfoNote savedText={note} classesCode={classesCode} />
    </EventInfoWrapper>
  )
}

export default EventInfo
