import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine
} from 'recharts'
import type { Session } from '../types'

interface Props {
  sessions: Session[]
  compact?: boolean
}

interface TooltipPayload {
  active?: boolean
  payload?: Array<{ value: number; payload: Session }>
  label?: string
}

function CustomTooltip({ active, payload, label }: TooltipPayload) {
  if (!active || !payload?.length) return null
  const session = payload[0].payload
  return (
    <div className="bg-white border border-slate-200 rounded-xl shadow-lg p-3 text-xs">
      <p className="font-semibold text-slate-900 mb-1">{label}</p>
      <p className="text-slate-600">{session.topic}</p>
      <p className="font-bold text-teal-700 mt-1">Score: {payload[0].value}</p>
      {session.curiositySpike && <p className="text-amber-600 mt-0.5">Curiosity spike</p>}
      {session.confusionFlag && <p className="text-orange-600 mt-0.5">Confusion detected</p>}
    </div>
  )
}

export function EngagementChart({ sessions, compact = false }: Props) {
  return (
    <ResponsiveContainer width="100%" height={compact ? 120 : 220}>
      <AreaChart data={sessions} margin={{ top: 5, right: 4, left: -28, bottom: 0 }}>
        <defs>
          <linearGradient id="scoreGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#0F766E" stopOpacity={0.15} />
            <stop offset="95%" stopColor="#0F766E" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
        <XAxis
          dataKey="date"
          tick={{ fontSize: 10, fill: '#94A3B8' }}
          tickLine={false}
          axisLine={false}
          interval={compact ? 4 : 2}
        />
        <YAxis
          domain={[0, 100]}
          tick={{ fontSize: 10, fill: '#94A3B8' }}
          tickLine={false}
          axisLine={false}
        />
        <Tooltip content={<CustomTooltip />} />
        <ReferenceLine y={50} stroke="#E2E8F0" strokeDasharray="4 4" />
        <Area
          type="monotone"
          dataKey="score"
          stroke="#0F766E"
          strokeWidth={2}
          fill="url(#scoreGrad)"
          dot={false}
          activeDot={{ r: 4, fill: '#0F766E', strokeWidth: 0 }}
        />
      </AreaChart>
    </ResponsiveContainer>
  )
}
