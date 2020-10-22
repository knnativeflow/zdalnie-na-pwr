import moment from 'moment'

const DEFAULT_FORMAT_DATE = 'YYYY-MM-DDTkk:mm:ss'
const DEFAULT_FORMAT_RECURRING_DATE = 'dddd, kk:mm'

export const parseDateToString = (date: moment.MomentInput) => moment(date).format(DEFAULT_FORMAT_DATE)

export const parseStringToDate = (dateString: string) => moment(dateString, DEFAULT_FORMAT_DATE).toDate()

export const parseRecurringDateToString = (date: moment.MomentInput) =>
  moment(date).format(DEFAULT_FORMAT_RECURRING_DATE)

// export const parseRecurringStringToDate = (dateString: string) => moment(dateString, DEFAULT_FORMAT_RECURRING_DATE).toDate()
