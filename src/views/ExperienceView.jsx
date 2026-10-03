import Icon from '../components/ui/Icon'
import { experience } from '../data/experience'

export default function ExperienceView() {
  return (
    <div>
      <p className="mb-5 font-mono text-xs text-muted">
        <span className="text-accent">$</span> git log --graph --oneline
      </p>
      <ol className="m-0 list-none space-y-7 border-l border-line p-0 pl-6">
        {experience.map((entry, index) => (
          <li key={entry.id} className="relative">
            <span
              aria-hidden="true"
              className="absolute -left-[31px] top-1.5 h-3 w-3 rounded-full border-2 border-accent bg-canvas"
            />
            <p className="font-mono text-xs">
              <span className="text-accent">{entry.hash}</span>
              {index === 0 && <span className="text-warn"> (HEAD -&gt; main)</span>}{' '}
              <span className="text-ok">pipeline passed</span>
            </p>
            <h3 className="mt-1 font-semibold">{entry.role}</h3>
            <p className="text-sm text-muted">
              {entry.org} / {entry.period}
            </p>
            {entry.award && (
              <div className="mt-2.5 rounded-lg border border-warn/40 bg-warn/10 px-3 py-2">
                <p className="flex flex-wrap items-center gap-x-2 gap-y-0.5 text-xs font-medium text-warn">
                  <Icon name="star" size={13} />
                  <span>{entry.award.title} award</span>
                  <span className="font-normal opacity-80">{entry.award.period}</span>
                </p>
                <p className="mt-1 text-sm">{entry.award.description}</p>
              </div>
            )}
            <ul className="mt-2 list-disc space-y-1 pl-5 text-sm marker:text-muted">
              {entry.points.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
          </li>
        ))}
      </ol>
    </div>
  )
}
