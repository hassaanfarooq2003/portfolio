import { useEffect, useState } from 'react'
import Button from '../components/ui/Button'
import Icon from '../components/ui/Icon'
import { links } from '../data/links'

function LinkRow({ icon, label, value, href }) {
  return (
    <a
      href={href}
      target={href.startsWith('http') ? '_blank' : undefined}
      rel="noopener noreferrer"
      className="flex items-center gap-3 rounded-lg border border-line p-3 transition-colors hover:border-accent"
    >
      <Icon name={icon} size={20} className="shrink-0 text-accent" />
      <span className="min-w-0">
        <span className="block font-mono text-[11px] uppercase tracking-wide text-muted">{label}</span>
        <span className="block truncate text-sm">{value}</span>
      </span>
    </a>
  )
}

export default function ContactView() {
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (!copied) return undefined
    const id = setTimeout(() => setCopied(false), 1800)
    return () => clearTimeout(id)
  }, [copied])

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(links.email)
      setCopied(true)
    } catch {
      window.location.href = `mailto:${links.email}`
    }
  }

  return (
    <div className="space-y-4">
      <p className="max-w-md text-muted">
        Open to roles and conversations around full-stack, DevOps and cloud work. The fastest way to reach me is email.
      </p>
      <div className="grid gap-3">
        <LinkRow icon="mail" label="Email" value={links.email} href={`mailto:${links.email}`} />
        <LinkRow icon="github" label="GitHub" value="hassaanfarooq2003" href={links.github} />
        <LinkRow icon="linkedin" label="LinkedIn" value="hassaan-farooq" href={links.linkedin} />
      </div>
      <div className="flex items-center gap-3">
        <Button variant="primary" onClick={copyEmail}>
          <Icon name={copied ? 'check' : 'copy'} size={16} /> {copied ? 'Copied' : 'Copy email'}
        </Button>
        <span role="status" className="sr-only">
          {copied ? 'Email address copied to clipboard' : ''}
        </span>
      </div>
    </div>
  )
}
