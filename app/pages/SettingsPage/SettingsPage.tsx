import React, { SyntheticEvent } from 'react'
import { useDispatch } from 'react-redux'
import { shell } from 'electron'

import { clearUser } from 'actions/user'
import styled from '@emotion/styled'

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
const Button = styled.button`
  border: none;
  background: #5c7ca8;
  color: #fff;
  border-radius: 16px;
  padding: 16px 24px;
  font-weight: 700;
  transition: all 0.1s ease-in-out;
  box-shadow: 0 5px 8px -2px #cbd9ec;
  cursor: pointer;
  margin-bottom: 24px;

  &:hover {
    background: #5378ac;
  }
`

const Text = styled.p`
  font-size: 15px;
  color: #292b31;
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
      <Button onClick={logoutUser}>Wyloguj</Button>

      <Text>
        <a href="https://zdalnie.napwr.pl" onClick={handleLink}>
          O aplikacji
        </a>
      </Text>
      <Text>
        Rozwijane przez{' '}
        <a href="https://knnativeflow.napwr.pl" onClick={handleLink}>
          KN Native Flow
        </a>
      </Text>
      <Text>Wersja aplikacji {APP_VERSION}</Text>
    </Wrapper>
  )
}

export default SettingsPage
