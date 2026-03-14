import type { EngagementStatus } from '../types'

interface Props {
  status: EngagementStatus
  size?: 'sm' | 'md'
}

const config: Record<EngagementStatus, { label: string; classes: string; dot: string }> = {
  high:       { label: 'High spark',   classes: 'bg-green-100 text-green-700 border-green-200',   dot: 'bg-green-500' },
  moderate:   { label: 'Moderate',     classes: 'bg-amber-100 text-amber-700 border-amber-200',   dot: 'bg-amber-400' },
  fading:     { label: 'Fading',       classes: 'bg-orange-100 text-orange-700 border-orange-200', dot: 'bg-orange-500' },
  disengaged: { label: 'Disengaged',   classes: 'bg-red-100 text-red-700 border-red-200',         dot: 'bg-red-500' },
}

export function EngagementBadge({ status, size = 'sm' }: Props) {
  const { label, classes, dot } = config[status]
  return (
    <span className={`inline-flex items-center gap-1.5 border rounded-full font-semibold ${classes} ${size === 'sm' ? 'px-2.5 py-0.5 text-xs' : 'px-3 py-1 text-sm'}`}>
      <span className={`rounded-full flex-shrink-0 ${dot} ${size === 'sm' ? 'w-1.5 h-1.5' : 'w-2 h-2'}`} />
      {label}
    </span>
  )
}
