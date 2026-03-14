import { useState } from 'react'
import { Sparkles, ChevronLeft, ArrowRight, GraduationCap, Lightbulb, Eye, EyeOff } from 'lucide-react'

interface Props {
  role: 'teacher' | 'student'
  onSuccess: () => void
  onBack: () => void
}

// Dummy teacher credentials — any of these work
const TEACHER_CREDENTIALS = [
  { email: 'teacher@reflection.rw', password: 'reflect2024' },
  { email: 'mr.tuyishime@kigali.edu', password: 'reflect2024' },
]

// Student class codes
const CLASS_CODES = ['P4-MATH', 'P4-ENG', 'DEMO']

const cardStyle = {
  background: 'white',
  border: '1px solid #f1f5f9',
  borderRadius: '20px',
  boxShadow: '0 1px 2px rgba(0,0,0,0.04), 0 8px 32px rgba(15,118,110,0.06)',
}

// ── Teacher login ─────────────────────────────────────────────────────────────
function TeacherLogin({ onSuccess }: { onSuccess: () => void }) {
  const [email, setEmail]       = useState('')
  const [password, setPassword] = useState('')
  const [showPw, setShowPw]     = useState(false)
  const [error, setError]       = useState('')
  const [loading, setLoading]   = useState(false)

  function submit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)

    // Simulate network delay
    setTimeout(() => {
      setLoading(false)
      const valid = TEACHER_CREDENTIALS.some(
        c => c.email === email.trim().toLowerCase() && c.password === password
      )
      if (valid) {
        localStorage.setItem('reflection-teacher', email.trim().toLowerCase())
        onSuccess()
      } else {
        setError('Incorrect email or password. Use the hint below.')
      }
    }, 800)
  }

  const isReady = email.trim().length > 0 && password.length >= 6

  return (
    <form onSubmit={submit} className="space-y-4">
      {/* Email */}
      <div>
        <label className="block text-xs font-semibold mb-1.5" style={{ color: '#0C1825' }}>
          School email
        </label>
        <input
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder="teacher@reflection.rw"
          autoComplete="email"
          className="w-full rounded-xl px-4 py-3 text-sm outline-none"
          style={{ border: '1.5px solid #e2e8f0', color: '#0C1825', background: '#fafafa', transition: 'border-color 0.25s, box-shadow 0.25s' }}
          onFocus={e => { e.currentTarget.style.borderColor = '#0F766E'; e.currentTarget.style.boxShadow = '0 0 0 3px rgba(15,118,110,0.08)' }}
          onBlur={e => { e.currentTarget.style.borderColor = '#e2e8f0'; e.currentTarget.style.boxShadow = 'none' }}
        />
      </div>

      {/* Password */}
      <div>
        <label className="block text-xs font-semibold mb-1.5" style={{ color: '#0C1825' }}>
          Password
        </label>
        <div className="relative">
          <input
            type={showPw ? 'text' : 'password'}
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="••••••••"
            autoComplete="current-password"
            className="w-full rounded-xl px-4 py-3 text-sm outline-none pr-11"
            style={{ border: '1.5px solid #e2e8f0', color: '#0C1825', background: '#fafafa', transition: 'border-color 0.25s, box-shadow 0.25s' }}
            onFocus={e => { e.currentTarget.style.borderColor = '#0F766E'; e.currentTarget.style.boxShadow = '0 0 0 3px rgba(15,118,110,0.08)' }}
            onBlur={e => { e.currentTarget.style.borderColor = '#e2e8f0'; e.currentTarget.style.boxShadow = 'none' }}
          />
          <button
            type="button"
            onClick={() => setShowPw(v => !v)}
            className="absolute right-3 top-1/2 -translate-y-1/2"
            style={{ color: '#94a3b8', background: 'none', border: 'none', cursor: 'pointer', padding: '4px' }}>
            {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Error */}
      {error && (
        <p className="text-xs font-medium rounded-lg px-3 py-2"
          style={{ color: '#b91c1c', background: '#fef2f2', border: '1px solid #fecaca' }}>
          {error}
        </p>
      )}

      {/* Submit */}
      <button
        type="submit"
        disabled={!isReady || loading}
        className="w-full flex items-center justify-center gap-2 rounded-xl py-3 text-sm font-bold"
        style={{
          background: isReady && !loading ? '#0F766E' : '#e2e8f0',
          color: isReady && !loading ? 'white' : '#94a3b8',
          border: 'none', cursor: isReady && !loading ? 'pointer' : 'not-allowed',
          transition: 'all 0.25s',
        }}>
        {loading ? (
          <span className="flex items-center gap-2">
            <span className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin inline-block" />
            Signing in…
          </span>
        ) : (
          <>Open dashboard <ArrowRight className="w-4 h-4" /></>
        )}
      </button>

      {/* Hint */}
      <div className="rounded-xl px-4 py-3" style={{ background: '#f0fdfa', border: '1px solid #ccfbf1' }}>
        <p className="text-xs font-bold mb-1" style={{ color: '#0F766E' }}>Demo credentials</p>
        <p className="text-xs" style={{ color: '#0d9488' }}>
          Email: <span className="font-mono font-semibold">teacher@reflection.rw</span><br />
          Password: <span className="font-mono font-semibold">reflect2024</span>
        </p>
      </div>
    </form>
  )
}

