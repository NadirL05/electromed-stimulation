import type { LucideIcon } from 'lucide-react'
import { TrendingUp, TrendingDown } from 'lucide-react'

interface StatsCardProps {
  label: string
  value: string
  hint?: string
  icon?: LucideIcon
  trend?: {
    value: number
    isPositive: boolean
  }
  color?: 'orange' | 'blue' | 'green' | 'purple'
}

export function StatsCard({
  label,
  value,
  hint,
  icon: Icon,
  trend,
  color = 'orange'
}: StatsCardProps) {
  const colorClasses = {
    orange: 'from-orange-500 via-pink-500 to-orange-600',
    blue: 'from-blue-500 via-cyan-500 to-blue-600',
    green: 'from-emerald-500 via-teal-500 to-emerald-600',
    purple: 'from-purple-500 via-fuchsia-500 to-purple-600',
  }

  const shadowClasses = {
    orange: 'shadow-orange-500/20 group-hover:shadow-orange-500/30',
    blue: 'shadow-blue-500/20 group-hover:shadow-blue-500/30',
    green: 'shadow-emerald-500/20 group-hover:shadow-emerald-500/30',
    purple: 'shadow-purple-500/20 group-hover:shadow-purple-500/30',
  }

  const iconBgClasses = {
    orange: 'bg-gradient-to-br from-orange-500 to-pink-600 shadow-lg shadow-orange-500/30',
    blue: 'bg-gradient-to-br from-blue-500 to-cyan-600 shadow-lg shadow-blue-500/30',
    green: 'bg-gradient-to-br from-emerald-500 to-teal-600 shadow-lg shadow-emerald-500/30',
    purple: 'bg-gradient-to-br from-purple-500 to-fuchsia-600 shadow-lg shadow-purple-500/30',
  }

  return (
    <div className={`group relative overflow-hidden rounded-2xl border border-white/5 bg-gradient-to-br from-zinc-800/80 to-zinc-900/80 p-5 shadow-lg backdrop-blur-sm transition-all hover:border-white/10 hover:bg-zinc-800/80 ${shadowClasses[color]}`}>
      {/* Animated gradient accent */}
      <div className={`absolute -right-8 -top-8 h-32 w-32 rounded-full bg-gradient-to-br ${colorClasses[color]} opacity-20 blur-3xl transition-all duration-500 group-hover:scale-150 group-hover:opacity-30`} />

      <div className="relative">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <p className="text-sm font-medium text-zinc-400">{label}</p>
            <p className="mt-2 text-3xl font-bold text-white">{value}</p>
            {hint && (
              <p className="mt-1 text-xs text-zinc-500">{hint}</p>
            )}
            {trend && (
              <div className={`mt-2 inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs font-medium ${
                trend.isPositive
                  ? 'bg-emerald-500/10 text-emerald-400 ring-1 ring-emerald-500/20'
                  : 'bg-red-500/10 text-red-400 ring-1 ring-red-500/20'
              }`}>
                {trend.isPositive ? (
                  <TrendingUp className="h-3 w-3" />
                ) : (
                  <TrendingDown className="h-3 w-3" />
                )}
                <span>{trend.isPositive ? '+' : ''}{trend.value}%</span>
                <span className="text-zinc-500">vs mois dernier</span>
              </div>
            )}
          </div>
          {Icon && (
            <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${iconBgClasses[color]} text-white transition-transform group-hover:scale-110`}>
              <Icon className="h-6 w-6" />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

