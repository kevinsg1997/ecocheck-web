interface QuizProgressProps {
  /** Rótulo da etapa atual, ex.: "Pergunta 4 de 20". */
  label: string
  /** Progresso entre 0 e 1. */
  value: number
}

export function QuizProgress({ label, value }: QuizProgressProps) {
  const percent = Math.round(Math.min(Math.max(value, 0), 1) * 100)

  return (
    <div>
      <div className="flex items-center justify-between text-sm">
        <span className="font-medium text-ink-soft" aria-live="polite">
          {label}
        </span>
        <span className="text-muted tabular-nums">{percent}%</span>
      </div>
      <div
        role="progressbar"
        aria-label="Progresso do questionário"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={percent}
        className="mt-2 h-2 overflow-hidden rounded-full bg-line"
      >
        <div
          className="h-full rounded-full bg-brand-500 transition-[width] duration-300 ease-out motion-reduce:transition-none"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  )
}
