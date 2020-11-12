import * as Sentry from '@sentry/electron'
import { CaptureConsole } from '@sentry/integrations'
import { version as appVersion } from '../package.json'

const initSentry = () => {
  if (process.env.NODE_ENV === 'production') {
    Sentry.init({
      dsn: process.env.SENTRY_DSN,
      release: appVersion,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      integrations: [new CaptureConsole({ levels: ['error'] }) as any],
    })
  }
}

export default initSentry
