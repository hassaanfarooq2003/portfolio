import ClusterProvider from './cluster/ClusterProvider'
import PaletteProvider from './palette/PaletteProvider'
import ShellProvider from './shell/ShellProvider'
import ShellSwitch from './shell/ShellSwitch'
import ThemeProvider from './theme/ThemeProvider'

// Theme, cluster and palette state sit above the shells, so they survive switching views.
export default function App() {
  return (
    <ThemeProvider>
      <ClusterProvider>
        <ShellProvider>
          <PaletteProvider>
            <ShellSwitch />
          </PaletteProvider>
        </ShellProvider>
      </ClusterProvider>
    </ThemeProvider>
  )
}
