import {history} from 'store'
import PasswordManager from 'features/passwords'
import studentMail from 'features/studentMail'
import { SMAIL_ERRORS } from 'features/studentMail/StudentMail'
import { IEventZoomLink } from 'domain/event'

import routes from 'constants/routes.json'

class SmailRefresher {
  async refresh(): Promise<IEventZoomLink[]> {
    try {
      console.log('Refreshing smail.')
      const { account, password } = await PasswordManager.getSmailCredentials()
      await studentMail.login(account, password)

      return studentMail.getZoomLinks()
    } catch (e) {
      if(e.message == SMAIL_ERRORS.WRONG_LOGIN_PASSWORD) {
        history.push(routes.SETTINGS + '?forcePasswordUpdate=true')
      }
      throw e
    }

  }
}

export default new SmailRefresher()
