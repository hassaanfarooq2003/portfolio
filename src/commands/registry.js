import { APP_CATALOG } from '../apps/catalog'
import { experience } from '../data/experience'
import { links } from '../data/links'
import { profile } from '../data/profile'
import { getProject, imageName, projects } from '../data/projects'
import { skills } from '../data/skills'
import { THEMES } from '../theme/themes'
import { tokenize } from './parse'

// A Line is { tone: 'out' | 'ok' | 'warn' | 'err' | 'dim' | 'cmd', text, href? }.
const out = (text, tone = 'out', href) => ({ tone, text, href })
const pad = (value, width) => String(value).padEnd(width)

const stripExt = (value) => value.toLowerCase().replace(/\.(md|pdf)$/, '')

function findApp(name) {
  const n = stripExt(name)
  return APP_CATALOG.find((a) => a.id === n || stripExt(a.title) === n || a.aliases.includes(n))
}

function findProject(query) {
  const q = query.toLowerCase()
  return (
    getProject(q) ??
    projects.find((p) => p.slug.includes(q)) ??
    projects.find((p) => p.title.toLowerCase().includes(q))
  )
}

const usage = (text) => [out(`usage: ${text}`, 'err')]

function podTable(ctx) {
  const header = out(`${pad('NAME', 26)}${pad('READY', 8)}${pad('STATUS', 14)}RESTARTS`, 'dim')
  const rows = ctx.cluster.pods.map((p) => {
    const tone = p.status === 'Running' ? 'out' : p.status === 'Terminating' ? 'err' : 'warn'
    const ready = p.status === 'Running' ? '1/1' : '0/1'
    return out(`${pad(p.name, 26)}${pad(ready, 8)}${pad(p.status, 14)}${p.restarts}`, tone)
  })
  return [header, ...rows]
}

function switchContext(ctx, id) {
  if (!ctx.setTheme(id)) {
    return [out(`error: no context exists with the name "${id}"`, 'err'), out(`contexts: ${THEMES.map((t) => t.id).join(', ')}`, 'dim')]
  }
  return [out(`switched to context "${id}"`, 'ok')]
}

