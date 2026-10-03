import { useEffect, useState } from 'react'
import Icon from '../../components/ui/Icon'
import Kbd from '../../components/ui/Kbd'
import { usePalette } from '../../palette/PaletteContext'
import ThemeSwitcher from '../../theme/ThemeSwitcher'
import { useShell } from '../ShellContext'
import { useWindowState } from './wm/WindowContext'

const isMac = () => /Mac|iPhone|iPad/.test(navigator.platform)

function Clock() {
  const [now, setNow] = useState(() => new Date())

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 30000)
    return () => clearInterval(id)
  }, [])

  return (
    <time dateTime={now.toISOString()} className="font-mono text-xs text-muted">
      {now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
    </time>
  )
}

const buttonClass =
  'inline-flex cursor-pointer items-center gap-1.5 rounded-md border border-line bg-surface-2 px-2.5 py-1 text-xs text-muted transition-colors hover:border-accent hover:text-fg'

export default function MenuBar() {
  const { setMode } = useShell()
  const { openPalette } = usePalette()
  const { wins, focused } = useWindowState()
  const title = focused ? wins[focused]?.title : null

  return (
    <header className="relative z-[900] flex h-10 shrink-0 items-center gap-4 border-b border-line bg-surface/90 px-3 backdrop-blur">
      <span className="flex items-center gap-1.5 font-mono text-xs font-medium">
        <Icon name="terminal" size={14} className="text-accent" />
        hassaan.os
      </span>
      <span className="min-w-0 truncate font-mono text-xs text-muted">{title ?? 'desktop'}</span>

      <div className="ml-auto flex items-center gap-2">
        <ThemeSwitcher />
        <button type="button" onClick={() => setMode('quick')} className={buttonClass}>
          <Icon name="list" size={14} /> Quick view
        </button>
        <button type="button" onClick={() => openPalette()} aria-label="Open command palette" className={buttonClass}>
          <Icon name="search" size={14} />
          <Kbd>{isMac() ? '⌘K' : 'Ctrl K'}</Kbd>
        </button>
        <Clock />
      </div>
    </header>
  )
}
