import { useState, useEffect } from 'react'
import { memo } from 'react'
import { Sparkles, ChevronLeft, ChevronRight, Clock, BookOpen, Lightbulb, CheckCircle, XCircle, RotateCcw, Eye, Zap, RefreshCw, Target, BarChart2 } from 'lucide-react'
import { FRACTIONS_COURSE, type Lesson } from '../data/courseData'
import { useDwellTracker, useQuizTracker, readSignals, clearSignals } from '../hooks/useSignalTracker'

interface Props { onExit: () => void }

type Screen = { name: 'home' } | { name: 'lesson'; id: string } | { name: 'quiz' } | { name: 'summary' }

// ── Course home ───────────────────────────────────────────────────────────────
const CourseHome = memo(function CourseHome({ onLesson, onQuiz }: { onLesson: (id: string) => void; onQuiz: () => void }) {
  const visited: string[] = JSON.parse(localStorage.getItem('reflection-classroom-visited') ?? '[]')

  return (
    <div className="max-w-2xl mx-auto px-5 py-10 animate-fade-in">
      <div className="mb-8">
        <span className="text-xs font-bold uppercase tracking-widest" style={{ color: '#0F766E' }}>Mathematics · Primary 4</span>
        <h1 className="text-3xl font-extrabold mt-2 leading-tight" style={{ color: '#0C1825', fontFamily: "'Bricolage Grotesque', system-ui, sans-serif" }}>
          Fractions & Division
        </h1>
        <p className="text-sm mt-2" style={{ color: '#64748b' }}>3 lessons · 1 practice quiz · ~20 min</p>
      </div>

      {/* Progress bar */}
      <div className="mb-8 rounded-2xl p-5" style={{ background: 'white', border: '1px solid #f1f5f9', boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
        <div className="flex items-center justify-between mb-2">
          <p className="text-xs font-semibold" style={{ color: '#94a3b8' }}>Your progress</p>
          <p className="text-xs font-bold" style={{ color: '#0F766E' }}>{visited.length}/{FRACTIONS_COURSE.lessons.length} lessons</p>
        </div>
        <div className="h-2 rounded-full overflow-hidden" style={{ background: '#f1f5f9' }}>
          <div className="h-full rounded-full" style={{ width: `${(visited.length / FRACTIONS_COURSE.lessons.length) * 100}%`, background: '#0F766E', transition: 'width 0.8s cubic-bezier(0.19,1,0.22,1)' }} />
        </div>
      </div>

      {/* Lessons */}
      <div className="space-y-3 mb-6">
        {FRACTIONS_COURSE.lessons.map((lesson, i) => {
          const done = visited.includes(lesson.id)
          return (
            <button
              key={lesson.id}
              onClick={() => onLesson(lesson.id)}
              className="w-full flex items-center gap-4 rounded-2xl p-5 text-left"
              style={{
                background: 'white', border: `1px solid ${done ? '#ccfbf1' : '#f1f5f9'}`,
                boxShadow: '0 1px 3px rgba(0,0,0,0.04)', cursor: 'pointer',
                transition: 'all 0.3s cubic-bezier(0.19,1,0.22,1)',
              }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 8px 24px rgba(15,118,110,0.08)' }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.04)' }}
            >
              <div className="w-10 h-10 rounded-xl flex items-center justify-center font-extrabold text-sm flex-shrink-0"
                style={{ background: done ? '#f0fdfa' : '#f8fafc', color: done ? '#0F766E' : '#94a3b8', border: `1px solid ${done ? '#ccfbf1' : '#f1f5f9'}`, fontFamily: "'Bricolage Grotesque', system-ui, sans-serif" }}>
                {done ? <CheckCircle className="w-5 h-5" /> : `0${i + 1}`}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold" style={{ color: '#0C1825' }}>{lesson.title}</p>
                <p className="text-xs mt-0.5" style={{ color: '#94a3b8' }}>{lesson.duration} · {lesson.relatedTopics.length} related topics</p>
              </div>
              <ChevronRight className="w-4 h-4 flex-shrink-0" style={{ color: '#cbd5e1' }} />
            </button>
          )
        })}
      </div>

      {/* Quiz */}
      <button
        onClick={onQuiz}
        className="w-full flex items-center gap-4 rounded-2xl p-5 text-left"
        style={{
          background: '#fffbeb', border: '1px solid #fde68a',
          boxShadow: '0 1px 3px rgba(0,0,0,0.04)', cursor: 'pointer',
          transition: 'all 0.3s cubic-bezier(0.19,1,0.22,1)',
        }}
        onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 8px 24px rgba(180,83,9,0.08)' }}
        onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.04)' }}
      >
        <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
          style={{ background: 'white', border: '1px solid #fde68a', color: '#b45309' }}>
          <Zap className="w-5 h-5" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-bold" style={{ color: '#0C1825' }}>Practice Quiz</p>
          <p className="text-xs mt-0.5" style={{ color: '#94a3b8' }}>{FRACTIONS_COURSE.quiz.length} questions · tests all 3 lessons</p>
        </div>
        <ChevronRight className="w-4 h-4 flex-shrink-0" style={{ color: '#d97706' }} />
      </button>
    </div>
  )
})

