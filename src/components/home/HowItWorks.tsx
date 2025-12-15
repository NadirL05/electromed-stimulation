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
        className="space-y-2 text-center"
      >
        <span className="inline-block rounded-full bg-[#EFF6FF] px-4 py-1.5 text-xs font-semibold text-[#2563EB]">
          Comment ça marche
        </span>
        <h2 className="text-2xl font-bold text-[#111827] sm:text-3xl">
          4 étapes pour transformer votre franchise
        </h2>
        <p className="mx-auto max-w-2xl text-sm text-[#6B7280] sm:text-base">
          Une plateforme pensée pour les franchises EMS, du premier rendez-vous à la fidélisation.
        </p>
      </motion.div>

      <div className="relative grid gap-6 md:grid-cols-4">
        {/* Connecting line (desktop only) */}
        <div className="absolute left-0 right-0 top-10 hidden h-0.5 bg-gradient-to-r from-[#2563EB] via-[#10B981] to-[#F97316] md:block" />
        
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
                <div className={`flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${step.color} text-lg font-bold text-white shadow-lg transition-transform duration-300 group-hover:scale-110`}>
                  {index + 1}
                </div>
              </div>
              
              {/* Card */}
              <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-gray-100 transition-all duration-300 hover:shadow-lg hover:ring-gray-200">
                <div className={`mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br ${step.color} bg-opacity-10`}>
                  <Icon className={`h-5 w-5 bg-gradient-to-br ${step.color} bg-clip-text text-transparent`} style={{ color: step.color.includes('2563EB') ? '#2563EB' : step.color.includes('10B981') ? '#10B981' : step.color.includes('F97316') ? '#F97316' : '#8B5CF6' }} />
                </div>
                <h3 className="mb-2 text-base font-semibold text-[#111827]">{step.title}</h3>
                <p className="text-sm text-[#6B7280] leading-relaxed">{step.description}</p>
              </div>
            </motion.div>
          )
        })}
      </div>
    </section>
  )
}


