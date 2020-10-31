import React, { useEffect, useState } from 'react'
import { remote } from 'electron'
import { VscChromeClose, VscChromeMaximize, VscChromeMinimize, VscChromeRestore } from 'react-icons/all'
import { IconType } from 'react-icons'
import {
  MenuBarWrapper,
  ActionButton as StyledActionButton,
  ActionButtonsContainer,
  Title,
} from 'components/Menubar/Menubar.styled'

type ActionButtonProps = {
  icon: IconType
  onClick: () => void
  alt: string
}

const ActionButton = ({ icon: Icon, alt, onClick }: ActionButtonProps) => (
  <StyledActionButton title={alt} onClick={onClick}>
    <Icon />
  </StyledActionButton>
)

// TODO: add mac controls
const MenuBar = () => {
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
    <MenuBarWrapper>
      <Title>
        <span>Zdalnie</span> na PWr
      </Title>
      <ActionButtonsContainer>
        <ActionButton icon={VscChromeMinimize} alt="Minimalizuj" onClick={win.minimize} />
        {isMaximized ? (
          <ActionButton icon={VscChromeRestore} alt="Przywróć" onClick={win.unmaximize} />
        ) : (
          <ActionButton icon={VscChromeMaximize} alt="Maksymalizuj" onClick={win.maximize} />
        )}
        <ActionButton icon={VscChromeClose} alt="Zamknij" onClick={win.close} />
      </ActionButtonsContainer>
    </MenuBarWrapper>
  )
}

export default MenuBar
