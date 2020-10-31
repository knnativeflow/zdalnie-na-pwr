/* eslint-disable react/jsx-props-no-spreading */
import React from 'react'
import { Palette } from '@material-ui/core/styles/createPalette'
import { InputBaseProps } from '@material-ui/core'
import StyledInput, { StyledInputLabel } from './Input.styled'

export type Props = {
  children: React.ReactNode
  textColor: ((palette: Palette) => string) | string
  bgColor?: ((palette: Palette) => string) | string
  maxWidth?: string | number
} & InputBaseProps

const Input = (props: Props) => {
  const { children, textColor, ...rest } = props
  return (
    <StyledInput
      textColor={textColor}
      placeholder=" "
      endAdornment={<StyledInputLabel>{children}</StyledInputLabel>}
      {...rest}
    />
  )
}

export default Input
