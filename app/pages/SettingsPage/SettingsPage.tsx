import React, { SyntheticEvent, useState } from 'react'
import { useHistory } from 'react-router'
import { useDispatch } from 'react-redux'
import { shell } from 'electron'
import styled from '@emotion/styled'

import { clearUser } from 'actions/user'
import { APP_VERSION } from 'constants/version'
import Button from 'components/Button'
import { THEME } from 'base/theme/theme'
import SmailPasswordChangeModal from 'components/SmailModal/SmailPasswordChangeModal'
import LogoNF from 'components/icons/LogoNF'
import LogoMindz from 'components/icons/LogoMindz'
import Messenger from 'components/icons/Messenger'

const Page = styled.div`
  padding: 16px;
  padding-bottom: 64px;
  height: 100%;
  overflow: auto;
`

const Wrapper = styled.div`
  margin: 0 auto;
  display: grid;
  max-width: 800px;
  width: 100%;
  grid-template-columns: minmax(auto, 360px) minmax(auto, 440px);
  grid-template-rows: auto auto;
  grid-auto-flow: column;
  grid-gap: 16px;
`

const Box = styled.div`
  background: #f5f8fa;
  padding: 8px 16px;
  border-radius: 16px;
`

const Header = styled.p`
  font-size: 16px;
  font-weight: 700;
  margin: 10px 0;
`

const Text = styled.p`
  font-size: 14px;
  color: #292b31;

  a {
    color: #1078ff;
  }
`

const StyledLogoNF = styled(LogoNF)`
  height: 48px;
  margin-right: 32px;
`

const StyledLogoMindz = styled(LogoMindz)`
  height: 24px;
  color: #154064;
`

const Logos = styled.div`
  display: flex;
  align-items: center;
`

const ContactLink = styled.a`
  display: flex;
  align-items: center;
  font-size: 14px;

  svg {
    height: 36px;
    margin-right: 10px;
  }
`

const SettingsPage = () => {
  const dispatch = useDispatch()
  const logoutUser = () => dispatch(clearUser())
  const history = useHistory()
  const urlParams = new URLSearchParams(history.location.search)
  const forcePasswordUpdate = urlParams.get('forcePasswordUpdate') === 'true'
  const [isPasswordChangeModalOpen, setIsPasswordChangeModal] = useState(forcePasswordUpdate)

  const handleLink = (e: SyntheticEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    shell.openExternal(e.currentTarget.href)
  }

  const handlePasswordChange = () => {
    setIsPasswordChangeModal(true)
  }

  const closePasswordChangeModal = () => {
    setIsPasswordChangeModal(false)
  }

  return (
    <Page>
      <Wrapper>
        <Box>
          <Header>Ustawienia</Header>

          <Text>Lorem ipsum dlaczego mogą potrzebować zmienić hasło.</Text>
          <Button glow color={THEME.colors.palette.purple.main} variant="primary" onClick={handlePasswordChange}>
            Zmień hasło do poczty
          </Button>

          <Text>Lorem ipsum z jakimś ostrzeżeniem, że wszystkie dane zostaną usunięte.</Text>
          <Button color="#b81e44" variant="outlined" onClick={logoutUser}>
            Wyczyść dane aplikacji
          </Button>
        </Box>

        <Box>
          <Header>Zgłaszanie błędów</Header>
          <Text>
            Aplikacja cały czas się rozwija bla bla bla. Jeżeli chcesz zgłosić błąd najlepiej zrobić to przez wiadomość
            na fanpage koła Native Flow.
          </Text>
          <ContactLink href="https://www.messenger.com/t/knnativeflow" onClick={handleLink}>
            <Messenger /> Skontaktuj się z nami na Messengerze
          </ContactLink>
        </Box>
        <Box>
          <Header>O aplikacji</Header>
          <Text>
            W skrócie <em>Zdalnie na PWr</em> to aplikacja, która pozwoli Ci zapanować nad linkami do zdalnych zajęć!
          </Text>
          <Text>
            W obecnych czasach wszystkie zajęcia odbywają się online. Różni prowadzący używają różnych narzędzi do
            ich&nbsp;prowadzenia. Nasza aplikacja łączy się w bezpieczny sposób z mailem studenckim, aby&nbsp;znaleźć
            linki do&nbsp;platform takich jak <em>Zoom</em> lub&nbsp;<em>Microsoft Teams</em> i&nbsp;połączyć je z Twoją
            siatką zajęć. Dzięki temu przed&nbsp;zajęciami wystarczy wejść do <em>Zdalnie</em>, które pozwoli Ci przejść
            bezpośrednio na zajęcia!
          </Text>
          <Text>
            Dodatkowe informacje można znaleźć na{' '}
            <a href="https://zdalnie.napwr.pl" onClick={handleLink}>
              zdalnie.napwr.pl
            </a>
            .
          </Text>
        </Box>
        <Box>
          <Header>Informacje</Header>
          <Text>
            Wersja {APP_VERSION}.<br />
            Aplikacja rozwijana przez{' '}
            <a href="https://nativeflow.napwr.pl" onClick={handleLink}>
              KN Native Flow
            </a>
            .
            <br />
            Za użyczenie konta Apple dziękujemy firmie{' '}
            <a href="http://mindz.it/" onClick={handleLink}>
              Mindz
            </a>
            .
          </Text>
          <Logos>
            <StyledLogoNF />
            <StyledLogoMindz />
          </Logos>
        </Box>
        <SmailPasswordChangeModal
          forcedUpdate={forcePasswordUpdate}
          open={isPasswordChangeModalOpen}
          onSuccess={closePasswordChangeModal}
          onClose={closePasswordChangeModal}
        />
      </Wrapper>
    </Page>
  )
}

export default SettingsPage
