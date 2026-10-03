import Button from '../components/ui/Button'
import Icon from '../components/ui/Icon'

// Repo and demo links are optional; nothing renders until they are filled in.
export default function ProjectLinks({ project }) {
  if (!project.repo && !project.demo) return null
  return (
    <div className="flex flex-wrap gap-2.5">
      {project.repo && (
        <Button as="a" href={project.repo} target="_blank" rel="noopener noreferrer">
          <Icon name="github" size={16} /> Code
        </Button>
      )}
      {project.demo && (
        <Button as="a" href={project.demo} target="_blank" rel="noopener noreferrer">
          <Icon name="external" size={16} /> Live demo
        </Button>
      )}
    </div>
  )
}
