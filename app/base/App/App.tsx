import React, { ReactNode } from 'react'

import styled from '@emotion/styled'
import AppBar from 'components/AppBar'
import MenuBar from 'components/MenuBar'

type Props = {
  children: ReactNode
}

const AppWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  height: 100%;
  width: 100%;
`

const PageLayout = styled.div`
  overflow: hidden;
  flex: 1;
`

export default function App(props: Props) {
  const { children } = props

  return (
    <AppWrapper>
      <MenuBar />
      {children}
    </AppWrapper>
  )
}

export function AppWithNavigation(props: Props) {
  const { children } = props
  return (
    <App>
      <AppBar />
      <PageLayout>{children}</PageLayout>
    </App>
  )
}
