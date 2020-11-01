import React from 'react'
import { NavLink } from 'react-router-dom'
import { BsCalendar, FaRegBookmark } from 'react-icons/all'
import styled from '@emotion/styled'

import routes from 'constants/routes.json'
import { MENU_BAR_HEIGHT } from 'components/MenuBar/MenuBar.styled'

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

const Link = styled(NavLink)`
  display: flex;
  align-items: center;
  font-weight: 700;

  margin-right: 32px;
  transition: all 0.2s ease-in-out;

  svg {
    font-size: 18px;
    margin-right: 5px;
  }

  &:hover {
    opacity: 0.5;
  }
`

const activeStyle = { color: '#fff', opacity: 1 }

// TODO: style nav buttons
const AppBar = () => {
  return (
    <>
      <AppBarWrapper>
        <ActionsWrapper>
          <Link to={routes.INDEX} activeStyle={activeStyle} exact>
            <FaRegBookmark /> Panel
          </Link>
          <Link to={routes.CALENDAR} activeStyle={activeStyle}>
            <BsCalendar /> Kalendarz
          </Link>
        </ActionsWrapper>
        <ActionsWrapper>
          <Link to={routes.SETTINGS} activeStyle={activeStyle}>
            Ustawienia
          </Link>
        </ActionsWrapper>
      </AppBarWrapper>
    </>
  )
}

export default AppBar
