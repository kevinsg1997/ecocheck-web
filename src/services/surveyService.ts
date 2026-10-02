import type {
  QuestionnaireDto,
  StatisticsDto,
  StatisticsFilter,
  SubmitResponseRequest,
  SurveyResultDto,
} from '../types/api'
import { apiRequest } from './apiClient'

export function getQuestionnaire(signal?: AbortSignal): Promise<QuestionnaireDto> {
  return apiRequest<QuestionnaireDto>('/api/questionnaire', { signal })
}

export function submitResponse(request: SubmitResponseRequest): Promise<SurveyResultDto> {
  return apiRequest<SurveyResultDto>('/api/responses', { method: 'POST', body: request })
}

/** Estatísticas agregadas, opcionalmente filtradas por país e (para o Brasil) estado. */
export function getStatistics(filter: StatisticsFilter = {}, signal?: AbortSignal): Promise<StatisticsDto> {
  const params = new URLSearchParams()
  if (filter.countryCode) params.set('country', filter.countryCode)
  if (filter.countryCode && filter.stateCode) params.set('state', filter.stateCode)

  const query = params.size > 0 ? `?${params}` : ''
  return apiRequest<StatisticsDto>(`/api/statistics${query}`, { signal })
}
