import { useCallback, useEffect, useMemo, useState } from 'react'
import { ThemeContext } from './ThemeContext'
import { DEFAULT_THEME, THEMES, THEME_KEY, isTheme } from './themes'

// index.html applies the saved theme before first paint; start from that value.
const initialTheme = () => {
  const applied = document.documentElement.getAttribute('data-theme')
  return isTheme(applied) ? applied : DEFAULT_THEME
}

export default function ThemeProvider({ children }) {
  const [theme, setThemeState] = useState(initialTheme)

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])

  const setTheme = useCallback((id) => {
    if (!isTheme(id)) return false
    setThemeState(id)
    try {
      localStorage.setItem(THEME_KEY, id)
    } catch {
      // storage can be unavailable (private mode); the theme still applies for this visit
    }
    return true
  }, [])

  const value = useMemo(() => ({ theme, setTheme, themes: THEMES }), [theme, setTheme])

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}
