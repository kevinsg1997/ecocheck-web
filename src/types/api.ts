/** Tipos que espelham os contratos da API (enums serializados em snake_case). */
export type Category = 'water' | 'energy' | 'waste' | 'consumption_and_mobility'

export type Classification = 'starting' | 'first_steps' | 'on_track' | 'good_habits' | 'inspiring'

// GET /api/questionnaire

export interface OptionDto {
  id: number
  text: string
  isNotApplicable: boolean
}

export interface QuestionDto {
  id: number
  category: Category
  text: string
  order: number
  options: OptionDto[]
}

export interface QuestionnaireDto {
  version: number
  questions: QuestionDto[]
}

// POST /api/responses

export interface AnswerRequest {
  questionId: number
  optionId: number
}

export interface SubmitResponseRequest {
  questionnaireVersion: number
  answers: AnswerRequest[]
  countryCode?: string
  stateCode?: string
}

export interface CategoryResultDto {
  category: Category
  score: number
  maxScore: number
  percentage: number
}

export interface SurveyResultDto {
  totalScore: number
  maxScore: number
  percentage: number
  classification: Classification
  categories: CategoryResultDto[]
  strengthQuestionIds: number[]
  improvementQuestionIds: number[]
}

// GET /api/statistics?country=BR&state=SP

export interface StatisticsFilter {
  countryCode?: string
  stateCode?: string
}

export interface CategoryAverageDto {
  category: Category
  averagePercentage: number
}

export interface ClassificationCountDto {
  classification: Classification
  count: number
  percentage: number
}

export interface OptionStatisticsDto {
  optionId: number
  text: string
  isNotApplicable: boolean
  count: number
  percentage: number
}

export interface QuestionStatisticsDto {
  questionId: number
  category: Category
  text: string
  totalAnswers: number
  averagePercentage: number | null
  options: OptionStatisticsDto[]
}

export interface HabitHighlightDto {
  questionId: number
  category: Category
  text: string
  averagePercentage: number
}

export interface RegionGroupDto {
  code: string
  participants: number
  averagePercentage: number
}

export interface RegionStatisticsDto {
  participantsWithRegion: number
  countries: RegionGroupDto[]
  brazilStates: RegionGroupDto[]
}

export interface StatisticsDto {
  filter: { countryCode: string | null; stateCode: string | null }
  /** Falso quando a região filtrada tem menos participantes que o mínimo: nada é exibido. */
  summaryAvailable: boolean
  totalParticipants: number
  averagePercentage: number | null
  categories: CategoryAverageDto[]
  classifications: ClassificationCountDto[]
  detailsAvailable: boolean
  minimumParticipantsForDetails: number
  questions: QuestionStatisticsDto[]
  topHabits: HabitHighlightDto[]
  improvementOpportunities: HabitHighlightDto[]
  regions: RegionStatisticsDto
  generatedAt: string
}

/** Corpo de erro no formato ProblemDetails / ValidationProblemDetails. */
export interface ProblemDetails {
  title?: string
  status?: number
  errors?: Record<string, string[]>
}
