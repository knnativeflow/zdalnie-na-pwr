import { Box, ButtonBase, SvgIconTypeMap } from '@material-ui/core'
import React from 'react'
import { OverridableComponent } from '@material-ui/core/OverridableComponent'
import { makeStyles } from '@material-ui/core/styles'

interface InfoProps {
  icon: OverridableComponent<SvgIconTypeMap<unknown, 'svg'>>
  title: string
  children: React.ReactNode
  color?: string
}

const InfoWithIcon = ({ icon: Icon, title, children, color }: InfoProps) => (
  <Box px={1} display="flex" alignItems="start" width={1}>
    <Box bgcolor={`${color}40`} color={color} display="inline-flex" p={0.5} mr={1.5} borderRadius="borderRadius">
      <Icon fontSize="small" />
    </Box>
    <Box flexGrow={1}>
      <Box fontSize="subtitle2.fontSize" color="grey.800" fontWeight="bold" mb={0.5}>
        {title}
      </Box>
      <Box fontSize="subtitle1.fontSize">{children}</Box>
    </Box>
  </Box>
)

InfoWithIcon.defaultProps = {
  color: '#888888',
}

export default InfoWithIcon

type ButtonProps = InfoProps & {
  onClick: () => void
}

const useStyles = makeStyles({
  button: {
    width: '100%',
    textAlign: 'left',
    borderRadius: 8,
    '&:hover': {
      backgroundColor: (props: ButtonProps) => `${props.color}10`,
    },
  },
  child: {
    backgroundColor: (props: ButtonProps) => props.color,
  },
})

export const ButtonInfoWithIcon = (props: ButtonProps) => {
  const { onClick, icon, title, children, color } = props
  const { button, ...classes } = useStyles(props)
  return (
    <ButtonBase focusRipple className={button} TouchRippleProps={{ classes }}>
      <Box py={1} bgcolor={`${color}10`} borderRadius={8} onClick={onClick} width={1}>
        <InfoWithIcon icon={icon} title={title} color={color}>
          <Box fontSize="subtitle2.fontSize">{children}</Box>
        </InfoWithIcon>
      </Box>
    </ButtonBase>
  )
}

ButtonInfoWithIcon.defaultProps = {
  color: '#888888',
}
