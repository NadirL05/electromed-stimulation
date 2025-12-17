import { motion } from 'framer-motion'
import { Check, Star, Zap } from 'lucide-react'
import { Button } from '../ui/Button'
import { useAuthModals } from '../../contexts/AuthModalContext'
import { useAuthStore } from '../../stores/authStore'
import { useNavigate } from 'react-router-dom'

const plans = [
  {
    name: "Starter",
    price: "49€",
    period: "/mois",
    description: "Idéal pour découvrir l'EMS en douceur.",
    sessions: "2 séances / mois",
    popular: false,
    features: [
      "2 séances EMS / mois",
      "Accès à tous les studios",
      "Application membre",
      "Support par email",
    ],
  },
  {
    name: "Premium",
    price: "79€",
    period: "/mois",
    description: "Le meilleur équilibre résultats / budget.",
    sessions: "4 séances / mois",
    popular: true,
    features: [
      "4 séances EMS / mois",
      "Coaching personnalisé",
      "Réservation prioritaire",
      "Suivi de progression",
      "Kit de bienvenue offert",
    ],
  },
  {
    name: "Elite",
    price: "99€",
    period: "/mois",
    description: "Pour des résultats rapides et durables.",
    sessions: "8 séances / mois",
    popular: false,
    features: [
      "8 séances EMS / mois",
      "Coach dédié",
      "Programme sur mesure",
      "Suivi hebdomadaire",
      "Accès VIP aux événements",
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
    <section className="py-20" id="pricing">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-12"
      >
        <span className="inline-block rounded-full bg-emerald-100 px-4 py-1.5 text-xs font-bold text-emerald-600 uppercase tracking-wider">
          Tarifs transparents
        </span>
        <h2 className="mt-4 text-3xl font-black text-gray-900 sm:text-4xl">
          Choisissez votre <span className="text-orange-500">formule</span>
        </h2>
        <p className="mt-4 mx-auto max-w-2xl text-gray-600">
          Des offres adaptées à chaque rythme. Sans engagement, annulation à tout moment.
        </p>
      </motion.div>

      <div className="grid items-stretch gap-8 md:grid-cols-3">
        {plans.map((plan, index) => (
          <motion.div
            key={plan.name}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
            className={`relative flex flex-col rounded-2xl p-8 transition-all duration-300 ${
              plan.popular
                ? 'bg-orange-500 text-white shadow-2xl shadow-orange-500/30 scale-105 z-10'
                : 'bg-white shadow-lg hover:shadow-xl'
            }`}
          >
            {/* Popular badge */}
            {plan.popular && (
              <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-purple-600 px-4 py-1.5 text-xs font-bold text-white shadow-lg">
                  <Star className="h-3.5 w-3.5 fill-white" />
                  LE PLUS POPULAIRE
                </span>
              </div>
            )}

            {/* Header */}
            <div className="mb-6 pt-2">
              <div className="flex items-center gap-2">
                <h3 className={`text-xl font-bold ${plan.popular ? 'text-white' : 'text-gray-900'}`}>
                  {plan.name}
                </h3>
                {plan.name === 'Elite' && <Zap className="h-5 w-5 text-orange-500" />}
              </div>
              <p className={`mt-1 text-sm ${plan.popular ? 'text-orange-100' : 'text-gray-600'}`}>
                {plan.description}
              </p>
            </div>

            {/* Price */}
            <div className="mb-6">
              <div className="flex items-baseline gap-1">
                <span className={`text-5xl font-black ${plan.popular ? 'text-white' : 'text-gray-900'}`}>
                  {plan.price}
                </span>
                <span className={`text-sm ${plan.popular ? 'text-orange-200' : 'text-gray-500'}`}>
                  {plan.period}
                </span>
              </div>
              <p className={`mt-2 text-sm font-semibold ${plan.popular ? 'text-orange-100' : 'text-orange-500'}`}>
                {plan.sessions}
              </p>
            </div>

            {/* Features */}
            <ul className="mb-8 space-y-3 flex-1">
              {plan.features.map((feature) => (
                <li key={feature} className="flex items-start gap-3">
                  <span className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${
                    plan.popular ? 'bg-white/20 text-white' : 'bg-orange-100 text-orange-500'
                  }`}>
                    <Check className="h-3 w-3" strokeWidth={3} />
                  </span>
                  <span className={`text-sm ${plan.popular ? 'text-white' : 'text-gray-600'}`}>
                    {feature}
                  </span>
                </li>
              ))}
            </ul>

            {/* CTA */}
            <Button
              variant={plan.popular ? 'secondary' : 'primary'}
              size="lg"
              className={`w-full font-bold ${
                plan.popular
                  ? 'bg-white text-orange-500 hover:bg-orange-50'
                  : 'bg-orange-500 text-white hover:bg-orange-600'
              }`}
              onClick={handleChoosePlan}
            >
              {isAuthenticated ? 'Gérer mon abonnement' : 'Commencer maintenant'}
            </Button>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
