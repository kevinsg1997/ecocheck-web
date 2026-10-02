import { ArrowLeft, ArrowRight, RotateCcw } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router'

import { useQuiz } from '../../hooks/useQuiz'
import { ApiError } from '../../services/apiClient'
import { localStore } from '../../services/localStore'
import { submitResponse } from '../../services/surveyService'
import { routes } from '../../routes'
import type { QuestionnaireDto } from '../../types/api'
import { Alert } from '../ui/Alert'
import { Button } from '../ui/Button'
import { QuestionStep } from './QuestionStep'
import { QuizProgress } from './QuizProgress'
import { RegionStep } from './RegionStep'
import { ReviewStep } from './ReviewStep'

const AUTO_ADVANCE_MS = 280

interface QuizFlowProps {
  questionnaire: QuestionnaireDto
  /** Recarrega o questionário da API (ex.: quando a versão mudou). */
  onReload: () => void
}

export function QuizFlow({ questionnaire, onReload }: QuizFlowProps) {
  const navigate = useNavigate()
  const { state, dispatch, answeredCount, firstUnansweredIndex } = useQuiz(questionnaire)
  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<ApiError | null>(null)
  const [confirmingRestart, setConfirmingRestart] = useState(false)
  const [participatedBefore] = useState(() => localStore.hasParticipated())

  const advanceTimer = useRef<number | undefined>(undefined)
  const stepRef = useRef<HTMLDivElement>(null)
  const isFirstStep = useRef(true)

  const total = questionnaire.questions.length
  const question = questionnaire.questions[state.currentIndex]
  const stepKey = state.stage === 'questions' ? `question-${question.id}` : state.stage

  // Ao trocar de etapa: leva o foco para o novo conteúdo (leitores de tela) e volta ao topo.
  useEffect(() => {
    if (isFirstStep.current) {
      isFirstStep.current = false
      return
    }
    window.scrollTo({ top: 0 })
    stepRef.current?.focus({ preventScroll: true })
  }, [stepKey])

  useEffect(() => () => window.clearTimeout(advanceTimer.current), [])

  const cancelAutoAdvance = () => window.clearTimeout(advanceTimer.current)

  const go = (action: Parameters<typeof dispatch>[0]) => {
    cancelAutoAdvance()
    setSubmitError(null)
    dispatch(action)
  }

  const handleSelect = (optionId: number, viaPointer: boolean) => {
    const isFirstAnswer = state.answers[question.id] === undefined
    cancelAutoAdvance()
    dispatch({ type: 'answer', questionId: question.id, optionId })
    if (viaPointer && isFirstAnswer) {
      advanceTimer.current = window.setTimeout(() => dispatch({ type: 'next' }), AUTO_ADVANCE_MS)
    }
  }

  const handleRestart = () => {
    setConfirmingRestart(false)
    go({ type: 'reset' })
  }

  const handleReloadQuestionnaire = () => {
    localStore.clearProgress()
    onReload()
  }

  const handleSubmit = async () => {
    setSubmitting(true)
    setSubmitError(null)
    try {
      const result = await submitResponse({
        questionnaireVersion: questionnaire.version,
        answers: questionnaire.questions.map((item) => ({ questionId: item.id, optionId: state.answers[item.id] })),
        countryCode: state.countryCode || undefined,
        stateCode: state.stateCode || undefined,
      })
      localStore.saveResult(
        result,
        questionnaire.questions.map(({ id, category, text }) => ({ id, category, text })),
      )
      localStore.markParticipated()
      localStore.clearProgress()
      navigate(routes.result, { replace: true })
    } catch (error) {
      setSubmitError(error instanceof ApiError ? error : new ApiError('server', 'Não foi possível enviar as respostas.'))
      setSubmitting(false)
    }
  }

  const progressLabel =
    state.stage === 'questions'
      ? `Pergunta ${state.currentIndex + 1} de ${total}`
      : state.stage === 'region'
        ? 'Etapa final (opcional)'
        : 'Revisão'

  const isAnswered = state.answers[question.id] !== undefined
  const isLastQuestion = state.currentIndex === total - 1

  return (
    <div>
      <div className="flex items-end justify-between gap-4">
        <div className="flex-1">
          <QuizProgress label={progressLabel} value={answeredCount / total} />
        </div>
        {answeredCount > 0 && !confirmingRestart && (
          <Button variant="ghost" className="-mb-1 h-9 px-2.5" onClick={() => setConfirmingRestart(true)}>
            <RotateCcw className="size-4" aria-hidden="true" />
            <span className="hidden sm:inline">Recomeçar</span>
            <span className="sr-only sm:hidden">Recomeçar</span>
          </Button>
        )}
      </div>

      {confirmingRestart && (
        <Alert
          className="mt-4"
          title="Apagar as respostas e recomeçar?"
          action={
            <div className="flex gap-2">
              <Button variant="primary" onClick={handleRestart}>
                Sim, recomeçar
              </Button>
              <Button variant="secondary" onClick={() => setConfirmingRestart(false)}>
                Cancelar
              </Button>
            </div>
          }
        />
      )}

      {participatedBefore && answeredCount === 0 && state.stage === 'questions' && state.currentIndex === 0 && (
        <Alert className="mt-4">
          Você já participou neste navegador. Pode responder novamente, mas cada envio conta como uma nova participação nas
          estatísticas.
        </Alert>
      )}

      <div
        key={stepKey}
        ref={stepRef}
        tabIndex={-1}
        className="mt-6 rounded-3xl bg-surface p-5 shadow-card ring-1 ring-line outline-none motion-safe:animate-step-in sm:p-8"
      >
        {state.stage === 'questions' && (
          <QuestionStep question={question} selectedOptionId={state.answers[question.id]} onSelect={handleSelect} />
        )}
        {state.stage === 'region' && (
          <RegionStep
            countryCode={state.countryCode}
            stateCode={state.stateCode}
            onCountryChange={(countryCode) => dispatch({ type: 'setCountry', countryCode })}
            onStateChange={(stateCode) => dispatch({ type: 'setState', stateCode })}
          />
        )}
        {state.stage === 'review' && (
          <ReviewStep
            questionnaire={questionnaire}
            answers={state.answers}
            countryCode={state.countryCode}
            stateCode={state.stateCode}
            firstUnansweredIndex={firstUnansweredIndex}
            submitting={submitting}
            error={submitError}
            onEditQuestion={(index) => go({ type: 'goToQuestion', index })}
            onEditRegion={() => go({ type: 'back' })}
            onSubmit={handleSubmit}
            onRestart={handleReloadQuestionnaire}
          />
        )}
      </div>

      <nav
        aria-label="Navegação do questionário"
        className="sticky bottom-0 -mx-4 mt-6 flex gap-3 border-t border-line bg-canvas/95 px-4 py-3 backdrop-blur sm:static sm:mx-0 sm:border-0 sm:bg-transparent sm:p-0 sm:backdrop-blur-none"
      >
        <Button
          variant="secondary"
          size="lg"
          onClick={() => go({ type: 'back' })}
          disabled={(state.stage === 'questions' && state.currentIndex === 0) || submitting}
          className="flex-1 sm:flex-none"
        >
          <ArrowLeft className="size-5" aria-hidden="true" />
          Voltar
        </Button>

        {state.stage !== 'review' && (
          <Button
            size="lg"
            onClick={() => go({ type: 'next' })}
            disabled={state.stage === 'questions' && !isAnswered}
            className="flex-1 sm:ml-auto sm:flex-none"
          >
            {state.stage === 'region'
              ? state.countryCode
                ? 'Continuar'
                : 'Pular'
              : isLastQuestion
                ? 'Continuar'
                : 'Próxima'}
            <ArrowRight className="size-5" aria-hidden="true" />
          </Button>
        )}
      </nav>
    </div>
  )
}
