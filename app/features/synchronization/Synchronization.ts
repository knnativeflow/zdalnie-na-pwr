import moment from 'moment'

import { Store } from 'store'

import SmailRefresher from './SmailRefresher'
import { addZoomLinks } from 'actions/events'
import { IEvent } from 'domain/event'

const SMAIL_REFRESH_PERIOD = 1000 * 60 * 5 //5 minutes

export default class Synchronization {
  private redux: Store

  constructor(redux: Store) {
    this.redux = redux
    setInterval(async () => this.refreshSmailIfNessecery(), SMAIL_REFRESH_PERIOD)
    this.refreshSmail()
  }

  private refreshSmailIfNessecery() {
    const events = this.redux.store.getState().events
    const isLessThen10Minutes = (e: IEvent) => moment.duration(moment().diff(moment(e.start))).minutes() < 10
    const upcomingEvents = events.filter(isLessThen10Minutes)
    const haveDefineZoomLink = upcomingEvents.every((e) => e.platform.zoom?.url && !e.platform.zoom?.recurrent)
    if (!haveDefineZoomLink) {
      this.refreshSmail()
    }
  }

  private async refreshSmail() {
    try {
      const zoomLinks = await SmailRefresher.refresh()
      this.redux.store.dispatch(addZoomLinks(zoomLinks, false))
    } catch (e) {
      console.error('Bład podczas odświeżania maili z Poczty Studenckiej.', e)
    }
  }
}
