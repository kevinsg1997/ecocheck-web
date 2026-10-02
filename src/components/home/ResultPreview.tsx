import { Users } from 'lucide-react'

import { categoryList } from '../../data/categories'
import type { Category } from '../../types/api'
import { ScoreRing } from '../ui/ScoreRing'

const SAMPLE_PERCENTAGE = 72
const SAMPLE_CATEGORIES: Record<Category, number> = {
  water: 81,
  energy: 75,
  waste: 56,
  consumption_and_mobility: 68,
}

/** Cartão ilustrativo do resultado. Os valores são fictícios e apenas demonstram o formato. */
export function ResultPreview() {
  return (
    <figure
      className="relative rounded-3xl bg-surface p-5 shadow-raised ring-1 ring-line sm:p-6"
      aria-label="Exemplo ilustrativo de resultado do EcoCheck"
    >
      <div className="flex items-center justify-between">
        <span className="rounded-full bg-canvas px-2.5 py-1 text-xs font-medium text-muted ring-1 ring-line">
          Exemplo de resultado
        </span>
        <span className="text-xs text-muted">ilustrativo</span>
      </div>

      <div className="mt-5 flex items-center gap-5">
        <ScoreRing value={SAMPLE_PERCENTAGE} className="text-[0.95rem]" />
        <div>
          <p className="text-xs font-medium tracking-wide text-muted uppercase">Classificação</p>
          <p className="mt-1 font-display text-xl font-bold text-brand-700">Bons hábitos</p>
          <p className="mt-1 text-sm text-muted">Destaque em economia de água.</p>
        </div>
      </div>

      <ul className="mt-6 space-y-3.5">
        {categoryList.map((category) => {
          const value = SAMPLE_CATEGORIES[category.id]
          const Icon = category.icon
          return (
            <li key={category.id}>
              <div className="flex items-center justify-between text-sm">
                <span className="flex items-center gap-2 font-medium text-ink-soft">
                  <Icon className={`size-4 ${category.classes.text}`} aria-hidden="true" />
                  {category.name}
                </span>
                <span className="font-semibold tabular-nums">{value}%</span>
              </div>
              <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-canvas">
                <div className={`h-full rounded-full ${category.classes.bar}`} style={{ width: `${value}%` }} />
              </div>
            </li>
          )
        })}
      </ul>

      <figcaption className="mt-6 flex items-center gap-2 rounded-xl bg-canvas px-3 py-2.5 text-sm text-ink-soft">
        <Users className="size-4 text-brand-600" aria-hidden="true" />
        Compare com a média de todos os participantes
      </figcaption>
    </figure>
  )
}
