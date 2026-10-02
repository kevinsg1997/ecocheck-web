import { QuizFlow } from '../components/quiz/QuizFlow'
import { Alert } from '../components/ui/Alert'
import { Button } from '../components/ui/Button'
import { Container } from '../components/ui/Container'
import { useDocumentTitle } from '../hooks/useDocumentTitle'
import { useQuestionnaire } from '../hooks/useQuestionnaire'

export function QuizPage() {
  useDocumentTitle('Questionário')
  const { state, reload } = useQuestionnaire()

  return (
    <Container size="narrow" className="py-8 sm:py-12">
      <h1 className="sr-only">Questionário EcoCheck</h1>

      {state.status === 'loading' && <QuizSkeleton />}

      {state.status === 'error' && (
        <Alert
          tone="error"
          title="Não foi possível carregar o questionário"
          action={
            <Button variant="secondary" onClick={reload}>
              Tentar novamente
            </Button>
          }
        >
          {state.error.message}
        </Alert>
      )}

      {state.status === 'success' && (
        <QuizFlow key={state.questionnaire.version} questionnaire={state.questionnaire} onReload={reload} />
      )}
    </Container>
  )
}

function QuizSkeleton() {
  return (
    <div aria-busy="true" aria-label="Carregando o questionário" className="animate-pulse motion-reduce:animate-none">
      <div className="h-4 w-32 rounded bg-line" />
      <div className="mt-3 h-2 rounded-full bg-line" />
      <div className="mt-6 rounded-3xl bg-surface p-5 ring-1 ring-line sm:p-8">
        <div className="h-5 w-24 rounded bg-line" />
        <div className="mt-5 h-6 w-4/5 rounded bg-line" />
        <div className="mt-2 h-6 w-3/5 rounded bg-line" />
        <div className="mt-7 grid gap-2.5">
          {Array.from({ length: 5 }, (_, index) => (
            <div key={index} className="h-14 rounded-2xl bg-canvas ring-1 ring-line" />
          ))}
        </div>
      </div>
    </div>
  )
}
