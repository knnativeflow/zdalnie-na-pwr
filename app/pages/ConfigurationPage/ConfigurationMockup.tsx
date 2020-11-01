import React from 'react'
import styled from '@emotion/styled'
import mockup from 'assets/images/stepper-mockup-1.png'

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
}

const BackgroundCircle = styled.div<CircleProps>`
  border-radius: 50%;
  width: 130vmax;
  height: 130vmax;
  right: -70vmax;
  bottom: -35vmax;
  background: ${({ bgColor }) => bgColor};
  position: absolute;
  z-index: -100;
`

type ConfigurationMockupProps = {
  src?: string
  color: string
}

const ConfigurationMockup = ({ src = mockup, color }: ConfigurationMockupProps) => (
  <>
    <BackgroundCircle bgColor={color} />
    <StepperFeature src={src} />
  </>
)

ConfigurationMockup.defaultProps = {
  src: mockup,
}

export default ConfigurationMockup
