import { memo } from 'react'
import { Sparkles, Zap, Users, TrendingUp, ArrowRight, ShieldCheck } from 'lucide-react'

interface Props {
  onEnter: () => void
}

const stats = [
  { value: '20M+', label: 'out-of-school children in Africa' },
  { value: '1:60',  label: 'teacher-to-student ratio' },
  { value: '27%',  label: 'rural schools connected' },
  { value: '5',    label: 'curiosity signals tracked' },
]

const features = [
  {
    icon: <Zap className="w-5 h-5" />,
    color: '#d97706', bg: '#fffbeb', border: '#fde68a',
    tag: 'Detection',
    title: 'See whose spark is fading',
    desc: 'Dwell time, revisit rate, and exploration depth surface as behavioral signals — no interruption to learning.',
  },
  {
    icon: <Users className="w-5 h-5" />,
    color: '#0F766E', bg: '#ccfbf1', border: '#5eead4',
    tag: 'Alerts',
    title: 'Named students, not averages',
    desc: 'Know exactly which student is disengaging, on which topic, and since when — not a class-wide percentage.',
  },
  {
    icon: <TrendingUp className="w-5 h-5" />,
    color: '#15803d', bg: '#bbf7d0', border: '#86efac',
    tag: 'History',
    title: 'Track curiosity over time',
    desc: 'Session-by-session timelines with curiosity spikes and confusion markers — spot patterns before they become problems.',
  },
]

// Mini dashboard preview — the "unforgettable" hero visual
const PREVIEW_STUDENTS = [
  { initials: 'AU', name: 'Amara U.',    score: 38, status: 'fading',     color: '#ea580c' },
  { initials: 'NB', name: 'Nakato B.',   score: 91, status: 'high',       color: '#0F766E' },
  { initials: 'KM', name: 'Kofi M.',     score: 22, status: 'disengaged', color: '#dc2626' },
  { initials: 'FD', name: 'Fatima D.',   score: 88, status: 'high',       color: '#0F766E' },
  { initials: 'ER', name: 'Emmanuel R.', score: 58, status: 'moderate',   color: '#d97706' },
]

const DashboardPreview = memo(function DashboardPreview() {
  return (
    <div
      className="animate-float relative w-full max-w-sm mx-auto"
      style={{
        background: 'white',
        borderRadius: '20px',
        border: '1px solid #f1f5f9',
        boxShadow: '0 4px 24px rgba(15,118,110,0.08), 0 24px 64px rgba(15,118,110,0.10), 0 1px 0 rgba(255,255,255,0.8) inset',
        overflow: 'hidden',
      }}
    >
      {/* Mini header */}
      <div style={{ background: 'white', borderBottom: '1px solid #f8fafc', padding: '12px 16px' }}
        className="flex items-center gap-2">
        <div className="w-5 h-5 rounded-md flex items-center justify-center" style={{ background: '#0F766E' }}>
          <Sparkles className="w-2.5 h-2.5 text-white" />
        </div>
        <span className="text-xs font-bold" style={{ color: '#0C1825' }}>Reflection</span>
        <div className="ml-auto flex items-center gap-1.5 rounded-full px-2 py-0.5 text-xs font-semibold"
          style={{ background: '#fff7ed', border: '1px solid #fed7aa', color: '#c2410c' }}>
          <span className="w-1 h-1 rounded-full bg-orange-400" />
          4 alerts
        </div>
      </div>

      {/* Alert row */}
      <div style={{ background: '#fff7ed', borderBottom: '1px solid #fde68a', padding: '8px 16px' }}
        className="flex items-center gap-2">
        <span className="text-xs font-medium" style={{ color: '#c2410c' }}>
          ⚠ Amara's spark is fading on Fractions
        </span>
      </div>

      {/* Students */}
      <div style={{ padding: '8px 0' }}>
        {PREVIEW_STUDENTS.map((s, i) => (
          <div
            key={s.initials}
            className="flex items-center gap-3 px-4 py-2.5"
            style={{
              borderBottom: i < PREVIEW_STUDENTS.length - 1 ? '1px solid #fafafa' : 'none',
              animationDelay: `${i * 80}ms`,
            }}
          >
            <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0"
              style={{ background: '#f1f5f9', color: s.color }}>
              {s.initials}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold truncate" style={{ color: '#0C1825' }}>{s.name}</p>
              {/* Score bar */}
              <div className="mt-1 h-1 rounded-full overflow-hidden" style={{ background: '#f1f5f9' }}>
                <div className="h-full rounded-full" style={{ width: `${s.score}%`, background: s.color, transition: 'width 0.8s' }} />
              </div>
            </div>
            <span className="text-xs font-extrabold flex-shrink-0" style={{ color: s.color }}>{s.score}</span>
          </div>
        ))}
      </div>
    </div>
  )
})

