import { useEffect } from 'react'
import type { SupabaseClient, Session, AuthChangeEvent } from '@supabase/supabase-js'
import { useAuthStore } from '../stores/authStore'
import type { User } from '../types/auth.types'
import type { Database } from '../types/supabase'

/**
 * Hook pour initialiser l'authentification au démarrage de l'app
 * et écouter les changements d'état d'authentification
 */
export function useAuthInit() {
  const { fetchUser, setUser, setIsAuthenticated } = useAuthStore()

  useEffect(() => {
    let subscription: { unsubscribe: () => void } | null = null

    // Import dynamique de Supabase
    import('../lib/supabase')
      .then((module) => {
        const supabase: SupabaseClient<Database> = module.supabase

        // Récupère l'utilisateur au chargement
        fetchUser()

        // Écoute les changements d'authentification (connexion/déconnexion)
        const {
          data: { subscription: authSubscription },
        } = supabase.auth.onAuthStateChange(async (event: AuthChangeEvent, session: Session | null) => {
          console.log('🔄 Événement auth:', event)

          if (event === 'SIGNED_IN' && session?.user) {
            // Utilisateur connecté : récupère le profil
            try {
              const { data: profile } = await supabase
                .from('user_profiles')
                .select('*')
                .eq('id', session.user.id)
                .single()

              const user: User = {
                id: session.user.id,
                email: session.user.email ?? '',
                full_name: profile?.full_name ?? '',
                phone: profile?.phone ?? '',
                avatar_url: profile?.avatar_url ?? '',
                role: (profile?.role as User['role']) ?? 'client',
                credits: profile?.credits ?? 0,
                onboarding_completed: profile?.onboarding_completed ?? false,
                created_at: profile?.created_at ?? new Date().toISOString(),
              }

              setUser(user)
              setIsAuthenticated(true)
              console.log('✅ Utilisateur connecté:', user.email)
            } catch (error) {
              console.error('❌ Erreur récupération profil:', error)
            }
          } else if (event === 'SIGNED_OUT') {
            // Utilisateur déconnecté
            setUser(null)
            setIsAuthenticated(false)
            console.log('✅ Utilisateur déconnecté')
          } else if (event === 'TOKEN_REFRESHED') {
            // Token rafraîchi : vérifie que l'utilisateur est toujours valide
            fetchUser()
          }
        })

        subscription = authSubscription
      })
      .catch((error) => {
        console.error('❌ Erreur chargement Supabase dans useAuthInit:', error)
      })

    // Nettoyage à la destruction du composant
    return () => {
      if (subscription) {
        subscription.unsubscribe()
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
}

