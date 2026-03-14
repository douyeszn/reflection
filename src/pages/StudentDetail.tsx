import { Clock, BookOpen, RefreshCw, Zap, Target, Eye } from 'lucide-react'
import { Header } from '../components/Header'
import { EngagementBadge } from '../components/EngagementBadge'
import { ScoreRing } from '../components/ScoreRing'
import { EngagementChart } from '../components/EngagementChart'
import { STUDENTS } from '../data/mockData'

interface Props {
  studentId: string
  onBack: () => void
}

interface SignalRowProps {
  icon: React.ReactNode
  label: string
  sub?: string
  value: string
  fill?: number
  fillColor?: string
}

function SignalRow({ icon, label, sub, value, fill, fillColor = '#0F766E' }: SignalRowProps) {
  return (
    <div className="py-4" style={{ borderBottom: '1px solid #f8fafc' }}>
      <div className="flex items-center gap-3 mb-2">
        <div className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0"
          style={{ background: '#f8fafc', border: '1px solid #f1f5f9', color: '#94a3b8' }}>
          {icon}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold" style={{ color: '#0C1825' }}>{label}</p>
          {sub && <p className="text-xs mt-0.5" style={{ color: '#94a3b8' }}>{sub}</p>}
        </div>
        <p className="text-sm font-extrabold" style={{ color: '#0C1825' }}>{value}</p>
      </div>
      {fill !== undefined && (
        <div className="ml-11 h-1.5 rounded-full overflow-hidden" style={{ background: '#f1f5f9' }}>
          <div className="h-full rounded-full"
            style={{ width: `${Math.min(100,fill)}%`, background: fillColor, transition: 'width 0.8s cubic-bezier(0.19,1,0.22,1)' }} />
        </div>
      )}
    </div>
  )
}

const interpConfig = {
  high:       { bg: '#f0fdf4', border: '#bbf7d0', color: '#15803d', dot: '#16a34a',
    label: 'This student is in a curiosity spike. Let them explore — avoid interrupting deep engagement.' },
  moderate:   { bg: '#fffbeb', border: '#fde68a', color: '#b45309', dot: '#d97706',
    label: 'Engagement is steady. A gentle challenge increase might push them toward higher curiosity.' },
  fading:     { bg: '#fff7ed', border: '#fed7aa', color: '#c2410c', dot: '#ea580c',
    label: "Spark is fading. A brief personal check-in — ask what's confusing or uninteresting — can restart engagement." },
  disengaged: { bg: '#fef2f2', border: '#fecaca', color: '#b91c1c', dot: '#dc2626',
    label: 'Disengaged for multiple sessions. Needs direct one-on-one attention before it becomes a dropout risk.' },
}

const avatarStyles: Record<string, { bg: string; color: string }> = {
  high:       { bg: '#f0fdfa', color: '#0F766E' },
  moderate:   { bg: '#fffbeb', color: '#d97706' },
  fading:     { bg: '#fff7ed', color: '#ea580c' },
  disengaged: { bg: '#fef2f2', color: '#dc2626' },
}

const cardStyle = {
  background: 'white',
  border: '1px solid #f1f5f9',
  borderRadius: '16px',
  boxShadow: '0 1px 2px rgba(0,0,0,0.03), 0 4px 12px rgba(15,118,110,0.04)',
}

