import { useEffect } from 'react'
import { useLocation } from 'react-router'

const BASE_TITLE = 'EcoCheck'

/**
 * Define o título da aba e mantém o link canônico apontando para a página atual
 * (o index.html é o mesmo para todas as rotas do SPA). Sem argumento, usa o título padrão.
 */
export function useDocumentTitle(title?: string) {
  const { pathname } = useLocation()

  useEffect(() => {
    document.title = title ? `${title} · ${BASE_TITLE}` : `${BASE_TITLE} — Reflita sobre seus hábitos sustentáveis`
  }, [title])

  useEffect(() => {
    const canonical = document.querySelector<HTMLLinkElement>('link[rel="canonical"]')
    if (canonical) {
      canonical.href = `${window.location.origin}${pathname}`
    }
  }, [pathname])
}
