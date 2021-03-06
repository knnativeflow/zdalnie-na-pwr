import moment from 'moment'
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
      return state.map((event) => {
        const { zoomLinks, overwriteExisting } = action.payload
        const foundLink = zoomLinks.find(
          (zoomLink) =>
            // TODO: think about how recognize different name the same course
            // zoomLink.courseName.startsWith(event.name) &&
            Math.abs(moment(zoomLink.date).unix() - moment(event.start).unix()) < 300 // 5 minut
        )

        const updateEventWithLink = !event.platforms.zoom?.url || overwriteExisting

        return foundLink && updateEventWithLink
          ? {
              ...event,
              platforms: { ...event.platforms, zoom: { url: foundLink.url } },
            }
          : event
      })
    default:
      return state
  }
}

export default eventsReducer
