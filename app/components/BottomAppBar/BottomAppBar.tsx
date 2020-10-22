import React from 'react'
import { AppBar as AppBarMaterialUI, Typography } from '@material-ui/core'
import { shell } from 'electron'

import styles from './BottomAppBar.scss'

const BottomAppBar = () => {
  const handleLink = () => {
    shell.openExternal('https://knnativeflow.napwr.pl')
  }

  return (
    <AppBarMaterialUI position="static" color="primary" classes={{ root: styles.root }}>
      <Typography variant="body1" align="left">
        Powered by{' '}
        <span onClick={handleLink} className={styles.link}>
          KN Native Flow
        </span>
      </Typography>
      <Typography variant="body1" align="center">
        Prototype - version 0.0.1
      </Typography>
      <Typography variant="body1" classes={{ root: styles.link }} align="right">
        O aplikacji
      </Typography>
    </AppBarMaterialUI>
  )
}

export default BottomAppBar
