import { useState, useEffect } from 'react'
import { useBookingStore } from '../stores/bookingStore'
import { useAuthStore } from '../stores/authStore'
import { Stepper } from '../components/booking/Stepper'
import { Calendar } from '../components/booking/Calendar'
import { TimeSlot } from '../components/booking/TimeSlot'
import { CoachSelector } from '../components/booking/CoachSelector'
import { BookingConfirm } from '../components/booking/BookingConfirm'
import { Button } from '../components/ui/Button'
import { AlertTriangle, Coins, CreditCard, ArrowLeft, ArrowRight, CalendarDays, Clock, User, CheckCircle2 } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const steps = ['Date', 'Créneau', 'Coach', 'Confirmation']
const stepIcons = [CalendarDays, Clock, User, CheckCircle2]

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
  const StepIcon = stepIcons[step]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Réserver une séance</h1>
          <p className="mt-1 text-sm text-zinc-400">
            Sélectionnez une date, un créneau et votre coach préféré
          </p>
        </div>
        <button
          onClick={() => navigate('/dashboard/credits')}
          className={`flex items-center gap-3 rounded-xl px-4 py-3 transition ${
            canBook 
              ? 'bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20' 
              : 'bg-red-500/10 text-red-400 hover:bg-red-500/20'
          }`}
        >
          <CreditCard className="h-5 w-5" />
          <div className="text-left">
            <p className="text-2xl font-bold">{credits}</p>
            <p className="text-xs opacity-75">crédits disponibles</p>
          </div>
        </button>
      </div>

      {/* Alerts */}
      {!canBook && (
        <div className="flex items-start gap-4 rounded-2xl border border-red-500/30 bg-red-500/10 p-5">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-red-500/20">
            <AlertTriangle className="h-5 w-5 text-red-400" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-red-400">Crédits insuffisants</h3>
            <p className="mt-1 text-sm text-red-300/80">
              Rechargez votre compte pour réserver une séance EMS.
            </p>
            <Button
              size="sm"
              className="mt-3 bg-red-500 hover:bg-red-600"
              onClick={() => navigate('/dashboard/credits')}
            >
              <Coins className="h-4 w-4" />
              Recharger mes crédits
            </Button>
          </div>
        </div>
      )}

      {lowCredits && (
        <div className="flex items-start gap-4 rounded-2xl border border-amber-500/30 bg-amber-500/10 p-5">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-500/20">
            <AlertTriangle className="h-5 w-5 text-amber-400" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-amber-400">Crédits faibles</h3>
            <p className="mt-1 text-sm text-amber-300/80">
              Il vous reste moins de 3 crédits. Pensez à recharger.
            </p>
          </div>
        </div>
      )}

      {error && (
        <div className="rounded-2xl border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-300">
          {error}
        </div>
      )}

      {/* Stepper */}
      <div className="rounded-2xl border border-white/5 bg-zinc-800/50 p-6">
        <Stepper steps={steps} current={step} />
      </div>

      {/* Main content */}
      <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
        {/* Step content */}
        <div className="rounded-2xl border border-white/5 bg-zinc-800/50 p-6">
          <div className="mb-6 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-500/10">
              <StepIcon className="h-5 w-5 text-orange-400" />
            </div>
            <div>
              <p className="text-xs text-zinc-500">Étape {step + 1} sur {steps.length}</p>
              <h2 className="text-lg font-semibold text-white">
                {step === 0 && 'Choisissez une date'}
                {step === 1 && 'Sélectionnez un créneau'}
                {step === 2 && 'Choisissez votre coach'}
                {step === 3 && 'Confirmez votre réservation'}
              </h2>
            </div>
          </div>

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
        </div>

        {/* Sidebar summary */}
        <div className="space-y-4">
          <div className="rounded-2xl border border-white/5 bg-zinc-800/50 p-5">
            <h3 className="mb-4 text-sm font-semibold text-zinc-400">Récapitulatif</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-zinc-500">Date</span>
                <span className="text-sm font-medium text-white">
                  {selectedDate 
                    ? selectedDate.toLocaleDateString('fr-FR', { weekday: 'short', day: 'numeric', month: 'short' })
                    : '—'
                  }
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-zinc-500">Créneau</span>
                <span className="text-sm font-medium text-white">{selectedSlot || '—'}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-zinc-500">Coach</span>
                <span className="text-sm font-medium text-white">{selectedCoachObj?.full_name || '—'}</span>
              </div>
              <div className="border-t border-white/5 pt-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-zinc-500">Coût</span>
                  <span className="text-sm font-bold text-orange-400">1 crédit</span>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation buttons */}
          <div className="flex gap-3">
            <Button 
              variant="secondary" 
              className="flex-1" 
              onClick={prev} 
              disabled={step === 0 || isLoading}
            >
              <ArrowLeft className="h-4 w-4" />
              Retour
            </Button>
            {step < steps.length - 1 ? (
              <Button
                className="flex-1"
                onClick={next}
                disabled={
                  isLoading ||
                  (step === 0 && !selectedDate) ||
                  (step === 1 && !selectedSlot) ||
                  (step === 2 && !selectedCoach)
                }
              >
                Suivant
                <ArrowRight className="h-4 w-4" />
              </Button>
            ) : (
              <Button
                className="flex-1"
                onClick={handleConfirm}
                disabled={!canBook || isLoading || !selectedDate || !selectedSlot || !selectedCoach}
                isLoading={isLoading}
              >
                <CheckCircle2 className="h-4 w-4" />
                Confirmer
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

