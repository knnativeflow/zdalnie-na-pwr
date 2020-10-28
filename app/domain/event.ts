import { IEvent } from './course'

export interface IEventZoomLink {
  courseName: string
  date: string
  url: string
}

export interface IEventFullCalendar {
  start: string
  end: string
  title: string
  resource: IEvent
}
