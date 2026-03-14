import { AlertTriangle, X, ChevronRight } from 'lucide-react'
import { useState } from 'react'
import type { Student } from '../types'

interface Props {
  students: Student[]
  onStudentClick: (id: string) => void
}

export function AlertBanner({ students, onStudentClick }: Props) {
  const [dismissed, setDismissed] = useState<Set<string>>(new Set())
  const alerts = students.filter(s => s.alertMessage && !dismissed.has(s.id))

  if (alerts.length === 0) return null

  return (
    <div className="space-y-2.5 animate-slide-up">
      {alerts.map(student => {
        const isCritical = student.status === 'disengaged'
        return (
          <div
            key={student.id}
            className="flex items-start gap-3 rounded-2xl p-4"
            style={{
              background: isCritical ? '#fef2f2' : '#fff7ed',
              border: `1px solid ${isCritical ? '#fecaca' : '#fed7aa'}`,
            }}
          >
            <div
              className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5"
              style={{ background: isCritical ? '#fee2e2' : '#ffedd5' }}
            >
              <AlertTriangle className="w-4 h-4" style={{ color: isCritical ? '#dc2626' : '#ea580c' }} />
            </div>

            <div className="flex-1 min-w-0">
              <button
                onClick={() => onStudentClick(student.id)}
                className="flex items-center gap-1 group link-underline"
                style={{ color: '#0f172a' }}
              >
                <span className="text-sm font-semibold">{student.name}</span>
                <ChevronRight className="w-3.5 h-3.5 text-slate-400 transition-transform duration-300 group-hover:translate-x-0.5" />
              </button>
              <p className="text-xs leading-relaxed mt-0.5" style={{ color: '#57534e' }}>
                {student.alertMessage}
              </p>
            </div>

            <button
              onClick={() => setDismissed(prev => new Set([...prev, student.id]))}
              className="btn-ghost flex-shrink-0 mt-0.5"
              aria-label={`Dismiss alert for ${student.name}`}
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        )
      })}
    </div>
  )
}
