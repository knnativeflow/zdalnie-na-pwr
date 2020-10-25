import { createMuiTheme } from '@material-ui/core'

const theme = createMuiTheme({
  palette: {
    primary: {
      // main: '#70f',
      main: '#ae00ff',
    },
    secondary: {
      main: '#999',
    },
  },
  typography: {
    subtitle1: {
      fontSize: '0.85rem',
    },
    subtitle2: {
      fontSize: '0.7rem',
    },
  },
})

export default theme

export const APP_COLORS = {
  course: {
    W: '#00a65a',
    C: '#f39c12',
    L: '#3c8dbc',
    S: '#45b6b0',
    P: '#00c0ef',
    DEFAULT: '#AAAAAA',
  },
  brand: {
    zoom: '#2D8CFF',
    teams: '#464EB8',
    ePortal: '#FA7F0E',
  },
}
