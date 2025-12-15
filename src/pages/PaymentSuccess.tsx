import { useEffect, useState } from 'react'
import { CheckCircle2, Sparkles } from 'lucide-react'
import { Button } from '../components/ui/Button'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '../stores/authStore'
import { supabase } from '../lib/supabase'

export default function PaymentSuccess() {
  const navigate = useNavigate()
  const { user, fetchUser } = useAuthStore()
  const [credits, setCredits] = useState<number | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Récupérer les crédits actualisés
    const fetchCredits = async () => {
      if (!user?.id) return

      try {
        // Attendre un peu pour laisser le webhook se traiter
        await new Promise((resolve) => setTimeout(resolve, 2000))

        const { data: profile } = await supabase
          .from('user_profiles')
          .select('credits')
          .eq('id', user.id)
          .single()

        if (profile) {
          setCredits(profile.credits)
          // Rafraîchir l'utilisateur dans le store
          await fetchUser()
        }
      } catch (error) {
        console.error('Erreur récupération crédits:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchCredits()
  }, [user, fetchUser])

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center space-y-6 text-center">
      {/* Animation de succès */}
      <div className="relative">
        <div className="absolute inset-0 animate-ping">
          <CheckCircle2 className="h-20 w-20 text-green-400 opacity-20" />
        </div>
        <CheckCircle2 className="relative h-20 w-20 text-green-400" />
      </div>

      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-white">Paiement réussi !</h1>
        <p className="text-zinc-400">Votre transaction a été traitée avec succès.</p>
      </div>

      {/* Affichage des crédits */}
      {isLoading ? (
        <div className="rounded-lg border border-white/10 bg-zinc-800/50 px-6 py-4">
          <p className="text-sm text-zinc-400">Mise à jour de vos crédits...</p>
        </div>
      ) : credits !== null ? (
        <div className="rounded-lg border border-green-500/50 bg-green-500/10 px-6 py-4">
          <div className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-green-400" />
            <div>
              <p className="text-sm text-zinc-400">Vos crédits ont été mis à jour</p>
              <p className="text-2xl font-bold text-green-400">{credits} crédits</p>
            </div>
          </div>
        </div>
      ) : (
        <div className="rounded-lg border border-white/10 bg-zinc-800/50 px-6 py-4">
          <p className="text-sm text-zinc-400">
            Vos crédits seront mis à jour dans quelques instants
          </p>
        </div>
      )}

      {/* Actions */}
      <div className="flex flex-col gap-3 sm:flex-row">
        <Button variant="primary" onClick={() => navigate('/dashboard')}>
          Retour au dashboard
        </Button>
        <Button variant="secondary" onClick={() => navigate('/dashboard/booking')}>
          Réserver une séance
        </Button>
      </div>

      {/* Info supplémentaire */}
      <p className="max-w-md text-xs text-zinc-500">
        Un email de confirmation a été envoyé à votre adresse. Vous pouvez consulter l'historique
        de vos paiements dans votre profil.
      </p>
    </div>
  )
}

