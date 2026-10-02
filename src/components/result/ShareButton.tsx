import { Check, Share2 } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

import { Button } from '../ui/Button'

interface ShareButtonProps {
  percentage: number
  classificationName: string
}

type Feedback = 'idle' | 'copied' | 'error'

/**
 * Compartilha um texto com o resultado (sem nenhum dado pessoal) e o link do site.
 * Usa a Web Share API quando disponível e, caso contrário, copia o texto.
 */
export function ShareButton({ percentage, classificationName }: ShareButtonProps) {
  const [feedback, setFeedback] = useState<Feedback>('idle')
  const timer = useRef<number | undefined>(undefined)

  useEffect(() => () => window.clearTimeout(timer.current), [])

  const showFeedback = (value: Feedback) => {
    setFeedback(value)
    window.clearTimeout(timer.current)
    timer.current = window.setTimeout(() => setFeedback('idle'), 2500)
  }

  const handleShare = async () => {
    const url = window.location.origin
    const text = `Fiz o EcoCheck e meus hábitos sustentáveis ficaram em ${Math.round(percentage)}% (${classificationName}). Faça você também:`

    if (navigator.share) {
      try {
        await navigator.share({ title: 'EcoCheck', text, url })
        return
      } catch (error) {
        // Cancelado pela pessoa: não é um erro.
        if (error instanceof DOMException && error.name === 'AbortError') return
      }
    }

    try {
      await navigator.clipboard.writeText(`${text} ${url}`)
      showFeedback('copied')
    } catch {
      showFeedback('error')
    }
  }

  return (
    <div className="flex flex-col items-start gap-1.5">
      <Button variant="secondary" onClick={handleShare}>
        {feedback === 'copied' ? (
          <Check className="size-4 text-brand-600" aria-hidden="true" />
        ) : (
          <Share2 className="size-4" aria-hidden="true" />
        )}
        {feedback === 'copied' ? 'Texto copiado' : 'Compartilhar resultado'}
      </Button>
      <span role="status" className="text-xs text-muted">
        {feedback === 'error' && 'Não foi possível copiar. Tente novamente.'}
      </span>
    </div>
  )
}
