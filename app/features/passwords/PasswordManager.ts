import keytar from 'keytar'
import os from 'os'

const JSOS = 'JSOS'
const SMAIL = 'SMAIL'

export interface ICredentials {
  account: string
  password: string
}

export enum OperatingSystem {
  WINDOWS = 'Windows_NT',
  LINUX = 'Linux',
  MACOS = 'Darwin',
}

class PasswordManager {
  checkOS(): OperatingSystem {
    const type = os.type()
    switch (type) {
      case OperatingSystem.WINDOWS:
        return OperatingSystem.WINDOWS
      case OperatingSystem.LINUX:
        return OperatingSystem.LINUX
      case OperatingSystem.MACOS:
        return OperatingSystem.MACOS
      default:
        throw Error('Nieznany system operacyjny.')
    }
  }

  async saveJsosCredentials(account: string, password: string): Promise<void> {
    return keytar.setPassword(JSOS, account, password)
  }

  async getJsosCredentials(): Promise<ICredentials> {
    return keytar.findCredentials(JSOS).then(([credentials]: ICredentials[]) => {
      if (!credentials) throw Error('Nie można znaleźć konta dla JSOS.')
      return credentials
    })
  }

  async saveSmailCredentials(account: string, password: string): Promise<void> {
    return keytar.setPassword(SMAIL, account, password)
  }

  async getSmailCredentials(): Promise<ICredentials> {
    return keytar.findCredentials(SMAIL).then(([credentials]: ICredentials[]) => {
      if (!credentials) throw Error('Nie można znaleźć konta dla Studenckiej poczty.')
      return credentials
    })
  }
}
export default new PasswordManager()
