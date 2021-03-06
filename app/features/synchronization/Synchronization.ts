import moment from 'moment'

import { Store } from 'store'

import { addZoomLinks } from 'actions/events'
import { setFetchStatusMail } from 'actions/mail'
import { IEvent } from 'domain/event'
import { parseDateToString } from 'utils/date'
import GmailStudentMailRefresher from './GmailStudentMailRefresher'

const SMAIL_REFRESH_PERIOD = 1000 * 60 * 5 // 5 minutes

export default class Synchronization {
  private redux: Store

  constructor(redux: Store) {
    this.redux = redux
    setInterval(async () => this.refreshSmailIfNecessary(), SMAIL_REFRESH_PERIOD)
    this.refreshSmailIfNecessary()
  }

  private refreshSmailIfNecessary() {
    const {
      events,
      user: { configured },
      app: { wasShownGoogleSettingsMessage },
    } = this.redux.store.getState()
    const isLessThen10Minutes = (e: IEvent) => moment.duration(moment().diff(moment(e.start))).minutes() < 10
    const upcomingEvents = events.filter(isLessThen10Minutes)
    const haveDefineZoomLink = upcomingEvents.every((e) => e.platforms.zoom)
    if (!haveDefineZoomLink && wasShownGoogleSettingsMessage && configured) {
      void this.refreshSmail()
    }
  }

  private async refreshSmail() {
    try {
      this.redux.store.dispatch(setFetchStatusMail({ isLoading: true, error: '' }))
      const zoomLinks = await GmailStudentMailRefresher.refresh()
      this.redux.store.dispatch(addZoomLinks(zoomLinks, true))
      this.redux.store.dispatch(
        setFetchStatusMail({ isLoading: false, error: '', lastScan: parseDateToString(new Date()) })
      )
    } catch (error) {
      console.error('Synchronization.ts', 'refreshSmail', error?.message, error)
      this.redux.store.dispatch(setFetchStatusMail({ isLoading: false, error: error?.message }))
    }
  }
}
