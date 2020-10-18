import React, { ReactNode } from 'react'
import AppBar from 'components/AppBar'
import BottomAppBar from 'components/BottomAppBar'

type Props = {
  children: ReactNode
}

export default function App(props: Props) {
  const { children } = props
  return (
    <div>
      <AppBar />
      {children}
      <BottomAppBar />
    </div>
  )
}
