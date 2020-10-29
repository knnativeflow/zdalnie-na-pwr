import React from 'react'
import { Switch, Route } from 'react-router-dom'
import { useSelector } from 'react-redux'

import routes from 'constants/routes.json'
import { RootState } from 'store'
import { CalendarPage, CourseListPage, HomePage, ConfigurationPage, WelcomePage } from 'pages'
import App from './App'
import { AppView } from './App/App'

const Routes = () => {
  const configured = useSelector((state: RootState) => state.user.configured)
  if (!configured)
    return (
      <App>
        <Route component={ConfigurationPage} />
      </App>
    )

  return (
    <AppView>
      <Switch>
        <Route path={routes.WELCOME_PAGE} component={WelcomePage} exact />
        <Route path={routes.CALENDAR} component={CalendarPage} exact />
        <Route path={routes.COURSE_LIST} component={CourseListPage} exact />
        <Route path={routes.HOME} component={HomePage} exact />
      </Switch>
    </AppView>
  )
}

export default Routes
