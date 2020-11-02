import React from 'react'
import styled from '@emotion/styled'
import { parseSize } from 'base/theme/theme'

export type Props = {
  color?: string
  size?: number | string
  fontWeight?: string | number
  children: React.ReactNode
}

const shouldForwardProp = (name: string) => !['color', 'size', 'fontWeight'].includes(name)

const Text = styled('span', { shouldForwardProp })<Props>`
  color: ${({ color }) => color};
  font-size: ${({ size }) => size && parseSize(size)};
  font-weight: ${({ fontWeight }) => fontWeight};
`

export default Text
