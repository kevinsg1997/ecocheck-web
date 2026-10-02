import { ArrowRight, Cookie, EyeOff, ShieldCheck } from 'lucide-react'
import { Link } from 'react-router'

import { routes } from '../../routes'
import { Container } from '../ui/Container'

const points = [
  { icon: EyeOff, text: 'Não pedimos nome, e-mail, telefone ou qualquer dado pessoal.' },
  { icon: Cookie, text: 'Sem cookies de rastreamento e sem ferramentas de publicidade.' },
  { icon: ShieldCheck, text: 'As respostas servem apenas para estatísticas agregadas do projeto.' },
]

export function PrivacySection() {
  return (
    <section aria-labelledby="privacidade-title" className="pb-16 sm:pb-20">
      <Container>
        <div className="grid gap-8 rounded-3xl bg-brand-900 p-6 text-brand-50 sm:p-10 lg:grid-cols-[1fr_1.2fr] lg:items-center">
          <div>
            <h2 id="privacidade-title" className="text-2xl font-bold text-white sm:text-3xl">
              Suas respostas são anônimas
            </h2>
            <p className="mt-3 leading-relaxed text-brand-100">
              Você não precisa se identificar. Nenhuma informação permite saber quem respondeu o questionário.
            </p>
            <Link
              to={routes.privacy}
              className="mt-5 inline-flex items-center gap-1.5 font-semibold text-white underline-offset-4 hover:underline"
            >
              Leia como tratamos os dados
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </div>

          <ul className="grid gap-3">
            {points.map(({ icon: Icon, text }) => (
              <li key={text} className="flex items-start gap-3 rounded-2xl bg-white/5 p-4 ring-1 ring-white/10">
                <Icon className="mt-0.5 size-5 shrink-0 text-brand-300" aria-hidden="true" />
                <span className="text-sm leading-relaxed text-brand-50">{text}</span>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  )
}
