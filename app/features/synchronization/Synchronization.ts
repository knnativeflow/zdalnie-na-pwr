import moment from 'moment'

import { Store } from 'store'

import studentMail from 'features/studentMail'

import PasswordManager from 'features/passwords'
import { addZoomLinks } from 'actions/events'
import { IEvent } from 'domain/event'

const SMAIL_REFRESH_PERIOD = 1000 * 60 * 5 //5 minutes
// const JSOS_REFRESH_PERIOD = 1000 * 60 * 60 * 24 //24 hours

export class Synchronization {
  redux: Store
  smailInterval: NodeJS.Timeout

  constructor(redux: Store) {
    this.redux = redux
    this.smailInterval = setInterval(async () => this.refreshSmailIfNessecery(), SMAIL_REFRESH_PERIOD)
    this.refreshSmail()
  }

  private refreshSmailIfNessecery() {
    const events = this.redux.store.getState().events
    const isLessThen10Minutes = (e: IEvent) => moment.duration(moment().diff(moment(e.start))).minutes() < 10
    const upcomingEvents = events.filter(isLessThen10Minutes)
    const haveDefineZoomLink = upcomingEvents.every(e => e.platform.zoom?.url && !e.platform.zoom?.recurrent)
    if(!haveDefineZoomLink) {
      this.refreshSmail()
    }
  }

  private async refreshSmail() {
    try {
      const {account, password} = await PasswordManager.getSmailCredentials()
      await studentMail.login(account, password)

      const zoomLinks = await studentMail.getZoomLinks()

      this.redux.store.dispatch(addZoomLinks(zoomLinks, true))
    } catch (e) {
      console.error('Bład podczas odświeżania maili z Poczty Studenckiej.', e)
    }
  }
}
