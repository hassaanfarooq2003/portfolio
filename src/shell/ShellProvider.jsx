import { useCallback, useMemo, useRef, useState } from 'react'
import { ShellContext } from './ShellContext'
import useMediaQuery from './useMediaQuery'

const SHELL_KEY = 'portfolio:shell'

const isMode = (value) => value === 'quick' || value === 'desktop'

// ?shell=quick|desktop wins and is remembered; otherwise use the saved choice.
function readOverride() {
  try {
    const url = new URL(window.location.href)
    const fromQuery = url.searchParams.get('shell')
    if (isMode(fromQuery)) {
      localStorage.setItem(SHELL_KEY, fromQuery)
      url.searchParams.delete('shell')
      window.history.replaceState(null, '', url)
      return fromQuery
    }
    const saved = localStorage.getItem(SHELL_KEY)
    return isMode(saved) ? saved : null
  } catch {
    return null
  }
}

export default function ShellProvider({ children }) {
  const wide = useMediaQuery('(min-width: 1024px) and (pointer: fine)')
  const reduceMotion = useMediaQuery('(prefers-reduced-motion: reduce)')
  const canDesktop = useMediaQuery('(min-width: 900px)')
  const [override, setOverride] = useState(readOverride)
  const handlerRef = useRef(null)

  const auto = wide && !reduceMotion ? 'desktop' : 'quick'
  const requested = override ?? auto
  const mode = requested === 'desktop' && !canDesktop ? 'quick' : requested

  const setMode = useCallback((next) => {
    const value = isMode(next) ? next : null
    try {
      if (value) localStorage.setItem(SHELL_KEY, value)
      else localStorage.removeItem(SHELL_KEY)
    } catch {
      // ignore: the choice still applies until reload
    }
    setOverride(value)
  }, [])

  // Each shell registers how it opens an app (a window, or a scroll to a section).
  const registerHandler = useCallback((handler) => {
    handlerRef.current = handler
    return () => {
      if (handlerRef.current === handler) handlerRef.current = null
    }
  }, [])

  const openApp = useCallback((appId, params) => handlerRef.current?.(appId, params), [])

  const value = useMemo(
    () => ({ mode, override, setMode, canDesktop, openApp, registerHandler }),
    [mode, override, setMode, canDesktop, openApp, registerHandler],
  )

  return <ShellContext.Provider value={value}>{children}</ShellContext.Provider>
}
