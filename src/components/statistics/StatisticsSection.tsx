import { ArrowRight, ThumbsUp, TrendingUp, Users } from 'lucide-react'
import { useSearchParams } from 'react-router'

import { categories, categoryList } from '../../data/categories'
import { classifications } from '../../data/classifications'
import { BRAZIL, countryName, stateName } from '../../data/regions'
import { useStatistics } from '../../hooks/useStatistics'
import { routes } from '../../routes'
import type { HabitHighlightDto, StatisticsDto } from '../../types/api'
import { cn } from '../../utils/cn'
import { formatParticipants } from '../../utils/format'
import { ChartCard } from '../charts/ChartCard'
import { HBarChart } from '../charts/HBarChart'
import { Alert } from '../ui/Alert'
import { Button, ButtonLink } from '../ui/Button'
import { Spinner } from '../ui/Spinner'
import { QuestionExplorer } from './QuestionExplorer'
import { RegionFilter } from './RegionFilter'

type GlobalStatistics = ReturnType<typeof useStatistics>

/** Rampa sequencial (um único matiz, do claro ao escuro) para as classificações, que são ordenadas. */
const CLASSIFICATION_COLORS = ['#b3e2c9', '#82cca7', '#4fb081', '#2f9466', '#1f6145']

interface StatisticsSectionProps {
  /** Estatísticas sem filtro, buscadas pela página (também usadas para a comparação do resultado). */
  global: GlobalStatistics
  headingLevel?: 'h1' | 'h2'
}

export function StatisticsSection({ global, headingLevel = 'h2' }: StatisticsSectionProps) {
  const [searchParams, setSearchParams] = useSearchParams()
  const countryCode = (searchParams.get('pais') ?? '').toUpperCase()
  const stateCode = countryCode === BRAZIL ? (searchParams.get('estado') ?? '').toUpperCase() : ''
  const filterActive = countryCode !== ''

  const filtered = useStatistics({ countryCode, stateCode }, filterActive)
  const current = filterActive ? filtered : global

  const globalData = global.state.status === 'success' ? global.state.statistics : null
  const data =
    current.state.status === 'success'
      ? current.state.statistics
      : current.state.status === 'loading'
        ? current.state.previous
        : undefined

  const handleFilterChange = (country: string, state: string) => {
    const next = new URLSearchParams(searchParams)
    if (country) next.set('pais', country)
    else next.delete('pais')
    if (country === BRAZIL && state) next.set('estado', state)
    else next.delete('estado')
    setSearchParams(next, { replace: true, preventScrollReset: true })
  }

  const regionLabel = filterActive
    ? [countryName(countryCode), stateCode ? stateName(stateCode) : null].filter(Boolean).join(' · ')
    : null

  const Heading = headingLevel

  return (
    <section aria-labelledby="estatisticas-title">
      <div className="flex flex-col gap-1">
        <p className="text-sm font-semibold text-brand-700">Estatísticas gerais</p>
        <Heading id="estatisticas-title" className="text-2xl font-bold tracking-tight sm:text-3xl">
          Como estamos indo juntos?
        </Heading>
        <p className="mt-1 max-w-2xl leading-relaxed text-muted">
          Dados agregados e anônimos de todas as pessoas que já participaram do EcoCheck.
        </p>
      </div>

      <div className="mt-6">
        <RegionFilter
          regions={globalData?.regions ?? null}
          countryCode={countryCode}
          stateCode={stateCode}
          minimumParticipants={globalData?.minimumParticipantsForDetails ?? 5}
          onChange={handleFilterChange}
        />
      </div>

      <div className="relative mt-6" aria-busy={current.isRefreshing}>
        {current.isRefreshing && data && (
          <p className="absolute -top-5 right-0 flex items-center gap-1.5 text-xs text-muted" role="status">
            <Spinner className="size-3" /> Atualizando…
          </p>
        )}

        {current.state.status === 'error' && (
          <Alert
            tone="error"
            title="Não foi possível carregar as estatísticas"
            action={
              <Button variant="secondary" onClick={current.reload}>
                Tentar novamente
              </Button>
            }
          >
            {current.state.error.message}
          </Alert>
        )}

        {!data && current.state.status === 'loading' && <StatisticsSkeleton />}

        {data && (
          <div className={cn('transition-opacity', current.isRefreshing && 'opacity-60')}>
            <StatisticsContent data={data} regionLabel={regionLabel} />
          </div>
        )}
      </div>
    </section>
  )
}

