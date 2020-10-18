interface IEvent {
  title: string
  start: string
  end: string
  allDay: boolean
  summary: string
  description: string
  location: string
  uid: string
  platform: {
    [key: string]: {
      name: string
      url: string
    }
  }
}

type CourseType = 'W' | 'C' | 'S' | 'L' | 'P'

interface ICourse {
  name: string
  type: CourseType
  start: string
  end: string
  lecturer: string
  events: IEvent[]
  platforms: {
    [platformName: string]: {
      name: string
      url: string
    }
  }
}

interface IEventZoomLink {
  courseName: string
  date: string
  link: string
}
