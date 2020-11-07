import React from 'react'
import { IconType } from 'react-icons'
import { THEME } from 'base/theme/theme'
import styled from '@emotion/styled'
import { css } from '@emotion/core'

interface InfoProps {
  icon: IconType
  title?: string
  children: React.ReactNode
  color?: string
  onClick?: () => void
  asDisabledButton?: boolean
}

const InfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
`

const InfoWithIconWrapper = styled.div<{ as: 'button' | 'div'; color?: string; asDisabledButton?: boolean }>`
  display: flex;
  justify-content: left;
  text-align: left;
  border: none;
  border-radius: 8px;
  padding: 4px;
  width: 100%;

  ${({ asDisabledButton, color }) =>
    asDisabledButton &&
    css`
      background: ${color}20;
    `}

  ${({ as, color }) =>
    as === 'button' &&
    css`
      background: ${color}20;
      cursor: pointer;
      transition: opacity 0.1s ease-in-out;
      &:hover {
        opacity: 0.8;
      }
      ${InfoWrapper} {
        margin: auto 0;
      }
    `}
`

const IconWrapper = styled.div<{ color: string }>`
  margin-right: 10px;
  border-radius: 8px;
  width: 35px;
  height: 35px;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${({ color }) => `${color}40`};
  color: ${({ color }) => color};
`

const InfoLabel = styled.p`
  font-size: 10px;
  font-weight: 700;
  margin: 0 0 2px;
`

const InfoText = styled.p`
  margin: 0;
  font-size: 13px;
  line-height: 1;
`

const InfoWithIcon = ({
  icon: Icon,
  title,
  children,
  color = THEME.colors.mid,
  onClick,
  asDisabledButton,
}: InfoProps) => {
  const WrapperComp = onClick ? 'button' : 'div'

  return (
    <InfoWithIconWrapper onClick={onClick} as={WrapperComp} color={color} asDisabledButton={asDisabledButton}>
      <IconWrapper color={color}>
        <Icon fontSize="small" />
      </IconWrapper>
      <InfoWrapper>
        {title && <InfoLabel>{title}</InfoLabel>}
        <InfoText>{children}</InfoText>
      </InfoWrapper>
    </InfoWithIconWrapper>
  )
}

export default InfoWithIcon
