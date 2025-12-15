import { motion } from 'framer-motion'
import { Check, Star, Zap } from 'lucide-react'
import { Button } from '../ui/Button'
import { useAuthModals } from '../../contexts/AuthModalContext'
import { useAuthStore } from '../../stores/authStore'
import { useNavigate } from 'react-router-dom'

const plans = [
  {
    name: 'Basic',
    price: '29€',
    period: '/mois',
    description: 'Idéal pour découvrir l'EMS en douceur.',
    sessions: '2 séances / mois',
    popular: false,
    features: ['Accès à 2 séances EMS', 'Suivi de base', 'Accès à l'application membre', 'Support par email'],
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
      'Support prioritaire',
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
      'Support prioritaire 24/7',
      'Analyses avancées',
    ],
  },
]

export default function PricingSection() {
  const { openSignup } = useAuthModals()
  const { isAuthenticated } = useAuthStore()
  const navigate = useNavigate()

  const handleChoosePlan = () => {
    if (isAuthenticated) {
      navigate('/dashboard/credits')
    } else {
      openSignup()
    }
  }

  return (
    <section className="mt-20 space-y-8" id="pricing">
      <motion.div 
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="space-y-2 text-center"
      >
        <span className="inline-block rounded-full bg-[#ECFDF5] px-4 py-1.5 text-xs font-semibold text-[#10B981]">
          Tarifs transparents
        </span>
        <h2 className="text-2xl font-bold text-[#111827] sm:text-3xl">
          Des plans adaptés à chaque objectif
        </h2>
        <p className="mx-auto max-w-2xl text-sm text-[#6B7280] sm:text-base">
          Choisissez l'offre qui correspond à votre rythme et à vos ambitions. Sans engagement.
        </p>
      </motion.div>

      <div className="grid items-center gap-6 md:grid-cols-3">
        {plans.map((plan, index) => (
          <motion.div
            key={plan.name}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
            className={`relative rounded-3xl p-6 transition-all duration-300 ${
              plan.popular
                ? 'z-10 scale-105 bg-gradient-to-b from-[#2563EB] to-[#1D4ED8] text-white shadow-2xl shadow-[#2563EB]/30 ring-4 ring-[#2563EB]/20'
                : 'bg-white shadow-lg ring-1 ring-gray-100 hover:shadow-xl'
            }`}
          >
            {/* Popular badge */}
            {plan.popular && (
              <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-[#F97316] px-4 py-1.5 text-xs font-semibold text-white shadow-lg">
                  <Star className="h-3.5 w-3.5 fill-white" />
                  Le plus populaire
                </span>
              </div>
            )}

            {/* Header */}
            <div className="mb-6 pt-2">
              <div className="flex items-center gap-2">
                <h3 className={`text-xl font-bold ${plan.popular ? 'text-white' : 'text-[#111827]'}`}>
                  {plan.name}
                </h3>
                {plan.name === 'Elite' && <Zap className="h-5 w-5 text-[#F97316]" />}
              </div>
              <p className={`mt-1 text-sm ${plan.popular ? 'text-blue-100' : 'text-[#6B7280]'}`}>
                {plan.description}
              </p>
            </div>

            {/* Price */}
            <div className="mb-6">
              <div className="flex items-baseline gap-1">
                <span className={`text-4xl font-bold ${plan.popular ? 'text-white' : 'text-[#111827]'}`}>
                  {plan.price}
                </span>
                <span className={`text-sm ${plan.popular ? 'text-blue-200' : 'text-[#6B7280]'}`}>
                  {plan.period}
                </span>
              </div>
              <p className={`mt-1 text-sm font-medium ${plan.popular ? 'text-blue-100' : 'text-[#111827]'}`}>
                {plan.sessions}
              </p>
            </div>

            {/* Features */}
            <ul className="mb-6 space-y-3">
              {plan.features.map((feature) => (
                <li key={feature} className="flex items-start gap-3">
                  <span className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${
                    plan.popular ? 'bg-white/20 text-white' : 'bg-[#10B981]/10 text-[#10B981]'
                  }`}>
                    <Check className="h-3 w-3" />
                  </span>
                  <span className={`text-sm ${plan.popular ? 'text-blue-50' : 'text-[#4B5563]'}`}>
                    {feature}
                  </span>
                </li>
              ))}
            </ul>

            {/* CTA */}
            <Button
              variant={plan.popular ? 'secondary' : 'primary'}
              size="lg"
              className={`w-full ${plan.popular ? 'bg-white text-[#2563EB] hover:bg-blue-50' : ''}`}
              onClick={handleChoosePlan}
            >
              {isAuthenticated ? 'Voir les crédits' : 'Commencer maintenant'}
            </Button>
          </motion.div>
        ))}
      </div>
    </section>
  )
}


