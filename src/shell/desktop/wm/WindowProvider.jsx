import { useMemo, useReducer } from 'react'
import { getAppMeta, windowTitle } from '../../../apps/catalog'
import { WindowActionsContext, WindowStateContext } from './WindowContext'
import { initialWindows, windowsReducer } from './windowsReducer'

export default function WindowProvider({ children }) {
  const [state, dispatch] = useReducer(windowsReducer, initialWindows)

  const actions = useMemo(
    () => ({
      open(appId, params) {
        const meta = getAppMeta(appId)
        if (!meta) return
        const key = appId === 'project' ? `project:${params?.slug}` : appId
        dispatch({
          type: 'OPEN',
          key,
          appId,
          params,
          title: windowTitle(appId, params),
          size: meta.size,
          pos: meta.pos,
        })
      },
      focus: (key) => dispatch({ type: 'FOCUS', key }),
      close: (key) => dispatch({ type: 'CLOSE', key }),
      minimize: (key) => dispatch({ type: 'MINIMIZE', key }),
      toggleMax: (key) => dispatch({ type: 'TOGGLE_MAX', key }),
      commitPos: (key, x, y) => dispatch({ type: 'COMMIT_POS', key, x, y }),
      setDesk: (w, h) => dispatch({ type: 'SET_DESK', w, h }),
    }),
    [],
  )

  return (
    <WindowStateContext.Provider value={state}>
      <WindowActionsContext.Provider value={actions}>{children}</WindowActionsContext.Provider>
    </WindowStateContext.Provider>
  )
}
