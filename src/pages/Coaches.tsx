import { useState } from 'react'
import { Badge } from '../components/ui/Badge'
import { Avatar } from '../components/ui/Avatar'
import { Button } from '../components/ui/Button'
import { 
  Star, 
  Users, 
  Calendar, 
  Clock, 
  Award, 
  ChevronRight, 
  Search,
  Filter,
  Dumbbell,
  Heart,
  Scale,
  Activity
} from 'lucide-react'
import { useNavigate } from 'react-router-dom'

interface Coach {
  id: string
  name: string
  specialty: string
  specialtyIcon: typeof Dumbbell
  bio: string
  rating: number
  reviewCount: number
  sessionsCount: number
  experience: string
  availability: string
  status: 'available' | 'busy' | 'offline'
}

const mockCoaches: Coach[] = [
  {
    id: '1',
    name: 'Sarah Dupont',
    specialty: 'Perte de poids',
    specialtyIcon: Scale,
    bio: 'Spécialisée en programmes minceur et rééquilibrage métabolique. 5 ans d\'expérience en EMS.',
    rating: 4.9,
    reviewCount: 127,
    sessionsCount: 1250,
    experience: '5 ans',
    availability: 'Lun-Ven 8h-18h',
    status: 'available',
  },
  {
    id: '2',
    name: 'Maxime Leroy',
    specialty: 'Renforcement musculaire',
    specialtyIcon: Dumbbell,
    bio: 'Expert en renforcement et performance sportive. Ancien préparateur physique.',
    rating: 4.8,
    reviewCount: 89,
    sessionsCount: 980,
    experience: '7 ans',
    availability: 'Mar-Sam 9h-19h',
    status: 'available',
  },
  {
    id: '3',
    name: 'Julie Martin',
    specialty: 'Récupération sportive',
    specialtyIcon: Activity,
    bio: 'Kinésithérapeute reconvertie. Protocoles de récupération et prévention des blessures.',
    rating: 5.0,
    reviewCount: 64,
    sessionsCount: 720,
    experience: '4 ans',
    availability: 'Lun-Ven 10h-20h',
    status: 'busy',
  },
  {
    id: '4',
    name: 'Thomas Bernard',
    specialty: 'Bien-être & posture',
    specialtyIcon: Heart,
    bio: 'Coach holistique. Approche douce pour seniors et personnes en rééducation.',
    rating: 4.7,
    reviewCount: 52,
    sessionsCount: 540,
    experience: '3 ans',
    availability: 'Mer-Dim 8h-16h',
    status: 'offline',
  },
]

const statusConfig = {
  available: { label: 'Disponible', variant: 'success' as const, color: 'bg-emerald-500' },
  busy: { label: 'En séance', variant: 'warning' as const, color: 'bg-amber-500' },
  offline: { label: 'Indisponible', variant: 'default' as const, color: 'bg-zinc-500' },
}

