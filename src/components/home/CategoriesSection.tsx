import { categoryList } from '../../data/categories'
import { odsByNumber } from '../../data/ods'
import { Container } from '../ui/Container'
import { SectionHeading } from '../ui/SectionHeading'

export function CategoriesSection() {
  return (
    <section aria-labelledby="categorias-title" className="border-y border-line bg-surface py-16 sm:py-20">
      <Container>
        <SectionHeading
          id="categorias-title"
          eyebrow="O que é avaliado"
          title="Quatro áreas do cotidiano"
          description="Cada categoria reúne cinco perguntas sobre hábitos simples, que fazem parte da rotina de muita gente."
        />

        <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {categoryList.map((category) => {
            const Icon = category.icon
            return (
              <li key={category.id} className="flex flex-col rounded-2xl bg-canvas p-6 ring-1 ring-line">
                <span className={`flex size-11 items-center justify-center rounded-xl ${category.classes.iconBox}`}>
                  <Icon className="size-5" aria-hidden="true" />
                </span>
                <h3 className="mt-5 text-lg font-bold">{category.name}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{category.description}</p>
                <ul className="mt-5 flex flex-wrap gap-1.5" aria-label="ODS relacionados">
                  {category.ods.map((number) => (
                    <li
                      key={number}
                      title={odsByNumber.get(number)?.name}
                      className="rounded-md bg-surface px-2 py-0.5 text-xs font-semibold text-ink-soft ring-1 ring-line"
                    >
                      ODS {number}
                    </li>
                  ))}
                </ul>
              </li>
            )
          })}
        </ul>
      </Container>
    </section>
  )
}
