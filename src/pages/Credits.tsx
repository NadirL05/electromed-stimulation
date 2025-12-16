import { useState, useMemo } from 'react'
import { PackCard } from '../components/credits/PackCard'
import { useAuthStore } from '../stores/authStore'
import { 
  CreditCard, 
  Coins, 
  TrendingUp, 
  Shield, 
  Clock,
  Gift,
  CheckCircle2,
  AlertCircle
} from 'lucide-react'

const PACKS = [
  { id: 'pack_5', name: 'Pack Découverte', credits: 5, price: 99, popular: false },
  { id: 'pack_10', name: 'Pack Standard', credits: 10, price: 179, popular: true },
  { id: 'pack_20', name: 'Pack Premium', credits: 20, price: 329, popular: false },
]

const benefits = [
  { icon: Shield, text: 'Paiement 100% sécurisé via Stripe' },
  { icon: Clock, text: 'Crédits valables jusqu\'à 6 mois' },
  { icon: Gift, text: 'Bonus crédits sur les gros packs' },
]

export default function Credits() {
  const { user } = useAuthStore()
  const credits = useMemo(() => user?.credits ?? 0, [user])
  const [loadingPack, setLoadingPack] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleBuyPack = async (packId: string) => {
    if (!user?.id) {
      setError('Veuillez vous connecter pour acheter des crédits.')
      return
    }

    setLoadingPack(packId)
    setError(null)

    try {
      const response = await fetch('http://localhost:3000/api/create-checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          packId,
          userId: user.id,
          successUrl: `${window.location.origin}/payment/success`,
          cancelUrl: `${window.location.origin}/dashboard/credits`,
        }),
      })
      const { url, error: responseError } = await response.json()
      
      if (url) {
        window.location.href = url
      } else {
        setError(responseError || 'Erreur lors de la création de la session de paiement')
      }
    } catch {
      setError('Impossible de contacter le serveur de paiement')
    } finally {
      setLoadingPack(null)
    }
  }

  // Calcul des stats
  const totalSpent = 0 // À connecter avec l'historique
  const avgSessionCost = credits > 0 ? (179 / 10).toFixed(1) : '—'

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-white">Crédits & Recharge</h1>
        <p className="mt-1 text-sm text-zinc-400">
          Gérez vos crédits et rechargez votre compte pour réserver des séances
        </p>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="flex items-center gap-4 rounded-2xl border border-white/5 bg-zinc-800/50 p-5">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-500/10">
            <Coins className="h-6 w-6 text-emerald-400" />
          </div>
          <div>
            <p className="text-3xl font-bold text-white">{credits}</p>
            <p className="text-sm text-zinc-500">crédits disponibles</p>
          </div>
        </div>
        <div className="flex items-center gap-4 rounded-2xl border border-white/5 bg-zinc-800/50 p-5">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500/10">
            <TrendingUp className="h-6 w-6 text-blue-400" />
          </div>
          <div>
            <p className="text-3xl font-bold text-white">{avgSessionCost}€</p>
            <p className="text-sm text-zinc-500">coût moyen / séance</p>
          </div>
        </div>
        <div className="flex items-center gap-4 rounded-2xl border border-white/5 bg-zinc-800/50 p-5">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-500/10">
            <CreditCard className="h-6 w-6 text-purple-400" />
          </div>
          <div>
            <p className="text-3xl font-bold text-white">{totalSpent}€</p>
            <p className="text-sm text-zinc-500">total dépensé</p>
          </div>
        </div>
      </div>

      {/* Error message */}
      {error && (
        <div className="flex items-center gap-3 rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-red-400">
          <AlertCircle className="h-5 w-5 shrink-0" />
          <p className="text-sm">{error}</p>
        </div>
      )}

      {/* Packs */}
      <div>
        <h2 className="mb-4 text-lg font-semibold text-white">Choisissez votre pack</h2>
        <div className="grid gap-6 md:grid-cols-3">
          {PACKS.map((pack) => (
            <PackCard 
              key={pack.id} 
              pack={pack} 
              onBuy={handleBuyPack} 
              isLoading={loadingPack === pack.id}
            />
          ))}
        </div>
      </div>

      {/* Benefits */}
      <div className="rounded-2xl border border-white/5 bg-zinc-800/30 p-6">
        <h3 className="mb-4 text-sm font-semibold text-zinc-400">Pourquoi acheter des crédits ?</h3>
        <div className="grid gap-4 sm:grid-cols-3">
          {benefits.map((benefit) => (
            <div key={benefit.text} className="flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-orange-500/10">
                <benefit.icon className="h-5 w-5 text-orange-400" />
              </div>
              <span className="text-sm text-zinc-300">{benefit.text}</span>
            </div>
          ))}
        </div>
      </div>

      {/* FAQ Mini */}
      <div className="rounded-2xl border border-white/5 bg-zinc-800/30 p-6">
        <h3 className="mb-4 text-sm font-semibold text-zinc-400">Questions fréquentes</h3>
        <div className="space-y-4">
          <div>
            <div className="flex items-start gap-2">
              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />
              <div>
                <p className="text-sm font-medium text-white">Comment fonctionnent les crédits ?</p>
                <p className="mt-1 text-xs text-zinc-500">
                  1 crédit = 1 séance EMS de 20 minutes. Les crédits sont débités automatiquement lors de la réservation.
                </p>
              </div>
            </div>
          </div>
          <div>
            <div className="flex items-start gap-2">
              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />
              <div>
                <p className="text-sm font-medium text-white">Puis-je me faire rembourser ?</p>
                <p className="mt-1 text-xs text-zinc-500">
                  Les crédits non utilisés peuvent être remboursés dans les 14 jours suivant l'achat.
                </p>
              </div>
            </div>
          </div>
          <div>
            <div className="flex items-start gap-2">
              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />
              <div>
                <p className="text-sm font-medium text-white">Quelle est la durée de validité ?</p>
                <p className="mt-1 text-xs text-zinc-500">
                  La validité dépend du pack : 2 mois (Découverte), 4 mois (Standard), 6 mois (Premium).
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

