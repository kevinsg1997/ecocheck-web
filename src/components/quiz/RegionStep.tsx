import { MapPin } from 'lucide-react'

import { BRAZIL, BRAZIL_STATES, countryOptions } from '../../data/regions'

interface RegionStepProps {
  countryCode: string
  stateCode: string
  onCountryChange: (countryCode: string) => void
  onStateChange: (stateCode: string) => void
}

const selectClasses =
  'mt-1.5 block h-12 w-full rounded-xl bg-surface px-3 text-base text-ink ring-1 ring-line-strong focus:ring-2 focus:ring-brand-500 focus:outline-none'

export function RegionStep({ countryCode, stateCode, onCountryChange, onStateChange }: RegionStepProps) {
  return (
    <div>
      <p className="inline-flex items-center gap-2 text-sm font-semibold text-brand-700">
        <span className="flex size-7 items-center justify-center rounded-lg bg-brand-50 text-brand-600">
          <MapPin className="size-4" aria-hidden="true" />
        </span>
        Opcional
      </p>
      <h2 className="mt-4 text-xl leading-snug font-bold tracking-tight sm:text-2xl">De onde você está respondendo?</h2>
      <p className="mt-2 leading-relaxed text-muted">
        Esta informação ajuda a comparar hábitos entre regiões. Ela não entra na sua pontuação, e pedimos apenas país e
        estado, nunca cidade ou endereço.
      </p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="text-sm font-medium text-ink-soft">País</span>
          <select
            value={countryCode}
            onChange={(event) => onCountryChange(event.target.value)}
            className={selectClasses}
            autoComplete="off"
          >
            <option value="">Prefiro não informar</option>
            {countryOptions.map((country) => (
              <option key={country.code} value={country.code}>
                {country.name}
              </option>
            ))}
          </select>
        </label>

        {countryCode === BRAZIL && (
          <label className="block">
            <span className="text-sm font-medium text-ink-soft">Estado</span>
            <select
              value={stateCode}
              onChange={(event) => onStateChange(event.target.value)}
              className={selectClasses}
              autoComplete="off"
            >
              <option value="">Prefiro não informar</option>
              {BRAZIL_STATES.map((state) => (
                <option key={state.code} value={state.code}>
                  {state.name}
                </option>
              ))}
            </select>
          </label>
        )}
      </div>

      <p className="mt-4 text-sm text-muted">
        Regiões com menos de 5 participantes não aparecem nas estatísticas públicas.
      </p>
    </div>
  )
}
