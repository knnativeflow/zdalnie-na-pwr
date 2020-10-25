import defaultRequest from 'request-promise'
import cheerio from 'cheerio'
import {Response as RequestResponse} from 'request'

const URL_OAUTH_PAGE = 'https://oauth.pwr.edu.pl/oauth'
const URL_LOGIN_PAGE = 'https://jsos.pwr.edu.pl/index.php/site/loginAsStudent'

const j = defaultRequest.jar()

interface Response<T> extends RequestResponse {
  body: T
}

async function request<T>(config:IRequestOptions): Promise<Response<T>> {
  const request = defaultRequest.defaults({jar: j})
  console.log(`Request ${config.method} [${config.url}] body: ${JSON.stringify(config.form)}`)
  return request(config)
    .then((response: Response<T>) => {
      console.log(`Response from ${config.method} [${config.url}]: ${response.body}`)
      return response
    })
    .catch(err => {
      console.log(`Error response from ${config.method} [${config.url}]`)
      console.error(err)
      return err
    })
}

class JsosAuth {
  oauthToken = {key: 'oauth_token', value: ''}
  oauthConsumerKey = {key: 'oauth_consumer_key', value: ''}
  csrfToken = {key: 'YII_CSRF_TOKEN', value: ''}
  jsosSessionId = {key: 'JSOSSESSID', value: ''}

  lastTimeRequest: Date | null = null

  public async requestWithAuthorization(requestOps: IRequestOptions): Promise<ResponseWithSelector> {
    try {
      let response: ResponseWithSelector = await request({
        resolveWithFullResponse: true,
        followAllRedirects: true,
        ...requestOps,
        form: {
          ...requestOps.form,
          ...(requestOps.addCsrfToken ? {[this.csrfToken.key]: this.csrfToken.value} : {}),
        }
      })

      response.selector = cheerio.load(response.body)

      return response
    } catch (err) {
      console.error(err)
      throw new Error('Błąd podczas wykonania żądania z wymaganą autoryzacją.')
    }
  }

  public async signIn(login: string, password: string): Promise<IAuthenticationData> {
    try {
      const loginPageRequestOptions = {
        method: HttpMethod.GET,
        url: URL_LOGIN_PAGE,
        resolveWithFullResponse: true
      }
      const loginPageResponse = await request<string>(loginPageRequestOptions)
      const loginPageBody = cheerio.load(loginPageResponse.body)

      const uri = loginPageResponse.request.uri
      const address = `${uri.protocol}//${uri.hostname}${uri.pathname}`

      if (address === URL_OAUTH_PAGE + '/authenticate') {
        // @ts-ignore
        this.oauthToken.value = loginPageBody('input[name="oauth_token"]').attr('value')
        // @ts-ignore
        this.oauthConsumerKey.value = loginPageBody('input[name="oauth_consumer_key"]').attr('value')

        const actionForm = loginPageBody('.loginForm').attr('action')
        const oAuthUrl = `${URL_OAUTH_PAGE}/${actionForm}`

        const oAuthPageRequestOptions = {
          method: HttpMethod.POST,
          url: oAuthUrl,
          form: {
            'username': login,
            'password': password,
            'authenticateForm13_hf_0': '',
            'oauth_request_url': 'http://oauth.pwr.edu.pl/oauth/authenticate',
            'oauth_token': this.oauthToken.value,
            'oauth_consumer_key': this.oauthConsumerKey.value,
            'oauth_locale': 'pl',
            'oauth_callback_url': URL_LOGIN_PAGE,
            'oauth_symbol': 'EIS',
            'authenticateButton': 'Zaloguj'
          },
          followAllRedirects: true
        }

        await request(oAuthPageRequestOptions)
      }

      const homePageRequestOptions = {
        method: HttpMethod.GET,
        url: URL_LOGIN_PAGE + '?callbackUrl=student%2FindeksDane&oauth_token=' + this.oauthToken.value
      }

      await request(homePageRequestOptions)

      const cookies = j.getCookies(URL_LOGIN_PAGE + '?callbackUrl=student%2FindeksDane&oauth_token=' + this.oauthToken.value)

      cookies.forEach(({key, value}) => {
        if (key === this.jsosSessionId.key) {
          this.jsosSessionId = {key, value}
        }

        if (key === this.csrfToken.key) {
          this.csrfToken = {key, value}
        }
      })

      return {
        jsosSessionId: this.jsosSessionId,
        oauthConsumerKey: this.oauthConsumerKey,
        oauthToken: this.oauthToken,
        csrfToken: this.csrfToken
      }
    } catch (err) {
      console.error(err)
      throw new Error('Błąd podczas logowania do JSOSa')
    }
  }


  public async logout(): Promise<any> {
    const logoutOptionsRequest = {
      method: HttpMethod.GET,
      url: ' https://jsos.pwr.edu.pl/index.php/site/logout'
    }

    return request(logoutOptionsRequest)
  }
}

export interface ResponseWithSelector extends Response<string> {
  selector?: CheerioStatic
}

export enum HttpMethod {
  GET = 'GET',
  POST = 'POST'
}

export interface IRequestOptions {
  url: string
  method: HttpMethod,
  resolveWithFullResponse?: boolean
  followAllRedirects?: boolean
  json?: boolean
  form?: object
  addCsrfToken?: boolean
}

export interface IResponseOptions {
  selector: boolean
}

export interface IAuthenticationDataRecord {
  key: string
  value: string
}

export interface IAuthenticationData {
  jsosSessionId: IAuthenticationDataRecord
  oauthConsumerKey: IAuthenticationDataRecord
  oauthToken: IAuthenticationDataRecord
  csrfToken: IAuthenticationDataRecord
}

export default new JsosAuth()
