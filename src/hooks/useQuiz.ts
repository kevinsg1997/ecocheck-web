import { useEffect, useReducer } from 'react'

import { BRAZIL } from '../data/regions'
import { localStore, type QuizProgress } from '../services/localStore'
import type { QuestionnaireDto } from '../types/api'

type Action =
  | { type: 'answer'; questionId: number; optionId: number }
  | { type: 'goToQuestion'; index: number }
  | { type: 'next' }
  | { type: 'back' }
  | { type: 'setCountry'; countryCode: string }
  | { type: 'setState'; stateCode: string }
  | { type: 'goToReview' }
  | { type: 'reset' }

function createInitialState(questionnaire: QuestionnaireDto): QuizProgress {
  const empty: QuizProgress = {
    version: questionnaire.version,
    answers: {},
    currentIndex: 0,
    stage: 'questions',
    countryCode: '',
    stateCode: '',
  }

  const stored = localStore.loadProgress()
  if (!stored || stored.version !== questionnaire.version) {
    return empty
  }

  // Descarta respostas que não correspondem mais ao questionário atual.
  const validAnswers: Record<number, number> = {}
  for (const question of questionnaire.questions) {
    const optionId = stored.answers?.[question.id]
    if (question.options.some((option) => option.id === optionId)) {
      validAnswers[question.id] = optionId
    }
  }

  return {
    ...empty,
    answers: validAnswers,
    currentIndex: Math.min(Math.max(stored.currentIndex ?? 0, 0), questionnaire.questions.length - 1),
    stage: stored.stage ?? 'questions',
    countryCode: stored.countryCode ?? '',
    stateCode: stored.countryCode === BRAZIL ? (stored.stateCode ?? '') : '',
  }
}

function createReducer(totalQuestions: number) {
  return function reducer(state: QuizProgress, action: Action): QuizProgress {
    switch (action.type) {
      case 'answer':
        return { ...state, answers: { ...state.answers, [action.questionId]: action.optionId } }
      case 'goToQuestion':
        return { ...state, stage: 'questions', currentIndex: action.index }
      case 'next':
        if (state.stage === 'questions') {
          return state.currentIndex < totalQuestions - 1
            ? { ...state, currentIndex: state.currentIndex + 1 }
            : { ...state, stage: 'region' }
        }
        return state.stage === 'region' ? { ...state, stage: 'review' } : state
      case 'back':
        if (state.stage === 'review') return { ...state, stage: 'region' }
        if (state.stage === 'region') return { ...state, stage: 'questions', currentIndex: totalQuestions - 1 }
        return { ...state, currentIndex: Math.max(state.currentIndex - 1, 0) }
      case 'setCountry':
        return { ...state, countryCode: action.countryCode, stateCode: action.countryCode === BRAZIL ? state.stateCode : '' }
      case 'setState':
        return { ...state, stateCode: action.stateCode }
      case 'goToReview':
        return { ...state, stage: 'review' }
      case 'reset':
        return { ...state, answers: {}, currentIndex: 0, stage: 'questions', countryCode: '', stateCode: '' }
    }
  }
}

/** Estado do questionário, mantido no sessionStorage para sobreviver a recarregamentos. */
export function useQuiz(questionnaire: QuestionnaireDto) {
  const [state, dispatch] = useReducer(
    createReducer(questionnaire.questions.length),
    questionnaire,
    createInitialState,
  )

  useEffect(() => {
    localStore.saveProgress(state)
  }, [state])

  const unansweredIndex = questionnaire.questions.findIndex((question) => state.answers[question.id] === undefined)

  return {
    state,
    dispatch,
    answeredCount: Object.keys(state.answers).length,
    isComplete: unansweredIndex === -1,
    firstUnansweredIndex: unansweredIndex,
  }
}
