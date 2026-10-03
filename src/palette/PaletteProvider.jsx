import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import CommandPalette from './CommandPalette'
import { PaletteContext } from './PaletteContext'

const isTyping = (target) => {
  if (!(target instanceof HTMLElement)) return false
  return target.isContentEditable || ['INPUT', 'TEXTAREA', 'SELECT'].includes(target.tagName)
}

export default function PaletteProvider({ children }) {
  const [state, setState] = useState({ open: false, initial: '', session: 0 })
  const openerRef = useRef(null)

  const openPalette = useCallback((initial = '') => {
    openerRef.current = document.activeElement
    setState((s) => ({ open: true, initial, session: s.session + 1 }))
  }, [])

  const closePalette = useCallback(() => {
    setState((s) => ({ ...s, open: false }))
    const opener = openerRef.current
    openerRef.current = null
    if (opener instanceof HTMLElement && document.contains(opener)) {
      // Wait a frame so the palette has unmounted before focus moves back.
      requestAnimationFrame(() => opener.focus())
    }
  }, [])

  useEffect(() => {
    const onKeyDown = (event) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault()
        if (state.open) closePalette()
        else openPalette()
      } else if (event.key === '/' && !state.open && !isTyping(event.target)) {
        event.preventDefault()
        openPalette()
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [state.open, openPalette, closePalette])

  const value = useMemo(
    () => ({ open: state.open, openPalette, closePalette }),
    [state.open, openPalette, closePalette],
  )

  return (
    <PaletteContext.Provider value={value}>
      {children}
      {state.open && <CommandPalette key={state.session} initialQuery={state.initial} onClose={closePalette} />}
    </PaletteContext.Provider>
  )
}
