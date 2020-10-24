import { APP_COLORS } from 'base/theme/theme'

const DEFAULT_EVENT_NAME = 'Kurs'
const EVENT_NAMES = {
  W: 'Wykład',
  C: 'Ćwiczenia',
  S: 'Seminarium',
  L: 'Laboratorium',
  P: 'Projekt',
}
export const eventFullText = (type?: CourseType): string => (type && EVENT_NAMES?.[type]) ?? DEFAULT_EVENT_NAME

export const eventColor = (type?: CourseType): string =>
  (type && APP_COLORS.course?.[type]) ?? APP_COLORS.course.DEFAULT
