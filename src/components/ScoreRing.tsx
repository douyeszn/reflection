interface Props {
  score: number
  size?: number
}

export function ScoreRing({ score, size = 52 }: Props) {
  const radius = (size - 8) / 2
  const circumference = 2 * Math.PI * radius
  const progress = (score / 100) * circumference
  const strokeColor =
    score >= 70 ? '#16A34A' :
    score >= 50 ? '#F59E0B' :
    score >= 30 ? '#EA580C' :
    '#DC2626'

  return (
    <svg width={size} height={size} className="-rotate-90">
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke="#E2E8F0"
        strokeWidth={5}
      />
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke={strokeColor}
        strokeWidth={5}
        strokeDasharray={circumference}
        strokeDashoffset={circumference - progress}
        strokeLinecap="round"
        style={{ transition: 'stroke-dashoffset 0.6s ease' }}
      />
      <text
        x="50%"
        y="50%"
        textAnchor="middle"
        dominantBaseline="middle"
        className="rotate-90"
        style={{
          transform: `rotate(90deg)`,
          transformOrigin: `${size / 2}px ${size / 2}px`,
          fill: strokeColor,
          fontSize: size < 50 ? '11px' : '13px',
          fontWeight: '700',
          fontFamily: 'Inter, system-ui, sans-serif',
        }}
      >
        {score}
      </text>
    </svg>
  )
}
