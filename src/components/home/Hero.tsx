import { ArrowRight, Clock, ShieldCheck, UserRoundX } from 'lucide-react'

import { routes } from '../../routes'
import { ButtonLink } from '../ui/Button'
import { buttonStyles } from '../ui/buttonStyles'
import { Container } from '../ui/Container'
import { ResultPreview } from './ResultPreview'

const highlights = [
  { icon: Clock, label: 'Cerca de 4 minutos' },
  { icon: ShieldCheck, label: '100% anônimo' },
  { icon: UserRoundX, label: 'Sem cadastro' },
]

export function Hero() {
  return (
    <section aria-labelledby="hero-title" className="relative overflow-hidden">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[38rem] opacity-70"
        style={{
          background:
            'radial-gradient(50% 60% at 15% 0%, var(--color-brand-100) 0%, transparent 70%), radial-gradient(40% 50% at 90% 10%, var(--color-water-100) 0%, transparent 70%)',
        }}
      />
      <Container className="grid items-center gap-12 pt-12 pb-16 sm:pt-16 lg:grid-cols-[1.1fr_1fr] lg:gap-16 lg:pt-24 lg:pb-24">
        <div>
          <p className="inline-flex items-center gap-2 rounded-full bg-surface/80 px-3 py-1 text-xs font-semibold text-brand-700 ring-1 ring-brand-200">
            <span className="size-1.5 rounded-full bg-brand-500" aria-hidden="true" />
            Projeto extensionista · Meio Ambiente e Saúde
          </p>

          <h1 id="hero-title" className="mt-5 text-4xl leading-[1.1] font-extrabold tracking-tight sm:text-5xl lg:text-[3.4rem]">
            Como estão os seus <span className="text-brand-600">hábitos sustentáveis</span>?
          </h1>

          <p className="mt-5 max-w-xl text-lg leading-relaxed text-ink-soft">
            Responda a 20 perguntas rápidas sobre água, energia, resíduos, consumo e mobilidade. Veja seu resultado na
            hora e compare com a média de quem já participou.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <ButtonLink to={routes.quiz} size="lg">
              Começar o EcoCheck
              <ArrowRight className="size-5" aria-hidden="true" />
            </ButtonLink>
            <a href="#como-funciona" className={buttonStyles({ variant: 'secondary', size: 'lg' })}>
              Como funciona
            </a>
          </div>

          <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-sm text-muted">
            {highlights.map(({ icon: Icon, label }) => (
              <li key={label} className="flex items-center gap-2">
                <Icon className="size-4 text-brand-600" aria-hidden="true" />
                {label}
              </li>
            ))}
          </ul>
        </div>

        <div className="mx-auto w-full max-w-md lg:max-w-none">
          <ResultPreview />
        </div>
      </Container>
    </section>
  )
}
