import { ADD_COURSE_TEAMS_LINKS, ADD_COURSES, CLEAR_COURSES, SET_COURSE_NOTE } from 'constants/actionTypes'
import { ICourse, ICourseTeamsLink } from 'domain/course'

interface IActionAddCourses {
  type: typeof ADD_COURSES
  payload: ICourse[]
}

interface IActionClearCourse {
  type: typeof CLEAR_COURSES
}

interface IActionAddTeamsLinks {
  type: typeof ADD_COURSE_TEAMS_LINKS
  payload: ICourseTeamsLink[]
}

interface IActionSetCourseNote {
  type: typeof SET_COURSE_NOTE
  payload: {
    code: string
    note: string
  }
}

export type ActionCourses = IActionAddCourses | IActionClearCourse | IActionAddTeamsLinks | IActionSetCourseNote

export const addCourses = (courses: ICourse[]): IActionAddCourses => {
  return {
    type: ADD_COURSES,
    payload: courses,
  }
}

export const addTeamsLinks = (teamsLinks: ICourseTeamsLink[]): IActionAddTeamsLinks => {
  return {
    type: ADD_COURSE_TEAMS_LINKS,
    payload: teamsLinks,
  }
}

export const clearCourses = (): IActionClearCourse => {
  return {
    type: CLEAR_COURSES,
  }
}

export const setCourseNote = (code: string, note: string): IActionSetCourseNote => {
  return {
    type: SET_COURSE_NOTE,
    payload: { code, note },
  }
}
