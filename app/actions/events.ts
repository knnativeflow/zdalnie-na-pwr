import { ADD_EVENT_ZOOM_LINKS, ADD_EVENTS, CLEAR_EVENTS } from 'constants/actionTypes'

interface IActionAddEvents {
  type: typeof ADD_EVENTS
  payload: IEvent[]
}

interface IActionClearEvents {
  type: typeof CLEAR_EVENTS
}

interface IActionAddEventZoomLinks {
  type: typeof ADD_EVENT_ZOOM_LINKS
  payload: IEventZoomLink[]
}

export type ActionEvents = IActionAddEvents | IActionClearEvents | IActionAddEventZoomLinks

export const addEvents = (events: IEvent[]): IActionAddEvents => {
  return {
    type: ADD_EVENTS,
    payload: events,
  }
}

export const clearEvents = (): IActionClearEvents => {
  return {
    type: CLEAR_EVENTS,
  }
}

export const addZoomLinks = (zoomLinks: IEventZoomLink[]): IActionAddEventZoomLinks => {
  return {
    type: ADD_EVENT_ZOOM_LINKS,
    payload: zoomLinks,
  }
}
