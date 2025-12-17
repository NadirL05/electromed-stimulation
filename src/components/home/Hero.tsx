import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { Button } from '../ui/Button'
import { useAuthModals } from '../../contexts/AuthModalContext'
import { Gift, ArrowRight, CheckCircle } from 'lucide-react'

const benefits = [
  'Résultats visibles en 8 séances',
  'Séances de seulement 20 minutes',
  'Coachs certifiés EMS',
]

export default function Hero() {
  const { openSignup } = useAuthModals()
  const navigate = useNavigate()

  const handleSignup = () => {
    openSignup()
  }

  const handleViewPricing = () => {
    navigate('/pricing')
  }

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-orange-500 via-orange-400 to-orange-500 min-h-[600px]">
      {/* Background Pattern */}
      <div className="pointer-events-none absolute inset-0 select-none overflow-hidden opacity-[0.05]">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="whitespace-nowrap text-[80px] sm:text-[100px] font-black leading-tight text-white"
            style={{ transform: `translateX(${i % 2 === 0 ? '-10%' : '0%'})` }}
          >
            ELECTROMED ELECTROMED ELECTROMED
          </div>
        ))}
      </div>

      <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:py-24">
        <div className="max-w-2xl">
          {/* Promotional Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-block rounded-full bg-white/20 px-4 py-2 text-sm font-semibold text-white backdrop-blur-sm">
              OFFRE DE LANCEMENT
            </span>
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-6 text-4xl font-black leading-tight text-white sm:text-5xl lg:text-6xl"
          >
            Votre{' '}
            <span className="text-purple-900">1ère séance</span>
            <br />
            offerte*
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-6 text-lg text-white/90 max-w-xl"
          >
            Transformez votre corps en seulement 20 minutes grâce à l'électrostimulation.
            L'équivalent de 4h de sport traditionnel !
          </motion.p>

          {/* Benefits list */}
          <motion.ul
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-6 space-y-3"
          >
            {benefits.map((benefit) => (
              <li key={benefit} className="flex items-center gap-3 text-white">
                <CheckCircle className="h-5 w-5 flex-shrink-0" />
                <span className="font-medium">{benefit}</span>
              </li>
            ))}
          </motion.ul>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-8 flex flex-col gap-4 sm:flex-row"
          >
            <Button
              variant="primary"
              size="lg"
              onClick={handleSignup}
              className="group bg-purple-700 hover:bg-purple-800 text-white font-bold px-8 py-4 rounded-xl shadow-xl shadow-purple-900/30 hover:shadow-2xl transition-all"
            >
              <span className="flex items-center gap-2">
                S'INSCRIRE GRATUITEMENT
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </span>
            </Button>
            <Button
              variant="secondary"
              size="lg"
              onClick={handleViewPricing}
              className="bg-white text-orange-600 font-bold px-8 py-4 rounded-xl hover:bg-orange-50 transition-all border-0"
            >
              VOIR LES TARIFS
            </Button>
          </motion.div>

          {/* Bonus Gift */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-purple-900/20 px-4 py-2 text-white"
          >
            <Gift className="h-5 w-5" />
            <span className="font-semibold">+ Kit de bienvenue offert</span>
          </motion.div>

          {/* Fine Print */}
          <p className="mt-8 text-xs text-white/70 max-w-lg">
            *Offre valable pour une première inscription. Abonnements : Starter (49€/mois),
            Premium (79€/mois) ou Elite (99€/mois). Engagement 3 mois minimum.
          </p>
        </div>
      </div>
    </section>
  )
}
