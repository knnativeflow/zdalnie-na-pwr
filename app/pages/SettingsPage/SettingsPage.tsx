import React from 'react'
import BottomAppBar from 'components/BottomAppBar'
import Button from 'components/Button'
import { APP_COLORS } from 'base/theme/theme'
import { useDispatch } from 'react-redux'
import { clearUser } from 'actions/user'

const SettingsPage = () => {
  const dispatch = useDispatch()
  const logoutUser = () => dispatch(clearUser())
  return (
    <div>
      <Button color={APP_COLORS.blue.main} primary shadow onClick={logoutUser}>
        Wyloguj
      </Button>
      <BottomAppBar />
    </div>
  )
}

export default SettingsPage
