import { ADD_COURSE_LIST, CLEAR_COURSE_LIST, ADD_ZOOM_LINKS_TO_COURSE_LIST } from 'constants/actionTypes'
import { IActionCourseList } from 'actions/courseList'

const INIT_STATE: ICourse[] = []

const reducerCourseList = (state = INIT_STATE, action: IActionCourseList) => {
  switch (action.type) {
    case ADD_COURSE_LIST:
      return action.payload.courseList ?? state
    case ADD_ZOOM_LINKS_TO_COURSE_LIST:
      return state.reduce<ICourse[]>((courses, course) => {
        const events = course.events.map((event) => {
          const foundLink = action.payload.zoomLinks?.find(
            (zoomLink) => zoomLink.date === event.start && zoomLink.courseName === event.title.substring(2)
          )

          return foundLink
            ? {
                ...event,
                platform: { ...event.platform, zoom: { name: 'Zoom', url: foundLink.link } },
              }
            : event
        })

        return [...courses, { ...course, events }]
      }, [])
    case CLEAR_COURSE_LIST:
      return []
    default:
      return state
  }
}

export default reducerCourseList
