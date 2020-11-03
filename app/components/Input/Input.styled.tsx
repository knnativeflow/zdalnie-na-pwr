import styled from '@emotion/styled'
import { parseSize } from 'base/theme/theme'
import { css } from '@emotion/core'

export type Props = {
  textColor: string
  bgColor?: string
  maxWidth?: string | number
  disabled?: boolean
}

export const StyledInputContainer = styled('label')<Props>`
  position: relative;
  border: 0;
  border-radius: 8px;
  background-color: ${({ bgColor, textColor }) => bgColor || `${textColor}20`};
  color: ${({ textColor }) => textColor};
  max-width: ${({ maxWidth }) => maxWidth};
  transition: box-shadow 0.2s ease;
  box-shadow: 0 0 0 2px transparent inset;
  width: 100%;
  font-size: 0.85em;
  display: flex;
  align-items: center;

  &:focus-within {
    box-shadow: ${({ textColor }) => `0 0 0 2px ${textColor}60 inset`};
  }

  ${({ disabled }) =>
    disabled &&
    css`
      opacity: 0.75;
      pointer-events: none;
    `}
`

const StyledInput = styled.input`
  -webkit-appearance: none;
  height: auto;
  width: 100%;
  flex-grow: 1;
  background: transparent;
  color: inherit;
  padding-left: ${parseSize(1.5)};
  padding-right: ${parseSize(1.5)};
  padding-top: ${parseSize(1)};
  padding-bottom: ${parseSize(1)};
  border: 0;
  outline: none;
  font-weight: bold;
`

export default StyledInput

export const StyledInputLabel = styled.span`
  position: absolute;
  left: ${parseSize(1.5)};
  top: 50%;
  transform: translateY(-50%);
  transition: opacity 0.1s ease;
  pointer-events: none;
  opacity: 0.75;

  ${StyledInput}:not(:placeholder-shown) + & {
    opacity: 0;
  }
`
