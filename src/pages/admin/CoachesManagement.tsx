import { useEffect, useState } from 'react'
import { Plus } from 'lucide-react'
import { Button } from '../../components/ui/Button'
import DataTable from '../../components/admin/DataTable'
import AddCoachModal from '../../components/admin/AddCoachModal'
import { useAuthStore } from '../../stores/authStore'
import { getCoachesWithStats } from '../../lib/adminQueries'
import { supabase } from '../../lib/supabase'
import type { CoachWithStats } from '../../lib/adminQueries'

export default function CoachesManagement() {
  const { user } = useAuthStore()
  const [coaches, setCoaches] = useState<CoachWithStats[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedCoach, setSelectedCoach] = useState<string | null>(null)

  useEffect(() => {
    fetchCoaches()
  }, [user])

  const fetchCoaches = async () => {
    if (!user) return

    try {
      const { data: franchise } = await supabase
        .from('franchises')
        .select('id')
        .eq('owner_id', user.id)
        .single()

      if (!franchise) return

      const coachesData = await getCoachesWithStats(franchise.id)
      setCoaches(coachesData)
    } catch (error) {
      console.error('Erreur lors du chargement des coachs:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleDelete = async (coach: CoachWithStats) => {
    if (!confirm(`Êtes-vous sûr de vouloir supprimer ${coach.full_name} ?`)) return

    try {
      const { error } = await supabase.from('coaches').update({ is_active: false }).eq('id', coach.id)

      if (error) throw error

      await fetchCoaches()
    } catch (error) {
      console.error('Erreur lors de la suppression:', error)
      alert('Erreur lors de la suppression du coach')
    }
  }

  const columns = [
    {
      key: 'full_name',
      label: 'Nom',
      sortable: true,
    },
    {
      key: 'email',
      label: 'Email',
      sortable: true,
    },
    {
      key: 'total_sessions',
      label: 'Séances',
      sortable: true,
      render: (value: number) => <span className="text-zinc-300">{value}</span>,
    },
    {
      key: 'rating',
      label: 'Note',
      sortable: true,
      render: (value: number) => (
        <span className="text-orange-400">{value > 0 ? value.toFixed(1) : 'N/A'}</span>
      ),
    },
    {
      key: 'is_active',
      label: 'Statut',
      sortable: true,
      render: (value: boolean) => (
        <span
          className={`rounded-full px-2 py-1 text-xs font-medium ${
            value
              ? 'bg-green-500/20 text-green-400'
              : 'bg-red-500/20 text-red-400'
          }`}
        >
          {value ? 'Actif' : 'Inactif'}
        </span>
      ),
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
          <h1 className="text-3xl font-bold text-white">Gestion des coachs</h1>
          <p className="mt-1 text-zinc-400">Gérez vos coachs et leurs disponibilités</p>
        </div>
        <Button onClick={() => setIsModalOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Ajouter un coach
        </Button>
      </div>

      <DataTable
        data={coaches}
        columns={columns}
        onEdit={(coach) => {
          setSelectedCoach(coach.id)
          setIsModalOpen(true)
        }}
        onDelete={handleDelete}
      />

      <AddCoachModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false)
          setSelectedCoach(null)
        }}
        onSuccess={fetchCoaches}
        coachId={selectedCoach || undefined}
      />
    </div>
  )
}

