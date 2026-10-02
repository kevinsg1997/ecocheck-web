import { createBrowserRouter } from 'react-router'

import { MainLayout } from './layouts/MainLayout'
import { HomePage } from './pages/HomePage'
import { NotFoundPage } from './pages/NotFoundPage'
import { PrivacyPage } from './pages/PrivacyPage'
import { QuizPage } from './pages/QuizPage'
import { ResultPage } from './pages/ResultPage'
import { routes } from './routes'

export const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
      { path: routes.home, element: <HomePage /> },
      { path: routes.quiz, element: <QuizPage /> },
      { path: routes.result, element: <ResultPage /> },
      { path: routes.privacy, element: <PrivacyPage /> },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
])
