import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import { useSelector } from 'react-redux'

import routes from 'constants/routes.json'
import { RootState } from 'store'
import { CalendarPage, CourseListPage, HomePage, ConfigurationPage, WelcomePage } from 'pages'
import App from './App'

const Routes = () => {
  const configured = useSelector((state: RootState) => state.user.configured)

  return (
    <App>
      <Switch>
        <Switch>
          <Route path={routes.FIRST_CONFIGURATION} component={ConfigurationPage} exact />
          <Route path={routes.WELCOME_PAGE} component={WelcomePage} exact />
          {configured ? (
            <>
              <Route path={routes.CALENDAR} component={CalendarPage} exact />
              <Route path={routes.COURSE_LIST} component={CourseListPage} exact />
              <Route path={routes.HOME} component={HomePage} exact />
            </>
          ) : (
            <Redirect to={routes.WELCOME_PAGE} />
          )}
        </Switch>
      </Switch>
    </App>
  )
}

export default Routes
