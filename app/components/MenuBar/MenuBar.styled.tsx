import styled from '@emotion/styled'

const TITLE_BAR_HEIGHT = '30px'
const ACTION_ICON_SIZE = '15px'

export const MenuBarWrapper = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: ${TITLE_BAR_HEIGHT};
  display: flex;
  align-items: center;
  -webkit-app-region: drag;
  z-index: 10000;
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

export const ActionButtonsContainer = styled.div`
  height: 100%;
  margin-left: auto;
  display: flex;
`

export const Title = styled.p`
  margin: 0;
  margin-left: 10px;
  font-size: 13px;
  display: flex;
  align-items: center;
  height: 100%;
  pointer-events: none;
  text-transform: uppercase;
  color: #000000; // TODO: use variables

  span {
    font-weight: 900;
  }
`
