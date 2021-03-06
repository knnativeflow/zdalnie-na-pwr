import React from 'react'
import { Route, Switch } from 'react-router-dom'
import { useSelector } from 'react-redux'

import routes from 'constants/routes.json'
import { RootState } from 'store'
import ChangeGoogleSettingsModal from 'components/ChangeGoogleSettingsMessageModal'
import { CalendarPage, ConfigurationPage, DashboardPage, SettingsPage } from 'pages'
import App, { AppWithNavigation } from './App'

const Routes = () => {
  const configured = useSelector((state: RootState) => state.user.configured)
  const wasShownGoogleSettingsMessage = useSelector((state: RootState) => state.app.wasShownGoogleSettingsMessage)

  if (!configured) {
    return (
      <App>
        <Route component={ConfigurationPage} />
      </App>
    )
  }

  return (
    <AppWithNavigation>
      <Switch>
        <Route path={routes.CALENDAR} component={CalendarPage} exact />
        <Route path={routes.SETTINGS} component={SettingsPage} exact />
        <Route path={routes.INDEX} component={DashboardPage} exact />
      </Switch>
      <ChangeGoogleSettingsModal isOpen={!wasShownGoogleSettingsMessage} />
    </AppWithNavigation>
  )
}

export default Routes
