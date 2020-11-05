import { CLEAR_USER, UPDATE_USER } from 'constants/actionTypes'
import { ActionUser } from 'actions/user'
import { IUser } from 'domain/user'

const INIT_STATE: IUser = { configured: false }

const reducerUser = (state = INIT_STATE, action: ActionUser) => {
  switch (action.type) {
    case UPDATE_USER:
      return { ...state, ...action.payload }
    case CLEAR_USER:
      return INIT_STATE
    default:
      return state
  }
}

export default reducerUser
