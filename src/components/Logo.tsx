/**
 * Reflection logo — three concepts available in public/logos/.
 * This component ships Concept 1 "Spark Rise" as the primary mark.
 *
 * Concept 1 — Spark Rise     : rising signal curve + 4-pt star  (teal bg)
 * Concept 2 — Ripple Detector: concentric detection arcs         (dark bg)
 * Concept 3 — Mirror Bars    : bar chart reflected on axis       (teal bg)
 *
 * Usage:
 *   <LogoIcon size={28} />
 *   <LogoIcon size={28} theme="dark" />
 *   <Logo size={28} />
 *   <Logo size={28} textColor="white" />
 */

interface IconProps {
  size?: number
  theme?: 'teal' | 'dark'
  className?: string
}

/** Icon-only mark — drop-in replacement for the Sparkles div */
export function LogoIcon({ size = 28, theme = 'teal', className }: IconProps) {
  const bg = theme === 'dark' ? '#0C1825' : '#0F766E'
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Reflection"
      className={className}
    >
      {/* Background rounded square */}
      <rect width="40" height="40" rx="10" fill={bg} />

      {/* Subtle baseline */}
      <line
        x1="6" y1="33" x2="34" y2="33"
        stroke="rgba(255,255,255,0.2)"
        strokeWidth="1.5"
        strokeLinecap="round"
      />

      {/* Rising signal curve */}
      <path
        d="M6,31 C10,31 14,22 20,16 C26,10 30,9 32,8"
        stroke="white"
        strokeWidth="2.5"
        strokeLinecap="round"
      />

      {/* 4-pointed star at apex (32,8) — outer r=4.5, inner r=1.8 */}
      <path
        d="M32,3.5 L33.27,6.73 L36.5,8 L33.27,9.27 L32,12.5 L30.73,9.27 L27.5,8 L30.73,6.73 Z"
        fill="white"
      />
    </svg>
  )
}

interface LogoProps extends IconProps {
  textColor?: string
  showText?: boolean
}

/** Full logo — icon + "Reflection" wordmark side by side */
export function Logo({
  size = 28,
  theme = 'teal',
  textColor = '#0C1825',
  showText = true,
  className,
}: LogoProps) {
  return (
    <div className={`flex items-center gap-2 ${className ?? ''}`}>
      <LogoIcon size={size} theme={theme} />
      {showText && (
        <span
          style={{
            color: textColor,
            fontFamily: "'Bricolage Grotesque', system-ui, sans-serif",
            fontWeight: 700,
            fontSize: Math.round(size * 0.57),
            letterSpacing: '-0.02em',
            lineHeight: 1,
          }}
        >
          Reflection
        </span>
      )}
    </div>
  )
}
