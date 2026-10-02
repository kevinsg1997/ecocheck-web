import { cn } from '../../utils/cn'

interface ScoreRingProps {
  /** Percentual de 0 a 100. */
  value: number
  className?: string
  label?: string
}

const RADIUS = 42
const CIRCUMFERENCE = 2 * Math.PI * RADIUS

export function ScoreRing({ value, className, label }: ScoreRingProps) {
  const clamped = Math.min(Math.max(value, 0), 100)

  return (
    <div className={cn('relative size-28 shrink-0', className)} role="img" aria-label={label ?? `${Math.round(clamped)}%`}>
      <svg viewBox="0 0 100 100" className="size-full -rotate-90" aria-hidden="true">
        <circle cx="50" cy="50" r={RADIUS} fill="none" strokeWidth="9" className="stroke-brand-100" />
        <circle
          cx="50"
          cy="50"
          r={RADIUS}
          fill="none"
          strokeWidth="9"
          strokeLinecap="round"
          strokeDasharray={CIRCUMFERENCE}
          strokeDashoffset={CIRCUMFERENCE * (1 - clamped / 100)}
          className="stroke-brand-500 transition-[stroke-dashoffset] duration-700 ease-out motion-reduce:transition-none"
        />
      </svg>
      <span aria-hidden="true" className="absolute inset-0 flex items-center justify-center">
        <span className="font-display text-[1.7em] font-bold tabular-nums">{Math.round(clamped)}%</span>
      </span>
    </div>
  )
}
