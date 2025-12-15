import { create } from 'zustand'
import { supabase } from '../lib/supabase'
import type { User, AuthState } from '../types/auth.types'

interface AuthStore extends AuthState {
  signup: (email: string, password: string, fullName: string) => Promise<void>
  login: (email: string, password: string) => Promise<void>
  logout: () => Promise<void>
  fetchUser: () => Promise<void>
  setUser: (user: User | null) => void
  setIsAuthenticated: (isAuthenticated: boolean) => void
  setIsLoading: (isLoading: boolean) => void
  setError: (error: string | null) => void
}

export const useAuthStore = create<AuthStore>((set) => {
  return {
  user: null,
  isLoading: true,
  isAuthenticated: false,
  error: null,

  // Inscription
  signup: async (email, password, fullName) => {
    try {
      set({ isLoading: true, error: null })

      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
          },
        },
      })

      if (error) throw error

      // Le trigger handle_new_user() crée automatiquement le profil
      set({ error: null })
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Erreur lors de l’inscription'
      set({ error: message })
      throw new Error(message)
    } finally {
      set({ isLoading: false })
    }
  },

  // Connexion
  login: async (email, password) => {
    try {
      set({ isLoading: true, error: null })

      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) throw error

      // Récupère le profil
      const { data: profile } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('id', data.user.id)
        .single()

      const user: User = {
        id: data.user.id,
        email: data.user.email ?? '',
        full_name: profile?.full_name ?? '',
        phone: profile?.phone ?? '',
        avatar_url: profile?.avatar_url ?? '',
        role: (profile?.role as User['role']) ?? 'client',
        credits: profile?.credits ?? 0,
        onboarding_completed: profile?.onboarding_completed ?? false,
        created_at: profile?.created_at ?? new Date().toISOString(),
      }

      set({ user, isAuthenticated: true, error: null })
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Email ou mot de passe incorrect'
      set({ error: message })
      throw new Error(message)
    } finally {
      set({ isLoading: false })
    }
  },

  // Déconnexion
  logout: async () => {
    try {
      await supabase.auth.signOut()
      set({ user: null, isAuthenticated: false, error: null })
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Erreur lors de la déconnexion'
      set({ error: message })
    }
  },

  // Récupère l'utilisateur au chargement
  fetchUser: async () => {
    try {
      set({ isLoading: true, error: null })

      const {
        data: { user: authUser },
      } = await supabase.auth.getUser()

      if (!authUser) {
        set({ user: null, isAuthenticated: false, isLoading: false })
        return
      }

      const { data: profile } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('id', authUser.id)
        .single()

      const user: User = {
        id: authUser.id,
        email: authUser.email ?? '',
        full_name: profile?.full_name ?? '',
        phone: profile?.phone ?? '',
        avatar_url: profile?.avatar_url ?? '',
        role: (profile?.role as User['role']) ?? 'client',
        credits: profile?.credits ?? 0,
        onboarding_completed: profile?.onboarding_completed ?? false,
        created_at: profile?.created_at ?? new Date().toISOString(),
      }

      set({ user, isAuthenticated: true, error: null })
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Erreur de récupération utilisateur'
      set({ user: null, isAuthenticated: false, error: message })
    } finally {
      set({ isLoading: false })
    }
  },

  // Setters pour le hook useAuthInit
  setUser: (user) => set({ user }),
  setIsAuthenticated: (isAuthenticated) => set({ isAuthenticated }),
  setIsLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error }),
}})

