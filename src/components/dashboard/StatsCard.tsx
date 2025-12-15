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
    orange: 'from-orange-500 to-orange-600 shadow-orange-500/20',
    blue: 'from-blue-500 to-blue-600 shadow-blue-500/20',
    green: 'from-emerald-500 to-emerald-600 shadow-emerald-500/20',
    purple: 'from-purple-500 to-purple-600 shadow-purple-500/20',
  }

  const iconBgClasses = {
    orange: 'bg-orange-500/10 text-orange-400',
    blue: 'bg-blue-500/10 text-blue-400',
    green: 'bg-emerald-500/10 text-emerald-400',
    purple: 'bg-purple-500/10 text-purple-400',
  }

  return (
    <div className="group relative overflow-hidden rounded-2xl border border-white/5 bg-zinc-800/50 p-5 transition-all hover:border-white/10 hover:bg-zinc-800/80">
      {/* Gradient accent */}
      <div className={`absolute -right-8 -top-8 h-24 w-24 rounded-full bg-gradient-to-br ${colorClasses[color]} opacity-20 blur-2xl transition-opacity group-hover:opacity-30`} />
      
      <div className="relative">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <p className="text-sm font-medium text-zinc-400">{label}</p>
            <p className="mt-2 text-3xl font-bold text-white">{value}</p>
            {hint && (
              <p className="mt-1 text-xs text-zinc-500">{hint}</p>
            )}
            {trend && (
              <div className={`mt-2 inline-flex items-center gap-1 text-xs font-medium ${
                trend.isPositive ? 'text-emerald-400' : 'text-red-400'
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
            <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${iconBgClasses[color]}`}>
              <Icon className="h-6 w-6" />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

