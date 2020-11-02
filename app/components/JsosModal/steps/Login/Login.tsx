import React, { useState } from 'react'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  TextField,
  CircularProgress,
} from '@material-ui/core'
import { Alert } from '@material-ui/lab'

import { jsosAuth } from 'features/jsos'
import styles from './Login.scss'

interface Props {
  open: boolean
  onSuccess: () => void
  onClose: () => void
}

const Login = (props: Props): JSX.Element => {
  const { open, onSuccess, onClose } = props
  const [username, setUsername] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [isProcessing, setIsProcessing] = useState<boolean>(false)
  const [error, setError] = useState<string>('')

  const handleSubmit = async () => {
    try {
      setIsProcessing(true)
      await jsosAuth.signIn(username, password)
      onSuccess()
    } catch (err) {
      console.log(err)
      setError(err.message)
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Logowanie do JSOS</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Operacja logowania, pobierania i analizowania wiadomości w celu znalezienia linków do zajęć zdalnych odbywa
          się lokalnie na twoim komputerze. Żadne dane nie zostaną przesłane na żadne zewnętrzne serwery.
        </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          id="username"
          label="Pwr login"
          type="text"
          fullWidth
          onChange={(event) => setUsername(event.target.value)}
        />
        <TextField
          margin="dense"
          id="password"
          label="Hasło"
          fullWidth
          type="password"
          onChange={(event) => setPassword(event.target.value)}
        />
        {!!error && (
          <Alert severity="error" classes={{ root: styles.alert }}>
            {error}
          </Alert>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary" variant="outlined">
          Anuluj
        </Button>
        {/* TODO: handle press enter and esc buttons */}
        <Button onClick={handleSubmit} color="primary" variant="contained" type="submit" disabled={isProcessing}>
          {isProcessing ? <CircularProgress size={24} /> : 'Zaloguj'}
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default Login
