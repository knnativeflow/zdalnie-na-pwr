/* eslint-disable react/jsx-props-no-spreading */
import React from 'react'
import { ButtonBaseProps } from '@material-ui/core'
import { PaletteOrString } from 'utils/theme'
import StyledButton from './Button.styled'

export type Props = {
  color: PaletteOrString
  fullWidth?: boolean
  primary?: boolean
  shadow?: boolean
  glow?: boolean
  compact?: boolean
  even?: boolean
} & Omit<ButtonBaseProps, 'color'>

const Button = (props: Props) => {
  const { children, color, ...rest } = props
  return (
    <StyledButton btnColor={color} {...rest}>
      {children}
    </StyledButton>
  )
}

Button.defaultProps = {
  fullWidth: false,
  primary: false,
  shadow: false,
  glow: false,
  compact: false,
  even: false,
}

export default Button
