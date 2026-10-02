import { useState } from 'react'

import { categories, categoryList } from '../../data/categories'
import type { QuestionStatisticsDto } from '../../types/api'
import { ChartCard } from '../charts/ChartCard'
import { HBarChart } from '../charts/HBarChart'

const OPTION_COLOR = '#2f9466'
const NOT_APPLICABLE_COLOR = '#aab3ac'

export function QuestionExplorer({ questions }: { questions: QuestionStatisticsDto[] }) {
  const [selectedId, setSelectedId] = useState(questions[0]?.questionId)
  const question = questions.find((item) => item.questionId === selectedId) ?? questions[0]

  if (!question) return null

  const category = categories[question.category]

  return (
    <ChartCard
      title="Como as pessoas responderam"
      description={`${question.totalAnswers} respostas · categoria ${category.name}`}
      table={{
        columns: ['Alternativa', 'Respostas', '%'],
        rows: question.options.map((option) => [option.text, option.count, `${Math.round(option.percentage)}%`]),
      }}
    >
      <label className="block">
        <span className="sr-only">Escolha uma pergunta</span>
        <select
          value={question.questionId}
          onChange={(event) => setSelectedId(Number(event.target.value))}
          className="h-11 w-full rounded-xl bg-canvas px-3 text-sm font-medium text-ink ring-1 ring-line-strong focus:ring-2 focus:ring-brand-500 focus:outline-none"
        >
          {categoryList.map((item) => (
            <optgroup key={item.id} label={item.name}>
              {questions
                .filter((entry) => entry.category === item.id)
                .map((entry) => (
                  <option key={entry.questionId} value={entry.questionId}>
                    {entry.text}
                  </option>
                ))}
            </optgroup>
          ))}
        </select>
      </label>

      <div className="mt-4">
        <HBarChart
          ariaLabel={`Distribuição das respostas: ${question.text}`}
          labelWidth={136}
          data={question.options.map((option) => ({
            label: option.text,
            value: option.percentage,
            color: option.isNotApplicable ? NOT_APPLICABLE_COLOR : OPTION_COLOR,
          }))}
          series={[{ key: 'value', name: 'Respostas' }]}
        />
      </div>
    </ChartCard>
  )
}
