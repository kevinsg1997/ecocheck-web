/** "1 participante", "17 participantes" (número formatado em pt-BR). */
export function formatParticipants(count: number): string {
  return `${count.toLocaleString('pt-BR')} ${count === 1 ? 'participante' : 'participantes'}`
}