export function Landing({ onEnter }: Props) {
  return (
    <div style={{ background: '#FAFAF5', color: '#0C1825' }}>

      {/* ── Nav ── */}
      <nav className="sticky top-0 z-10 px-6 sm:px-10 h-16 flex items-center justify-between w-full"
        style={{ background: 'rgba(250,250,245,0.85)', backdropFilter: 'blur(12px)', borderBottom: '1px solid #e2e8f0' }}>
        <div className="flex items-center gap-2.5 max-w-6xl mx-auto w-full justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: '#0F766E' }}>
              <Sparkles className="w-3.5 h-3.5 text-white" />
            </div>
            <span className="font-bold text-base tracking-tight" style={{ color: '#0C1825', fontFamily: "'Bricolage Grotesque', system-ui, sans-serif" }}>
              Reflection
            </span>
          </div>
          <button onClick={onEnter} className="btn-primary" style={{ padding: '8px 18px', fontSize: '13px' }}>
            Open dashboard
          </button>
        </div>
      </nav>

      {/* ── Hero — split layout with dot grid texture ── */}
      <section className="dot-grid relative overflow-hidden">
        {/* Warm gradient overlay over dot grid */}
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: 'linear-gradient(135deg, rgba(250,250,245,0.97) 50%, rgba(240,253,250,0.85) 100%)' }} />

        <div className="relative max-w-6xl mx-auto px-6 sm:px-10 py-20 sm:py-28">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

            {/* Left: text */}
            <div className="animate-fade-in">
              <h1 className="font-extrabold leading-[1.06] tracking-tight mb-6"
                style={{ fontSize: 'clamp(38px, 5.5vw, 68px)', color: '#0C1825', fontFamily: "'Bricolage Grotesque', system-ui, sans-serif" }}>
                No passion<br />should go<br />
                <span style={{ color: '#0F766E' }}>undiscovered.</span>
              </h1>

              <p className="leading-relaxed mb-10 max-w-md"
                style={{ fontSize: 'clamp(15px, 1.7vw, 17px)', color: '#64748b' }}>
                In classrooms where one teacher faces 60 students,
                Reflection detects whose curiosity is fading —
                before it goes out.
              </p>

              <div className="flex flex-wrap gap-3 mb-8">
                <button onClick={onEnter} className="btn-warm">
                  Open classroom dashboard
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button className="btn-secondary">
                  See how it works
                </button>
              </div>

              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 flex-shrink-0" style={{ color: '#16a34a' }} />
                <span className="text-xs" style={{ color: '#94a3b8' }}>
                  Offline-first · Kinyarwanda-ready · No sign-up needed
                </span>
              </div>
            </div>

            {/* Right: mini dashboard — the memorable visual */}
            <div className="hidden lg:block animate-slide-up" style={{ animationDelay: '150ms' }}>
              <DashboardPreview />
            </div>
          </div>
        </div>
      </section>

      {/* ── Stats marquee ── */}
      <div className="py-5 overflow-hidden relative"
        style={{ background: '#ccfbf1', borderTop: '1px solid #5eead4', borderBottom: '1px solid #5eead4' }}>
        <div className="absolute inset-y-0 left-0 w-20 z-10 pointer-events-none"
          style={{ background: 'linear-gradient(90deg, #ccfbf1, transparent)' }} />
        <div className="absolute inset-y-0 right-0 w-20 z-10 pointer-events-none"
          style={{ background: 'linear-gradient(270deg, #ccfbf1, transparent)' }} />
        <div className="animate-marquee flex gap-16 w-max">
          {[...stats, ...stats].map((s, i) => (
            <div key={i} className="flex items-baseline gap-2 flex-shrink-0">
              <span className="font-extrabold" style={{ fontSize: '22px', color: '#0F766E', fontFamily: "'Bricolage Grotesque', system-ui, sans-serif" }}>
                {s.value}
              </span>
              <span className="text-xs leading-tight" style={{ color: '#0d9488' }}>{s.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Features ── */}
      <section className="max-w-6xl mx-auto px-6 sm:px-10 py-24">
        <div className="text-center mb-14">
          <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: '#94a3b8' }}>How it works</p>
          <h2 className="font-extrabold tracking-tight leading-tight"
            style={{ fontSize: 'clamp(28px,4vw,44px)', color: '#0C1825', fontFamily: "'Bricolage Grotesque', system-ui, sans-serif" }}>
            Data that helps teachers act,<br />not just observe.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {features.map(({ icon, color, bg, border, tag, title, desc }, i) => (
            <div
              key={title}
              className="rounded-2xl p-7 flex flex-col gap-4 animate-slide-up"
              style={{
                background: bg, border: `1px solid ${border}`,
                boxShadow: '0 1px 3px rgba(0,0,0,0.03)',
                animationDelay: `${i * 100}ms`,
                transition: 'transform 0.5s cubic-bezier(0.19,1,0.22,1), box-shadow 0.5s cubic-bezier(0.19,1,0.22,1)',
              }}
              onMouseEnter={e => {
                const el = e.currentTarget as HTMLDivElement
                el.style.transform = 'translateY(-4px)'
                el.style.boxShadow = '0 12px 40px rgba(0,0,0,0.08)'
              }}
              onMouseLeave={e => {
                const el = e.currentTarget as HTMLDivElement
                el.style.transform = 'translateY(0)'
                el.style.boxShadow = '0 1px 3px rgba(0,0,0,0.03)'
              }}
            >
              <div>
                <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
                  style={{ background: 'rgba(255,255,255,0.7)', border: `1px solid ${border}`, color }}>
                  {icon}
                </div>
                <span className="text-xs font-bold uppercase tracking-widest" style={{ color }}>{tag}</span>
              </div>
              <div>
                <h3 className="font-bold text-base mb-2 leading-snug"
                  style={{ color: '#0C1825', fontFamily: "'Bricolage Grotesque', system-ui, sans-serif" }}>
                  {title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: '#64748b' }}>{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA banner ── */}
      <section className="py-20 px-6 sm:px-10" style={{ background: '#0C1825' }}>
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="font-extrabold text-white leading-tight mb-4"
            style={{ fontSize: 'clamp(26px,4vw,42px)', fontFamily: "'Bricolage Grotesque', system-ui, sans-serif" }}>
            Ready to see your classroom differently?
          </h2>
          <p className="mb-8 text-base" style={{ color: 'rgba(255,255,255,0.45)' }}>
            Open the dashboard and see engagement patterns for 12 students — no sign-up needed.
          </p>
          <button onClick={onEnter} className="btn-warm">
            Open dashboard
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="py-7 px-6 sm:px-10 flex items-center justify-between max-w-6xl mx-auto"
        style={{ borderTop: '1px solid #e2e8f0' }}>
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-md flex items-center justify-center" style={{ background: '#0F766E' }}>
            <Sparkles className="w-3 h-3 text-white" />
          </div>
          <span className="text-xs font-bold" style={{ color: '#0C1825', fontFamily: "'Bricolage Grotesque', system-ui, sans-serif" }}>
            Reflection
          </span>
        </div>
        <p className="text-xs" style={{ color: '#94a3b8' }}>Built for classrooms where every spark matters</p>
      </footer>
    </div>
  )
}
