import { categories, type CategoryInfo } from '../data/categories'
import { habits } from '../data/habits'
import type { StoredQuestion } from '../services/localStore'
import type { CategoryResultDto, SurveyResultDto } from '../types/api'

export interface HabitInsight {
  questionId: number
  category: CategoryInfo
  title: string
  tip: string
}

const MAX_ITEMS = 4

/** Diferença (em pontos percentuais) abaixo da qual as categorias são consideradas equilibradas. */
const BALANCED_RANGE = 10

/** Mensagem educativa a partir do melhor e do pior desempenho por categoria. */
export function buildEducationalMessage(categoryResults: CategoryResultDto[]): string {
  if (categoryResults.length === 0) {
    return 'Obrigado por participar! Cada reflexão sobre a rotina já é um passo importante.'
  }

  const sorted = [...categoryResults].sort((a, b) => b.percentage - a.percentage)
  const best = sorted[0]
  const worst = sorted[sorted.length - 1]
  const bestTopic = categories[best.category].topic
  const worstTopic = categories[worst.category].topic

  if (worst.percentage >= 80) {
    return 'Você mantém bons hábitos em todas as categorias. Que tal inspirar amigos e familiares a fazer o EcoCheck também?'
  }

  if (best.percentage - worst.percentage < BALANCED_RANGE) {
    return `Seus resultados estão equilibrados entre as categorias. Pequenas mudanças em ${worstTopic} podem ajudar você a avançar ainda mais.`
  }

  if (best.percentage < 50) {
    return `Seu melhor resultado foi em ${bestTopic}. Um bom começo é escolher uma ou duas dicas sobre ${worstTopic} para colocar em prática nesta semana.`
  }

  return `Você teve um bom desempenho em ${bestTopic}, mas ainda existem oportunidades de melhoria em ${worstTopic}.`
}

function toInsight(questionId: number, questions: Map<number, StoredQuestion>): HabitInsight | null {
  const question = questions.get(questionId)
  const content = habits[questionId]
  if (!question || !content) return null

  return {
    questionId,
    category: categories[question.category],
    title: content.strength,
    tip: content.tip,
  }
}

export function getStrengths(result: SurveyResultDto, questions: StoredQuestion[]): HabitInsight[] {
  const byId = new Map(questions.map((question) => [question.id, question]))
  return result.strengthQuestionIds
    .map((id) => toInsight(id, byId))
    .filter((item): item is HabitInsight => item !== null)
    .slice(0, MAX_ITEMS)
}

/** Já vem ordenado pela API: da menor para a maior pontuação relativa. */
export function getImprovements(result: SurveyResultDto, questions: StoredQuestion[]): HabitInsight[] {
  const byId = new Map(questions.map((question) => [question.id, question]))
  return result.improvementQuestionIds
    .map((id) => toInsight(id, byId))
    .filter((item): item is HabitInsight => item !== null)
    .slice(0, MAX_ITEMS)
}
