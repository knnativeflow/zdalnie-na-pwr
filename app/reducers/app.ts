import { SET_FULLSCREEN, SET_SHOWN_STATUS_GOOGLE_SETTINGS_MESSAGE } from 'constants/actionTypes'

import { ActionApp } from 'actions/app'
import { IAppRedux } from 'domain/app'

const INIT_STATE: IAppRedux = {
  isFullscreen: false,
  wasShownGoogleSettingsMessage: false,
}

const appReducer = (state = INIT_STATE, action: ActionApp) => {
  switch (action.type) {
    case SET_FULLSCREEN:
      return { ...state, isFullscreen: action.payload }
    case SET_SHOWN_STATUS_GOOGLE_SETTINGS_MESSAGE:
      return { ...state, wasShownGoogleSettingsMessage: action.payload }
    default:
      return state
  }
}

export default appReducer
