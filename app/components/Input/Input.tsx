/* eslint-disable react/jsx-props-no-spreading */
import React from 'react'
import { InputBaseProps } from '@material-ui/core'
import { PaletteOrString } from 'utils/theme'
import StyledInput, { StyledInputLabel } from './Input.styled'

export type Props = {
  children: React.ReactNode
  textColor: PaletteOrString
  bgColor?: PaletteOrString
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
