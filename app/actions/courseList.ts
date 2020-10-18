import { ADD_COURSE_LIST, CLEAR_COURSE_LIST } from 'constants/actionTypes'

export interface IActionCourseList {
  type: string
  payload: ICourse[]
}

export const addCourseList = (courseList: ICourse[]): IActionCourseList => {
  console.log('test', courseList)
  return {
    type: ADD_COURSE_LIST,
    payload: courseList,
  }
}

export const clearCourseList = () => {
  return {
    type: CLEAR_COURSE_LIST,
  }
}
