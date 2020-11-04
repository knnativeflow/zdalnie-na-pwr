import { ADD_COURSE_TEAMS_LINKS, ADD_COURSES, CLEAR_COURSES } from 'constants/actionTypes'
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
    case CLEAR_COURSES:
      return []
    default:
      return state
  }
}

export default reducerCourses
