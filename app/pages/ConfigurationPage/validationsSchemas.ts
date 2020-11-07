import * as yup from 'yup'

const ERROR_MESSAGES = {
  required: 'Pole jest wymagane',
  jsosRegex: 'Niepoprawny format loginu',
  mailRegex: 'Niepoprawny format indeksu',
  url: 'Niepoprawny format linku',
}

export const jsosValidationSchema = yup.object({
  login: yup
    .string()
    .matches(/^pwr[0-9]{6}$/, { excludeEmptyString: true, message: ERROR_MESSAGES.jsosRegex })
    .required(ERROR_MESSAGES.required),
  password: yup.string().required(ERROR_MESSAGES.required),
})

export const mailValidationSchema = yup.object({
  login: yup
    .string()
    .matches(/^[0-9]{6}$/, { excludeEmptyString: true, message: ERROR_MESSAGES.mailRegex })
    .required(ERROR_MESSAGES.required),
  password: yup.string().required(ERROR_MESSAGES.required),
})

export const platformsValidationSchema = yup.object({
  zoom: yup.string().url(ERROR_MESSAGES.url),
  ePortal: yup.string().url(ERROR_MESSAGES.url),
  teams: yup.string().url(ERROR_MESSAGES.url),
})
