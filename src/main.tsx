import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './lib/supabase'
import { RouterProvider } from 'react-router-dom'
import { router } from './router'
import { AuthProvider } from './components/auth/AuthProvider'
import { AuthModalProvider } from './contexts/AuthModalContext'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <AuthModalProvider>
        <RouterProvider router={router} />
      </AuthModalProvider>
    </AuthProvider>
  </StrictMode>,
)
