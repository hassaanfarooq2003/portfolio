import { useState } from 'react'
import Tag from '../components/ui/Tag'
import { imageName, projectCategories, projects } from '../data/projects'
import { useShell } from '../shell/ShellContext'
import ProjectLinks from './ProjectLinks'

function FullCard({ project }) {
  return (
    <article
      id={`project-${project.slug}`}
      className="flex h-full scroll-mt-32 flex-col gap-3 rounded-xl border border-line bg-surface p-5"
    >
      <header>
        <p className="font-mono text-xs text-accent">{imageName(project)}</p>
        <h3 className="mt-1 text-lg font-semibold">{project.title}</h3>
      </header>
      <p className="text-sm leading-relaxed text-muted">{project.description}</p>
      {project.bullets.length > 0 && (
        <ul className="list-disc space-y-1 pl-5 text-sm marker:text-muted">
          {project.bullets.map((bullet) => (
            <li key={bullet}>{bullet}</li>
          ))}
        </ul>
      )}
      <div className="mt-auto space-y-3 pt-1">
        <div className="flex flex-wrap gap-1.5">
          {project.tags.map((tag) => (
            <Tag key={tag}>{tag}</Tag>
          ))}
        </div>
        <ProjectLinks project={project} />
      </div>
    </article>
  )
}

export default function ProjectsView({ variant = 'window' }) {
  const { openApp } = useShell()
  const [category, setCategory] = useState('all')
  const visible = category === 'all' ? projects : projects.filter((p) => p.category === category)

  return (
    <div className="space-y-5">
      <div role="group" aria-label="Filter projects" className="flex flex-wrap gap-2">
        {projectCategories.map((c) => {
          const selected = category === c.id
          return (
            <button
              key={c.id}
              type="button"
              aria-pressed={selected}
              onClick={() => setCategory(c.id)}
              className={`cursor-pointer rounded-full border px-3 py-1 font-mono text-xs transition-colors ${
                selected
                  ? 'border-accent bg-accent text-accent-fg'
                  : 'border-line text-muted hover:border-accent hover:text-fg'
              }`}
            >
              {c.label}
            </button>
          )
        })}
      </div>

      {variant === 'full' ? (
        <ul className="grid list-none gap-4 p-0 md:grid-cols-2">
          {visible.map((project) => (
            <li key={project.slug}>
              <FullCard project={project} />
            </li>
          ))}
        </ul>
      ) : (
        <ul className="m-0 list-none divide-y divide-line overflow-hidden rounded-lg border border-line p-0">
          {visible.map((project) => (
            <li key={project.slug}>
              <button
                type="button"
                onClick={() => openApp('project', { slug: project.slug })}
                className="block w-full cursor-pointer px-3.5 py-3 text-left transition-colors hover:bg-surface-2"
              >
                <span className="block font-mono text-xs text-accent">{imageName(project)}</span>
                <span className="mt-0.5 block font-medium">{project.title}</span>
                <span className="mt-2 flex flex-wrap gap-1.5">
                  {project.tags.map((tag) => (
                    <Tag key={tag}>{tag}</Tag>
                  ))}
                </span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
