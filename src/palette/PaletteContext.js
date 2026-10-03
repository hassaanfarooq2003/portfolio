import { createContext, useContext } from 'react'

export const PaletteContext = createContext(null)

export function usePalette() {
  const ctx = useContext(PaletteContext)
  if (!ctx) throw new Error('usePalette must be used inside PaletteProvider')
  return ctx
}
