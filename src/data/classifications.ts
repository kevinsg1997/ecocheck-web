import type { Classification } from '../types/api'

export interface ClassificationInfo {
  name: string
  range: string
  description: string
}

/** Faixas educativas definidas pela API: [0–20], (20–40], (40–60], (60–80], (80–100]. */
export const classifications: Record<Classification, ClassificationInfo> = {
  starting: {
    name: 'Começando a jornada',
    range: '0–20%',
    description: 'Todo hábito começa com um primeiro passo. Pequenas mudanças já fazem diferença.',
  },
  first_steps: {
    name: 'Primeiros passos',
    range: '21–40%',
    description: 'Você já tem algumas práticas sustentáveis e muito espaço para evoluir.',
  },
  on_track: {
    name: 'No caminho',
    range: '41–60%',
    description: 'Boa parte da sua rotina já considera o meio ambiente. Siga avançando.',
  },
  good_habits: {
    name: 'Bons hábitos',
    range: '61–80%',
    description: 'Você mantém hábitos sustentáveis na maior parte do tempo. Parabéns!',
  },
  inspiring: {
    name: 'Hábitos inspiradores',
    range: '81–100%',
    description: 'Seus hábitos são uma ótima referência. Que tal compartilhar com outras pessoas?',
  },
}
