import { getAppMeta } from '../../apps/catalog'
import Icon from '../../components/ui/Icon'
import { usePalette } from '../../palette/PaletteContext'
import { useWindowActions, useWindowState } from './wm/WindowContext'

export default function Taskbar() {
  const { wins, focused } = useWindowState()
  const { focus, minimize } = useWindowActions()
  const { openPalette } = usePalette()
  const items = Object.values(wins)

  return (
    <footer className="relative z-[900] flex h-11 shrink-0 items-center gap-2 border-t border-line bg-surface/90 px-2 backdrop-blur">
      <button
        type="button"
        onClick={() => openPalette()}
        className="inline-flex cursor-pointer items-center gap-1.5 rounded-md bg-accent px-3 py-1.5 font-mono text-xs font-medium text-accent-fg transition hover:brightness-110"
      >
        <Icon name="command" size={14} /> Launcher
      </button>

      <nav aria-label="Open windows" className="flex min-w-0 flex-1 items-center gap-1.5 overflow-x-auto">
        {items.map((win) => {
          const active = focused === win.key && !win.minimized
          return (
            <button
              key={win.key}
              type="button"
              aria-pressed={active}
              onClick={() => (active ? minimize(win.key) : focus(win.key))}
              className={`inline-flex max-w-48 shrink-0 cursor-pointer items-center gap-1.5 rounded-md border px-2.5 py-1 font-mono text-xs transition-colors ${
                active ? 'border-accent bg-accent/10 text-fg' : 'border-line text-muted hover:border-accent hover:text-fg'
              } ${win.minimized ? 'opacity-70' : ''}`}
            >
              <Icon name={getAppMeta(win.appId)?.icon ?? 'file'} size={13} className="shrink-0 text-accent" />
              <span className="truncate">{win.title}</span>
            </button>
          )
        })}
      </nav>

      <p className="hidden shrink-0 pr-1 font-mono text-[11px] text-muted lg:block">
        {items.length} {items.length === 1 ? 'window' : 'windows'} open
      </p>
    </footer>
  )
}
