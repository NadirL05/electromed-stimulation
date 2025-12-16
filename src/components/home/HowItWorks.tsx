import { motion } from 'framer-motion'
import { CalendarCheck2, Cpu, GaugeCircle, Users } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

interface Step {
  icon: LucideIcon
  title: string
  description: string
  color: string
}

const steps: Step[] = [
  {
    icon: CalendarCheck2,
    title: 'Planifiez vos séances',
    description: 'Vos membres réservent en ligne leurs créneaux en quelques clics.',
    color: 'from-[#2563EB] to-[#60A5FA]',
  },
  {
    icon: Users,
    title: 'Assignez les coachs',
    description: 'Optimisez le planning de vos coachs en fonction de leurs disponibilités.',
    color: 'from-[#10B981] to-[#34D399]',
  },
  {
    icon: Cpu,
    title: 'Suivez les performances',
    description: 'Visualisez la fréquentation, le taux de remplissage et les résultats par membre.',
    color: 'from-[#F97316] to-[#FDBA74]',
  },
  {
    icon: GaugeCircle,
    title: 'Développez votre franchise',
    description: 'Pilotez vos abonnements, paiements et statistiques en temps réel.',
    color: 'from-[#8B5CF6] to-[#A78BFA]',
  },
]

export default function HowItWorks() {
  return (
    <section className="mt-20 space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="space-y-3 text-center"
      >
        <span className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-100 via-cyan-100 to-sky-100 px-4 py-2 text-xs font-semibold text-blue-600 ring-1 ring-blue-200/50">
          Comment ça marche
        </span>
        <h2 className="text-3xl font-bold sm:text-4xl">
          <span className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent">
            4 étapes pour transformer
          </span>
          <br />
          <span className="bg-gradient-to-r from-blue-500 via-cyan-500 to-sky-600 bg-clip-text text-transparent">
            votre franchise
          </span>
        </h2>
        <p className="mx-auto max-w-2xl text-base text-gray-600">
          Une plateforme pensée pour les franchises EMS, du premier rendez-vous à la fidélisation.
        </p>
      </motion.div>

      <div className="relative grid gap-6 md:grid-cols-4">
        {/* Connecting line (desktop only) */}
        <div className="absolute left-0 right-0 top-10 hidden h-1 bg-gradient-to-r from-blue-500 via-emerald-500 to-purple-600 opacity-20 blur-sm md:block" />
        <div className="absolute left-0 right-0 top-10 hidden h-0.5 bg-gradient-to-r from-blue-500 via-emerald-500 to-purple-600 md:block" />

        {steps.map((step, index) => {
          const Icon = step.icon
          return (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true, margin: '-80px' }}
              className="group relative"
            >
              {/* Step number with gradient */}
              <div className="relative z-10 mb-4 flex justify-center md:justify-start">
                <motion.div
                  whileHover={{ scale: 1.15, rotate: 5 }}
                  className={`flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${step.color} text-xl font-bold text-white shadow-xl transition-all duration-300 group-hover:shadow-2xl`}
                >
                  {index + 1}
                </motion.div>
              </div>

              {/* Card */}
              <div className="relative overflow-hidden rounded-2xl bg-white p-6 shadow-lg ring-1 ring-gray-100 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:ring-transparent">
                {/* Animated background gradient on hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${step.color} opacity-0 transition-opacity duration-500 group-hover:opacity-5`} />
                <div className={`absolute -right-10 -top-10 h-32 w-32 rounded-full bg-gradient-to-br ${step.color} opacity-0 blur-2xl transition-all duration-500 group-hover:scale-150 group-hover:opacity-20`} />

                <div className="relative">
                  <div className={`mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${step.color} shadow-lg transition-all duration-300 group-hover:scale-110 group-hover:rotate-6`}>
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="mb-2 text-base font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                    {step.title}
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{step.description}</p>
                </div>
              </div>
            </motion.div>
          )
        })}
      </div>
    </section>
  )
}


