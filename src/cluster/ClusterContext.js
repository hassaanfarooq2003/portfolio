import { createContext, useContext } from 'react'

export const ClusterContext = createContext(null)

export function useCluster() {
  const ctx = useContext(ClusterContext)
  if (!ctx) throw new Error('useCluster must be used inside ClusterProvider')
  return ctx
}