// ── Student login ─────────────────────────────────────────────────────────────
function StudentLogin({ onSuccess }: { onSuccess: () => void }) {
  const [name, setName]       = useState('')
  const [code, setCode]       = useState('')
  const [error, setError]     = useState('')
  const [loading, setLoading] = useState(false)

  function submit(e: React.FormEvent) {
    e.preventDefault()
    setError('')

    const trimmedCode = code.trim().toUpperCase()
    if (trimmedCode && !CLASS_CODES.includes(trimmedCode)) {
      setError("Class code not recognised. Try DEMO to explore.")
      return
    }

    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      localStorage.setItem('reflection-student-name', name.trim())
      onSuccess()
    }, 600)
  }

  const isReady = name.trim().length >= 2

  return (
    <form onSubmit={submit} className="space-y-4">
      {/* Name */}
      <div>
        <label className="block text-xs font-semibold mb-1.5" style={{ color: '#0C1825' }}>
          Your name
        </label>
        <input
          type="text"
          value={name}
          onChange={e => setName(e.target.value)}
          placeholder="e.g. Amara Uwimana"
          autoComplete="name"
          className="w-full rounded-xl px-4 py-3 text-sm outline-none"
          style={{ border: '1.5px solid #e2e8f0', color: '#0C1825', background: '#fafafa', transition: 'border-color 0.25s, box-shadow 0.25s' }}
          onFocus={e => { e.currentTarget.style.borderColor = '#f97316'; e.currentTarget.style.boxShadow = '0 0 0 3px rgba(249,115,22,0.08)' }}
          onBlur={e => { e.currentTarget.style.borderColor = '#e2e8f0'; e.currentTarget.style.boxShadow = 'none' }}
        />
      </div>

      {/* Class code */}
      <div>
        <label className="block text-xs font-semibold mb-1.5" style={{ color: '#0C1825' }}>
          Class code <span className="font-normal" style={{ color: '#94a3b8' }}>(optional)</span>
        </label>
        <input
          type="text"
          value={code}
          onChange={e => setCode(e.target.value.toUpperCase())}
          placeholder="e.g. P4-MATH"
          maxLength={10}
          className="w-full rounded-xl px-4 py-3 text-sm font-mono outline-none tracking-widest"
          style={{ border: '1.5px solid #e2e8f0', color: '#0C1825', background: '#fafafa', transition: 'border-color 0.25s, box-shadow 0.25s' }}
          onFocus={e => { e.currentTarget.style.borderColor = '#f97316'; e.currentTarget.style.boxShadow = '0 0 0 3px rgba(249,115,22,0.08)' }}
          onBlur={e => { e.currentTarget.style.borderColor = '#e2e8f0'; e.currentTarget.style.boxShadow = 'none' }}
        />
      </div>

      {/* Error */}
      {error && (
        <p className="text-xs font-medium rounded-lg px-3 py-2"
          style={{ color: '#b91c1c', background: '#fef2f2', border: '1px solid #fecaca' }}>
          {error}
        </p>
      )}

      {/* Submit */}
      <button
        type="submit"
        disabled={!isReady || loading}
        className="w-full flex items-center justify-center gap-2 rounded-xl py-3 text-sm font-bold"
        style={{
          background: isReady && !loading ? '#f97316' : '#e2e8f0',
          color: isReady && !loading ? 'white' : '#94a3b8',
          border: 'none', cursor: isReady && !loading ? 'pointer' : 'not-allowed',
          transition: 'all 0.25s',
        }}>
        {loading ? (
          <span className="flex items-center gap-2">
            <span className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin inline-block" />
            Entering…
          </span>
        ) : (
          <>Enter classroom <ArrowRight className="w-4 h-4" /></>
        )}
      </button>

      {/* Hint */}
      <div className="rounded-xl px-4 py-3" style={{ background: '#fff7ed', border: '1px solid #fed7aa' }}>
        <p className="text-xs font-bold mb-1" style={{ color: '#b45309' }}>No class code?</p>
        <p className="text-xs" style={{ color: '#92400e' }}>
          Enter your name and use <span className="font-mono font-semibold">DEMO</span> to explore, or leave blank.
        </p>
      </div>
    </form>
  )
}

