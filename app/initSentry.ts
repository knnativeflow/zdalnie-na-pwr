import * as Sentry from '@sentry/electron'

const initSentry = () => {
  if (process.env.NODE_ENV === 'production') {
    Sentry.init({
      dsn: process.env.SENTRY_DSN,
    })
  }
}

export default initSentry
