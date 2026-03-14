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
    iconBg: '#fffbeb', iconColor: '#d97706', iconBorder: '#fde68a',
    sectionBg: '#fffbeb',
    tag: 'Detection',
    title: 'See whose spark is fading',
    desc: 'Behavioral signals — dwell time, revisit rate, and exploration depth — surface in real time without interrupting learning.',
  },
  {
    icon: <Users className="w-5 h-5" />,
    iconBg: '#f0fdfa', iconColor: '#0F766E', iconBorder: '#99f6e4',
    sectionBg: '#f0fdfa',
    tag: 'Alerts',
    title: 'Named students, not averages',
    desc: 'Know exactly which student is disengaging, on which topic, and since when. Not a class-wide percentage.',
  },
  {
    icon: <TrendingUp className="w-5 h-5" />,
    iconBg: '#f0fdf4', iconColor: '#16a34a', iconBorder: '#bbf7d0',
    sectionBg: '#f0fdf4',
    tag: 'History',
    title: 'Track curiosity over time',
    desc: 'Session-by-session timelines with curiosity spikes and confusion markers help you spot patterns before they become problems.',
  },
]

export function Landing({ onEnter }: Props) {
  return (
    <div style={{ background: '#ffffff', color: '#0C1825' }}>

      {/* ── Nav ── */}
      <nav style={{ borderBottom: '1px solid #f1f5f9' }}
        className="sticky top-0 z-10 bg-white px-6 sm:px-10 h-16 flex items-center justify-between max-w-6xl mx-auto w-full">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg flex items-center justify-center"
            style={{ background: '#0F766E' }}>
            <Sparkles className="w-3.5 h-3.5 text-white" />
          </div>
          <span className="font-extrabold text-base tracking-tight" style={{ color: '#0C1825' }}>
            Reflection
          </span>
        </div>
        <button
          onClick={onEnter}
          className="btn-primary"
          style={{ padding: '8px 20px', fontSize: '13px' }}
        >
          Open dashboard
        </button>
      </nav>

      {/* ── Hero ── */}
      <section className="max-w-6xl mx-auto px-6 sm:px-10 pt-20 pb-24">
        <div className="max-w-3xl">

          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-7 text-xs font-semibold uppercase tracking-wider"
            style={{ background: '#fffbeb', border: '1px solid #fde68a', color: '#b45309' }}>
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
            Rwanda · Deep Learning · EdTech
          </div>

          {/* Heading */}
          <h1 className="font-extrabold leading-[1.07] tracking-tight mb-6"
            style={{ fontSize: 'clamp(38px, 6vw, 72px)', color: '#0C1825' }}>
            No passion should go<br />
            <span style={{ color: '#0F766E' }}>undiscovered.</span>
          </h1>

          {/* Sub */}
          <p className="leading-relaxed mb-10 max-w-xl"
            style={{ fontSize: 'clamp(15px, 1.8vw, 18px)', color: '#64748b' }}>
            In classrooms where one teacher faces 60 students,
            Reflection uses deep learning to detect whose curiosity
            is fading — before it goes out.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap gap-3">
            <button onClick={onEnter} className="btn-primary" style={{ padding: '14px 28px', fontSize: '15px' }}>
              Open classroom dashboard
              <ArrowRight className="w-4 h-4" />
            </button>
            <button className="btn-secondary" style={{ padding: '14px 28px', fontSize: '15px' }}>
              See how it works
            </button>
          </div>

          {/* Trust badge */}
          <div className="flex items-center gap-2 mt-8">
            <ShieldCheck className="w-4 h-4" style={{ color: '#16a34a' }} />
            <span className="text-xs" style={{ color: '#94a3b8' }}>
              Designed for resource-limited classrooms · Offline-first · Kinyarwanda-ready
            </span>
          </div>
        </div>
      </section>

      {/* ── Stats marquee — pastel teal strip ── */}
      <div style={{ background: '#f0fdfa', borderTop: '1px solid #ccfbf1', borderBottom: '1px solid #ccfbf1' }}
        className="py-5 overflow-hidden relative">
        <div className="absolute inset-y-0 left-0 w-20 z-10 pointer-events-none"
          style={{ background: 'linear-gradient(90deg, #f0fdfa, transparent)' }} />
        <div className="absolute inset-y-0 right-0 w-20 z-10 pointer-events-none"
          style={{ background: 'linear-gradient(270deg, #f0fdfa, transparent)' }} />
        <div className="animate-marquee flex gap-16 w-max">
          {[...stats, ...stats].map((s, i) => (
            <div key={i} className="flex items-baseline gap-2 flex-shrink-0">
              <span className="font-extrabold" style={{ fontSize: '22px', color: '#0F766E' }}>{s.value}</span>
              <span className="text-xs max-w-[14ch] leading-tight" style={{ color: '#5eead4' }}>{s.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Features ── */}
      <section className="max-w-6xl mx-auto px-6 sm:px-10 py-24">
        <div className="text-center mb-14">
          <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: '#94a3b8' }}>
            How it works
          </p>
          <h2 className="font-extrabold tracking-tight leading-tight" style={{ fontSize: 'clamp(28px,4vw,42px)', color: '#0C1825' }}>
            Data that helps teachers act,<br />not just observe.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {features.map(({ icon, iconBg, iconColor, iconBorder, sectionBg, tag, title, desc }) => (
            <div
              key={title}
              className="rounded-2xl p-7 flex flex-col gap-4"
              style={{
                background: sectionBg,
                border: `1px solid ${iconBorder}`,
                boxShadow: '0 1px 3px rgba(0,0,0,0.03)',
                transition: 'transform 0.5s cubic-bezier(0.19,1,0.22,1), box-shadow 0.5s cubic-bezier(0.19,1,0.22,1)',
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-3px)'
                ;(e.currentTarget as HTMLDivElement).style.boxShadow = '0 8px 32px rgba(0,0,0,0.07)'
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLDivElement).style.transform = 'translateY(0)'
                ;(e.currentTarget as HTMLDivElement).style.boxShadow = '0 1px 3px rgba(0,0,0,0.03)'
              }}
            >
              <div>
                <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
                  style={{ background: iconBg, border: `1px solid ${iconBorder}`, color: iconColor }}>
                  {icon}
                </div>
                <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: iconColor }}>
                  {tag}
                </span>
              </div>
              <div>
                <h3 className="font-bold text-base mb-2 leading-snug" style={{ color: '#0C1825' }}>{title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: '#64748b' }}>{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA banner ── */}
      <section style={{ background: '#0C1825' }} className="py-20 px-6 sm:px-10">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="font-extrabold text-white leading-tight mb-4"
            style={{ fontSize: 'clamp(26px, 4vw, 40px)' }}>
            Ready to see your classroom differently?
          </h2>
          <p className="mb-8" style={{ color: 'rgba(255,255,255,0.5)', fontSize: '16px' }}>
            Open the dashboard and see engagement patterns for 12 students — no sign-up needed.
          </p>
          <button onClick={onEnter} className="btn-primary"
            style={{ padding: '16px 36px', fontSize: '15px', background: '#0F766E' }}>
            Open dashboard
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer style={{ borderTop: '1px solid #f1f5f9' }}
        className="py-8 px-6 sm:px-10 flex items-center justify-between max-w-6xl mx-auto">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-md flex items-center justify-center" style={{ background: '#0F766E' }}>
            <Sparkles className="w-3 h-3 text-white" />
          </div>
          <span className="text-xs font-bold" style={{ color: '#0C1825' }}>Reflection</span>
        </div>
        <p className="text-xs" style={{ color: '#94a3b8' }}>Built for classrooms where every spark matters</p>
      </footer>

    </div>
  )
}