export default function Coaches() {
  const navigate = useNavigate()
  const [search, setSearch] = useState('')
  const [selectedSpecialty, setSelectedSpecialty] = useState<string | null>(null)

  const specialties = [...new Set(mockCoaches.map(c => c.specialty))]

  const filteredCoaches = mockCoaches.filter(coach => {
    const matchesSearch = coach.name.toLowerCase().includes(search.toLowerCase()) ||
                          coach.specialty.toLowerCase().includes(search.toLowerCase())
    const matchesSpecialty = !selectedSpecialty || coach.specialty === selectedSpecialty
    return matchesSearch && matchesSpecialty
  })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Nos coachs</h1>
          <p className="mt-1 text-sm text-zinc-400">
            Découvrez notre équipe de coachs certifiés en électrostimulation
          </p>
        </div>
        <div className="flex items-center gap-3 rounded-xl bg-zinc-800/50 px-4 py-3">
          <Users className="h-5 w-5 text-orange-400" />
          <div>
            <p className="text-2xl font-bold text-white">{mockCoaches.length}</p>
            <p className="text-xs text-zinc-500">coachs actifs</p>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500" />
          <input
            type="text"
            placeholder="Rechercher un coach..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-xl border border-white/10 bg-zinc-800/50 py-3 pl-10 pr-4 text-sm text-white placeholder-zinc-500 focus:border-orange-500/50 focus:outline-none focus:ring-2 focus:ring-orange-500/20"
          />
        </div>
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-zinc-500" />
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedSpecialty(null)}
              className={`rounded-full px-3 py-1.5 text-xs font-medium transition ${
                !selectedSpecialty 
                  ? 'bg-orange-500 text-white' 
                  : 'bg-zinc-800 text-zinc-400 hover:text-white'
              }`}
            >
              Tous
            </button>
            {specialties.map(specialty => (
              <button
                key={specialty}
                onClick={() => setSelectedSpecialty(specialty)}
                className={`rounded-full px-3 py-1.5 text-xs font-medium transition ${
                  selectedSpecialty === specialty 
                    ? 'bg-orange-500 text-white' 
                    : 'bg-zinc-800 text-zinc-400 hover:text-white'
                }`}
              >
                {specialty}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Coaches grid */}
      <div className="grid gap-4 md:grid-cols-2">
        {filteredCoaches.map((coach) => {
          const Icon = coach.specialtyIcon
          const status = statusConfig[coach.status]
          return (
            <div
              key={coach.id}
              className="group relative overflow-hidden rounded-2xl border border-white/5 bg-zinc-800/50 p-5 transition hover:border-white/10 hover:bg-zinc-800"
            >
              {/* Status indicator */}
              <div className="absolute right-4 top-4">
                <div className="flex items-center gap-2">
                  <span className={`h-2 w-2 rounded-full ${status.color} animate-pulse`} />
                  <Badge variant={status.variant}>{status.label}</Badge>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Avatar name={coach.name} size="lg" />
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-semibold text-white">{coach.name}</h3>
                  <div className="mt-1 flex items-center gap-2">
                    <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-orange-500/10">
                      <Icon className="h-3.5 w-3.5 text-orange-400" />
                    </div>
                    <span className="text-sm text-zinc-400">{coach.specialty}</span>
                  </div>
                </div>
              </div>

              <p className="mt-4 text-sm text-zinc-400 line-clamp-2">{coach.bio}</p>

              {/* Stats */}
              <div className="mt-4 grid grid-cols-3 gap-3 border-t border-white/5 pt-4">
                <div className="text-center">
                  <div className="flex items-center justify-center gap-1">
                    <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                    <span className="font-semibold text-white">{coach.rating}</span>
                  </div>
                  <p className="text-xs text-zinc-500">{coach.reviewCount} avis</p>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center gap-1">
                    <Calendar className="h-4 w-4 text-emerald-400" />
                    <span className="font-semibold text-white">{coach.sessionsCount}</span>
                  </div>
                  <p className="text-xs text-zinc-500">séances</p>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center gap-1">
                    <Award className="h-4 w-4 text-blue-400" />
                    <span className="font-semibold text-white">{coach.experience}</span>
                  </div>
                  <p className="text-xs text-zinc-500">expérience</p>
                </div>
              </div>

              {/* Availability */}
              <div className="mt-4 flex items-center gap-2 text-xs text-zinc-500">
                <Clock className="h-3.5 w-3.5" />
                <span>{coach.availability}</span>
              </div>

              {/* Action */}
              <Button
                size="sm"
                className="mt-4 w-full"
                onClick={() => navigate('/dashboard/booking')}
                disabled={coach.status !== 'available'}
              >
                Réserver avec {coach.name.split(' ')[0]}
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          )
        })}
      </div>

      {/* Empty state */}
      {filteredCoaches.length === 0 && (
        <div className="rounded-2xl border border-white/5 bg-zinc-800/50 p-12 text-center">
          <Users className="mx-auto h-12 w-12 text-zinc-600" />
          <h3 className="mt-4 text-lg font-semibold text-white">Aucun coach trouvé</h3>
          <p className="mt-2 text-sm text-zinc-400">
            Essayez de modifier vos critères de recherche
          </p>
          <Button 
            variant="secondary" 
            size="sm" 
            className="mt-4"
            onClick={() => { setSearch(''); setSelectedSpecialty(null) }}
          >
            Réinitialiser les filtres
          </Button>
        </div>
      )}
    </div>
  )
}



