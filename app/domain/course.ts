export enum CourseType {
  W = 'W',
  C = 'C',
  S = 'S',
  L = 'L',
  P = 'P',
}

export enum PlatformType {
  ZOOM = 'zoom',
  TEAMS = 'teams',
  EPORTAL = 'ePortal',
}

interface IPlatform {
  url: string
  name?: string
}

export type IPlatforms = {
  [key in PlatformType]?: IPlatform
}

export enum WeekType {
  TP = 'TP',
  TN = 'TN',
  ALL = '',
}

export interface ICourse {
  name: string
  type: CourseType
  start: string
  end: string
  lecturer: string
  courseCode: string
  classesCode: string
  inWeeks: WeekType
  hoursInSemester: string
  ECTSes: string
  platforms: IPlatforms
  note: string
}

export interface ICourseTeamsLink {
  name: string
  code: string
  url: string
}
