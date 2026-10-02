import type { Category, SurveyResultDto } from '../types/api'
import { readJson, removeItem, writeJson } from '../utils/storage'

/**
 * Dados guardados apenas no navegador da pessoa. Nada aqui é enviado para a API
 * além das próprias respostas no momento do envio.
 */
const KEYS = {
  quizProgress: 'ecocheck:quiz-progress',
  result: 'ecocheck:result',
  participated: 'ecocheck:participated',
} as const

export interface QuizProgress {
  version: number
  answers: Record<number, number>
  currentIndex: number
  stage: 'questions' | 'region' | 'review'
  countryCode: string
  stateCode: string
}

/** Dados mínimos das perguntas, para exibir pontos fortes e dicas no resultado. */
export interface StoredQuestion {
  id: number
  category: Category
  text: string
}

export interface StoredResult {
  result: SurveyResultDto
  questions: StoredQuestion[]
  submittedAt: string
}

export const localStore = {
  loadProgress: () => readJson<QuizProgress>('session', KEYS.quizProgress),
  saveProgress: (progress: QuizProgress) => writeJson('session', KEYS.quizProgress, progress),
  clearProgress: () => removeItem('session', KEYS.quizProgress),

  loadResult: () => readJson<StoredResult>('session', KEYS.result),
  saveResult: (result: SurveyResultDto, questions: StoredQuestion[]) =>
    writeJson('session', KEYS.result, {
      result,
      questions,
      submittedAt: new Date().toISOString(),
    } satisfies StoredResult),

  /** Marca local (sem identificação) usada só para avisar que este navegador já participou. */
  hasParticipated: () => readJson<string>('local', KEYS.participated) !== null,
  markParticipated: () => writeJson('local', KEYS.participated, new Date().toISOString()),
}
