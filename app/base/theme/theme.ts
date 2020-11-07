import { createMuiTheme } from '@material-ui/core'

export const parseSize = (size: string | number) => (typeof size === 'number' ? `${size}em` : size)

export const THEME = {
  borderRadius: {
    sm: '8px',
    md: '12px',
    lg: '16px',
  },
  spacing: 4,
  colors: {
    error: '#FF487F',
    light: '#FFFFFF',
    mid: '#888888',
    dark: '#000000',
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
      ePortal: '#de6c04',
    },
    palette: {
      pink: {
        light: '#EA95FF',
        main: '#FF4AF8',
        dark: '#FF4AF8',
      },
      purple: {
        light: '#C5BEDD',
        main: '#8860FF',
        dark: '#564E6A',
      },
      blue: {
        light: '#AFBDD2',
        main: '#3693FF',
        dark: '#647287',
      },
      teal: {
        light: '#98C3C1',
        main: '#47CAB2',
        dark: '#496C6A',
      },
    },
  },
}

const muiTheme = createMuiTheme({
  palette: {
    primary: {
      main: '#ae00ff',
    },
    error: {
      main: '#FF487F',
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
  shape: {
    borderRadius: 8,
  },
})

export default muiTheme
