import { useEffect, useRef, useState } from 'react'

export interface SessionSignals {
  dwellTime: number        // total ms spent reading lessons
  responseLatency: number  // avg ms from question shown to answer
  revisitCount: number     // lessons re-opened after first visit
  errorRateTrend: number   // accuracy 0–1
  explorationDepth: number // related topic links clicked
}

const VISITED_KEY  = 'reflection-classroom-visited'
const SIGNALS_KEY  = 'reflection-classroom-signals'

// ── Lesson dwell tracker ──────────────────────────────────────────────────────
export function useDwellTracker(lessonId: string) {
  const startRef   = useRef(Date.now())
  const [isRevisit, setIsRevisit] = useState(false)

  useEffect(() => {
    startRef.current = Date.now()

    // mark visited / detect revisit
    const visited: string[] = JSON.parse(localStorage.getItem(VISITED_KEY) ?? '[]')
    setIsRevisit(visited.includes(lessonId))
    if (!visited.includes(lessonId)) {
      visited.push(lessonId)
      localStorage.setItem(VISITED_KEY, JSON.stringify(visited))
    }

    return () => {
      const elapsed = Date.now() - startRef.current
      const saved   = readSignals()
      saveSignals({ ...saved, dwellTime: saved.dwellTime + elapsed })
    }
  }, [lessonId])

  function trackExploration() {
    const saved = readSignals()
    saveSignals({ ...saved, explorationDepth: saved.explorationDepth + 1 })
  }

  function trackRevisit() {
    const saved = readSignals()
    saveSignals({ ...saved, revisitCount: saved.revisitCount + 1 })
  }

  return { isRevisit, trackExploration, trackRevisit }
}

// ── Quiz answer tracker ───────────────────────────────────────────────────────
export function useQuizTracker() {
  const questionShownAt = useRef(Date.now())
  const latencies       = useRef<number[]>([])
  const [answers, setAnswers] = useState<{ correct: boolean }[]>([])

  function startQuestion() {
    questionShownAt.current = Date.now()
  }

  function recordAnswer(correct: boolean) {
    const latency = Date.now() - questionShownAt.current
    latencies.current.push(latency)
    setAnswers(prev => [...prev, { correct }])

    const saved   = readSignals()
    const allLatencies = latencies.current
    const avgLatency   = allLatencies.reduce((s, v) => s + v, 0) / allLatencies.length
    const allAnswers   = [...answers, { correct }]
    const accuracy     = allAnswers.filter(a => a.correct).length / allAnswers.length
    saveSignals({ ...saved, responseLatency: Math.round(avgLatency), errorRateTrend: accuracy })
  }

  return { answers, startQuestion, recordAnswer }
}

// ── Read / write helpers ──────────────────────────────────────────────────────
const DEFAULT_SIGNALS: SessionSignals = {
  dwellTime: 0, responseLatency: 0, revisitCount: 0, errorRateTrend: 0, explorationDepth: 0,
}

export function readSignals(): SessionSignals {
  try { return { ...DEFAULT_SIGNALS, ...JSON.parse(localStorage.getItem(SIGNALS_KEY) ?? '{}') } }
  catch { return { ...DEFAULT_SIGNALS } }
}

export function saveSignals(s: SessionSignals) {
  localStorage.setItem(SIGNALS_KEY, JSON.stringify(s))
}

export function clearSignals() {
  localStorage.removeItem(SIGNALS_KEY)
  localStorage.removeItem(VISITED_KEY)
}

// ── Session record (for teacher dashboard loop) ───────────────────────────────
const LIVE_SESSIONS_KEY = 'reflection-live-sessions'

export interface SessionRecord {
  name: string
  course: string
  signals: SessionSignals
  accuracy: number
  timestamp: number
}

export function saveSessionRecord(name: string, course: string) {
  const signals = readSignals()
  const record: SessionRecord = {
    name,
    course,
    signals,
    accuracy: Math.round(signals.errorRateTrend * 100),
    timestamp: Date.now(),
  }
  const existing = readSessionRecords().filter(r => !(r.name === name && r.course === course))
  localStorage.setItem(LIVE_SESSIONS_KEY, JSON.stringify([record, ...existing].slice(0, 20)))
}

export function readSessionRecords(): SessionRecord[] {
  try { return JSON.parse(localStorage.getItem(LIVE_SESSIONS_KEY) ?? '[]') }
  catch { return [] }
}
