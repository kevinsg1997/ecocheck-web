import { useCallback, useEffect, useState } from 'react'

import { ApiError } from '../services/apiClient'
import { getQuestionnaire } from '../services/surveyService'
import type { QuestionnaireDto } from '../types/api'

type State =
  | { status: 'loading' }
  | { status: 'error'; error: ApiError }
  | { status: 'success'; questionnaire: QuestionnaireDto }

export function useQuestionnaire() {
  const [state, setState] = useState<State>({ status: 'loading' })
  const [attempt, setAttempt] = useState(0)

  useEffect(() => {
    const controller = new AbortController()

    getQuestionnaire(controller.signal)
      .then((questionnaire) => setState({ status: 'success', questionnaire }))
      .catch((error: unknown) => {
        if (controller.signal.aborted) return
        setState({
          status: 'error',
          error: error instanceof ApiError ? error : new ApiError('server', 'Não foi possível carregar o questionário.'),
        })
      })

    return () => controller.abort()
  }, [attempt])

  const reload = useCallback(() => {
    setState({ status: 'loading' })
    setAttempt((value) => value + 1)
  }, [])

  return { state, reload }
}
