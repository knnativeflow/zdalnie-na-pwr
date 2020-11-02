import React, { useState } from 'react'
import Login from './steps/Login'
import JsosExtracting from './steps/JsosExtracting'
// import FetchLink from './steps/FetchLinks'

interface Props {
  open: boolean
  onClose: () => void
}

const JsosSignInAndExtracting = (props: Props): JSX.Element => {
  const { open, onClose } = props
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isCalendarFetched] = useState(false)

  const handleSuccessLogin = () => {
    setIsLoggedIn(true)
  }

  const handleSuccessFetchLinks = () => {
    onClose()
  }

  if (open && !isLoggedIn) {
    return <Login open onSuccess={handleSuccessLogin} onClose={onClose} />
  }

  if (open && isLoggedIn && !isCalendarFetched) {
    return <JsosExtracting open onSuccess={handleSuccessFetchLinks} onClose={onClose} />
  }

  if (open && isLoggedIn) {
    onClose()
  }

  return <></>
}

export default JsosSignInAndExtracting
