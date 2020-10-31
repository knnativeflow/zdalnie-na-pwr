import React, { ReactNode } from 'react'
import TitleBar from 'components/TitleBar'

import { Box } from '@material-ui/core'
import AppBar from 'components/AppBar'
import { useSelector } from 'react-redux'
import { RootState } from 'store'
import styles from './App.scss'

type Props = {
  children: ReactNode
}

export default function App(props: Props) {
  const { children } = props
  const configured = useSelector((state: RootState) => state.user.configured)
  return (
    <div className={styles.root}>
      <TitleBar light={!!configured} />
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
