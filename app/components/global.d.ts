type CourseType = 'W' | 'C' | 'S' | 'L' | 'P'

interface IPlatforms {
  zoom?: {
    weekly: boolean
    url?: string
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

interface IEvent {
  type: CourseType
  name: string
  start: string
  end: string
  code: string | null
  lecturer: string | null
  platform: IPlatforms
  additional: {
    [key: string]: string
  }
}

interface ICourse {
  name: string
  type: CourseType
  start: string
  end: string
  lecturer: string | null
  platforms: IPlatforms
  additional: {
    [key: string]: string
  }
}

interface ICourseWithEvents extends ICourse {
  events: IEvent[]
}

interface IEventZoomLink {
  courseName: string
  date: string
  url: string
}

interface IEventFullCalendar {
  start: string
  end: string
  title: string
  resource: IEvent
}
