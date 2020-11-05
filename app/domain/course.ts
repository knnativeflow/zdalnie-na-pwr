export enum CourseType {
  W = 'W',
  C = 'C',
  S = 'S',
  L = 'L',
  P = 'P',
}

export interface IPlatforms {
  zoom?: {
    url: string
  }
  teams?: {
    name: string
    url: string
  }
  ePortal?: {
    name: string
    url: string
  }
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
