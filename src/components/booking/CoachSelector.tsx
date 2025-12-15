import type { Coach } from '../../types/booking.types'
import { Avatar } from '../ui/Avatar'
import { Star } from 'lucide-react'

interface CoachSelectorProps {
  coaches: Coach[]
  selectedCoach: string | null
  onSelect: (coachId: string) => void
}

export function CoachSelector({ coaches, selectedCoach, onSelect }: CoachSelectorProps) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
      <h3 className="mb-3 text-sm font-semibold text-white">Choisissez un coach</h3>
      <div className="grid gap-3 md:grid-cols-2">
        {coaches.map((coach) => {
          const isSelected = coach.id === selectedCoach
          return (
            <button
              key={coach.id}
              onClick={() => onSelect(coach.id)}
              className={`flex items-center gap-3 rounded-xl border px-3 py-3 text-left transition ${
                isSelected
                  ? 'border-orange-500 bg-orange-500/10'
                  : 'border-white/10 bg-white/5 hover:border-orange-500/70'
              }`}
            >
              <Avatar name={coach.full_name} size="sm" />
              <div className="flex-1">
                <div className="text-sm font-semibold text-white">{coach.full_name}</div>
                {coach.specialties && (
                  <div className="text-xs text-zinc-400">{coach.specialties.join(' • ')}</div>
                )}
                {coach.rating && (
                  <div className="mt-1 flex items-center gap-1 text-xs text-amber-300">
                    <Star className="h-4 w-4 fill-amber-300 text-amber-300" />
                    {coach.rating.toFixed(1)}
                  </div>
                )}
              </div>
              <span className="rounded-full bg-green-500/20 px-2 py-1 text-[10px] font-semibold text-green-200">
                Disponible
              </span>
            </button>
          )
        })}
      </div>
    </div>
  )
}

