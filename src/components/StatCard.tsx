interface Props {
  label: string
  value: number | string
  sub?: string
  color?: 'teal' | 'green' | 'amber' | 'orange' | 'red' | 'slate'
}

// PiggyVest-style: each stat has a product color — pastel bg, deep accent value, soft label
const config: Record<NonNullable<Props['color']>, { bg: string; border: string; valueColor: string; labelColor: string }> = {
  teal:   { bg: '#f0fdfa', border: '#ccfbf1',  valueColor: '#0F766E', labelColor: '#5eead4' },
  green:  { bg: '#f0fdf4', border: '#bbf7d0',  valueColor: '#15803d', labelColor: '#86efac' },
  amber:  { bg: '#fffbeb', border: '#fde68a',  valueColor: '#b45309', labelColor: '#fcd34d' },
  orange: { bg: '#fff7ed', border: '#fed7aa',  valueColor: '#c2410c', labelColor: '#fdba74' },
  red:    { bg: '#fef2f2', border: '#fecaca',  valueColor: '#b91c1c', labelColor: '#fca5a5' },
  slate:  { bg: '#ffffff', border: '#f1f5f9',  valueColor: '#0C1825', labelColor: '#94a3b8' },
}

export function StatCard({ label, value, sub, color = 'slate' }: Props) {
  const c = config[color]
  return (
    <div className="rounded-2xl p-5 flex flex-col gap-1"
      style={{ background: c.bg, border: `1px solid ${c.border}`, boxShadow: '0 1px 3px rgba(0,0,0,0.03)' }}>
      <p className="text-xs font-semibold uppercase tracking-widest" style={{ color: c.labelColor }}>
        {label}
      </p>
      <p className="font-extrabold leading-none" style={{ color: c.valueColor, fontSize: 'clamp(26px,3vw,34px)' }}>
        {value}
      </p>
      {sub && <p className="text-xs mt-0.5" style={{ color: c.labelColor }}>{sub}</p>}
    </div>
  )
}
