import React from 'react'
import { Link } from 'react-router-dom'
import routes from 'constants/routes.json'

const HomePage = () => {
  return (
    <div>
      <h1>Home view</h1>
      <Link to={routes.CALENDAR}>To calendar</Link>
    </div>
  )
}

export default HomePage
