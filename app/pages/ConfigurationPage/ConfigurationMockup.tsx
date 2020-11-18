import React from 'react'
import styled from '@emotion/styled'
import mockup from 'assets/images/step1.png'

type WrapperProps = {
  bgColor: string
  isSummary: boolean
}

const Wrapper = styled.div<WrapperProps>`
  flex: ${({ isSummary }) => (isSummary ? 1.5 : 2)};
  position: relative;
  display: flex;
  align-items: center;

  &:after {
    content: '';
    position: absolute;
    bottom: -35vmax;
    left: 0;
    width: 130vmax;
    height: 130vmax;
    border-radius: 100%;
    background: ${({ bgColor }) => bgColor};
    z-index: -1;
  }
`

const Image = styled.img`
  height: 90%;
  max-height: 1047px;
  position: absolute;
`

type ConfigurationMockupProps = {
  isSummary?: boolean
  src?: string
  color: string
}

const ConfigurationMockup = ({ src = mockup, color, isSummary = false }: ConfigurationMockupProps) => (
  <Wrapper bgColor={color} isSummary={isSummary}>
    <Image src={src} />
  </Wrapper>
)

ConfigurationMockup.defaultProps = {
  src: mockup,
}

export default ConfigurationMockup
