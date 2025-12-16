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
  { label: 'Clients satisfaits', value: 500, suffix: '+', icon: Users, color: 'from-blue-500 via-cyan-500 to-sky-600' },
  { label: 'Séances réalisées', value: 10000, suffix: '+', icon: Zap, color: 'from-emerald-500 via-teal-500 to-cyan-600' },
  { label: 'Taux de satisfaction', value: 98, suffix: '%', icon: ThumbsUp, color: 'from-orange-500 via-pink-500 to-purple-600' },
  { label: 'Franchises partenaires', value: 25, suffix: '+', icon: Award, color: 'from-purple-500 via-fuchsia-500 to-pink-600' },
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
              initial={{ opacity: 0, y: 16, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true, margin: '-80px' }}
              className="group relative overflow-hidden rounded-2xl border border-gray-100 bg-white p-6 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:border-transparent hover:shadow-2xl"
            >
              {/* Animated background gradient on hover */}
              <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 transition-opacity duration-300 group-hover:opacity-10`} />
              <div className={`absolute -right-8 -top-8 h-32 w-32 rounded-full bg-gradient-to-br ${stat.color} opacity-10 blur-2xl transition-all duration-500 group-hover:scale-150 group-hover:opacity-20`} />

              <div className="relative flex items-start gap-4">
                <div className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${stat.color} text-white shadow-xl transition-all duration-300 group-hover:scale-110 group-hover:rotate-6`}>
                  <Icon className="h-7 w-7" />
                </div>
                <div>
                  <p className="text-4xl font-bold bg-gradient-to-br from-gray-900 to-gray-700 bg-clip-text text-transparent">
                    <AnimatedNumber value={stat.value} suffix={stat.suffix} />
                  </p>
                  <p className="mt-1 text-sm font-medium text-gray-600">{stat.label}</p>
                </div>
              </div>
            </motion.div>
          )
        })}
      </div>
    </section>
  )
}

