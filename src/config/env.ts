/**
 * Único ponto de leitura das variáveis de ambiente do front-end.
 * O Vite embute os valores no build: alterar uma variável exige novo deploy.
 */
const apiUrl = import.meta.env.VITE_API_URL?.trim().replace(/\/+$/, '') ?? ''

if (!apiUrl && import.meta.env.DEV) {
  console.warn('[EcoCheck] VITE_API_URL não definida. Copie .env.example para .env e configure a URL da API.')
}

export const env = {
  /** URL base da API, sem barra final. Vazia quando não configurada. */
  apiUrl,
} as const
