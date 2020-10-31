import React from 'react'
import { styled, Theme } from '@material-ui/core'
import { getPaletteColor, PaletteOrString } from 'utils/theme'

import mockup from 'assets/images/stepper-mockup-1.png'

type FeatureProps = {
  src: string
  theme: Theme
}

const StepperFeature = styled('div')((props: FeatureProps) => ({
  backgroundImage: `url(${props.src})`,
  height: '90%',
  flex: 1,
  backgroundSize: 'auto 100%',
  backgroundRepeat: 'no-repeat',
  margin: 'auto',
}))

type CircleProps = {
  theme: Theme
  bgColor: PaletteOrString
}

const BackgroundCircle = styled('div')(({ theme, ...props }: CircleProps) => {
  const color = getPaletteColor(theme.palette)(props.bgColor)
  return {
    borderRadius: '50%',
    width: '130vmax',
    height: '130vmax',
    right: '-70vmax',
    bottom: '-35vmax',
    background: color,
    position: 'absolute',
    zIndex: -100,
  }
})

type ConfigurationMockupProps = {
  src?: string
  color: PaletteOrString
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
