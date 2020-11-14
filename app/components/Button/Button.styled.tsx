import styled from '@emotion/styled'
import { parseSize, THEME } from 'base/theme/theme'
import { css } from '@emotion/core'

export type Props = {
  btnColor: string
  fullWidth?: boolean
  variant?: 'primary' | 'transparent' | 'outlined'
  shadow?: boolean
  glow?: boolean
  compact?: boolean
  even?: boolean
  align?: 'center' | 'left' | 'right' | 'justify'
} & React.ComponentProps<'button'>

const withSpacing = (fun: (props: { spacing: number } & Props) => any) => (props: Props) => {
  return fun({ ...props, spacing: props.compact ? 0.5 : 1 })
}

const StyledButton = styled.button<Props>`
  -webkit-appearance: none;
  position: relative;
  overflow: hidden;
  border: 0;
  border-radius: ${THEME.borderRadius.md};
  padding-top: ${withSpacing(({ spacing }) => parseSize(spacing * 0.75))};
  padding-bottom: ${withSpacing(({ spacing }) => parseSize(spacing * 0.75))};
  padding-left: ${withSpacing(({ spacing }) => parseSize(spacing * 1.5))};
  padding-right: ${withSpacing(({ spacing }) => parseSize(spacing * 1.5))};
  font-weight: 600;
  cursor: pointer;
  background-color: ${({ btnColor }) => `${btnColor}20`};
  color: ${({ btnColor }) => btnColor};
  transition: opacity 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  user-select: none;
  outline: none;
  text-align: ${({ align }) => align};

  &:hover {
    opacity: 0.65;
  }

  &:focus-visible {
    outline: ${({ btnColor }) => `3px solid ${btnColor}40`};
  }
  &::before {
    content: '';
    display: block;
    position: absolute;
    width: 100%;
    height: 100%;
    background: currentColor;
    opacity: 0;
    left: 0;
    top: 0;
    transition: clip-path 0.4s ease, opacity 0.4s ease;
    clip-path: circle(0 at center);
    pointer-events: none;
  }
  &:active::before {
    clip-path: circle(100% at center);
    opacity: 0.3;
  }

  ${({ variant, btnColor }) =>
    variant === 'primary' &&
    css`
      border: 1px solid ${btnColor};
      background-color: ${btnColor};
      color: ${THEME.colors.light};
    `}

  ${({ variant, btnColor }) =>
    variant === 'outlined' &&
    css`
      background: none;
      border: 1px solid ${btnColor};
      color: ${btnColor};
    `}

  ${({ variant }) =>
    variant === 'transparent' &&
    css`
      background-color: transparent;
    `}

  ${({ fullWidth }) =>
    fullWidth &&
    css`
      width: 100%;
    `}

  ${({ shadow }) =>
    shadow &&
    css`
      box-shadow: 0 4px 18px #00000040;
    `}

  ${({ glow, btnColor }) =>
    glow &&
    css`
      box-shadow: 0 4px 18px ${btnColor}40;
    `}

  ${({ disabled }) =>
    disabled &&
    css`
      opacity: 0.35;
      pointer-events: none;
    `}

  ${({ compact }) =>
    compact &&
    css`
      font-size: 0.85em;
      border-radius: ${THEME.borderRadius.sm};
    `}

  ${withSpacing(
    ({ even, spacing }) =>
      even &&
      css`
        padding-left: ${parseSize(spacing * 0.75)};
        padding-right: ${parseSize(spacing * 0.75)};
      `
  )}
`

export default StyledButton
