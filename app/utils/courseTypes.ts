import { amber, blueGrey, deepPurple, grey, lightBlue, lightGreen } from '@material-ui/core/colors'

export const COURSE_TYPES = ['W', 'C', 'S', 'L', 'P']

const DEFAULT_COURSE_TYPE_NAME = 'Kurs'
const COURSE_TYPE_NAMES = {
  W: 'Wykład',
  C: 'Ćwiczenia',
  S: 'Seminarium',
  L: 'Laboratorium',
  P: 'Projekt',
}
export const courseTypeFullText = (type?: CourseType): string =>
  (type && COURSE_TYPE_NAMES?.[type]) ?? DEFAULT_COURSE_TYPE_NAME

const DEFAULT_COURSE_TYPE_COLOR = grey[500]
const COURSE_TYPE_COLORS = {
  W: lightGreen[500],
  C: amber[500],
  S: lightBlue[500],
  L: blueGrey[500],
  P: deepPurple[500],
}
export const courseTypeColor = (type?: CourseType): string =>
  (type && COURSE_TYPE_COLORS?.[type]) ?? DEFAULT_COURSE_TYPE_COLOR
