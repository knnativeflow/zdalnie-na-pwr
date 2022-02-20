enum CourseType {
  W = 'W',
  C = 'C',
  S = 'S',
  L = 'L',
  P = 'P',
}

enum WeekType {
  TP = 'TP',
  TN = 'TN',
  ALL = '',
}

interface IPlatformsV1 {
  zoom?: {
    url?: string
    recurring: boolean
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

interface IStoreV1 {
  user: {
    indeks?: string
    configured?: boolean
  }
  courses: Array<{
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
    platforms: IPlatformsV1
    additional: {
      [key: string]: string
    }
  }>
  events: Array<{
    type: CourseType
    name: string
    start: string
    end: string
    code: string | null
    lecturer: string | null
    platform: IPlatformsV1
    additional: {
      [key: string]: string
    }
  }>
  mail: {
    isLoading: boolean
    lastScan: string | null
    error: string | null
  }
}

const migrations = {
  0: (state: IStoreV1) => state,
  1: (state: IStoreV1) => state,
  2: (state: IStoreV1) => ({
    ...state,
    courses: state.courses.map(({ additional, ...course }) => ({
      ...course,
      platforms: course.platforms.teams ? { teams: course.platforms.teams } : {},
      note: '',
    })),
    events: state.events.map(({ additional, ...event }) => {
      const courseEvent = state.courses.find(
        (course) => course.name.startsWith(event.name) && course.type === event.type
      )
      const platforms = event.platform.zoom?.url ? { zoom: { url: event.platform.zoom.url } } : {}

      if (courseEvent) {
        return { ...event, code: courseEvent.classesCode, name: courseEvent.name, platforms }
      }

      return { ...event, platforms }
    }),
  }),
  3: (state: IStoreV1) => ({
    ...state,
    user: {
      configured: false,
      indeks: state.user.indeks || '',
    },
  }),
  4: (state: IStoreV1) => ({
    ...state,
    user: {
      configured: false,
      indeks: state.user.indeks || '',
    },
  }),
  5: (state: IStoreV1) => ({
    ...state,
    user: {
      configured: false,
      indeks: state.user.indeks || '',
    },
  }),
}

export default migrations
