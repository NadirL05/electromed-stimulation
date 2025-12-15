import { Badge } from '../ui/Badge'
import { Button } from '../ui/Button'

interface Pack {
  id: string
  name: string
  credits: number
  price: number
  popular?: boolean
}

interface PackCardProps {
  pack: Pack
  onBuy: (packId: string) => void
}

export function PackCard({ pack, onBuy }: PackCardProps) {
  return (
    <div
      className={`rounded-2xl border p-6 shadow-lg transition ${
        pack.popular
          ? 'border-orange-500 bg-orange-500/5 shadow-orange-500/20'
          : 'border-white/10 bg-white/5'
      }`}
    >
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-white">{pack.name}</h3>
        {pack.popular && <Badge variant="warning">Le plus populaire</Badge>}
      </div>
      <div className="mt-3 text-4xl font-bold text-white">{pack.price}€</div>
      <div className="mt-1 text-sm text-zinc-300">{pack.credits} crédits</div>
      <ul className="mt-4 space-y-2 text-sm text-zinc-300">
        <li>• Accès prioritaire aux coachs</li>
        <li>• Support premium</li>
        <li>• Créneaux étendus (08h-20h)</li>
      </ul>
      <Button
        variant="primary"
        size="md"
        className="mt-6 w-full"
        onClick={() => onBuy(pack.id)}
      >
        Acheter maintenant
      </Button>
    </div>
  )
}

