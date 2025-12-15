export interface Coach {
  id: string
  full_name: string
  avatar_url?: string
  specialties?: string[]
  rating?: number
  isAvailable?: boolean
}

export interface Slot {
  value: string // ex: "09:00 - 10:00"
  isAvailable: boolean
}

export interface BookingState {
  selectedDate: Date | null
  selectedSlot: string | null
  selectedCoach: string | null
  availableSlots: Slot[]
  availableCoaches: Coach[]
  credits: number
  isLoading: boolean
  error: string | null
}

