import { Check } from 'lucide-react'
import { Card } from '../ui/Card'
import { Button } from '../ui/Button'

const plans = [
  {
    name: 'Basic',
    price: '29€',
    period: '/mois',
    description: 'Idéal pour découvrir l’EMS en douceur.',
    sessions: '2 séances / mois',
    popular: false,
    features: ['Accès à 2 séances EMS', 'Suivi de base', 'Accès à l’application membre'],
  },
  {
    name: 'Premium',
    price: '59€',
    period: '/mois',
    description: 'Le meilleur équilibre résultats / budget.',
    sessions: '4 séances / mois',
    popular: true,
    features: [
      '4 séances EMS / mois',
      'Suivi personnalisé',
      'Accès prioritaire aux créneaux',
      'Rapports de progression détaillés',
    ],
  },
  {
    name: 'Elite',
    price: '99€',
    period: '/mois',
    description: 'Pour un accompagnement intensif et premium.',
    sessions: 'Séances illimitées',
    popular: false,
    features: [
      'Séances illimitées',
      'Coach dédié',
      'Programme sur-mesure',
      'Support prioritaire',
    ],
  },
]

export default function PricingSection() {
  return (
    <section className="mt-16 space-y-6" id="pricing">
      <div className="space-y-2 text-center">
        <h2 className="text-2xl font-semibold text-[#111827]">Des plans adaptés à chaque objectif</h2>
        <p className="text-sm text-[#6B7280] sm:text-base">
          Choisissez l’offre qui correspond à votre rythme et à vos ambitions.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {plans.map((plan) => (
          <Card
            key={plan.name}
            title={plan.name}
            description={plan.description}
            actions={
              plan.popular ? (
                <span className="rounded-full bg-[#2563EB]/10 px-3 py-1 text-xs font-semibold text-[#2563EB]">
                  Le plus populaire
                </span>
              ) : undefined
            }
          >
            <div className="mb-4 flex items-baseline gap-1">
              <span className="text-3xl font-bold text-[#111827]">{plan.price}</span>
              <span className="text-sm text-[#6B7280]">{plan.period}</span>
            </div>
            <p className="mb-3 text-sm font-medium text-[#111827]">{plan.sessions}</p>
            <ul className="mb-4 space-y-2 text-sm text-[#4B5563]">
              {plan.features.map((feature) => (
                <li key={feature} className="flex items-center gap-2">
                  <span className="flex h-4 w-4 items-center justify-center rounded-full bg-[#10B981]/10 text-[#10B981]">
                    <Check className="h-3 w-3" />
                  </span>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
            <Button
              variant={plan.popular ? 'primary' : 'secondary'}
              size="md"
              className="w-full"
            >
              Choisir ce plan
            </Button>
          </Card>
        ))}
      </div>
    </section>
  )
}


