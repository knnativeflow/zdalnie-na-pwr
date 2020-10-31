import { styled, Theme } from '@material-ui/core/styles'

const TITLE_BAR_HEIGHT = '2rem'

export const StyledTitleBarButtonContainer = styled('div')({
  height: '100%',
  marginLeft: 'auto',
  display: 'flex',
})

export const StyledTitleBarButton = styled('button')({
  height: '100%',
  width: '2rem',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
  border: 0,
  background: 'transparent',
  color: 'inherit',
  outline: 'none',
  '-webkit-app-region': 'no-drag',

  '&:hover': {
    background: '#0001',
  },
  '&:active': {
    background: '#0002',
  },
})

export const StyledTitleBarName = styled('div')({
  display: 'flex',
  alignItems: 'center',
  height: '100%',
  padding: '0 0.5em',
  pointerEvents: 'none',
  opacity: 0.75,
})

type StyledTitleBarProps = {
  light: boolean
  theme: Theme
}

const StyledTitleBar = styled('div')(({ theme, light }: StyledTitleBarProps) => ({
  position: 'absolute',
  left: 0,
  top: 0,
  width: '100%',
  height: TITLE_BAR_HEIGHT,
  display: 'flex',
  alignItems: 'center',
  '-webkit-app-region': 'drag',
  zIndex: 10000,
  color: light ? theme.palette.common.white : theme.palette.common.black,
}))

export default StyledTitleBar
