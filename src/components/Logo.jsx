import { useId } from 'react'

/**
 * Faisal Hardware logo.
 * Mark: a hex bolt-head (hardware) carrying a diagonal open-end wrench (automotive service).
 *
 * Props:
 *  - variant: "light" (for white backgrounds, default) | "dark" (for navy/dark backgrounds)
 *  - iconOnly: render just the mark
 *  - className: sizing, e.g. "h-10 w-auto"
 */
export default function Logo({ variant = 'light', iconOnly = false, className = 'h-10 w-auto', title = 'Faisal Hardware' }) {
  const maskId = useId().replace(/:/g, '')
  const dark = variant === 'dark'
  const hex = dark ? '#e3262f' : '#10274e'
  const word = dark ? '#ffffff' : '#10274e'
  const sub = dark ? '#d9dde4' : '#e3262f'

  return (
    <svg
      viewBox={iconOnly ? '0 0 64 64' : '0 0 252 64'}
      className={className}
      role="img"
      aria-label={title}
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>{title}</title>
      <LogoMark hex={hex} maskId={maskId} />
      {!iconOnly && (
        <g fontFamily="'Barlow Condensed', 'Arial Narrow', Impact, sans-serif">
          <text x="74" y="37" fontSize="38" fontWeight="800" letterSpacing="1" fill={word}>
            FAISAL
          </text>
          <rect x="75" y="44" width="16" height="3" fill={sub} />
          <text x="96" y="52" fontSize="15" fontWeight="700" letterSpacing="5.2" fill={sub}>
            HARDWARE
          </text>
        </g>
      )}
    </svg>
  )
}

function LogoMark({ hex, maskId }) {
  return (
    <g>
      {/* Hex bolt head */}
      <path
        d="M32 3.5 56.7 17.75v28.5L32 60.5 7.3 46.25v-28.5Z"
        fill={hex}
        stroke={hex}
        strokeWidth="3"
        strokeLinejoin="round"
      />
      {/* Inner chamfer ring */}
      <path
        d="M32 10 51 21v22L32 54 13 43V21Z"
        fill="none"
        stroke="#ffffff"
        strokeOpacity="0.18"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      {/* Wrench, drawn horizontally then rotated */}
      <g transform="translate(32 32) rotate(-45)">
        <mask id={maskId} maskUnits="userSpaceOnUse" x="-26" y="-14" width="52" height="28">
          <rect x="-26" y="-14" width="52" height="28" fill="#fff" />
          <path d="M13.5 -4 H24 V4 H13.5 a4 4 0 0 1 0 -8Z" fill="#000" />
          <circle cx="-14.5" cy="0" r="2.6" fill="#000" />
        </mask>
        <g fill="#ffffff" mask={`url(#${maskId})`}>
          <rect x="-15" y="-3.6" width="28" height="7.2" rx="3.6" />
          <circle cx="13" cy="0" r="9" />
          <circle cx="-14.5" cy="0" r="6" />
        </g>
      </g>
    </g>
  )
}
