import React, { ReactNode } from 'react'
import BottomAppBar from 'components/BottomAppBar'
import TitleBar from 'components/TitleBar'

import styles from './App.scss'

type Props = {
  children: ReactNode
}

export default function App(props: Props) {
  const { children } = props
  return (
    <div className={styles.root}>
      <TitleBar />
      {children}
    </div>
  )
}

export function AppView(props: Props) {
  const { children } = props
  return (
    <App>
      {children}
      <BottomAppBar />
    </App>
  )
}
