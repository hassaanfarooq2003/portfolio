import { useCallback, useEffect, useMemo, useReducer, useRef } from 'react'
import { skills } from '../data/skills'
import { ClusterContext } from './ClusterContext'
import { clusterReducer, initialCluster } from './clusterReducer'
import { createPods, makePodName, pickVictims } from './podLogic'

const timeStamp = () => new Date().toLocaleTimeString('en-GB')

// Transitions still happen with reduced motion, they just play out much faster.
const timeScale = () => (window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 0.15 : 1)

export default function ClusterProvider({ children }) {
  const [state, dispatch] = useReducer(clusterReducer, null, () => initialCluster(createPods(skills)))
  const stateRef = useRef(state)
  const timers = useRef(new Set())

  useEffect(() => {
    stateRef.current = state
  }, [state])

  useEffect(() => {
    const pending = timers.current
    return () => {
      pending.forEach(clearTimeout)
      pending.clear()
    }
  }, [])

  const later = useCallback((fn, ms) => {
    const id = setTimeout(() => {
      timers.current.delete(id)
      fn()
    }, ms * timeScale())
    timers.current.add(id)
  }, [])

  const kill = useCallback(
    (target) => {
      const pod = stateRef.current.pods.find((p) => p.id === target || p.name === target)
      if (!pod || pod.status !== 'Running') return false

      // Mark it now so a second call in the same tick cannot schedule the restart twice.
      stateRef.current = {
        ...stateRef.current,
        pods: stateRef.current.pods.map((p) => (p.id === pod.id ? { ...p, status: 'Terminating' } : p)),
      }
      dispatch({ type: 'terminate', id: pod.id, time: timeStamp() })

      const nextName = makePodName(pod.id)
      later(() => dispatch({ type: 'pending', id: pod.id, name: nextName, time: timeStamp() }), 650)
      later(() => dispatch({ type: 'running', id: pod.id, time: timeStamp() }), 1350 + Math.random() * 800)
      return true
    },
    [later],
  )

  const chaos = useCallback(() => {
    const victims = pickVictims(stateRef.current.pods)
    if (victims.length === 0) return 0
    dispatch({ type: 'chaos', count: victims.length, time: timeStamp() })
    victims.forEach((pod, i) => later(() => kill(pod.id), i * 250))
    return victims.length
  }, [kill, later])

  const value = useMemo(
    () => ({
      pods: state.pods,
      log: state.log,
      announce: state.announce,
      desired: state.pods.length,
      running: state.pods.filter((p) => p.status === 'Running').length,
      kill,
      chaos,
    }),
    [state, kill, chaos],
  )

  return <ClusterContext.Provider value={value}>{children}</ClusterContext.Provider>
}
