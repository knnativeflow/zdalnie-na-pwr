import React, { useState } from 'react'
import Login from './steps/Login'
import FetchLink from './steps/FetchLinks'

interface Props {
  open: boolean
  onClose: () => void
}

const StudentMailModal = (props: Props): JSX.Element => {
  const { open, onClose } = props
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const handleSuccessLogin = () => {
    setIsLoggedIn(true)
  }

  const handleSuccessFetchLinks = () => {
    onClose()
  }

  if (open && !isLoggedIn) {
    return <Login open onSuccess={handleSuccessLogin} onClose={onClose} />
  }

  if (open && isLoggedIn) {
    return <FetchLink open onSuccess={handleSuccessFetchLinks} onClose={onClose} />
  }

  return <></>
}

export default StudentMailModal
