import React, { useState } from 'react'
import { useHistory } from 'react-router'

import routes from 'constants/routes.json'
import UploadICalendarFileModal from 'components/UploadICalendarFileModal'
import JsosSignInAndExtracting from 'components/JsosModal'

const InitPage = () => {
  const history = useHistory()
  const [openJsosModal, setOpenJsosModal] = useState(false)
  const redirectToCalendar = () => {
    history.push(routes.CALENDAR)
  }

  const handleJsosModal = () => {
    setOpenJsosModal(true)
  }

  return openJsosModal ? (
    <JsosSignInAndExtracting open={openJsosModal} onClose={redirectToCalendar} />
  ) : (
    <UploadICalendarFileModal open onSubmit={redirectToCalendar} onJsos={handleJsosModal} onClose={() => {}} />
  )
}

export default InitPage
