import { motion } from 'framer-motion'
import { Check, Star, Zap } from 'lucide-react'
import { Button } from '../ui/Button'
import { useAuthModals } from '../../contexts/AuthModalContext'
import { useAuthStore } from '../../stores/authStore'
import { useNavigate } from 'react-router-dom'

const plans = [
  {
    name: "Basic",
    price: "29€",
    period: "/mois",
    description: `Idéal pour découvrir l'EMS en douceur.`,
    sessions: "2 séances / mois",
    popular: false,
    features: [
      "Accès à 2 séances EMS",
      "Suivi de base",
      "Accès à l'application membre",
      "Support par email",
    ],
  },
  {
    name: "Premium",
    price: "59€",
    period: "/mois",
    description: `Le meilleur équilibre résultats / budget.`,
    sessions: "4 séances / mois",
    popular: true,
    features: [
      "4 séances EMS / mois",
      "Suivi personnalisé",
      "Accès prioritaire aux créneaux",
      "Rapports de progression détaillés",
    ],
  },
  {
    name: "Elite",
    price: "99€",
    period: "/mois",
    description: `Programme intensif pour des résultats rapides et durables.`,
    sessions: "8 séances / mois",
    popular: false,
    features: [
      "8 séances EMS / mois",
      "Coaching avancé",
      "Plan d'entraînement sur mesure",
      "Suivi hebdomadaire avec ton coach",
    ],
  },
];


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
        className="space-y-3 text-center"
      >
        <span className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-emerald-100 via-teal-100 to-cyan-100 px-4 py-2 text-xs font-semibold text-emerald-600 ring-1 ring-emerald-200/50">
          Tarifs transparents
        </span>
        <h2 className="text-3xl font-bold sm:text-4xl">
          <span className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent">
            Des plans adaptés à
          </span>
          <br />
          <span className="bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-600 bg-clip-text text-transparent">
            chaque objectif
          </span>
        </h2>
        <p className="mx-auto max-w-2xl text-base text-gray-600">
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
            className={`group relative rounded-3xl p-6 transition-all duration-300 ${
              plan.popular
                ? 'z-10 scale-105 bg-gradient-to-br from-blue-600 via-cyan-500 to-teal-600 text-white shadow-2xl shadow-blue-500/40 ring-4 ring-blue-500/30 hover:shadow-3xl hover:shadow-blue-500/50'
                : 'bg-white shadow-lg ring-1 ring-gray-100 hover:-translate-y-2 hover:shadow-2xl hover:ring-gray-200'
            }`}
          >
            {/* Popular badge */}
            {plan.popular && (
              <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-orange-500 via-pink-500 to-purple-600 px-4 py-1.5 text-xs font-semibold text-white shadow-xl shadow-orange-500/40 ring-2 ring-white/20">
                  <Star className="h-3.5 w-3.5 fill-white" />
                  Le plus populaire
                </span>
              </div>
            )}

            {/* Animated background gradient on hover for non-popular cards */}
            {!plan.popular && (
              <>
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 via-teal-500/10 to-cyan-500/10 opacity-0 rounded-3xl transition-opacity duration-500 group-hover:opacity-100" />
                <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-600 opacity-0 blur-2xl transition-all duration-500 group-hover:opacity-20 group-hover:scale-150" />
              </>
            )}

            {/* Header */}
            <div className="relative mb-6 pt-2">
              <div className="flex items-center gap-2">
                <h3 className={`text-xl font-bold ${plan.popular ? 'text-white' : 'bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent'}`}>
                  {plan.name}
                </h3>
                {plan.name === 'Elite' && (
                  <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-r from-orange-500 to-pink-500 shadow-lg">
                    <Zap className="h-4 w-4 text-white" />
                  </span>
                )}
              </div>
              <p className={`mt-1 text-sm ${plan.popular ? 'text-blue-50' : 'text-gray-600'}`}>
                {plan.description}
              </p>
            </div>

            {/* Price */}
            <div className="relative mb-6">
              <div className="flex items-baseline gap-1">
                <span className={`text-4xl font-bold ${plan.popular ? 'text-white' : 'bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-600 bg-clip-text text-transparent'}`}>
                  {plan.price}
                </span>
                <span className={`text-sm ${plan.popular ? 'text-blue-100' : 'text-gray-500'}`}>
                  {plan.period}
                </span>
              </div>
              <p className={`mt-1 text-sm font-medium ${plan.popular ? 'text-blue-50' : 'text-gray-700'}`}>
                {plan.sessions}
              </p>
            </div>

            {/* Features */}
            <ul className="relative mb-6 space-y-3">
              {plan.features.map((feature) => (
                <li key={feature} className="flex items-start gap-3">
                  <span className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${
                    plan.popular ? 'bg-white/20 text-white' : 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-sm'
                  }`}>
                    <Check className="h-3 w-3 font-bold" />
                  </span>
                  <span className={`text-sm ${plan.popular ? 'text-blue-50' : 'text-gray-600'}`}>
                    {feature}
                  </span>
                </li>
              ))}
            </ul>

            {/* CTA */}
            <Button
              variant={plan.popular ? 'secondary' : 'primary'}
              size="lg"
              className={`relative w-full transition-all duration-300 ${
                plan.popular
                  ? 'bg-white text-blue-600 shadow-lg shadow-white/30 hover:scale-105 hover:bg-blue-50 hover:shadow-xl'
                  : 'bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-600 shadow-lg shadow-emerald-500/30 hover:shadow-xl hover:shadow-emerald-500/40'
              }`}
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


