import { ADD_COURSE_LIST, CLEAR_COURSE_LIST } from 'constants/actionTypes'
import { IActionCourseList } from 'actions/courseList'

const INIT_STATE: ICourse[] = []

const reducerCourseList = (state = INIT_STATE, action: IActionCourseList) => {
  switch (action.type) {
    case ADD_COURSE_LIST:
      return action.payload
    case CLEAR_COURSE_LIST:
      return []
    default:
      return state
  }
}

export default reducerCourseList
