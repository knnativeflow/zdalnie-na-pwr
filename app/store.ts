import ElectronStore from 'electron-store'
import { configureStore, getDefaultMiddleware, Action } from '@reduxjs/toolkit'
import { createHashHistory } from 'history'
import { routerMiddleware } from 'connected-react-router'
import { createLogger } from 'redux-logger'
import { ThunkAction } from 'redux-thunk'

import { persistStore, persistReducer } from 'redux-persist'
import createElectronStorage from 'redux-persist-electron-storage'

// eslint-disable-next-line import/no-cycle
import createRootReducer from 'reducers/rootReducer'

export const history = createHashHistory()
const rootReducer = createRootReducer(history)
export type RootState = ReturnType<typeof rootReducer>

const router = routerMiddleware(history)
const middleware = [...getDefaultMiddleware(), router]

const excludeLoggerEnvs = ['test', 'production']
const shouldIncludeLogger = !excludeLoggerEnvs.includes(process.env.NODE_ENV || '')

const persistConfig = {
  key: 'root',
  storage: createElectronStorage(),
  blacklist: ['router'],
}

const persistedReducer = persistReducer<RootState>(persistConfig, rootReducer)

const electronStore = new ElectronStore()
createElectronStorage({
  electronStore,
})

if (shouldIncludeLogger) {
  const logger = createLogger({
    level: 'info',
    collapsed: true,
  })
  middleware.push(logger)
}

// TODO: fix it after close this issue https://github.com/rt2zz/redux-persist/pull/1085
export const configuredStore = (initialState?: RootState) => {
  // Create Store
  const store = configureStore({
    reducer: persistedReducer,
    middleware,
    preloadedState: initialState,
  })

  const persistor = persistStore(store)

  return { store, persistor }
}
export type Store = ReturnType<typeof configuredStore>
export type AppThunk = ThunkAction<void, RootState, unknown, Action<string>>
