/* eslint global-require: off, no-console: off */

/**
 * This module executes inside of electron's main process. You can start
 * electron renderer process from here and communicate with the other processes
 * through IPC.
 *
 * When running `yarn build` or `yarn build-main`, this file is compiled to
 * `./app/main.prod.js` using webpack. This gives us some performance wins.
 */
import 'core-js/stable'
import 'regenerator-runtime/runtime'
import './initSentry'
import path from 'path'
import { app, BrowserWindow, autoUpdater, dialog } from 'electron'
import log from 'electron-log'

import os from 'os'

import MenuBuilder from './menu'

let mainWindow: BrowserWindow | null = null

export default class AppUpdater {
  constructor() {
    log.transports.file.level = 'info'
    const platform = `${os.platform()}_${os.arch()}`
    const version = app.getVersion()

    console.log('app', platform, version)

    autoUpdater.setFeedURL({ url: `https://zdalnie-na-pwr-update-app.herokuapp.com/update/${platform}/${version}` })

    autoUpdater.on('checking-for-update', () => console.log('checking-for-update'))
    autoUpdater.on('update-available', () => console.log('update-available'))
    autoUpdater.on('update-not-available', () => console.log('update-not-available'))
    autoUpdater.on('error', (err) => console.log('err', err))

    // autoUpdater.on('update-available', () => {
    //   mainWindow?.webContents.send('update_available')
    // })
    // autoUpdater.on('update-downloaded', () => {
    //   mainWindow?.webContents.send('update_downloaded')
    // })

    autoUpdater.checkForUpdates()

    // autoUpdater.on('update-downloaded', (event, releaseNotes, releaseName) => {
    //   let message = `${app.getName()} ${releaseName} is now available. It will be installed the next time you restart the application.`
    //   if (releaseNotes) {
    //     const splitNotes = releaseNotes.split(/[^\r]\n/)
    //     message += '\n\nRelease notes:\n'
    //     splitNotes.forEach((notes) => {
    //       message += `${notes}\n\n`
    //     })
    //   }
    //   // Ask user to update the app
    //   dialog.showMessageBox(
    //     {
    //       type: 'question',
    //       buttons: ['Install and Relaunch', 'Later'],
    //       defaultId: 0,
    //       message: `A new version of ${app.getName()} has been downloaded`,
    //       detail: message,
    //     },
    //     (response) => {
    //       if (response === 0) {
    //         setTimeout(() => autoUpdater.quitAndInstall(), 1)
    //       }
    //     }
    //   )
    // })
    // init for updates
  }
}

if (process.env.NODE_ENV === 'production') {
  const sourceMapSupport = require('source-map-support')
  sourceMapSupport.install()
}

if (process.env.NODE_ENV === 'development' || process.env.DEBUG_PROD === 'true') {
  require('electron-debug')()
}

const installExtensions = async () => {
  const installer = require('electron-devtools-installer')
  const forceDownload = !!process.env.UPGRADE_EXTENSIONS
  const extensions = ['REACT_DEVELOPER_TOOLS', 'REDUX_DEVTOOLS']

  return Promise.all(extensions.map((name) => installer.default(installer[name], forceDownload))).catch(console.log)
}

const createWindow = async () => {
  if (process.env.NODE_ENV === 'development' || process.env.DEBUG_PROD === 'true') {
    await installExtensions()
  }

  const RESOURCES_PATH = app.isPackaged
    ? path.join(process.resourcesPath, 'resources')
    : path.join(__dirname, '../resources')

  const getAssetPath = (...paths: string[]): string => {
    return path.join(RESOURCES_PATH, ...paths)
  }

  mainWindow = new BrowserWindow({
    show: false,
    width: 1024,
    height: 728,
    icon: getAssetPath('icon.png'),
    webPreferences:
      (process.env.NODE_ENV === 'development' || process.env.E2E_BUILD === 'true') && process.env.ERB_SECURE !== 'true'
        ? {
            nodeIntegration: true,
          }
        : {
            preload: path.join(__dirname, 'dist/renderer.prod.js'),
          },
  })

  mainWindow.loadURL(`file://${__dirname}/app.html`)

  // @TODO: Use 'ready-to-show' event
  //        https://github.com/electron/electron/blob/master/docs/api/browser-window.md#using-ready-to-show-event
  mainWindow.webContents.on('did-finish-load', () => {
    if (!mainWindow) {
      throw new Error('"mainWindow" is not defined')
    }
    if (process.env.START_MINIMIZED) {
      mainWindow.minimize()
    } else {
      mainWindow.show()
      mainWindow.focus()
    }
  })

  mainWindow.on('closed', () => {
    mainWindow = null
  })

  const menuBuilder = new MenuBuilder(mainWindow)
  menuBuilder.buildMenu()

  // Remove this if your app does not use auto updates
  // eslint-disable-next-line
  // new AppUpdater()
}

/**
 * Add event listeners...
 */

app.on('window-all-closed', () => {
  // Respect the OSX convention of having the application in memory even
  // after all windows have been closed
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

if (process.env.E2E_BUILD === 'true') {
  // eslint-disable-next-line promise/catch-or-return
  app.whenReady().then(createWindow)
} else {
  app.on('ready', createWindow)
}

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) createWindow()
})
