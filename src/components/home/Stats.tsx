import { useEffect } from 'react'
import { motion, useMotionValue, useTransform, animate } from 'framer-motion'
import { Users, Zap, ThumbsUp, Award } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

interface StatConfig {
  label: string
  value: number
  suffix?: string
  icon: LucideIcon
  color: string
}

const stats: StatConfig[] = [
  { label: 'Clients satisfaits', value: 500, suffix: '+', icon: Users, color: 'from-[#2563EB] to-[#60A5FA]' },
  { label: 'Séances réalisées', value: 10000, suffix: '+', icon: Zap, color: 'from-[#10B981] to-[#34D399]' },
  { label: 'Taux de satisfaction', value: 98, suffix: '%', icon: ThumbsUp, color: 'from-[#F97316] to-[#FDBA74]' },
  { label: 'Franchises partenaires', value: 25, suffix: '+', icon: Award, color: 'from-[#8B5CF6] to-[#A78BFA]' },
]

function AnimatedNumber({ value, suffix }: { value: number; suffix?: string }) {
  const count = useMotionValue(0)
  const rounded = useTransform(count, (latest) => Math.floor(latest).toLocaleString('fr-FR'))

  useEffect(() => {
    const controls = animate(count, value, {
      duration: 1.8,
      ease: 'easeOut',
    })
    return () => controls.stop()
  }, [count, value])

  return (
    <span>
      <motion.span>{rounded}</motion.span>
      {suffix && <span>{suffix}</span>}
    </span>
  )
}

export default function Stats() {
  return (
    <section className="mt-16">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              viewport={{ once: true, margin: '-80px' }}
              className="group relative overflow-hidden rounded-2xl bg-white p-5 shadow-sm ring-1 ring-gray-100 transition-all duration-300 hover:shadow-lg hover:ring-gray-200"
            >
              {/* Background gradient on hover */}
              <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 transition-opacity duration-300 group-hover:opacity-5`} />
              
              <div className="relative flex items-start gap-4">
                <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${stat.color} text-white shadow-md`}>
                  <Icon className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-3xl font-bold text-[#111827]">
                    <AnimatedNumber value={stat.value} suffix={stat.suffix} />
                  </p>
                  <p className="mt-0.5 text-sm text-[#6B7280]">{stat.label}</p>
                </div>
              </div>
            </motion.div>
          )
        })}
      </div>
    </section>
  )
}

