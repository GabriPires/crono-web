import { createBrowserRouter } from 'react-router-dom'

import { AuthLayout } from './pages/_layouts/auth'
import { SignInPage } from './pages/auth/sign-in/page'
import { Error } from './pages/error'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AuthLayout />,
    errorElement: <Error />,
    children: [
      {
        path: '/sign-in',
        element: <SignInPage />,
      },
    ],
  },
])
