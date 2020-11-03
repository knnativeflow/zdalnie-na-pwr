import { SET_FULLSCREEN } from 'constants/actionTypes'

interface IActionFullscreen {
  type: typeof SET_FULLSCREEN
  payload: boolean
}

export type ActionApp = IActionFullscreen

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
