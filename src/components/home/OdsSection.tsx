import { ExternalLink } from 'lucide-react'

import { ODS_SOURCE_URL, odsList } from '../../data/ods'
import { Container } from '../ui/Container'
import { SectionHeading } from '../ui/SectionHeading'

export function OdsSection() {
  return (
    <section aria-labelledby="ods-title" id="ods" className="py-16 sm:py-20">
      <Container>
        <SectionHeading
          id="ods-title"
          eyebrow="Agenda 2030"
          title="Conectado aos Objetivos de Desenvolvimento Sustentável"
          description="Os ODS são 17 objetivos globais da Agenda 2030, adotada pelos países-membros da ONU em 2015. O EcoCheck se relaciona com estes:"
        />

        <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {odsList.map((ods) => (
            <li key={ods.number} className="flex flex-col overflow-hidden rounded-2xl bg-surface shadow-card ring-1 ring-line">
              <div className="h-1.5" style={{ backgroundColor: ods.color }} aria-hidden="true" />
              <div className="flex flex-1 flex-col p-5">
                <p className="flex items-center gap-2 text-xs font-bold tracking-wide text-muted uppercase">
                  <span className="size-2.5 rounded-full" style={{ backgroundColor: ods.color }} aria-hidden="true" />
                  ODS {ods.number}
                </p>
                <h3 className="mt-2 text-base leading-snug font-bold">{ods.name}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-soft">{ods.relation}</p>
                <details className="group mt-4 border-t border-line pt-3 text-sm">
                  <summary className="cursor-pointer list-none font-medium text-brand-700 hover:text-brand-800 [&::-webkit-details-marker]:hidden">
                    <span className="group-open:hidden">Ver objetivo oficial</span>
                    <span className="hidden group-open:inline">Ocultar objetivo</span>
                  </summary>
                  <blockquote className="mt-2 leading-relaxed text-muted">“{ods.goal}”</blockquote>
                  <a
                    href={ods.url}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-2 inline-flex items-center gap-1 text-xs font-medium text-muted underline-offset-2 hover:text-ink hover:underline"
                  >
                    Fonte: ONU Brasil
                    <ExternalLink className="size-3" aria-hidden="true" />
                    <span className="sr-only">(abre em nova aba)</span>
                  </a>
                </details>
              </div>
            </li>
          ))}
        </ul>

        <p className="mt-8 text-sm text-muted">
          Textos oficiais extraídos do site{' '}
          <a href={ODS_SOURCE_URL} target="_blank" rel="noreferrer" className="font-medium text-brand-700 hover:underline">
            As Nações Unidas no Brasil
          </a>
          . O EcoCheck é um projeto acadêmico independente, sem vínculo com a ONU.
        </p>
      </Container>
    </section>
  )
}