export function StudentDetail({ studentId, onBack }: Props) {
  const student = STUDENTS.find(s => s.id === studentId)
  if (!student) return null

  const avgDwell   = (student.signals.dwellTime   / 1000).toFixed(1)
  const avgLatency = (student.signals.responseLatency / 1000).toFixed(1)
  const accuracy   = Math.round(student.signals.errorRateTrend * 100)
  const interp     = interpConfig[student.status]
  const av         = avatarStyles[student.status]

  const signalColor = { high: '#0F766E', moderate: '#d97706', fading: '#ea580c', disengaged: '#dc2626' }[student.status]
  const dwellFill   = Math.min(100, (student.signals.dwellTime         / 9000) * 100)
  const revisitFill = Math.min(100, (student.signals.revisitCount      /   12) * 100)
  const explFill    = Math.min(100, (student.signals.explorationDepth  /   15) * 100)

  return (
    <div style={{ background: '#ffffff', minHeight: '100vh' }}>
      <Header onBack={onBack} title={student.name} />

      <main className="max-w-3xl mx-auto px-4 sm:px-6 py-10 space-y-5 animate-fade-in">

        {/* Profile */}
        <div style={cardStyle} className="p-6">
          <div className="flex items-start gap-4 mb-5">
            <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-lg font-extrabold flex-shrink-0"
              style={{ background: av.bg, color: av.color }}>
              {student.avatar}
            </div>
            <div className="flex-1 min-w-0">
              <h1 className="text-xl font-extrabold tracking-tight" style={{ color: '#0C1825' }}>{student.name}</h1>
              <div className="flex items-center gap-2 mt-1.5 flex-wrap">
                <EngagementBadge status={student.status} size="md" />
                <span className="text-xs flex items-center gap-1" style={{ color: '#94a3b8' }}>
                  <Clock className="w-3 h-3" /> {student.lastSeen}
                </span>
              </div>
              <div className="flex items-center gap-1.5 mt-1.5">
                <BookOpen className="w-3.5 h-3.5" style={{ color: '#cbd5e1' }} />
                <span className="text-sm" style={{ color: '#64748b' }}>{student.currentTopic}</span>
              </div>
            </div>
            <ScoreRing score={student.score} size={62} />
          </div>

          {/* Interpretation */}
          <div className="flex items-start gap-3 rounded-xl p-4"
            style={{ background: interp.bg, border: `1px solid ${interp.border}` }}>
            <span className="w-2 h-2 rounded-full mt-1 flex-shrink-0" style={{ background: interp.dot }} />
            <p className="text-sm leading-relaxed" style={{ color: interp.color }}>{interp.label}</p>
          </div>
        </div>

        {/* Chart */}
        <div style={cardStyle} className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-base font-bold" style={{ color: '#0C1825' }}>Engagement Timeline</h2>
              <p className="text-xs mt-0.5" style={{ color: '#94a3b8' }}>Last 10 sessions</p>
            </div>
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full"
              style={{ background: '#f0fdfa', color: '#0F766E', border: '1px solid #99f6e4' }}>
              {student.sessions.filter(s => s.curiositySpike).length} spikes detected
            </span>
          </div>
          <EngagementChart sessions={student.sessions} />
        </div>

        {/* Signals */}
        <div style={cardStyle} className="p-6">
          <h2 className="text-base font-bold mb-0.5" style={{ color: '#0C1825' }}>Behavioral Signals</h2>
          <p className="text-xs mb-2" style={{ color: '#94a3b8' }}>Computed from session interaction data</p>
          <SignalRow icon={<Eye className="w-4 h-4"      />} label="Avg dwell time"     sub="Time reading / exploring content"             value={`${avgDwell}s`}   fill={dwellFill}   fillColor={signalColor} />
          <SignalRow icon={<Zap className="w-4 h-4"      />} label="Response latency"   sub="Time from prompt to first input"              value={`${avgLatency}s`} />
          <SignalRow icon={<RefreshCw className="w-4 h-4"/>} label="Voluntary revisits" sub="Returned to content without prompting"         value={String(student.signals.revisitCount)}      fill={revisitFill} fillColor={signalColor} />
          <SignalRow icon={<Target className="w-4 h-4"   />} label="Accuracy"           sub="Rolling success rate on recent attempts"       value={`${accuracy}%`}  fill={accuracy}    fillColor={signalColor} />
          <SignalRow icon={<BookOpen className="w-4 h-4" />} label="Exploration depth"  sub="Linked topics followed from current material"  value={String(student.signals.explorationDepth)}  fill={explFill}    fillColor={signalColor} />
        </div>

        {/* Sessions */}
        <div style={cardStyle} className="p-6">
          <h2 className="text-base font-bold mb-4" style={{ color: '#0C1825' }}>Recent Sessions</h2>
          {student.sessions.slice(-5).reverse().map((session, i) => {
            const sc = session.score >= 70 ? '#16a34a' : session.score >= 50 ? '#d97706' : session.score >= 30 ? '#ea580c' : '#dc2626'
            return (
              <div key={i} className="flex items-center gap-3 py-3" style={{ borderBottom: i < 4 ? '1px solid #f8fafc' : 'none' }}>
                <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: sc }} />
                <p className="text-xs font-medium w-16 flex-shrink-0" style={{ color: '#94a3b8' }}>{session.date}</p>
                <p className="text-sm flex-1 truncate" style={{ color: '#334155' }}>{session.topic}</p>
                <div className="flex items-center gap-1.5 flex-shrink-0">
                  {session.curiositySpike && (
                    <span className="text-xs px-2 py-0.5 rounded-full font-semibold"
                      style={{ background: '#fffbeb', color: '#b45309', border: '1px solid #fde68a' }}>Spark</span>
                  )}
                  {session.confusionFlag && (
                    <span className="text-xs px-2 py-0.5 rounded-full font-semibold"
                      style={{ background: '#fff7ed', color: '#c2410c', border: '1px solid #fed7aa' }}>Confused</span>
                  )}
                  <span className="text-sm font-extrabold w-7 text-right" style={{ color: sc }}>{session.score}</span>
                </div>
              </div>
            )
          })}
        </div>

      </main>
    </div>
  )
}
