import { useEffect, useRef, useState } from 'react'
import Icon from '../components/ui/Icon'
import { useTheme } from './ThemeContext'

export default function ThemeSwitcher() {
  const { theme, themes, setTheme } = useTheme()
  const [open, setOpen] = useState(false)
  const rootRef = useRef(null)
  const buttonRef = useRef(null)
  const itemRefs = useRef([])

  useEffect(() => {
    if (!open) return undefined
    const onPointerDown = (event) => {
      if (!rootRef.current?.contains(event.target)) setOpen(false)
    }
    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        setOpen(false)
        buttonRef.current?.focus()
      }
    }
    document.addEventListener('pointerdown', onPointerDown)
    document.addEventListener('keydown', onKeyDown)
    const current = themes.findIndex((t) => t.id === theme)
    itemRefs.current[Math.max(current, 0)]?.focus()
    return () => {
      document.removeEventListener('pointerdown', onPointerDown)
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [open, theme, themes])

  const moveFocus = (event, index) => {
    if (event.key !== 'ArrowDown' && event.key !== 'ArrowUp') return
    event.preventDefault()
    const step = event.key === 'ArrowDown' ? 1 : -1
    itemRefs.current[(index + step + themes.length) % themes.length]?.focus()
  }

  return (
    <div ref={rootRef} className="relative">
      <button
        ref={buttonRef}
        type="button"
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="inline-flex cursor-pointer items-center gap-1.5 rounded-md border border-line bg-surface-2 px-2.5 py-1 font-mono text-xs text-muted transition-colors hover:border-accent hover:text-fg"
      >
        <span>ctx:</span>
        <span className="text-accent">{theme}</span>
        <Icon name="chevronDown" size={12} />
      </button>
      {open && (
        <div
          role="menu"
          aria-label="Switch kubectl context"
          className="absolute right-0 top-full z-50 mt-2 w-72 rounded-lg border border-line bg-surface p-1 shadow-[var(--shadow-win)]"
        >
          {themes.map((t, index) => (
            <button
              key={t.id}
              ref={(node) => {
                itemRefs.current[index] = node
              }}
              type="button"
              role="menuitemradio"
              aria-checked={t.id === theme}
              onKeyDown={(event) => moveFocus(event, index)}
              onClick={() => {
                setTheme(t.id)
                setOpen(false)
                buttonRef.current?.focus()
              }}
              className="flex w-full cursor-pointer items-center justify-between gap-3 rounded-md px-2.5 py-2 text-left font-mono text-xs text-muted transition-colors hover:bg-surface-2 hover:text-fg focus-visible:bg-surface-2"
            >
              <span className="truncate">
                use-context <span className="text-fg">{t.id}</span>
              </span>
              {t.id === theme && <Icon name="check" size={14} className="shrink-0 text-accent" />}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
