import styled from '@emotion/styled'
import { parseSize } from 'base/theme/theme'

export type Props = {
  size: string | number
  horizontal?: boolean
}

const Space = styled.div<Props>`
  width: ${({ horizontal, size }) => (horizontal ? parseSize(size) : 0)};
  height: ${({ horizontal, size }) => (!horizontal ? parseSize(size) : 0)};
`

export default Space
