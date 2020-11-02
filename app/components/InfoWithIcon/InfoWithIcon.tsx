import { Box } from '@material-ui/core'
import React from 'react'
import { IconType } from 'react-icons'
import Button from 'components/Button'
import { THEME } from 'base/theme/theme'
import styled from '@emotion/styled'
import { css } from '@emotion/core'

interface InfoProps {
  icon: IconType
  title: string
  children: React.ReactNode
  color?: string
  onClick?: () => void
  asDisabledButton?: boolean
}

// const InfoWithIcon = ({ icon: Icon, title, children, color }: InfoProps) => (
//   <Box display="flex" alignItems="start" width={1}>
//     <Box bgcolor={`${color}40`} color={color} display="inline-flex" p={0.75} mr={1.5} borderRadius="borderRadius">
//       <Icon size="1.25em" />
//     </Box>
//     <Box flexGrow={1} display="flex" flexDirection="column">
//       <Text fontWeight="bold" size={0.75} color={THEME.colors.mid}>
//         {title}
//       </Text>
//       <Text size={0.85} fontWeight="normal">
//         {children}
//       </Text>
//     </Box>
//   </Box>
// )

// InfoWithIcon.defaultProps = {
//   color: THEME.colors.mid,
// }

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

const InfoWithIcon = ({ icon: Icon, title, children, color, onClick, asDisabledButton }: InfoProps) => {
  const WrapperComp = onClick ? 'button' : 'div'

  return (
    <InfoWithIconWrapper onClick={onClick} as={WrapperComp} color={color} asDisabledButton={asDisabledButton}>
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

type ButtonProps = InfoProps & {
  disabled?: boolean
}

export const ButtonInfoWithIcon = (props: ButtonProps) => {
  const { onClick, icon, title, children, disabled, color = THEME.colors.mid } = props
  return (
    <Button even {...{ onClick, color, disabled }} fullWidth compact align="left">
      <InfoWithIcon {...{ icon, title, color }}>
        <Box fontSize="subtitle2.fontSize" component="span">
          {children}
        </Box>
      </InfoWithIcon>
    </Button>
  )
}

ButtonInfoWithIcon.defaultProps = {
  onClick: undefined,
  color: THEME.colors.mid,
  disabled: false,
}

export default InfoWithIcon
