import { SET_FETCH_STATUS_MAIL } from 'constants/actionTypes'
import { ActionMail } from 'actions/mail'
import { IFetchStatusMailRedux } from 'domain/mail'

const INIT_STATE: IFetchStatusMailRedux = {
  isLoading: false,
  error: '',
  lastScan: null,
}

const mailReducer = (state = INIT_STATE, action: ActionMail) => {
  switch (action.type) {
    case SET_FETCH_STATUS_MAIL:
      return { ...state, ...action.payload }
    default:
      return state
  }
}

export default mailReducer
