/* eslint-disable react/no-unescaped-entities */
import React, { useState, PropsWithChildren } from 'react'
import { useDispatch } from 'react-redux'
import { FormControlLabel, Radio } from '@material-ui/core'
import styled from '@emotion/styled'
import { css } from '@emotion/core'
import { shell } from 'electron'

import gmailStudentMail from 'features/gmailStudentMail'
import { jsosAuth, jsosExtractor } from 'features/jsos'
import { EducationProgram } from 'features/jsos/JsosExtractor'
import iCalendar from 'features/iCalendar'
import PasswordManager from 'features/passwords'
import { addEvents, addZoomLinks } from 'actions/events'
import { addCourses } from 'actions/courses'
import { updateUser } from 'actions/user'
import { setShownStatusGoogleSettingsMessage } from 'actions/app'
import { setFetchStatusMail } from 'actions/mail'
import { parseDateToString } from 'utils/date'
import LoginForm from 'components/LoginForm'
import { LoginFormProps } from 'components/LoginForm/LoginForm'
import Button from 'components/Button'
import { THEME } from 'base/theme/theme'
import { FaChevronLeft } from 'react-icons/all'
import Text from 'components/Text'
import Space from 'components/Space'
import ProgramSelection from 'components/ProgramSelection'

import img1 from 'assets/images/step1.png'
import img2 from 'assets/images/step2.png'
import img3 from 'assets/images/step3.png'
import img4 from 'assets/images/step4.png'

import ConfigurationMockup from './ConfigurationMockup'
import { jsosValidationSchema, mailValidationSchema } from './validationsSchemas'

const Box = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  overflow: hidden;
`

const StyledSidebar = styled.div`
  height: 100%;
  flex: 1;
  padding: 5% 32px 5% 4vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

const SidebarContent = styled.div`
  max-height: 800px;
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  max-width: 400px;
`

const CenterContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;

  h2 {
    margin: 0;
  }
`

const BackButtonWrapper = styled.div`
  display: flex;
`

type StepWithLoginProps = Omit<LoginFormProps, 'color'> & { prevStep: () => void }

type SelectionProps<T> = {
  options: Array<T>
  prevStep: () => void
  onSelect: (selected: T) => Promise<void>
}

type GoBackProps = {
  count: number
  color: {
    light: string
    main: string
  }
  onClick: () => void
}

const GoBackButton = ({ count, color, onClick }: GoBackProps) => (
  <BackButtonWrapper>
    <Button color={color.main} compact onClick={onClick}>
      <FaChevronLeft />
    </Button>
    <Space size={0.5} horizontal />
    <Text fontWeight="bold" color={color.light} size={0.9}>
      Krok {count} z 3
    </Text>
  </BackButtonWrapper>
)

type FooterInfoProps = {
  children: React.ReactNode
  color: string
}

const FooterInfo = ({ children, color }: FooterInfoProps) => (
  <Text color={color} size={0.75} style={{ marginTop: 'auto' }}>
    {children}
  </Text>
)

type LinkProps = PropsWithChildren<{
  url: string
  className?: string
}>

const Link = styled(({ url, children, className }: LinkProps) => (
  <span onClick={() => shell.openExternal(url)} className={className}>
    {children}
  </span>
))`
  color: ${THEME.colors.palette.blue.main};
  font-weight: 700;
  cursor: pointer;
