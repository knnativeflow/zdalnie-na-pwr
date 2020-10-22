import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import { History } from 'history'
import coursesReducer from './courses'
import eventsReducer from './events'

export default function createRootReducer(history: History) {
  return combineReducers({
    router: connectRouter(history),
    courses: coursesReducer,
    events: eventsReducer,
  })
}
