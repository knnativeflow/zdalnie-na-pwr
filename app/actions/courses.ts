import { ADD_COURSES, CLEAR_COURSES } from 'constants/actionTypes'

interface IActionAddCourses {
  type: typeof ADD_COURSES
  payload: ICourse[]
}

interface IActionClearCourse {
  type: typeof CLEAR_COURSES
}

export type ActionCourses = IActionAddCourses | IActionClearCourse

export const addCourses = (courses: ICourse[]): IActionAddCourses => {
  return {
    type: ADD_COURSES,
    payload: courses,
  }
}

export const clearCourses = (): IActionClearCourse => {
  return {
    type: CLEAR_COURSES,
  }
}