`

const StartStep = ({ nextStep }: { nextStep: () => void }) => (
  <Box>
    <StyledSidebar>
      <SidebarContent>
        <CenterContent>
          <Text size={2} fontWeight={900}>
            Zdalnie
          </Text>
          <Text size={2} fontWeight="lighter">
            na PWR
          </Text>
          <Space size={4} />
          <span>Od dziś wszystkie linki do zajęć możesz mieć w jednym miejscu.</span>
          <Space size={2} />
          <Button onClick={nextStep} glow color="#FF4AF8" variant="primary" fullWidth>
            Do dzieła
          </Button>
        </CenterContent>
      </SidebarContent>
    </StyledSidebar>
    <ConfigurationMockup color={THEME.colors.palette.pink.light} src={img1} />
  </Box>
)

const JsosStep = ({ onSubmit, fields, validationSchema, prevStep }: StepWithLoginProps) => (
  <Box>
    <StyledSidebar>
      <SidebarContent>
        <GoBackButton color={THEME.colors.palette.purple} count={1} onClick={prevStep} />
        <CenterContent>
          <h2>Zaloguj się do JSOS</h2>
          <Space size={1.5} />
          <LoginForm color={THEME.colors.palette.purple} {...{ onSubmit, fields, validationSchema }} />
        </CenterContent>
        <FooterInfo color={THEME.colors.palette.purple.light}>
          Aktualnie jedyną informacją pobieraną z JSOS jest siatka zajęć oraz lista kursów. Cały proces wykonywany jest
          wewnątrz aplikacji i nie różni się od logowania przez przeglądarkę. Twoje dane obsługiwane są tylko na twoim
          komputerze oraz serwerze Politechniki.
        </FooterInfo>
      </SidebarContent>
    </StyledSidebar>
    <ConfigurationMockup color={THEME.colors.palette.purple.light} src={img2} />
  </Box>
)

const EducationProgramSelectionStep = ({ prevStep, options, onSelect }: SelectionProps<EducationProgram>) => (
  <Box>
    <StyledSidebar>
      <SidebarContent>
        <GoBackButton color={THEME.colors.palette.purple} count={1} onClick={prevStep} />
        <CenterContent>
          <h2>Wybierz tok studiów:</h2>
          <Space size={1.5} />
          <ProgramSelection onSubmit={onSelect} options={options} color={THEME.colors.palette.purple} />
        </CenterContent>
      </SidebarContent>
    </StyledSidebar>
    <ConfigurationMockup color={THEME.colors.palette.purple.light} src={img2} />
  </Box>
)

const GoogleSettingsStep = ({ prevStep, onSubmit }: { prevStep: () => void; onSubmit: () => void }) => (
  <Box>
    <StyledSidebar>
      <SidebarContent>
        <GoBackButton color={THEME.colors.palette.blue} count={2} onClick={prevStep} />
        <CenterContent>
          <h2>Zmień ustawienia poczty Gmail i konta Google</h2>
          <Space size={1.5} />
          <Text size="14px" color="#2B2B2B">
            1. Włączenie protokołu IMAP dla konta studenckiego Gmail. Opcja znajduje się w ustawieniach poczty (nie
            konta Google) w zakładce "Przekazywanie i POP/IMAP".
          </Text>
          <Space size={1.5} />
          <Text size="14px" color="#2B2B2B">
            2. Włączenie dostępu dla mniej bezpiecznych aplikacji. Opcja znajduje się w ustawieniach studenckiego konta
            Google. Zakładka "Bezpieczeństwo", opcja "Dostęp do mniej bezpiecznych aplikacji".
          </Text>
          <Space size={1.5} />
          <Text size="14px" color="#2B2B2B">
            Bez zmiany ustawień w Gmailu i Google'u aplikacja nie będzie mogła poprawienia zalogować się do konta
            pocztowego. Efektem będzie ograniczenie funkcjonalności aplikacji.
          </Text>
          <Space size={1.5} />
          <Text fontWeight="bold" size="14px" color={THEME.colors.error}>
            Uwaga, ustawienia dla niektórych kont po zakończeniu semestru wróciły do poprzednich ustawień. Jeżeli w
            kolejnym kroku wystąpi problem z logowaniem sprawdź ponownie ustawienia.
          </Text>
          <Space size={2} />
          <Button onClick={onSubmit} glow color={THEME.colors.palette.teal.main} variant="primary" fullWidth>
            Ustawienia zmienione!
          </Button>
        </CenterContent>
        <FooterInfo color={THEME.colors.palette.blue.light}>
          Ze względu na wysokie wymagania Google związane z RODO w tym posiadanie polityki prywatności, przed
          zalogowaniem się do poczty studenckiej w aplikacji trzeba zmienić ustawienia Google/Gmail, żeby ominąć
          ograniczenia tworzone przez Google.
        </FooterInfo>
      </SidebarContent>
    </StyledSidebar>
    <ConfigurationMockup color={THEME.colors.palette.blue.light} src={img3} />
  </Box>
)

const MailStep = ({ onSubmit, fields, validationSchema, prevStep }: StepWithLoginProps) => (
  <Box>
    <StyledSidebar>
      <SidebarContent>
        <GoBackButton color={THEME.colors.palette.blue} count={2} onClick={prevStep} />
        <CenterContent>
          <h2>Zaloguj się do poczty studenckiej Gmail</h2>
          <Space size={1.5} />
          <LoginForm color={THEME.colors.palette.blue} {...{ onSubmit, fields, validationSchema }} />
        </CenterContent>
        <FooterInfo color={THEME.colors.palette.blue.light}>
          Logowanie do poczty wymagane jest do pobierania automatycznie linków do Zooma oraz linków do Teamsów. Po co
          szukać samemu linków jak może to zrobić za ciebie technologia? Działanie i bezpieczeństwo działa na tej samej
          zasadzie co logowanie do JSOS.
        </FooterInfo>
      </SidebarContent>
    </StyledSidebar>
    <ConfigurationMockup color={THEME.colors.palette.blue.light} src={img3} />
  </Box>
)

const SavePasswordStep = (props: { prevStep: () => void; onPasswordSave: (hasAgreed: boolean) => void }) => {
  const [hasAgreed, setHasAgreed] = useState(true)
  const { onPasswordSave, prevStep } = props
  return (
    <Box>
      <StyledSidebar>
        <SidebarContent>
          <GoBackButton color={THEME.colors.palette.teal} count={3} onClick={prevStep} />
          <CenterContent>
            <h2>Zapamiętaj dane logowania</h2>
            <Space size={1.5} />
            <FormControlLabel
              onChange={() => setHasAgreed(true)}
              checked={hasAgreed}
              control={<Radio />}
              label="Pamiętaj"
            />
            <FormControlLabel
              onChange={() => setHasAgreed(false)}
              checked={!hasAgreed}
              control={<Radio />}
              label="Nie pamiętaj"
            />
            <Space size={1.5} />
            <Button
              onClick={() => onPasswordSave(hasAgreed)}
              glow
              color={THEME.colors.palette.teal.main}
              variant="primary"
              fullWidth
              disabled={!hasAgreed}
            >
              Gotowe
            </Button>
          </CenterContent>
          <FooterInfo color={THEME.colors.palette.teal.light}>
            Jak w przeglądarce zapisujemy dane logowania, żeby nie wpisywać ich za każdym razem. Kto chciałby wpisywać
            to samo co 5 minut? Oczywiście wszystko jest bezpieczne, dane logowania zapisywane są w tzw. bezpiecznej
            enklawie twojego systemu operacyjnego, miejsca specjalnie przeznaczonego do zapisywania haseł.
          </FooterInfo>
        </SidebarContent>
      </StyledSidebar>
      <ConfigurationMockup color={THEME.colors.palette.teal.light} />
    </Box>
  )
}

const CongratulationsStep = ({ onConfigurationExit }: { onConfigurationExit: () => void }) => (
  <Box>
    <StyledSidebar>
      <SidebarContent
        css={css`
          max-width: 500px;
        `}
      >
        <CenterContent>
          <Text fontWeight="bold" size={2}>
            Wszystko gotowe!
            <span role="img" aria-label="juhu">
              ✨
            </span>
          </Text>
          <Text size="16px" color="#2B2B2B">
            Garśc informacji od twórców:
          </Text>
          <Space size={3} />
          <Text fontWeight={700} size="20px">
            <span role="img" aria-label="kawa">
              ☕️
            </span>
            Aplikacja jest w trakcie rozwoju
          </Text>
          <Text>
            ...więc mogą pojawić się błędy. Jesteśmy tylko studentami, a aplikację tworzymy po godzinach nauki i pracy.
            Poza tym - walka z systemami politechniki to nie lada wyzwanie{' '}
            <span role="img" aria-label="uśmiechnięta buźka">
              😅
            </span>
          </Text>
          <Space size={2} />
          <Text fontWeight={700} size="20px">
            <span role="img" aria-label="ziemia">
              ‍🌍
            </span>
            Kod dostępny jest publicznie
          </Text>
          <Text>
            Programistów zachęcamy do odwiedzenia{' '}
            <Link url="https://github.com/knnativeflow/zdalnie-na-pwr">naszego GitHuba</Link> i dodania czegoś od
            siebie.
          </Text>
          <Space size={3} />
          <Button
            color={THEME.colors.palette.pink.main}
            variant="primary"
            glow
            onClick={onConfigurationExit}
            style={{ alignSelf: 'center' }}
          >
            Przejdź do aplikacji
          </Button>
        </CenterContent>
      </SidebarContent>
    </StyledSidebar>
    <ConfigurationMockup color={THEME.colors.palette.pink.light} src={img4} isSummary />
  </Box>
)

const ConfigurationPage = () => {
  const dispatch = useDispatch()
  const [activeStepIndex, setActiveStepIndex] = useState(0)
  const [jsosDataLogin, setJsosDataLogin] = useState({ login: '', password: '' })
  const [mailDataLogin, setMailDataLogin] = useState({ login: '', password: '' })
  const [availableEducationalPrograms, setAvailableEducationalPrograms] = useState<EducationProgram[]>([])

  const goNextBy = (n: number) => setActiveStepIndex(activeStepIndex + n)
  const goPrevBy = (n: number) => setActiveStepIndex(activeStepIndex - n)

  const fetchCourses = async (educationProgram: EducationProgram) => {
    const courses = await jsosExtractor.fetchCourseList(educationProgram)
    dispatch(addCourses(courses))

    const iCalendarString = await jsosExtractor.downloadCalendar(educationProgram)
    const events = iCalendar.getEventsFromString(iCalendarString)

    const eventsWithCode = events.map((event) => {
      const courseEvent = courses.find((course) => course.name.startsWith(event.name) && course.type === event.type)

      if (courseEvent) {
        return { ...event, code: courseEvent.classesCode, name: courseEvent.name }
      }

      return event
    })

    dispatch(addEvents(eventsWithCode))
  }

  const handleJsosLogin = async (login: string, password: string): Promise<void> => {
    await jsosAuth.signIn(login, password)

    setJsosDataLogin({ login, password })
    const activeEducationPrograms = await jsosExtractor.fetchActiveEducationPrograms()
    setAvailableEducationalPrograms(activeEducationPrograms)

    if (activeEducationPrograms.length > 1) {
      goNextBy(1)
    } else if (activeEducationPrograms.length === 1) {
      await fetchCourses(activeEducationPrograms[0])
      goNextBy(2)
    } else {
      throw new Error('Brak aktywnego toku studiów.')
    }
  }

  const handleEducationProgramSelection = async (program: EducationProgram) => {
    await fetchCourses(program)
    goNextBy(1)
  }

  const handleMailLogin = async (login: string, password: string): Promise<void> => {
    await gmailStudentMail.login(login, password)
    setMailDataLogin({ login, password })

    const zoomLinks = await gmailStudentMail.getZoomLinks()

    dispatch(addZoomLinks(zoomLinks))
    dispatch(updateUser({ indeks: login }))
    dispatch(setFetchStatusMail({ isLoading: false, lastScan: parseDateToString(new Date()), error: '' }))

    goNextBy(1)
  }

  const handleSavePassword = async (hasAgreed: boolean) => {
    if (hasAgreed) {
      await PasswordManager.saveJsosCredentials(jsosDataLogin.login, jsosDataLogin.password)
      await PasswordManager.saveSmailCredentials(mailDataLogin.login, mailDataLogin.password)
    }
    goNextBy(1)
  }

  const jsosFields = {
    login: { defaultValue: jsosDataLogin.login, placeholder: 'pwr######' },
    password: { defaultValue: jsosDataLogin.password },
  }

  const mailFields = {
    login: { defaultValue: mailDataLogin.login, placeholder: 'Indeks' },
    password: { defaultValue: mailDataLogin.password },
  }

  const handleExitConfiguration = () => {
    dispatch(updateUser({ configured: true }))
    dispatch(setShownStatusGoogleSettingsMessage(true))
  }

  return [
    <StartStep key={0} nextStep={() => goNextBy(1)} />,
    <JsosStep
      key={1}
      onSubmit={handleJsosLogin}
      fields={jsosFields}
      prevStep={() => goPrevBy(1)}
      validationSchema={jsosValidationSchema}
    />,
    <EducationProgramSelectionStep
      key={2}
      options={availableEducationalPrograms}
      prevStep={() => goPrevBy(1)}
      onSelect={handleEducationProgramSelection}
    />,
    <GoogleSettingsStep
      key={3}
      prevStep={availableEducationalPrograms.length > 1 ? () => goPrevBy(1) : () => goPrevBy(2)}
      onSubmit={() => goNextBy(1)}
    />,
    <MailStep
      key={4}
      onSubmit={handleMailLogin}
      fields={mailFields}
      prevStep={() => goPrevBy(1)}
      validationSchema={mailValidationSchema}
    />,
    <SavePasswordStep key={5} onPasswordSave={handleSavePassword} prevStep={() => goPrevBy(1)} />,
    <CongratulationsStep key={6} onConfigurationExit={handleExitConfiguration} />,
  ][activeStepIndex]
}

export default ConfigurationPage
