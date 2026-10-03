const base =
  'inline-flex items-center justify-center gap-2 rounded-md px-3.5 py-2 text-sm font-medium transition-colors cursor-pointer'

const variants = {
  primary: 'bg-accent text-accent-fg hover:brightness-110',
  ghost: 'border border-line bg-surface-2 text-fg hover:border-accent',
  quiet: 'text-muted hover:text-fg',
}

export default function Button({ as: Comp = 'button', variant = 'ghost', className = '', ...props }) {
  const type = Comp === 'button' ? { type: 'button' } : {}
  return <Comp {...type} className={`${base} ${variants[variant]} ${className}`} {...props} />
}
