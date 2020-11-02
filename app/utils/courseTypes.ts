import { THEME } from 'base/theme/theme'
import { CourseType } from 'domain/course'

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
  (type && THEME.colors.course?.[type]) ?? THEME.colors.course.DEFAULT
