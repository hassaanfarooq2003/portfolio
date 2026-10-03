import Button from '../components/ui/Button'
import Icon from '../components/ui/Icon'
import { resetBoot } from '../shell/boot'
import { useShell } from '../shell/ShellContext'
import { useTheme } from '../theme/ThemeContext'

const VIEW_CHOICES = [
  { id: 'auto', label: 'Auto', hint: 'Desktop on big screens, Quick view elsewhere' },
  { id: 'quick', label: 'Quick view', hint: 'One plain scrolling page' },
  { id: 'desktop', label: 'Desktop', hint: 'Windows, icons and a taskbar' },
]

function Swatch({ themeId }) {
  // data-theme scopes the CSS variables, so each swatch previews its own palette.
  return (
    <span
      data-theme={themeId}
      aria-hidden="true"
      className="flex h-6 w-11 shrink-0 overflow-hidden rounded border border-line"
    >
      <span className="w-1/2 bg-canvas" />
      <span className="w-1/4 bg-surface-2" />
      <span className="w-1/4 bg-accent" />
    </span>
  )
}

function RadioRow({ checked, onSelect, children }) {
  return (
    <button
      type="button"
      role="radio"
      aria-checked={checked}
      onClick={onSelect}
      className={`flex w-full cursor-pointer items-center gap-3 rounded-lg border p-2.5 text-left transition-colors ${
        checked ? 'border-accent bg-accent/10' : 'border-line hover:border-accent'
      }`}
    >
      {children}
      {checked && <Icon name="check" size={16} className="ml-auto shrink-0 text-accent" />}
    </button>
  )
}

export default function SettingsView() {
  const { theme, themes, setTheme } = useTheme()
  const { override, setMode, canDesktop } = useShell()
  const currentView = override ?? 'auto'

  const replayBoot = () => {
    resetBoot()
    window.history.replaceState(null, '', window.location.pathname + window.location.search)
    window.location.reload()
  }

  return (
    <div className="space-y-6">
      <section aria-labelledby="theme-heading">
        <h2 id="theme-heading" className="mb-1 font-mono text-xs uppercase tracking-wide text-muted">
          Theme (kubectl context)
        </h2>
        <p className="mb-3 font-mono text-xs text-muted">$ kubectl config use-context {theme}</p>
        <div role="radiogroup" aria-labelledby="theme-heading" className="grid gap-2">
          {themes.map((t) => (
            <RadioRow key={t.id} checked={t.id === theme} onSelect={() => setTheme(t.id)}>
              <Swatch themeId={t.id} />
              <span>
                <span className="block font-mono text-sm">{t.id}</span>
                <span className="block text-xs text-muted">{t.label}</span>
              </span>
            </RadioRow>
          ))}
        </div>
      </section>

      <section aria-labelledby="view-heading">
        <h2 id="view-heading" className="mb-3 font-mono text-xs uppercase tracking-wide text-muted">
          View mode
        </h2>
        <div role="radiogroup" aria-labelledby="view-heading" className="grid gap-2">
          {VIEW_CHOICES.map((choice) => (
            <RadioRow
              key={choice.id}
              checked={choice.id === currentView}
              onSelect={() => setMode(choice.id === 'auto' ? null : choice.id)}
            >
              <span>
                <span className="block text-sm font-medium">{choice.label}</span>
                <span className="block text-xs text-muted">{choice.hint}</span>
              </span>
            </RadioRow>
          ))}
        </div>
        {!canDesktop && (
          <p className="mt-2 text-xs text-muted">The desktop needs a window at least 900px wide.</p>
        )}
      </section>

      <Button onClick={replayBoot}>
        <Icon name="zap" size={16} /> Replay boot sequence
      </Button>
    </div>
  )
}
