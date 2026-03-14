import { AlertTriangle, X, ChevronRight, Phone, CheckCircle } from 'lucide-react'
import { useState } from 'react'
import type { Student } from '../types'

interface Props {
  students: Student[]
  onStudentClick: (id: string) => void
}

export function AlertBanner({ students, onStudentClick }: Props) {
  const [dismissed, setDismissed] = useState<Set<string>>(new Set())
  const [contacted, setContacted] = useState<Set<string>>(new Set())

  const alerts = students.filter(s => s.alertMessage && !dismissed.has(s.id))
  if (alerts.length === 0) return null

  function toggleContacted(id: string) {
    setContacted(prev => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id); else next.add(id)
      return next
    })
  }

  return (
    <div className="space-y-2.5 animate-slide-up">
      {alerts.map(student => {
        const isCritical = student.status === 'disengaged'
        const isContacted = contacted.has(student.id)

        return (
          <div
            key={student.id}
            className="flex items-start gap-3 rounded-2xl p-4"
            style={{
              background: '#fff',
              border: `1px solid ${isContacted ? '#bbf7d0' : isCritical ? '#fecaca' : '#fed7aa'}`,
              boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
              transition: 'border-color 0.4s cubic-bezier(0.19,1,0.22,1)',
            }}
          >
            {/* Icon */}
            <div className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5"
              style={{
                background: isContacted ? '#f0fdf4' : isCritical ? '#fef2f2' : '#fff7ed',
                transition: 'background 0.4s',
              }}>
              {isContacted
                ? <CheckCircle className="w-4 h-4" style={{ color: '#16a34a' }} />
                : <AlertTriangle className="w-4 h-4" style={{ color: isCritical ? '#dc2626' : '#ea580c' }} />}
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap mb-0.5">
                <button
                  onClick={() => onStudentClick(student.id)}
                  className="flex items-center gap-1 group"
                  style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', color: '#0f172a' }}
                >
                  <span className="text-sm font-semibold">{student.name}</span>
                  <ChevronRight className="w-3.5 h-3.5 text-slate-400 transition-transform duration-300 group-hover:translate-x-0.5" />
                </button>
                {isContacted && (
                  <span className="text-xs font-semibold px-2 py-0.5 rounded-full"
                    style={{ background: '#f0fdf4', color: '#15803d', border: '1px solid #bbf7d0' }}>
                    Contacted
                  </span>
                )}
              </div>

              <p className="text-xs leading-relaxed" style={{ color: '#57534e' }}>
                {student.alertMessage}
              </p>

              {/* Action buttons */}
              <div className="flex items-center gap-2 mt-3">
                <button
                  onClick={() => toggleContacted(student.id)}
                  className="flex items-center gap-1.5 text-xs font-semibold rounded-lg px-3 py-1.5"
                  style={{
                    background: isContacted ? '#f0fdf4' : '#f8fafc',
                    border: `1px solid ${isContacted ? '#bbf7d0' : '#e2e8f0'}`,
                    color: isContacted ? '#15803d' : '#64748b',
                    cursor: 'pointer',
                    transition: 'all 0.3s cubic-bezier(0.19,1,0.22,1)',
                  }}>
                  <Phone className="w-3 h-3" />
                  {isContacted ? 'Contacted ✓' : 'Mark contacted'}
                </button>

                <button
                  onClick={() => setDismissed(prev => new Set([...prev, student.id]))}
                  className="flex items-center gap-1.5 text-xs font-semibold rounded-lg px-3 py-1.5"
                  style={{
                    background: '#f8fafc',
                    border: '1px solid #e2e8f0',
                    color: '#64748b',
                    cursor: 'pointer',
                    transition: 'all 0.3s',
                  }}>
                  <CheckCircle className="w-3 h-3" />
                  Resolved
                </button>
              </div>
            </div>

            {/* Dismiss X */}
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
