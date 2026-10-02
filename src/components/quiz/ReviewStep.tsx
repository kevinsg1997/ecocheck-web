import { ChevronDown, MapPin, Pencil, Send, ShieldCheck } from 'lucide-react'

import { categoryList } from '../../data/categories'
import { countryName, stateName } from '../../data/regions'
import type { ApiError } from '../../services/apiClient'
import type { QuestionnaireDto } from '../../types/api'
import { cn } from '../../utils/cn'
import { Alert } from '../ui/Alert'
import { Button } from '../ui/Button'
import { Spinner } from '../ui/Spinner'

interface ReviewStepProps {
  questionnaire: QuestionnaireDto
  answers: Record<number, number>
  countryCode: string
  stateCode: string
  firstUnansweredIndex: number
  submitting: boolean
  error: ApiError | null
  onEditQuestion: (index: number) => void
  onEditRegion: () => void
  onSubmit: () => void
  onRestart: () => void
}

export function ReviewStep({
  questionnaire,
  answers,
  countryCode,
  stateCode,
  firstUnansweredIndex,
  submitting,
  error,
  onEditQuestion,
  onEditRegion,
  onSubmit,
  onRestart,
}: ReviewStepProps) {
  const isComplete = firstUnansweredIndex === -1
  const region = countryCode
    ? [countryName(countryCode), stateCode ? stateName(stateCode) : null].filter(Boolean).join(' · ')
    : 'Não informada'
  const isOutdated = error?.fieldErrors.questionnaireVersion !== undefined

  return (
    <div>
      <h2 className="text-xl leading-snug font-bold tracking-tight sm:text-2xl">Revise e envie suas respostas</h2>
      <p className="mt-2 leading-relaxed text-muted">
        Confira o resumo abaixo. Você ainda pode alterar qualquer resposta antes de enviar.
      </p>

      <ul className="mt-6 grid grid-cols-2 gap-2.5">
        {categoryList.map((category) => {
          const questions = questionnaire.questions.filter((question) => question.category === category.id)
          const answered = questions.filter((question) => answers[question.id] !== undefined).length
          const Icon = category.icon
          return (
            <li key={category.id} className="rounded-2xl bg-surface p-3.5 ring-1 ring-line">
              <span className={cn('flex size-8 items-center justify-center rounded-lg', category.classes.iconBox)}>
                <Icon className="size-4" aria-hidden="true" />
              </span>
              <p className="mt-2.5 text-sm leading-tight font-semibold">{category.name}</p>
              <p className={cn('mt-0.5 text-xs', answered === questions.length ? 'text-muted' : 'font-semibold text-consumption-600')}>
                {answered} de {questions.length} respondidas
              </p>
            </li>
          )
        })}
      </ul>

      <div className="mt-2.5 flex items-center justify-between gap-3 rounded-2xl bg-surface p-3.5 ring-1 ring-line">
        <p className="flex items-center gap-2.5 text-sm">
          <MapPin className="size-4 shrink-0 text-brand-600" aria-hidden="true" />
          <span>
            <span className="text-muted">Região: </span>
            <span className="font-medium">{region}</span>
          </span>
        </p>
        <button type="button" onClick={onEditRegion} className="shrink-0 text-sm font-semibold text-brand-700 hover:underline">
          Alterar
        </button>
      </div>

      <details className="group mt-2.5 rounded-2xl bg-surface ring-1 ring-line">
        <summary className="flex cursor-pointer list-none items-center justify-between rounded-2xl p-3.5 text-sm font-semibold [&::-webkit-details-marker]:hidden">
          Ver todas as respostas
          <ChevronDown className="size-4 transition-transform group-open:rotate-180" aria-hidden="true" />
        </summary>
        <ol className="divide-y divide-line border-t border-line">
          {questionnaire.questions.map((question, index) => {
            const option = question.options.find((item) => item.id === answers[question.id])
            return (
              <li key={question.id} className="flex items-start gap-3 p-3.5">
                <span className="mt-0.5 w-6 shrink-0 text-xs font-semibold text-muted tabular-nums">{index + 1}.</span>
                <div className="min-w-0 flex-1">
                  <p className="text-sm text-ink-soft">{question.text}</p>
                  <p className={cn('mt-1 text-sm font-semibold', !option && 'text-consumption-600')}>
                    {option?.text ?? 'Sem resposta'}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => onEditQuestion(index)}
                  className="shrink-0 rounded-lg p-1.5 text-muted hover:bg-ink/5 hover:text-ink"
                  aria-label={`Alterar resposta da pergunta ${index + 1}`}
                >
                  <Pencil className="size-4" aria-hidden="true" />
                </button>
              </li>
            )
          })}
        </ol>
      </details>

      {!isComplete && (
        <Alert
          tone="error"
          className="mt-6"
          title="Ainda há perguntas sem resposta"
          action={
            <Button variant="secondary" onClick={() => onEditQuestion(firstUnansweredIndex)}>
              Ir para a pergunta {firstUnansweredIndex + 1}
            </Button>
          }
        />
      )}

      {error && (
        <Alert
          tone="error"
          className="mt-6"
          title="Não foi possível enviar"
          action={
            isOutdated && (
              <Button variant="secondary" onClick={onRestart}>
                Recomeçar com a versão atual
              </Button>
            )
          }
        >
          {error.message}
        </Alert>
      )}

      <div className="mt-6 rounded-2xl bg-brand-50 p-4 ring-1 ring-brand-100">
        <p className="flex items-start gap-2.5 text-sm leading-relaxed text-brand-900">
          <ShieldCheck className="mt-0.5 size-4 shrink-0 text-brand-600" aria-hidden="true" />
          Ao enviar, suas respostas serão registradas de forma anônima e usadas apenas nas estatísticas do projeto.
        </p>
        <Button size="lg" fullWidth className="mt-4" onClick={onSubmit} disabled={!isComplete || submitting}>
          {submitting ? (
            <>
              <Spinner />
              Calculando seu resultado…
            </>
          ) : (
            <>
              <Send className="size-5" aria-hidden="true" />
              Enviar respostas
            </>
          )}
        </Button>
      </div>
    </div>
  )
}
