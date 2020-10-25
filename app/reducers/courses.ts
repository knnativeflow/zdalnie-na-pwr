import { ADD_COURSES, ADD_EVENTS, CLEAR_COURSES, ADD_EVENT_ZOOM_LINKS } from 'constants/actionTypes'
import { ActionCourses } from 'actions/courses'
import { ActionEvents } from 'actions/events'
import { mapEventsToCourses } from 'utils/courses'

const INIT_STATE: ICourse[] = []

type Action = ActionCourses | ActionEvents

const reducerCourseList = (state = INIT_STATE, action: Action) => {
  switch (action.type) {
    case ADD_COURSES:
      return action.payload
    case ADD_EVENTS:
      return mapEventsToCourses(action.payload)
    case ADD_EVENT_ZOOM_LINKS:
      return state.map((course) => {
        const foundLink = action.payload.find((zoomLink) => zoomLink.courseName.startsWith(course.name))

        return foundLink ? { ...course, platforms: { ...course.platforms, zoom: { weekly: false } } } : course
      })
    case CLEAR_COURSES:
      return []
    default:
      return state
  }
}

export default reducerCourseList
