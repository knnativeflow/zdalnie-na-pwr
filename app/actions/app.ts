import { SET_FULLSCREEN, SET_SHOWN_STATUS_GOOGLE_SETTINGS_MESSAGE } from 'constants/actionTypes'

interface IActionFullscreen {
  type: typeof SET_FULLSCREEN
  payload: boolean
}

interface IActionSetShownStatusGoogleSettingsMessage {
  type: typeof SET_SHOWN_STATUS_GOOGLE_SETTINGS_MESSAGE
  payload: boolean
}

export type ActionApp = IActionFullscreen | IActionSetShownStatusGoogleSettingsMessage

export const enterFullscreen = (): IActionFullscreen => {
  return {
    type: SET_FULLSCREEN,
    payload: true,
  }
}

export const leaveFullscreen = (): IActionFullscreen => {
  return {
    type: SET_FULLSCREEN,
    payload: false,
  }
}

export const setShownStatusGoogleSettingsMessage = (value: boolean): IActionSetShownStatusGoogleSettingsMessage => {
  return {
    type: SET_SHOWN_STATUS_GOOGLE_SETTINGS_MESSAGE,
    payload: value,
  }
}
