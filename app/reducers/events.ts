import { ADD_EVENT_ZOOM_LINKS, ADD_EVENTS, CLEAR_EVENTS } from 'constants/actionTypes'
import { ActionEvents } from 'actions/events'
import { IEvent } from 'domain/event'

const INIT_STATE: IEvent[] = []

const eventsReducer = (state = INIT_STATE, action: ActionEvents) => {
  switch (action.type) {
    case ADD_EVENTS:
      return action.payload ?? state
    case CLEAR_EVENTS:
      return INIT_STATE
    case ADD_EVENT_ZOOM_LINKS:
      const { zoomLinks, overwriteExisting } = action.payload
      return state.map((event) => {
        const foundLink = zoomLinks.find(
          (zoomLink) => zoomLink.courseName.startsWith(event.name) && zoomLink.date === event.start
        )

        const updateEventWithLink = !event.platform.zoom?.url || overwriteExisting

        return foundLink && updateEventWithLink
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
