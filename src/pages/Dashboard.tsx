import { useState } from 'react'
import { Search, SlidersHorizontal } from 'lucide-react'
import { Header } from '../components/Header'
import { StatCard } from '../components/StatCard'
import { StudentCard } from '../components/StudentCard'
import { AlertBanner } from '../components/AlertBanner'
import { STUDENTS, CLASS_STATS } from '../data/mockData'
import type { EngagementStatus } from '../types'

interface Props {
  onStudentSelect: (id: string) => void
}

type Filter = 'all' | EngagementStatus

const filterLabels: Record<Filter, string> = {
  all:        'All',
  high:       'Thriving',
  moderate:   'Moderate',
  fading:     'Fading',
  disengaged: 'Disengaged',
}

const filterCounts: Record<Filter, number> = {
  all:        CLASS_STATS.totalStudents,
  high:       CLASS_STATS.highEngagement,
  moderate:   CLASS_STATS.moderate,
  fading:     CLASS_STATS.fading,
  disengaged: CLASS_STATS.disengaged,
}

export function Dashboard({ onStudentSelect }: Props) {
  const [filter, setFilter] = useState<Filter>('all')
  const [search, setSearch] = useState('')

  const filtered = STUDENTS.filter(s => {
    const matchesFilter = filter === 'all' || s.status === filter
    const matchesSearch = s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.currentTopic.toLowerCase().includes(search.toLowerCase())
    return matchesFilter && matchesSearch
  })

  const alertStudents = STUDENTS.filter(s => s.alertMessage)

  return (
    <div style={{ background: '#ffffff', minHeight: '100vh' }}>
      <Header stats={CLASS_STATS} />

      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-10 space-y-10 animate-fade-in">

        {/* Page title */}
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest mb-1.5" style={{ color: '#94a3b8' }}>
            Today · Live
          </p>
          <h1 className="font-extrabold leading-tight tracking-tight" style={{ fontSize: 'clamp(26px,3.5vw,36px)', color: '#0C1825' }}>
            Class Overview
          </h1>
          <p className="text-sm mt-1.5" style={{ color: '#94a3b8' }}>
            Curiosity patterns across {CLASS_STATS.totalStudents} students
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          <StatCard label="Avg score"  value={CLASS_STATS.avgScore}         sub="out of 100" color="teal"   />
          <StatCard label="Thriving"   value={CLASS_STATS.highEngagement}   sub="students"   color="green"  />
          <StatCard label="Moderate"   value={CLASS_STATS.moderate}         sub="students"   color="amber"  />
          <StatCard label="Fading"     value={CLASS_STATS.fading}           sub="students"   color="orange" />
          <StatCard label="Disengaged" value={CLASS_STATS.disengaged}       sub="students"   color="red"    />
          <StatCard label="Total"      value={CLASS_STATS.totalStudents}    sub="in class"                  />
        </div>

        {/* Priority Alerts */}
        {alertStudents.length > 0 && (
          <section>
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-xs font-semibold uppercase tracking-widest" style={{ color: '#94a3b8' }}>
                Priority alerts
              </h2>
              <span className="text-xs font-semibold px-2.5 py-1 rounded-full"
                style={{ background: '#fff7ed', color: '#c2410c', border: '1px solid #fed7aa' }}>
                {alertStudents.length} students
              </span>
            </div>
            <AlertBanner students={alertStudents} onStudentClick={onStudentSelect} />
          </section>
        )}

        {/* Students */}
        <section>
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-6">
            {/* Search */}
            <div className="relative max-w-xs w-full sm:w-auto flex-shrink-0">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
                style={{ color: '#cbd5e1' }} />
              <input
                type="text"
                placeholder="Search name or topic…"
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 text-sm bg-white rounded-xl outline-none"
                style={{
                  border: '1px solid #e2e8f0',
                  color: '#0C1825',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
                  transition: 'border-color 0.3s, box-shadow 0.3s',
                }}
                onFocus={e => {
                  e.currentTarget.style.borderColor = '#0F766E'
                  e.currentTarget.style.boxShadow = '0 0 0 3px rgba(15,118,110,0.1)'
                }}
                onBlur={e => {
                  e.currentTarget.style.borderColor = '#e2e8f0'
                  e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.04)'
                }}
              />
            </div>

            {/* Filter pills */}
            <div className="flex items-center gap-1.5 flex-wrap">
              <SlidersHorizontal className="w-3.5 h-3.5 flex-shrink-0" style={{ color: '#cbd5e1' }} />
              {(Object.keys(filterLabels) as Filter[]).map(f => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className="px-3 py-1.5 rounded-full text-xs font-semibold"
                  style={{
                    background:   filter === f ? '#0F766E' : '#ffffff',
                    color:        filter === f ? '#ffffff' : '#64748b',
                    border:       filter === f ? '1px solid #0F766E' : '1px solid #e2e8f0',
                    boxShadow:    filter === f ? '0 1px 6px rgba(15,118,110,0.25)' : '0 1px 2px rgba(0,0,0,0.04)',
                    transition:   'all 0.35s cubic-bezier(0.19,1,0.22,1)',
                  }}
                >
                  {filterLabels[f]}
                  <span className="ml-1.5 opacity-60">{filterCounts[f]}</span>
                </button>
              ))}
            </div>
          </div>

          {filtered.length === 0 ? (
            <div className="text-center py-20" style={{ color: '#cbd5e1' }}>
              <Search className="w-8 h-8 mx-auto mb-3 opacity-50" />
              <p className="text-sm font-medium">No students match</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filtered.map((student, i) => (
                <div key={student.id} className="animate-slide-up" style={{ animationDelay: `${i * 30}ms` }}>
                  <StudentCard student={student} onClick={onStudentSelect} />
                </div>
              ))}
            </div>
          )}
        </section>

      </main>
    </div>
  )
}
