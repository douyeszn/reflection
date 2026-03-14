import { TrendingDown, TrendingUp, Minus, AlertTriangle, BookOpen } from 'lucide-react'
import type { Student } from '../types'
import { EngagementBadge } from './EngagementBadge'
import { ScoreRing } from './ScoreRing'

interface Props {
  student: Student
  onClick: (id: string) => void
}

const trendIcon = {
  up:     <TrendingUp  className="w-3.5 h-3.5" style={{ color: '#16a34a' }} />,
  down:   <TrendingDown className="w-3.5 h-3.5" style={{ color: '#dc2626' }} />,
  stable: <Minus       className="w-3.5 h-3.5" style={{ color: '#94a3b8' }} />,
}

const avatarStyles: Record<Student['status'], { bg: string; color: string }> = {
  high:       { bg: '#f1f5f9', color: '#0F766E' },
  moderate:   { bg: '#f1f5f9', color: '#b45309' },
  fading:     { bg: '#f1f5f9', color: '#ea580c' },
  disengaged: { bg: '#f1f5f9', color: '#dc2626' },
}

export function StudentCard({ student, onClick }: Props) {
  const hasAlert = student.alertMessage !== null
  const av = avatarStyles[student.status]

  return (
    <button
      onClick={() => onClick(student.id)}
      className="w-full text-left rounded-2xl p-5"
      style={{
        background: 'white',
        border: hasAlert ? '1px solid #fed7aa' : '1px solid #f1f5f9',
        boxShadow: hasAlert
          ? '0 1px 3px rgba(234,88,12,0.06), 0 4px 16px rgba(234,88,12,0.05)'
          : '0 1px 2px rgba(0,0,0,0.03), 0 4px 12px rgba(15,118,110,0.04)',
        cursor: 'pointer',
        transition: 'transform 0.5s cubic-bezier(0.19,1,0.22,1), box-shadow 0.5s cubic-bezier(0.19,1,0.22,1), border-color 0.5s cubic-bezier(0.19,1,0.22,1)',
      }}
      onMouseEnter={e => {
        const el = e.currentTarget as HTMLButtonElement
        el.style.transform = 'translateY(-3px)'
        el.style.boxShadow = '0 8px 32px rgba(15,118,110,0.10), 0 2px 8px rgba(0,0,0,0.05)'
        if (!hasAlert) el.style.borderColor = '#ccfbf1'
      }}
      onMouseLeave={e => {
        const el = e.currentTarget as HTMLButtonElement
        el.style.transform = 'translateY(0)'
        el.style.boxShadow = hasAlert
          ? '0 1px 3px rgba(234,88,12,0.06), 0 4px 16px rgba(234,88,12,0.05)'
          : '0 1px 2px rgba(0,0,0,0.03), 0 4px 12px rgba(15,118,110,0.04)'
        el.style.borderColor = hasAlert ? '#fed7aa' : '#f1f5f9'
      }}
    >
      {hasAlert && (
        <div className="flex items-center gap-1.5 mb-3">
          <AlertTriangle className="w-3.5 h-3.5 flex-shrink-0" style={{ color: '#ea580c' }} />
          <span className="text-xs font-semibold" style={{ color: '#ea580c' }}>Needs attention</span>
        </div>
      )}

      <div className="flex items-start gap-3">
        <div className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-extrabold flex-shrink-0"
          style={{ background: av.bg, color: av.color }}>
          {student.avatar}
        </div>

        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold truncate" style={{ color: '#0C1825' }}>{student.name}</p>
          <div className="flex items-center gap-1 mt-0.5">
            <BookOpen className="w-3 h-3 flex-shrink-0" style={{ color: '#cbd5e1' }} />
            <p className="text-xs truncate" style={{ color: '#94a3b8' }}>{student.currentTopic}</p>
          </div>
        </div>

        <div className="flex flex-col items-end gap-1">
          <ScoreRing score={student.score} size={44} />
          {trendIcon[student.trend]}
        </div>
      </div>

      <div className="flex items-center justify-between mt-3.5">
        <EngagementBadge status={student.status} />
        {student.fadingSince && (
          <p className="text-xs" style={{ color: '#94a3b8' }}>since {student.fadingSince}</p>
        )}
      </div>

      {/* Score bar */}
      <div className="mt-3.5 h-1 rounded-full overflow-hidden" style={{ background: '#f1f5f9' }}>
        <div className="h-full rounded-full"
          style={{ width: `${student.score}%`, background: av.color, transition: 'width 0.8s cubic-bezier(0.19,1,0.22,1)' }} />
      </div>
    </button>
  )
}
