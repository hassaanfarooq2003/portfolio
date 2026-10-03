import StackDiagram from '../components/StackDiagram'
import { getProject, imageName, projectCategories } from '../data/projects'
import ProjectLinks from './ProjectLinks'

export default function ProjectDetailView({ params }) {
  const project = getProject(params?.slug)

  if (!project) {
    return <p className="text-muted">That project doesn&apos;t exist. Try opening one from the Registry.</p>
  }

  const category = projectCategories.find((c) => c.id === project.category)

  return (
    <article className="space-y-5">
      <header>
        <p className="font-mono text-xs text-accent">{imageName(project)}</p>
        <h2 className="mt-1 text-2xl font-semibold tracking-tight">{project.title}</h2>
        {category && <p className="mt-1 font-mono text-xs text-muted">category: {category.label}</p>}
      </header>
      <p className="leading-relaxed">{project.description}</p>
      {project.bullets.length > 0 && (
        <ul className="list-disc space-y-1.5 pl-5 text-sm marker:text-muted">
          {project.bullets.map((bullet) => (
            <li key={bullet}>{bullet}</li>
          ))}
        </ul>
      )}
      <StackDiagram tags={project.tags} title={project.title} />
      <ProjectLinks project={project} />
    </article>
  )
}
