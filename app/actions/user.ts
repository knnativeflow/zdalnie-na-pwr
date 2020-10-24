import { UPDATE_USER } from 'constants/actionTypes'

interface IActionUpdateUser {
  type: typeof UPDATE_USER
  payload: IUser
}

export type ActionUser = IActionUpdateUser

export const updateUser = (user: IUser): IActionUpdateUser => {
  return {
    type: UPDATE_USER,
    payload: user,
  }
}