// ── Main Login page ───────────────────────────────────────────────────────────
export function Login({ role, onSuccess, onBack }: Props) {
  const isTeacher = role === 'teacher'

  const accent     = isTeacher ? '#0F766E' : '#f97316'
  const accentBg   = isTeacher ? '#f0fdfa' : '#fff7ed'
  const accentBord = isTeacher ? '#ccfbf1' : '#fed7aa'

  return (
    <div style={{ background: '#FAFAF5', minHeight: '100vh' }}>
      {/* Header */}
      <header className="sticky top-0 z-10"
        style={{ background: 'rgba(250,250,245,0.9)', backdropFilter: 'blur(12px)', borderBottom: '1px solid #e2e8f0' }}>
        <div className="max-w-lg mx-auto px-5 h-14 flex items-center justify-between">
          <button onClick={onBack}
            className="flex items-center gap-2 text-sm font-medium"
            style={{ color: '#64748b', background: 'none', border: 'none', cursor: 'pointer' }}>
            <ChevronLeft className="w-4 h-4" /> Back
          </button>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md flex items-center justify-center" style={{ background: '#0F766E' }}>
              <Sparkles className="w-3 h-3 text-white" />
            </div>
            <span className="text-sm font-bold" style={{ color: '#0C1825', fontFamily: "'Bricolage Grotesque', system-ui, sans-serif" }}>
              Reflection
            </span>
          </div>
          <div className="w-16" />
        </div>
      </header>

      <main className="max-w-lg mx-auto px-5 py-12 animate-fade-in">
        {/* Role badge */}
        <div className="flex justify-center mb-8">
          <div className="flex items-center gap-2 rounded-2xl px-5 py-2.5"
            style={{ background: accentBg, border: `1px solid ${accentBord}` }}>
            {isTeacher
              ? <GraduationCap className="w-4 h-4" style={{ color: accent }} />
              : <Lightbulb className="w-4 h-4" style={{ color: accent }} />
            }
            <span className="text-sm font-bold" style={{ color: accent }}>
              {isTeacher ? 'Teacher sign-in' : 'Student sign-in'}
            </span>
          </div>
        </div>

        {/* Card */}
        <div style={cardStyle} className="p-7">
          <h1 className="text-2xl font-extrabold mb-1 leading-tight"
            style={{ color: '#0C1825', fontFamily: "'Bricolage Grotesque', system-ui, sans-serif" }}>
            {isTeacher ? 'Welcome back.' : 'Ready to learn?'}
          </h1>
          <p className="text-sm mb-7" style={{ color: '#94a3b8' }}>
            {isTeacher
              ? 'Sign in to see your classroom dashboard.'
              : 'Enter your name to start the lesson.'}
          </p>

          {isTeacher
            ? <TeacherLogin onSuccess={onSuccess} />
            : <StudentLogin onSuccess={onSuccess} />
          }
        </div>

        {/* Switch role hint */}
        <p className="text-center text-xs mt-5" style={{ color: '#94a3b8' }}>
          {isTeacher
            ? <>Are you a student? <button onClick={onBack} className="underline" style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#64748b' }}>Go back</button></>
            : <>Are you a teacher? <button onClick={onBack} className="underline" style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#64748b' }}>Go back</button></>
          }
        </p>
      </main>
    </div>
  )
}
