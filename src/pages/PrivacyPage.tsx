import { Check, X } from 'lucide-react'
import type { ReactNode } from 'react'

import { Container } from '../components/ui/Container'
import { useDocumentTitle } from '../hooks/useDocumentTitle'

const LAST_UPDATED = '1º de outubro de 2026'

const stored = [
  'As alternativas escolhidas em cada pergunta',
  'A pontuação calculada (geral e por categoria) e a classificação',
  'A data e a hora do envio e a versão do questionário',
]

const notCollected = [
  'Nome, e-mail, telefone, CPF ou endereço',
  'Endereço IP, localização ou dados do dispositivo',
  'Cookies de rastreamento, publicidade ou perfis de navegação',
]

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="border-t border-line pt-8">
      <h2 className="text-xl font-bold">{title}</h2>
      <div className="mt-3 space-y-3 leading-relaxed text-ink-soft">{children}</div>
    </section>
  )
}

export function PrivacyPage() {
  useDocumentTitle('Privacidade')

  return (
    <Container size="narrow" className="py-12 sm:py-16">
      <p className="text-sm font-semibold text-brand-700">Privacidade</p>
      <h1 className="mt-2 text-3xl font-extrabold tracking-tight sm:text-4xl">Como tratamos as suas respostas</h1>
      <p className="mt-4 text-lg leading-relaxed text-ink-soft">
        O EcoCheck foi pensado para funcionar sem identificar ninguém. Não há cadastro, login ou qualquer pergunta sobre
        quem você é.
      </p>
      <p className="mt-2 text-sm text-muted">Última atualização: {LAST_UPDATED}</p>

      <div className="mt-10 grid gap-4 sm:grid-cols-2">
        <div className="rounded-2xl bg-surface p-5 ring-1 ring-line">
          <h2 className="text-base font-bold">O que é armazenado</h2>
          <ul className="mt-3 space-y-2.5 text-sm text-ink-soft">
            {stored.map((item) => (
              <li key={item} className="flex gap-2.5">
                <Check className="mt-0.5 size-4 shrink-0 text-brand-600" aria-hidden="true" />
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-2xl bg-surface p-5 ring-1 ring-line">
          <h2 className="text-base font-bold">O que não é coletado</h2>
          <ul className="mt-3 space-y-2.5 text-sm text-ink-soft">
            {notCollected.map((item) => (
              <li key={item} className="flex gap-2.5">
                <X className="mt-0.5 size-4 shrink-0 text-consumption-600" aria-hidden="true" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-10 space-y-8">
        <Section title="Para que as respostas são usadas">
          <p>
            Exclusivamente para fins educativos e estatísticos do projeto extensionista: calcular o seu resultado
            individual e gerar estatísticas agregadas, como médias por categoria e a distribuição das respostas.
          </p>
          <p>
            As estatísticas públicas mostram apenas totais e percentuais. A distribuição por pergunta só é exibida a
            partir de 5 participantes, para que poucas respostas não revelem escolhas individuais.
          </p>
        </Section>

        <Section title="O seu resultado individual">
          <p>
            O resultado é exibido apenas para você, no seu navegador. Ele não é associado a nenhuma informação que
            permita identificar quem respondeu, e nenhuma outra pessoa consegue consultá-lo.
          </p>
        </Section>

        <Section title="Proteção contra envios automatizados">
          <p>
            Para evitar spam, a API limita a quantidade de envios por conexão em um curto período. Para isso, o endereço
            IP é usado temporariamente, somente na memória do servidor, e descartado em seguida. Ele nunca é gravado no
            banco de dados nem associado às respostas.
          </p>
          <p>
            Os serviços de hospedagem utilizados (Vercel e Railway) podem manter registros técnicos de acesso para
            operação e segurança da infraestrutura, conforme as políticas de privacidade de cada provedor.
          </p>
        </Section>

        <Section title="Armazenamento no seu navegador">
          <p>
            Durante o questionário, o progresso fica salvo temporariamente no próprio navegador, para que você não perca
            as respostas ao navegar entre as perguntas ou recarregar a página. Essas informações ficam apenas no seu
            dispositivo e podem ser apagadas a qualquer momento limpando os dados do site.
          </p>
        </Section>

        <Section title="Lei Geral de Proteção de Dados (LGPD)">
          <p>
            Como as respostas não permitem identificar o participante, elas são tratadas como dados anonimizados. Pela
            LGPD (Lei nº 13.709/2018, art. 12), dados anonimizados não são considerados dados pessoais. Ainda assim, o
            projeto segue o princípio de coletar apenas o mínimo necessário.
          </p>
        </Section>

        <Section title="Caráter educativo">
          <p>
            O EcoCheck é um questionário educativo, desenvolvido para promover a reflexão sobre hábitos cotidianos. A
            pontuação não mede a pegada ecológica real de ninguém e não constitui diagnóstico ou avaliação científica.
          </p>
        </Section>
      </div>
    </Container>
  )
}
