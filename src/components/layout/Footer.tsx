import { ExternalLink } from 'lucide-react'
import { Link } from 'react-router'

import { ODS_SOURCE_URL } from '../../data/ods'
import { routes } from '../../routes'
import { Logo } from '../brand/Logo'
import { Container } from '../ui/Container'

const CURRENT_YEAR = new Date().getFullYear()

export function Footer() {
  return (
    <footer className="mt-auto border-t border-line bg-surface">
      <Container className="py-10">
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          <div className="max-w-sm">
            <Logo />
            <p className="mt-3 text-sm leading-relaxed text-muted">
              Projeto extensionista do curso de Análise e Desenvolvimento de Sistemas, no eixo Meio Ambiente e Saúde.
            </p>
          </div>

          <nav aria-label="Rodapé" className="grid grid-cols-2 gap-x-10 gap-y-2 text-sm sm:flex sm:gap-8">
            <Link to={routes.quiz} className="text-ink-soft hover:text-ink">
              Questionário
            </Link>
            <Link to={routes.privacy} className="text-ink-soft hover:text-ink">
              Privacidade
            </Link>
            <a
              href={ODS_SOURCE_URL}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 text-ink-soft hover:text-ink"
            >
              ODS na ONU Brasil
              <ExternalLink className="size-3.5" aria-hidden="true" />
              <span className="sr-only">(abre em nova aba)</span>
            </a>
          </nav>
        </div>

        <div className="mt-8 flex flex-col gap-2 border-t border-line pt-6 text-xs leading-relaxed text-muted sm:flex-row sm:justify-between">
          <p className="max-w-2xl">
            O EcoCheck é um questionário educativo. A pontuação não mede a pegada ecológica real nem constitui
            avaliação científica.
          </p>
          <p className="shrink-0">© {CURRENT_YEAR} EcoCheck</p>
        </div>
      </Container>
    </footer>
  )
}
