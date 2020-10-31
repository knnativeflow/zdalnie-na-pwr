import React from 'react'
import { NavLink } from 'react-router-dom'
import { Button } from '@material-ui/core'
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
// TODO: style nav buttons, remove material btns
const AppBar = () => {
  return (
    <>
      <AppBarWrapper>
        <ActionsWrapper>
          <NavLink to={routes.INDEX} activeStyle={{ color: '#fff', opacity: 1 }} exact>
            <Button color="inherit">Panel</Button>
          </NavLink>
          <NavLink to={routes.CALENDAR} activeStyle={{ color: '#fff', opacity: 1 }}>
            <Button color="inherit">Kalendarz</Button>
          </NavLink>
        </ActionsWrapper>
        <ActionsWrapper>
          <NavLink to={routes.SETTINGS} activeStyle={{ color: '#fff', opacity: 1 }}>
            <Button color="inherit">Ustawienia</Button>
          </NavLink>
        </ActionsWrapper>
      </AppBarWrapper>
    </>
  )
}

export default AppBar
