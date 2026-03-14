import { useState, useMemo } from 'react'
import { Search, SlidersHorizontal, ArrowUpDown, BookOpen } from 'lucide-react'
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
type SortOrder = 'score-desc' | 'score-asc' | 'name' | 'needs-help'

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

const sortLabels: Record<SortOrder, string> = {
  'score-desc': 'Score ↓',
  'score-asc':  'Score ↑',
  'name':       'Name A–Z',
  'needs-help': 'Needs help first',
}

const statusOrder: Record<EngagementStatus, number> = {
  disengaged: 0, fading: 1, moderate: 2, high: 3,
}

export function Dashboard({ onStudentSelect }: Props) {
  const [filter, setFilter]     = useState<Filter>('all')
  const [search, setSearch]     = useState('')
  const [sort, setSort]         = useState<SortOrder>('needs-help')
  const [showTopics, setShowTopics] = useState(true)

  const filtered = useMemo(() => {
    const result = STUDENTS.filter(s => {
      const matchesFilter = filter === 'all' || s.status === filter
      const matchesSearch = s.name.toLowerCase().includes(search.toLowerCase()) ||
        s.currentTopic.toLowerCase().includes(search.toLowerCase())
      return matchesFilter && matchesSearch
    })
    return [...result].sort((a, b) => {
      switch (sort) {
        case 'score-desc':  return b.score - a.score
        case 'score-asc':   return a.score - b.score
        case 'name':        return a.name.localeCompare(b.name)
        case 'needs-help':  return statusOrder[a.status] - statusOrder[b.status]
      }
    })
  }, [filter, search, sort])

  const alertStudents = useMemo(() => STUDENTS.filter(s => s.alertMessage), [])

  // Topic breakdown — group students by currentTopic
  const topicBreakdown = useMemo(() => {
    const map = new Map<string, { total: number; struggling: number; scores: number[] }>()
    STUDENTS.forEach(s => {
      if (!map.has(s.currentTopic)) map.set(s.currentTopic, { total: 0, struggling: 0, scores: [] })
      const entry = map.get(s.currentTopic)!
      entry.total++
      entry.scores.push(s.score)
      if (s.status === 'fading' || s.status === 'disengaged') entry.struggling++
    })
    return [...map.entries()]
      .map(([topic, { total, struggling, scores }]) => ({
        topic,
        total,
        struggling,
        avgScore: Math.round(scores.reduce((a, b) => a + b, 0) / scores.length),
      }))
      .sort((a, b) => b.struggling - a.struggling || a.avgScore - b.avgScore)
  }, [])

  return (
    <div style={{ background: '#FAFAF5', minHeight: '100vh' }}>
      <Header stats={CLASS_STATS} />

      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-10 space-y-10 animate-fade-in">

        {/* Page title */}
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
              <p className="text-xs font-semibold uppercase tracking-widest" style={{ color: '#94a3b8' }}>
                Live · Today
              </p>
            </div>
            <h1 className="font-extrabold leading-tight" style={{ fontSize: 'clamp(26px,3.5vw,36px)', color: '#0C1825', fontFamily: "'Bricolage Grotesque', system-ui, sans-serif" }}>
              Class Overview
            </h1>
            <p className="text-sm mt-1.5" style={{ color: '#94a3b8' }}>
              Curiosity patterns across {CLASS_STATS.totalStudents} students
            </p>
          </div>
          <div className="flex items-center gap-3 rounded-2xl px-5 py-3 flex-shrink-0"
            style={{ background: 'white', border: '1px solid #f1f5f9', boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
            <div className="text-center">
              <p className="text-base font-extrabold" style={{ color: '#dc2626', fontFamily: "'Bricolage Grotesque', system-ui, sans-serif" }}>
                {CLASS_STATS.fading + CLASS_STATS.disengaged}
              </p>
              <p className="text-xs" style={{ color: '#94a3b8' }}>need attention</p>
            </div>
            <div className="w-px h-8" style={{ background: '#f1f5f9' }} />
            <div className="text-center">
              <p className="text-base font-extrabold" style={{ color: '#0F766E', fontFamily: "'Bricolage Grotesque', system-ui, sans-serif" }}>
                {CLASS_STATS.highEngagement}
              </p>
              <p className="text-xs" style={{ color: '#94a3b8' }}>thriving</p>
            </div>
            <div className="w-px h-8" style={{ background: '#f1f5f9' }} />
            <div className="text-center">
              <p className="text-base font-extrabold" style={{ color: '#0C1825', fontFamily: "'Bricolage Grotesque', system-ui, sans-serif" }}>
                {CLASS_STATS.avgScore}
              </p>
              <p className="text-xs" style={{ color: '#94a3b8' }}>avg score</p>
            </div>
          </div>
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

        {/* Topic breakdown */}
        <section>
          <button
            onClick={() => setShowTopics(v => !v)}
            className="flex items-center gap-2 w-full mb-4"
            style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
          >
            <BookOpen className="w-3.5 h-3.5" style={{ color: '#94a3b8' }} />
            <h2 className="text-xs font-semibold uppercase tracking-widest" style={{ color: '#94a3b8' }}>
              Topics at a glance
            </h2>
            <span className="ml-auto text-xs" style={{ color: '#cbd5e1' }}>{showTopics ? '↑ hide' : '↓ show'}</span>
          </button>

          {showTopics && (
            <div className="rounded-2xl overflow-hidden"
              style={{ background: 'white', border: '1px solid #f1f5f9', boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
              {topicBreakdown.map((row, i) => {
                const isRisky = row.struggling > 0
                const pct = row.avgScore
                const barColor = pct >= 70 ? '#0F766E' : pct >= 50 ? '#d97706' : '#dc2626'
                return (
                  <div
                    key={row.topic}
                    className="flex items-center gap-4 px-5 py-3.5"
                    style={{ borderBottom: i < topicBreakdown.length - 1 ? '1px solid #f8fafc' : 'none' }}
                  >
                    <div className="w-2 h-2 rounded-full flex-shrink-0"
                      style={{ background: isRisky ? (row.struggling > 1 ? '#dc2626' : '#ea580c') : '#22c55e' }} />

                    <p className="text-sm font-semibold flex-1 truncate" style={{ color: '#0C1825' }}>
                      {row.topic}
                    </p>

                    <div className="hidden sm:flex items-center gap-1.5 flex-shrink-0">
                      <div className="w-24 h-1.5 rounded-full overflow-hidden" style={{ background: '#f1f5f9' }}>
                        <div className="h-full rounded-full" style={{ width: `${pct}%`, background: barColor }} />
                      </div>
                      <span className="text-xs font-bold w-7 text-right" style={{ color: barColor }}>{pct}</span>
                    </div>

                    <div className="flex items-center gap-2 flex-shrink-0">
                      <span className="text-xs" style={{ color: '#94a3b8' }}>{row.total} students</span>
                      {isRisky && (
                        <span className="text-xs font-semibold px-2 py-0.5 rounded-full"
                          style={{
                            background: row.struggling > 1 ? '#fef2f2' : '#fff7ed',
                            color: row.struggling > 1 ? '#b91c1c' : '#c2410c',
                            border: `1px solid ${row.struggling > 1 ? '#fecaca' : '#fed7aa'}`,
                          }}>
                          {row.struggling} struggling
                        </span>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </section>

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
            <div className="flex items-center gap-1.5 flex-wrap flex-1">
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

            {/* Sort */}
            <div className="flex items-center gap-1.5 flex-shrink-0">
              <ArrowUpDown className="w-3.5 h-3.5 flex-shrink-0" style={{ color: '#cbd5e1' }} />
              <div className="flex items-center gap-1">
                {(Object.keys(sortLabels) as SortOrder[]).map(s => (
                  <button
                    key={s}
                    onClick={() => setSort(s)}
                    className="px-2.5 py-1.5 rounded-lg text-xs font-medium"
                    style={{
                      background: sort === s ? '#0C1825' : '#ffffff',
                      color:      sort === s ? '#ffffff' : '#94a3b8',
                      border:     sort === s ? '1px solid #0C1825' : '1px solid #e2e8f0',
                      transition: 'all 0.3s cubic-bezier(0.19,1,0.22,1)',
                    }}
                  >
                    {sortLabels[s]}
                  </button>
                ))}
              </div>
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
