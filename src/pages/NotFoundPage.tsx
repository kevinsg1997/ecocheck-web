import { ArrowLeft, Compass } from 'lucide-react'

import { ButtonLink } from '../components/ui/Button'
import { Container } from '../components/ui/Container'
import { useDocumentTitle } from '../hooks/useDocumentTitle'
import { routes } from '../routes'

export function NotFoundPage() {
  useDocumentTitle('Página não encontrada')

  return (
    <Container size="narrow" className="flex flex-col items-center py-24 text-center">
      <span className="flex size-14 items-center justify-center rounded-2xl bg-brand-50 text-brand-600">
        <Compass className="size-7" aria-hidden="true" />
      </span>
      <h1 className="mt-6 text-3xl font-extrabold tracking-tight">Página não encontrada</h1>
      <p className="mt-3 text-muted">O endereço acessado não existe ou foi alterado.</p>
      <ButtonLink to={routes.home} variant="secondary" size="lg" className="mt-8">
        <ArrowLeft className="size-5" aria-hidden="true" />
        Voltar ao início
      </ButtonLink>
    </Container>
  )
}
