import * as T from 'io-ts'

// eslint-disable-next-line import/prefer-default-export
export const loginResponseDecoder = T.type({
  iwcp: T.type({
    'error-code': T.string,
    message: T.union([T.string, T.undefined]),
    loginResponse: T.union([
      T.type({
        message: T.string,
        sessionIdKey: T.string,
        appToken: T.string,
        userLang: T.string,
        cacheBustId: T.string,
        nextURI: T.string,
      }),
      T.undefined,
    ]),
  }),
})
