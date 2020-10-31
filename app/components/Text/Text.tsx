import React from 'react'
import { Palette } from '@material-ui/core/styles/createPalette'
import { styled, Theme } from '@material-ui/core/styles'

export type Props = {
  color?: ((palette: Palette) => string) | string
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
  const color = typeof props.color === 'function' ? props.color(theme.palette) : props.color
  const fontSize = typeof props.size === 'number' ? `${props.size}rem` : props.size
  return { color, fontSize, fontWeight: props.fontWeight }
})

export default Text
