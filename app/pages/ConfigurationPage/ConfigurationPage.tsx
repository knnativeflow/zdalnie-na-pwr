import React, { useState, PropsWithChildren } from 'react'
import { useDispatch } from 'react-redux'
import { Box, FormControlLabel, Radio } from '@material-ui/core'
import styled from '@emotion/styled'
import { shell } from 'electron'

import studentMail from 'features/studentMail'
import { jsosAuth, jsosExtractor } from 'features/jsos'
import iCalendar from 'features/iCalendar'
import PasswordManager from 'features/passwords'
import { addEvents, addZoomLinks } from 'actions/events'
import { addCourses, addTeamsLinks } from 'actions/courses'
import { updateUser } from 'actions/user'
import LoginForm from 'components/LoginForm'
import { LoginFormProps } from 'components/LoginForm/LoginForm'
import Button from 'components/Button'
import { THEME } from 'base/theme/theme'
import { FaChevronLeft } from 'react-icons/all'
import Text from 'components/Text'
import Space from 'components/Space'

import img1 from 'assets/images/step1.png'
import img2 from 'assets/images/step2.png'
import img3 from 'assets/images/step3.png'
import img4 from 'assets/images/step4.png'

import ConfigurationMockup from './ConfigurationMockup'
import { jsosValidationSchema, mailValidationSchema } from './validationsSchemas'

const StyledSidebar = styled.div`
  height: 100%;
  width: 40%;
  max-width: 400px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 5%;

  & h1 {
    margin: 0;
  }
`

type StepWithLoginProps = Omit<LoginFormProps, 'color'> & { prevStep: () => void }

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
      <Button onClick={nextStep} glow color="#FF4AF8" variant="primary" fullWidth>
        Do dzieła
      </Button>
    </StyledSidebar>
    <ConfigurationMockup color={THEME.colors.palette.pink.light} src={img1} />
  </Box>
)

const JsosStep = ({ onSubmit, fields, validationSchema, prevStep }: StepWithLoginProps) => (
  <Box width="100vw" height="100vh" overflow="hidden" position="relative" display="flex">
    <StyledSidebar>
      <GoBackButton color={THEME.colors.palette.purple} count={1} onClick={prevStep} />
      <Space size={2} />
      <h2>Zaloguj się do JSOS</h2>
      <Space size={2} />
      <LoginForm color={THEME.colors.palette.purple} {...{ onSubmit, fields, validationSchema }} />
      <Space size={2} />
      <FooterInfo color={THEME.colors.palette.purple.light}>
        Aktualnie jedyną informacją pobieraną z JSOS jest siatka zajęć oraz lista kursów. Cały proces wykonywany jest
        wewnątrz aplikacji i nie różni się od logowania przez przeglądarkę. Twoje dane obsługane są tylko na twoim
        komputerze oraz serwerze Politechniki.
      </FooterInfo>
    </StyledSidebar>
    <ConfigurationMockup color={THEME.colors.palette.purple.light} src={img2} />
  </Box>
)

const MailStep = ({ onSubmit, fields, validationSchema, prevStep }: StepWithLoginProps) => (
  <Box width="100vw" height="100vh" overflow="hidden" position="relative" display="flex">
    <StyledSidebar>
      <GoBackButton color={THEME.colors.palette.blue} count={2} onClick={prevStep} />
      <Space size={2} />
      <h2>Zaloguj się do poczty studenckiej</h2>
      <Space size={2} />
      <LoginForm color={THEME.colors.palette.blue} {...{ onSubmit, fields, validationSchema }} />
      <Space size={2} />
      <FooterInfo color={THEME.colors.palette.blue.light}>
        Logowanie do poczty wymagane jest do pobierania automatycznie linków do Zooma oraz linków do Teamsów. Po co
        szukać samemu linków jak może to zrobić za ciebie technologia? Działanie i bezpieczeństwo działa na tej samej
        zasadzie co logowanie do JSOS.
      </FooterInfo>
    </StyledSidebar>
    <ConfigurationMockup color={THEME.colors.palette.blue.light} src={img3} />
  </Box>
)

