import { PackCard } from '../components/credits/PackCard'
import { useAuthStore } from '../stores/authStore'
import { Badge } from '../components/ui/Badge'
import { useMemo } from 'react'

const PACKS = [
  { id: 'pack_5', name: 'Pack Découverte', credits: 5, price: 99, popular: false },
  { id: 'pack_10', name: 'Pack Standard', credits: 10, price: 179, popular: true },
  { id: 'pack_20', name: 'Pack Premium', credits: 20, price: 329, popular: false },
]

export default function Credits() {
  const { user } = useAuthStore()
  const credits = useMemo(() => user?.credits ?? 0, [user])

  const handleBuyPack = async (packId: string) => {
    if (!user?.id) return alert('Veuillez vous connecter.')
    const response = await fetch('http://localhost:3000/api/create-checkout-session', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        packId,
        userId: user.id,
        successUrl: `${window.location.origin}/payment/success`,
        cancelUrl: `${window.location.origin}/credits`,
      }),
    })
    const { url } = await response.json()
    if (url) {
      window.location.href = url
    } else {
      alert('Erreur lors de la création de la session Stripe')
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold text-white">Packs de crédits</h1>
          <p className="text-sm text-zinc-400">Rechargez vos crédits pour réserver des séances EMS.</p>
        </div>
        <Badge variant={credits > 0 ? 'success' : 'danger'}>{credits} crédits</Badge>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {PACKS.map((pack) => (
          <PackCard key={pack.id} pack={pack} onBuy={handleBuyPack} />
        ))}
      </div>
    </div>
  )
}

