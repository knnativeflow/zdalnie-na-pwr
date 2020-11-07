import React from 'react'
import { useSelector } from 'react-redux'
import {
  Dialog,
  DialogTitle,
} from '@material-ui/core'

import Button from 'components/Button'
import studentMail from 'features/studentMail'
import { THEME } from 'base/theme/theme'
import LoginForm from 'components/LoginForm'
import PasswordManager from 'features/passwords'
import { mailValidationSchema } from 'pages/ConfigurationPage/validationsSchemas'
import { RootState } from 'store'
import Space from '../Space'
import styled from '@emotion/styled'

interface Props {
  open: boolean
  onSuccess: () => void
  onClose: () => void
}

const DialogContent = styled.div`padding: 10px 30px 20px 30px`

const SmailPasswordChangeModal = (props: Props): JSX.Element => {
  const { open, onSuccess, onClose } = props

  const login = useSelector((state: RootState) => state.user.indeks)

  const defaultValues = {login}
  const disabledFields = {login: true}

  const onSubmit = async (login: string, password: string) => {
    await studentMail.login(login, password)
    await PasswordManager.saveSmailCredentials(login, password)
    onSuccess()
  }

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogContent>
        <DialogTitle>Zmień hasło do poczty studenckiej</DialogTitle>
        <Space size={1} />
        <LoginForm
          color={THEME.colors.palette.purple}
          {...{ onSubmit, defaultValues, validationSchema: mailValidationSchema, disabledFields }}
          loginPlaceholder="pwr######"
        />
        <Button glow color={THEME.colors.palette.purple.dark} fullWidth variant="primary" onClick={onClose}>
          Anuluj
        </Button>
      </DialogContent>
    </Dialog>
  )
}

export default SmailPasswordChangeModal
