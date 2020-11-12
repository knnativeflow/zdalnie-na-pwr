import React from 'react'
import styled from '@emotion/styled'
import mockup from 'assets/images/step1.png'

type FeatureProps = {
  src: string
}

const StepperFeature = styled.div<FeatureProps>`
  background-image: ${({ src }) => `url(${src})`};
  height: 90%;
  flex: 1;
  background-size: auto 100%;
  background-repeat: no-repeat;
  margin: auto;
`

type CircleProps = {
  bgColor: string
  isSummary: boolean
}

const BackgroundCircle = styled.div<CircleProps>`
  border-radius: 50%;
  width: 130vmax;
  height: 130vmax;
  right: ${({ isSummary }) => (isSummary ? '-75vmax' : '-70vmax')};
  bottom: -35vmax;
  background: ${({ bgColor }) => bgColor};
  position: absolute;
  z-index: -100;
`

type ConfigurationMockupProps = {
  isSummary?: boolean
  src?: string
  color: string
}

const ConfigurationMockup = ({ src = mockup, color, isSummary = false }: ConfigurationMockupProps) => (
  <>
    <BackgroundCircle bgColor={color} isSummary={isSummary} />
    <StepperFeature src={src} />
  </>
)

ConfigurationMockup.defaultProps = {
  src: mockup,
}

export default ConfigurationMockup
