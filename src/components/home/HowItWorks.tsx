import { motion } from 'framer-motion'
import { CalendarCheck2, Zap, TrendingUp, Trophy } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

interface Step {
  icon: LucideIcon
  title: string
  description: string
  number: string
}

const steps: Step[] = [
  {
    icon: CalendarCheck2,
    title: 'Réservez votre séance',
    description: 'Choisissez votre créneau en ligne et recevez une confirmation instantanée.',
    number: '01',
  },
  {
    icon: Zap,
    title: '20 min d\'entraînement',
    description: 'Séance EMS guidée par un coach certifié avec équipement professionnel.',
    number: '02',
  },
  {
    icon: TrendingUp,
    title: 'Suivez vos progrès',
    description: 'Visualisez votre évolution avec des statistiques personnalisées.',
    number: '03',
  },
  {
    icon: Trophy,
    title: 'Atteignez vos objectifs',
    description: 'Résultats visibles en 8 séances, corps transformé en 3 mois.',
    number: '04',
  },
]

export default function HowItWorks() {
  return (
    <section className="py-20">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-12"
      >
        <span className="inline-block rounded-full bg-orange-100 px-4 py-1.5 text-xs font-bold text-orange-600 uppercase tracking-wider">
          Comment ça marche
        </span>
        <h2 className="mt-4 text-3xl font-black text-gray-900 sm:text-4xl">
          Votre transformation en <span className="text-orange-500">4 étapes</span>
        </h2>
        <p className="mt-4 mx-auto max-w-2xl text-gray-600">
          Un parcours simple et efficace pour atteindre vos objectifs fitness.
        </p>
      </motion.div>

      <div className="relative">
        {/* Connecting line */}
        <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-orange-500 via-purple-500 to-orange-500 hidden lg:block -translate-x-1/2" />

        <div className="grid gap-8 lg:gap-0">
          {steps.map((step, index) => {
            const Icon = step.icon
            const isEven = index % 2 === 0

            return (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, x: isEven ? -40 : 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true, margin: '-80px' }}
                className={`relative flex items-center gap-8 lg:gap-16 ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'}`}
              >
                {/* Content */}
                <div className={`flex-1 ${isEven ? 'lg:text-right' : 'lg:text-left'}`}>
                  <div className={`rounded-2xl bg-white p-6 shadow-lg inline-block ${isEven ? 'lg:ml-auto' : 'lg:mr-auto'}`}>
                    <div className={`flex items-center gap-4 ${isEven ? 'lg:flex-row-reverse' : ''}`}>
                      <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-orange-500 text-white shadow-lg">
                        <Icon className="h-7 w-7" />
                      </div>
                      <div>
                        <span className="text-sm font-bold text-orange-500">{step.number}</span>
                        <h3 className="text-lg font-bold text-gray-900">{step.title}</h3>
                      </div>
                    </div>
                    <p className="mt-4 text-gray-600 max-w-sm">{step.description}</p>
                  </div>
                </div>

                {/* Center dot */}
                <div className="hidden lg:flex h-6 w-6 items-center justify-center rounded-full bg-orange-500 text-white text-xs font-bold shadow-lg ring-4 ring-white">
                  {index + 1}
                </div>

                {/* Spacer for layout */}
                <div className="flex-1 hidden lg:block" />
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
