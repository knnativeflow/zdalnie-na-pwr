import { Palette } from '@material-ui/core/styles/createPalette'

export type PaletteOrString = ((palette: Palette) => string) | string
export const getPaletteColor = (palette: Palette) => (color: PaletteOrString) =>
  typeof color === 'function' ? color(palette) : color
