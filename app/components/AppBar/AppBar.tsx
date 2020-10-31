import React from 'react'
import { NavLink } from 'react-router-dom'
import { AppBar as AppBarMaterialUI, Typography, Button } from '@material-ui/core'

import routes from 'constants/routes.json'
import styles from './AppBar.scss'

const AppBar = () => {
  return (
    <AppBarMaterialUI position="static" classes={{ root: styles.appBar }}>
      <Typography variant="h6">Zdalnie na PWr</Typography>
      <div>
        <NavLink to={routes.INDEX} activeStyle={{ color: '#fff', opacity: 1 }}>
          <Button color="inherit">Panel</Button>
        </NavLink>
        <NavLink to={routes.CALENDAR} activeStyle={{ color: '#fff', opacity: 1 }}>
          <Button color="inherit">Kalendarz</Button>
        </NavLink>
        <NavLink to={routes.SETTINGS} activeStyle={{ color: '#fff', opacity: 1 }}>
          <Button color="inherit">Ustawienia</Button>
        </NavLink>
      </div>
    </AppBarMaterialUI>
  )
}

export default AppBar
