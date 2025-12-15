import { ChevronLeft, ChevronRight } from 'lucide-react'

interface CalendarProps {
  currentDate: Date
  selectedDate: Date | null
  onChangeMonth: (delta: number) => void
  onSelect: (date: Date) => void
}

const weekDays = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim']

export function Calendar({ currentDate, selectedDate, onChangeMonth, onSelect }: CalendarProps) {
  const year = currentDate.getFullYear()
  const month = currentDate.getMonth()
  const firstDay = new Date(year, month, 1)
  const startIndex = (firstDay.getDay() + 6) % 7 // lundi = 0
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const today = new Date()

  const days = Array.from({ length: startIndex + daysInMonth }, (_, idx) => {
    if (idx < startIndex) return null
    const day = idx - startIndex + 1
    return new Date(year, month, day)
  })

  const isPast = (d: Date) => {
    const t = new Date(today.getFullYear(), today.getMonth(), today.getDate())
    const x = new Date(d.getFullYear(), d.getMonth(), d.getDate())
    return x < t
  }

  const isToday = (d: Date) => {
    return d.getDate() === today.getDate() && 
           d.getMonth() === today.getMonth() && 
           d.getFullYear() === today.getFullYear()
  }

  const isSameDay = (a: Date, b: Date) =>
    a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate()

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => onChangeMonth(-1)}
          className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 text-zinc-400 transition hover:border-white/20 hover:bg-white/5 hover:text-white"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <h3 className="text-lg font-semibold capitalize text-white">
          {currentDate.toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' })}
        </h3>
        <button
          onClick={() => onChangeMonth(1)}
          className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 text-zinc-400 transition hover:border-white/20 hover:bg-white/5 hover:text-white"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>

      {/* Week days header */}
      <div className="grid grid-cols-7 gap-1">
        {weekDays.map((d) => (
          <div key={d} className="py-2 text-center text-xs font-medium text-zinc-500">
            {d}
          </div>
        ))}
      </div>

      {/* Days grid */}
      <div className="grid grid-cols-7 gap-1">
        {days.map((d, idx) =>
          d ? (
            <button
              key={idx}
              disabled={isPast(d)}
              onClick={() => onSelect(d)}
              className={`relative flex h-12 items-center justify-center rounded-xl text-sm font-medium transition-all ${
                isPast(d)
                  ? 'cursor-not-allowed text-zinc-700'
                  : isSameDay(d, selectedDate ?? new Date(0))
                    ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/30'
                    : isToday(d)
                      ? 'bg-zinc-800 text-white ring-2 ring-orange-500/50'
                      : 'text-zinc-300 hover:bg-zinc-800'
              }`}
            >
              {d.getDate()}
              {isToday(d) && !isSameDay(d, selectedDate ?? new Date(0)) && (
                <span className="absolute bottom-1.5 h-1 w-1 rounded-full bg-orange-500" />
              )}
            </button>
          ) : (
            <div key={idx} />
          ),
        )}
      </div>

      {/* Legend */}
      <div className="flex items-center justify-center gap-6 pt-2 text-xs text-zinc-500">
        <div className="flex items-center gap-2">
          <span className="h-3 w-3 rounded bg-orange-500" />
          <span>Sélectionné</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="h-3 w-3 rounded bg-zinc-800 ring-1 ring-orange-500/50" />
          <span>Aujourd'hui</span>
        </div>
      </div>
    </div>
  )
}

