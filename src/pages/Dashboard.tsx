import { useState, useMemo } from 'react'
import { Search, SlidersHorizontal, ArrowUpDown, BookOpen, Bell, Users, BarChart2 } from 'lucide-react'
import { AreaChart, Area, XAxis, Tooltip, ResponsiveContainer } from 'recharts'
import { Header } from '../components/Header'
import { StatCard } from '../components/StatCard'
import { StudentCard } from '../components/StudentCard'
import { AlertBanner } from '../components/AlertBanner'
import { STUDENTS, CLASS_STATS } from '../data/mockData'
import type { EngagementStatus } from '../types'

interface Props {
  onStudentSelect: (id: string) => void
}

type Tab = 'students' | 'alerts' | 'topics' | 'pulse'
type Filter = 'all' | EngagementStatus
type SortOrder = 'score-desc' | 'score-asc' | 'name' | 'needs-help'

const filterLabels: Record<Filter, string> = {
  all: 'All', high: 'Thriving', moderate: 'Moderate', fading: 'Fading', disengaged: 'Disengaged',
}
const filterCounts: Record<Filter, number> = {
  all: CLASS_STATS.totalStudents, high: CLASS_STATS.highEngagement,
  moderate: CLASS_STATS.moderate, fading: CLASS_STATS.fading, disengaged: CLASS_STATS.disengaged,
}
const sortLabels: Record<SortOrder, string> = {
  'score-desc': 'Score ↓', 'score-asc': 'Score ↑', 'name': 'Name A–Z', 'needs-help': 'Needs help first',
}
const statusOrder: Record<EngagementStatus, number> = {
  disengaged: 0, fading: 1, moderate: 2, high: 3,
}

const classTrend = (() => {
  const count = STUDENTS[0].sessions.length
  return Array.from({ length: count }, (_, i) => ({
    date: STUDENTS[0].sessions[i].date,
    avg: Math.round(STUDENTS.reduce((sum, s) => sum + s.sessions[i].score, 0) / STUDENTS.length),
  }))
})()

