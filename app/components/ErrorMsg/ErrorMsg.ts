import { keyframes } from '@emotion/core'
import styled from '@emotion/styled'

const showAnim = keyframes`
  0% { height: 0; opacity: 0; }
  100% { height: 14px; opacity: 1; }
`

export default styled.p`
  margin: 0;
  text-align: center;
  font-size: 14px;
  color: #ff487f;
  animation: ${showAnim} 0.1s ease-in-out;
`
