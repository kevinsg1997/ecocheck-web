import { ClipboardList, Info, Lightbulb, RotateCcw, Sparkles, TrendingUp } from 'lucide-react'
import { useState } from 'react'

import { ChartCard } from '../components/charts/ChartCard'
import { HBarChart } from '../components/charts/HBarChart'
import { HabitList } from '../components/result/HabitList'
import { ShareButton } from '../components/result/ShareButton'
import { StatisticsSection } from '../components/statistics/StatisticsSection'
import { ButtonLink } from '../components/ui/Button'
import { Container } from '../components/ui/Container'
import { ScoreRing } from '../components/ui/ScoreRing'
import { categoryList } from '../data/categories'
import { classifications } from '../data/classifications'
import { useDocumentTitle } from '../hooks/useDocumentTitle'
import { useStatistics } from '../hooks/useStatistics'
import { localStore } from '../services/localStore'
import { routes } from '../routes'
import { buildEducationalMessage, getImprovements, getStrengths } from '../utils/resultInsights'

/** Cores validadas (contraste e daltonismo) para a comparação "Você × média". */
const YOU_COLOR = '#237a53'
const AVERAGE_COLOR = '#2f7fc1'

export function ResultPage() {
  useDocumentTitle('Seu resultado')
  const [stored] = useState(() => localStore.loadResult())
  const global = useStatistics({})

  if (!stored) {
    return (
      <Container size="narrow" className="flex flex-col items-center py-24 text-center">
        <span className="flex size-14 items-center justify-center rounded-2xl bg-brand-50 text-brand-600">
          <ClipboardList className="size-7" aria-hidden="true" />
        </span>
        <h1 className="mt-6 text-3xl font-extrabold tracking-tight">Nenhum resultado por aqui</h1>
        <p className="mt-3 text-muted">Responda ao questionário para ver o seu resultado.</p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <ButtonLink to={routes.quiz} size="lg">
            Começar o EcoCheck
          </ButtonLink>
          <ButtonLink to={routes.statistics} variant="secondary" size="lg">
            Ver estatísticas gerais
          </ButtonLink>
        </div>
      </Container>
    )
  }

  const { result } = stored
  // Resultados salvos por versões anteriores podem não ter a lista de perguntas.
  const questions = stored.questions ?? []
  const classification = classifications[result.classification]
  const strengths = getStrengths(result, questions)
  const improvements = getImprovements(result, questions)

  const globalStats = global.state.status === 'success' ? global.state.statistics : null
  const hasAverages = Boolean(globalStats?.summaryAvailable && globalStats.totalParticipants > 0)

  const comparisonRows = categoryList
    .map((category) => {
      const mine = result.categories.find((item) => item.category === category.id)
      const average = globalStats?.categories.find((item) => item.category === category.id)
      return mine
        ? { label: category.name, you: mine.percentage, average: hasAverages ? (average?.averagePercentage ?? null) : null }
        : null
    })
    .filter((row) => row !== null)

  const series = hasAverages
    ? [
        { key: 'you', name: 'Você', color: YOU_COLOR },
        { key: 'average', name: 'Média geral', color: AVERAGE_COLOR },
      ]
    : [{ key: 'you', name: 'Você', color: YOU_COLOR }]

  return (
    <div className="py-10 sm:py-14">
      <Container className="space-y-6">
        <section
          aria-labelledby="resultado-title"
          className="grid gap-6 rounded-3xl bg-surface p-6 shadow-raised ring-1 ring-line sm:grid-cols-[auto_1fr] sm:items-center sm:p-8"
        >
          <ScoreRing
            value={result.percentage}
            className="size-36 text-[1.15rem] sm:size-40"
            label={`${Math.round(result.percentage)}% de hábitos sustentáveis`}
          />
          <div>
            <p className="text-sm font-semibold text-brand-700">Seu resultado</p>
            <h1 id="resultado-title" className="mt-1 text-3xl font-extrabold tracking-tight sm:text-4xl">
              {classification.name}
            </h1>
            <p className="mt-2 leading-relaxed text-ink-soft">{classification.description}</p>
            <p className="mt-2 text-sm text-muted">
              {result.totalScore} de {result.maxScore} pontos possíveis · faixa {classification.range}
            </p>
            <div className="mt-5 flex flex-wrap items-start gap-3">
              <ShareButton percentage={result.percentage} classificationName={classification.name} />
              <ButtonLink to={routes.quiz} variant="ghost">
                <RotateCcw className="size-4" aria-hidden="true" />
                Responder novamente
              </ButtonLink>
            </div>
          </div>
        </section>

        <p className="flex items-start gap-3 rounded-2xl bg-brand-50 p-4 leading-relaxed text-brand-900 ring-1 ring-brand-100">
          <Lightbulb className="mt-0.5 size-5 shrink-0 text-brand-600" aria-hidden="true" />
          {buildEducationalMessage(result.categories)}
        </p>

        <ChartCard
          title="Seu desempenho por categoria"
          description={
            hasAverages
              ? `Comparado com a média de ${globalStats!.totalParticipants.toLocaleString('pt-BR')} participantes.`
              : 'Percentual de hábitos sustentáveis em cada área.'
          }
          legend={series.map((item) => ({ label: item.name, color: item.color }))}
          table={{
            columns: hasAverages ? ['Categoria', 'Você', 'Média geral'] : ['Categoria', 'Você'],
            rows: comparisonRows.map((row) =>
              hasAverages
                ? [row.label, `${Math.round(row.you)}%`, row.average === null ? '—' : `${Math.round(row.average)}%`]
                : [row.label, `${Math.round(row.you)}%`],
            ),
          }}
        >
          <HBarChart ariaLabel="Seu desempenho por categoria" data={comparisonRows} series={series} />
        </ChartCard>

        <div className="grid gap-4 lg:grid-cols-2">
          <HabitList
            title="Seus pontos fortes"
            icon={Sparkles}
            iconClassName="bg-brand-50 text-brand-600"
            items={strengths}
            emptyMessage="Nenhum hábito atingiu a pontuação máxima desta vez. As dicas ao lado são um bom ponto de partida."
          />
          <HabitList
            title="Sugestões de melhoria"
            icon={TrendingUp}
            iconClassName="bg-energy-50 text-energy-600"
            items={improvements}
            showTips
            emptyMessage="Você foi bem em todas as perguntas! Continue com esses hábitos e compartilhe com outras pessoas."
          />
        </div>

        <p className="flex items-start gap-2 text-sm leading-relaxed text-muted">
          <Info className="mt-0.5 size-4 shrink-0 text-water-600" aria-hidden="true" />
          Este resultado é educativo e serve para reflexão sobre hábitos cotidianos. Ele não mede a pegada ecológica real nem
          constitui avaliação científica.
        </p>
      </Container>

      <div id="estatisticas" className="mt-14 border-t border-line bg-surface/60 py-12 sm:py-16">
        <Container>
          <StatisticsSection global={global} />
        </Container>
      </div>
    </div>
  )
}
