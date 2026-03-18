import { Bell, ChevronLeft, LogOut } from 'lucide-react'
import { Logo } from './Logo'
import type { ClassStats } from '../types'

interface Props {
  stats?: ClassStats
  onBack?: () => void
  onLogout?: () => void
  title?: string
}

export function Header({ stats, onBack, onLogout, title }: Props) {
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
            <Logo size={28} />
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
        <div className="flex items-center gap-3">
          {stats && (
            <>
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
            </>
          )}

          {onLogout && (
            <button
              onClick={onLogout}
              className="flex items-center gap-1.5"
              aria-label="Sign out"
              style={{ padding: '6px 10px', borderRadius: '10px', background: 'none', border: '1px solid #e2e8f0', color: '#64748b', fontSize: '13px', fontWeight: 500, cursor: 'pointer', transition: 'all 0.2s' }}
              onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = '#f8fafc'; (e.currentTarget as HTMLButtonElement).style.color = '#0C1825' }}
              onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = 'none'; (e.currentTarget as HTMLButtonElement).style.color = '#64748b' }}
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Sign out</span>
            </button>
          )}
        </div>
      </div>
    </header>
  )
}
