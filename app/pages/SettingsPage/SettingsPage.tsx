import React, { SyntheticEvent, useState } from 'react'
import { useDispatch } from 'react-redux'
import { shell } from 'electron'

import { clearUser } from 'actions/user'
import styled from '@emotion/styled'
import Button from 'components/Button'
import { THEME } from 'base/theme/theme'
import SmailPasswordChangeModal from 'components/SmailModal/SmailPasswordChangeModal'
import { useHistory } from 'react-router'

const APP_VERSION = process.env.npm_package_version

const Wrapper = styled.div`
  padding: 16px;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
// TODO: use correct colors
const ClearDataButton = styled.button`
  border: none;
  background: #b81e44;
  color: #fff;
  border-radius: 8px;
  padding: 10px 20px;
  font-weight: 600;
  transition: all 0.1s ease-in-out;
  box-shadow: 0 5px 8px -2px #ddaab7;
  margin-top: 50px;
  cursor: pointer;

  &:hover {
    background: #830827;
  }
`

const Text = styled.p`
  font-size: 15px;
  color: #292b31;
`

const SettingsPage = () => {
  const dispatch = useDispatch()
  const logoutUser = () => dispatch(clearUser())
  const history = useHistory()
  const urlParams = new URLSearchParams(history.location.search)
  const forcePasswordUpdate = (!!urlParams.get('forcePasswordUpdate') && urlParams.get('forcePasswordUpdate') == 'true') ?? false
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
      <ClearDataButton onClick={logoutUser}>Wyczyść dane aplikacji</ClearDataButton>
      <div style={{margin: '20px 0'}}>
        <Button
          glow
          color={THEME.colors.palette.purple.main}
          variant="primary"
          onClick={handlePasswordChange}
        >
          Zmien hasło do poczty
        </Button>
      </div>
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
