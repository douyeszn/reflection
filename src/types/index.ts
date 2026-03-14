export type EngagementStatus = 'high' | 'moderate' | 'fading' | 'disengaged'

export interface EngagementSignal {
  dwellTime: number       // ms spent on content
  responseLatency: number // ms from prompt to first input
  revisitCount: number    // voluntary returns to content
  errorRateTrend: number  // rolling accuracy 0-1
  explorationDepth: number // linked items visited
}

export interface Session {
  date: string
  score: number           // 0-100 composite engagement score
  curiositySpike: boolean
  confusionFlag: boolean
  topic: string
}

export interface Student {
  id: string
  name: string
  avatar: string          // initials
  status: EngagementStatus
  score: number           // 0-100
  trend: 'up' | 'down' | 'stable'
  fadingSince: string | null
  currentTopic: string
  lastSeen: string
  sessions: Session[]
  signals: EngagementSignal
  alertMessage: string | null
}

export interface ClassStats {
  totalStudents: number
  highEngagement: number
  moderate: number
  fading: number
  disengaged: number
  avgScore: number
  alertCount: number
}
