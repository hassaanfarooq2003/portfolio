import { useEffect, useRef } from 'react'
import { useCluster } from '../cluster/ClusterContext'
import Button from '../components/ui/Button'
import Icon from '../components/ui/Icon'
import { skills } from '../data/skills'

const skillById = Object.fromEntries(skills.map((s) => [s.id, s]))

const STATUS_TEXT = { Running: 'text-ok', Terminating: 'text-bad', Pending: 'text-warn' }
const STATUS_BORDER = { Running: 'border-line', Terminating: 'border-bad', Pending: 'border-warn' }
const LOG_TEXT = { ok: 'text-ok', warn: 'text-warn', bad: 'text-bad', info: 'text-muted' }

function StatusDot({ status }) {
  return (
    <span
      aria-hidden="true"
      className={`h-2 w-2 shrink-0 rounded-full bg-current ${status === 'Pending' ? 'animate-pulse' : ''}`}
    />
  )
}

function EventLog({ log }) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (el) el.scrollTop = el.scrollHeight
  }, [log])

  return (
    <div
      ref={ref}
      role="log"
      aria-live="off"
      aria-label="Cluster events"
      tabIndex={0}
      className="h-36 overflow-y-auto rounded-lg border border-line bg-canvas p-3 font-mono text-xs leading-relaxed"
    >
      {log.map((entry) => (
        <div key={entry.id} className={LOG_TEXT[entry.tone] ?? 'text-muted'}>
          <span className="text-muted">{entry.time}</span> {entry.text}
        </div>
      ))}
    </div>
  )
}

export default function ClusterView({ variant = 'full' }) {
  const { pods, log, announce, desired, running, kill, chaos } = useCluster()
  const compact = variant === 'compact'

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="font-mono text-sm">
          <span className={running === desired ? 'text-ok' : 'text-warn'}>
            {running}/{desired}
          </span>{' '}
          pods Running
        </p>
        <Button onClick={chaos}>
          <Icon name="zap" size={16} /> Chaos monkey
        </Button>
      </div>

      <ul className={`m-0 list-none p-0 ${compact ? 'flex flex-wrap gap-2' : 'grid gap-3 sm:grid-cols-2'}`}>
        {pods.map((pod) => {
          const skill = skillById[pod.id]
          const label = `${skill.name}, ${pod.status}. Press to terminate this pod.`

          if (compact) {
            return (
              <li key={pod.id}>
                <button
                  type="button"
                  aria-label={label}
                  onClick={() => kill(pod.id)}
                  className={`flex cursor-pointer items-center gap-2 rounded-md border bg-surface px-2.5 py-1.5 text-xs transition-colors hover:bg-surface-2 ${STATUS_BORDER[pod.status]}`}
                >
                  <span className={STATUS_TEXT[pod.status]}>
                    <StatusDot status={pod.status} />
                  </span>
                  <span>{skill.name}</span>
                  {pod.status !== 'Running' && (
                    <span className={`font-mono ${STATUS_TEXT[pod.status]}`}>{pod.status}</span>
                  )}
                </button>
              </li>
            )
          }

          return (
            <li key={pod.id}>
              <button
                type="button"
                aria-label={`${skill.name}. ${skill.description} Status: ${pod.status}. Press to terminate this pod.`}
                onClick={() => kill(pod.id)}
                className={`flex h-full w-full cursor-pointer flex-col gap-1.5 rounded-lg border bg-surface p-3.5 text-left transition-colors hover:bg-surface-2 ${STATUS_BORDER[pod.status]}`}
              >
                <span className="flex items-center justify-between gap-2">
                  <span className="font-medium">{skill.name}</span>
                  <span className={`flex items-center gap-1.5 font-mono text-xs ${STATUS_TEXT[pod.status]}`}>
                    <StatusDot status={pod.status} />
                    {pod.status}
                  </span>
                </span>
                <span className="text-sm leading-snug text-muted">{skill.description}</span>
                <span className="mt-auto pt-1 font-mono text-[11px] text-muted">
                  pod/{pod.name} / restarts {pod.restarts} / click to kill
                </span>
              </button>
            </li>
          )
        })}
      </ul>

      {!compact && (
        <>
          <EventLog log={log} />
          <p role="status" className="sr-only">
            {announce}
          </p>
        </>
      )}
    </div>
  )
}
