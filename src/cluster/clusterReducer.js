const MAX_LOG = 40

export function initialCluster(pods) {
  return {
    pods,
    log: [{ id: 0, time: '--:--:--', tone: 'info', text: `cluster ready: ${pods.length}/${pods.length} pods Running` }],
    seq: 1,
    recovering: false,
    announce: '',
  }
}

function withLog(state, entry) {
  return {
    ...state,
    log: [...state.log, { id: state.seq, ...entry }].slice(-MAX_LOG),
    seq: state.seq + 1,
  }
}

const updatePod = (pods, id, patch) => pods.map((p) => (p.id === id ? { ...p, ...patch } : p))

export function clusterReducer(state, action) {
  switch (action.type) {
    case 'chaos':
      return withLog(
        { ...state, recovering: true, announce: `Chaos monkey is terminating ${action.count} pods.` },
        { time: action.time, tone: 'warn', text: `chaos-monkey: terminating ${action.count} pods` },
      )

    case 'terminate': {
      const pod = state.pods.find((p) => p.id === action.id)
      if (!pod || pod.status !== 'Running') return state
      return withLog(
        { ...state, pods: updatePod(state.pods, pod.id, { status: 'Terminating' }) },
        { time: action.time, tone: 'bad', text: `pod/${pod.name} Terminating` },
      )
    }

    case 'pending': {
      const pod = state.pods.find((p) => p.id === action.id)
      if (!pod) return state
      return withLog(
        { ...state, pods: updatePod(state.pods, pod.id, { status: 'Pending', name: action.name, restarts: pod.restarts + 1 }) },
        { time: action.time, tone: 'warn', text: `replicaset/${pod.id}: creating pod/${action.name}` },
      )
    }

    case 'running': {
      const pod = state.pods.find((p) => p.id === action.id)
      if (!pod) return state
      const pods = updatePod(state.pods, pod.id, { status: 'Running' })
      let next = withLog(
        { ...state, pods },
        { time: action.time, tone: 'ok', text: `pod/${pod.name} Running (restarts: ${pod.restarts})` },
      )
      if (state.recovering && pods.every((p) => p.status === 'Running')) {
        next = withLog(
          { ...next, recovering: false, announce: `Cluster healed. All ${pods.length} pods are running.` },
          { time: action.time, tone: 'ok', text: `cluster healed: ${pods.length}/${pods.length} pods Running` },
        )
      }
      return next
    }

    default:
      return state
  }
}
