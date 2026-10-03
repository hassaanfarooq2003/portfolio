// A generated "architecture" strip: the project's tags as connected nodes. Stands in for screenshots.
export default function StackDiagram({ tags, title }) {
  return (
    <figure className="m-0">
      <ol aria-label={`Stack for ${title}`} className="m-0 flex list-none flex-wrap items-center gap-y-2 p-0">
        {tags.map((tag, index) => (
          <li key={tag} className="flex items-center">
            <span className="rounded-md border border-accent/60 bg-accent/10 px-2.5 py-1 font-mono text-xs text-fg">
              {tag}
            </span>
            {index < tags.length - 1 && (
              <span aria-hidden="true" className="mx-2 font-mono text-xs text-muted">
                -&gt;
              </span>
            )}
          </li>
        ))}
      </ol>
      <figcaption className="mt-1.5 font-mono text-[11px] text-muted">stack</figcaption>
    </figure>
  )
}
