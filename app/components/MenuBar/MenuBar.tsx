import React, { useEffect, useState } from 'react'
import { remote } from 'electron'
import { useDispatch, useSelector } from 'react-redux'
import { VscChromeClose, VscChromeMaximize, VscChromeMinimize, VscChromeRestore } from 'react-icons/all'
import { IconType } from 'react-icons'
import { RootState } from 'store'
import { enterFullscreen, leaveFullscreen } from 'actions/app'
import { MenuBarWrapper, ActionButton as StyledActionButton, ActionButtonsContainer, Title } from './MenuBar.styled'

const isMac = process.platform === 'darwin'

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
  const dispatch = useDispatch()
  const { isAppConfigured, isFullscreen } = useSelector(({ user, app }: RootState) => ({
    isAppConfigured: user.configured,
    isFullscreen: app.isFullscreen,
  }))
  const win = remote.getCurrentWindow()
  const [isMaximized, setMaximized] = useState<boolean>(win.isMaximized())

  useEffect(() => {
    const maximize = () => setMaximized(true)
    const unmaximize = () => setMaximized(false)
    const handleFullscreenEnter = () => dispatch(enterFullscreen())
    const handleFullscreenLeave = () => dispatch(leaveFullscreen())

    win.on('maximize', maximize)
    win.on('unmaximize', unmaximize)
    win.on('enter-full-screen', handleFullscreenEnter)
    win.on('leave-full-screen', handleFullscreenLeave)

    const removeListeners = () => {
      win.removeListener('maximize', maximize)
      win.removeListener('unmaximize', unmaximize)
      win.removeListener('enter-full-screen', handleFullscreenEnter)
      win.removeListener('leave-full-screen', handleFullscreenLeave)
    }

    window.addEventListener('beforeunload', removeListeners)
    return removeListeners
  }, [dispatch, win])

  const doubleClickAction = () => (isMaximized ? win.unmaximize() : win.maximize())

  if (isFullscreen) return null

  return (
    <MenuBarWrapper onDoubleClick={doubleClickAction} isConfigured={isAppConfigured} isMac={isMac}>
      <Title>
        <span>Zdalnie</span>&nbsp;na PWr
      </Title>
      <ActionButtonsContainer>
        <ActionButton icon={VscChromeMinimize} alt="Minimalizuj" onClick={() => win.minimize()} />
        {isMaximized ? (
          <ActionButton icon={VscChromeRestore} alt="Przywróć" onClick={() => win.unmaximize()} />
        ) : (
          <ActionButton icon={VscChromeMaximize} alt="Maksymalizuj" onClick={() => win.maximize()} />
        )}
        <ActionButton icon={VscChromeClose} alt="Zamknij" onClick={() => win.close()} />
      </ActionButtonsContainer>
    </MenuBarWrapper>
  )
}

export default MenuBar
