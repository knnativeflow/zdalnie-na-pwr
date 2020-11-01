import { styled, Theme } from '@material-ui/core/styles'
import { ButtonBase, ButtonBaseProps } from '@material-ui/core'
import { getPaletteColor, PaletteOrString } from 'utils/theme'

export type Props = {
  btnColor: PaletteOrString
  theme: Theme
  fullWidth?: boolean
  primary?: boolean
  shadow?: boolean
  glow?: boolean
  compact?: boolean
  even?: boolean
} & ButtonBaseProps

const StyledButton = styled(ButtonBase)(({ theme, ...props }: Props) => {
  const bgColor = getPaletteColor(theme.palette)(props.btnColor)
  const spacing = props.compact ? 1 : 2
  return {
    border: 0,
    borderRadius: theme.shape.borderRadius,
    paddingTop: theme.spacing(spacing),
    paddingBottom: theme.spacing(spacing),
    paddingLeft: theme.spacing(spacing * 2),
    paddingRight: theme.spacing(spacing * 2),
    fontWeight: 700,
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
      fontSize: '0.85em',
      borderRadius: (theme.shape.borderRadius * 2) / 3,
    }),

    ...(props.even && {
      paddingLeft: theme.spacing(spacing),
      paddingRight: theme.spacing(spacing),
    }),
  }
})

export default StyledButton
