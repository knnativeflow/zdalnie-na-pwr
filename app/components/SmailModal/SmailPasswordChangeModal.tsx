import React from 'react'
import { useSelector } from 'react-redux'
import styled from '@emotion/styled'
import { RootState } from 'store'
import { Dialog, DialogContentText, DialogTitle } from '@material-ui/core'
import Button from 'components/Button'
import LoginForm from 'components/LoginForm'

import Space from 'components/Space'
import studentMail from 'features/studentMail'
import { THEME } from 'base/theme/theme'
import PasswordManager from 'features/passwords'
import { mailValidationSchema } from 'pages/ConfigurationPage/validationsSchemas'

interface Props {
  open: boolean
  forcedUpdate: boolean
  onSuccess: () => void
  onClose: () => void
}

const DialogContent = styled.div`
  width: 450px;
  padding: 10px 30px 20px 30px;
`

const SmailPasswordChangeModal = (props: Props): JSX.Element => {
  const { open, onSuccess, onClose, forcedUpdate } = props

  const login = useSelector((state: RootState) => state.user.indeks)

  const fields = { login: { defaultValue: login, disabled: true } }
  const submitText = 'Zapisz'

  const onSubmit = async (login: string, password: string) => {
    await studentMail.login(login, password)
    await PasswordManager.saveSmailCredentials(login, password)
    onSuccess()
  }

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogContent>
        <DialogTitle>Zmień hasło do poczty studenckiej</DialogTitle>
        {forcedUpdate && (
          <DialogContentText>
            Nie udało się zalogować do poczty zapisanym hasłem. Najprawdopodobniej nastąpiła jego zmiana, prosimy
            wprowadź nowe.
          </DialogContentText>
        )}
        <Space size={1} />
        <LoginForm
          color={THEME.colors.palette.purple}
          validationSchema={mailValidationSchema}
          {...{ onSubmit, fields, submitText }}
        />
        <Button fullWidth variant="transparent" onClick={onClose}>
          Anuluj
        </Button>
      </DialogContent>
    </Dialog>
  )
}

export default SmailPasswordChangeModal
