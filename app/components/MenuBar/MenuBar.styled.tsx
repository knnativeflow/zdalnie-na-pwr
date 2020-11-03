import styled from '@emotion/styled'
import { css } from '@emotion/core'

const isMac = process.platform === 'darwin'

export const MENU_BAR_HEIGHT = isMac ? '38px' : '30px'
const ACTION_ICON_SIZE = '15px'

type TMenuBarWrapper = {
  isConfigured?: boolean
  isMac?: boolean
}

export const ActionButtonsContainer = styled.div`
  height: 100%;
  margin-left: auto;
  display: flex;
`

export const MenuBarWrapper = styled.div<TMenuBarWrapper>`
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: ${MENU_BAR_HEIGHT};
  display: flex;
  align-items: center;
  -webkit-app-region: drag;
  z-index: 10000;

  ${({ isMac }) =>
    isMac &&
    css`
      justify-content: flex-end;
    `}

  ${({ isConfigured }) =>
    isConfigured &&
    css`
      color: #fff; // TODO: use variables
      background: #3a5574; // TODO: use variables
    `}

  ${ActionButtonsContainer} {
    display: none;
  }
`
export const ActionButton = styled.button`
  height: 100%;
  width: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 0;
  background: transparent;
  color: inherit;
  outline: none;
  cursor: pointer;
  -webkit-app-region: no-drag;

  &:hover {
    background: #0001;
  }

  &:active {
    background: #0002;
  }

  svg {
    height: ${ACTION_ICON_SIZE};
    width: ${ACTION_ICON_SIZE};
  }
`

export const Title = styled.p`
  margin: 0 10px;
  font-size: 13px;
  display: flex;
  align-items: center;
  height: 100%;
  pointer-events: none;
  text-transform: uppercase;

  span {
    font-weight: 900;
  }
`
