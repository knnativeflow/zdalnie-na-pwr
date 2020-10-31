import { styled, Theme } from '@material-ui/core/styles'

export type Props = {
  size: string | number
  horizontal?: boolean
  theme: Theme
}

const Space = styled('div')(({ horizontal, ...props }: Props) => {
  const size = typeof props.size === 'number' ? `${props.size}em` : props.size
  return {
    width: horizontal ? size : 0,
    height: !horizontal ? size : 0,
  }
})

export default Space
