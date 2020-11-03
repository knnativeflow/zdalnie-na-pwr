import { SET_FETCH_STATUS_MAIL } from 'constants/actionTypes'

interface IActionSetFetchStatusMailPayload {
  error?: string | null
  isLoading?: boolean
  lastScan?: string
}

interface IActionSetFetchStatusMail {
  type: typeof SET_FETCH_STATUS_MAIL
  payload: IActionSetFetchStatusMailPayload
}

export type ActionMail = IActionSetFetchStatusMail

export const setFetchStatusMail = (payload: IActionSetFetchStatusMailPayload): IActionSetFetchStatusMail => {
  return {
    type: SET_FETCH_STATUS_MAIL,
    payload,
  }
}
