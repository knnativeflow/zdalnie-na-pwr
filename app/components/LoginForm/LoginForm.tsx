import React, { useState } from 'react'
import { Button, TextField, CircularProgress } from '@material-ui/core'
import { Alert } from '@material-ui/lab'

import styles from './LoginForm.scss'

interface InputProps {
  label: string
  placeholder?: string
}

interface Props {
  loginInput: InputProps
  passwordInput: InputProps
  onSubmit: (login: string, password: string) => Promise<void>
}

const LoginForm = (props: Props) => {
  const { loginInput, passwordInput, onSubmit } = props
  const [login, setLogin] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async () => {
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
    <form className={styles.form} onSubmit={handleSubmit}>
      <TextField
        type="text"
        label={loginInput.label}
        placeholder={loginInput.placeholder}
        margin="dense"
        autoFocus
        onChange={(event) => setLogin(event.target.value)}
      />
      <TextField
        type="password"
        label={passwordInput.label}
        placeholder={passwordInput.placeholder}
        margin="dense"
        onChange={(event) => setPassword(event.target.value)}
      />
      {!!error && (
        <Alert severity="error" classes={{ root: styles.alert }}>
          {error}
        </Alert>
      )}
      <Button type="submit" variant="contained" color="primary" disabled={isLoading}>
        {isLoading ? <CircularProgress size={23} /> : 'Zaloguj'}
      </Button>
    </form>
  )
}

export default LoginForm
