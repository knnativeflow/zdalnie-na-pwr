import {
  ADD_COURSE_TEAMS_LINKS,
  ADD_COURSES,
  CLEAR_COURSE_PLATFORM,
  CLEAR_COURSES,
  SET_COURSE_NOTE,
  SET_COURSE_PLATFORM,
} from 'constants/actionTypes'
import { ICourse, ICourseTeamsLink, PlatformType } from 'domain/course'

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

interface IActionSetCoursePlatform {
  type: typeof SET_COURSE_PLATFORM
  payload: {
    code: string
    type: PlatformType
    url: string
    name?: string
  }
}

interface IActionClearCoursePlatform {
  type: typeof CLEAR_COURSE_PLATFORM
  payload: {
    code: string
    type: PlatformType
  }
}

export type ActionCourses =
  | IActionAddCourses
  | IActionClearCourse
  | IActionAddTeamsLinks
  | IActionSetCourseNote
  | IActionSetCoursePlatform
  | IActionClearCoursePlatform

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

export const setCoursePlatform = (
  code: string,
  type: PlatformType,
  url: string,
  name?: string
): IActionSetCoursePlatform => ({
  type: SET_COURSE_PLATFORM,
  payload: {
    code,
    type,
    url,
    name,
  },
})

export const clearCoursePlatform = (code: string, type: PlatformType): IActionClearCoursePlatform => ({
  type: CLEAR_COURSE_PLATFORM,
  payload: {
    code,
    type,
  },
})
