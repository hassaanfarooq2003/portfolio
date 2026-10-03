import { useEffect, useRef } from 'react'
import { APP_CATALOG } from '../../apps/catalog'
import Icon from '../../components/ui/Icon'
import Window from './Window'
import { useWindowActions, useWindowState } from './wm/WindowContext'

export default function Desk() {
  const deskRef = useRef(null)
  const { wins, order, focused } = useWindowState()
  const { open, setDesk } = useWindowActions()

  // Tell the window manager how big the desk is so windows stay inside it.
  useEffect(() => {
    const el = deskRef.current
    if (!el) return undefined
    const report = () => setDesk(el.clientWidth, el.clientHeight)
    report()
    const observer = new ResizeObserver(report)
    observer.observe(el)
    return () => observer.disconnect()
  }, [setDesk])

  return (
    <main id="desk" aria-label="Desktop" ref={deskRef} className="wallpaper relative min-h-0 flex-1 overflow-hidden">
      <ul className="absolute bottom-2 left-2 top-2 m-0 flex list-none flex-col flex-wrap content-start gap-0.5 p-0">
        {APP_CATALOG.map((app) => (
          <li key={app.id}>
            <button
              type="button"
              onClick={() => open(app.id)}
              className="flex w-24 cursor-pointer flex-col items-center gap-1 rounded-lg p-1.5 text-center transition-colors hover:bg-surface/70 focus-visible:bg-surface/70"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-line bg-surface text-accent">
                <Icon name={app.icon} size={20} />
              </span>
              <span className="font-mono text-xs leading-tight">{app.title}</span>
            </button>
          </li>
        ))}
      </ul>

      {Object.values(wins).map((win) => (
        <Window
          key={win.key}
          win={win}
          z={10 + order.indexOf(win.key)}
          focused={focused === win.key}
          deskRef={deskRef}
        />
      ))}
    </main>
  )
}
