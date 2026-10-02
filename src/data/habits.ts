/**
 * Conteúdo educativo por pergunta (ids do questionário da API, versão 1).
 * `strength` descreve o hábito positivo; `tip` sugere uma mudança prática.
 * As dicas são orientações gerais de boas práticas, sem estimativas numéricas de economia.
 */
export interface HabitContent {
  strength: string
  tip: string
}

export const habits: Record<number, HabitContent> = {
  1: {
    strength: 'Banhos curtos',
    tip: 'Desligue o chuveiro enquanto se ensaboa e tente reduzir alguns minutos por banho.',
  },
  2: {
    strength: 'Torneira fechada durante o uso',
    tip: 'Feche a torneira ao escovar os dentes, ensaboar as mãos ou a louça e abra apenas para enxaguar.',
  },
  3: {
    strength: 'Vazamentos resolvidos rapidamente',
    tip: 'Fique atento a torneiras pingando e descargas escorrendo: consertos simples evitam desperdício contínuo.',
  },
  4: {
    strength: 'Reaproveitamento de água',
    tip: 'A água do enxágue da máquina de lavar ou da chuva pode ser usada para limpar o chão ou regar plantas.',
  },
  5: {
    strength: 'Limpeza sem mangueira',
    tip: 'Prefira balde e vassoura para limpar calçadas e veículos, ou use mangueira com esguicho que interrompe o fluxo.',
  },
  6: {
    strength: 'Luzes apagadas ao sair',
    tip: 'Crie o hábito de apagar a luz sempre que sair de um cômodo, mesmo que por pouco tempo.',
  },
  7: {
    strength: 'Iluminação LED',
    tip: 'Ao trocar uma lâmpada queimada, escolha LED: ela consome menos energia e dura mais.',
  },
  8: {
    strength: 'Aparelhos desligados quando não estão em uso',
    tip: 'Desligue da tomada carregadores e aparelhos em espera, ou use um filtro de linha com interruptor.',
  },
  9: {
    strength: 'Climatização consciente',
    tip: 'Ao usar ar-condicionado ou aquecedor, mantenha o ambiente fechado e evite temperaturas extremas.',
  },
  10: {
    strength: 'Atenção à eficiência energética',
    tip: 'Na compra de eletrodomésticos, compare a etiqueta do Inmetro e procure o Selo Procel.',
  },
  11: {
    strength: 'Separação de recicláveis',
    tip: 'Separe papel, plástico, metal e vidro do lixo comum e confira os dias de coleta seletiva na sua cidade.',
  },
  12: {
    strength: 'Descarte correto de eletrônicos',
    tip: 'Pilhas, baterias e eletrônicos não vão no lixo comum: procure pontos de coleta ou a loja/fabricante.',
  },
  13: {
    strength: 'Poucos descartáveis',
    tip: 'Troque copos, talheres e canudos descartáveis por versões reutilizáveis sempre que possível.',
  },
  14: {
    strength: 'Reutilização de materiais',
    tip: 'Potes, embalagens e sacolas podem ganhar uma segunda utilidade antes de irem para a reciclagem.',
  },
  15: {
    strength: 'Pouco desperdício de alimentos',
    tip: 'Planeje as compras, confira a validade dos alimentos e aproveite as sobras em novas refeições.',
  },
  16: {
    strength: 'Mobilidade sustentável',
    tip: 'Quando possível, troque trajetos curtos de carro por caminhada, bicicleta, transporte público ou carona.',
  },
  17: {
    strength: 'Consumo consciente',
    tip: 'Antes de comprar, pergunte-se se realmente precisa ou se é possível consertar, pegar emprestado ou comprar usado.',
  },
  18: {
    strength: 'Itens reutilizáveis no dia a dia',
    tip: 'Deixe uma garrafa e uma sacola reutilizáveis sempre à mão, na mochila ou no carro.',
  },
  19: {
    strength: 'Interesse pelo impacto do consumo',
    tip: 'Busque informações sobre a origem e o descarte dos produtos que você usa com frequência.',
  },
  20: {
    strength: 'Cuidado com espaços naturais',
    tip: 'Em parques, praias e trilhas, leve um saquinho para recolher seu lixo e respeite as áreas preservadas.',
  },
}
