import { remote } from 'electron'

// eslint-disable-next-line import/prefer-default-export
export const APP_VERSION =
  process.env.NODE_ENV === 'development' ? process.env.npm_package_version : remote.app.getVersion()
