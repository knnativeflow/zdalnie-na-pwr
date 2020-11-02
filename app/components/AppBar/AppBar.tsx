import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { FaRegCalendarAlt, FaRegBookmark, FaSync, FaTools } from 'react-icons/all'
import { css, keyframes } from '@emotion/core'
import styled from '@emotion/styled'
import moment from 'moment'

import routes from 'constants/routes.json'
import { MENU_BAR_HEIGHT } from 'components/MenuBar/MenuBar.styled'
import { SmailRefresher } from 'features/synchronization'
import { addZoomLinks } from 'actions/events'

const AppBarWrapper = styled.div`
  background: #759ccb;
  height: 60px;
  margin-top: ${MENU_BAR_HEIGHT};
  flex-shrink: 0;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 10px;
`

const ActionsWrapper = styled.div`
  display: flex;
  align-items: center;
`

const link = css`
  font-family: 'Open Sans';
  font-size: 14px;
  display: flex;
  align-items: center;
  font-weight: 700;
  background: none;
  border: none;
  opacity: 0.75;
  cursor: pointer;

  margin-right: 32px;
  transition: all 0.2s ease-in-out;

  svg {
    font-size: 18px;
    margin-right: 5px;
  }

  &:hover {
    opacity: 0.5;
  }

  &:disabled {
    color: #53678c;
    cursor: initial;

    &:hover {
      opacity: 0.75;
    }
  }
`

const Link = styled(NavLink)`
  ${link}
`

const Button = styled.button`
  ${link}
`

const spinAnim = keyframes`
  0% {
    transform: rotate(0deg)
  }
  100% {

    transform: rotate(360deg)
  }
`

const SyncIcon = styled(FaSync, {
  shouldForwardProp: (prop) => prop !== 'animate',
})<{ animate: boolean }>`
  ${({ animate }) =>
    animate &&
    css`
      animation: ${spinAnim} 1s linear infinite;
    `}
`

const RefreshWrapper = styled.span`
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  span {
    line-height: 1;
    margin-bottom: 2px;
  }

  small {
    line-height: 1;
    font-size: 10px;
    font-weight: 500;
    opacity: 0.7;
  }
`

const activeStyle = { color: '#fff', opacity: 1 }

// TODO: style nav buttons and active state
const AppBar = () => {
  const dispatch = useDispatch()
  const [isSmailRefreshing, setIsSmailRefreshing] = useState(false)
  const lastUpdateDate = new Date()

  const refreshSmail = async () => {
    try {
      setIsSmailRefreshing(true)
      const zoomLinks = await SmailRefresher.refresh()
      dispatch(addZoomLinks(zoomLinks, false))
    } catch (e) {
      // eslint-disable-next-line
      console.error(e)
    } finally {
      setIsSmailRefreshing(false)
    }
  }

  return (
    <>
      <AppBarWrapper>
        <ActionsWrapper>
          <Link to={routes.INDEX} activeStyle={activeStyle} exact>
            <FaRegBookmark /> Panel
          </Link>
          <Link to={routes.CALENDAR} activeStyle={activeStyle}>
            <FaRegCalendarAlt /> Kalendarz
          </Link>
        </ActionsWrapper>
        <ActionsWrapper>
          <Button onClick={refreshSmail} disabled={isSmailRefreshing}>
            <SyncIcon animate={isSmailRefreshing} />
            <RefreshWrapper>
              <span>Odśwież dane</span>
              <small>Zaktualizowano o {moment(lastUpdateDate).format('HH:mm')}</small>
            </RefreshWrapper>
          </Button>
          <Link to={routes.SETTINGS} activeStyle={activeStyle}>
            <FaTools /> Ustawienia
          </Link>
        </ActionsWrapper>
      </AppBarWrapper>
    </>
  )
}

export default AppBar
