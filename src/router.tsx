import { createBrowserRouter } from 'react-router'

import { MainLayout } from './layouts/MainLayout'
import { HomePage } from './pages/HomePage'
import { NotFoundPage } from './pages/NotFoundPage'
import { PrivacyPage } from './pages/PrivacyPage'
import { QuizPage } from './pages/QuizPage'
import { routes } from './routes'

export const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
      { path: routes.home, element: <HomePage /> },
      { path: routes.quiz, element: <QuizPage /> },
      // Páginas com gráficos (Recharts) carregadas sob demanda, para manter o início leve.
      {
        path: routes.result,
        lazy: async () => ({ Component: (await import('./pages/ResultPage')).ResultPage }),
      },
      {
        path: routes.statistics,
        lazy: async () => ({ Component: (await import('./pages/StatisticsPage')).StatisticsPage }),
      },
      { path: routes.privacy, element: <PrivacyPage /> },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
])
