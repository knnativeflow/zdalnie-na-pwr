import React, { Fragment } from 'react'
import { render } from 'react-dom'
import { AppContainer as ReactHotAppContainer } from 'react-hot-loader'
import dotenv from 'dotenv'
import { history, configuredStore } from './store'
import './app.global.css'

const { store, persistor } = configuredStore()

const AppContainer = process.env.PLAIN_HMR ? Fragment : ReactHotAppContainer

dotenv.config()

document.addEventListener('DOMContentLoaded', () => {
  // eslint-disable-next-line global-require
  const Root = require('./base/Root').default
  render(
    <AppContainer>
      <Root store={store} history={history} persistor={persistor} />
    </AppContainer>,
    document.getElementById('root')
  )
})
