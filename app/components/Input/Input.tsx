/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react'
import { FaEye, FaEyeSlash } from 'react-icons/all'
import Button from 'components/Button'
import Space from 'components/Space'
import StyledInput, { StyledInputContainer, StyledInputLabel } from './Input.styled'

export type Props = {
  textColor: string
  bgColor?: string
  maxWidth?: string | number
  placeholder?: string
} & React.ComponentProps<'input'>

const Input = (props: Props) => {
  const { placeholder, textColor, bgColor, maxWidth, disabled, ...rest } = props
  const [isPasswordShown, setPasswordShown] = useState(rest.type !== 'password')
  const type = rest.type === 'password' && isPasswordShown ? 'text' : rest.type

  return (
    <StyledInputContainer {...{ textColor, bgColor, maxWidth, disabled }}>
      <StyledInput onBlur={() => setPasswordShown(false)} placeholder=" " {...rest} type={type} />
      <StyledInputLabel>{placeholder}</StyledInputLabel>
      {rest.type === 'password' && (
        <>
          <Button
            color={textColor}
            onClick={() => setPasswordShown(!isPasswordShown)}
            even
            compact
            variant="transparent"
          >
            {isPasswordShown ? <FaEye size="2em" /> : <FaEyeSlash size="2em" />}
          </Button>
          <Space size={0.5} horizontal />
        </>
      )}
    </StyledInputContainer>
  )
}

export default Input
