import { CourseType, IPlatforms, ICourse } from './course'

export interface IEvent {
  type: CourseType
  name: string
  start: string
  end: string
  code: string | null
  lecturer: string | null
  platforms: IPlatforms
}

export interface IEventZoomLink {
  courseName: string
  date: string
  url: string
}

export interface IEventWithCourse extends IEvent {
  course?: ICourse
}

export interface IEventFullCalendar {
  start: string
  end: string
  title: string
  resource: IEventWithCourse
}
