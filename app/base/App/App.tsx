import React, { ReactNode } from 'react'
import { Box } from '@material-ui/core'

import AppBar from 'components/AppBar'
import MenuBar from 'components/MenuBar'
import styles from './App.scss'

type Props = {
  children: ReactNode
}

export default function App(props: Props) {
  const { children } = props
  return (
    <div className={styles.root}>
      <MenuBar />
      {children}
    </div>
  )
}

export function AppView(props: Props) {
  const { children } = props
  return (
    <App>
      <AppBar />
      <Box display="flex" flex={1} style={{ overflowY: 'auto', overflowX: 'hidden' }}>
        {children}
      </Box>
    </App>
  )
}
