import { app, dialog } from 'electron'
import { autoUpdater } from 'electron-updater'

class AppUpdater {
  constructor() {
    autoUpdater.setFeedURL({
      provider: 'github',
      repo: process.env.REPO_NAME,
      owner: process.env.REPO_OWNER,
      private: false,
    })

    autoUpdater.on('error', (err) => {
      dialog.showMessageBoxSync({
        type: 'error',
        title: 'Error',
        message: `Wystąpił błąd podczas aktualizacji. Przekaż poniższy komunikat do twórców: \n ${err.message}`,
      })

      console.error('appUpdater.ts', 'listener on error', err?.message)
    })

    autoUpdater.on('update-downloaded', () => {
      dialog
        .showMessageBox({
          type: 'question',
          buttons: ['Zainstaluj i otwórz ponownie', 'Później'],
          defaultId: 0,
          message: `Nowa wersja aplikacji ${app.getName()} została pobrana. Czy chcesz teraz zaktualiwać aplikację?`,
        })
        .then((result) => {
          if (result.response === 0) {
            autoUpdater.quitAndInstall()
          }

          return result
        })
        .catch((error) => {
          console.error('appUpdater.ts', 'showMessageBox', error?.message)
        })
    })

    void autoUpdater.checkForUpdatesAndNotify()
  }
}

export default AppUpdater
