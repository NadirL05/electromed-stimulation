import { motion } from 'framer-motion'
import { CalendarCheck2, Cpu, GaugeCircle, Users } from 'lucide-react'

const steps = [
  {
    icon: CalendarCheck2,
    title: '1. Planifiez vos séances',
    description: 'Vos membres réservent en ligne leurs créneaux en quelques clics.',
  },
  {
    icon: Users,
    title: '2. Assignez les coachs',
    description: 'Optimisez le planning de vos coachs en fonction de leurs disponibilités.',
  },
  {
    icon: Cpu,
    title: '3. Suivez les performances',
    description: 'Visualisez la fréquentation, le taux de remplissage et les résultats par membre.',
  },
  {
    icon: GaugeCircle,
    title: '4. Faites grandir votre franchise',
    description: 'Pilotez vos abonnements, paiements et statistiques en temps réel.',
  },
]

export default function HowItWorks() {
  return (
    <section className="mt-16 space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-semibold text-[#111827]">Comment fonctionne ElectroMed ?</h2>
        <p className="max-w-2xl text-sm text-[#6B7280] sm:text-base">
          Une plateforme pensée pour les franchises EMS, du premier rendez-vous à la fidélisation.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-4">
        {steps.map((step, index) => (
          <motion.div
            key={step.title}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.05 }}
            viewport={{ once: true, margin: '-80px' }}
            className="rounded-2xl bg-white p-4 shadow-sm shadow-black/5 ring-1 ring-gray-100"
          >
            <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-[#EFF6FF] text-[#2563EB]">
              <step.icon className="h-5 w-5" />
            </div>
            <h3 className="mb-1 text-sm font-semibold text-[#111827]">{step.title}</h3>
            <p className="text-xs text-[#6B7280] sm:text-sm">{step.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  )
}


