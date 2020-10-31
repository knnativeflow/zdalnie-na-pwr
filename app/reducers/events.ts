import { ADD_EVENT_ZOOM_LINKS, ADD_EVENTS, CLEAR_EVENTS } from 'constants/actionTypes'
import { ActionEvents } from 'actions/events'
import { IEvent } from 'domain/event'

const INIT_STATE: IEvent[] = []

const eventsReducer = (state = INIT_STATE, action: ActionEvents) => {
  switch (action.type) {
    case ADD_EVENTS:
      return action.payload ?? state
    case CLEAR_EVENTS:
      return []
    case ADD_EVENT_ZOOM_LINKS:
      return state.map((event) => {
        const foundLink = action.payload.find(
          (zoomLink) => zoomLink.courseName.startsWith(event.name) && zoomLink.date === event.start
        )

        return foundLink
          ? {
              ...event,
              platform: { ...event.platform, zoom: { recurrent: false, url: foundLink.url } },
            }
          : event
      })
    default:
      return state
  }
}

export default eventsReducer
