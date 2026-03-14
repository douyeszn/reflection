import { Sparkles, Bell, ChevronLeft } from 'lucide-react'
import type { ClassStats } from '../types'

interface Props {
  stats?: ClassStats
  onBack?: () => void
  title?: string
}

export function Header({ stats, onBack, title }: Props) {
  return (
    <header className="sticky top-0 z-10"
      style={{ background: 'rgba(250,250,245,0.9)', backdropFilter: 'blur(12px)', borderBottom: '1px solid #e2e8f0', boxShadow: '0 1px 0 rgba(226,232,240,0.6)' }}>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">

        {/* Left */}
        <div className="flex items-center gap-3">
          {onBack && (
            <button onClick={onBack} className="btn-ghost flex items-center gap-1.5 mr-1" aria-label="Go back"
              style={{ padding: '6px 10px', borderRadius: '10px', color: '#64748b', fontSize: '13px', fontWeight: 500 }}>
              <ChevronLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Back</span>
            </button>
          )}

          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0"
              style={{ background: '#0F766E' }}>
              <Sparkles className="w-3.5 h-3.5 text-white" />
            </div>
            <span className="font-extrabold text-sm tracking-tight" style={{ color: '#0C1825' }}>
              Reflection
            </span>
            {title && (
              <>
                <span className="text-slate-200 mx-1 select-none">/</span>
                <span className="text-sm font-medium truncate max-w-[160px]" style={{ color: '#94a3b8' }}>
                  {title}
                </span>
              </>
            )}
          </div>
        </div>

        {/* Right */}
        {stats && (
          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-1.5 text-xs" style={{ color: '#94a3b8' }}>
              <span className="font-bold" style={{ color: '#0C1825' }}>{stats.totalStudents}</span>
              students
            </div>

            <div className="hidden sm:block w-px h-4" style={{ background: '#f1f5f9' }} />

            <div className="hidden sm:flex items-center gap-1.5 text-xs" style={{ color: '#94a3b8' }}>
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 inline-block" />
              {stats.highEngagement} thriving
            </div>

            {stats.alertCount > 0 && (
              <div className="flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold"
                style={{ background: '#fff7ed', border: '1px solid #fed7aa', color: '#c2410c' }}>
                <Bell className="w-3 h-3" />
                {stats.alertCount} alerts
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  )
}
