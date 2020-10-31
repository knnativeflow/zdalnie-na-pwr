import React, { Fragment } from 'react'
import { render } from 'react-dom'
import { AppContainer as ReactHotAppContainer } from 'react-hot-loader'
import initSentry from './initSentry'

import { history, configuredStore } from './store'
import './app.global.css'
import { Synchronization } from './features/synchronization/Synchronization'

const redux = configuredStore()

initSentry()
new Synchronization(redux)

const AppContainer = process.env.PLAIN_HMR ? Fragment : ReactHotAppContainer

document.addEventListener('DOMContentLoaded', () => {
  // eslint-disable-next-line global-require
  const Root = require('./base/Root').default
  render(
    <AppContainer>
      <Root store={redux.store} history={history} persistor={redux.persistor} />
    </AppContainer>,
    document.getElementById('root')
  )
})
