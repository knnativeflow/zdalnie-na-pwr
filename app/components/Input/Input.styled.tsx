import { styled, Theme } from '@material-ui/core/styles'
import { InputBase, InputBaseProps } from '@material-ui/core'
import { getPaletteColor, PaletteOrString } from 'utils/theme'

export type Props = {
  theme: Theme
  textColor: PaletteOrString
  bgColor?: PaletteOrString
  maxWidth?: string | number
} & InputBaseProps

const StyledInput = styled(InputBase)(({ theme, ...props }: Props) => {
  const textColor = getPaletteColor(theme.palette)(props.textColor)
  const bgColor = props.bgColor ? getPaletteColor(theme.palette)(props.bgColor) : textColor + 20
  return {
    border: 0,
    borderRadius: 8,
    paddingLeft: theme.spacing(3),
    paddingRight: theme.spacing(3),
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
    backgroundColor: bgColor,
    color: textColor,
    maxWidth: props.maxWidth,
    transition: 'box-shadow 0.2s ease',
    boxShadow: `0 0 0 1px transparent, 0 0 0 1px transparent inset`,
    width: '100%',

    '& input': {
      outline: 'none',
    },

    '&:focus-within': {
      boxShadow: `0 0 0 1px ${textColor}, 0 0 0 1px ${textColor} inset`,
    },

    ...(props.disabled && {
      opacity: 0.5,
    }),
  }
})

export default StyledInput

export const StyledInputLabel = styled('span')(({ theme }) => ({
  position: 'absolute',
  left: theme.spacing(3),
  top: '50%',
  transform: 'translateY(-50%)',
  transition: 'opacity 0.1s ease',
  pointerEvents: 'none',

  ':not(:placeholder-shown) + &': {
    opacity: 0,
  },
}))