// ── Lesson view ───────────────────────────────────────────────────────────────
function LessonView({ lesson, onBack, onNext, isLast }: { lesson: Lesson; onBack: () => void; onNext: () => void; isLast: boolean }) {
  const { isRevisit, trackExploration, trackRevisit } = useDwellTracker(lesson.id)

  useEffect(() => {
    if (isRevisit) trackRevisit()
  }, [isRevisit]) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="max-w-2xl mx-auto px-5 py-10 animate-fade-in">
      {isRevisit && (
        <div className="mb-5 flex items-center gap-2 rounded-xl px-4 py-2.5"
          style={{ background: '#f0fdf4', border: '1px solid #bbf7d0' }}>
          <RotateCcw className="w-3.5 h-3.5 flex-shrink-0" style={{ color: '#16a34a' }} />
          <p className="text-xs font-semibold" style={{ color: '#15803d' }}>You've read this before — reviewing it counts as a revisit.</p>
        </div>
      )}

      <div className="flex items-center gap-2 mb-2">
        <span className="text-xs font-bold uppercase tracking-widest" style={{ color: '#0F766E' }}>Lesson</span>
        <span className="text-xs" style={{ color: '#cbd5e1' }}>·</span>
        <span className="flex items-center gap-1 text-xs" style={{ color: '#94a3b8' }}>
          <Clock className="w-3 h-3" /> {lesson.duration}
        </span>
      </div>

      <h1 className="text-2xl font-extrabold mb-8 leading-tight" style={{ color: '#0C1825', fontFamily: "'Bricolage Grotesque', system-ui, sans-serif" }}>
        {lesson.title}
      </h1>

      {/* Fraction visual for lesson 1 */}
      {lesson.id === 'l1' && <FractionVisual />}
      {lesson.id === 'l2' && <NumeratorDenominatorVisual />}
      {lesson.id === 'l3' && <AddingFractionsVisual />}

      {/* Content blocks */}
      <div className="space-y-4 mb-10">
        {lesson.content.map((block, i) => {
          if (block.type === 'heading') return (
            <h2 key={i} className="text-base font-extrabold pt-2" style={{ color: '#0C1825', fontFamily: "'Bricolage Grotesque', system-ui, sans-serif" }}>
              {block.text}
            </h2>
          )
          if (block.type === 'keypoint') return (
            <div key={i} className="flex items-start gap-3 rounded-xl px-4 py-3"
              style={{ background: '#f0fdfa', border: '1px solid #ccfbf1' }}>
              <Lightbulb className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: '#0F766E' }} />
              <p className="text-sm font-semibold leading-relaxed" style={{ color: '#0F766E' }}>{block.text}</p>
            </div>
          )
          if (block.type === 'example') return (
            <div key={i} className="rounded-xl px-4 py-3"
              style={{ background: '#fffbeb', border: '1px solid #fde68a' }}>
              <p className="text-xs font-bold uppercase tracking-widest mb-1.5" style={{ color: '#b45309' }}>Example</p>
              <p className="text-sm leading-relaxed whitespace-pre-line" style={{ color: '#78350f' }}>{block.text}</p>
            </div>
          )
          return (
            <p key={i} className="text-sm leading-relaxed" style={{ color: '#334155' }}>{block.text}</p>
          )
        })}
      </div>

      {/* Related topics */}
      <div className="mb-10">
        <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: '#94a3b8' }}>
          <BookOpen className="w-3 h-3 inline mr-1.5" />Explore more
        </p>
        <div className="flex flex-wrap gap-2">
          {lesson.relatedTopics.map(topic => (
            <button
              key={topic}
              onClick={trackExploration}
              className="px-3 py-1.5 rounded-full text-xs font-semibold"
              style={{ background: 'white', border: '1px solid #e2e8f0', color: '#64748b', cursor: 'pointer', transition: 'all 0.25s' }}
              onMouseEnter={e => { e.currentTarget.style.background = '#f0fdfa'; e.currentTarget.style.borderColor = '#ccfbf1'; e.currentTarget.style.color = '#0F766E' }}
              onMouseLeave={e => { e.currentTarget.style.background = 'white'; e.currentTarget.style.borderColor = '#e2e8f0'; e.currentTarget.style.color = '#64748b' }}
            >
              {topic}
            </button>
          ))}
        </div>
      </div>

      {/* Nav */}
      <div className="flex items-center justify-between">
        <button onClick={onBack} className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold"
          style={{ background: 'white', border: '1px solid #e2e8f0', color: '#64748b', cursor: 'pointer', transition: 'all 0.25s' }}>
          <ChevronLeft className="w-4 h-4" /> Back
        </button>
        <button onClick={onNext} className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold"
          style={{ background: '#0F766E', color: 'white', border: 'none', cursor: 'pointer', transition: 'all 0.3s' }}>
          {isLast ? 'Take the quiz' : 'Next lesson'} <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  )
}

