import React, { SyntheticEvent, useState } from 'react'
import { useHistory } from 'react-router'
import { useDispatch } from 'react-redux'
import { remote, shell } from 'electron'

import { clearUser } from 'actions/user'
import styled from '@emotion/styled'
import Button from 'components/Button'
import { THEME } from 'base/theme/theme'
import SmailPasswordChangeModal from 'components/SmailModal/SmailPasswordChangeModal'

const APP_VERSION = remote.app.getVersion()

const Wrapper = styled.div`
  padding: 16px;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const Text = styled.p`
  font-size: 15px;
  color: #292b31;

  a {
    color: #1078ff;
  }
`

const SettingsPage = () => {
  const dispatch = useDispatch()
  const logoutUser = () => dispatch(clearUser())
  const history = useHistory()
  const urlParams = new URLSearchParams(history.location.search)
  const forcePasswordUpdate = urlParams.get('forcePasswordUpdate') === 'true'
  const [isPasswordChangeModalOpen, setIsPasswordChangeModal] = useState(forcePasswordUpdate)

  const handleLink = (e: SyntheticEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    shell.openExternal(e.currentTarget.href)
  }

  const handlePasswordChange = () => {
    setIsPasswordChangeModal(true)
  }

  const closePasswordChangeModal = () => {
    setIsPasswordChangeModal(false)
  }

  return (
    <Wrapper>
      <Text>
        <a href="https://zdalnie.napwr.pl" onClick={handleLink}>
          O aplikacji
        </a>
      </Text>
      <Text>
        Rozwijane przez{' '}
        <a href="https://nativeflow.napwr.pl" onClick={handleLink}>
          KN Native Flow
        </a>
      </Text>
      <Text>Wersja aplikacji {APP_VERSION}</Text>
      <Button
        glow
        color={THEME.colors.palette.purple.main}
        variant="primary"
        onClick={handlePasswordChange}
        style={{ margin: '16px 0' }}
      >
        Zmień hasło do poczty
      </Button>

      <Button glow color="#b81e44" variant="primary" onClick={logoutUser}>
        Wyczyść dane aplikacji
      </Button>
      <SmailPasswordChangeModal
        forcedUpdate={forcePasswordUpdate}
        open={isPasswordChangeModalOpen}
        onSuccess={closePasswordChangeModal}
        onClose={closePasswordChangeModal}
      />
    </Wrapper>
  )
}

export default SettingsPage
