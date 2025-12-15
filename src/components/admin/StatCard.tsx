import type { LucideIcon } from 'lucide-react'

interface StatCardProps {
  icon: LucideIcon
  label: string
  value: string | number
  trend?: {
    value: number
    isPositive: boolean
  }
  color?: 'orange' | 'green' | 'red' | 'blue'
}

export default function StatCard({
  icon: Icon,
  label,
  value,
  trend,
  color = 'orange',
}: StatCardProps) {
  const colorClasses = {
    orange: 'from-orange-500/20 to-orange-600/10 text-orange-400',
    green: 'from-green-500/20 to-green-600/10 text-green-400',
    red: 'from-red-500/20 to-red-600/10 text-red-400',
    blue: 'from-blue-500/20 to-blue-600/10 text-blue-400',
  }

  return (
    <div className="relative overflow-hidden rounded-xl border border-white/5 bg-gradient-to-br from-zinc-800/50 to-zinc-900/50 p-6 backdrop-blur-sm">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="mb-1 text-sm font-medium text-zinc-400">{label}</p>
          <p className="text-3xl font-bold text-white">{value}</p>
          {trend && (
            <div className="mt-2 flex items-center gap-1">
              <span
                className={`text-sm font-medium ${
                  trend.isPositive ? 'text-green-400' : 'text-red-400'
                }`}
              >
                {trend.isPositive ? '↑' : '↓'} {Math.abs(trend.value)}%
              </span>
              <span className="text-xs text-zinc-500">vs mois dernier</span>
            </div>
          )}
        </div>
        <div
          className={`flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br ${colorClasses[color]}`}
        >
          <Icon className="h-6 w-6" />
        </div>
      </div>
    </div>
  )
}

