/* eslint-disable react/no-unescaped-entities */
import React from 'react'
import { useHistory } from 'react-router'
import { useDispatch } from 'react-redux'
import { Dialog, DialogContent, DialogTitle, DialogContentText, DialogActions } from '@material-ui/core'

import { setShownStatusGoogleSettingsMessage } from 'actions/app'
import Button from 'components/Button'
import { THEME } from 'base/theme/theme'
import routes from 'constants/routes.json'

interface Props {
  isOpen: boolean
}

const ChangeGoogleSettingsModal = (props: Props) => {
  const { isOpen } = props
  const dispatch = useDispatch()
  const history = useHistory()

  const handleCompleteChangeSettings = () => {
    dispatch(setShownStatusGoogleSettingsMessage(true))
    history.push(`${routes.SETTINGS}?forcePasswordUpdate=true`)
  }

  return (
    <Dialog open={isOpen}>
      <DialogTitle>Poczta studencka na Gmailu</DialogTitle>
      <DialogContent>
        {/* eslint-disable-next-line jsx-a11y/accessible-emoji */}
        <DialogContentText>
          Aplikacja wraca dopasowana do nowej poczty studenckiej na Gmailu{' '}
          <span role="img" aria-label="juhu" style={{ color: '#000' }}>
            😁
          </span>
          . Ze względu na wysokie wymagania Google związane z RODO w tym posiadanie polityki prywatności, przed ponownym
          zalogowaniem się do poczty studenckiej w aplikacji trzeba zmienić ustawienia Google/Gmail w dwóch miejsach,
          żeby ominąć ograniczenia tworzone przez Google.
        </DialogContentText>
        <DialogContentText>
          1. Włączenie protokołu IMAP dla konta studenckiego Gmail. Opcja znajduje się w ustawieniach poczty (nie konta
          Google) w zakładce "Przekazywanie i POP/IMAP".
        </DialogContentText>
        <DialogContentText>
          2. Włączenie dostępu dla mniej bezpiecznych aplikacji. Opcja znajduje się w ustawieniach studenckiego konta
          Google. Zakładka "Bezpieczeństwo", opcja "Dostęp do mniej bezpiecznych aplikacji".
        </DialogContentText>
        <DialogContentText style={{ color: THEME.colors.error }}>
          Bez zmiany ustawień w Gmailu i Google'u aplikacja nie będzie mogła poprawienia zalogować się do konta
          pocztowego. Efektem będzie brak pobieranych linków do Zooma oraz komunikat o zmianie hasła na poprawne.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button variant="primary" glow color={THEME.colors.palette.purple.main} onClick={handleCompleteChangeSettings}>
          Ustawienia zmienione!
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default ChangeGoogleSettingsModal
