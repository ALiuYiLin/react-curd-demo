import { createBrowserRouter } from 'react-router-dom'
import { Layout } from '@/layout'
import { User } from '@/pages/user'
import { NotFound } from '@/pages/not-found'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <User />,
      },
      {
        path: 'user',
        element: <User />,
      },
    ],
  },
  {
    path: '*',
    element: <NotFound />,
  },
])
