/**
 * Lawline Logo System
 *
 * LawlineIcon  — square mark only (36×36 default)
 * LawlineLogo  — icon + wordmark (horizontal lockup)
 */

type IconProps = {
  size?: number
  className?: string
}

export function LawlineIcon({ size = 36, className }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Lawline icon"
      className={className}
    >
      <defs>
        {/* Navy-to-deep gradient background */}
        <linearGradient id="ll-bg-grad" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
          <stop offset="0%"   stopColor="#1E3F73" />
          <stop offset="100%" stopColor="#0E2347" />
        </linearGradient>

        {/* Gold accent shimmer */}
        <linearGradient id="ll-gold-grad" x1="0" y1="0" x2="1" y2="1" gradientUnits="objectBoundingBox">
          <stop offset="0%"   stopColor="#D4AE58" />
          <stop offset="100%" stopColor="#B8963E" />
        </linearGradient>

        {/* Subtle inner glow */}
        <radialGradient id="ll-glow" cx="30%" cy="15%" r="60%">
          <stop offset="0%"   stopColor="#B8963E" stopOpacity="0.20" />
          <stop offset="100%" stopColor="#B8963E" stopOpacity="0"    />
        </radialGradient>

        {/* Drop shadow filter */}
        <filter id="ll-shadow" x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="0" dy="1" stdDeviation="1.5" floodColor="#0A1020" floodOpacity="0.35" />
        </filter>
      </defs>

      {/* ── Base shape ── */}
      <rect width="40" height="40" rx="10" fill="url(#ll-bg-grad)" />

      {/* Inner glow wash */}
      <rect width="40" height="40" rx="10" fill="url(#ll-glow)" />

      {/* Hairline border for depth */}
      <rect
        x="0.5" y="0.5" width="39" height="39" rx="9.5"
        stroke="rgba(255,255,255,0.10)"
        strokeWidth="1"
        fill="none"
      />

      {/* ── "L" letterform ── */}
      {/* Vertical stroke */}
      <rect x="11" y="9" width="5.5" height="20" rx="1.75" fill="#FDFCFA" opacity="0.95" />
      {/* Horizontal base */}
      <rect x="11" y="24.5" width="18" height="5.5" rx="1.75" fill="#FDFCFA" opacity="0.95" />

      {/* ── AI node — gold dot top-right ── */}
      {/* Outer halo */}
      <circle cx="29.5" cy="10.5" r="5.5" fill="rgba(184,150,62,0.18)" />
      {/* Mid ring */}
      <circle cx="29.5" cy="10.5" r="3.75" fill="url(#ll-gold-grad)" />
      {/* Inner bright core */}
      <circle cx="29.5" cy="10.5" r="2"   fill="#E4C068" />

      {/* ── Neural thread — dashed line from L top to node ── */}
      <line
        x1="16.5" y1="11.5"
        x2="25.5"  y2="10.5"
        stroke="#D4AE58"
        strokeWidth="0.85"
        strokeDasharray="2.5 2"
        strokeLinecap="round"
        opacity="0.55"
      />
    </svg>
  )
}

type LogoProps = {
  iconSize?: number
  variant?:  'light' | 'dark'   /* light = dark text on white bg, dark = light text on dark bg */
  className?: string
}

export function LawlineLogo({ iconSize = 36, variant = 'light', className }: LogoProps) {
  const inkColor  = variant === 'light' ? 'var(--color-ink)'         : 'rgba(253,252,250,0.95)'
  const subColor  = variant === 'light' ? 'var(--color-terracotta)'  : '#B8963E'

  return (
    <div
      style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexShrink: 0 }}
      className={className}
    >
      <LawlineIcon size={iconSize} />
      <span
        style={{
          fontFamily:    'var(--font-display)',
          fontSize:      '1.375rem',
          fontWeight:    500,
          letterSpacing: '-0.025em',
          color:         inkColor,
          lineHeight:    1.1,
        }}
      >
        Lawline
      </span>
    </div>
  )
}
