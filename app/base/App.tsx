import React, { ReactNode } from 'react'
import AppBar from 'components/AppBar'

type Props = {
  children: ReactNode
}

export default function App(props: Props) {
  const { children } = props
  return (
    <div>
      <AppBar />
      {children}
    </div>
  )
}
