import {
  ADD_COURSE_TEAMS_LINKS,
  ADD_COURSES,
  CLEAR_COURSE_PLATFORM,
  CLEAR_COURSES,
  SET_COURSE_NOTE,
  SET_COURSE_PLATFORM,
} from 'constants/actionTypes'
import { ActionCourses } from 'actions/courses'
import { ICourse } from 'domain/course'

const INIT_STATE: ICourse[] = []

const reducerCourses = (state = INIT_STATE, action: ActionCourses) => {
  switch (action.type) {
    case ADD_COURSES:
      return action.payload
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
    case SET_COURSE_NOTE:
      return state.map((course) => {
        return course.classesCode === action.payload.code ? { ...course, note: action.payload.note } : course
      })
    case SET_COURSE_PLATFORM:
      return state.map((course) =>
        course.classesCode === action.payload.code
          ? {
              ...course,
              platforms: {
                ...course.platforms,
                [action.payload.type]: { url: action.payload.url, name: action.payload.name },
              },
            }
          : course
      )
    case CLEAR_COURSE_PLATFORM:
      return state.map((course) =>
        course.classesCode === action.payload.code
          ? {
              ...course,
              platforms: {
                ...course.platforms,
                [action.payload.type]: undefined,
              },
            }
          : course
      )
    case CLEAR_COURSES:
      return []
    default:
      return state
  }
}

export default reducerCourses
