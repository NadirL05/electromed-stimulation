import { Navigate } from 'react-router-dom'
import { useAuthStore } from '../stores/authStore'
import { canAccessAdmin } from '../types/auth.types'

interface AdminRouteProps {
  children: React.ReactNode
}

export default function AdminRoute({ children }: AdminRouteProps) {
  const { user, isLoading } = useAuthStore()

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-zinc-900">
        <div className="text-white">Chargement...</div>
      </div>
    )
  }

  if (!user || !canAccessAdmin(user.role)) {
    return <Navigate to="/dashboard" replace />
  }

  return <>{children}</>
}

