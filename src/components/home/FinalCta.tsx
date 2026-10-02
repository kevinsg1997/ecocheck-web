import { ArrowRight, Info } from 'lucide-react'

import { routes } from '../../routes'
import { ButtonLink } from '../ui/Button'
import { Container } from '../ui/Container'

export function FinalCta() {
  return (
    <section aria-labelledby="cta-title" className="pb-20">
      <Container size="narrow" className="text-center">
        <h2 id="cta-title" className="text-2xl font-bold tracking-tight sm:text-3xl">
          Pronto para refletir sobre a sua rotina?
        </h2>
        <p className="mt-3 text-muted">Leva poucos minutos e você pode compartilhar o resultado depois.</p>
        <ButtonLink to={routes.quiz} size="lg" className="mt-7">
          Começar o EcoCheck
          <ArrowRight className="size-5" aria-hidden="true" />
        </ButtonLink>

        <p className="mx-auto mt-10 flex max-w-xl items-start gap-2 rounded-2xl bg-surface p-4 text-left text-sm leading-relaxed text-muted ring-1 ring-line">
          <Info className="mt-0.5 size-4 shrink-0 text-water-600" aria-hidden="true" />
          <span>
            O EcoCheck é um questionário educativo, criado para estimular a reflexão sobre hábitos cotidianos. A
            pontuação não mede a pegada ecológica real nem representa uma avaliação científica.
          </span>
        </p>
      </Container>
    </section>
  )
}
