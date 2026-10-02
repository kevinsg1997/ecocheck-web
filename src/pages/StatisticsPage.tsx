import { StatisticsSection } from '../components/statistics/StatisticsSection'
import { Container } from '../components/ui/Container'
import { useDocumentTitle } from '../hooks/useDocumentTitle'
import { useStatistics } from '../hooks/useStatistics'

export function StatisticsPage() {
  useDocumentTitle('Estatísticas')
  const global = useStatistics({})

  return (
    <Container className="py-10 sm:py-14">
      <StatisticsSection global={global} headingLevel="h1" />
    </Container>
  )
}
