import { APP_CATALOG } from '../apps/catalog'
import { score } from '../commands/match'
import { commands, runLine } from '../commands/registry'
import { projects } from '../data/projects'
import { THEMES } from '../theme/themes'

const EXTRA_COMMANDS = [
  { line: 'kubectl get pods', hint: 'List the skill pods and their status' },
  { line: 'sudo hire-me', hint: 'You know you want to' },
]

// One palette row: { key, group, label, hint, haystack?, exec() -> { lines, navigates } }.
export function buildEntries(query, ctx) {
  const q = query.trim()

  const raw = (text) => ({
    key: 'raw',
    group: 'Terminal',
    label: `Run: ${text}`,
    hint: 'Execute as a terminal command',
    exec: () => runLine(ctx, text),
  })

  if (q.startsWith('>')) {
    const text = q.slice(1).trim()
    return text ? [raw(text)] : []
  }

  const all = [
    ...APP_CATALOG.map((app) => ({
      key: `app:${app.id}`,
      group: 'Open',
      label: `open ${app.title}`,
      hint: app.summary,
      haystack: `open ${app.title} ${app.id} ${app.aliases.join(' ')} ${app.summary}`,
      exec: () => runLine(ctx, `open ${app.id}`),
    })),
    ...commands
      .filter((c) => c.palette && c.group !== 'navigate')
      .map((c) => ({
        key: `cmd:${c.id}`,
        group: 'Command',
        label: c.usage,
        hint: c.summary,
        haystack: `${c.id} ${c.aliases.join(' ')} ${c.summary}`,
        exec: () => runLine(ctx, c.id),
      })),
    ...EXTRA_COMMANDS.map((extra) => ({
      key: `extra:${extra.line}`,
      group: 'Command',
      label: extra.line,
      hint: extra.hint,
      exec: () => runLine(ctx, extra.line),
    })),
    ...THEMES.map((theme) => ({
      key: `theme:${theme.id}`,
      group: 'Context',
      label: `use-context ${theme.id}`,
      hint: `Switch to the ${theme.label.toLowerCase()} theme`,
      haystack: `theme context ${theme.id} ${theme.label}`,
      exec: () => runLine(ctx, `theme ${theme.id}`),
    })),
    ...(ctx.canDesktop
      ? [
          {
            key: 'view:quick',
            group: 'View',
            label: 'view quick',
            hint: 'Switch to the plain scrolling page',
            exec: () => runLine(ctx, 'view quick'),
          },
          {
            key: 'view:desktop',
            group: 'View',
            label: 'view desktop',
            hint: 'Switch to the desktop',
            exec: () => runLine(ctx, 'view desktop'),
          },
        ]
      : []),
    ...projects.map((project) => ({
      key: `project:${project.slug}`,
      group: 'Project',
      label: `open project ${project.title}`,
      hint: project.tags.slice(0, 3).join(', '),
      haystack: `project ${project.title} ${project.slug} ${project.tags.join(' ')}`,
      exec: () => runLine(ctx, `open project ${project.slug}`),
    })),
  ]

  if (!q) return all

  const matches = all
    .map((entry, index) => ({ entry, index, rank: score(q, entry.haystack ?? `${entry.label} ${entry.hint}`) }))
    .filter((m) => m.rank >= 0)
    .sort((a, b) => b.rank - a.rank || a.index - b.index)
    .map((m) => m.entry)

  return [...matches, raw(q)]
}
