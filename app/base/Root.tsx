import React from 'react'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'connected-react-router'
import { PersistGate } from 'redux-persist/integration/react'
import { Persistor } from 'redux-persist/es/types'
import { hot } from 'react-hot-loader/root'
import moment from 'moment'

import { ThemeProvider } from '@material-ui/core/styles'

import { History } from 'history'
import { Store } from 'store'
import UniversalAnalyticsListener from 'components/UniversalAnalyticsListener'

import Routes from './Routes'
import theme from './theme/theme'

moment.locale('pl')

type Props = {
  store: Store
  history: History
  persistor: Persistor
}

const Root = ({ store, persistor, history }: Props) => (
  // TODO: fix type error
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <ThemeProvider theme={theme}>
        <ConnectedRouter history={history}>
          <UniversalAnalyticsListener>
            <Routes />
          </UniversalAnalyticsListener>
        </ConnectedRouter>
      </ThemeProvider>
    </PersistGate>
  </Provider>
)

export default hot(Root)
