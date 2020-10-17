import React, { useState } from 'react'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  TextField,
} from '@material-ui/core'
import { Alert } from '@material-ui/lab'

import studentMail from 'features/studentMail'
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
  const [error, setError] = useState<string>('')

  const handleSubmit = async () => {
    try {
      await studentMail.login(username, password)
      onSuccess()
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Logowanie do poczty studenckiej</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Operacja logowania, pobierania i analizowania wiadomości w celu znalezienia linków do zajęć zdalnych odbywa
          się lokalnie na twoim komputerze. Żadne dane nie zostaną przesłane na serwer twórcą aplikacji.
        </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          id="username"
          label="Indeks"
          type="number"
          fullWidth
          onChange={(event) => setUsername(event.target.value)}
        />
        <TextField
          margin="dense"
          id="password"
          label="Hasło"
          fullWidth
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
        <Button onClick={handleSubmit} color="primary" variant="contained" type="submit">
          Zaloguj
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default Login
