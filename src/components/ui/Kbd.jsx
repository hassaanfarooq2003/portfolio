export default function Kbd({ children }) {
  return (
    <kbd className="rounded border border-line bg-surface-2 px-1.5 py-0.5 font-mono text-[11px] leading-none text-muted">
      {children}
    </kbd>
  )
}
