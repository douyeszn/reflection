interface Props {
  label: string
  value: number | string
  sub?: string
  color?: 'teal' | 'green' | 'amber' | 'orange' | 'red' | 'slate'
}

const valueColors: Record<NonNullable<Props['color']>, string> = {
  teal:   '#0F766E',
  green:  '#15803d',
  amber:  '#b45309',
  orange: '#c2410c',
  red:    '#b91c1c',
  slate:  '#0C1825',
}

export function StatCard({ label, value, sub, color = 'slate' }: Props) {
  return (
    <div className="rounded-2xl p-5 flex flex-col gap-1"
      style={{ background: '#fff', border: '1px solid #f1f5f9', boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
      <p className="text-xs font-semibold uppercase tracking-widest" style={{ color: '#94a3b8' }}>
        {label}
      </p>
      <p className="font-extrabold leading-none" style={{ color: valueColors[color], fontSize: 'clamp(26px,3vw,34px)' }}>
        {value}
      </p>
      {sub && <p className="text-xs mt-0.5" style={{ color: '#cbd5e1' }}>{sub}</p>}
    </div>
  )
}
