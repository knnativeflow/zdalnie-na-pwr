import React, { ReactNode } from 'react'
import AppBar from 'components/AppBar'
import BottomAppBar from 'components/BottomAppBar'

import styles from './App.scss'

type Props = {
  children: ReactNode
}

export default function App(props: Props) {
  const { children } = props
  return (
    <div className={styles.root}>
      <AppBar />
      <div className={styles.content}>{children}</div>
      <BottomAppBar />
    </div>
  )
}
