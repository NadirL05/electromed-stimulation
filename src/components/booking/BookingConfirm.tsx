import { Button } from '../ui/Button'

interface BookingConfirmProps {
  date: Date | null
  slot: string | null
  coachName?: string
  credits: number
  isLoading: boolean
  onConfirm: () => void
}

export function BookingConfirm({ date, slot, coachName, credits, isLoading, onConfirm }: BookingConfirmProps) {
  const formattedDate =
    date && slot ? `${date.toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' })} • ${slot}` : '—'

  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
      <h3 className="mb-3 text-sm font-semibold text-white">Confirmation</h3>
      <div className="space-y-2 text-sm text-zinc-200">
        <div className="flex justify-between">
          <span className="text-zinc-400">Créneau</span>
          <span className="font-semibold text-white">{formattedDate}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-zinc-400">Coach</span>
          <span className="font-semibold text-white">{coachName ?? '—'}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-zinc-400">Crédits restants</span>
          <span className="font-semibold text-white">{credits}</span>
        </div>
      </div>
      <div className="mt-4 flex justify-end">
        <Button
          variant="primary"
          size="md"
          onClick={onConfirm}
          isLoading={isLoading}
          disabled={!date || !slot || !coachName || credits <= 0}
        >
          Confirmer la réservation
        </Button>
      </div>
    </div>
  )
}

