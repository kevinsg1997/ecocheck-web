import { Table2 } from 'lucide-react'
import type { ReactNode } from 'react'

import { cn } from '../../utils/cn'

export interface LegendItem {
  label: string
  color: string
}

interface ChartCardProps {
  title: string
  description?: ReactNode
  legend?: LegendItem[]
  /** Versão em tabela do gráfico (acessibilidade e leitura precisa). */
  table?: { columns: string[]; rows: Array<Array<string | number>> }
  children: ReactNode
  className?: string
}

export function ChartCard({ title, description, legend, table, children, className }: ChartCardProps) {
  return (
    <figure className={cn('rounded-3xl bg-surface p-5 shadow-card ring-1 ring-line sm:p-6', className)}>
      <figcaption>
        <h3 className="text-base font-bold">{title}</h3>
        {description && <p className="mt-1 text-sm leading-relaxed text-muted">{description}</p>}
      </figcaption>

      {legend && legend.length > 1 && (
        <ul className="mt-4 flex flex-wrap gap-x-4 gap-y-1.5 text-sm text-ink-soft" aria-label="Legenda">
          {legend.map((item) => (
            <li key={item.label} className="flex items-center gap-2">
              <span className="size-2.5 rounded-sm" style={{ backgroundColor: item.color }} aria-hidden="true" />
              {item.label}
            </li>
          ))}
        </ul>
      )}

      <div className="mt-4">{children}</div>

      {table && (
        <details className="group mt-3 text-sm">
          <summary className="inline-flex cursor-pointer list-none items-center gap-1.5 font-medium text-muted hover:text-ink [&::-webkit-details-marker]:hidden">
            <Table2 className="size-4" aria-hidden="true" />
            <span className="group-open:hidden">Ver dados em tabela</span>
            <span className="hidden group-open:inline">Ocultar tabela</span>
          </summary>
          <div className="mt-3 overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-line text-muted">
                  {table.columns.map((column, index) => (
                    <th key={column} scope="col" className={cn('py-2 font-medium', index > 0 && 'text-right')}>
                      {column}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {table.rows.map((row) => (
                  <tr key={String(row[0])} className="border-b border-line/60 last:border-0">
                    {row.map((cell, index) => (
                      <td key={index} className={cn('py-2', index > 0 ? 'text-right tabular-nums' : 'text-ink-soft')}>
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </details>
      )}
    </figure>
  )
}
