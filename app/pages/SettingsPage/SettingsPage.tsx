import React, { SyntheticEvent } from 'react'
import { useDispatch } from 'react-redux'
import { shell } from 'electron'
import Button from 'components/Button'

import { THEME } from 'base/theme/theme'
import { clearUser } from 'actions/user'
import styled from '@emotion/styled'

const APP_VERSION = process.env.npm_package_version

const Wrapper = styled.div`
  padding: 16px;
`

const Text = styled.p`
  font-size: 15px;
  color: #444;
`

const SettingsPage = () => {
  const dispatch = useDispatch()
  const logoutUser = () => dispatch(clearUser())

  const handleLink = (e: SyntheticEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    shell.openExternal(e.currentTarget.href)
  }

  return (
    <Wrapper>
      <Button color={THEME.colors.palette.blue.main} variant="primary" shadow onClick={logoutUser}>
        Wyloguj
      </Button>

      <Text>
        <a href="https://zdalnie.napwr.pl" onClick={handleLink}>
          O aplikacji
        </a>
      </Text>
      <Text>Wersja aplikacji {APP_VERSION}</Text>
      <Text>
        Rozwijane przez{' '}
        <a href="https://knnativeflow.napwr.pl" onClick={handleLink}>
          KN Native Flow
        </a>
      </Text>
    </Wrapper>
  )
}

export default SettingsPage
