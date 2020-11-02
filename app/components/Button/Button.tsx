/* eslint-disable react/jsx-props-no-spreading */
import React from 'react'
import { ButtonBaseProps } from '@material-ui/core'
import { THEME } from 'base/theme/theme'
import StyledButton from './Button.styled'

export type Props = {
  color?: string
  fullWidth?: boolean
  variant?: 'primary' | 'transparent'
  shadow?: boolean
  glow?: boolean
  compact?: boolean
  even?: boolean
  align?: 'center' | 'left' | 'right' | 'justify'
} & Omit<ButtonBaseProps, 'color'>

const Button = (props: Props) => {
  const { children, color = THEME.colors.mid, ...rest } = props
  return (
    <StyledButton btnColor={color} {...rest}>
      {children}
    </StyledButton>
  )
}

Button.defaultProps = {
  color: THEME.colors.mid,
  fullWidth: false,
  variant: undefined,
  shadow: false,
  glow: false,
  compact: false,
  even: false,
  align: 'center',
  type: 'button',
}

export default Button
