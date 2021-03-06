import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { ObjectSchema } from 'yup'

import { CircularProgress } from '@material-ui/core'
import Input from 'components/Input'
import Button from 'components/Button'
import Space from 'components/Space'
import ErrorMsg from 'components/ErrorMsg'

export type LoginFormProps = {
  onSubmit: (login: string, password: string) => Promise<void>
  validationSchema: ObjectSchema
  color: {
    light: string
    main: string
    dark: string
  }
  fields: {
    login?: {
      defaultValue?: string
      disabled?: boolean
      placeholder?: string
    }
    password?: {
      defaultValue?: string
      disabled?: boolean
    }
  }
  submitText?: string
}

const LoginForm = ({ onSubmit, color, validationSchema, submitText, fields }: LoginFormProps) => {
  const [apiError, setApiError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const { handleSubmit: handleSubmitReactFrom, errors, register } = useForm({
    resolver: yupResolver<Record<string, string>>(validationSchema),
    mode: 'onBlur',
    reValidateMode: 'onChange',
  })

  const handleSubmit = async ({ login, password }: { login: string; password: string }) => {
    try {
      setIsLoading(true)
      await onSubmit(login, password)
    } catch (error) {
      console.error('LoginForm.tsx', 'handleSubmit', error?.message, error)
      setApiError(error.message)
      /*
       * It's here beacuse there is page change triggered after success in onSubmit func
       * so component is unmounted and we can't perform setIsLoading
       */
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmitReactFrom(handleSubmit)}>
      <Input
        name="login"
        ref={register}
        textColor={color.dark}
        autoFocus={!fields.login?.disabled}
        defaultValue={fields.login?.defaultValue ?? ''}
        placeholder={fields.login?.placeholder ?? 'Login'}
        disabled={isLoading || !!fields.login?.disabled}
        error={errors.login?.message}
      />
      <Space size={0.5} />
      <Input
        name="password"
        type="password"
        textColor={color.dark}
        autoFocus={fields.login?.disabled && !fields.password?.disabled}
        defaultValue={fields.password?.defaultValue ?? ''}
        placeholder="Hasło"
        ref={register}
        disabled={isLoading || !!fields.password?.disabled}
        error={errors.password?.message}
      />
      <Space size={1} />
      <Button type="submit" glow color={color.main} variant="primary" fullWidth disabled={isLoading}>
        {isLoading ? <CircularProgress size="1em" color="inherit" /> : submitText ?? 'Zaloguj'}
      </Button>
      <Space size={0.5} />
      {!!apiError && <ErrorMsg>{apiError}</ErrorMsg>}
    </form>
  )
}

export default LoginForm
