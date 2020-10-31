import React, { useEffect, useState } from 'react'
import { remote } from 'electron'
import { VscChromeClose, VscChromeMaximize, VscChromeMinimize, VscChromeRestore } from 'react-icons/all'
import { IconType } from 'react-icons'
import Text from 'components/Text'
import StyledTitleBar, {
  StyledTitleBarButton,
  StyledTitleBarButtonContainer,
  StyledTitleBarName,
} from 'components/TitleBar/TitleBar.styled'

type TitleButtonType = {
  icon: IconType
  onClick: () => void
  alt: string
}

const TitleButton = ({ icon: Icon, alt, onClick }: TitleButtonType) => (
  <StyledTitleBarButton type="button" title={alt} onClick={() => onClick()}>
    <Icon />
  </StyledTitleBarButton>
)

const TitleBar = ({ light }: { light: boolean }) => {
  const win = remote.getCurrentWindow()
  const [isMaximized, setMaximized] = useState<boolean>(win.isMaximized())
  useEffect(() => {
    const maximize = () => setMaximized(true)
    const unmaximize = () => setMaximized(false)
    win.on('maximize', maximize)
    win.on('unmaximize', unmaximize)

    const removeListeners = () => {
      win.removeListener('maximize', maximize)
      win.removeListener('unmaximize', unmaximize)
    }

    window.addEventListener('beforeunload', removeListeners)
    return removeListeners
  }, [win])

  return (
    <StyledTitleBar light={light}>
      <StyledTitleBarName>
        <Text fontWeight={900} size={0.75}>
          ZDALNIE
        </Text>
        &nbsp;
        <Text fontWeight={500} size={0.75}>
          NA PWR
        </Text>
      </StyledTitleBarName>
      <StyledTitleBarButtonContainer>
        <TitleButton icon={VscChromeMinimize} alt="Minimalizuj" onClick={win.minimize} />
        {isMaximized ? (
          <TitleButton icon={VscChromeRestore} alt="Przywróć" onClick={win.unmaximize} />
        ) : (
          <TitleButton icon={VscChromeMaximize} alt="Maksymalizuj" onClick={win.maximize} />
        )}
        <TitleButton icon={VscChromeClose} alt="Zamknij" onClick={win.close} />
      </StyledTitleBarButtonContainer>
    </StyledTitleBar>
  )
}

export default TitleBar