const SavePasswordStep = (props: { prevStep: () => void; onPasswordSave: (hasAgreed: boolean) => void }) => {
  const [hasAgreed, setHasAgreed] = useState(true)
  const { onPasswordSave, prevStep } = props
  return (
    <Box width="100vw" height="100vh" overflow="hidden" position="relative" display="flex">
      <StyledSidebar>
        <GoBackButton color={THEME.colors.palette.teal} count={3} onClick={prevStep} />
        <Space size={2} />
        <h2>Zapamiętaj dane logowania</h2>
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
        <Space size={2} />
        <FooterInfo color={THEME.colors.palette.teal.light}>
          Jak w przeglądarce zapisujemy dane logowania, żeby nie wpisywać ich za każdym razem. Kto chciałby wpisywać to
          samo co 5 minut? Oczywiście wszystko jest bezpieczne, dane logowania zapisywane są w tzw. bezpiecznej enklawie
          twojego systemu operacyjnego, miejsca specjalnie przeznaczonego do zapisywania haseł.
        </FooterInfo>
      </StyledSidebar>
      <ConfigurationMockup color={THEME.colors.palette.teal.light} />
    </Box>
  )
}

const CongratulationsStep = ({ onConfigurationExit }: { onConfigurationExit: () => void }) => (
  <Box width="100vw" height="100vh" overflow="hidden" position="relative" display="flex">
    <StyledSidebar style={{ minWidth: 425, maxWidth: 500, width: '50%' }}>
      <Text fontWeight="bold" size={2}>
        Wszystko gotowe!
        <span role="img" aria-label="gwiazdki">
          ✨
        </span>
      </Text>
      <Text size="16px" color="#2B2B2B">
        Garśc informacji od twórców:
      </Text>
      <Space size={5.5} />
      <Text fontWeight={700} size="20px">
        <span role="img" aria-label="kawa">
          ☕️
        </span>
        Aplikacja jest w trakcie rozwoju
      </Text>
      <Text>
        ...więc mogą pojawić się błędy. Jesteśmy tylko studentami, a aplikację tworzymy po godzinach nauki i pracy. Poza
        tym - walka z systemami politechniki to nie lada wyzwanie{' '}
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
        <Link url="https://github.com/knnativeflow/zdalnie-na-pwr">naszego GitHuba</Link> i dodania czegoś od siebie.
      </Text>
      <Space size={2} />
      <Space size={5} />
      <Button
        color={THEME.colors.palette.pink.main}
        variant="primary"
        glow
        onClick={onConfigurationExit}
        style={{ alignSelf: 'center' }}
      >
        Przejdź do aplikacji
      </Button>
    </StyledSidebar>
    <ConfigurationMockup color={THEME.colors.palette.pink.light} src={img4} isSummary />
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
    const courses = await jsosExtractor.fetchCourseList()
    dispatch(addCourses(courses))

    const iCalendarString = await jsosExtractor.downloadCalendar()
    const events = iCalendar.getEventsFromString(iCalendarString)

    const eventsWithCode = events.map((event) => {
      const courseEvent = courses.find((course) => course.name.startsWith(event.name) && course.type === event.type)

      if (courseEvent) {
        return { ...event, code: courseEvent.classesCode, name: courseEvent.name }
      }

      return event
    })

    dispatch(addEvents(eventsWithCode))

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

  const handleSavePassword = async (hasAgreed: boolean) => {
    if (hasAgreed) {
      await PasswordManager.saveJsosCredentials(jsosDataLogin.login, jsosDataLogin.password)
      await PasswordManager.saveSmailCredentials(mailDataLogin.login, mailDataLogin.password)
    }
    goToNextStep()
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
  }

  return [
    <StartStep key={0} nextStep={goToNextStep} />,
    <JsosStep
      key={1}
      onSubmit={handleJsosLogin}
      fields={jsosFields}
      prevStep={goToPrevStep}
      validationSchema={jsosValidationSchema}
    />,
    <MailStep
      key={2}
      onSubmit={handleMailLogin}
      fields={mailFields}
      prevStep={goToPrevStep}
      validationSchema={mailValidationSchema}
    />,
    <SavePasswordStep key={3} onPasswordSave={handleSavePassword} prevStep={goToPrevStep} />,
    <CongratulationsStep key={4} onConfigurationExit={handleExitConfiguration} />,
  ][activeStepIndex]
}

export default ConfigurationPage