export function Dashboard({ onStudentSelect }: Props) {
  const [tab, setTab]               = useState<Tab>('students')
  const [filter, setFilter]         = useState<Filter>('all')
  const [search, setSearch]         = useState('')
  const [sort, setSort]             = useState<SortOrder>('needs-help')
  const [contacted, setContacted]   = useState<Set<string>>(new Set())

  function toggleContacted(id: string) {
    setContacted(prev => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id); else next.add(id)
      return next
    })
  }

  const filtered = useMemo(() => {
    const result = STUDENTS.filter(s => {
      const matchesFilter = filter === 'all' || s.status === filter
      const matchesSearch = s.name.toLowerCase().includes(search.toLowerCase()) ||
        s.currentTopic.toLowerCase().includes(search.toLowerCase())
      return matchesFilter && matchesSearch
    })
    return [...result].sort((a, b) => {
      switch (sort) {
        case 'score-desc': return b.score - a.score
        case 'score-asc':  return a.score - b.score
        case 'name':       return a.name.localeCompare(b.name)
        case 'needs-help': return statusOrder[a.status] - statusOrder[b.status]
      }
    })
  }, [filter, search, sort])

  const alertStudents = useMemo(() => STUDENTS.filter(s => s.alertMessage), [])

  const topicBreakdown = useMemo(() => {
    const map = new Map<string, { total: number; struggling: number; scores: number[] }>()
    STUDENTS.forEach(s => {
      if (!map.has(s.currentTopic)) map.set(s.currentTopic, { total: 0, struggling: 0, scores: [] })
      const e = map.get(s.currentTopic)!
      e.total++; e.scores.push(s.score)
      if (s.status === 'fading' || s.status === 'disengaged') e.struggling++
    })
    return [...map.entries()]
      .map(([topic, { total, struggling, scores }]) => ({
        topic, total, struggling,
        avgScore: Math.round(scores.reduce((a, b) => a + b, 0) / scores.length),
      }))
      .sort((a, b) => b.struggling - a.struggling || a.avgScore - b.avgScore)
  }, [])

  const trendDelta = classTrend[classTrend.length - 1].avg - classTrend[0].avg
  const trendColor = trendDelta >= 0 ? '#0F766E' : '#dc2626'

  const tabs: { key: Tab; label: string; icon: React.ReactNode; badge?: number }[] = [
    { key: 'students', label: 'Students',    icon: <Users className="w-4 h-4" />,    badge: CLASS_STATS.totalStudents },
    { key: 'alerts',   label: 'Alerts',      icon: <Bell className="w-4 h-4" />,     badge: alertStudents.length },
    { key: 'topics',   label: 'Topics',      icon: <BookOpen className="w-4 h-4" />, badge: topicBreakdown.filter(t => t.struggling > 0).length },
    { key: 'pulse',    label: 'Class Pulse', icon: <BarChart2 className="w-4 h-4" /> },
  ]

  return (
    <div style={{ background: '#FAFAF5', minHeight: '100vh' }}>
      <Header stats={CLASS_STATS} />

      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-10 animate-fade-in">

        {/* Page title */}
        <div className="flex items-start justify-between gap-4 flex-wrap mb-8">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
              <p className="text-xs font-semibold uppercase tracking-widest" style={{ color: '#94a3b8' }}>Live · Today</p>
            </div>
            <h1 className="font-extrabold leading-tight" style={{ fontSize: 'clamp(26px,3.5vw,36px)', color: '#0C1825', fontFamily: "'Bricolage Grotesque', system-ui, sans-serif" }}>
              Class Overview
            </h1>
            <p className="text-sm mt-1" style={{ color: '#94a3b8' }}>
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

        {/* Stats row */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-8">
          <StatCard label="Avg score"  value={CLASS_STATS.avgScore}         sub="out of 100" color="teal"   />
          <StatCard label="Thriving"   value={CLASS_STATS.highEngagement}   sub="students"   color="green"  />
          <StatCard label="Moderate"   value={CLASS_STATS.moderate}         sub="students"   color="amber"  />
          <StatCard label="Fading"     value={CLASS_STATS.fading}           sub="students"   color="orange" />
          <StatCard label="Disengaged" value={CLASS_STATS.disengaged}       sub="students"   color="red"    />
          <StatCard label="Total"      value={CLASS_STATS.totalStudents}    sub="in class"                  />
        </div>

        {/* Tab bar */}
        <div className="flex items-center gap-1 mb-7 p-1 rounded-2xl w-fit"
          style={{ background: 'white', border: '1px solid #f1f5f9', boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
          {tabs.map(({ key, label, icon, badge }) => {
            const active = tab === key
            const isAlert = key === 'alerts' && badge && badge > 0
            return (
              <button
                key={key}
                onClick={() => setTab(key)}
                className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold"
                style={{
                  background: active ? '#0C1825' : 'transparent',
                  color:      active ? 'white' : '#64748b',
                  border:     'none',
                  cursor:     'pointer',
                  transition: 'all 0.3s cubic-bezier(0.19,1,0.22,1)',
                  whiteSpace: 'nowrap',
                }}>
                {icon}
                {label}
                {badge !== undefined && (
                  <span className="text-xs font-bold px-1.5 py-0.5 rounded-full min-w-[20px] text-center"
                    style={{
                      background: active
                        ? 'rgba(255,255,255,0.15)'
                        : isAlert ? '#fff7ed' : '#f1f5f9',
                      color: active ? 'white' : isAlert ? '#c2410c' : '#94a3b8',
                    }}>
                    {badge}
                  </span>
                )}
              </button>
            )
          })}
        </div>

        {/* ── Tab: Students ── */}
        {tab === 'students' && (
          <section className="animate-fade-in">
            <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-6">
              <div className="relative max-w-xs w-full sm:w-auto flex-shrink-0">
                <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: '#cbd5e1' }} />
                <input
                  type="text" placeholder="Search name or topic…"
                  value={search} onChange={e => setSearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 text-sm bg-white rounded-xl outline-none"
                  style={{ border: '1px solid #e2e8f0', color: '#0C1825', boxShadow: '0 1px 3px rgba(0,0,0,0.04)', transition: 'border-color 0.3s, box-shadow 0.3s' }}
                  onFocus={e => { e.currentTarget.style.borderColor = '#0F766E'; e.currentTarget.style.boxShadow = '0 0 0 3px rgba(15,118,110,0.1)' }}
                  onBlur={e => { e.currentTarget.style.borderColor = '#e2e8f0'; e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.04)' }}
                />
              </div>

              <div className="flex items-center gap-1.5 flex-wrap flex-1">
                <SlidersHorizontal className="w-3.5 h-3.5 flex-shrink-0" style={{ color: '#cbd5e1' }} />
                {(Object.keys(filterLabels) as Filter[]).map(f => (
                  <button key={f} onClick={() => setFilter(f)}
                    className="px-3 py-1.5 rounded-full text-xs font-semibold"
                    style={{ background: filter === f ? '#0F766E' : '#ffffff', color: filter === f ? '#ffffff' : '#64748b', border: filter === f ? '1px solid #0F766E' : '1px solid #e2e8f0', boxShadow: filter === f ? '0 1px 6px rgba(15,118,110,0.25)' : '0 1px 2px rgba(0,0,0,0.04)', transition: 'all 0.35s cubic-bezier(0.19,1,0.22,1)' }}>
                    {filterLabels[f]}<span className="ml-1.5 opacity-60">{filterCounts[f]}</span>
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-1.5 flex-shrink-0">
                <ArrowUpDown className="w-3.5 h-3.5 flex-shrink-0" style={{ color: '#cbd5e1' }} />
                <div className="flex items-center gap-1">
                  {(Object.keys(sortLabels) as SortOrder[]).map(s => (
                    <button key={s} onClick={() => setSort(s)}
                      className="px-2.5 py-1.5 rounded-lg text-xs font-medium"
                      style={{ background: sort === s ? '#0C1825' : '#ffffff', color: sort === s ? '#ffffff' : '#94a3b8', border: sort === s ? '1px solid #0C1825' : '1px solid #e2e8f0', transition: 'all 0.3s cubic-bezier(0.19,1,0.22,1)' }}>
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
                    <StudentCard student={student} onClick={onStudentSelect} contacted={contacted.has(student.id)} />
                  </div>
                ))}
              </div>
            )}
          </section>
        )}

        {/* ── Tab: Alerts ── */}
        {tab === 'alerts' && (
          <section className="animate-fade-in">
            {alertStudents.length === 0 ? (
              <div className="text-center py-20" style={{ color: '#cbd5e1' }}>
                <Bell className="w-8 h-8 mx-auto mb-3 opacity-50" />
                <p className="text-sm font-medium">No active alerts</p>
              </div>
            ) : (
              <>
                <p className="text-xs mb-4" style={{ color: '#94a3b8' }}>
                  {alertStudents.length} students need attention · mark each as contacted or resolved
                </p>
                <AlertBanner
                  students={alertStudents}
                  onStudentClick={onStudentSelect}
                  contacted={contacted}
                  onContact={toggleContacted}
                />
              </>
            )}
          </section>
        )}

        {/* ── Tab: Topics ── */}
        {tab === 'topics' && (
          <section className="animate-fade-in">
            <p className="text-xs mb-4" style={{ color: '#94a3b8' }}>
              Topics sorted by number of struggling students · click a topic to filter
            </p>
            <div className="rounded-2xl overflow-hidden"
              style={{ background: 'white', border: '1px solid #f1f5f9', boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
              {topicBreakdown.map((row, i) => {
                const isRisky = row.struggling > 0
                const barColor = row.avgScore >= 70 ? '#0F766E' : row.avgScore >= 50 ? '#d97706' : '#dc2626'
                return (
                  <button
                    key={row.topic}
                    onClick={() => { setSearch(row.topic); setTab('students') }}
                    className="flex items-center gap-4 px-5 py-4 w-full text-left"
                    style={{
                      borderBottom: i < topicBreakdown.length - 1 ? '1px solid #f8fafc' : 'none',
                      background: 'none', border: i < topicBreakdown.length - 1 ? 'none' : 'none',
                      borderBottomColor: '#f8fafc',
                      borderBottomWidth: i < topicBreakdown.length - 1 ? '1px' : '0',
                      borderBottomStyle: 'solid',
                      cursor: 'pointer',
                      transition: 'background 0.2s',
                    }}
                    onMouseEnter={e => (e.currentTarget.style.background = '#f8fafc')}
                    onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
                  >
                    <div className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                      style={{ background: isRisky ? (row.struggling > 1 ? '#dc2626' : '#ea580c') : '#22c55e' }} />

                    <p className="text-sm font-semibold flex-1" style={{ color: '#0C1825' }}>{row.topic}</p>

                    <div className="hidden sm:flex items-center gap-2 flex-shrink-0">
                      <div className="w-28 h-1.5 rounded-full overflow-hidden" style={{ background: '#f1f5f9' }}>
                        <div className="h-full rounded-full" style={{ width: `${row.avgScore}%`, background: barColor }} />
                      </div>
                      <span className="text-xs font-bold w-8 text-right" style={{ color: barColor }}>{row.avgScore}</span>
                    </div>

                    <div className="flex items-center gap-2 flex-shrink-0">
                      <span className="text-xs" style={{ color: '#94a3b8' }}>{row.total} student{row.total !== 1 ? 's' : ''}</span>
                      {isRisky ? (
                        <span className="text-xs font-semibold px-2.5 py-1 rounded-full"
                          style={{ background: row.struggling > 1 ? '#fef2f2' : '#fff7ed', color: row.struggling > 1 ? '#b91c1c' : '#c2410c', border: `1px solid ${row.struggling > 1 ? '#fecaca' : '#fed7aa'}` }}>
                          {row.struggling} struggling
                        </span>
                      ) : (
                        <span className="text-xs font-semibold px-2.5 py-1 rounded-full"
                          style={{ background: '#f0fdf4', color: '#15803d', border: '1px solid #bbf7d0' }}>
                          All good
                        </span>
                      )}
                    </div>
                  </button>
                )
              })}
            </div>
          </section>
        )}

        {/* ── Tab: Class Pulse ── */}
        {tab === 'pulse' && (
          <section className="animate-fade-in">
            <div className="rounded-2xl p-6"
              style={{ background: 'white', border: '1px solid #f1f5f9', boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h2 className="text-base font-bold mb-1" style={{ color: '#0C1825', fontFamily: "'Bricolage Grotesque', system-ui, sans-serif" }}>
                    Class engagement over time
                  </h2>
                  <p className="text-xs" style={{ color: '#94a3b8' }}>Average curiosity score across all {CLASS_STATS.totalStudents} students · last 10 sessions</p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-extrabold" style={{ color: trendColor, fontFamily: "'Bricolage Grotesque', system-ui, sans-serif" }}>
                    {trendDelta >= 0 ? '+' : ''}{trendDelta} pts
                  </p>
                  <p className="text-xs mt-0.5" style={{ color: '#94a3b8' }}>since session 1</p>
                </div>
              </div>

              <ResponsiveContainer width="100%" height={200}>
                <AreaChart data={classTrend} margin={{ top: 4, right: 4, left: -24, bottom: 0 }}>
                  <defs>
                    <linearGradient id="trendGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%"  stopColor="#0F766E" stopOpacity={0.15} />
                      <stop offset="95%" stopColor="#0F766E" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="date" tick={{ fontSize: 11, fill: '#cbd5e1' }} tickLine={false} axisLine={false} />
                  <Tooltip
                    contentStyle={{ background: '#0C1825', border: 'none', borderRadius: 12, padding: '8px 14px' }}
                    labelStyle={{ color: 'rgba(255,255,255,0.5)', fontSize: 11 }}
                    itemStyle={{ color: '#2dd4bf', fontSize: 13, fontWeight: 700 }}
                    formatter={(v: unknown) => [`${v} avg`, '']}
                  />
                  <Area type="monotone" dataKey="avg" stroke="#0F766E" strokeWidth={2.5} fill="url(#trendGrad)" dot={false} activeDot={{ r: 5, fill: '#0F766E', strokeWidth: 0 }} />
                </AreaChart>
              </ResponsiveContainer>

              {/* Per-student mini sparklines */}
              <div className="mt-8 pt-6" style={{ borderTop: '1px solid #f1f5f9' }}>
                <p className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: '#94a3b8' }}>Individual trends</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {STUDENTS.map(s => {
                    const first = s.sessions[0].score
                    const last  = s.sessions[s.sessions.length - 1].score
                    const delta = last - first
                    const color = s.status === 'high' ? '#0F766E' : s.status === 'moderate' ? '#d97706' : s.status === 'fading' ? '#ea580c' : '#dc2626'
                    const max = Math.max(...s.sessions.map(x => x.score))
                    return (
                      <button
                        key={s.id}
                        onClick={() => onStudentSelect(s.id)}
                        className="flex items-center gap-3 rounded-xl px-4 py-3 text-left w-full"
                        style={{ background: '#fafafa', border: '1px solid #f1f5f9', cursor: 'pointer', transition: 'background 0.2s' }}
                        onMouseEnter={e => (e.currentTarget.style.background = '#f0fdfa')}
                        onMouseLeave={e => (e.currentTarget.style.background = '#fafafa')}
                      >
                        <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-extrabold flex-shrink-0"
                          style={{ background: '#f1f5f9', color }}>
                          {s.avatar}
                        </div>
                        <p className="text-xs font-semibold w-24 flex-shrink-0 truncate" style={{ color: '#0C1825' }}>{s.name}</p>
                        <div className="flex items-end gap-px flex-1 h-6">
                          {s.sessions.map((sess, i) => (
                            <div key={i} className="flex-1 rounded-sm"
                              style={{ height: `${(sess.score / max) * 100}%`, background: color, opacity: 0.6 + (i / s.sessions.length) * 0.4 }} />
                          ))}
                        </div>
                        <span className="text-xs font-bold flex-shrink-0 ml-2"
                          style={{ color: delta >= 0 ? '#0F766E' : '#dc2626' }}>
                          {delta >= 0 ? '+' : ''}{delta}
                        </span>
                      </button>
                    )
                  })}
                </div>
              </div>
            </div>
          </section>
        )}

      </main>
    </div>
  )
}
