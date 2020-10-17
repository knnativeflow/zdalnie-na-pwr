import React from 'react'
import { Link } from 'react-router-dom'
import routes from '../../constants/routes.json'

const CalendarPage = () => {
  return (
    <div>
      <h1>Calendar Page</h1>
      <Link to={routes.HOME}>To home</Link>
    </div>
  )
}

export default CalendarPage
