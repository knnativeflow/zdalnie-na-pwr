import { UPDATE_USER, CLEAR_USER } from 'constants/actionTypes'
import { IUser } from 'domain/user'

interface IActionUpdateUser {
  type: typeof UPDATE_USER
  payload: IUser
}

interface IActionClearUser {
  type: typeof CLEAR_USER
}

export type ActionUser = IActionUpdateUser | IActionClearUser

export const updateUser = (user: IUser): IActionUpdateUser => {
  return {
    type: UPDATE_USER,
    payload: user,
  }
}

export const clearUser = (): IActionClearUser => {
  return {
    type: CLEAR_USER,
  }
}
