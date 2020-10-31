import React, { ChangeEvent, FormEvent, useState } from 'react'
import { CircularProgress, Typography } from '@material-ui/core'
import Input from 'components/Input'
import Button from 'components/Button'
import Space from 'components/Space'

export type LoginFormProps = {
  onSubmit: (login: string, password: string) => Promise<void>
  defaultValues?: { login: string; password: string }
  color: {
    light: string
    main: string
    dark: string
  }
}

const LoginForm = ({ onSubmit, defaultValues, color }: LoginFormProps) => {
  const [login, setLogin] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      setIsLoading(true)
      await onSubmit(login, password)
    } catch (error) {
      setError(error.message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <Input
        textColor={color.dark}
        autoFocus
        onChange={(event: ChangeEvent<HTMLInputElement>) => setLogin(event.target.value)}
        defaultValue={defaultValues?.login}
      >
        Login
      </Input>
      <Space size={0.5} />
      <Input
        type="password"
        textColor={color.dark}
        onChange={(event: ChangeEvent<HTMLInputElement>) => setPassword(event.target.value)}
        defaultValue={defaultValues?.password}
      >
        Hasło
      </Input>
      <Space size={1} />
      <Button type="submit" glow color={color.main} primary fullWidth disabled={isLoading}>
        {isLoading ? <CircularProgress size="1em" color="inherit" /> : 'Zaloguj'}
      </Button>
      {!!error && (
        <>
          <Space size={1} />
          <Typography color="error" align="center">
            {error}
          </Typography>
        </>
      )}
    </form>
  )
}

export default LoginForm
