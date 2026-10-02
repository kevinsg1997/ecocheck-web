import { useCallback, useEffect, useState } from 'react'

import { ApiError } from '../services/apiClient'
import { getStatistics } from '../services/surveyService'
import type { StatisticsDto, StatisticsFilter } from '../types/api'

type State =
  | { status: 'loading'; previous?: StatisticsDto }
  | { status: 'error'; error: ApiError }
  | { status: 'success'; statistics: StatisticsDto }

/**
 * Busca as estatísticas e refaz a busca quando o filtro muda. Durante a troca de filtro,
 * mantém os dados anteriores em `previous` para a tela não "piscar".
 */
export function useStatistics(filter: StatisticsFilter) {
  const [state, setState] = useState<State>({ status: 'loading' })
  const [attempt, setAttempt] = useState(0)
  const { countryCode, stateCode } = filter

  useEffect(() => {
    const controller = new AbortController()

    getStatistics({ countryCode, stateCode }, controller.signal)
      .then((statistics) => setState({ status: 'success', statistics }))
      .catch((error: unknown) => {
        if (controller.signal.aborted) return
        setState({
          status: 'error',
          error: error instanceof ApiError ? error : new ApiError('server', 'Não foi possível carregar as estatísticas.'),
        })
      })

    return () => controller.abort()
  }, [countryCode, stateCode, attempt])

  const reload = useCallback(() => {
    setState((current) => ({
      status: 'loading',
      previous: current.status === 'success' ? current.statistics : undefined,
    }))
    setAttempt((value) => value + 1)
  }, [])

  // Os dados exibidos ainda são de outro filtro enquanto a nova busca não termina.
  const isRefreshing =
    state.status === 'loading' ||
    (state.status === 'success' &&
      ((state.statistics.filter.countryCode ?? undefined) !== countryCode ||
        (state.statistics.filter.stateCode ?? undefined) !== (countryCode ? stateCode : undefined)))

  return { state, reload, isRefreshing }
}