function StatisticsContent({ data, regionLabel }: { data: StatisticsDto; regionLabel: string | null }) {
  if (!data.summaryAvailable) {
    return (
      <Alert title={`Ainda não há dados suficientes${regionLabel ? ` para ${regionLabel}` : ''}`}>
        Para proteger o anonimato, as estatísticas de uma região só aparecem quando ela reúne pelo menos{' '}
        {data.minimumParticipantsForDetails} participantes.
      </Alert>
    )
  }

  if (data.totalParticipants === 0) {
    return (
      <div className="rounded-3xl bg-surface p-8 text-center ring-1 ring-line">
        <Users className="mx-auto size-8 text-brand-600" aria-hidden="true" />
        <p className="mt-3 font-display text-lg font-bold">Ainda não há participações registradas</p>
        <p className="mt-1 text-sm text-muted">Seja a primeira pessoa a responder ao EcoCheck!</p>
        <ButtonLink to={routes.quiz} className="mt-5">
          Começar o EcoCheck
          <ArrowRight className="size-4" aria-hidden="true" />
        </ButtonLink>
      </div>
    )
  }

  const mostCommon = [...data.classifications].sort((a, b) => b.count - a.count)[0]

  return (
    <div className="space-y-4">
      {regionLabel && (
        <p className="text-sm text-ink-soft">
          Mostrando dados de <span className="font-semibold text-ink">{regionLabel}</span>
        </p>
      )}

      <dl className="grid gap-3 sm:grid-cols-3">
        <StatTile label="Participantes" value={data.totalParticipants.toLocaleString('pt-BR')} hero />
        <StatTile
          label="Média geral"
          value={data.averagePercentage === null ? '—' : `${Math.round(data.averagePercentage)}%`}
        />
        <StatTile label="Classificação mais comum" value={mostCommon ? classifications[mostCommon.classification].name : '—'} small />
      </dl>

      <div className="grid gap-4 lg:grid-cols-2">
        <ChartCard
          title="Média por categoria"
          description="Percentual médio de hábitos sustentáveis em cada área."
          table={{
            columns: ['Categoria', 'Média'],
            rows: data.categories.map((item) => [categories[item.category].name, `${Math.round(item.averagePercentage)}%`]),
          }}
        >
          <HBarChart
            ariaLabel="Média por categoria"
            data={categoryList
              .map((category) => ({
                label: category.name,
                color: category.color,
                value: data.categories.find((item) => item.category === category.id)?.averagePercentage ?? null,
              }))
              .filter((row) => row.value !== null)}
            series={[{ key: 'value', name: 'Média' }]}
          />
        </ChartCard>

        <ChartCard
          title="Distribuição das classificações"
          description="Percentual de participantes em cada faixa."
          table={{
            columns: ['Classificação', 'Participantes', '%'],
            rows: data.classifications.map((item) => [
              classifications[item.classification].name,
              item.count,
              `${Math.round(item.percentage)}%`,
            ]),
          }}
        >
          <HBarChart
            ariaLabel="Distribuição das classificações"
            labelWidth={120}
            data={data.classifications.map((item, index) => ({
              label: classifications[item.classification].name,
              color: CLASSIFICATION_COLORS[index],
              value: item.percentage,
            }))}
            series={[{ key: 'value', name: 'Participantes' }]}
          />
        </ChartCard>
      </div>

      {data.detailsAvailable ? (
        <>
          <div className="grid gap-4 lg:grid-cols-2">
            <HighlightList
              title="Hábitos mais praticados"
              icon={ThumbsUp}
              iconClassName="bg-brand-50 text-brand-600"
              items={data.topHabits}
            />
            <HighlightList
              title="Maiores oportunidades de melhoria"
              icon={TrendingUp}
              iconClassName="bg-energy-50 text-energy-600"
              items={data.improvementOpportunities}
            />
          </div>
          <QuestionExplorer questions={data.questions} />
        </>
      ) : (
        <Alert>
          A distribuição das respostas por pergunta aparece a partir de {data.minimumParticipantsForDetails} participantes.
        </Alert>
      )}

      <RegionBreakdown data={data} />

      <p className="text-xs text-muted">
        Atualizado às{' '}
        {new Date(data.generatedAt).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}. Os dados são
        educativos e não representam uma amostra científica da população.
      </p>
    </div>
  )
}

