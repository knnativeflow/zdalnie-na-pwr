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

interface Props {
  open: boolean
  onSubmit: (username: string, password: string) => void
  onClose: () => void
}

const LoginStudentMailModal = (props: Props): JSX.Element => {
  const { open, onSubmit, onClose } = props
  const [username, setUsername] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  // TODO: add errors from login to student mail

  const handleSubmit = () => {
    onSubmit(username, password)
  }

  return (
    <Dialog open={open} onClose={onClose} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">
        Logowanie do poczty studenckiej
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          Operacja logowania, pobierania i analizowania wiadomości w celu
          znalezienia linków do zajęć zdalnych odbywa się lokalnie na twoim
          komputerze. Żadne dane nie zostaną przesłane na serwer twórcą
          aplikacji.
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
          autoFocus
          margin="dense"
          id="password"
          label="Hasło"
          fullWidth
          onChange={(event) => setPassword(event.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary" variant="outlined">
          Anuluj
        </Button>
        {/* TODO: handle press enter and esc buttons */}
        <Button
          onClick={handleSubmit}
          color="primary"
          variant="contained"
          type="submit"
        >
          Zaloguj
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default LoginStudentMailModal
