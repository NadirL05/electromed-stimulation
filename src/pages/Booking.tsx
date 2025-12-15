import { useState, useEffect } from 'react'
import { useBookingStore } from '../stores/bookingStore'
import { useAuthStore } from '../stores/authStore'
import { Stepper } from '../components/booking/Stepper'
import { Calendar } from '../components/booking/Calendar'
import { TimeSlot } from '../components/booking/TimeSlot'
import { CoachSelector } from '../components/booking/CoachSelector'
import { BookingConfirm } from '../components/booking/BookingConfirm'
import { Button } from '../components/ui/Button'
import { Card } from '../components/ui/Card'
import { Badge } from '../components/ui/Badge'
import { AlertTriangle, Coins } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const steps = ['Date', 'Créneau', 'Coach', 'Confirmation']

export default function Booking() {
  const [monthDate, setMonthDate] = useState(new Date())
  const [step, setStep] = useState(0)
  const { user } = useAuthStore()
  const {
    selectedDate,
    selectedSlot,
    selectedCoach,
    availableSlots,
    availableCoaches,
    credits,
    isLoading,
    error,
    setDate,
    setSlot,
    setCoach,
    setCredits,
    fetchAvailableSlots,
    fetchAvailableCoaches,
    confirmBooking,
  } = useBookingStore()

  const navigate = useNavigate()

  // Init credits from user
  useEffect(() => {
    if (user?.credits !== undefined) {
      setCredits(user.credits)
    }
  }, [user, setCredits])

  const canBook = credits > 0
  const lowCredits = credits > 0 && credits < 3

  const next = async () => {
    if (step === 0 && selectedDate) {
      await fetchAvailableSlots(selectedDate)
    }
    if (step === 1 && selectedDate && selectedSlot) {
      await fetchAvailableCoaches(selectedDate, selectedSlot)
    }
    setStep((s) => Math.min(s + 1, steps.length - 1))
  }

  const prev = () => setStep((s) => Math.max(0, s - 1))

  const handleConfirm = async () => {
    if (!user?.id) return
    await confirmBooking({ userId: user.id })
  }

  const selectedCoachObj = availableCoaches.find((c) => c.id === selectedCoach)

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div>
          <h1 className="text-xl font-semibold text-white">Réserver une séance</h1>
          <p className="text-sm text-zinc-400">Choisissez une date, un créneau et un coach, puis confirmez.</p>
        </div>
        <Badge variant={canBook ? 'success' : 'danger'}>
          {canBook ? `${credits} crédits restants` : 'Crédits insuffisants'}
        </Badge>
      </div>

      <Stepper steps={steps} current={step} />

      {/* Warning crédits insuffisants */}
      {!canBook && (
        <div className="rounded-xl border border-red-500/50 bg-red-500/10 p-4">
          <div className="flex items-start gap-3">
            <AlertTriangle className="h-5 w-5 flex-shrink-0 text-red-400" />
            <div className="flex-1">
              <h3 className="font-semibold text-red-400">Crédits insuffisants</h3>
              <p className="mt-1 text-sm text-red-300">
                Vous n'avez plus de crédits. Rechargez votre compte pour réserver une séance.
              </p>
              <Button
                variant="primary"
                size="sm"
                className="mt-3"
                onClick={() => navigate('/dashboard/credits')}
              >
                <Coins className="mr-2 h-4 w-4" />
                Recharger mes crédits
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Warning crédits faibles */}
      {lowCredits && (
        <div className="rounded-xl border border-orange-500/50 bg-orange-500/10 p-4">
          <div className="flex items-start gap-3">
            <AlertTriangle className="h-5 w-5 flex-shrink-0 text-orange-400" />
            <div className="flex-1">
              <h3 className="font-semibold text-orange-400">Crédits faibles</h3>
              <p className="mt-1 text-sm text-orange-300">
                Vous avez moins de 3 crédits. Pensez à recharger votre compte.
              </p>
              <Button
                variant="secondary"
                size="sm"
                className="mt-3"
                onClick={() => navigate('/dashboard/credits')}
              >
                <Coins className="mr-2 h-4 w-4" />
                Recharger mes crédits
              </Button>
            </div>
          </div>
        </div>
      )}

      {error && (
        <div className="rounded-xl border border-red-500/30 bg-red-500/10 px-3 py-2 text-sm text-red-200">
          {error}
        </div>
      )}

      <Card>
        {step === 0 && (
          <Calendar
            currentDate={monthDate}
            selectedDate={selectedDate}
            onChangeMonth={(delta) => setMonthDate(new Date(monthDate.getFullYear(), monthDate.getMonth() + delta, 1))}
            onSelect={(d) => setDate(d)}
          />
        )}

        {step === 1 && (
          <TimeSlot slots={availableSlots} selectedSlot={selectedSlot} onSelect={(slot) => setSlot(slot)} />
        )}

        {step === 2 && (
          <CoachSelector
            coaches={availableCoaches}
            selectedCoach={selectedCoach}
            onSelect={(coachId) => setCoach(coachId)}
          />
        )}

        {step === 3 && (
          <BookingConfirm
            date={selectedDate}
            slot={selectedSlot}
            coachName={selectedCoachObj?.full_name}
            credits={credits}
            isLoading={isLoading}
            onConfirm={handleConfirm}
          />
        )}
      </Card>

      <div className="flex justify-between">
        <Button variant="ghost" size="sm" onClick={prev} disabled={step === 0 || isLoading}>
          Précédent
        </Button>
        {step < steps.length - 1 ? (
          <Button
            variant="primary"
            size="sm"
            onClick={next}
            disabled={
              isLoading ||
              (step === 0 && !selectedDate) ||
              (step === 1 && !selectedSlot) ||
              (step === 2 && !selectedCoach)
            }
          >
            Suivant
          </Button>
        ) : (
          <Button
            variant="primary"
            size="sm"
            onClick={handleConfirm}
            disabled={!canBook || isLoading || !selectedDate || !selectedSlot || !selectedCoach}
            isLoading={isLoading}
          >
            Confirmer
          </Button>
        )}
      </div>
    </div>
  )
}

