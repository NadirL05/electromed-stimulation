import { motion } from 'framer-motion'
import { Activity, Dumbbell, Heart, Scale } from 'lucide-react'
import { Card } from '../ui/Card'

const services = [
  {
    icon: Scale,
    title: 'Perte de poids',
    description:
      "Programmes EMS ciblés pour accélérer la perte de masse grasse tout en préservant la masse musculaire.",
    color: 'from-[#2563EB] to-[#60A5FA]',
  },
  {
    icon: Dumbbell,
    title: 'Renforcement musculaire',
    description:
      'Séances haute intensité guidées par un coach pour sculpter et tonifier l’ensemble du corps.',
    color: 'from-[#10B981] to-[#34D399]',
  },
  {
    icon: Activity,
    title: 'Récupération sportive',
    description:
      'Protocoles spécifiques pour réduire les courbatures, améliorer la circulation et optimiser la récupération.',
    color: 'from-[#F97316] to-[#FDBA74]',
  },
  {
    icon: Heart,
    title: 'Bien-être & posture',
    description:
      'Séances douces pour soulager les douleurs chroniques, améliorer la posture et relâcher les tensions.',
    color: 'from-[#EC4899] to-[#F97316]',
  },
]

export default function Services() {
  return (
    <section className="mt-16 space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-semibold text-[#111827]">Des services complets pour vos membres</h2>
        <p className="max-w-2xl text-sm text-[#6B7280] sm:text-base">
          ElectroMed s&apos;adapte à chaque objectif : perte de poids, performance sportive ou simple bien-être.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {services.map((service, index) => (
          <motion.div
            key={service.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.05 }}
            viewport={{ once: true, margin: '-80px' }}
          >
            <Card>
              <div className="flex items-start gap-4">
                <div
                  className={`mt-1 flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br ${service.color} text-white shadow-md shadow-black/10`}
                >
                  <service.icon className="h-5 w-5" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-base font-semibold text-[#111827]">{service.title}</h3>
                  <p className="text-sm text-[#6B7280]">{service.description}</p>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  )
}


