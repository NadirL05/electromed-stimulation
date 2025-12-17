import { useEffect } from 'react'
import { motion, useMotionValue, useTransform, animate } from 'framer-motion'
import { Users, Zap, ThumbsUp, MapPin } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

interface StatConfig {
  label: string
  value: number
  suffix?: string
  icon: LucideIcon
  iconBg: string
}

const stats: StatConfig[] = [
  { label: 'Clients satisfaits', value: 500, suffix: '+', icon: Users, iconBg: 'bg-orange-500' },
  { label: 'Séances réalisées', value: 10000, suffix: '+', icon: Zap, iconBg: 'bg-purple-600' },
  { label: 'Taux de satisfaction', value: 98, suffix: '%', icon: ThumbsUp, iconBg: 'bg-emerald-500' },
  { label: 'Studios en France', value: 25, suffix: '+', icon: MapPin, iconBg: 'bg-blue-500' },
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
    <section className="py-16">
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true, margin: '-80px' }}
              className="group relative overflow-hidden rounded-2xl bg-white p-6 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="flex items-start gap-4">
                <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${stat.iconBg} text-white shadow-lg transition-transform group-hover:scale-110`}>
                  <Icon className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-3xl font-black text-gray-900">
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
