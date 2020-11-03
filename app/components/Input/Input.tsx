/* eslint-disable react/jsx-props-no-spreading */
import React, { forwardRef, useState } from 'react'
import { FaEye, FaEyeSlash } from 'react-icons/all'
import Button from 'components/Button'
import Space from 'components/Space'
import StyledInput, { StyledInputContainer, StyledInputLabel } from './Input.styled'

export type Props = {
  textColor: string
  bgColor?: string
  maxWidth?: string | number
  placeholder?: string
  error?: string
} & React.ComponentProps<'input'>

// eslint-disable-next-line react/display-name
const Input = forwardRef((props: Props, ref: React.Ref<HTMLInputElement>) => {
  const { placeholder, textColor, bgColor, maxWidth, disabled, error, ...rest } = props
  const [isPasswordShown, setPasswordShown] = useState(rest.type !== 'password')
  const type = rest.type === 'password' && isPasswordShown ? 'text' : rest.type

  // TODO: add handle error
  return (
    <StyledInputContainer {...{ textColor, bgColor, maxWidth, disabled }}>
      <StyledInput onBlur={() => setPasswordShown(false)} placeholder=" " {...rest} type={type} ref={ref} />
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
})

export default Input
