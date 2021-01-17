import React, { PropsWithChildren } from 'react'
import styled from '@emotion/styled'
import { shell } from 'electron'
import { THEME } from 'base/theme/theme'

type LinkProps = PropsWithChildren<{
  url: string
  className?: string
}>

const ExternalLink = styled(({ url, children, className }: LinkProps) => (
  <span onClick={() => shell.openExternal(url)} className={className}>
    {children}
  </span>
))`
  color: ${THEME.colors.palette.blue.main};
  font-weight: 700;
  cursor: pointer;
`

export default ExternalLink
