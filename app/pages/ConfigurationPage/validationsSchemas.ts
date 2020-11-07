import * as yup from 'yup'

const ERROR_MESSAGES = {
  required: 'Pole jest wymagane',
  jsosRegex: 'Niepoprawny format loginu',
  mailRegex: 'Niepoprawny format indeksu',
  ePortalRegex: 'Niepoprawny link do ePortalu',
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

// TODO: CHECK IF REGEXES ARE CORRECT
export const platformsValidationSchema = yup.object({
  zoom: yup.string().url(),
  ePortal: yup
    .string()
    .matches(/^$|^https:\/\/eportal.pwr.edu.pl\/course\/view\.php\?id=[0-9]{2,}$/, ERROR_MESSAGES.ePortalRegex),
  teams: yup.string().url(),
})
