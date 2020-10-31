import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Box, FormControlLabel, Radio, styled } from '@material-ui/core'

import studentMail from 'features/studentMail'
import { jsosAuth, jsosExtractor } from 'features/jsos'
import iCalendar from 'features/iCalendar'
import { addEvents, addZoomLinks } from 'actions/events'
import { addCourses, addTeamsLinks } from 'actions/courses'
import { updateUser } from 'actions/user'
import LoginForm from 'components/LoginForm'
import Button from 'components/Button'
import { APP_COLORS } from 'base/theme/theme'
import { FaChevronLeft } from 'react-icons/all'
import Text from 'components/Text'
import Space from 'components/Space'
import ConfigurationMockup from './ConfigurationMockup'

const StyledSidebar = styled('div')({
  height: '100%',
  width: '40%',
  maxWidth: 400,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  padding: '5%',

  '& h1': {
    margin: 0,
  },
})

type LoginProps = {
  handleSubmit: (login: string, password: string) => Promise<void>
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
  <Box display="flex" alignItems="center" marginBottom="auto">
    <Button color={color.main} compact onClick={onClick}>
      <FaChevronLeft />
    </Button>
    <Space size={0.5} horizontal />
    <Text fontWeight="bold" color={color.light} size={0.9}>
      Krok {count} z 3
    </Text>
  </Box>
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

const StartStep = ({ nextStep }: { nextStep: () => void }) => (
  <Box width="100vw" height="100vh" overflow="hidden" position="relative" display="flex">
    <StyledSidebar>
      <Text size={2} fontWeight={900}>
        Zdalnie
      </Text>
      <Text size={2} fontWeight="lighter">
        na PWR
      </Text>
      <Box height="4em" />
      <span>Od dziś wszystkie linki do zajęć możesz mieć w jednym miejscu.</span>
      <Box height="2em" />
      <Button onClick={nextStep} glow color="#FF4AF8" primary fullWidth>
        Do dzieła
      </Button>
    </StyledSidebar>
    <ConfigurationMockup color={APP_COLORS.pink.light} />
  </Box>
)

const JsosStep = ({ handleSubmit, prevStep }: LoginProps & { prevStep: () => void }) => (
  <Box width="100vw" height="100vh" overflow="hidden" position="relative" display="flex">
    <StyledSidebar>
      <GoBackButton color={APP_COLORS.purple} count={1} onClick={prevStep} />
      <Space size={2} />
      <h3>Zaloguj się do JSOS</h3>
      <Space size={2} />
      <LoginForm onSubmit={handleSubmit} color={APP_COLORS.purple} />
      <Space size={2} />
      <FooterInfo color={APP_COLORS.purple.light}>
        Aktualnie jedyną informacją pobieraną z JSOS jest siatka zajęć. Cały proces wykonywany jest wewnątrz aplikacji i
        nie różni się od logowania przez przeglądarkę.
      </FooterInfo>
    </StyledSidebar>
    <ConfigurationMockup color={APP_COLORS.purple.light} />
  </Box>
)

const MailStep = ({ handleSubmit, prevStep }: LoginProps & { prevStep: () => void }) => (
  <Box width="100vw" height="100vh" overflow="hidden" position="relative" display="flex">
    <StyledSidebar>
      <GoBackButton color={APP_COLORS.blue} count={2} onClick={prevStep} />
      <Space size={2} />
      <h3>Zaloguj się do poczty studenckiej</h3>
      <Space size={2} />
      <LoginForm onSubmit={handleSubmit} color={APP_COLORS.blue} />
      <Space size={2} />
      <FooterInfo color={APP_COLORS.blue.light}>
        Logowanie do poczty wymagane jest do pobierania automatycznie linków do Zooma oraz linków do Teamsów. Po co
        szukać samemu linków jak może to zrobić za ciebie technologia? Działanie i bezpieczeństwo działa na tej samej
        zasadzie co logowanie do JSOS.
      </FooterInfo>
    </StyledSidebar>
    <ConfigurationMockup color={APP_COLORS.blue.light} />
  </Box>
)

const SavePasswordStep = (props: { prevStep: () => void; handleSavePassword: (hasAgreed: boolean) => void }) => {
  const [hasAgreed, setHasAgreed] = useState(true)
  const { handleSavePassword, prevStep } = props
  return (
    <Box width="100vw" height="100vh" overflow="hidden" position="relative" display="flex">
      <StyledSidebar>
        <GoBackButton color={APP_COLORS.teal} count={3} onClick={prevStep} />
        <Space size={2} />
        <h3>Zapamiętaj dane logowania</h3>
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
        <Space size={2} />
        <Button onClick={() => handleSavePassword(hasAgreed)} glow color={APP_COLORS.teal.main} primary fullWidth>
          Gotowe
        </Button>
        <Space size={2} />
        <FooterInfo color={APP_COLORS.teal.light}>
          Jeśli dane nie zostaną zapamiętane, trzeba będzie wpisać je na nowo podczas każdego uruchomienia aplikacji.
        </FooterInfo>
      </StyledSidebar>
      <ConfigurationMockup color={APP_COLORS.teal.light} />
    </Box>
  )
}

const CongratulationsStep = ({ handleExitConfiguration }: { handleExitConfiguration: () => void }) => (
  <Box
    width="100vw"
    height="100vh"
    overflow="hidden"
    position="relative"
    display="flex"
    flexDirection="column"
    justifyContent="center"
    alignItems="center"
  >
    <Text fontWeight="bold" size={2}>
      Wszystko gotowe!
      <span role="img" aria-label="gwiazdki">
        ✨
      </span>
    </Text>
    <Text>Możesz już zacząć korzystać z aplikacji.</Text>
    <Space size={2} />
    <Button color={APP_COLORS.pink.main} primary glow onClick={handleExitConfiguration}>
      Przejdź do aplikacji
    </Button>
  </Box>
)

const ConfigurationPage = () => {
  const dispatch = useDispatch()
  const [activeStepIndex, setActiveStepIndex] = useState(0)
  const [jsosDataLogin, setJsosDataLogin] = useState({ login: '', password: '' })
  const [mailDataLogin, setMailDataLogin] = useState({ login: '', password: '' })

  const goToNextStep = () => setActiveStepIndex(activeStepIndex + 1)
  const goToPrevStep = () => setActiveStepIndex(activeStepIndex - 1)

  const handleJsosLogin = async (login: string, password: string): Promise<void> => {
    await jsosAuth.signIn(login, password)

    setJsosDataLogin({ login, password })
    const iCalendarString = await jsosExtractor.downloadCalendar()
    const courses = await jsosExtractor.fetchCourseList()
    const events = iCalendar.getEventsFromString(iCalendarString)

    dispatch(addEvents(events))
    dispatch(addCourses(courses))

    goToNextStep()
  }

  const handleMailLogin = async (login: string, password: string): Promise<void> => {
    await studentMail.login(login, password)
    setMailDataLogin({ login, password })

    const zoomLinks = await studentMail.getZoomLinks()
    const teamsLinks = await studentMail.getTeamsLinks()

    dispatch(addZoomLinks(zoomLinks))
    dispatch(addTeamsLinks(teamsLinks))
    dispatch(updateUser({ indeks: login }))

    goToNextStep()
  }

  const handleSavePassword = (hasAgreed: boolean) => {
    if (hasAgreed) {
      console.log('zapisuje hasła', jsosDataLogin, mailDataLogin)
    } else {
      console.log('nie zapisuje haseł')
    }

    // TODO: add save password

    goToNextStep()
  }

  const handleExitConfiguration = () => {
    dispatch(updateUser({ configured: true }))
  }
  return [
    <StartStep key={0} nextStep={goToNextStep} />,
    <JsosStep key={1} handleSubmit={handleJsosLogin} prevStep={goToPrevStep} />,
    <MailStep key={2} handleSubmit={handleMailLogin} prevStep={goToPrevStep} />,
    <SavePasswordStep key={3} handleSavePassword={handleSavePassword} prevStep={goToPrevStep} />,
    <CongratulationsStep key={4} handleExitConfiguration={handleExitConfiguration} />,
  ][activeStepIndex]
}

export default ConfigurationPage
