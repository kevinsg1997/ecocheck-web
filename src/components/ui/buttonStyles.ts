import { cn } from '../../utils/cn'

type Variant = 'primary' | 'secondary' | 'ghost'
type Size = 'md' | 'lg'

export interface ButtonStyleProps {
  variant?: Variant
  size?: Size
  fullWidth?: boolean
}

const variants: Record<Variant, string> = {
  primary: 'bg-brand-600 text-white shadow-sm hover:bg-brand-700 active:bg-brand-800',
  secondary: 'bg-surface text-ink ring-1 ring-line-strong ring-inset hover:bg-canvas hover:ring-ink/20',
  ghost: 'text-ink-soft hover:bg-ink/5 hover:text-ink',
}

const sizes: Record<Size, string> = {
  md: 'h-10 px-4 text-sm gap-2',
  lg: 'h-12 px-6 text-base gap-2.5',
}

export function buttonStyles({ variant = 'primary', size = 'md', fullWidth = false }: ButtonStyleProps = {}): string {
  return cn(
    'inline-flex shrink-0 items-center justify-center rounded-xl font-semibold whitespace-nowrap',
    'transition-colors duration-150 disabled:pointer-events-none disabled:opacity-50',
    variants[variant],
    sizes[size],
    fullWidth && 'w-full',
  )
}
