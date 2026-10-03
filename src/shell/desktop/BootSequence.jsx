import { useEffect, useState } from 'react'
import { APP_CATALOG } from '../../apps/catalog'
import { projects } from '../../data/projects'
import { THEMES } from '../../theme/themes'

const STEPS = [
  { text: '$ git push origin main', tone: 'text-muted' },
  { text: '[ ok ] checkout   cloned hassaan/portfolio', tone: 'text-ok' },
  { text: `[ ok ] build      bundled ${APP_CATALOG.length} apps and ${THEMES.length} themes`, tone: 'text-ok' },
  { text: `[ ok ] test       ${projects.length}/${projects.length} projects passing`, tone: 'text-ok' },
  { text: '[ ok ] release    experience tagged v2.0', tone: 'text-ok' },
  { text: '[ ok ] deploy     hassaan.os is live', tone: 'text-accent' },
]

// The boot screen is a CI run. Click or press any key to skip it.
export default function BootSequence({ onDone }) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    const delay = count === 0 ? 250 : count >= STEPS.length ? 500 : 330
    const id = setTimeout(() => (count >= STEPS.length ? onDone() : setCount(count + 1)), delay)
    return () => clearTimeout(id)
  }, [count, onDone])

  useEffect(() => {
    window.addEventListener('keydown', onDone)
    return () => window.removeEventListener('keydown', onDone)
  }, [onDone])

  return (
    <div
      role="status"
      aria-label="Starting up"
      onClick={onDone}
      className="wallpaper fixed inset-0 z-[2000] flex cursor-pointer flex-col justify-center gap-2 px-8 font-mono text-sm sm:px-24"
    >
      {STEPS.slice(0, count).map((step) => (
        <p key={step.text} className={`m-0 ${step.tone}`}>
          {step.text}
        </p>
      ))}
      {count < STEPS.length && <span className="caret" aria-hidden="true" />}
      <p className="mt-8 text-xs text-muted">Click or press any key to skip.</p>
    </div>
  )
}
