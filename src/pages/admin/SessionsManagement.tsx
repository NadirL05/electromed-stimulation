import { useEffect, useState } from 'react'
import { Calendar, Filter, X } from 'lucide-react'
import DataTable from '../../components/admin/DataTable'
import { Button } from '../../components/ui/Button'
import { useAuthStore } from '../../stores/authStore'
import { supabase } from '../../lib/supabase'

interface Session {
  id: string
  session_date: string
  status: string | null
  session_type: string | null
  duration_minutes: number | null
  user_name: string
  user_email: string
  coach_name: string
}

export default function SessionsManagement() {
  const { user } = useAuthStore()
  const [sessions, setSessions] = useState<Session[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [filters, setFilters] = useState({
    dateFrom: '',
    dateTo: '',
    status: '',
    coach: '',
  })
  const [showFilters, setShowFilters] = useState(false)

  useEffect(() => {
    fetchSessions()
  }, [user, filters])

  const fetchSessions = async () => {
    if (!user) return

    try {
      const { data: franchise } = await supabase
        .from('franchises')
        .select('id')
        .eq('owner_id', user.id)
        .single()

      if (!franchise) return

      let query = supabase
        .from('sessions')
        .select(`
          id,
          session_date,
          status,
          session_type,
          duration_minutes,
          user_profiles!sessions_user_id_fkey (full_name, email),
          coaches!sessions_coach_id_fkey (
            user_profiles!coaches_user_id_fkey (full_name)
          )
        `)
        .eq('franchise_id', franchise.id)
        .order('session_date', { ascending: false })

      if (filters.dateFrom) {
        query = query.gte('session_date', filters.dateFrom)
      }
      if (filters.dateTo) {
        query = query.lte('session_date', filters.dateTo)
      }
      if (filters.status) {
        query = query.eq('status', filters.status)
      }

      const { data, error } = await query

      if (error) throw error

      const formattedSessions: Session[] =
        data?.map((session) => ({
          id: session.id,
          session_date: session.session_date,
          status: session.status || 'pending',
          session_type: session.session_type || 'standard',
          duration_minutes: session.duration_minutes || 30,
          user_name: (session.user_profiles as any)?.full_name || 'N/A',
          user_email: (session.user_profiles as any)?.email || 'N/A',
          coach_name: (session.coaches as any)?.user_profiles?.full_name || 'N/A',
        })) || []

      setSessions(formattedSessions)
    } catch (error) {
      console.error('Erreur lors du chargement des séances:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleCancel = async (session: Session) => {
    if (!confirm(`Annuler la séance du ${new Date(session.session_date).toLocaleDateString('fr-FR')} ?`))
      return

    try {
      const { error } = await supabase
        .from('sessions')
        .update({ status: 'cancelled' })
        .eq('id', session.id)

      if (error) throw error

      await fetchSessions()
    } catch (error) {
      console.error('Erreur lors de l\'annulation:', error)
      alert('Erreur lors de l\'annulation de la séance')
    }
  }

  const columns = [
    {
      key: 'session_date',
      label: 'Date',
      sortable: true,
      render: (value: string) => (
        <span className="text-zinc-300">
          {new Date(value).toLocaleDateString('fr-FR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
          })}
        </span>
      ),
    },
    {
      key: 'user_name',
      label: 'Membre',
      sortable: true,
    },
    {
      key: 'coach_name',
      label: 'Coach',
      sortable: true,
    },
    {
      key: 'session_type',
      label: 'Type',
      sortable: true,
    },
    {
      key: 'duration_minutes',
      label: 'Durée',
      sortable: true,
      render: (value: number) => <span className="text-zinc-300">{value} min</span>,
    },
    {
      key: 'status',
      label: 'Statut',
      sortable: true,
      render: (value: string) => {
        const statusColors: Record<string, string> = {
          confirmed: 'bg-green-500/20 text-green-400',
          pending: 'bg-yellow-500/20 text-yellow-400',
          cancelled: 'bg-red-500/20 text-red-400',
          completed: 'bg-blue-500/20 text-blue-400',
        }
        const statusLabels: Record<string, string> = {
          confirmed: 'Confirmée',
          pending: 'En attente',
          cancelled: 'Annulée',
          completed: 'Terminée',
        }
        return (
          <span
            className={`rounded-full px-2 py-1 text-xs font-medium ${
              statusColors[value] || 'bg-zinc-500/20 text-zinc-400'
            }`}
          >
            {statusLabels[value] || value}
          </span>
        )
      },
    },
  ]

  if (isLoading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="text-zinc-400">Chargement...</div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Gestion des séances</h1>
          <p className="mt-1 text-zinc-400">Gérez toutes les séances de votre franchise</p>
        </div>
        <Button variant="secondary" onClick={() => setShowFilters(!showFilters)}>
          <Filter className="mr-2 h-4 w-4" />
          Filtres
        </Button>
      </div>

      {showFilters && (
        <div className="rounded-xl border border-white/5 bg-zinc-800/50 p-4">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
            <div>
              <label className="mb-2 block text-sm font-medium text-zinc-300">Date de début</label>
              <input
                type="date"
                value={filters.dateFrom}
                onChange={(e) => setFilters({ ...filters, dateFrom: e.target.value })}
                className="w-full rounded-lg border border-zinc-700 bg-zinc-900/50 px-4 py-2 text-white focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500/20"
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-zinc-300">Date de fin</label>
              <input
                type="date"
                value={filters.dateTo}
                onChange={(e) => setFilters({ ...filters, dateTo: e.target.value })}
                className="w-full rounded-lg border border-zinc-700 bg-zinc-900/50 px-4 py-2 text-white focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500/20"
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-zinc-300">Statut</label>
              <select
                value={filters.status}
                onChange={(e) => setFilters({ ...filters, status: e.target.value })}
                className="w-full rounded-lg border border-zinc-700 bg-zinc-900/50 px-4 py-2 text-white focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500/20"
              >
                <option value="">Tous</option>
                <option value="confirmed">Confirmée</option>
                <option value="pending">En attente</option>
                <option value="cancelled">Annulée</option>
                <option value="completed">Terminée</option>
              </select>
            </div>
            <div className="flex items-end">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setFilters({ dateFrom: '', dateTo: '', status: '', coach: '' })}
                className="w-full"
              >
                <X className="mr-2 h-4 w-4" />
                Réinitialiser
              </Button>
            </div>
          </div>
        </div>
      )}

      <DataTable
        data={sessions}
        columns={columns}
        onDelete={handleCancel}
        actions={true}
      />
    </div>
  )
}

