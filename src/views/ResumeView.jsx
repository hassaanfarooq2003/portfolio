import Button from '../components/ui/Button'
import Icon from '../components/ui/Icon'
import { links } from '../data/links'

export default function ResumeView() {
  return (
    <div className="space-y-5">
      <div className="flex items-center gap-4 rounded-lg border border-line p-4">
        <Icon name="file" size={32} className="shrink-0 text-accent" />
        <div className="min-w-0">
          <p className="truncate font-mono text-sm">{links.resumeFile}</p>
          <p className="text-xs text-muted">PDF, opens in a new tab</p>
        </div>
      </div>
      <div className="flex flex-wrap gap-2.5">
        <Button
          as="a"
          variant="primary"
          href={links.resume}
          download={links.resumeFile}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Icon name="download" size={16} /> Download
        </Button>
        <Button as="a" href={links.resume} target="_blank" rel="noopener noreferrer">
          <Icon name="external" size={16} /> Open in new tab
        </Button>
      </div>
    </div>
  )
}
