// Types pour l'authentification
export type UserRole = 'user' | 'franchise_owner' | 'coach' | 'admin'

export const canAccessAdmin = (role: UserRole): boolean => {
  return ['franchise_owner', 'admin'].includes(role)
}

export interface User {
  id: string
  email: string
  full_name?: string
  phone?: string
  avatar_url?: string
  role: UserRole
  credits: number
  onboarding_completed: boolean
  created_at: string
}

export interface AuthState {
  user: User | null
  isLoading: boolean
  isAuthenticated: boolean
  error?: string | null
}

export interface SignupData {
  email: string
  password: string
  full_name: string
}

export interface LoginData {
  email: string
  password: string
}




