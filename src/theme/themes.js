export const THEME_KEY = 'portfolio:theme'
export const DEFAULT_THEME = 'dark-cluster'

// Each theme is presented as a kubectl context.
export const THEMES = [
  { id: 'dark-cluster', label: 'Dark cluster', scheme: 'dark' },
  { id: 'blueprint', label: 'Blueprint', scheme: 'dark' },
  { id: 'light-vellum', label: 'Light vellum', scheme: 'light' },
  { id: 'retro-crt', label: 'Retro CRT', scheme: 'dark' },
]

export const isTheme = (id) => THEMES.some((t) => t.id === id)
