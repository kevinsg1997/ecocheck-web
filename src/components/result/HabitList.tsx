import type { LucideIcon } from 'lucide-react'
import type { ReactNode } from 'react'

import type { HabitInsight } from '../../utils/resultInsights'
import { cn } from '../../utils/cn'

interface HabitListProps {
  title: string
  icon: LucideIcon
  iconClassName: string
  items: HabitInsight[]
  /** Mostra a dica de cada hábito (usado nas oportunidades de melhoria). */
  showTips?: boolean
  emptyMessage: ReactNode
}

export function HabitList({ title, icon: Icon, iconClassName, items, showTips = false, emptyMessage }: HabitListProps) {
  return (
    <section className="rounded-3xl bg-surface p-5 shadow-card ring-1 ring-line sm:p-6">
      <h3 className="flex items-center gap-2.5 text-base font-bold">
        <span className={cn('flex size-8 items-center justify-center rounded-lg', iconClassName)}>
          <Icon className="size-4" aria-hidden="true" />
        </span>
        {title}
      </h3>

      {items.length === 0 ? (
        <p className="mt-4 text-sm leading-relaxed text-muted">{emptyMessage}</p>
      ) : (
        <ul className="mt-4 space-y-3">
          {items.map((item) => {
            const CategoryIcon = item.category.icon
            return (
              <li key={item.questionId} className="rounded-2xl bg-canvas p-3.5">
                <p className="flex items-center gap-2 text-sm font-semibold">
                  <CategoryIcon className={cn('size-4 shrink-0', item.category.classes.text)} aria-hidden="true" />
                  {item.title}
                  <span className="sr-only">({item.category.name})</span>
                </p>
                {showTips && <p className="mt-1.5 text-sm leading-relaxed text-ink-soft">{item.tip}</p>}
              </li>
            )
          })}
        </ul>
      )}
    </section>
  )
}
