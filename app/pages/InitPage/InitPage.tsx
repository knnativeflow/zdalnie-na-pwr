import React from 'react'
import { useHistory } from 'react-router'

import routes from 'constants/routes.json'
import UploadICalendarFileModal from 'components/UploadICalendarFileModal'

const InitPage = () => {
  const history = useHistory()

  const handleSubmit = () => {
    history.push(routes.CALENDAR)
  }

  return <UploadICalendarFileModal open onSubmit={handleSubmit} onClose={() => {}} />
}

export default InitPage
