import { AlertCircle, Info } from 'lucide-react'
import type { ReactNode } from 'react'

import { cn } from '../../utils/cn'

interface AlertProps {
  tone?: 'info' | 'error'
  title?: string
  children?: ReactNode
  action?: ReactNode
  className?: string
}

export function Alert({ tone = 'info', title, children, action, className }: AlertProps) {
  const Icon = tone === 'error' ? AlertCircle : Info

  return (
    <div
      role={tone === 'error' ? 'alert' : 'status'}
      className={cn(
        'flex gap-3 rounded-2xl p-4 text-sm ring-1',
        tone === 'error' ? 'bg-consumption-50 text-consumption-700 ring-consumption-100' : 'bg-water-50 text-water-700 ring-water-100',
        className,
      )}
    >
      <Icon className="mt-0.5 size-5 shrink-0" aria-hidden="true" />
      <div className="flex-1">
        {title && <p className="font-semibold">{title}</p>}
        {children && <div className={cn('leading-relaxed', title && 'mt-0.5')}>{children}</div>}
        {action && <div className="mt-3">{action}</div>}
      </div>
    </div>
  )
}
