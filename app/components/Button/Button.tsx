/* eslint-disable react/jsx-props-no-spreading */
import React from 'react'
import { Palette } from '@material-ui/core/styles/createPalette'
import { ButtonBaseProps } from '@material-ui/core'
import StyledButton from './Button.styled'

export type Props = {
  color: ((palette: Palette) => string) | string
  fullWidth?: boolean
  primary?: boolean
  shadow?: boolean
  glow?: boolean
  compact?: boolean
} & ButtonBaseProps

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
}

export default Button
