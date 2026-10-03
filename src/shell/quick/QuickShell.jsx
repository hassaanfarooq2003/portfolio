import { useEffect } from 'react'
import { links } from '../../data/links'
import { usePalette } from '../../palette/PaletteContext'
import AboutView from '../../views/AboutView'
import ClusterView from '../../views/ClusterView'
import ContactView from '../../views/ContactView'
import ExperienceView from '../../views/ExperienceView'
import ProjectsView from '../../views/ProjectsView'
import { SECTION_BY_APP, QUICK_SECTIONS, formatHash, parseHash } from '../routes'
import { useShell } from '../ShellContext'
import PipelineProgress from './PipelineProgress'
import QuickHeader from './QuickHeader'
import Section from './Section'
import useActiveSection from './useActiveSection'

const SECTION_IDS = QUICK_SECTIONS.map((s) => s.id)

export default function QuickShell() {
  const { registerHandler } = useShell()
  const { openPalette } = usePalette()
  const activeIndex = useActiveSection(SECTION_IDS)

  // In Quick view an "app" is a section to scroll to (or the palette for the ones without a section).
  useEffect(() => {
    const open = (appId, params) => {
      if (appId === 'resume') {
        window.open(links.resume, '_blank', 'noopener,noreferrer')
        return
      }
      if (appId === 'terminal') {
        openPalette('> ')
        return
      }
      if (appId === 'settings') {
        openPalette('use-context ')
        return
      }
      const section = SECTION_BY_APP[appId]
      if (!section) return
      const targetId = appId === 'project' && params?.slug ? `project-${params.slug}` : section
      document.getElementById(targetId)?.scrollIntoView({ block: 'start' })
      window.history.replaceState(null, '', formatHash(appId, params))
    }

    const unregister = registerHandler(open)

    const route = parseHash()
    if (route) requestAnimationFrame(() => open(route.appId, route.params))
    const onHashChange = () => {
      const next = parseHash()
      if (next) open(next.appId, next.params)
    }
    window.addEventListener('hashchange', onHashChange)

    return () => {
      unregister()
      window.removeEventListener('hashchange', onHashChange)
    }
  }, [registerHandler, openPalette])

  return (
    <div className="min-h-screen bg-canvas text-fg">
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <QuickHeader />
      <PipelineProgress activeIndex={activeIndex} />

      <main id="main" className="mx-auto max-w-5xl px-4 pb-16 sm:px-6">
        <Section id="about" label="About">
          <div className="space-y-8 pt-4">
            <AboutView variant="hero" />
            <div className="space-y-3">
              <p className="font-mono text-xs text-muted">
                <span className="text-accent">$</span> kubectl get pods
                <span className="text-muted"> (these are my skills, click one to kill it)</span>
              </p>
              <ClusterView variant="compact" />
            </div>
          </div>
        </Section>

        <Section
          id="skills"
          stage="build"
          title="Skills"
          intro="Every skill runs as a pod. Terminate one, or release the chaos monkey, and watch the cluster heal itself."
        >
          <ClusterView variant="full" />
        </Section>

        <Section
          id="projects"
          stage="test"
          title="Projects"
          intro="Ten projects across full-stack, DevOps and machine learning, each shipped like an image in a registry."
        >
          <ProjectsView variant="full" />
        </Section>

        <Section
          id="experience"
          stage="release"
          title="Experience"
          intro="Internships and teaching roles, shown as the commit history they are."
        >
          <ExperienceView />
        </Section>

        <Section
          id="contact"
          stage="deploy"
          title="Contact"
          intro="Pipeline green. Ready to ship something together?"
        >
          <ContactView />
        </Section>
      </main>

      <footer className="border-t border-line py-8 text-center font-mono text-xs text-muted">
        Built with React and Tailwind, and a small amount of chaos.
      </footer>
    </div>
  )
}
