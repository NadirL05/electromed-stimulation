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

  const isSameDay = (a: Date, b: Date) =>
    a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate()

  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
      <div className="mb-4 flex items-center justify-between text-sm text-white">
        <button
          onClick={() => onChangeMonth(-1)}
          className="rounded-full border border-white/10 px-2 py-1 text-xs text-zinc-200 transition hover:border-white/30 hover:bg-white/5"
        >
          Mois précédent
        </button>
        <div className="font-semibold">
          {currentDate.toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' })}
        </div>
        <button
          onClick={() => onChangeMonth(1)}
          className="rounded-full border border-white/10 px-2 py-1 text-xs text-zinc-200 transition hover:border-white/30 hover:bg-white/5"
        >
          Mois suivant
        </button>
      </div>

      <div className="grid grid-cols-7 gap-2 text-center text-xs text-zinc-400">
        {weekDays.map((d) => (
          <div key={d} className="py-1">
            {d}
          </div>
        ))}
      </div>
      <div className="mt-2 grid grid-cols-7 gap-2">
        {days.map((d, idx) =>
          d ? (
            <button
              key={idx}
              disabled={isPast(d)}
              onClick={() => onSelect(d)}
              className={`h-10 rounded-lg border text-sm transition ${
                isPast(d)
                  ? 'cursor-not-allowed border-white/5 text-zinc-500 opacity-50'
                  : isSameDay(d, selectedDate ?? new Date(0))
                    ? 'border-orange-500 bg-orange-500 text-zinc-900 shadow-orange-500/40'
                    : 'border-white/10 text-white hover:border-orange-500/70 hover:bg-orange-500/10'
              }`}
            >
              {d.getDate()}
            </button>
          ) : (
            <div key={idx} />
          ),
        )}
      </div>
    </div>
  )
}

