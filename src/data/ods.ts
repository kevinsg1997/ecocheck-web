export interface OdsInfo {
  number: number
  name: string
  /** Texto oficial do objetivo, conforme a página da ONU Brasil. */
  goal: string
  /** Cor oficial do ODS (guia de identidade visual da ONU). */
  color: string
  /** Como o EcoCheck se relaciona com o objetivo. */
  relation: string
  url: string
}

export const ODS_SOURCE_URL = 'https://brasil.un.org/pt-br/sdgs'

const sourceUrl = (n: number) => `${ODS_SOURCE_URL}/${n}`

export const odsList: OdsInfo[] = [
  {
    number: 3,
    name: 'Saúde e Bem-Estar',
    goal: 'Garantir o acesso à saúde de qualidade e promover o bem-estar para todos, em todas as idades.',
    color: '#4C9F38',
    relation: 'Mobilidade ativa e ambientes preservados também fazem parte do bem-estar.',
    url: sourceUrl(3),
  },
  {
    number: 4,
    name: 'Educação de Qualidade',
    goal: 'Garantir o acesso à educação inclusiva, de qualidade e equitativa, e promover oportunidades de aprendizagem ao longo da vida para todos.',
    color: '#C5192D',
    relation: 'O EcoCheck é uma ferramenta de educação ambiental aberta a qualquer pessoa.',
    url: sourceUrl(4),
  },
  {
    number: 6,
    name: 'Água Potável e Saneamento',
    goal: 'Garantir a disponibilidade e a gestão sustentável da água potável e do saneamento para todos.',
    color: '#26BDE2',
    relation: 'Perguntas sobre consumo, desperdício e reaproveitamento de água.',
    url: sourceUrl(6),
  },
  {
    number: 7,
    name: 'Energia Limpa e Acessível',
    goal: 'Garantir o acesso a fontes de energia fiáveis, sustentáveis e modernas para todos.',
    color: '#FCC30B',
    relation: 'Perguntas sobre uso eficiente de energia no dia a dia.',
    url: sourceUrl(7),
  },
  {
    number: 12,
    name: 'Consumo e Produção Responsáveis',
    goal: 'Garantir padrões de consumo e de produção sustentáveis.',
    color: '#BF8B2E',
    relation: 'Perguntas sobre reciclagem, reutilização, descartáveis e consumo consciente.',
    url: sourceUrl(12),
  },
  {
    number: 13,
    name: 'Ação Contra a Mudança Global do Clima',
    goal: 'Adotar medidas urgentes para combater as alterações climáticas e os seus impactos.',
    color: '#3F7E44',
    relation: 'Hábitos de energia e transporte se relacionam com as emissões do dia a dia.',
    url: sourceUrl(13),
  },
  {
    number: 14,
    name: 'Vida na Água',
    goal: 'Conservar e usar de forma sustentável os oceanos, mares e os recursos marinhos para o desenvolvimento sustentável.',
    color: '#0A97D9',
    relation: 'O descarte correto de resíduos ajuda a proteger rios e oceanos.',
    url: sourceUrl(14),
  },
  {
    number: 15,
    name: 'Vida Terrestre',
    goal: 'Proteger, restaurar e promover o uso sustentável dos ecossistemas terrestres, gerir de forma sustentável as florestas, combater a desertificação, travar e reverter a degradação dos solos e travar a perda da biodiversidade.',
    color: '#56C02B',
    relation: 'Perguntas sobre descarte de resíduos e cuidado em parques, trilhas e áreas naturais.',
    url: sourceUrl(15),
  },
]

export const odsByNumber = new Map(odsList.map((ods) => [ods.number, ods]))
