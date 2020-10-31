import React from 'react'
import { styled, Theme } from '@material-ui/core/styles'
import { getPaletteColor, PaletteOrString } from 'utils/theme'

export type Props = {
  color?: PaletteOrString
  size?: number | string
  fontWeight?:
    | number
    | '-moz-initial'
    | 'inherit'
    | 'initial'
    | 'revert'
    | 'unset'
    | 'normal'
    | 'bold'
    | 'bolder'
    | 'lighter'
  children: React.ReactNode
  theme: Theme
}

const Text = styled('span')(({ theme, ...props }: Props) => {
  const color = getPaletteColor(theme.palette)(props.color)
  const fontSize = typeof props.size === 'number' ? `${props.size}rem` : props.size
  return { color, fontSize, fontWeight: props.fontWeight }
})

export default Text
