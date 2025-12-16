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

const SERVICES = [
  {
    id: "slimming",
    title: "Affinement et tonification",
    description: `Programme ciblé pour affiner la silhouette et tonifier les zones clés grâce à l'EMS.`,
    highlights: [
      "Travail profond des muscles",
      "Séances courtes et efficaces",
      "Résultats visibles en quelques semaines",
    ],
  },
  {
    id: "recovery",
    title: "Récupération et bien-être",
    description: `Séances dédiées à la récupération musculaire et à la détente après l'effort.`,
    highlights: [
      "Diminution des tensions musculaires",
      "Amélioration de la circulation",
      "Sensation de légèreté et de relaxation",
    ],
  },
  {
    id: "performance",
    title: "Performance sportive",
    description: `Accompagnement pour développer ta force, ton explosivité et ta résistance à l'effort.`,
    highlights: [
      "Renforcement des groupes musculaires clés",
      "Complément idéal à l'entraînement classique",
      "Optimisation de la performance globale",
    ],
  },
];


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


