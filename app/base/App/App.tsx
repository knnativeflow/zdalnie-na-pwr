import React, { ReactNode } from 'react'

import styled from '@emotion/styled'
import AppBar from 'components/AppBar'
import MenuBar from 'components/MenuBar'
import { FaExclamationTriangle } from 'react-icons/all'
import { THEME } from 'base/theme/theme'
import { shell } from 'electron'

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

const ProblemReport = styled.div`
  position: absolute;
  padding: 0.5em 1em;
  left: 0;
  bottom: 0;
  font-size: 0.75em;
  font-weight: bold;
  color: ${THEME.colors.mid};
  background-color: ${THEME.colors.light};
  z-index: 1;
  opacity: 0.75;
  transition: all 0.2s ease;
  cursor: pointer;
  border-top-right-radius: 0.5em;
  transform-origin: left bottom;
  transform: scale(0.75);

  &:hover {
    opacity: 1;
    color: ${THEME.colors.palette.purple.main};
    transform: scale(1);
  }
`

export default function App(props: Props) {
  const { children } = props

  return (
    <AppWrapper>
      <MenuBar />
      {children}
      <ProblemReport onClick={() => shell.openExternal('https://m.me/knnativeflow')}>
        <FaExclamationTriangle /> Zgłoś problem
      </ProblemReport>
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
