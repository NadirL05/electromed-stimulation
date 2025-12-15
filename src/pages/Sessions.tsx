import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { CalendarDays, Clock, CheckCircle2, XCircle, Filter, Plus, MapPin } from 'lucide-react'
import { Button } from '../components/ui/Button'

type SessionStatus = 'upcoming' | 'completed' | 'cancelled'

const mockSessions = [
  { id: '1', coach: 'Sarah Martin', date: "Aujourd'hui", time: '16:00', duration: 20, status: 'upcoming' as SessionStatus, location: 'Centre Paris 8e' },
  { id: '2', coach: 'Max Dupont', date: 'Demain', time: '10:00', duration: 20, status: 'upcoming' as SessionStatus, location: 'Centre Paris 8e' },
  { id: '3', coach: 'Sarah Martin', date: 'Vendredi', time: '14:00', duration: 30, status: 'upcoming' as SessionStatus, location: 'Centre Paris 16e' },
  { id: '4', coach: 'Max Dupont', date: '10 Déc', time: '11:00', duration: 20, status: 'completed' as SessionStatus, location: 'Centre Paris 8e' },
  { id: '5', coach: 'Sarah Martin', date: '8 Déc', time: '09:00', duration: 20, status: 'completed' as SessionStatus, location: 'Centre Paris 8e' },
  { id: '6', coach: 'Sarah Martin', date: '5 Déc', time: '15:00', duration: 20, status: 'cancelled' as SessionStatus, location: 'Centre Paris 16e' },
]

export default function Sessions() {
  const navigate = useNavigate()
  const [filter, setFilter] = useState<'all' | SessionStatus>('all')

  const filteredSessions = filter === 'all' 
    ? mockSessions 
    : mockSessions.filter(s => s.status === filter)

  const statusConfig = {
    upcoming: { label: 'À venir', icon: Clock, bg: 'bg-blue-500/10', text: 'text-blue-400' },
    completed: { label: 'Terminée', icon: CheckCircle2, bg: 'bg-emerald-500/10', text: 'text-emerald-400' },
    cancelled: { label: 'Annulée', icon: XCircle, bg: 'bg-red-500/10', text: 'text-red-400' },
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Mes séances</h1>
          <p className="mt-1 text-sm text-zinc-400">Gérez vos réservations et consultez votre historique</p>
        </div>
        <Button onClick={() => navigate('/dashboard/booking')}>
          <Plus className="h-4 w-4" />
          Nouvelle séance
        </Button>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2">
        <button className="flex items-center gap-2 rounded-lg bg-zinc-800 px-3 py-2 text-sm text-zinc-400">
          <Filter className="h-4 w-4" />
          Filtrer
        </button>
        {(['all', 'upcoming', 'completed', 'cancelled'] as const).map((status) => (
          <button
            key={status}
            onClick={() => setFilter(status)}
            className={`whitespace-nowrap rounded-lg px-4 py-2 text-sm font-medium transition ${
              filter === status
                ? 'bg-orange-500 text-white'
                : 'bg-zinc-800/50 text-zinc-400 hover:bg-zinc-800 hover:text-white'
            }`}
          >
            {status === 'all' ? 'Toutes' : statusConfig[status].label}
          </button>
        ))}
      </div>

      {/* Stats summary */}
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-xl bg-zinc-800/50 p-4">
          <p className="text-sm text-zinc-400">Séances à venir</p>
          <p className="mt-1 text-2xl font-bold text-white">{mockSessions.filter(s => s.status === 'upcoming').length}</p>
        </div>
        <div className="rounded-xl bg-zinc-800/50 p-4">
          <p className="text-sm text-zinc-400">Séances ce mois</p>
          <p className="mt-1 text-2xl font-bold text-white">{mockSessions.filter(s => s.status === 'completed').length}</p>
        </div>
        <div className="rounded-xl bg-zinc-800/50 p-4">
          <p className="text-sm text-zinc-400">Temps total</p>
          <p className="mt-1 text-2xl font-bold text-white">2h 40min</p>
        </div>
      </div>

      {/* Sessions list */}
      <div className="space-y-3">
        {filteredSessions.length === 0 ? (
          <div className="rounded-2xl border border-white/5 bg-zinc-800/50 p-12 text-center">
            <CalendarDays className="mx-auto h-12 w-12 text-zinc-600" />
            <p className="mt-4 text-zinc-400">Aucune séance trouvée</p>
            <Button variant="secondary" className="mt-4" onClick={() => navigate('/dashboard/booking')}>
              Réserver une séance
            </Button>
          </div>
        ) : (
          filteredSessions.map((session) => {
            const config = statusConfig[session.status]
            const StatusIcon = config.icon
            return (
              <div 
                key={session.id}
                className="group flex flex-col gap-4 rounded-2xl border border-white/5 bg-zinc-800/50 p-5 transition-all hover:border-white/10 hover:bg-zinc-800 sm:flex-row sm:items-center sm:justify-between"
              >
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-orange-500/20 to-orange-600/10">
                    <CalendarDays className="h-6 w-6 text-orange-400" />
                  </div>
                  <div>
                    <p className="font-semibold text-white">Séance avec {session.coach}</p>
                    <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-zinc-500">
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {session.date} • {session.time} • {session.duration} min
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        {session.location}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium ${config.bg} ${config.text}`}>
                    <StatusIcon className="h-3.5 w-3.5" />
                    {config.label}
                  </span>
                  {session.status === 'upcoming' && (
                    <Button variant="ghost" size="sm" className="text-zinc-400 hover:text-red-400">
                      Annuler
                    </Button>
                  )}
                </div>
              </div>
            )
          })
        )}
      </div>
    </div>
  )
}