export const commands = [
  {
    id: 'help',
    aliases: ['?', 'man'],
    group: 'info',
    usage: 'help',
    summary: 'List every command',
    palette: true,
    run: () => [
      out('commands', 'dim'),
      ...commands.filter((c) => !c.hidden).map((c) => out(`  ${pad(c.usage, 38)}${c.summary}`)),
    ],
  },
  {
    id: 'about',
    aliases: ['whoami'],
    group: 'navigate',
    usage: 'about',
    summary: 'Who I am',
    palette: true,
    navigates: true,
    run: (ctx) => {
      ctx.openApp('about')
      return [out(`${profile.name}, ${profile.role}`, 'ok'), out(profile.summary)]
    },
  },
  {
    id: 'projects',
    aliases: [],
    group: 'navigate',
    usage: 'projects [name]',
    summary: 'List projects, or open one',
    palette: true,
    navigates: true,
    hints: [projects.map((p) => p.slug)],
    run: (ctx, argv) => {
      if (argv[0]) {
        const project = findProject(argv[0])
        if (!project) return [out(`no project matches "${argv[0]}"`, 'err')]
        ctx.openApp('project', { slug: project.slug })
        return [out(imageName(project), 'ok'), out(project.description)]
      }
      ctx.openApp('projects')
      return [
        out('REPOSITORY', 'dim'),
        ...projects.map((p) => out(imageName(p))),
        out("Tip: 'projects <name>' opens one.", 'dim'),
      ]
    },
  },
  {
    id: 'skills',
    aliases: ['pods'],
    group: 'navigate',
    usage: 'skills',
    summary: 'Skills, running as pods',
    palette: true,
    navigates: true,
    run: (ctx) => {
      ctx.openApp('cluster')
      return [...skills.map((s) => out(`- ${s.name}`)), out("Tip: 'chaos' breaks some of them.", 'dim')]
    },
  },
  {
    id: 'experience',
    aliases: ['git'],
    group: 'navigate',
    usage: 'experience',
    summary: 'Work history as a git log',
    palette: true,
    navigates: true,
    run: (ctx) => {
      ctx.openApp('experience')
      return experience.map((e) =>
        out(`${e.hash} ${e.role}, ${e.org} (${e.period})${e.award ? ` - ${e.award.title} award` : ''}`),
      )
    },
  },
  {
    id: 'contact',
    aliases: ['mail'],
    group: 'navigate',
    usage: 'contact',
    summary: 'Email, GitHub, LinkedIn',
    palette: true,
    navigates: true,
    run: (ctx) => {
      ctx.openApp('contact')
      return [
        out(`${pad('email', 10)}${links.email}`, 'out', `mailto:${links.email}`),
        out(`${pad('github', 10)}${links.github}`, 'out', links.github),
        out(`${pad('linkedin', 10)}${links.linkedin}`, 'out', links.linkedin),
      ]
    },
  },
  {
    id: 'resume',
    aliases: ['cv'],
    group: 'navigate',
    usage: 'resume',
    summary: 'Open my resume',
    palette: true,
    navigates: true,
    run: (ctx) => {
      ctx.openApp('resume')
      return [out(links.resumeFile, 'ok', links.resume)]
    },
  },
  {
    id: 'open',
    aliases: ['start'],
    group: 'navigate',
    usage: 'open <app | project name>',
    summary: 'Open an app or a project',
    navigates: true,
    hints: [[...APP_CATALOG.map((a) => a.id), 'project'], projects.map((p) => p.slug)],
    run: (ctx, argv) => {
      if (!argv.length) return [...usage('open <app | project name>'), out(`apps: ${APP_CATALOG.map((a) => a.id).join(', ')}`, 'dim')]
      const query = argv[0] === 'project' ? argv.slice(1).join(' ') : argv.join(' ')
      const app = argv[0] === 'project' ? null : findApp(query)
      if (app) {
        ctx.openApp(app.id)
        return [out(`opening ${app.title}`, 'ok')]
      }
      const project = query ? findProject(query) : null
      if (project) {
        ctx.openApp('project', { slug: project.slug })
        return [out(`opening ${imageName(project)}`, 'ok')]
      }
      return [out(`nothing to open for "${query}"`, 'err')]
    },
  },
  {
    id: 'chaos',
    aliases: ['chaos-monkey'],
    group: 'fun',
    usage: 'chaos',
    summary: 'Release the chaos monkey',
    palette: true,
    navigates: true,
    run: (ctx) => {
      const count = ctx.cluster.chaos()
      if (count === 0) return [out('the cluster is still recovering. Give it a second.', 'dim')]
      ctx.openApp('cluster')
      return [out(`chaos-monkey: terminating ${count} pods. Watch them heal.`, 'warn'), out("Try 'kubectl get pods'.", 'dim')]
    },
  },
  {
    id: 'kubectl',
    aliases: ['k'],
    group: 'system',
    usage: 'kubectl get pods | delete pod <name>',
    summary: 'Poke the cluster',
    hints: [
      ['get', 'delete', 'config'],
      ['pods', 'projects', 'contexts', 'pod', 'get-contexts', 'use-context'],
      THEMES.map((t) => t.id),
    ],
    run: (ctx, argv) => {
      const [verb, noun, arg] = argv
      const isPods = noun === 'pods' || noun === 'pod' || noun === 'po'

      if (verb === 'get' && isPods) return podTable(ctx)
      if (verb === 'get' && (noun === 'projects' || noun === 'images')) {
        return [out('REPOSITORY', 'dim'), ...projects.map((p) => out(imageName(p)))]
      }
      if ((verb === 'get' && noun === 'contexts') || (verb === 'config' && noun === 'get-contexts')) {
        return [
          out(`CURRENT   NAME`, 'dim'),
          ...ctx.themes.map((t) => out(`${pad(t.id === ctx.theme ? '*' : '', 10)}${t.id}`)),
        ]
      }
      if (verb === 'config' && noun === 'use-context') {
        return arg ? switchContext(ctx, arg) : usage('kubectl config use-context <name>')
      }
      if (verb === 'delete' && isPods) {
        if (!arg) return usage('kubectl delete pod <name>')
        const pod = ctx.cluster.pods.find((p) => p.name === arg || p.id === arg)
        if (!pod) return [out(`Error from server (NotFound): pods "${arg}" not found`, 'err')]
        const name = pod.name
        if (!ctx.cluster.kill(pod.id)) return [out(`pod "${name}" is already being replaced`, 'warn')]
        return [out(`pod "${name}" deleted`, 'ok'), out('replicaset: a new pod is on its way.', 'dim')]
      }
      return usage('kubectl get pods | kubectl delete pod <name> | kubectl config use-context <name>')
    },
  },
  {
    id: 'theme',
    aliases: ['use-context', 'context'],
    group: 'system',
    usage: 'theme [name]',
    summary: 'List or switch themes (kubectl contexts)',
    hints: [THEMES.map((t) => t.id)],
    run: (ctx, argv) => {
      if (!argv[0]) {
        return [out('contexts', 'dim'), ...ctx.themes.map((t) => out(`${t.id === ctx.theme ? '*' : ' '} ${t.id}`))]
      }
      return switchContext(ctx, argv[0])
    },
  },
  {
    id: 'view',
    aliases: ['shell'],
    group: 'system',
    usage: 'view quick | desktop | auto',
    summary: 'Switch between Quick view and the desktop',
    hints: [['quick', 'desktop', 'auto']],
    run: (ctx, argv) => {
      const choice = argv[0]
      if (choice === 'quick' || choice === 'desktop') {
        ctx.setMode(choice)
        return [out(`switching to ${choice} view`, 'ok')]
      }
      if (choice === 'auto') {
        ctx.setMode(null)
        return [out('view mode set to auto', 'ok')]
      }
      return [out(`current view: ${ctx.mode}`), ...usage('view quick | desktop | auto')]
    },
  },
  {
    id: 'sudo',
    aliases: [],
    group: 'fun',
    usage: 'sudo hire-me',
    summary: 'You know you want to',
    hidden: true,
    hints: [['hire-me']],
    run: (ctx, argv) => {
      if (argv[0] !== 'hire-me') {
        return [out('visitor is not in the sudoers file. This incident will be reported.', 'err')]
      }
      ctx.openApp('contact')
      return [
        out('[sudo] password for recruiter: ********', 'dim'),
        out('Authentication successful.', 'ok'),
        out(`${profile.firstName} has been added to your hiring pipeline.`, 'ok'),
        out('Opening contact details...', 'dim'),
      ]
    },
  },
  {
    id: 'ls',
    aliases: ['dir'],
    group: 'info',
    usage: 'ls',
    summary: 'List apps',
    run: () => [out(APP_CATALOG.map((a) => a.title).join('   '))],
  },
  {
    id: 'clear',
    aliases: ['cls'],
    group: 'system',
    usage: 'clear',
    summary: 'Clear the terminal',
    run: (ctx) => {
      ctx.clearTerminal()
      return []
    },
  },
]

