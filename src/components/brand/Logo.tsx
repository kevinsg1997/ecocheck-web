import { cn } from '../../utils/cn'

interface LogoProps {
  className?: string
}

export function LogoMark({ className }: LogoProps) {
  return (
    <svg viewBox="0 0 32 32" fill="none" aria-hidden="true" className={cn('size-8', className)}>
      <rect width="32" height="32" rx="9" className="fill-brand-600" />
      <path
        d="M9.5 16.5l4.2 4.2 8.8-9.4"
        stroke="white"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function Logo({ className }: LogoProps) {
  return (
    <span className={cn('inline-flex items-center gap-2.5', className)}>
      <LogoMark />
      <span className="font-display text-lg font-bold tracking-tight text-ink">
        Eco<span className="text-brand-600">Check</span>
      </span>
    </span>
  )
}
