import { ADD_COURSE_LIST, CLEAR_COURSE_LIST, ADD_ZOOM_LINKS_TO_COURSE_LIST } from 'constants/actionTypes'

export interface IActionCourseList {
  type: string
  payload: {
    courseList?: ICourse[]
    zoomLinks?: IEventZoomLink[]
  }
}

export const addCourseList = (courseList: ICourse[]): IActionCourseList => {
  return {
    type: ADD_COURSE_LIST,
    payload: {
      courseList,
    },
  }
}

export const addZoomLinks = (zoomLinks: IEventZoomLink[]): IActionCourseList => {
  return {
    type: ADD_ZOOM_LINKS_TO_COURSE_LIST,
    payload: {
      zoomLinks,
    },
  }
}

export const clearCourseList = () => {
  return {
    type: CLEAR_COURSE_LIST,
  }
}
