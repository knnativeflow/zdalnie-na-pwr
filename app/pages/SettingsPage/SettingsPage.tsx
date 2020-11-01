import React from 'react'
import BottomAppBar from 'components/BottomAppBar'
import Button from 'components/Button'
import { useDispatch } from 'react-redux'
import { clearUser } from 'actions/user'
import { THEME } from 'base/theme/theme'

const SettingsPage = () => {
  const dispatch = useDispatch()
  const logoutUser = () => dispatch(clearUser())
  return (
    <div>
      <Button color={THEME.colors.palette.blue.main} variant="primary" shadow onClick={logoutUser}>
        Wyloguj
      </Button>
      <BottomAppBar />
    </div>
  )
}

export default SettingsPage
