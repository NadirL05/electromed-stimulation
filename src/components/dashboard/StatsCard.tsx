interface StatsCardProps {
  label: string
  value: string
  hint?: string
}

export function StatsCard({ label, value, hint }: StatsCardProps) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/5 p-4 shadow-lg shadow-black/20">
      <div className="text-sm text-zinc-400">{label}</div>
      <div className="text-2xl font-semibold text-white">{value}</div>
      {hint && <div className="text-xs text-zinc-500">{hint}</div>}
    </div>
  )
}

