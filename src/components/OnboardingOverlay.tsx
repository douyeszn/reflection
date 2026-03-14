import { Users, Bell, BookOpen, BarChart2, Circle, ArrowRight } from 'lucide-react'

interface Props {
  onDismiss: () => void
}

const tabs = [
  {
    icon: <Users className="w-4 h-4" />,
    name: 'Students',
    desc: 'Every student ranked by curiosity score. Sort by "needs help first" to see who requires attention immediately.',
    color: '#0F766E', bg: '#f0fdfa', border: '#ccfbf1',
  },
  {
    icon: <Bell className="w-4 h-4" />,
    name: 'Alerts',
    desc: 'Auto-generated when a student has been fading or disengaged for 2+ sessions. Mark contacted to track your follow-ups.',
    color: '#c2410c', bg: '#fff7ed', border: '#fed7aa',
  },
  {
    icon: <BookOpen className="w-4 h-4" />,
    name: 'Topics',
    desc: 'Which subjects have the most struggling students. Click any topic to instantly filter your class list.',
    color: '#7c3aed', bg: '#f5f3ff', border: '#ddd6fe',
  },
  {
    icon: <BarChart2 className="w-4 h-4" />,
    name: 'Class Pulse',
    desc: 'Class-wide engagement over 10 sessions plus individual sparklines. Live student sessions appear here in real time.',
    color: '#0369a1', bg: '#f0f9ff', border: '#bae6fd',
  },
]

const statuses = [
  { dot: '#16a34a', label: 'High',       desc: 'Curiosity spike — deep engagement. Let them explore.' },
  { dot: '#d97706', label: 'Moderate',   desc: 'Steady. A small challenge increase can push them higher.' },
  { dot: '#ea580c', label: 'Fading',     desc: 'Spark dropping. A quick personal check-in can restart it.' },
  { dot: '#dc2626', label: 'Disengaged', desc: 'Multiple sessions of low engagement. Needs direct attention.' },
]

export function OnboardingOverlay({ onDismiss }: Props) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center px-4"
      style={{ background: 'rgba(12,24,37,0.7)', backdropFilter: 'blur(6px)' }}
    >
      <div
        className="w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-3xl animate-slide-up"
        style={{ background: 'white', boxShadow: '0 24px 80px rgba(0,0,0,0.25)' }}
      >
        {/* Header */}
        <div className="px-7 pt-7 pb-5" style={{ borderBottom: '1px solid #f1f5f9' }}>
          <div className="flex items-center gap-2 mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
            <p className="text-xs font-bold uppercase tracking-widest" style={{ color: '#94a3b8' }}>First time here</p>
          </div>
          <h2 className="text-2xl font-extrabold leading-tight mb-1"
            style={{ color: '#0C1825', fontFamily: "'Bricolage Grotesque', system-ui, sans-serif" }}>
            Welcome to Reflection.
          </h2>
          <p className="text-sm" style={{ color: '#64748b' }}>
            Here's what you're looking at — takes 30 seconds.
          </p>
        </div>

        <div className="px-7 py-5 space-y-6">
          {/* Tabs */}
          <div>
            <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: '#94a3b8' }}>The four tabs</p>
            <div className="space-y-2">
              {tabs.map(({ icon, name, desc, color, bg, border }) => (
                <div key={name} className="flex items-start gap-3 rounded-xl p-3.5"
                  style={{ background: bg, border: `1px solid ${border}` }}>
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
                    style={{ background: 'white', border: `1px solid ${border}`, color }}>
                    {icon}
                  </div>
                  <div>
                    <p className="text-sm font-bold" style={{ color: '#0C1825' }}>{name}</p>
                    <p className="text-xs mt-0.5 leading-relaxed" style={{ color: '#64748b' }}>{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Status colors */}
          <div>
            <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: '#94a3b8' }}>What the colours mean</p>
            <div className="rounded-2xl overflow-hidden" style={{ border: '1px solid #f1f5f9' }}>
              {statuses.map(({ dot, label, desc }, i) => (
                <div key={label} className="flex items-start gap-3 px-4 py-3"
                  style={{ borderBottom: i < statuses.length - 1 ? '1px solid #f8fafc' : 'none' }}>
                  <Circle className="w-3 h-3 mt-0.5 flex-shrink-0" style={{ color: dot, fill: dot }} />
                  <div>
                    <span className="text-sm font-semibold" style={{ color: '#0C1825' }}>{label} </span>
                    <span className="text-sm" style={{ color: '#64748b' }}>— {desc}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Signal note */}
          <div className="rounded-xl px-4 py-3.5" style={{ background: '#f0fdfa', border: '1px solid #ccfbf1' }}>
            <p className="text-xs font-bold mb-1" style={{ color: '#0F766E' }}>Where does the data come from?</p>
            <p className="text-xs leading-relaxed" style={{ color: '#0d9488' }}>
              Scores are built from five passive signals: dwell time, response latency, revisit count, quiz accuracy, and exploration depth. No extra quizzes. No interruptions.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="px-7 pb-7">
          <button
            onClick={onDismiss}
            className="w-full flex items-center justify-center gap-2 rounded-2xl py-3.5 text-sm font-bold"
            style={{ background: '#0C1825', color: 'white', border: 'none', cursor: 'pointer', transition: 'background 0.25s' }}
            onMouseEnter={e => (e.currentTarget.style.background = '#0F766E')}
            onMouseLeave={e => (e.currentTarget.style.background = '#0C1825')}
          >
            Got it, show me the dashboard <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  )
}
