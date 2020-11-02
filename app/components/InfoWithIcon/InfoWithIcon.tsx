import { Box } from '@material-ui/core'
import React from 'react'
import { IconType } from 'react-icons'
import Button from 'components/Button'
import Text from 'components/Text'
import { THEME } from 'base/theme/theme'

interface InfoProps {
  icon: IconType
  title: string
  children: React.ReactNode
  color?: string
}

const InfoWithIcon = ({ icon: Icon, title, children, color }: InfoProps) => (
  <Box display="flex" alignItems="start" width={1}>
    <Box bgcolor={`${color}40`} color={color} display="inline-flex" p={0.75} mr={1.5} borderRadius="borderRadius">
      <Icon size="1.25em" />
    </Box>
    <Box flexGrow={1} display="flex" flexDirection="column">
      <Text fontWeight="bold" size={0.75} color={THEME.colors.mid}>
        {title}
      </Text>
      <Text size={0.85} fontWeight="normal">
        {children}
      </Text>
    </Box>
  </Box>
)

InfoWithIcon.defaultProps = {
  color: THEME.colors.mid,
}

export default InfoWithIcon

type ButtonProps = InfoProps & {
  onClick?: () => void
  disabled?: boolean
}

export const ButtonInfoWithIcon = (props: ButtonProps) => {
  const { onClick, icon, title, children, disabled, color = THEME.colors.mid } = props
  return (
    <Button even {...{ onClick, color, disabled }} fullWidth compact align="left">
      <InfoWithIcon {...{ icon, title, color }}>
        <Box fontSize="subtitle2.fontSize">{children}</Box>
      </InfoWithIcon>
    </Button>
  )
}

ButtonInfoWithIcon.defaultProps = {
  onClick: undefined,
  color: THEME.colors.mid,
  disabled: false,
}
