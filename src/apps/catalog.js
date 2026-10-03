import { getProject, imageName } from '../data/projects'

// App metadata only (no views), so the command system can list apps without importing any UI.
export const APP_CATALOG = [
  {
    id: 'about',
    title: 'About.md',
    icon: 'user',
    summary: 'Who I am and what I build',
    aliases: ['me', 'whoami'],
    size: { w: 600, h: 570 },
    pos: { x: 150, y: 20 },
    autoOpen: true,
  },
  {
    id: 'projects',
    title: 'Registry',
    icon: 'folder',
    summary: 'Projects as container images',
    aliases: ['registry', 'work'],
    size: { w: 640, h: 540 },
    pos: { x: 210, y: 50 },
  },
  {
    id: 'cluster',
    title: 'Cluster',
    icon: 'boxes',
    summary: 'Skills running as pods. Break them.',
    aliases: ['skills', 'pods'],
    size: { w: 680, h: 560 },
    pos: { x: 160, y: 36 },
  },
  {
    id: 'experience',
    title: 'Experience',
    icon: 'git',
    summary: 'Work history as a git log',
    aliases: ['exp', 'git'],
    size: { w: 600, h: 520 },
    pos: { x: 270, y: 64 },
  },
  {
    id: 'terminal',
    title: 'Terminal',
    icon: 'terminal',
    summary: 'Run commands against the portfolio',
    aliases: ['shell', 'term'],
    size: { w: 660, h: 440 },
    pos: { x: 190, y: 130 },
  },
  {
    id: 'resume',
    title: 'Resume.pdf',
    icon: 'file',
    summary: 'Download my resume',
    aliases: ['cv'],
    size: { w: 440, h: 320 },
    pos: { x: 320, y: 110 },
  },
  {
    id: 'contact',
    title: 'Contact',
    icon: 'mail',
    summary: 'Email, GitHub and LinkedIn',
    aliases: ['mail', 'email'],
    size: { w: 460, h: 400 },
    pos: { x: 340, y: 80 },
  },
  {
    id: 'settings',
    title: 'Settings',
    icon: 'gear',
    summary: 'Themes and view mode',
    aliases: ['prefs', 'themes'],
    size: { w: 480, h: 480 },
    pos: { x: 360, y: 56 },
  },
]

// Opened from the Registry, never listed on the desktop.
export const PROJECT_APP = {
  id: 'project',
  title: 'Project',
  icon: 'folder',
  summary: 'Project details',
  aliases: [],
  size: { w: 600, h: 540 },
  pos: { x: 240, y: 44 },
}

export const getAppMeta = (id) => (id === 'project' ? PROJECT_APP : APP_CATALOG.find((a) => a.id === id))

export function windowTitle(id, params) {
  if (id === 'project') {
    const project = getProject(params?.slug)
    return project ? imageName(project) : PROJECT_APP.title
  }
  return getAppMeta(id)?.title ?? id
}
