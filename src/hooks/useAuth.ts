import { useEffect } from 'react'
import { supabase } from '../lib/supabase'
import { useAuthStore } from '../stores/authStore'

/**
 * Hook pour initialiser et gérer l'authentification
 * - Récupère l'utilisateur au chargement
 * - Écoute les changements d'état d'authentification
 */
export function useAuth() {
  const { fetchUser, user, isAuthenticated, isLoading } = useAuthStore()

  useEffect(() => {
    // Récupère l'utilisateur au chargement
    fetchUser()

    // Écoute les changements d'état d'authentification
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event) => {
      console.log('🔄 Événement auth:', event)

      if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') {
        // Utilisateur connecté ou token rafraîchi
        await fetchUser()
      } else if (event === 'SIGNED_OUT') {
        // Utilisateur déconnecté
        useAuthStore.setState({ user: null, isAuthenticated: false })
      }
    })

    // Nettoyage à la destruction du composant
    return () => {
      subscription.unsubscribe()
    }
  }, [fetchUser])

  return {
    user,
    isAuthenticated,
    isLoading,
  }
}

