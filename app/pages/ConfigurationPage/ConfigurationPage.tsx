import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { Stepper, Step, StepLabel, Paper, Typography, Button } from '@material-ui/core'

import studentMail from 'features/studentMail'
import { jsosAuth, jsosExtractor } from 'features/jsos'
import iCalendar from 'features/iCalendar'
import { addEvents, addZoomLinks } from 'actions/events'
import { addCourses, addTeamsLinks } from 'actions/courses'
import { updateUser } from 'actions/user'
import routes from 'constants/routes.json'
import LoginForm from 'components/LoginForm'
import styles from './ConfigurationPage.scss'

const JsosStep = ({ handleSubmit }: { handleSubmit: (login: string, password: string) => Promise<void> }) => (
  <Paper elevation={3} className={styles.paper}>
    <div className={styles.column}>
      <Typography variant="h6">JSOS</Typography>
      <LoginForm
        loginInput={{ label: 'Login', placeholder: 'pwr123456' }}
        passwordInput={{ label: 'Password', placeholder: 'Twoje hasło do JSOS' }}
        onSubmit={handleSubmit}
      />
    </div>
    <div className={styles.column}>
      <Typography variant="body1">
        Logowanie do JSOS wymagane jest do pobrania listy kursów oraz zajęć, na które uczęszczasz. Aktualnie to jedyne
        informacje pobierane przez aplikację. Cały proces wykonywany jest w aplikacji, więc nie musisz się martwić o
        wyciek twoich danych logowania. Działa to na podobnej zasadzie jak przeglądarka ze stroną JSOS, ale to aplikacja
        symuluje ruchy użytkownika.
      </Typography>
    </div>
  </Paper>
)

const MailStep = ({ handleSubmit }: { handleSubmit: (login: string, password: string) => Promise<void> }) => (
  <Paper elevation={3} className={styles.paper}>
    <div className={styles.column}>
      <Typography variant="h6">Poczta studencka</Typography>
      <LoginForm
        loginInput={{ label: 'Login', placeholder: '123456' }}
        passwordInput={{ label: 'Password', placeholder: 'Twoje hasło do poczty studenckiej' }}
        onSubmit={handleSubmit}
      />
    </div>
    <div className={styles.column}>
      <Typography variant="body1">
        Logowanie do poczty wymagane jest do pobierania automatycznie linków do Zooma oraz linków do Teamsów. Po co
        szukać samemu linków jak może to zrobić za ciebie technologia? Działanie i bezpieczeństwo działa na tej samej
        zasadzie co logowanie do JSOS.
      </Typography>
    </div>
  </Paper>
)

const SavePasswordStep = ({ handleSavePassword }: { handleSavePassword: (hasAgreed: boolean) => void }) => (
  <Paper elevation={3} className={styles.paper}>
    <div className={styles.column}>
      <Typography variant="h6">Zapisz hasło na przyszłość</Typography>
      <Typography variant="body1">
        Dane logowania, które wprowadziliście wcześniej możemy zapisać u was na komputrze, podobnie jak robi to
        przeglądarka. Pozwoli to na automatyczne odświeżanie danych. Głównie dotyczy to linków do Zooma przysyłanych na
        pocztę studencką. Dane są zapisywane w tzw. bezpiecznej enklawie, czyli miejscu stworzonym przez twórców
        systemów operacyjnych właśnie dla wrażliwych danych jakimi są dane logowania.
      </Typography>
      <Typography variant="body1">
        Oczywiście możecie nie wyrazić zgody na zapisanie haseł. Musicie się jedynie liczyć, że przed każdym pobraniem
        danych będziecie musieli wprowadzać na nowo dane logowania.
      </Typography>
      <div className={styles.buttonActions}>
        <Button color="primary" variant="outlined" onClick={() => handleSavePassword(false)}>
          Nie wyrażam zgody
        </Button>
        <Button color="primary" variant="contained" onClick={() => handleSavePassword(true)}>
          Wyrażam zgodę
        </Button>
      </div>
    </div>
  </Paper>
)

const CongratulationsStep = () => (
  <Paper elevation={3} className={styles.paper}>
    <div className={styles.column}>
      <Typography variant="h6">Udało się, wszystko gotowe!</Typography>
      <Typography variant="body1">Teraz możesz już korzystać z aplikacji.</Typography>
      <div className={styles.buttonActions}>
        <Button color="primary" variant="outlined" component={Link} to={routes.CALENDAR}>
          Przejdź do aplikacji
        </Button>
      </div>
    </div>
  </Paper>
)

const STEPS = ['JSOS', 'Poczta studencka', 'Zapisanie haseł', 'Koniec']

const ConfigurationPage = () => {
  const [activeStepIndex, setActiveStepIndex] = useState(0)
  const [jsosDataLogin, setJsosDataLogin] = useState({ login: '', password: '' })
  const [mailDataLogin, setMailDataLogin] = useState({ login: '', password: '' })
  const dispatch = useDispatch()

  const goToNextStep = () => setActiveStepIndex(activeStepIndex + 1)

  const handleJsosLogin = async (login: string, password: string): Promise<void> => {
    await jsosAuth.signIn(login, password)

    setJsosDataLogin({ login, password })
    const iCalendarString = await jsosExtractor.downloadCalendar()
    const courses = await jsosExtractor.fetchCourseList()
    const events = iCalendar.getEventsFromString(iCalendarString)

    // TODO: remove after done task
    const temp = [
      ...courses,
      {
        name: 'Matematyka dyskretna',
        type: 'C',
        start: 'Poniedziałek 9:15',
        end: 'Poniedziałek 11:00',
        lecturer: 'Prof. dr hab. inż. Jerzy Józefczyk',
        courseCode: 'INZ001819W',
        classesCode: 'Z02-13b',
        inWeeks: '',
        hoursInSemester: '30',
        ECTSes: '3',
        platforms: {},
        additional: {},
      },
    ]

    dispatch(addEvents(events))
    dispatch(addCourses(temp))

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

  return (
    <div className={styles.root}>
      <Stepper activeStep={activeStepIndex} alternativeLabel>
        {STEPS.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      {activeStepIndex === 0 && <JsosStep handleSubmit={handleJsosLogin} />}
      {activeStepIndex === 1 && <MailStep handleSubmit={handleMailLogin} />}
      {activeStepIndex === 2 && <SavePasswordStep handleSavePassword={handleSavePassword} />}
      {activeStepIndex === 3 && <CongratulationsStep />}
    </div>
  )
}

export default ConfigurationPage
