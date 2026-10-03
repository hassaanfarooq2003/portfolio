import { useMemo } from 'react'
import { useCluster } from '../cluster/ClusterContext'
import { useShell } from '../shell/ShellContext'
import { useTheme } from '../theme/ThemeContext'
import { terminalStore } from './terminalStore'

// Everything a command may need to touch. Shared by the terminal and the palette.
export function useCommandContext() {
  const { openApp, mode, setMode, canDesktop } = useShell()
  const { theme, themes, setTheme } = useTheme()
  const cluster = useCluster()

  return useMemo(
    () => ({
      openApp,
      mode,
      setMode,
      canDesktop,
      theme,
      themes,
      setTheme,
      cluster,
      clearTerminal: terminalStore.clear,
    }),
    [openApp, mode, setMode, canDesktop, theme, themes, setTheme, cluster],
  )
}
