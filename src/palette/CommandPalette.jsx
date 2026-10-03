import { useEffect, useId, useMemo, useRef, useState } from 'react'
import { useCommandContext } from '../commands/useCommandContext'
import Icon from '../components/ui/Icon'
import Kbd from '../components/ui/Kbd'
import { buildEntries } from './entries'

const TONE = {
  out: 'text-fg',
  ok: 'text-ok',
  warn: 'text-warn',
  err: 'text-bad',
  dim: 'text-muted',
  cmd: 'text-accent',
}

export default function CommandPalette({ initialQuery, onClose }) {
  const ctx = useCommandContext()
  const listId = useId()
  const [query, setQuery] = useState(initialQuery)
  const [active, setActive] = useState(0)
  const [output, setOutput] = useState(null)
  const inputRef = useRef(null)

  const entries = useMemo(() => buildEntries(query, ctx), [query, ctx])
  const activeIndex = Math.min(active, Math.max(entries.length - 1, 0))
  const optionId = (index) => `${listId}-opt-${index}`

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  useEffect(() => {
    document.getElementById(`${listId}-opt-${activeIndex}`)?.scrollIntoView({ block: 'nearest' })
  }, [listId, activeIndex, entries])

  const execute = (entry) => {
    if (!entry) return
    const result = entry.exec()
    if (result.navigates || result.lines.length === 0) {
      onClose()
      return
    }
    setOutput(result.lines)
  }

  const onKeyDown = (event) => {
    if (event.key === 'Escape') {
      event.preventDefault()
      onClose()
    } else if (event.key === 'ArrowDown') {
      event.preventDefault()
      setActive((activeIndex + 1) % Math.max(entries.length, 1))
    } else if (event.key === 'ArrowUp') {
      event.preventDefault()
      setActive((activeIndex - 1 + entries.length) % Math.max(entries.length, 1))
    } else if (event.key === 'Enter') {
      event.preventDefault()
      execute(entries[activeIndex])
    } else if (event.key === 'Tab') {
      // Keep focus inside the dialog; the input is its only tab stop.
      event.preventDefault()
    }
  }

  return (
    <div
      className="fixed inset-0 z-[1000] flex items-start justify-center bg-black/55 px-4 pt-[12vh]"
      onPointerDown={(event) => {
        if (event.target === event.currentTarget) onClose()
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Command palette"
        className="w-full max-w-xl overflow-hidden rounded-xl border border-line bg-surface shadow-[var(--shadow-win)]"
      >
        <div className="flex items-center gap-3 border-b border-line px-4 py-3">
          <Icon name="search" size={18} className="shrink-0 text-muted" />
          <input
            ref={inputRef}
            value={query}
            onChange={(event) => {
              setQuery(event.target.value)
              setActive(0)
              setOutput(null)
            }}
            onKeyDown={onKeyDown}
            role="combobox"
            aria-expanded="true"
            aria-controls={listId}
            aria-activedescendant={entries.length ? optionId(activeIndex) : undefined}
            aria-autocomplete="list"
            aria-label="Search commands, apps and projects"
            placeholder="Type a command, app or project. Start with > for the terminal."
            autoComplete="off"
            spellCheck="false"
            className="min-w-0 flex-1 bg-transparent font-mono text-sm text-fg outline-none placeholder:text-muted"
          />
          <Kbd>esc</Kbd>
        </div>

        <ul
          id={listId}
          role="listbox"
          aria-label="Results"
          onMouseDown={(event) => event.preventDefault()}
          className="max-h-72 overflow-y-auto p-1.5"
        >
          {entries.length === 0 && (
            <li className="px-3 py-6 text-center text-sm text-muted">Nothing matches. Try another word.</li>
          )}
          {entries.map((entry, index) => (
            <li
              key={entry.key}
              id={optionId(index)}
              role="option"
              aria-selected={index === activeIndex}
              onPointerMove={() => setActive(index)}
              onClick={() => execute(entry)}
              className={`flex cursor-pointer items-center gap-3 rounded-md px-3 py-2 ${
                index === activeIndex ? 'bg-surface-2' : ''
              }`}
            >
              <span className="min-w-0 flex-1">
                <span className="block truncate font-mono text-sm text-fg">{entry.label}</span>
                <span className="block truncate text-xs text-muted">{entry.hint}</span>
              </span>
              <span className="shrink-0 rounded border border-line px-1.5 py-0.5 font-mono text-[10px] uppercase tracking-wide text-muted">
                {entry.group}
              </span>
            </li>
          ))}
        </ul>

        {output && (
          <div role="status" className="max-h-48 overflow-y-auto border-t border-line bg-canvas px-4 py-3 font-mono text-xs">
            {output.map((line, index) => (
              <div key={index} className={`whitespace-pre-wrap ${TONE[line.tone] ?? TONE.out}`}>
                {line.text}
              </div>
            ))}
          </div>
        )}

        <div className="flex items-center justify-between border-t border-line px-4 py-2 text-xs text-muted">
          <span className="flex items-center gap-2">
            <Kbd>up</Kbd>
            <Kbd>down</Kbd> move
          </span>
          <span className="flex items-center gap-2">
            <Kbd>enter</Kbd> run
          </span>
        </div>
      </div>
    </div>
  )
}
