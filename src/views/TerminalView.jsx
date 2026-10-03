import { useEffect, useRef, useState, useSyncExternalStore } from 'react'
import { complete, runLine } from '../commands/registry'
import { terminalStore } from '../commands/terminalStore'
import { useCommandContext } from '../commands/useCommandContext'

const TONE = {
  out: 'text-fg',
  ok: 'text-ok',
  warn: 'text-warn',
  err: 'text-bad',
  dim: 'text-muted',
  cmd: 'text-accent',
}

const commonPrefix = (values) =>
  values.reduce((prefix, value) => {
    let i = 0
    while (i < prefix.length && i < value.length && prefix[i].toLowerCase() === value[i].toLowerCase()) i += 1
    return prefix.slice(0, i)
  })

function OutputLine({ line }) {
  const classes = `whitespace-pre-wrap break-words ${TONE[line.tone] ?? TONE.out}`
  if (!line.href) return <div className={classes}>{line.text}</div>
  return (
    <div className={classes}>
      <a
        href={line.href}
        target={line.href.startsWith('http') ? '_blank' : undefined}
        rel="noopener noreferrer"
        className="underline decoration-line underline-offset-2 hover:decoration-accent"
      >
        {line.text}
      </a>
    </div>
  )
}

export default function TerminalView() {
  const ctx = useCommandContext()
  const { lines, history } = useSyncExternalStore(terminalStore.subscribe, terminalStore.getSnapshot)
  const [value, setValue] = useState('')
  const [cursor, setCursor] = useState(null)
  const inputRef = useRef(null)
  const scrollRef = useRef(null)

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  useEffect(() => {
    const el = scrollRef.current
    if (el) el.scrollTop = el.scrollHeight
  }, [lines])

  const submit = () => {
    const input = value.trim()
    setValue('')
    setCursor(null)
    if (!input) return
    terminalStore.remember(input)
    terminalStore.push([{ tone: 'cmd', text: `$ ${input}` }])
    const { lines: result } = runLine(ctx, input)
    if (result.length > 0) terminalStore.push(result)
  }

  const tabComplete = () => {
    const options = complete(value)
    if (options.length === 0) return
    if (options.length === 1) {
      setValue(`${options[0]} `)
      return
    }
    setValue(commonPrefix(options))
    terminalStore.push([{ tone: 'dim', text: options.map((o) => o.split(' ').pop()).join('   ') }])
  }

  const onKeyDown = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault()
      submit()
    } else if (event.key === 'ArrowUp') {
      event.preventDefault()
      if (history.length === 0) return
      const next = cursor === null ? history.length - 1 : Math.max(0, cursor - 1)
      setCursor(next)
      setValue(history[next])
    } else if (event.key === 'ArrowDown') {
      event.preventDefault()
      if (cursor === null) return
      if (cursor >= history.length - 1) {
        setCursor(null)
        setValue('')
      } else {
        setCursor(cursor + 1)
        setValue(history[cursor + 1])
      }
    } else if (event.key === 'Tab') {
      event.preventDefault()
      tabComplete()
    } else if (event.ctrlKey && event.key.toLowerCase() === 'l') {
      event.preventDefault()
      terminalStore.clear()
    } else if (event.ctrlKey && event.key.toLowerCase() === 'c') {
      event.preventDefault()
      terminalStore.push([{ tone: 'dim', text: `$ ${value}^C` }])
      setValue('')
      setCursor(null)
    }
  }

  return (
    <div
      className="flex h-full min-h-0 flex-col bg-canvas font-mono text-[13px] leading-relaxed"
      onClick={() => {
        if (!window.getSelection()?.toString()) inputRef.current?.focus()
      }}
    >
      <div ref={scrollRef} role="log" aria-label="Terminal output" className="min-h-0 flex-1 overflow-y-auto p-3">
        {lines.map((line) => (
          <OutputLine key={line.id} line={line} />
        ))}
      </div>
      <div className="flex items-center gap-2 border-t border-line px-3 py-2">
        <label htmlFor="terminal-input" className="shrink-0 text-accent">
          visitor@hassaan.dev:~$
        </label>
        <input
          id="terminal-input"
          ref={inputRef}
          value={value}
          onChange={(event) => setValue(event.target.value)}
          onKeyDown={onKeyDown}
          spellCheck="false"
          autoCapitalize="off"
          autoCorrect="off"
          autoComplete="off"
          aria-label="Terminal input"
          className="min-w-0 flex-1 bg-transparent text-fg outline-none"
        />
      </div>
    </div>
  )
}
