import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { ObjectSchema } from 'yup'

import { CircularProgress, Typography } from '@material-ui/core'
import Input from 'components/Input'
import Button from 'components/Button'
import Space from 'components/Space'

export type LoginFormProps = {
  onSubmit: (login: string, password: string) => Promise<void>
  validationSchema: ObjectSchema
  defaultValues?: { login: string; password: string }
  loginPlaceholder?: string
  color: {
    light: string
    main: string
    dark: string
  }
}

const LoginForm = ({ onSubmit, defaultValues, color, loginPlaceholder, validationSchema }: LoginFormProps) => {
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
        autoFocus
        defaultValue={defaultValues?.login ?? ''}
        placeholder={loginPlaceholder ?? 'login'}
        disabled={isLoading}
        error={errors.login?.message}
      />
      <Space size={0.5} />
      <Input
        name="password"
        type="password"
        textColor={color.dark}
        defaultValue={defaultValues?.password ?? ''}
        placeholder="hasło"
        ref={register}
        disabled={isLoading}
        error={errors.password?.message}
      />
      <Space size={1} />
      <Button type="submit" glow color={color.main} variant="primary" fullWidth disabled={isLoading}>
        {isLoading ? <CircularProgress size="1em" color="inherit" /> : 'Zaloguj'}
      </Button>
      {!!apiError && (
        <>
          <Space size={1} />
          <Typography color="error" align="center">
            {apiError}
          </Typography>
        </>
      )}
    </form>
  )
}

export default LoginForm
