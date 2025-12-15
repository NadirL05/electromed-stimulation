import { useEffect } from 'react'
import { motion, useMotionValue, useTransform, animate } from 'framer-motion'

interface StatConfig {
  label: string
  value: number
  suffix?: string
}

const stats: StatConfig[] = [
  { label: 'Clients satisfaits', value: 500, suffix: '+' },
  { label: 'Séances réalisées', value: 10000, suffix: '+' },
  { label: 'Taux de satisfaction', value: 98, suffix: '%' },
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
    <section className="mt-16 rounded-3xl bg-gradient-to-r from-[#2563EB]/5 via-[#10B981]/5 to-[#F97316]/5 p-6 ring-1 ring-[#DBEAFE]">
      <div className="grid gap-6 text-center text-sm text-[#4B5563] sm:grid-cols-3 sm:text-left">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: index * 0.08 }}
            viewport={{ once: true, margin: '-80px' }}
          >
            <p className="text-xs uppercase tracking-wide text-[#6B7280]">
              {stat.label}
            </p>
            <p className="mt-1 text-2xl font-semibold text-[#111827]">
              <AnimatedNumber value={stat.value} suffix={stat.suffix} />
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

