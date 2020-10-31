import { styled, Theme } from '@material-ui/core/styles'
import { ButtonBase, ButtonBaseProps } from '@material-ui/core'
import { Palette } from '@material-ui/core/styles/createPalette'

export type Props = {
  btnColor: ((palette: Palette) => string) | string
  theme: Theme
  fullWidth?: boolean
  primary?: boolean
  shadow?: boolean
  glow?: boolean
  compact?: boolean
} & ButtonBaseProps

const StyledButton = styled(ButtonBase)(({ theme, ...props }: Props) => {
  const bgColor = typeof props.btnColor === 'function' ? props.btnColor(theme.palette) : props.btnColor
  return {
    border: 0,
    borderRadius: theme.shape.borderRadius,
    padding: theme.spacing(2),
    fontWeight: 900,
    cursor: 'pointer',
    backgroundColor: bgColor + 40,
    color: bgColor,
    transition: 'transform 0.2s ease',

    '&:hover': {
      transform: 'scale(0.95)',
    },

    '&:focus': {
      outline: `2px solid ${bgColor}40`,
    },

    ...(props.primary && {
      backgroundColor: bgColor,
      color: theme.palette.common.white,
    }),

    ...(props.fullWidth && {
      width: '100%',
    }),

    ...(props.shadow && {
      boxShadow: '0 4px 18px #00000040',
    }),

    ...(props.glow && {
      boxShadow: `0 4px 18px ${bgColor}40`,
    }),

    ...(props.disabled && {
      opacity: 0.5,
    }),

    ...(props.compact && {
      padding: theme.spacing(1),
      fontSize: '0.85em',
    }),
  }
})

export default StyledButton

type CircleProps = {
  theme: Theme
  color: ((palette: Palette) => string) | string
}

export const BackgroundCircle = styled('div')(({ theme, ...props }: CircleProps) => {
  const color = typeof props.color === 'function' ? props.color(theme.palette) : props.color
  return {
    borderRadius: '50%',
    width: '130vmax',
    height: '130vmax',
    right: '-70vmax',
    bottom: '-35vmax',
    background: color,
    position: 'absolute',
    zIndex: -100,
  }
})
