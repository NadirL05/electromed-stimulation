import { type ReactNode } from 'react'
import { useAuthInit } from '../../hooks/useAuthInit'

interface AuthProviderProps {
  children: ReactNode
}

/**
 * Provider pour initialiser l'authentification au démarrage de l'app
 * et écouter les changements d'état d'authentification
 */
export function AuthProvider({ children }: AuthProviderProps) {
  useAuthInit()
  return <>{children}</>
}
