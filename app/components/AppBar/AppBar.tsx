import React from 'react'
import { AppBar as AppBarMaterialUI, Typography } from '@material-ui/core'

import styles from './AppBar.scss'

const AppBar = () => {
  return (
    <AppBarMaterialUI position="static" classes={{ root: styles.appBar }}>
      <Typography variant="h6">Zdalnie na PWr</Typography>
    </AppBarMaterialUI>
  )
}

export default AppBar
