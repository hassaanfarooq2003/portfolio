import { createContext, useContext } from 'react'

// State and actions live in separate contexts so components that only dispatch never re-render on state changes.
export const WindowStateContext = createContext(null)
export const WindowActionsContext = createContext(null)

export function useWindowState() {
  const ctx = useContext(WindowStateContext)
  if (!ctx) throw new Error('useWindowState must be used inside WindowProvider')
  return ctx
}

export function useWindowActions() {
  const ctx = useContext(WindowActionsContext)
  if (!ctx) throw new Error('useWindowActions must be used inside WindowProvider')
  return ctx
}
