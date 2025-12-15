import type { Slot } from '../../types/booking.types'

interface TimeSlotProps {
  slots: Slot[]
  selectedSlot: string | null
  onSelect: (slot: string) => void
}

export function TimeSlot({ slots, selectedSlot, onSelect }: TimeSlotProps) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
      <h3 className="mb-3 text-sm font-semibold text-white">Créneaux disponibles</h3>
      <div className="grid gap-2 md:grid-cols-2 lg:grid-cols-3">
        {slots.map((slot) => {
          const isSelected = slot.value === selectedSlot
          return (
            <button
              key={slot.value}
              disabled={!slot.isAvailable}
              onClick={() => onSelect(slot.value)}
              className={`rounded-xl border px-3 py-2 text-sm transition ${
                !slot.isAvailable
                  ? 'cursor-not-allowed border-white/5 text-zinc-500 opacity-50'
                  : isSelected
                    ? 'border-orange-500 bg-orange-500 text-zinc-900 shadow-orange-500/40'
                    : 'border-white/10 text-white hover:border-orange-500/70 hover:bg-orange-500/10'
              }`}
            >
              {slot.value}
            </button>
          )
        })}
      </div>
    </div>
  )
}

