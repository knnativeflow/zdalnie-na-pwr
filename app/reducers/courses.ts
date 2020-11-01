import { ADD_COURSES, CLEAR_COURSES, ADD_EVENT_ZOOM_LINKS, ADD_COURSE_TEAMS_LINKS } from 'constants/actionTypes'
import { ActionCourses } from 'actions/courses'
import { ActionEvents } from 'actions/events'
import { ICourse } from 'domain/course'

const INIT_STATE: ICourse[] = []

type Action = ActionCourses | ActionEvents

const reducerCourseList = (state = INIT_STATE, action: Action) => {
  switch (action.type) {
    case ADD_COURSES:
      return action.payload
    case ADD_EVENT_ZOOM_LINKS:
      return state.map((course) => {
        const foundLink = action.payload.zoomLinks.find((zoomLink) => zoomLink.courseName.startsWith(course.name))

        return foundLink ? { ...course, platforms: { ...course.platforms, zoom: { recurrent: false } } } : course
      })
    case ADD_COURSE_TEAMS_LINKS:
      return state.map((course) => {
        const foundLink = action.payload.find((teamsLink) => teamsLink.code === course.classesCode)

        return foundLink
          ? {
              ...course,
              platforms: { ...course.platforms, teams: { url: foundLink.url, name: foundLink.name } },
            }
          : course
      })
    case CLEAR_COURSES:
      return []
    default:
      return state
  }
}

export default reducerCourseList
