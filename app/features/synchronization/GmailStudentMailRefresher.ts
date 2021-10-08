import { history } from 'store'
import retry from 'async-retry'
import PasswordManager from 'features/passwords'
import { SmailErrors } from 'features/studentMail/StudentMail'
import { IEventZoomLink } from 'domain/event'

import routes from 'constants/routes.json'
import gmailStudentMail from 'features/gmailStudentMail'

class GmailStudentMailRefresher {
  private async getZoomLink(): Promise<IEventZoomLink[]> {
    try {
      console.log('Refreshing gmail student mail.')
      const { account, password } = await PasswordManager.getSmailCredentials()
      await gmailStudentMail.login(account, password)

      return gmailStudentMail.getZoomLinks()
    } catch (error) {
      if (error.message === SmailErrors.WRONG_LOGIN_PASSWORD) {
        history.push(`${routes.SETTINGS}?forcePasswordUpdate=true`)
      }
      throw error
    }
  }

  async refresh(): Promise<IEventZoomLink[]> {
    return retry(this.getZoomLink, {
      retries: 3,
    })
  }
}

export default new GmailStudentMailRefresher()
