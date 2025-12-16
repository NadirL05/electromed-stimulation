import { Badge } from '../ui/Badge'
import { Button } from '../ui/Button'
import { Check, Sparkles, Zap, Crown, CreditCard } from 'lucide-react'

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
  isLoading?: boolean
}

const packConfig: Record<string, { icon: typeof Zap; gradient: string; features: string[] }> = {
  pack_5: {
    icon: Zap,
    gradient: 'from-blue-500 to-cyan-400',
    features: [
      '5 séances EMS',
      'Validité 2 mois',
      'Accès aux créneaux standards',
      'Support par email',
    ],
  },
  pack_10: {
    icon: Sparkles,
    gradient: 'from-orange-500 to-amber-400',
    features: [
      '10 séances EMS',
      'Validité 4 mois',
      'Accès prioritaire aux coachs',
      'Support prioritaire',
      'Créneaux étendus (08h-20h)',
    ],
  },
  pack_20: {
    icon: Crown,
    gradient: 'from-purple-500 to-pink-400',
    features: [
      '20 séances EMS',
      'Validité 6 mois',
      'Accès VIP aux coachs',
      'Support dédié 24/7',
      'Tous les créneaux',
      'Programme personnalisé',
    ],
  },
}

export function PackCard({ pack, onBuy, isLoading }: PackCardProps) {
  const config = packConfig[pack.id] || packConfig.pack_5
  const Icon = config.icon
  const pricePerCredit = (pack.price / pack.credits).toFixed(1)

  return (
    <div
      className={`relative flex flex-col rounded-2xl border p-6 transition-all duration-300 ${
        pack.popular
          ? 'border-orange-500/50 bg-gradient-to-b from-orange-500/10 to-transparent shadow-xl shadow-orange-500/10 hover:shadow-orange-500/20'
          : 'border-white/10 bg-zinc-800/50 hover:border-white/20 hover:bg-zinc-800'
      }`}
    >
      {/* Popular badge */}
      {pack.popular && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
          <Badge variant="warning">
            <Sparkles className="mr-1 h-3 w-3" />
            Le plus populaire
          </Badge>
        </div>
      )}

      {/* Header */}
      <div className="mb-4 flex items-start justify-between">
        <div className={`flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${config.gradient} shadow-lg`}>
          <Icon className="h-6 w-6 text-white" />
        </div>
        <div className="text-right">
          <p className="text-xs text-zinc-500">Prix par crédit</p>
          <p className="text-sm font-semibold text-zinc-300">{pricePerCredit}€</p>
        </div>
      </div>

      {/* Name & Price */}
      <h3 className="text-lg font-semibold text-white">{pack.name}</h3>
      <div className="mt-2 flex items-baseline gap-1">
        <span className="text-4xl font-bold text-white">{pack.price}</span>
        <span className="text-lg text-zinc-400">€</span>
      </div>
      <p className="mt-1 text-sm text-zinc-400">{pack.credits} crédits</p>

      {/* Features */}
      <ul className="mt-6 flex-1 space-y-3">
        {config.features.map((feature) => (
          <li key={feature} className="flex items-start gap-3 text-sm">
            <div className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-gradient-to-br ${config.gradient}`}>
              <Check className="h-3 w-3 text-white" />
            </div>
            <span className="text-zinc-300">{feature}</span>
          </li>
        ))}
      </ul>

      {/* CTA */}
      <Button
        className={`mt-6 w-full ${pack.popular ? '' : 'bg-zinc-700 hover:bg-zinc-600'}`}
        onClick={() => onBuy(pack.id)}
        isLoading={isLoading}
      >
        <CreditCard className="h-4 w-4" />
        Acheter maintenant
      </Button>
    </div>
  )
}

