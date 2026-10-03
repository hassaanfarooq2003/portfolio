import { useCallback, useEffect, useRef, useState } from 'react'
import { MotionConfig } from 'framer-motion'
import { APP_CATALOG } from '../../apps/catalog'
import { hasBooted, markBooted } from '../boot'
import { formatHash, parseHash } from '../routes'
import { useShell } from '../ShellContext'
import BootSequence from './BootSequence'
import Desk from './Desk'
import MenuBar from './MenuBar'
import Taskbar from './Taskbar'
import WindowProvider from './wm/WindowProvider'
import { useWindowActions, useWindowState } from './wm/WindowContext'

// Play the boot screen once per session, and never for deep links or reduced motion.
const shouldBoot = () =>
  !hasBooted() && !window.location.hash && !window.matchMedia('(prefers-reduced-motion: reduce)').matches

function Desktop() {
  const { registerHandler, setMode } = useShell()
  const { open } = useWindowActions()
  const { wins, focused } = useWindowState()
  const [booting, setBooting] = useState(shouldBoot)

  const finishBoot = useCallback(() => {
    markBooted()
    setBooting(false)
  }, [])

  // On the desktop an "app" is a window.
  useEffect(() => registerHandler((appId, params) => open(appId, params)), [registerHandler, open])

  // After boot: open the deep-linked app if there is one, otherwise the auto-open apps (About).
  useEffect(() => {
    if (booting) return
    const route = parseHash()
    if (route) {
      open(route.appId, route.params)
      return
    }
    APP_CATALOG.filter((app) => app.autoOpen).forEach((app) => open(app.id))
  }, [booting, open])

  // Keep the URL hash pointing at the focused window so it can be shared.
  const focusedWin = focused ? wins[focused] : null
  const hash = focusedWin ? formatHash(focusedWin.appId, focusedWin.params) : ''
  const sawWindow = useRef(false)
  useEffect(() => {
    if (booting) return
    // Leave a deep link in the URL until its window has actually opened.
    if (hash) sawWindow.current = true
    else if (!sawWindow.current) return
    window.history.replaceState(null, '', window.location.pathname + window.location.search + hash)
  }, [booting, hash])

  return (
    <div className="flex h-screen flex-col overflow-hidden bg-canvas text-fg">
      <button type="button" className="skip-link" onClick={() => setMode('quick')}>
        Switch to the plain scrolling page
      </button>
      <MenuBar />
      <Desk />
      <Taskbar />
      {booting && <BootSequence onDone={finishBoot} />}
    </div>
  )
}

export default function DesktopShell() {
  return (
    <MotionConfig reducedMotion="user">
      <WindowProvider>
        <Desktop />
      </WindowProvider>
    </MotionConfig>
  )
}
