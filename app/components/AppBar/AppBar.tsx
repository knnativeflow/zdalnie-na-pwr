import React from 'react'
import { NavLink } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { FaRegCalendarAlt, FaRegBookmark, FaSync, FaTools } from 'react-icons/all'
import { css, keyframes } from '@emotion/core'
import styled from '@emotion/styled'
import moment from 'moment'

import routes from 'constants/routes.json'
import { MENU_BAR_HEIGHT } from 'components/MenuBar/MenuBar.styled'
import { SmailRefresher } from 'features/synchronization'
import { addZoomLinks } from 'actions/events'
import { RootState } from 'store'
import { setFetchStatusMail } from 'actions/mail'
import { parseDateToString } from 'utils/date'

const AppBarWrapper = styled.div<{ isFullscreen: boolean }>`
  background: #41aaff;
  height: 60px;
  margin-top: ${({ isFullscreen }) => (isFullscreen ? 0 : MENU_BAR_HEIGHT)};
  flex-shrink: 0;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0;
  box-shadow: 0 2px 6px 0 #9ed0ff;
  z-index: 999;
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
  padding: 15px 0;
  margin: 0 16px;
  transition: all 0.2s ease-in-out;
  cursor: pointer;

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
  outline: none;
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
  const { lastScan: lastScanMail, isLoading: isLoadingMail } = useSelector((state: RootState) => state.mail)
  const isFullscreen = useSelector(({ app }: RootState) => app.isFullscreen)

  const refreshSmail = async () => {
    try {
      dispatch(setFetchStatusMail({ isLoading: true, error: '' }))
      const zoomLinks = await SmailRefresher.refresh()
      dispatch(addZoomLinks(zoomLinks, true))
      dispatch(setFetchStatusMail({ isLoading: false, lastScan: parseDateToString(new Date()), error: '' }))
    } catch (error) {
      console.error('AppBar.tsx', 'refreshSmail', error?.message, error)
      dispatch(setFetchStatusMail({ isLoading: false, error: error?.message }))
    }
  }

  return (
    <>
      <AppBarWrapper isFullscreen={isFullscreen}>
        <ActionsWrapper>
          <Link to={routes.INDEX} activeStyle={activeStyle} exact>
            <FaRegBookmark
              style={{
                marginTop: 2, // because of icon shifted center of mass
              }}
            />
            Panel
          </Link>
          <Link to={routes.CALENDAR} activeStyle={activeStyle}>
            <FaRegCalendarAlt /> Kalendarz
          </Link>
        </ActionsWrapper>
        <ActionsWrapper>
          <Button onClick={refreshSmail} disabled={isLoadingMail}>
            <SyncIcon animate={isLoadingMail} />
            <RefreshWrapper>
              <span>Odśwież dane</span>
              <small>
                {lastScanMail ? `Zaktualizowano ${moment(lastScanMail).fromNow()}` : 'Nie aktualizowano wcześniej'}
              </small>
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
