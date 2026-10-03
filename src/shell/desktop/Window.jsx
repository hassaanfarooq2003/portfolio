import { Suspense, useEffect } from 'react'
import { animate, motion, useDragControls, useMotionValue, useReducedMotion } from 'framer-motion'
import { getApp } from '../../apps/registry'
import Icon from '../../components/ui/Icon'
import { useWindowActions } from './wm/WindowContext'

const NUDGE = 16
const clamp = (value, min, max) => Math.max(min, Math.min(max, value))

function TitleButton({ label, icon, onClick, danger = false }) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      onDoubleClick={(event) => event.stopPropagation()}
      className={`flex h-6 w-6 cursor-pointer items-center justify-center rounded text-muted transition-colors hover:bg-line ${
        danger ? 'hover:text-bad' : 'hover:text-fg'
      }`}
    >
      <Icon name={icon} size={13} />
    </button>
  )
}

export default function Window({ win, z, focused, deskRef }) {
  const { focus, close, minimize, toggleMax, commitPos } = useWindowActions()
  const app = getApp(win.appId)
  const x = useMotionValue(win.x)
  const y = useMotionValue(win.y)
  const controls = useDragControls()
  const reduceMotion = useReducedMotion()

  // Keep the motion values in step with state (maximize, restore, desk resize, keyboard moves).
  useEffect(() => {
    const duration = reduceMotion ? 0 : 0.2
    const moveX = animate(x, win.maximized ? 0 : win.x, { duration })
    const moveY = animate(y, win.maximized ? 0 : win.y, { duration })
    return () => {
      moveX.stop()
      moveY.stop()
    }
  }, [win.maximized, win.x, win.y, reduceMotion, x, y])

  if (!app) return null
  const View = app.View

  // Dragging starts only from the title bar, so window content stays selectable.
  const onTitlePointerDown = (event) => {
    if (win.maximized || event.button !== 0 || event.target.closest('button')) return
    controls.start(event)
  }

  const onTitleKeyDown = (event) => {
    if (event.target !== event.currentTarget) return
    if (event.key === 'Escape') {
      event.preventDefault()
      close(win.key)
      return
    }
    const step = event.shiftKey ? NUDGE * 4 : NUDGE
    const delta = {
      ArrowLeft: [-step, 0],
      ArrowRight: [step, 0],
      ArrowUp: [0, -step],
      ArrowDown: [0, step],
    }[event.key]
    if (!delta || win.maximized || !deskRef.current) return
    event.preventDefault()
    const maxX = Math.max(0, deskRef.current.clientWidth - win.w)
    const maxY = Math.max(0, deskRef.current.clientHeight - win.h)
    const nextX = clamp(x.get() + delta[0], 0, maxX)
    const nextY = clamp(y.get() + delta[1], 0, maxY)
    x.set(nextX)
    y.set(nextY)
    commitPos(win.key, nextX, nextY)
  }

  return (
    <motion.section
      role="dialog"
      aria-label={win.title}
      onPointerDownCapture={() => focus(win.key)}
      drag={!win.maximized}
      dragControls={controls}
      dragListener={false}
      dragMomentum={false}
      dragElastic={0}
      dragConstraints={deskRef}
      onDragEnd={() => commitPos(win.key, x.get(), y.get())}
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: win.minimized ? 0 : 1, scale: win.minimized ? 0.96 : 1 }}
      transition={{ duration: reduceMotion ? 0 : 0.15 }}
      style={{
        x,
        y,
        zIndex: z,
        width: win.maximized ? '100%' : win.w,
        height: win.maximized ? '100%' : win.h,
        visibility: win.minimized ? 'hidden' : 'visible',
      }}
      className={`absolute left-0 top-0 overflow-hidden rounded-[var(--radius-win)] border bg-surface shadow-[var(--shadow-win)] ${
        focused ? 'border-accent/70' : 'border-line'
      }`}
    >
      <div className="flex h-full min-h-0 flex-col" inert={win.minimized}>
        <div
          role="group"
          aria-label={`${win.title} title bar. Drag or use the arrow keys to move. Escape closes.`}
          tabIndex={0}
          onPointerDown={onTitlePointerDown}
          onKeyDown={onTitleKeyDown}
          onDoubleClick={() => toggleMax(win.key)}
          className={`flex shrink-0 touch-none select-none items-center gap-2 border-b border-line bg-surface-2 px-3 py-1.5 ${
            win.maximized ? '' : 'cursor-grab active:cursor-grabbing'
          }`}
        >
          <Icon name={app.icon} size={14} className="shrink-0 text-accent" />
          <span className="min-w-0 flex-1 truncate font-mono text-xs">{win.title}</span>
          <div className="flex items-center gap-0.5">
            <TitleButton label="Minimize" icon="minus" onClick={() => minimize(win.key)} />
            <TitleButton
              label={win.maximized ? 'Restore' : 'Maximize'}
              icon="maximize"
              onClick={() => toggleMax(win.key)}
            />
            <TitleButton label="Close" icon="x" danger onClick={() => close(win.key)} />
          </div>
        </div>

        <div className={`min-h-0 flex-1 ${app.flush ? 'overflow-hidden' : 'overflow-y-auto p-5'}`}>
          <Suspense fallback={<p className="font-mono text-xs text-muted">loading...</p>}>
            <View params={win.params} />
          </Suspense>
        </div>
      </div>
    </motion.section>
  )
}
