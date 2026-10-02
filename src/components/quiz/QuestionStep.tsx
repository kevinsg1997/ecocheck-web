import { Check } from 'lucide-react'
import type { MouseEvent } from 'react'

import { categories } from '../../data/categories'
import type { OptionDto, QuestionDto } from '../../types/api'
import { cn } from '../../utils/cn'

interface QuestionStepProps {
  question: QuestionDto
  selectedOptionId: number | undefined
  /** `viaPointer` indica clique/toque, usado para avançar automaticamente. */
  onSelect: (optionId: number, viaPointer: boolean) => void
}

export function QuestionStep({ question, selectedOptionId, onSelect }: QuestionStepProps) {
  const category = categories[question.category]
  const Icon = category.icon
  const regular = question.options.filter((option) => !option.isNotApplicable)
  const notApplicable = question.options.filter((option) => option.isNotApplicable)
  const groupName = `question-${question.id}`

  const renderOption = (option: OptionDto) => (
    <OptionCard
      key={option.id}
      option={option}
      name={groupName}
      checked={selectedOptionId === option.id}
      onSelect={onSelect}
    />
  )

  return (
    <fieldset>
      <legend className="w-full">
        <span className={cn('inline-flex items-center gap-2 text-sm font-semibold', category.classes.text)}>
          <span className={cn('flex size-7 items-center justify-center rounded-lg', category.classes.iconBox)}>
            <Icon className="size-4" aria-hidden="true" />
          </span>
          {category.name}
          <span className="sr-only">:</span>
        </span>
        <span className="mt-4 block font-display text-xl leading-snug font-bold tracking-tight text-balance sm:text-2xl">
          {question.text}
        </span>
      </legend>

      <div className="mt-6 grid gap-2.5">{regular.map(renderOption)}</div>

      {notApplicable.length > 0 && (
        <div className="mt-4 border-t border-dashed border-line-strong pt-4">
          <div className="grid gap-2.5">{notApplicable.map(renderOption)}</div>
        </div>
      )}
    </fieldset>
  )
}

interface OptionCardProps {
  option: OptionDto
  name: string
  checked: boolean
  onSelect: (optionId: number, viaPointer: boolean) => void
}

function OptionCard({ option, name, checked, onSelect }: OptionCardProps) {
  // Setas do teclado também disparam "click" em radios, mas com detail = 0.
  const handleClick = (event: MouseEvent<HTMLInputElement>) => onSelect(option.id, event.detail > 0)

  return (
    <label
      className={cn(
        'group flex min-h-14 cursor-pointer items-center gap-3 rounded-2xl px-4 py-3 ring-1 transition-colors',
        'has-focus-visible:outline-2 has-focus-visible:outline-offset-2 has-focus-visible:outline-brand-600',
        option.isNotApplicable
          ? 'border border-dashed border-line-strong bg-transparent text-ink-soft ring-transparent hover:bg-surface'
          : 'bg-surface ring-line hover:ring-brand-300',
        checked && 'bg-brand-50 text-ink ring-2 ring-brand-500 hover:ring-brand-500',
      )}
    >
      <input
        type="radio"
        name={name}
        value={option.id}
        checked={checked}
        onChange={() => undefined}
        onClick={handleClick}
        className="sr-only"
      />
      <span
        aria-hidden="true"
        className={cn(
          'flex size-5 shrink-0 items-center justify-center rounded-full ring-1 transition-colors',
          checked ? 'bg-brand-600 ring-brand-600' : 'bg-surface ring-line-strong group-hover:ring-brand-400',
        )}
      >
        {checked && <Check className="size-3.5 text-white" strokeWidth={3} />}
      </span>
      <span className={cn('text-base', checked && 'font-semibold')}>{option.text}</span>
    </label>
  )
}
