// Terminal output lives outside the window so closing and reopening it keeps history.
const WELCOME = [
  { tone: 'dim', text: "hassaan.dev v2.0. Type 'help' to see what you can do." },
  { tone: 'dim', text: 'Try: kubectl get pods, chaos, theme blueprint, sudo hire-me' },
]

let seq = 0
const stamp = (lines) => lines.map((line) => ({ id: seq++, ...line }))

let state = { lines: stamp(WELCOME), history: [] }
const listeners = new Set()

function emit(next) {
  state = next
  listeners.forEach((listener) => listener())
}

export const terminalStore = {
  subscribe(listener) {
    listeners.add(listener)
    return () => listeners.delete(listener)
  },
  getSnapshot() {
    return state
  },
  push(lines) {
    emit({ ...state, lines: [...state.lines, ...stamp(lines)].slice(-300) })
  },
  clear() {
    emit({ ...state, lines: [] })
  },
  remember(command) {
    if (!command || state.history[state.history.length - 1] === command) return
    emit({ ...state, history: [...state.history, command].slice(-50) })
  },
}
