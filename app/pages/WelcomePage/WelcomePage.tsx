import React from 'react'
import { Link } from 'react-router-dom'
import { Button, Typography } from '@material-ui/core'

import routes from 'constants/routes.json'
import styles from './WelcomePage.scss'

const WelcomePage = () => {
  return (
    <div className={styles.root}>
      <h1>Zdalnie na PWr 0.0.4</h1>
      <Typography variant="body1" className={styles.text}>
        Witaj w aplikacji, która mamy nadzieje pomoże ci podczas nauki zdalniej na polibudzie. Nie dajmy się uczelni i
        razem ogarnijmy wszechobecny chaos przez tą elitarną uczelnię...
      </Typography>
      <Typography variant="body1" className={styles.text}>
        W opisie: przywitanie, czym jest aplikacja, najpierw musisz przejść konfiguracje, więcej informacji na stronie
      </Typography>
      <Button variant="contained" color="primary" component={Link} to={routes.FIRST_CONFIGURATION}>
        Przejdź do konfiguracji
      </Button>
    </div>
  )
}

export default WelcomePage
