import { configureStore, Action } from '@reduxjs/toolkit'
import { createHashHistory } from 'history'
import { routerMiddleware } from 'connected-react-router'
import { createLogger } from 'redux-logger'
import { ThunkAction } from 'redux-thunk'
import { persistStore, persistReducer, createMigrate } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

// eslint-disable-next-line import/no-cycle
import createRootReducer from 'reducers/rootReducer'
import migrations from './migrations'

export const history = createHashHistory()
const rootReducer = createRootReducer(history)
export type RootState = ReturnType<typeof rootReducer>

const router = routerMiddleware(history)
const middleware = [router]

const excludeLoggerEnvs = ['test', 'production']
const shouldIncludeLogger = !excludeLoggerEnvs.includes(process.env.NODE_ENV || '')

const persistConfig = {
  key: 'root',
  version: 4,
  storage,
  blacklist: ['router'],
  // @ts-ignore
  migrate: createMigrate(migrations),
}

const persistedReducer = persistReducer<RootState>(persistConfig, rootReducer)

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
