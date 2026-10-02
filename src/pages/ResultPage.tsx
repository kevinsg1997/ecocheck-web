import { ClipboardList } from 'lucide-react'
import { useState } from 'react'

import { ButtonLink } from '../components/ui/Button'
import { Container } from '../components/ui/Container'
import { categories } from '../data/categories'
import { classifications } from '../data/classifications'
import { useDocumentTitle } from '../hooks/useDocumentTitle'
import { localStore } from '../services/localStore'
import { routes } from '../routes'

/**
 * Versão inicial do resultado (Etapa 5). Gráficos, recomendações e estatísticas
 * gerais são adicionados na Etapa 6.
 */
export function ResultPage() {
  useDocumentTitle('Seu resultado')
  const [stored] = useState(() => localStore.loadResult())

  if (!stored) {
    return (
      <Container size="narrow" className="flex flex-col items-center py-24 text-center">
        <span className="flex size-14 items-center justify-center rounded-2xl bg-brand-50 text-brand-600">
          <ClipboardList className="size-7" aria-hidden="true" />
        </span>
        <h1 className="mt-6 text-3xl font-extrabold tracking-tight">Nenhum resultado por aqui</h1>
        <p className="mt-3 text-muted">Responda ao questionário para ver o seu resultado.</p>
        <ButtonLink to={routes.quiz} size="lg" className="mt-8">
          Começar o EcoCheck
        </ButtonLink>
      </Container>
    )
  }

  const { result } = stored
  const classification = classifications[result.classification]

  return (
    <Container size="narrow" className="py-12 sm:py-16">
      <p className="text-sm font-semibold text-brand-700">Seu resultado</p>
      <h1 className="mt-2 text-3xl font-extrabold tracking-tight sm:text-4xl">{classification.name}</h1>
      <p className="mt-3 text-lg text-ink-soft">{classification.description}</p>

      <div className="mt-8 rounded-3xl bg-surface p-6 shadow-card ring-1 ring-line">
        <p className="font-display text-5xl font-extrabold text-brand-600 tabular-nums">
          {Math.round(result.percentage)}%
        </p>
        <p className="mt-1 text-sm text-muted">
          {result.totalScore} de {result.maxScore} pontos possíveis
        </p>

        <ul className="mt-6 space-y-4">
          {result.categories.map((item) => {
            const category = categories[item.category]
            return (
              <li key={item.category}>
                <div className="flex justify-between text-sm">
                  <span className="font-medium">{category.name}</span>
                  <span className="font-semibold tabular-nums">{Math.round(item.percentage)}%</span>
                </div>
                <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-canvas">
                  <div className={`h-full rounded-full ${category.classes.bar}`} style={{ width: `${item.percentage}%` }} />
                </div>
              </li>
            )
          })}
        </ul>
      </div>
    </Container>
  )
}
