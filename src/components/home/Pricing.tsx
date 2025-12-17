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
    <section className="mt-24 space-y-12" id="pricing">
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
            className={`relative rounded-3xl p-8 transition-all duration-300 ${
              plan.popular
                ? 'z-10 scale-105 bg-gradient-to-br from-orange-500 via-pink-500 to-purple-600 text-white shadow-2xl shadow-orange-500/40 ring-4 ring-orange-500/20 hover:scale-110'
                : 'bg-white/90 backdrop-blur-sm shadow-lg ring-1 ring-gray-100 hover:shadow-2xl hover:-translate-y-2 hover:ring-purple-200'
            }`}
          >
            {/* Popular badge */}
            {plan.popular && (
              <div className="absolute -top-5 left-1/2 -translate-x-1/2 z-20">
                <motion.span 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200, damping: 15 }}
                  className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-orange-400 to-pink-500 px-5 py-2 text-xs font-bold text-white shadow-xl shadow-orange-500/50"
                >
                  <Star className="h-4 w-4 fill-white animate-pulse" />
                  Le plus populaire
                </motion.span>
              </div>
            )}

            {/* Header */}
            <div className="mb-8 pt-2">
              <div className="flex items-center gap-3">
                <h3 className={`text-2xl font-extrabold ${plan.popular ? 'text-white' : 'text-gray-900'}`}>
                  {plan.name}
                </h3>
                {plan.name === 'Elite' && (
                  <Zap className={`h-6 w-6 ${plan.popular ? 'text-yellow-300' : 'text-orange-500'} animate-pulse`} />
                )}
              </div>
              <p className={`mt-2 text-base leading-relaxed ${plan.popular ? 'text-white/90' : 'text-gray-600'}`}>
                {plan.description}
              </p>
            </div>

            {/* Price */}
            <div className="mb-8">
              <div className="flex items-baseline gap-2">
                <span className={`text-5xl font-extrabold ${plan.popular ? 'text-white' : 'text-gray-900'}`}>
                  {plan.price}
                </span>
                <span className={`text-lg ${plan.popular ? 'text-white/80' : 'text-gray-600'}`}>
                  {plan.period}
                </span>
              </div>
              <p className={`mt-2 text-base font-semibold ${plan.popular ? 'text-white/90' : 'text-gray-700'}`}>
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
              className={`w-full font-semibold transition-all duration-300 hover:scale-105 ${
                plan.popular 
                  ? 'bg-white text-purple-600 hover:bg-gray-50 hover:shadow-xl shadow-lg' 
                  : 'bg-gradient-to-r from-orange-500 via-pink-500 to-purple-600 hover:from-orange-600 hover:via-pink-600 hover:to-purple-700 shadow-lg shadow-orange-500/30'
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


