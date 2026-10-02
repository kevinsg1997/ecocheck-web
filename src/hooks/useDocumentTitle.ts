import { useEffect } from 'react'

const BASE_TITLE = 'EcoCheck'

/** Define o título da aba. Sem argumento, usa o título padrão do site. */
export function useDocumentTitle(title?: string) {
  useEffect(() => {
    document.title = title ? `${title} · ${BASE_TITLE}` : `${BASE_TITLE} — Reflita sobre seus hábitos sustentáveis`
  }, [title])
}
