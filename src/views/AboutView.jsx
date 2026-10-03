import Button from '../components/ui/Button'
import Icon from '../components/ui/Icon'
import { profile } from '../data/profile'
import { useShell } from '../shell/ShellContext'

export default function AboutView({ variant = 'window' }) {
  const { openApp } = useShell()
  const hero = variant === 'hero'
  const Heading = hero ? 'h1' : 'h2'

  return (
    <div className={hero ? 'space-y-6' : 'space-y-4'}>
      <p className="font-mono text-xs text-muted">
        <span className="text-accent">$</span> whoami
      </p>
      <Heading className={`font-semibold tracking-tight ${hero ? 'text-4xl sm:text-6xl' : 'text-3xl'}`}>
        Hey, I&apos;m {profile.firstName}
        <span className="text-accent">.</span>
      </Heading>
      <p className={`max-w-2xl ${hero ? 'text-xl' : 'text-base'}`}>
        A <span className="text-accent">{profile.role}</span> with interests in{' '}
        <span className="text-accent">DevOps</span> and <span className="text-accent">Cloud Computing</span>.
      </p>
      <p className="max-w-2xl leading-relaxed text-muted">{profile.summary}</p>

      <dl className="grid gap-3 sm:grid-cols-3">
        {profile.facts.map((fact) => (
          <div key={fact.label} className="rounded-lg border border-line p-3">
            <dt className="font-mono text-[11px] uppercase tracking-wide text-muted">{fact.label}</dt>
            <dd className="mt-1 text-sm">{fact.value}</dd>
          </div>
        ))}
      </dl>

      <div className="flex flex-wrap gap-2.5">
        <Button variant="primary" onClick={() => openApp('projects')}>
          See projects <Icon name="arrowRight" size={16} />
        </Button>
        <Button onClick={() => openApp('contact')}>
          <Icon name="mail" size={16} /> Contact
        </Button>
        <Button onClick={() => openApp('resume')}>
          <Icon name="file" size={16} /> Resume
        </Button>
      </div>
    </div>
  )
}
