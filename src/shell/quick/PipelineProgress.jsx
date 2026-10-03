import { QUICK_SECTIONS } from '../routes'

// Scroll progress shown as a CI pipeline: each section is a stage that goes pending -> running -> passed.
export default function PipelineProgress({ activeIndex }) {
  return (
    <nav aria-label="Pipeline progress" className="sticky top-14 z-30 border-b border-line bg-canvas/85 backdrop-blur">
      <ol className="mx-auto flex max-w-5xl list-none gap-1.5 px-4 py-2 sm:px-6">
        {QUICK_SECTIONS.map((section, index) => {
          const state = index < activeIndex ? 'passed' : index === activeIndex ? 'running' : 'pending'
          return (
            <li key={section.id} className="min-w-0 flex-1">
              <a
                href={`#${section.id}`}
                aria-current={state === 'running' ? 'step' : undefined}
                className="group block rounded-sm"
              >
                <span
                  aria-hidden="true"
                  className={`block h-1 rounded-full transition-colors ${state === 'pending' ? 'bg-line' : 'bg-accent'} ${
                    state === 'running' ? 'animate-pulse' : ''
                  }`}
                />
                <span
                  className={`mt-1.5 flex items-baseline gap-1.5 font-mono text-[11px] ${
                    state === 'running' ? 'text-accent' : state === 'passed' ? 'text-fg' : 'text-muted'
                  }`}
                >
                  <span className="truncate">{section.stage}</span>
                  <span className="hidden truncate opacity-60 md:inline">{state}</span>
                </span>
              </a>
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
