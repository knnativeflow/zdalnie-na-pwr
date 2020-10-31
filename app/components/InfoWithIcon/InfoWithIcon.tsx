import React from 'react'
import { SvgIconTypeMap } from '@material-ui/core'
import { OverridableComponent } from '@material-ui/core/OverridableComponent'
import styled from '@emotion/styled'
import { css } from '@emotion/core'

interface InfoProps {
  icon: OverridableComponent<SvgIconTypeMap<unknown, 'svg'>>
  title: string
  children: React.ReactNode
  color?: string
  onClick?: () => void
}

const InfoWithIconWrapper = styled.div<{ as: 'button' | 'div'; color: string }>`
  display: flex;
  justify-content: left;
  text-align: left;
  border: none;
  border-radius: 8px;
  padding: 4px;
  width: 100%;

  ${({ as, color }) =>
    as === 'button' &&
    css`
      background: ${color}20;
    `}
`

const IconWrapper = styled.div<{ color?: string }>`
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

const InfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
`

const InfoLabel = styled.p`
  font-size: 10px;
  font-weight: 700;
  margin: 0;
  margin-bottom: 2px;
`

const InfoText = styled.p`
  margin: 0;
  font-size: 13px;
  line-height: 1;
`

const InfoWithIcon = ({ icon: Icon, title, children, color, onClick }: InfoProps) => {
  const WrapperComp = onClick ? 'button' : 'div'

  return (
    <InfoWithIconWrapper onClick={onClick} as={WrapperComp} color={color}>
      <IconWrapper color={color}>
        <Icon fontSize="small" />
      </IconWrapper>
      <InfoWrapper>
        <InfoLabel>{title}</InfoLabel>
        <InfoText>{children}</InfoText>
      </InfoWrapper>
    </InfoWithIconWrapper>
  )
}

InfoWithIcon.defaultProps = {
  color: '#888888',
}

export default InfoWithIcon
