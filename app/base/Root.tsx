import React from 'react'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'connected-react-router'
import { hot } from 'react-hot-loader/root'
import moment from 'moment'

import { ThemeProvider } from '@material-ui/core/styles'

import { History } from 'history'
import { Store } from 'store'

import Routes from './Routes'
import theme from './styles/theme'

moment.locale('pl')

type Props = {
  store: Store
  history: History
}

const Root = ({ store, history }: Props) => (
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <ConnectedRouter history={history}>
        <Routes />
      </ConnectedRouter>
    </ThemeProvider>
  </Provider>
)

export default hot(Root)
