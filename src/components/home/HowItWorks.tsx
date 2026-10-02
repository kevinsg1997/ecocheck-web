import { ChartColumn, ListChecks, Users } from 'lucide-react'

import { Container } from '../ui/Container'
import { SectionHeading } from '../ui/SectionHeading'

const steps = [
  {
    icon: ListChecks,
    title: 'Responda',
    description: '20 perguntas objetivas em 4 categorias. Não existe resposta certa: responda com sinceridade.',
  },
  {
    icon: ChartColumn,
    title: 'Descubra',
    description: 'Veja sua pontuação geral e por categoria, seus pontos fortes e dicas práticas para evoluir.',
  },
  {
    icon: Users,
    title: 'Compare',
    description: 'Confira como está a média de todas as pessoas que já participaram do projeto.',
  },
]

export function HowItWorks() {
  return (
    <section aria-labelledby="como-funciona-title" id="como-funciona" className="py-16 sm:py-20">
      <Container>
        <SectionHeading
          id="como-funciona-title"
          eyebrow="Como funciona"
          title="Três passos, poucos minutos"
          description="Um questionário educativo para refletir sobre hábitos do dia a dia, sem julgamentos."
        />

        <ol className="mt-10 grid gap-4 sm:grid-cols-3 sm:gap-6">
          {steps.map(({ icon: Icon, title, description }, index) => (
            <li key={title} className="rounded-2xl bg-surface p-6 shadow-card ring-1 ring-line">
              <div className="flex items-center justify-between">
                <span className="flex size-11 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
                  <Icon className="size-5" aria-hidden="true" />
                </span>
                <span className="font-display text-sm font-bold text-muted" aria-hidden="true">
                  0{index + 1}
                </span>
              </div>
              <h3 className="mt-5 text-lg font-bold">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{description}</p>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  )
}
