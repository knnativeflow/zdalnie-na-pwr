/* eslint-disable react/jsx-props-no-spreading */
import React, { forwardRef, useEffect, useState } from 'react'
import { FaEye, FaEyeSlash } from 'react-icons/all'
import styled from '@emotion/styled'
import { keyframes } from '@emotion/core'
import Button from 'components/Button'
import Space from 'components/Space'
import StyledInput, { StyledInputContainer, StyledInputLabel } from './Input.styled'

const showAnim = keyframes`
  0% { height: 0; opacity: 0; }
  100% { height: 11px; opacity: 1; }
`

const ErrorMsg = styled.p`
  margin: 0;
  font-size: 11px;
  color: #ff487f;
  animation: ${showAnim} 0.1s ease-in-out;
`

export type Props = {
  textColor: string
  bgColor?: string
  maxWidth?: string | number
  placeholder?: string
  error?: string
} & React.ComponentProps<'input'>

const Input = forwardRef(
  (
    { placeholder, textColor, bgColor, maxWidth, disabled, error, ...rest }: Props,
    ref: React.Ref<HTMLInputElement>
  ) => {
    const [isPasswordShown, setPasswordShown] = useState(rest.type !== 'password')
    const type = rest.type === 'password' && isPasswordShown ? 'text' : rest.type

    useEffect(() => {
      if (disabled && isPasswordShown) setPasswordShown(false)
    }, [disabled, isPasswordShown])

    return (
      <>
        <StyledInputContainer {...{ textColor, bgColor, maxWidth, disabled }}>
          <StyledInput onBlur={() => setPasswordShown(false)} placeholder=" " {...rest} type={type} ref={ref} />
          <StyledInputLabel>{placeholder}</StyledInputLabel>
          {rest.type === 'password' && (
            <>
              <Button
                color={textColor}
                onClick={() => setPasswordShown(!isPasswordShown)}
                variant="transparent"
                even
                compact
              >
                {isPasswordShown ? <FaEye size="2em" /> : <FaEyeSlash size="2em" />}
              </Button>
              <Space size={0.5} horizontal />
            </>
          )}
        </StyledInputContainer>
        {error && <ErrorMsg>{error}</ErrorMsg>}
      </>
    )
  }
)

export default Input
