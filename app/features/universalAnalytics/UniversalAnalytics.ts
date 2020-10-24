import ua from 'universal-analytics'

const DEFAULT_CLIENT_ID = 'not_logged_user'

class UniversalAnalytics {
  private visitor: ua.Visitor | null = null

  private cid: string = DEFAULT_CLIENT_ID

  constructor() {
    if (process.env.UNIVERSAL_ANALYTICS_ID) {
      this.visitor = ua(process.env.UNIVERSAL_ANALYTICS_ID, { cid: this.cid, strictCidFormat: false })
    }
  }

  public connectUser(cid: string | undefined) {
    if (process.env.UNIVERSAL_ANALYTICS_ID) {
      this.visitor = ua(process.env.UNIVERSAL_ANALYTICS_ID, {
        cid: cid || DEFAULT_CLIENT_ID,
        strictCidFormat: false,
      })
    }
  }

  public visitPage(url: string) {
    this.visitor?.pageview(url).send()
  }
}

const universalAnalytics = new UniversalAnalytics()

export default universalAnalytics