// ── Quiz view ─────────────────────────────────────────────────────────────────
function QuizView({ onDone, onBack }: { onDone: () => void; onBack: () => void }) {
  const [qIndex, setQIndex]         = useState(0)
  const [selected, setSelected]     = useState<number | null>(null)
  const [showResult, setShowResult] = useState(false)
  const { startQuestion, recordAnswer } = useQuizTracker()

  const question = FRACTIONS_COURSE.quiz[qIndex]
  const isLast   = qIndex === FRACTIONS_COURSE.quiz.length - 1

  useEffect(() => { startQuestion() }, [qIndex]) // eslint-disable-line react-hooks/exhaustive-deps

  function choose(i: number) {
    if (showResult) return
    setSelected(i)
    setShowResult(true)
    recordAnswer(i === question.correct)
  }

  function advance() {
    if (isLast) { onDone(); return }
    setQIndex(q => q + 1)
    setSelected(null)
    setShowResult(false)
  }

  const progress = ((qIndex + (showResult ? 1 : 0)) / FRACTIONS_COURSE.quiz.length) * 100

  return (
    <div className="max-w-2xl mx-auto px-5 py-10 animate-fade-in">
      {/* Progress */}
      <div className="flex items-center gap-3 mb-8">
        <div className="flex-1 h-1.5 rounded-full overflow-hidden" style={{ background: '#f1f5f9' }}>
          <div className="h-full rounded-full" style={{ width: `${progress}%`, background: '#0F766E', transition: 'width 0.5s cubic-bezier(0.19,1,0.22,1)' }} />
        </div>
        <span className="text-xs font-semibold flex-shrink-0" style={{ color: '#94a3b8' }}>
          {qIndex + 1} / {FRACTIONS_COURSE.quiz.length}
        </span>
      </div>

      <p className="text-base font-bold mb-6 leading-snug" style={{ color: '#0C1825', fontFamily: "'Bricolage Grotesque', system-ui, sans-serif" }}>
        {question.text}
      </p>

      <div className="space-y-3 mb-6">
        {question.options.map((opt, i) => {
          const isCorrect  = i === question.correct
          const isSelected = i === selected
          let bg = 'white', border = '#e2e8f0', color = '#334155'

          if (showResult) {
            if (isCorrect)               { bg = '#f0fdf4'; border = '#bbf7d0'; color = '#15803d' }
            else if (isSelected)         { bg = '#fef2f2'; border = '#fecaca'; color = '#b91c1c' }
          } else if (isSelected) {
            bg = '#f0fdfa'; border = '#0F766E'; color = '#0F766E'
          }

          return (
            <button
              key={i}
              onClick={() => choose(i)}
              className="w-full flex items-center gap-3 rounded-xl px-4 py-3.5 text-left"
              style={{ background: bg, border: `1px solid ${border}`, color, cursor: showResult ? 'default' : 'pointer', transition: 'all 0.25s', fontWeight: 500, fontSize: 14 }}
            >
              <span className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0"
                style={{ background: showResult && isCorrect ? '#16a34a' : showResult && isSelected ? '#dc2626' : '#f1f5f9', color: showResult && (isCorrect || isSelected) ? 'white' : '#94a3b8' }}>
                {String.fromCharCode(65 + i)}
              </span>
              {opt}
              {showResult && isCorrect  && <CheckCircle className="w-4 h-4 ml-auto flex-shrink-0" style={{ color: '#16a34a' }} />}
              {showResult && isSelected && !isCorrect && <XCircle className="w-4 h-4 ml-auto flex-shrink-0" style={{ color: '#dc2626' }} />}
            </button>
          )
        })}
      </div>

      {showResult && (
        <div className="rounded-xl px-4 py-3 mb-6 animate-slide-up"
          style={{ background: selected === question.correct ? '#f0fdf4' : '#fff7ed', border: `1px solid ${selected === question.correct ? '#bbf7d0' : '#fed7aa'}` }}>
          <p className="text-xs font-bold mb-1" style={{ color: selected === question.correct ? '#15803d' : '#c2410c' }}>
            {selected === question.correct ? 'Correct!' : 'Not quite.'}
          </p>
          <p className="text-xs leading-relaxed" style={{ color: '#334155' }}>{question.explanation}</p>
        </div>
      )}

      <div className="flex items-center justify-between">
        {qIndex === 0 && !showResult
          ? <button onClick={onBack} className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold"
              style={{ background: 'white', border: '1px solid #e2e8f0', color: '#64748b', cursor: 'pointer' }}>
              <ChevronLeft className="w-4 h-4" /> Back
            </button>
          : <span />
        }
        {showResult && (
          <button onClick={advance} className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold ml-auto"
            style={{ background: '#0F766E', color: 'white', border: 'none', cursor: 'pointer', transition: 'all 0.3s' }}>
            {isLast ? 'See my results' : 'Next question'} <ChevronRight className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  )
}

// ── Session summary ───────────────────────────────────────────────────────────
function SessionSummary({ onRestart, onExit }: { onRestart: () => void; onExit: () => void }) {
  const signals = readSignals()
  const dwellSec   = (signals.dwellTime / 1000).toFixed(0)
  const latencySec = signals.responseLatency > 0 ? (signals.responseLatency / 1000).toFixed(1) : '—'
  const accuracy   = Math.round(signals.errorRateTrend * 100)

  const status = accuracy >= 80 ? 'high' : accuracy >= 60 ? 'moderate' : accuracy >= 40 ? 'fading' : 'disengaged'
  const statusConfig = {
    high:       { label: 'Great work!',          color: '#15803d', bg: '#f0fdf4', border: '#bbf7d0' },
    moderate:   { label: 'Good effort.',         color: '#b45309', bg: '#fffbeb', border: '#fde68a' },
    fading:     { label: 'Keep practising.',     color: '#c2410c', bg: '#fff7ed', border: '#fed7aa' },
    disengaged: { label: 'Try again — you can.', color: '#b91c1c', bg: '#fef2f2', border: '#fecaca' },
  }[status]

  const signalRows = [
    { icon: <Eye className="w-4 h-4" />,      label: 'Time spent reading', value: `${dwellSec}s` },
    { icon: <Zap className="w-4 h-4" />,      label: 'Avg response time',  value: `${latencySec}s` },
    { icon: <RefreshCw className="w-4 h-4" />, label: 'Lesson revisits',   value: String(signals.revisitCount) },
    { icon: <Target className="w-4 h-4" />,   label: 'Quiz accuracy',      value: `${accuracy}%`, fill: accuracy },
    { icon: <BarChart2 className="w-4 h-4" />, label: 'Topics explored',   value: String(signals.explorationDepth) },
  ]

  return (
    <div className="max-w-2xl mx-auto px-5 py-10 animate-fade-in">
      <div className="rounded-2xl p-6 mb-6"
        style={{ background: statusConfig.bg, border: `1px solid ${statusConfig.border}` }}>
        <p className="text-xl font-extrabold mb-1" style={{ color: statusConfig.color, fontFamily: "'Bricolage Grotesque', system-ui, sans-serif" }}>
          {statusConfig.label}
        </p>
        <p className="text-sm" style={{ color: statusConfig.color, opacity: 0.8 }}>
          You scored {accuracy}% on the quiz. These signals are what your teacher sees.
        </p>
      </div>

      <div className="rounded-2xl overflow-hidden mb-6"
        style={{ background: 'white', border: '1px solid #f1f5f9', boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
        <div className="px-5 py-4" style={{ borderBottom: '1px solid #f8fafc' }}>
          <p className="text-xs font-semibold uppercase tracking-widest" style={{ color: '#94a3b8' }}>Your session signals</p>
          <p className="text-xs mt-0.5" style={{ color: '#cbd5e1' }}>This is exactly what Reflection sends to your teacher's dashboard</p>
        </div>
        {signalRows.map(({ icon, label, value, fill }, i) => (
          <div key={label} className="px-5 py-3.5 flex items-center gap-3"
            style={{ borderBottom: i < signalRows.length - 1 ? '1px solid #f8fafc' : 'none' }}>
            <div className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{ background: '#f8fafc', border: '1px solid #f1f5f9', color: '#94a3b8' }}>
              {icon}
            </div>
            <p className="text-sm font-semibold flex-1" style={{ color: '#0C1825' }}>{label}</p>
            {fill !== undefined && (
              <div className="w-20 h-1.5 rounded-full overflow-hidden mr-2" style={{ background: '#f1f5f9' }}>
                <div className="h-full rounded-full" style={{ width: `${fill}%`, background: fill >= 70 ? '#0F766E' : fill >= 50 ? '#d97706' : '#dc2626' }} />
              </div>
            )}
            <p className="text-sm font-extrabold flex-shrink-0" style={{ color: '#0C1825' }}>{value}</p>
          </div>
        ))}
      </div>

      <div className="flex gap-3">
        <button onClick={() => { clearSignals(); onRestart() }}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold flex-1 justify-center"
          style={{ background: 'white', border: '1px solid #e2e8f0', color: '#64748b', cursor: 'pointer' }}>
          <RotateCcw className="w-4 h-4" /> Try again
        </button>
        <button onClick={onExit}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold flex-1 justify-center"
          style={{ background: '#0F766E', color: 'white', border: 'none', cursor: 'pointer' }}>
          Done
        </button>
      </div>
    </div>
  )
}

// ── Fraction visuals ──────────────────────────────────────────────────────────
const FractionVisual = memo(function FractionVisual() {
  return (
    <div className="rounded-2xl p-6 mb-8 flex flex-col items-center gap-4"
      style={{ background: '#f8fafc', border: '1px solid #f1f5f9' }}>
      <p className="text-xs font-semibold uppercase tracking-widest" style={{ color: '#94a3b8' }}>1/4 of a rectangle</p>
      <div className="flex gap-1">
        {[0, 1, 2, 3].map(i => (
          <div key={i} className="w-14 h-10 rounded-lg"
            style={{ background: i === 0 ? '#0F766E' : '#e2e8f0', border: '2px solid white', transition: 'background 0.3s' }} />
        ))}
      </div>
      <p className="text-xs" style={{ color: '#64748b' }}>1 part shaded out of 4 equal parts</p>
    </div>
  )
})

const NumeratorDenominatorVisual = memo(function NumeratorDenominatorVisual() {
  return (
    <div className="rounded-2xl p-6 mb-8" style={{ background: '#f8fafc', border: '1px solid #f1f5f9' }}>
      <p className="text-xs font-semibold uppercase tracking-widest mb-4 text-center" style={{ color: '#94a3b8' }}>Anatomy of a fraction: 3/8</p>
      <div className="flex items-center justify-center gap-8">
        <div className="text-center">
          <div className="text-4xl font-extrabold mb-1" style={{ color: '#0F766E', fontFamily: "'Bricolage Grotesque', system-ui, sans-serif" }}>3</div>
          <div className="h-0.5 w-12 mx-auto mb-1" style={{ background: '#0C1825' }} />
          <div className="text-4xl font-extrabold" style={{ color: '#ea580c', fontFamily: "'Bricolage Grotesque', system-ui, sans-serif" }}>8</div>
        </div>
        <div className="text-sm space-y-4">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full flex-shrink-0" style={{ background: '#0F766E' }} />
            <p style={{ color: '#0C1825' }}><strong>Numerator</strong> — how many parts you have</p>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full flex-shrink-0" style={{ background: '#ea580c' }} />
            <p style={{ color: '#0C1825' }}><strong>Denominator</strong> — how many equal parts in the whole</p>
          </div>
        </div>
      </div>
    </div>
  )
})

const AddingFractionsVisual = memo(function AddingFractionsVisual() {
  return (
    <div className="rounded-2xl p-6 mb-8" style={{ background: '#f8fafc', border: '1px solid #f1f5f9' }}>
      <p className="text-xs font-semibold uppercase tracking-widest mb-4 text-center" style={{ color: '#94a3b8' }}>2/7 + 3/7 = 5/7</p>
      <div className="flex flex-col gap-3">
        {[
          { filled: 2, label: '2/7', color: '#0F766E' },
          { filled: 3, label: '3/7', color: '#d97706' },
          { filled: 5, label: '5/7', color: '#0C1825' },
        ].map(({ filled, label, color }) => (
          <div key={label} className="flex items-center gap-3">
            <span className="text-xs font-bold w-8 text-right" style={{ color }}>{label}</span>
            <div className="flex gap-0.5 flex-1">
              {Array.from({ length: 7 }, (_, i) => (
                <div key={i} className="flex-1 h-5 rounded-sm"
                  style={{ background: i < filled ? color : '#e2e8f0' }} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
})

// ── Main Classroom ────────────────────────────────────────────────────────────
export function Classroom({ onExit }: Props) {
  const [screen, setScreen] = useState<Screen>({ name: 'home' })

  const lessonIndex = screen.name === 'lesson'
    ? FRACTIONS_COURSE.lessons.findIndex(l => l.id === screen.id)
    : -1
  const currentLesson = lessonIndex >= 0 ? FRACTIONS_COURSE.lessons[lessonIndex] : null

  return (
    <div style={{ background: '#FAFAF5', minHeight: '100vh' }}>
      {/* Header */}
      <header className="sticky top-0 z-10"
        style={{ background: 'rgba(250,250,245,0.9)', backdropFilter: 'blur(12px)', borderBottom: '1px solid #e2e8f0' }}>
        <div className="max-w-2xl mx-auto px-5 h-14 flex items-center justify-between">
          <button onClick={() => screen.name === 'home' ? onExit() : setScreen({ name: 'home' })}
            className="flex items-center gap-2 text-sm font-medium"
            style={{ color: '#64748b', background: 'none', border: 'none', cursor: 'pointer' }}>
            <ChevronLeft className="w-4 h-4" />
            {screen.name === 'home' ? 'Exit' : 'Course'}
          </button>

          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md flex items-center justify-center" style={{ background: '#0F766E' }}>
              <Sparkles className="w-3 h-3 text-white" />
            </div>
            <span className="text-sm font-bold" style={{ color: '#0C1825', fontFamily: "'Bricolage Grotesque', system-ui, sans-serif" }}>
              {screen.name === 'home' ? 'Fractions & Division' : screen.name === 'lesson' ? currentLesson?.title : screen.name === 'quiz' ? 'Practice Quiz' : 'Session Results'}
            </span>
          </div>

          <div className="w-16 text-right">
            {screen.name === 'lesson' && (
              <span className="text-xs" style={{ color: '#94a3b8' }}>
                {lessonIndex + 1}/{FRACTIONS_COURSE.lessons.length}
              </span>
            )}
          </div>
        </div>
      </header>

      {/* Screens */}
      {screen.name === 'home' && (
        <CourseHome
          onLesson={id => setScreen({ name: 'lesson', id })}
          onQuiz={() => setScreen({ name: 'quiz' })}
        />
      )}

      {screen.name === 'lesson' && currentLesson && (
        <LessonView
          lesson={currentLesson}
          onBack={() => setScreen({ name: 'home' })}
          onNext={() => {
            const next = FRACTIONS_COURSE.lessons[lessonIndex + 1]
            if (next) setScreen({ name: 'lesson', id: next.id })
            else setScreen({ name: 'quiz' })
          }}
          isLast={lessonIndex === FRACTIONS_COURSE.lessons.length - 1}
        />
      )}

      {screen.name === 'quiz' && (
        <QuizView
          onDone={() => setScreen({ name: 'summary' })}
          onBack={() => setScreen({ name: 'home' })}
        />
      )}

      {screen.name === 'summary' && (
        <SessionSummary
          onRestart={() => setScreen({ name: 'home' })}
          onExit={onExit}
        />
      )}
    </div>
  )
}
