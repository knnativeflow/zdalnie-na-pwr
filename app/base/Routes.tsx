import React from 'react'
import { Redirect, Switch, Route } from 'react-router-dom'
import { useSelector } from 'react-redux'

import routes from 'constants/routes.json'
import { RootState } from 'store'
import { CalendarPage, CourseListPage, HomePage, InitPage } from 'pages'
import App from './App'

const Routes = () => {
  const courses = useSelector((state: RootState) => state.courseList)

  return (
    <App>
      <Switch>
        <Route path={routes.INIT} component={InitPage} />
        {courses.length ? (
          <Switch>
            <Route path={routes.CALENDAR} component={CalendarPage} />
            <Route path={routes.COURSE_LIST} component={CourseListPage} />
            <Route path={routes.HOME} component={HomePage} />
          </Switch>
        ) : (
          <Redirect to={routes.INIT} />
        )}
      </Switch>
    </App>
  )
}

export default Routes
