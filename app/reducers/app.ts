import { SET_FULLSCREEN } from 'constants/actionTypes'

import { ActionApp } from 'actions/app'
import { IAppRedux } from 'domain/app'

const INIT_STATE: IAppRedux = {
  isFullscreen: false,
}

const appReducer = (state = INIT_STATE, action: ActionApp) => {
  switch (action.type) {
    case SET_FULLSCREEN:
      return { ...state, isFullscreen: action.payload }
    default:
      return state
  }
}

export default appReducer
