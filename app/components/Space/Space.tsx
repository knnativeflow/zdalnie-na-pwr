import styled from '@emotion/styled'
import { parseSize } from 'base/theme/theme'

export type Props = {
  size?: string | number
  horizontal?: boolean
  grow?: number | boolean
}

const Space = styled.div<Props>`
  width: ${({ horizontal, size }) => (size && horizontal ? parseSize(size) : 0)};
  height: ${({ horizontal, size }) => (size && !horizontal ? parseSize(size) : 0)};
  flex-grow: ${({ grow }) => (grow === true ? 1 : grow)};
`

export default Space
