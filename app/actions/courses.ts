import { ADD_COURSE_TEAMS_LINKS, ADD_COURSES, CLEAR_COURSES } from 'constants/actionTypes'
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

export type ActionCourses = IActionAddCourses | IActionClearCourse | IActionAddTeamsLinks

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
