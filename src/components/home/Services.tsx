import { motion } from 'framer-motion'
import { Activity, Dumbbell, Heart, Scale, ArrowRight } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

interface Service {
  icon: LucideIcon
  title: string
  description: string
  color: string
  bgLight: string
}

const services: Service[] = [
  {
    icon: Scale,
    title: 'Perte de poids',
    description:
      "Programmes EMS ciblés pour accélérer la perte de masse grasse tout en préservant la masse musculaire.",
    color: 'from-[#2563EB] to-[#60A5FA]',
    bgLight: 'bg-[#EFF6FF]',
  },
  {
    icon: Dumbbell,
    title: 'Renforcement musculaire',
    description:
      'Séances haute intensité guidées par un coach pour sculpter et tonifier l'ensemble du corps.',
    color: 'from-[#10B981] to-[#34D399]',
    bgLight: 'bg-[#ECFDF5]',
  },
  {
    icon: Activity,
    title: 'Récupération sportive',
    description:
      'Protocoles spécifiques pour réduire les courbatures, améliorer la circulation et optimiser la récupération.',
    color: 'from-[#F97316] to-[#FDBA74]',
    bgLight: 'bg-[#FFF7ED]',
  },
  {
    icon: Heart,
    title: 'Bien-être & posture',
    description:
      'Séances douces pour soulager les douleurs chroniques, améliorer la posture et relâcher les tensions.',
    color: 'from-[#EC4899] to-[#F472B6]',
    bgLight: 'bg-[#FDF2F8]',
  },
]

export default function Services() {
  return (
    <section className="mt-20 space-y-8">
      <motion.div 
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="space-y-2"
      >
        <span className="inline-block rounded-full bg-[#FFF7ED] px-4 py-1.5 text-xs font-semibold text-[#F97316]">
          Nos services
        </span>
        <h2 className="text-2xl font-bold text-[#111827] sm:text-3xl">
          Des programmes complets pour vos membres
        </h2>
        <p className="max-w-2xl text-sm text-[#6B7280] sm:text-base">
          ElectroMed s&apos;adapte à chaque objectif : perte de poids, performance sportive ou simple bien-être.
        </p>
      </motion.div>

      <div className="grid gap-5 sm:grid-cols-2">
        {services.map((service, index) => {
          const Icon = service.icon
          return (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true, margin: '-80px' }}
              className="group relative overflow-hidden rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-100 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:ring-gray-200"
            >
              {/* Background gradient on hover */}
              <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 transition-opacity duration-500 group-hover:opacity-5`} />
              
              <div className="relative flex items-start gap-5">
                <div className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br ${service.color} text-white shadow-lg transition-transform duration-300 group-hover:scale-110`}>
                  <Icon className="h-7 w-7" />
                </div>
                <div className="flex-1 space-y-2">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-[#111827]">{service.title}</h3>
                    <ArrowRight className="h-5 w-5 text-gray-300 transition-all duration-300 group-hover:translate-x-1 group-hover:text-[#2563EB]" />
                  </div>
                  <p className="text-sm leading-relaxed text-[#6B7280]">{service.description}</p>
                </div>
              </div>
            </motion.div>
          )
        })}
      </div>
    </section>
  )
}


