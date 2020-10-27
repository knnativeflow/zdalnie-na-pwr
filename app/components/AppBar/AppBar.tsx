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
        <NavLink to={routes.HOME} activeStyle={{ color: '#fff', opacity: 1 }}>
          <Button color="inherit">Home</Button>
        </NavLink>
        <NavLink to={routes.CALENDAR} activeStyle={{ color: '#fff', opacity: 1 }}>
          <Button color="inherit">Kalendarz</Button>
        </NavLink>
        <Button color="inherit" disabled>
          Lista kursów
        </Button>
      </div>
    </AppBarMaterialUI>
  )
}

export default AppBar
