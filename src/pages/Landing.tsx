import { memo } from 'react'
import { Sparkles, Zap, Users, TrendingUp, ArrowRight, ShieldCheck, GraduationCap, BookOpen, BarChart2, Bell, Eye, Lightbulb, Twitter, Github, Mail } from 'lucide-react'

interface Props {
  onEnter: () => void
  onEnterClassroom: () => void
}

const stats = [
  { value: '20M+', label: 'out-of-school children in Africa' },
  { value: '1:60',  label: 'teacher-to-student ratio' },
  { value: '27%',  label: 'rural schools connected' },
  { value: '5',    label: 'curiosity signals tracked' },
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

export function Landing({ onEnter, onEnterClassroom }: Props) {
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

          <div className="hidden md:flex items-center gap-7">
            {[
              { label: 'How it works', id: 'how-it-works' },
              { label: 'For Teachers', id: 'for-teachers' },
              { label: 'For Students', id: 'for-students' },
            ].map(({ label, id }) => (
              <button key={label} className="text-sm font-medium"
                style={{ color: '#64748b', background: 'none', border: 'none', cursor: 'pointer', transition: 'color 0.25s' }}
                onClick={() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
                onMouseEnter={e => (e.currentTarget.style.color = '#0C1825')}
                onMouseLeave={e => (e.currentTarget.style.color = '#64748b')}>
                {label}
              </button>
            ))}
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
        {/* Decorative geometric accents */}
        <div className="absolute top-12 right-12 w-40 h-40 rounded-full pointer-events-none opacity-30"
          style={{ background: 'radial-gradient(circle, #ccfbf1 0%, transparent 70%)' }} />
        <div className="absolute bottom-0 left-8 w-28 h-28 rounded-2xl pointer-events-none opacity-20 rotate-12"
          style={{ background: '#fde68a' }} />

        <div className="relative max-w-6xl mx-auto px-6 sm:px-10 py-20 sm:py-28">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

            {/* Left: text */}
            <div className="animate-fade-in">
              <h1 className="font-extrabold leading-[1.03] mb-6"
                style={{ fontSize: 'clamp(40px, 5.8vw, 72px)', color: '#0C1825',
                  fontFamily: "'Bricolage Grotesque', system-ui, sans-serif",
                  letterSpacing: '-0.03em' }}>
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
                <button onClick={onEnterClassroom} className="btn-secondary">
                  <GraduationCap className="w-4 h-4" />
                  Student view
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
            <div className="hidden lg:flex flex-col items-center animate-slide-up relative" style={{ animationDelay: '150ms' }}>
              {/* Floating chips */}
              <div className="absolute -top-4 -left-6 z-10 flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-semibold animate-slide-up"
                style={{ background: '#fff7ed', border: '1px solid #fed7aa', color: '#c2410c', boxShadow: '0 4px 16px rgba(234,88,12,0.12)', animationDelay: '400ms' }}>
                <span className="w-1.5 h-1.5 rounded-full bg-orange-400" />
                Amara fading · 3 days
              </div>
              <div className="absolute -bottom-4 -right-4 z-10 flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-semibold animate-slide-up"
                style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', color: '#15803d', boxShadow: '0 4px 16px rgba(21,128,61,0.10)', animationDelay: '550ms' }}>
                <TrendingUp className="w-3 h-3" />
                Nakato on a spike
              </div>
              <div className="absolute top-1/2 -right-10 z-10 flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-semibold animate-slide-up"
                style={{ background: 'white', border: '1px solid #e2e8f0', color: '#0C1825', boxShadow: '0 4px 16px rgba(0,0,0,0.06)', animationDelay: '650ms' }}>
                <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
                Live · Just now
              </div>
              <DashboardPreview />
            </div>
          </div>
        </div>
      </section>

      {/* ── Stats marquee ── */}
      <div className="py-5 overflow-hidden relative"
        style={{ background: '#0C1825', borderTop: '1px solid rgba(255,255,255,0.06)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <div className="absolute inset-y-0 left-0 w-20 z-10 pointer-events-none"
          style={{ background: 'linear-gradient(90deg, #0C1825, transparent)' }} />
        <div className="absolute inset-y-0 right-0 w-20 z-10 pointer-events-none"
          style={{ background: 'linear-gradient(270deg, #0C1825, transparent)' }} />
        <div className="animate-marquee flex gap-16 w-max">
          {[...stats, ...stats].map((s, i) => (
            <div key={i} className="flex items-baseline gap-2 flex-shrink-0">
              <span className="font-extrabold" style={{ fontSize: '22px', color: '#2dd4bf', fontFamily: "'Bricolage Grotesque', system-ui, sans-serif" }}>
                {s.value}
              </span>
              <span className="text-xs leading-tight" style={{ color: 'rgba(255,255,255,0.4)' }}>{s.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Features: alternating full-width color-block strips ── */}
      <div>
        {[
          {
            tag: 'Detection', color: '#b45309', sectionBg: '#fffbeb', accentBg: '#fde68a',
            title: 'See whose spark is fading',
            desc: 'Dwell time, revisit rate, and exploration depth surface as passive behavioral signals — no quizzes, no interruptions to the learning flow.',
            visual: (
              <div className="rounded-2xl p-5 space-y-3" style={{ background: 'white', border: '1px solid #fde68a', boxShadow: '0 4px 24px rgba(180,83,9,0.08)' }}>
                {[{ name: 'Amara U.', score: 38, color: '#ea580c' }, { name: 'Kofi M.', score: 22, color: '#dc2626' }, { name: 'Emmanuel R.', score: 58, color: '#d97706' }].map(s => (
                  <div key={s.name} className="flex items-center gap-3">
                    <p className="text-xs font-semibold w-24 flex-shrink-0" style={{ color: '#0C1825' }}>{s.name}</p>
                    <div className="flex-1 h-2 rounded-full overflow-hidden" style={{ background: '#f1f5f9' }}>
                      <div className="h-full rounded-full" style={{ width: `${s.score}%`, background: s.color }} />
                    </div>
                    <span className="text-xs font-extrabold w-7 text-right" style={{ color: s.color }}>{s.score}</span>
                  </div>
                ))}
                <div className="mt-2 flex items-center gap-2 rounded-lg px-3 py-2" style={{ background: '#fff7ed', border: '1px solid #fed7aa' }}>
                  <span className="text-xs font-semibold" style={{ color: '#c2410c' }}>⚠ 2 students fading on Fractions</span>
                </div>
              </div>
            ),
            reverse: false,
          },
          {
            tag: 'Alerts', color: '#0F766E', sectionBg: '#f0fdfa', accentBg: '#ccfbf1',
            title: 'Named students, not averages',
            desc: "Know exactly which student is disengaging, on which topic, and since when — not a class-wide percentage that hides everyone.",
            visual: (
              <div className="rounded-2xl overflow-hidden" style={{ background: 'white', border: '1px solid #ccfbf1', boxShadow: '0 4px 24px rgba(15,118,110,0.08)' }}>
                <div className="px-5 py-3 flex items-center justify-between" style={{ borderBottom: '1px solid #f0fdfa' }}>
                  <span className="text-xs font-bold" style={{ color: '#0C1825' }}>Priority Alerts</span>
                  <span className="text-xs font-semibold px-2 py-0.5 rounded-full" style={{ background: '#fff7ed', color: '#c2410c', border: '1px solid #fed7aa' }}>3 students</span>
                </div>
                {[
                  { initials: 'AU', name: 'Amara U.', topic: 'Fractions', days: '3 days', color: '#ea580c' },
                  { initials: 'KM', name: 'Kofi M.', topic: 'Algebra', days: '5 days', color: '#dc2626' },
                  { initials: 'ER', name: 'Emmanuel R.', topic: 'Geometry', days: '1 day', color: '#d97706' },
                ].map((s, i, arr) => (
                  <div key={s.name} className="px-5 py-3 flex items-center gap-3" style={{ borderBottom: i < arr.length - 1 ? '1px solid #f8fafc' : 'none' }}>
                    <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-extrabold flex-shrink-0" style={{ background: '#f1f5f9', color: s.color }}>{s.initials}</div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold" style={{ color: '#0C1825' }}>{s.name}</p>
                      <p className="text-xs" style={{ color: '#94a3b8' }}>{s.topic}</p>
                    </div>
                    <span className="text-xs font-semibold" style={{ color: s.color }}>Fading · {s.days}</span>
                  </div>
                ))}
              </div>
            ),
            reverse: true,
          },
          {
            tag: 'History', color: '#15803d', sectionBg: '#f0fdf4', accentBg: '#bbf7d0',
            title: 'Track curiosity over time',
            desc: 'Session-by-session timelines with curiosity spikes and confusion markers — spot the pattern before it becomes a dropout risk.',
            visual: (
              <div className="rounded-2xl p-5" style={{ background: 'white', border: '1px solid #bbf7d0', boxShadow: '0 4px 24px rgba(21,128,61,0.08)' }}>
                <p className="text-xs font-semibold mb-3" style={{ color: '#0C1825' }}>Nakato B. — last 8 sessions</p>
                <div className="flex items-end gap-1.5 h-16">
                  {[40, 55, 48, 70, 65, 82, 91, 88].map((v, i) => (
                    <div key={i} className="flex-1 rounded-t-sm" style={{ height: `${v}%`, background: v >= 75 ? '#16a34a' : v >= 55 ? '#0F766E' : '#94a3b8', opacity: 0.85 }} />
                  ))}
                </div>
                <div className="flex justify-between mt-2">
                  {['W1','W2','W3','W4','W5','W6','W7','W8'].map(w => (
                    <span key={w} className="text-xs flex-1 text-center" style={{ color: '#cbd5e1' }}>{w}</span>
                  ))}
                </div>
                <div className="mt-3 flex items-center gap-2 rounded-lg px-3 py-2" style={{ background: '#f0fdf4', border: '1px solid #bbf7d0' }}>
                  <TrendingUp className="w-3 h-3 flex-shrink-0" style={{ color: '#16a34a' }} />
                  <span className="text-xs font-semibold" style={{ color: '#15803d' }}>Curiosity spike detected · W7–W8</span>
                </div>
              </div>
            ),
            reverse: false,
          },
        ].map(({ tag, color, sectionBg, accentBg, title, desc, visual, reverse }) => (
          <div key={tag} className="relative overflow-hidden" style={{ background: sectionBg }}>
            {/* Decorative corner circle */}
            <div className="absolute pointer-events-none opacity-40"
              style={{ width: 180, height: 180, borderRadius: '50%', background: accentBg,
                ...(reverse ? { bottom: -40, left: -40 } : { top: -40, right: -40 }) }} />
            <div className="relative max-w-6xl mx-auto px-6 sm:px-10 py-20">
              <div className={`grid grid-cols-1 lg:grid-cols-2 gap-16 items-center ${reverse ? 'lg:[direction:rtl]' : ''}`}>
                <div className={reverse ? 'lg:[direction:ltr]' : ''}>
                  <span className="text-xs font-bold uppercase tracking-widest" style={{ color }}>{tag}</span>
                  <h2 className="font-extrabold mt-3 mb-4 leading-tight"
                    style={{ fontSize: 'clamp(26px,3.5vw,40px)', color: '#0C1825',
                      fontFamily: "'Bricolage Grotesque', system-ui, sans-serif", letterSpacing: '-0.02em' }}>
                    {title}
                  </h2>
                  <p className="text-base leading-relaxed" style={{ color: '#64748b' }}>{desc}</p>
                </div>
                <div className={reverse ? 'lg:[direction:ltr]' : ''}>{visual}</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ── Signal toolkit 2×2 grid ── */}
      <section className="max-w-6xl mx-auto px-6 sm:px-10 py-24">
        <div className="text-center mb-14">
          <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: '#94a3b8' }}>The signals</p>
          <h2 className="font-extrabold tracking-tight"
            style={{ fontSize: 'clamp(28px,4vw,44px)', color: '#0C1825',
              fontFamily: "'Bricolage Grotesque', system-ui, sans-serif", letterSpacing: '-0.025em' }}>
            Five signals. One score.<br />One clear action.
          </h2>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: 'Dwell Time', sub: 'How long they linger on content', color: '#0F766E', bg: '#f0fdfa', border: '#ccfbf1', icon: <Eye className="w-5 h-5" /> },
            { label: 'Revisit Rate', sub: 'Returning without being asked', color: '#b45309', bg: '#fffbeb', border: '#fde68a', icon: <BookOpen className="w-5 h-5" /> },
            { label: 'Exploration Depth', sub: 'Following linked topics', color: '#7c3aed', bg: '#f5f3ff', border: '#ddd6fe', icon: <Zap className="w-5 h-5" /> },
            { label: 'Response Latency', sub: 'Time to first answer', color: '#0369a1', bg: '#f0f9ff', border: '#bae6fd', icon: <BarChart2 className="w-5 h-5" /> },
          ].map(({ label, sub, color, bg, border, icon }) => (
            <div key={label} className="rounded-2xl p-6 flex flex-col gap-3"
              style={{ background: bg, border: `1px solid ${border}`,
                transition: 'transform 0.4s cubic-bezier(0.19,1,0.22,1)',
              }}
              onMouseEnter={e => (e.currentTarget.style.transform = 'translateY(-4px)')}
              onMouseLeave={e => (e.currentTarget.style.transform = 'translateY(0)')}>
              <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                style={{ background: 'rgba(255,255,255,0.7)', border: `1px solid ${border}`, color }}>
                {icon}
              </div>
              <div>
                <p className="font-bold text-sm" style={{ color: '#0C1825', fontFamily: "'Bricolage Grotesque', system-ui, sans-serif" }}>{label}</p>
                <p className="text-xs mt-1 leading-relaxed" style={{ color: '#64748b' }}>{sub}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── How it works: 3 steps ── */}
      <section id="how-it-works" style={{ background: '#f8fafc', borderTop: '1px solid #f1f5f9', borderBottom: '1px solid #f1f5f9' }}
        className="px-6 sm:px-10 py-24">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: '#94a3b8' }}>The process</p>
            <h2 className="font-extrabold"
              style={{ fontSize: 'clamp(28px,4vw,44px)', color: '#0C1825',
                fontFamily: "'Bricolage Grotesque', system-ui, sans-serif", letterSpacing: '-0.025em' }}>
              Three steps. Zero disruption.
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {/* Connector line (desktop only) */}
            <div className="hidden md:block absolute top-8 left-1/6 right-1/6 h-px" style={{ background: 'linear-gradient(90deg, transparent, #e2e8f0 20%, #e2e8f0 80%, transparent)' }} />
            {[
              {
                n: '01', color: '#0F766E', bg: '#f0fdfa',
                title: 'Students learn naturally',
                desc: 'Dwell time, revisits, exploration depth, and response latency are passively collected — no quizzes, no interruptions.',
              },
              {
                n: '02', color: '#d97706', bg: '#fffbeb',
                title: 'Reflection detects patterns',
                desc: 'Five behavioral signals are combined into a curiosity score per student, per topic, updated each session.',
              },
              {
                n: '03', color: '#dc2626', bg: '#fef2f2',
                title: 'Teacher gets a named alert',
                desc: 'Not "25% of the class is struggling." Exactly which student, on which topic, and for how many days.',
              },
            ].map(({ n, color, bg, title, desc }) => (
              <div key={n} className="flex flex-col gap-4">
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center font-extrabold text-lg flex-shrink-0"
                  style={{ background: bg, color, fontFamily: "'Bricolage Grotesque', system-ui, sans-serif", border: `1px solid ${bg === '#f0fdfa' ? '#ccfbf1' : bg === '#fffbeb' ? '#fde68a' : '#fecaca'}` }}>
                  {n}
                </div>
                <div>
                  <h3 className="font-bold text-base mb-1.5 leading-snug"
                    style={{ color: '#0C1825', fontFamily: "'Bricolage Grotesque', system-ui, sans-serif" }}>
                    {title}
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: '#64748b' }}>{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Social proof quote ── */}
      <section className="max-w-6xl mx-auto px-6 sm:px-10 py-20">
        <div className="rounded-3xl p-10 md:p-14 relative overflow-hidden"
          style={{ background: '#f0fdfa', border: '1px solid #ccfbf1' }}>
          <div className="absolute top-0 right-0 w-48 h-48 rounded-full opacity-20 pointer-events-none"
            style={{ background: 'radial-gradient(circle, #0F766E 0%, transparent 70%)', transform: 'translate(30%, -30%)' }} />
          <div className="relative max-w-2xl">
            <p className="text-3xl font-extrabold leading-snug mb-6"
              style={{ color: '#0C1825', fontFamily: "'Bricolage Grotesque', system-ui, sans-serif" }}>
              "I have 58 students. By the time I notice one is lost, they've already given up."
            </p>
            <p className="text-sm mb-6" style={{ color: '#0d9488' }}>
              Reflection was built because of that sentence.
            </p>
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-extrabold flex-shrink-0"
                style={{ background: '#0F766E', color: 'white' }}>MT</div>
              <div>
                <p className="text-sm font-semibold" style={{ color: '#0C1825' }}>Mr. Tuyishime</p>
                <p className="text-xs" style={{ color: '#94a3b8' }}>Mathematics teacher · Kigali, Rwanda</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── For Students / For Teachers ── */}
      <section id="for-teachers" style={{ background: '#0C1825' }} className="px-6 sm:px-10 pt-24 pb-0">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: 'rgba(255,255,255,0.3)' }}>
              Who it's for
            </p>
            <h2 className="font-extrabold text-white leading-tight"
              style={{ fontSize: 'clamp(28px,4vw,44px)', fontFamily: "'Bricolage Grotesque', system-ui, sans-serif" }}>
              One classroom. Two perspectives.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-16" style={{ borderBottom: '1px solid rgba(255,255,255,0.07)' }}>

            {/* For Teachers */}
            <div className="rounded-2xl p-8 flex flex-col gap-6"
              style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
              <div>
                <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-4"
                  style={{ background: '#0F766E' }}>
                  <GraduationCap className="w-5 h-5 text-white" />
                </div>
                <span className="text-xs font-bold uppercase tracking-widest" style={{ color: '#0F766E' }}>For Teachers</span>
                <h3 className="text-xl font-extrabold text-white mt-2 leading-snug"
                  style={{ fontFamily: "'Bricolage Grotesque', system-ui, sans-serif" }}>
                  Know every student by name,<br />not by average.
                </h3>
              </div>
              <ul className="space-y-4">
                {[
                  { icon: <Bell className="w-4 h-4" />, text: 'Priority alerts when a student\'s spark starts fading' },
                  { icon: <BarChart2 className="w-4 h-4" />, text: 'Per-student engagement timelines across sessions' },
                  { icon: <Eye className="w-4 h-4" />, text: 'Behavioral signals — not grades, not guesses' },
                  { icon: <Users className="w-4 h-4" />, text: 'See all 60 students at once, act on the right 3' },
                ].map(({ icon, text }) => (
                  <li key={text} className="flex items-start gap-3">
                    <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
                      style={{ background: 'rgba(15,118,110,0.15)', color: '#2dd4bf' }}>
                      {icon}
                    </div>
                    <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.65)' }}>{text}</p>
                  </li>
                ))}
              </ul>
              <button onClick={onEnter} className="btn-primary mt-auto" style={{ alignSelf: 'flex-start' }}>
                Sign in as teacher
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* For Students */}
            <div id="for-students" className="rounded-2xl p-8 flex flex-col gap-6"
              style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
              <div>
                <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-4"
                  style={{ background: '#f97316' }}>
                  <Lightbulb className="w-5 h-5 text-white" />
                </div>
                <span className="text-xs font-bold uppercase tracking-widest" style={{ color: '#f97316' }}>For Students</span>
                <h3 className="text-xl font-extrabold text-white mt-2 leading-snug"
                  style={{ fontFamily: "'Bricolage Grotesque', system-ui, sans-serif" }}>
                  Your curiosity shapes<br />how you're taught.
                </h3>
              </div>
              <ul className="space-y-4">
                {[
                  { icon: <Lightbulb className="w-4 h-4" />, text: 'Your natural exploration patterns guide your learning path' },
                  { icon: <BookOpen className="w-4 h-4" />, text: 'Teachers know when you\'re confused — before you fall behind' },
                  { icon: <TrendingUp className="w-4 h-4" />, text: 'Curiosity spikes get recognized, not just test scores' },
                  { icon: <ShieldCheck className="w-4 h-4" />, text: 'No data leaves the classroom — privacy-first by design' },
                ].map(({ icon, text }) => (
                  <li key={text} className="flex items-start gap-3">
                    <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
                      style={{ background: 'rgba(249,115,22,0.15)', color: '#fb923c' }}>
                      {icon}
                    </div>
                    <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.65)' }}>{text}</p>
                  </li>
                ))}
              </ul>
              <button onClick={onEnterClassroom}
                className="flex items-center justify-center gap-2 w-full rounded-xl py-3 text-sm font-bold"
                style={{ background: '#f97316', color: 'white', border: 'none', cursor: 'pointer', transition: 'all 0.25s' }}
                onMouseEnter={e => (e.currentTarget.style.background = '#ea580c')}
                onMouseLeave={e => (e.currentTarget.style.background = '#f97316')}>
                <GraduationCap className="w-4 h-4" /> Try student view
              </button>
              <div className="flex items-center gap-2 rounded-xl px-4 py-3"
                style={{ background: 'rgba(249,115,22,0.08)', border: '1px solid rgba(249,115,22,0.2)' }}>
                <span className="w-1.5 h-1.5 rounded-full bg-orange-400 flex-shrink-0" />
                <p className="text-xs" style={{ color: 'rgba(255,255,255,0.5)' }}>
                  No account needed · Works offline · Kinyarwanda-ready
                </p>
              </div>
            </div>
          </div>

          {/* ── CTA inside dark section ── */}
          <div className="py-20 text-center">
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
        </div>
      </section>

      {/* ── Footer ── */}
      <footer style={{ background: '#0a1118', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        <div className="max-w-6xl mx-auto px-6 sm:px-10 pt-14 pb-8">

          {/* Top: brand + columns */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-10 pb-12" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>

            {/* Brand */}
            <div className="col-span-2 md:col-span-1">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: '#0F766E' }}>
                  <Sparkles className="w-3.5 h-3.5 text-white" />
                </div>
                <span className="font-extrabold text-white text-sm"
                  style={{ fontFamily: "'Bricolage Grotesque', system-ui, sans-serif" }}>
                  Reflection
                </span>
              </div>
              <p className="text-xs leading-relaxed mb-6" style={{ color: 'rgba(255,255,255,0.35)', maxWidth: '200px' }}>
                Curiosity detection for classrooms where every spark matters.
              </p>
              <div className="flex items-center gap-3">
                {[
                  { icon: <Twitter className="w-3.5 h-3.5" />, label: 'Twitter' },
                  { icon: <Github className="w-3.5 h-3.5" />, label: 'GitHub' },
                  { icon: <Mail className="w-3.5 h-3.5" />, label: 'Email' },
                ].map(({ icon, label }) => (
                  <button key={label} aria-label={label}
                    className="w-8 h-8 rounded-lg flex items-center justify-center"
                    style={{
                      background: 'rgba(255,255,255,0.05)',
                      border: '1px solid rgba(255,255,255,0.08)',
                      color: 'rgba(255,255,255,0.4)',
                      cursor: 'pointer',
                      transition: 'background 0.3s, color 0.3s',
                    }}
                    onMouseEnter={e => {
                      const el = e.currentTarget as HTMLButtonElement
                      el.style.background = 'rgba(255,255,255,0.1)'
                      el.style.color = 'rgba(255,255,255,0.9)'
                    }}
                    onMouseLeave={e => {
                      const el = e.currentTarget as HTMLButtonElement
                      el.style.background = 'rgba(255,255,255,0.05)'
                      el.style.color = 'rgba(255,255,255,0.4)'
                    }}
                  >
                    {icon}
                  </button>
                ))}
              </div>
            </div>

            {/* For Teachers */}
            <div>
              <p className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: '#2dd4bf' }}>For Teachers</p>
              <ul className="space-y-3">
                {['Class Overview', 'Student Alerts', 'Engagement History', 'Behavioral Signals', 'Topic Tracking'].map(item => (
                  <li key={item}>
                    <button className="text-xs text-left"
                      style={{ color: 'rgba(255,255,255,0.45)', background: 'none', border: 'none', cursor: 'pointer',
                        transition: 'color 0.25s' }}
                      onMouseEnter={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.85)')}
                      onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.45)')}>
                      {item}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* For Students */}
            <div>
              <p className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: '#fb923c' }}>For Students</p>
              <ul className="space-y-3">
                {['Curiosity Signals', 'Session Timeline', 'Learning Path', 'Confusion Detection', 'Privacy & Data'].map(item => (
                  <li key={item}>
                    <button className="text-xs text-left"
                      style={{ color: 'rgba(255,255,255,0.45)', background: 'none', border: 'none', cursor: 'pointer',
                        transition: 'color 0.25s' }}
                      onMouseEnter={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.85)')}
                      onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.45)')}>
                      {item}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Project */}
            <div>
              <p className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: 'rgba(255,255,255,0.3)' }}>Project</p>
              <ul className="space-y-3">
                {['About', 'Research', 'Open Source', 'Contact'].map(item => (
                  <li key={item}>
                    <button className="text-xs text-left"
                      style={{ color: 'rgba(255,255,255,0.45)', background: 'none', border: 'none', cursor: 'pointer',
                        transition: 'color 0.25s' }}
                      onMouseEnter={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.85)')}
                      onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.45)')}>
                      {item}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="pt-7 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <p className="text-xs" style={{ color: 'rgba(255,255,255,0.2)' }}>
              © 2026 Reflection. Built for classrooms where every spark matters.
            </p>
            <div className="flex items-center gap-5">
              {['Privacy', 'Terms', 'Accessibility'].map(item => (
                <button key={item} className="text-xs"
                  style={{ color: 'rgba(255,255,255,0.25)', background: 'none', border: 'none', cursor: 'pointer',
                    transition: 'color 0.25s' }}
                  onMouseEnter={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.6)')}
                  onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.25)')}>
                  {item}
                </button>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
