import Icon from '../../components/ui/Icon'
import { usePalette } from '../../palette/PaletteContext'
import ThemeSwitcher from '../../theme/ThemeSwitcher'
import { QUICK_SECTIONS } from '../routes'
import { useShell } from '../ShellContext'

const buttonClass =
  'inline-flex cursor-pointer items-center gap-1.5 rounded-md border border-line bg-surface-2 px-2.5 py-1 text-xs text-muted transition-colors hover:border-accent hover:text-fg'

export default function QuickHeader() {
  const { canDesktop, setMode } = useShell()
  const { openPalette } = usePalette()

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-canvas/85 backdrop-blur">
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between gap-3 px-4 sm:px-6">
        <a href="#about" className="flex items-center gap-2 font-mono text-sm font-medium">
          <Icon name="terminal" size={18} className="text-accent" />
          <span className="max-[420px]:hidden">
            hassaan<span className="text-muted">.dev</span>
          </span>
        </a>

        <nav aria-label="Primary" className="hidden items-center gap-1 lg:flex">
          {QUICK_SECTIONS.map((section) => (
            <a
              key={section.id}
              href={`#${section.id}`}
              className="rounded-md px-2.5 py-1 text-sm text-muted transition-colors hover:text-fg"
            >
              {section.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <ThemeSwitcher />
          <button type="button" onClick={() => openPalette()} aria-label="Open command palette" className={buttonClass}>
            <Icon name="command" size={14} />
            <span className="hidden sm:inline">Search</span>
          </button>
          {canDesktop && (
            <button type="button" onClick={() => setMode('desktop')} className={buttonClass}>
              <Icon name="monitor" size={14} />
              <span className="hidden sm:inline">Desktop</span>
              <span className="sr-only sm:hidden">Open desktop view</span>
            </button>
          )}
        </div>
      </div>
    </header>
  )
}
