import { createBrowserRouter } from 'react-router'

import { MainLayout } from './layouts/MainLayout'
import { HomePage } from './pages/HomePage'
import { NotFoundPage } from './pages/NotFoundPage'
import { routes } from './routes'

/**
 * A página inicial é carregada junto com o app; as demais são carregadas sob demanda,
 * para que a primeira visita baixe apenas o necessário (as páginas com gráficos usam Recharts).
 */
export const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
      { path: routes.home, element: <HomePage /> },
      {
        path: routes.quiz,
        lazy: async () => ({ Component: (await import('./pages/QuizPage')).QuizPage }),
      },
      {
        path: routes.result,
        lazy: async () => ({ Component: (await import('./pages/ResultPage')).ResultPage }),
      },
      {
        path: routes.statistics,
        lazy: async () => ({ Component: (await import('./pages/StatisticsPage')).StatisticsPage }),
      },
      {
        path: routes.privacy,
        lazy: async () => ({ Component: (await import('./pages/PrivacyPage')).PrivacyPage }),
      },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
])
