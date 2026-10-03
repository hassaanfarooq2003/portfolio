export const APP_IDS = ['about', 'projects', 'cluster', 'experience', 'terminal', 'resume', 'contact', 'settings']

const ALIASES = { skills: 'cluster', registry: 'projects' }

// Hashes look like #about, #skills, #projects and #projects/<slug>.
export function parseHash(hash = window.location.hash) {
  const raw = hash.replace(/^#\/?/, '')
  if (!raw) return null
  const [head, slug] = raw.split('/')
  if (head === 'projects' && slug) return { appId: 'project', params: { slug } }
  const appId = ALIASES[head] ?? head
  return APP_IDS.includes(appId) ? { appId, params: {} } : null
}

export function formatHash(appId, params) {
  if (appId === 'project' && params?.slug) return `#projects/${params.slug}`
  if (appId === 'cluster') return '#skills'
  return `#${appId}`
}

// Sections of the Quick view, in pipeline order.
export const QUICK_SECTIONS = [
  { id: 'about', stage: 'checkout', label: 'About' },
  { id: 'skills', stage: 'build', label: 'Skills' },
  { id: 'projects', stage: 'test', label: 'Projects' },
  { id: 'experience', stage: 'release', label: 'Experience' },
  { id: 'contact', stage: 'deploy', label: 'Contact' },
]

export const SECTION_BY_APP = {
  about: 'about',
  cluster: 'skills',
  projects: 'projects',
  project: 'projects',
  experience: 'experience',
  contact: 'contact',
}
