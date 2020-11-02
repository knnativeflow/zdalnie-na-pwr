import PasswordManager from 'features/passwords'
import studentMail from 'features/studentMail'
import { IEventZoomLink } from 'domain/event'

class SmailRefresher {
  async refresh(): Promise<IEventZoomLink[]> {
    console.log('Refreshing smail.')
    const { account, password } = await PasswordManager.getSmailCredentials()
    await studentMail.login(account, password)

    return studentMail.getZoomLinks()
  }
}

export default new SmailRefresher()
