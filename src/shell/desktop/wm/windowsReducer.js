const CASCADE = 28

export const initialWindows = {
  wins: {},
  // Back-to-front stacking order; z-index is derived from the position in this list.
  order: [],
  focused: null,
  desk: { w: 1280, h: 720 },
}

const clamp = (value, min, max) => Math.max(min, Math.min(max, value))

function topVisible(wins, order) {
  for (let i = order.length - 1; i >= 0; i -= 1) {
    if (!wins[order[i]].minimized) return order[i]
  }
  return null
}

function raise(state, key) {
  return {
    ...state,
    wins: { ...state.wins, [key]: { ...state.wins[key], minimized: false } },
    order: [...state.order.filter((k) => k !== key), key],
    focused: key,
  }
}

export function windowsReducer(state, action) {
  switch (action.type) {
    case 'SET_DESK': {
      const desk = { w: action.w, h: action.h }
      const wins = Object.fromEntries(
        Object.entries(state.wins).map(([key, win]) => [
          key,
          {
            ...win,
            x: clamp(win.x, 0, Math.max(0, desk.w - win.w)),
            y: clamp(win.y, 0, Math.max(0, desk.h - win.h)),
          },
        ]),
      )
      return { ...state, desk, wins }
    }

    case 'OPEN': {
      if (state.wins[action.key]) return raise(state, action.key)
      const offset = (Object.keys(state.wins).length % 6) * CASCADE
      const w = Math.min(action.size.w, state.desk.w - 16)
      const h = Math.min(action.size.h, state.desk.h - 16)
      const win = {
        key: action.key,
        appId: action.appId,
        params: action.params ?? {},
        title: action.title,
        w,
        h,
        x: clamp(action.pos.x + offset, 0, Math.max(0, state.desk.w - w)),
        y: clamp(action.pos.y + offset, 0, Math.max(0, state.desk.h - h)),
        minimized: false,
        maximized: false,
      }
      return {
        ...state,
        wins: { ...state.wins, [action.key]: win },
        order: [...state.order, action.key],
        focused: action.key,
      }
    }

    case 'FOCUS': {
      const win = state.wins[action.key]
      if (!win) return state
      const onTop = state.order[state.order.length - 1] === action.key
      if (state.focused === action.key && !win.minimized && onTop) return state
      return raise(state, action.key)
    }

    case 'CLOSE': {
      if (!state.wins[action.key]) return state
      const wins = { ...state.wins }
      delete wins[action.key]
      const order = state.order.filter((k) => k !== action.key)
      return { ...state, wins, order, focused: state.focused === action.key ? topVisible(wins, order) : state.focused }
    }

    case 'MINIMIZE': {
      const win = state.wins[action.key]
      if (!win) return state
      const wins = { ...state.wins, [action.key]: { ...win, minimized: true } }
      return { ...state, wins, focused: state.focused === action.key ? topVisible(wins, state.order) : state.focused }
    }

    case 'TOGGLE_MAX': {
      const win = state.wins[action.key]
      if (!win) return state
      return { ...state, wins: { ...state.wins, [action.key]: { ...win, maximized: !win.maximized } } }
    }

    case 'COMMIT_POS': {
      const win = state.wins[action.key]
      if (!win) return state
      const x = clamp(action.x, 0, Math.max(0, state.desk.w - win.w))
      const y = clamp(action.y, 0, Math.max(0, state.desk.h - win.h))
      return { ...state, wins: { ...state.wins, [action.key]: { ...win, x, y } } }
    }

    default:
      return state
  }
}
