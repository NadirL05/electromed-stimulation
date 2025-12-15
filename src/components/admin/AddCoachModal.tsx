import { useState } from 'react'
import { X, Calendar, AlertCircle, CheckCircle2 } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Input } from '../ui/Input'
import { Button } from '../ui/Button'
import { supabase } from '../../lib/supabase'
import { useAuthStore } from '../../stores/authStore'
import { createCoachUser } from '../../lib/adminApi'

const coachSchema = z.object({
  full_name: z.string().min(2, 'Le nom doit contenir au moins 2 caractères'),
  email: z.string().email('Email invalide'),
  phone: z.string().optional(),
  bio: z.string().optional(),
  specialties: z.string().optional(),
})

type CoachFormData = z.infer<typeof coachSchema>

interface AddCoachModalProps {
  isOpen: boolean
  onClose: () => void
  onSuccess: () => void
  coachId?: string
}

export default function AddCoachModal({
  isOpen,
  onClose,
  onSuccess,
  coachId,
}: AddCoachModalProps) {
  const { user } = useAuthStore()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const [availability, setAvailability] = useState<Record<string, string[]>>({})

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CoachFormData>({
    resolver: zodResolver(coachSchema),
  })

  if (!isOpen) return null

  const onSubmit = async (data: CoachFormData) => {
    if (!user) {
      setError('Vous devez être connecté pour créer un coach')
      return
    }

    setIsLoading(true)
    setError(null)
    setSuccess(false)

    try {
      // Récupérer la franchise du propriétaire
      const { data: franchise, error: franchiseError } = await supabase
        .from('franchises')
        .select('id')
        .eq('owner_id', user.id)
        .single()

      if (franchiseError || !franchise) {
        throw new Error('Franchise non trouvée. Assurez-vous d\'être propriétaire d\'une franchise.')
      }

      // Générer un mot de passe temporaire sécurisé
      const tempPassword = `Coach${Math.random().toString(36).slice(-12)}!`

      // Appeler l'Edge Function pour créer l'utilisateur coach
      await createCoachUser({
        email: data.email,
        password: tempPassword,
        full_name: data.full_name,
        phone: data.phone,
        bio: data.bio,
        specialties: data.specialties
          ? data.specialties.split(',').map((s) => s.trim()).filter(Boolean)
          : [],
        availability: availability,
        franchise_id: franchise.id,
      })

      // Succès : réinitialiser le formulaire et rafraîchir la liste
      setSuccess(true)
      reset()
      setAvailability({})

      // Attendre un peu pour afficher le message de succès
      setTimeout(() => {
        onSuccess()
        onClose()
        setSuccess(false)
      }, 1500)
    } catch (error) {
      console.error('Erreur lors de la création du coach:', error)
      const errorMessage =
        error instanceof Error
          ? error.message
          : 'Une erreur est survenue lors de la création du coach'
      setError(errorMessage)
    } finally {
      setIsLoading(false)
    }
  }

  const daysOfWeek = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche']
  const timeSlots = [
    '08:00',
    '09:00',
    '10:00',
    '11:00',
    '12:00',
    '13:00',
    '14:00',
    '15:00',
    '16:00',
    '17:00',
    '18:00',
    '19:00',
    '20:00',
  ]

  const toggleTimeSlot = (day: string, slot: string) => {
    setAvailability((prev) => {
      const daySlots = prev[day] || []
      const newSlots = daySlots.includes(slot)
        ? daySlots.filter((s) => s !== slot)
        : [...daySlots, slot]
      return { ...prev, [day]: newSlots }
    })
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-xl border border-white/10 bg-zinc-900 p-6 shadow-2xl">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 rounded-lg p-2 text-zinc-400 transition hover:bg-zinc-800 hover:text-white"
        >
          <X className="h-5 w-5" />
        </button>

        <h2 className="mb-6 text-2xl font-bold text-white">
          {coachId ? 'Modifier le coach' : 'Ajouter un coach'}
        </h2>

        {/* Messages d'erreur et de succès */}
        {error && (
          <div className="mb-4 flex items-center gap-2 rounded-lg border border-red-500/50 bg-red-500/10 p-3 text-red-400">
            <AlertCircle className="h-5 w-5 flex-shrink-0" />
            <p className="text-sm">{error}</p>
          </div>
        )}

        {success && (
          <div className="mb-4 flex items-center gap-2 rounded-lg border border-green-500/50 bg-green-500/10 p-3 text-green-400">
            <CheckCircle2 className="h-5 w-5 flex-shrink-0" />
            <p className="text-sm">Coach créé avec succès !</p>
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <Input
              label="Nom complet"
              {...register('full_name')}
              error={errors.full_name?.message}
            />
            <Input
              label="Email"
              type="email"
              {...register('email')}
              error={errors.email?.message}
            />
            <Input
              label="Téléphone"
              type="tel"
              {...register('phone')}
              error={errors.phone?.message}
            />
            <Input
              label="Spécialités (séparées par des virgules)"
              {...register('specialties')}
              error={errors.specialties?.message}
            />
          </div>

          <Input
            label="Biographie"
            {...register('bio')}
            error={errors.bio?.message}
            className="min-h-[100px]"
          />

          <div className="rounded-lg border border-white/10 bg-zinc-800/50 p-4">
            <div className="mb-4 flex items-center gap-2 text-white">
              <Calendar className="h-5 w-5 text-orange-500" />
              <h3 className="font-semibold">Disponibilités</h3>
            </div>
            <div className="space-y-4">
              {daysOfWeek.map((day) => (
                <div key={day}>
                  <p className="mb-2 text-sm font-medium text-zinc-300">{day}</p>
                  <div className="flex flex-wrap gap-2">
                    {timeSlots.map((slot) => {
                      const isSelected = availability[day]?.includes(slot)
                      return (
                        <button
                          key={slot}
                          type="button"
                          onClick={() => toggleTimeSlot(day, slot)}
                          className={`rounded-lg px-3 py-1 text-sm transition ${
                            isSelected
                              ? 'bg-orange-500 text-white'
                              : 'bg-zinc-700 text-zinc-300 hover:bg-zinc-600'
                          }`}
                        >
                          {slot}
                        </button>
                      )
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-end gap-4">
            <Button type="button" variant="secondary" onClick={onClose}>
              Annuler
            </Button>
            <Button type="submit" isLoading={isLoading}>
              {coachId ? 'Modifier' : 'Créer le coach'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

