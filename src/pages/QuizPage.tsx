import { ListChecks } from 'lucide-react'

import { ButtonLink } from '../components/ui/Button'
import { Container } from '../components/ui/Container'
import { useDocumentTitle } from '../hooks/useDocumentTitle'
import { routes } from '../routes'

/** Página provisória: o fluxo do questionário é implementado na Etapa 5. */
export function QuizPage() {
  useDocumentTitle('Questionário')

  return (
    <Container size="narrow" className="flex flex-col items-center py-24 text-center">
      <span className="flex size-14 items-center justify-center rounded-2xl bg-brand-50 text-brand-600">
        <ListChecks className="size-7" aria-hidden="true" />
      </span>
      <h1 className="mt-6 text-3xl font-extrabold tracking-tight">Questionário em construção</h1>
      <p className="mt-3 text-muted">Esta etapa do EcoCheck estará disponível em breve.</p>
      <ButtonLink to={routes.home} variant="secondary" size="lg" className="mt-8">
        Voltar ao início
      </ButtonLink>
    </Container>
  )
}