const byName = new Map(commands.flatMap((c) => [c.id, ...c.aliases].map((name) => [name, c])))

export const findCommand = (name) => byName.get(name.toLowerCase())

// Runs one command line. Returns the output lines and whether it navigated somewhere.
export function runLine(ctx, input) {
  const [name, ...argv] = tokenize(input)
  if (!name) return { lines: [], navigates: false }
  const command = findCommand(name)
  if (!command) {
    return { lines: [out(`command not found: ${name}. Try 'help'.`, 'err')], navigates: false }
  }
  return { lines: command.run(ctx, argv), navigates: Boolean(command.navigates) }
}

// Tab completion: returns full replacement lines for what has been typed so far.
export function complete(input) {
  const endsWithSpace = /\s$/.test(input)
  const tokens = tokenize(input)
  if (tokens.length === 0) return []
  const parts = endsWithSpace ? [...tokens, ''] : tokens
  const prefix = parts[parts.length - 1].toLowerCase()

  if (parts.length === 1) {
    return [...byName.keys()].filter((name) => name.startsWith(prefix) && !byName.get(name).hidden).map((name) => name)
  }

  const command = findCommand(parts[0])
  const options = command?.hints?.[parts.length - 2] ?? []
  return options
    .filter((option) => option.toLowerCase().startsWith(prefix))
    .map((option) => [...parts.slice(0, -1), option].join(' '))
}
