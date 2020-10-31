import React, { useEffect, useState } from 'react'
import { remote } from 'electron'
import { VscChromeClose, VscChromeMaximize, VscChromeMinimize, VscChromeRestore } from 'react-icons/all'
import { IconType } from 'react-icons'
import { Box } from '@material-ui/core'
import Text from 'components/Text'
import styles from './TitleBar.scss'

type TitleButtonType = {
  icon: IconType
  onClick: () => void
  alt: string
}

const TitleButton = ({ icon: Icon, alt, onClick }: TitleButtonType) => (
  <button type="button" className={styles.topBarButton} title={alt} onClick={onClick}>
    <Icon />
  </button>
)

const TitleBar = () => {
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
    <div className={styles.topBar}>
      <Box
        display="flex"
        alignItems="center"
        height={1}
        paddingX={1}
        color="text.disabled"
        style={{ pointerEvents: 'none' }}
      >
        <Text fontWeight={900} size={0.75}>
          ZDALNIE
        </Text>
        &nbsp;
        <Text fontWeight={500} size={0.75}>
          NA PWR
        </Text>
      </Box>
      <div className={styles.topBarButtons}>
        <TitleButton icon={VscChromeMinimize} alt="Minimalizuj" onClick={() => win.minimize()} />
        {isMaximized ? (
          <TitleButton icon={VscChromeRestore} alt="Przywróć" onClick={() => win.unmaximize()} />
        ) : (
          <TitleButton icon={VscChromeMaximize} alt="Maksymalizuj" onClick={() => win.maximize()} />
        )}
        <TitleButton icon={VscChromeClose} alt="Zamknij" onClick={() => win.close()} />
      </div>
    </div>
  )
}

export default TitleBar
