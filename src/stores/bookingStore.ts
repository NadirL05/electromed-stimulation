import { create } from 'zustand'
import { supabase } from '../lib/supabase'
import type { BookingState, Coach, Slot } from '../types/booking.types'

interface BookingStore extends BookingState {
  setDate: (date: Date) => void
  setSlot: (slot: string) => void
  setCoach: (coachId: string) => void
  setCredits: (credits: number) => void
  fetchAvailableSlots: (date: Date, franchiseId?: string) => Promise<void>
  fetchAvailableCoaches: (date: Date, slot: string) => Promise<void>
  confirmBooking: (params: { userId: string; subscriptionId?: string }) => Promise<void>
  reset: () => void
}

const initialState: BookingState = {
  selectedDate: null,
  selectedSlot: null,
  selectedCoach: null,
  availableSlots: [],
  availableCoaches: [],
  credits: 0,
  isLoading: false,
  error: null,
}

// Utilitaire pour générer des créneaux 08:00 -> 20:00
function generateDailySlots(): Slot[] {
  const slots: Slot[] = []
  for (let h = 8; h < 20; h++) {
    const start = `${String(h).padStart(2, '0')}:00`
    const end = `${String(h + 1).padStart(2, '0')}:00`
    slots.push({ value: `${start} - ${end}`, isAvailable: true })
  }
  return slots
}

// Combine date + slot start en ISO
function toDateTime(date: Date, slot: string): string {
  const [start] = slot.split(' - ')
  const [hour, minute] = start.split(':').map(Number)
  const dt = new Date(date)
  dt.setHours(hour, minute, 0, 0)
  return dt.toISOString()
}

export const useBookingStore = create<BookingStore>((set, get) => ({
  ...initialState,

  setDate: (date) => set({ selectedDate: date, selectedSlot: null, selectedCoach: null }),
  setSlot: (slot) => set({ selectedSlot: slot, selectedCoach: null }),
  setCoach: (coachId) => set({ selectedCoach: coachId }),
  setCredits: (credits) => set({ credits }),

  fetchAvailableSlots: async (_date, _franchiseId) => {
    set({ isLoading: true, error: null })
    try {
      // Créneaux de base
      let slots = generateDailySlots()

      // Exemple de filtre Supabase sur sessions pour exclure les créneaux déjà pris
      // const { data: sessions } = await supabase
      //   .from('sessions')
      //   .select('session_date')
      //   .gte('session_date', startOfDayISO)
      //   .lt('session_date', endOfDayISO)
      //   .eq('franchise_id', franchiseId)

      // Ici on laisse tous disponibles (données mock)
      slots = slots.map((s) => ({ ...s, isAvailable: true }))
      set({ availableSlots: slots })
    } catch (error) {
      set({ error: error instanceof Error ? error.message : 'Erreur chargement créneaux' })
    } finally {
      set({ isLoading: false })
    }
  },

  fetchAvailableCoaches: async (_date, _slot) => {
    set({ isLoading: true, error: null })
    try {
      // Exemple de récupération des coachs disponibles (availability JSONB)
      // const { data: coaches } = await supabase.from('coaches').select('*').eq('is_active', true)
      const coaches: Coach[] = [
        { id: '1', full_name: 'Sarah Dupont', specialties: ['Perte de poids'], rating: 4.8, isAvailable: true },
        { id: '2', full_name: 'Maxime Leroy', specialties: ['Renforcement'], rating: 4.6, isAvailable: true },
      ]
      set({ availableCoaches: coaches })
    } catch (error) {
      set({ error: error instanceof Error ? error.message : 'Erreur chargement coachs' })
    } finally {
      set({ isLoading: false })
    }
  },

  confirmBooking: async ({ userId, subscriptionId }) => {
    const { selectedDate, selectedSlot, selectedCoach, credits } = get()
    if (!selectedDate || !selectedSlot || !selectedCoach) {
      set({ error: 'Merci de sélectionner date, créneau et coach.' })
      throw new Error('Sélection incomplète')
    }
    if (credits <= 0) {
      set({ error: 'Crédits insuffisants.' })
      throw new Error('Crédits insuffisants')
    }

    set({ isLoading: true, error: null })
    try {
      const datetime = toDateTime(selectedDate, selectedSlot)

      // Création de la session
      await supabase.from('sessions').insert({
        user_id: userId,
        coach_id: selectedCoach,
        session_date: datetime,
        session_type: 'standard',
        status: 'scheduled',
      })

      // Décrément des crédits (si subscriptionId fourni)
      if (subscriptionId) {
        // TODO: décrémenter les crédits côté base (RPC ou UPDATE) quand l'endpoint sera disponible.
      }

      // Mise à jour locale
      set({
        credits: credits - 1,
        selectedDate: null,
        selectedSlot: null,
        selectedCoach: null,
      })
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Erreur lors de la réservation'
      set({ error: message })
      throw new Error(message)
    } finally {
      set({ isLoading: false })
    }
  },

  reset: () => set({ ...initialState }),
}))

