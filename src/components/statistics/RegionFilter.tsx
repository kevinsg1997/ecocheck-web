import { MapPin, X } from 'lucide-react'

import { BRAZIL, countryName, stateName } from '../../data/regions'
import type { RegionStatisticsDto } from '../../types/api'

interface RegionFilterProps {
  /** Regiões disponíveis (somente as com o mínimo de participantes), vindas da consulta sem filtro. */
  regions: RegionStatisticsDto | null
  countryCode: string
  stateCode: string
  minimumParticipants: number
  onChange: (countryCode: string, stateCode: string) => void
}

const selectClasses =
  'h-11 w-full rounded-xl bg-surface px-3 text-sm text-ink ring-1 ring-line-strong focus:ring-2 focus:ring-brand-500 focus:outline-none disabled:cursor-not-allowed disabled:opacity-60'

export function RegionFilter({ regions, countryCode, stateCode, minimumParticipants, onChange }: RegionFilterProps) {
  const countries = regions?.countries ?? []
  const states = regions?.brazilStates ?? []
  const hasOptions = countries.length > 0
  const showStates = countryCode === BRAZIL && states.length > 0

  // Mantém selecionável um filtro vindo da URL mesmo que a região não esteja na lista.
  const countryInList = !countryCode || countries.some((country) => country.code === countryCode)
  const stateInList = !stateCode || states.some((state) => state.code === stateCode)

  return (
    <div className="rounded-2xl bg-surface p-4 ring-1 ring-line">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end">
        <p className="flex items-center gap-2 text-sm font-semibold sm:mb-2.5 sm:w-28 sm:shrink-0">
          <MapPin className="size-4 text-brand-600" aria-hidden="true" />
          Filtrar região
        </p>

        <label className="block flex-1">
          <span className="text-xs font-medium text-muted">País</span>
          <select
            className={`mt-1 ${selectClasses}`}
            value={countryCode}
            disabled={!hasOptions && !countryCode}
            onChange={(event) => onChange(event.target.value, '')}
          >
            <option value="">Todos os participantes</option>
            {!countryInList && <option value={countryCode}>{countryName(countryCode)}</option>}
            {countries.map((country) => (
              <option key={country.code} value={country.code}>
                {countryName(country.code)} ({country.participants})
              </option>
            ))}
          </select>
        </label>

        {(showStates || (countryCode === BRAZIL && stateCode)) && (
          <label className="block flex-1">
            <span className="text-xs font-medium text-muted">Estado</span>
            <select
              className={`mt-1 ${selectClasses}`}
              value={stateCode}
              onChange={(event) => onChange(countryCode, event.target.value)}
            >
              <option value="">Todos os estados</option>
              {!stateInList && <option value={stateCode}>{stateName(stateCode)}</option>}
              {states.map((state) => (
                <option key={state.code} value={state.code}>
                  {stateName(state.code)} ({state.participants})
                </option>
              ))}
            </select>
          </label>
        )}

        {countryCode && (
          <button
            type="button"
            onClick={() => onChange('', '')}
            className="inline-flex h-11 items-center justify-center gap-1.5 rounded-xl px-3 text-sm font-medium text-ink-soft hover:bg-ink/5 hover:text-ink"
          >
            <X className="size-4" aria-hidden="true" />
            Limpar
          </button>
        )}
      </div>

      <p className="mt-3 text-xs leading-relaxed text-muted">
        {hasOptions
          ? `Aparecem apenas regiões com pelo menos ${minimumParticipants} participantes, para proteger o anonimato.`
          : `O filtro fica disponível quando um país ou estado reunir pelo menos ${minimumParticipants} participantes.`}
      </p>
    </div>
  )
}
