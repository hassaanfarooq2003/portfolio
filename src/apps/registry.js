import { lazy } from 'react'
import { getAppMeta } from './catalog'
import AboutView from '../views/AboutView'
import ClusterView from '../views/ClusterView'
import ContactView from '../views/ContactView'
import ExperienceView from '../views/ExperienceView'
import ProjectsView from '../views/ProjectsView'

// Views only the desktop needs are split out of the main bundle.
const ProjectDetailView = lazy(() => import('../views/ProjectDetailView'))
const ResumeView = lazy(() => import('../views/ResumeView'))
const SettingsView = lazy(() => import('../views/SettingsView'))
const TerminalView = lazy(() => import('../views/TerminalView'))

// flush: the view fills the window body edge to edge instead of getting padding.
const VIEWS = {
  about: { View: AboutView },
  projects: { View: ProjectsView },
  project: { View: ProjectDetailView },
  cluster: { View: ClusterView },
  experience: { View: ExperienceView },
  terminal: { View: TerminalView, flush: true },
  resume: { View: ResumeView },
  contact: { View: ContactView },
  settings: { View: SettingsView },
}

export function getApp(id) {
  const meta = getAppMeta(id)
  const view = VIEWS[id]
  return meta && view ? { ...meta, ...view } : null
}
