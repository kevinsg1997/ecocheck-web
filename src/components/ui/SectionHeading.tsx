import type { ReactNode } from 'react'

import { cn } from '../../utils/cn'

interface SectionHeadingProps {
  eyebrow?: string
  title: ReactNode
  description?: ReactNode
  align?: 'left' | 'center'
  id?: string
}

export function SectionHeading({ eyebrow, title, description, align = 'left', id }: SectionHeadingProps) {
  return (
    <div className={cn('max-w-2xl', align === 'center' && 'mx-auto text-center')}>
      {eyebrow && <p className="text-sm font-semibold tracking-wide text-brand-700">{eyebrow}</p>}
      <h2 id={id} className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl">
        {title}
      </h2>
      {description && <p className="mt-3 text-base leading-relaxed text-muted sm:text-lg">{description}</p>}
    </div>
  )
}
