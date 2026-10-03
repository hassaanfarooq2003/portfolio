import { Suspense, lazy } from 'react'
import QuickShell from './quick/QuickShell'
import { useShell } from './ShellContext'

// The window manager and drag code only download for the desktop shell.
const DesktopShell = lazy(() => import('./desktop/DesktopShell'))

function DesktopFallback() {
  return (
    <div className="wallpaper flex h-screen items-center justify-center font-mono text-sm text-muted" role="status">
      booting hassaan.os<span className="caret ml-1" aria-hidden="true" />
    </div>
  )
}

export default function ShellSwitch() {
  const { mode } = useShell()

  if (mode === 'desktop') {
    return (
      <Suspense fallback={<DesktopFallback />}>
        <DesktopShell />
      </Suspense>
    )
  }

  return <QuickShell />
}
