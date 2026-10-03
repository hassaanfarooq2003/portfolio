export default function Section({ id, label, stage, title, intro, children }) {
  const headingId = `${id}-title`

  return (
    <section
      id={id}
      aria-labelledby={title ? headingId : undefined}
      aria-label={title ? undefined : label}
      className="scroll-mt-28 py-14 sm:py-20"
    >
      {title && (
        <header className="mb-8">
          <p className="font-mono text-xs text-accent">stage: {stage}</p>
          <h2 id={headingId} className="mt-1 text-3xl font-semibold tracking-tight">
            {title}
          </h2>
          {intro && <p className="mt-2 max-w-2xl text-muted">{intro}</p>}
        </header>
      )}
      {children}
    </section>
  )
}
