import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Box, styled, Theme } from '@material-ui/core'

import studentMail from 'features/studentMail'
import { jsosAuth, jsosExtractor } from 'features/jsos'
import iCalendar from 'features/iCalendar'
import { addEvents, addZoomLinks } from 'actions/events'
import { addCourses, addTeamsLinks } from 'actions/courses'
import { updateUser } from 'actions/user'
import LoginForm from 'components/LoginForm'
import Button from 'components/Button'
import { BackgroundCircle } from 'components/Button/Button.styled'
import { APP_COLORS } from 'base/theme/theme'
import { FaChevronLeft } from 'react-icons/all'
import Text from 'components/Text'
import Space from 'components/Space'
import mockup from '../../../resources/images/stepper-mockup-1.png'

type FeatureProps = {
  src: string
  theme: Theme
}

const StepperFeature = styled('div')((props: FeatureProps) => ({
  backgroundImage: `url(${props.src})`,
  height: '90%',
  flex: 1,
  backgroundSize: 'auto 100%',
  backgroundRepeat: 'no-repeat',
  margin: 'auto',
}))

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
    <BackgroundCircle color="#EA95FF" />
    <StepperFeature src={mockup} />
  </Box>
)

type LoginProps = {
  handleSubmit: (login: string, password: string) => Promise<void>
}

const JsosStep = ({ handleSubmit, prevStep }: LoginProps & { prevStep: () => void }) => (
  <Box width="100vw" height="100vh" overflow="hidden" position="relative" display="flex">
    <StyledSidebar>
      <Box display="flex" alignItems="center">
        <Button color={APP_COLORS.purple.main} compact onClick={prevStep}>
          <FaChevronLeft />
        </Button>
        <Space size={0.5} horizontal />
        <Text fontWeight="bold" color={APP_COLORS.purple.light} size={0.9}>
          Krok 1 z 3
        </Text>
      </Box>
      <Space size={2} />
      <h2>Zaloguj się do JSOS</h2>
      <Space size={2} />
      <LoginForm onSubmit={handleSubmit} color={APP_COLORS.purple} />
      <Space size={2} />
      <Text color={APP_COLORS.purple.light} size={0.75}>
        Aktualnie jedyną informacją pobieraną z JSOS jest siatka zajęć. Cały proces wykonywany jest wewnątrz aplikacji i
        nie różni się od logowania przez przeglądarkę.
      </Text>
    </StyledSidebar>
    <BackgroundCircle color={APP_COLORS.purple.light} />
    <StepperFeature src={mockup} />
  </Box>
)

const MailStep = ({ handleSubmit, prevStep }: LoginProps & { prevStep: () => void }) => (
  <Box width="100vw" height="100vh" overflow="hidden" position="relative" display="flex">
    <StyledSidebar>
      <Box display="flex" alignItems="center">
        <Button color={APP_COLORS.blue.main} compact onClick={prevStep}>
          <FaChevronLeft />
        </Button>
        <Space size={0.5} horizontal />
        <Text fontWeight="bold" color={APP_COLORS.blue.light} size={0.9}>
          Krok 2 z 3
        </Text>
      </Box>
      <Space size={2} />
      <h2>Zaloguj się do poczty studenckiej</h2>
      <Space size={2} />
      <LoginForm onSubmit={handleSubmit} color={APP_COLORS.blue} />
      <Space size={2} />
      <Text color={APP_COLORS.blue.light} size={0.75}>
        Logowanie do poczty wymagane jest do pobierania automatycznie linków do Zooma oraz linków do Teamsów. Po co
        szukać samemu linków jak może to zrobić za ciebie technologia? Działanie i bezpieczeństwo działa na tej samej
        zasadzie co logowanie do JSOS.
      </Text>
    </StyledSidebar>
    <BackgroundCircle color={APP_COLORS.blue.light} />
    <StepperFeature src={mockup} />
  </Box>
)

//
// const SavePasswordStep = ({ handleSavePassword }: { handleSavePassword: (hasAgreed: boolean) => void }) => (
//   <Paper elevation={3}>
//     <div>
//       <Typography variant="h6">Zapisz hasło na przyszłość</Typography>
//       <Typography variant="body1">
//         Dane logowania, które wprowadziliście wcześniej możemy zapisać u was na komputrze, podobnie jak robi to
//         przeglądarka. Pozwoli to na automatyczne odświeżanie danych. Głównie dotyczy to linków do Zooma przysyłanych na
//         pocztę studencką. Dane są zapisywane w tzw. bezpiecznej enklawie, czyli miejscu stworzonym przez twórców
//         systemów operacyjnych właśnie dla wrażliwych danych jakimi są dane logowania.
//       </Typography>
//       <Typography variant="body1">
//         Oczywiście możecie nie wyrazić zgody na zapisanie haseł. Musicie się jedynie liczyć, że przed każdym pobraniem
//         danych będziecie musieli wprowadzać na nowo dane logowania.
//       </Typography>
//       <div>
//         <Button color="primary" variant="outlined" onClick={() => handleSavePassword(false)}>
//           Nie wyrażam zgody
//         </Button>
//         <Button color="primary" variant="contained" onClick={() => handleSavePassword(true)}>
//           Wyrażam zgodę
//         </Button>
//       </div>
//     </div>
//   </Paper>
// )
//
// const CongratulationsStep = () => (
//   <Paper elevation={3}>
//     <div>
//       <Typography variant="h6">Udało się, wszystko gotowe!</Typography>
//       <Typography variant="body1">Teraz możesz już korzystać z aplikacji.</Typography>
//       <div>
//         <Button color="primary" variant="outlined" component={Link} to={routes.CALENDAR}>
//           Przejdź do aplikacji
//         </Button>
//       </div>
//     </div>
//   </Paper>
// )

// const STEPS = ['JSOS', 'Poczta studencka', 'Zapisanie haseł', 'Koniec']

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

    dispatch(updateUser({ configured: true }))

    // TODO: add save password

    goToNextStep()
  }
  return [
    <StartStep key={0} nextStep={goToNextStep} />,
    <JsosStep key={1} handleSubmit={handleJsosLogin} prevStep={goToPrevStep} />,
    <MailStep key={2} handleSubmit={handleMailLogin} prevStep={goToPrevStep} />,
    // <SavePasswordStep key={3} handleSavePassword={handleSavePassword} />,
    // <CongratulationsStep key={4} />,
  ][activeStepIndex]
}

export default ConfigurationPage