function StatTile({ label, value, hero = false, small = false }: { label: string; value: string; hero?: boolean; small?: boolean }) {
  return (
    <div className="rounded-2xl bg-surface p-4 ring-1 ring-line">
      <dt className="text-sm text-muted">{label}</dt>
      <dd
        className={cn(
          'mt-1 font-display font-bold tracking-tight tabular-nums',
          hero ? 'text-4xl text-brand-700' : small ? 'text-lg leading-snug' : 'text-3xl',
        )}
      >
        {value}
      </dd>
    </div>
  )
}

interface HighlightListProps {
  title: string
  icon: typeof ThumbsUp
  iconClassName: string
  items: HabitHighlightDto[]
}

function HighlightList({ title, icon: Icon, iconClassName, items }: HighlightListProps) {
  return (
    <section className="rounded-3xl bg-surface p-5 shadow-card ring-1 ring-line sm:p-6">
      <h3 className="flex items-center gap-2.5 text-base font-bold">
        <span className={cn('flex size-8 items-center justify-center rounded-lg', iconClassName)}>
          <Icon className="size-4" aria-hidden="true" />
        </span>
        {title}
      </h3>
      <ol className="mt-4 space-y-3">
        {items.map((item) => {
          const category = categories[item.category]
          const CategoryIcon = category.icon
          return (
            <li key={item.questionId} className="flex items-start gap-3">
              <CategoryIcon className={cn('mt-0.5 size-4 shrink-0', category.classes.text)} aria-hidden="true" />
              <span className="flex-1 text-sm leading-relaxed text-ink-soft">{item.text}</span>
              <span className="shrink-0 text-sm font-semibold tabular-nums">{Math.round(item.averagePercentage)}%</span>
            </li>
          )
        })}
      </ol>
    </section>
  )
}

function RegionBreakdown({ data }: { data: StatisticsDto }) {
  const { countries, brazilStates } = data.regions
  if (countries.length === 0 && brazilStates.length === 0) return null

  const rows = [
    ...countries.map((item) => ({ key: `c-${item.code}`, name: countryName(item.code), ...item })),
    ...brazilStates.map((item) => ({ key: `s-${item.code}`, name: `${stateName(item.code)} (UF)`, ...item })),
  ]

  return (
    <section className="rounded-3xl bg-surface p-5 shadow-card ring-1 ring-line sm:p-6">
      <h3 className="text-base font-bold">Participação por região</h3>
      <p className="mt-1 text-sm text-muted">
        {formatParticipants(data.regions.participantsWithRegion)} informaram a região. Só aparecem regiões com pelo menos{' '}
        {data.minimumParticipantsForDetails} pessoas.
      </p>
      <div className="mt-4 overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-line text-muted">
              <th scope="col" className="py-2 font-medium">Região</th>
              <th scope="col" className="py-2 text-right font-medium">Participantes</th>
              <th scope="col" className="py-2 text-right font-medium">Média</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.key} className="border-b border-line/60 last:border-0">
                <td className="py-2 text-ink-soft">{row.name}</td>
                <td className="py-2 text-right tabular-nums">{row.participants}</td>
                <td className="py-2 text-right font-semibold tabular-nums">{Math.round(row.averagePercentage)}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}

function StatisticsSkeleton() {
  return (
    <div aria-label="Carregando estatísticas" className="animate-pulse space-y-4 motion-reduce:animate-none">
      <div className="grid gap-3 sm:grid-cols-3">
        {Array.from({ length: 3 }, (_, index) => (
          <div key={index} className="h-24 rounded-2xl bg-surface ring-1 ring-line" />
        ))}
      </div>
      <div className="grid gap-4 lg:grid-cols-2">
        <div className="h-64 rounded-3xl bg-surface ring-1 ring-line" />
        <div className="h-64 rounded-3xl bg-surface ring-1 ring-line" />
      </div>
    </div>
  )
}
