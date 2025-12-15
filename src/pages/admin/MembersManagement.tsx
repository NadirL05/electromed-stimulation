import { useEffect, useState } from 'react'
import { Search, CreditCard } from 'lucide-react'
import DataTable from '../../components/admin/DataTable'
import { Button } from '../../components/ui/Button'
import { Input } from '../../components/ui/Input'
import { useAuthStore } from '../../stores/authStore'
import { supabase } from '../../lib/supabase'

interface Member {
  id: string
  full_name: string
  email: string
  phone: string
  credits: number
  total_sessions: number
  last_session: string | null
}

export default function MembersManagement() {
  const { user } = useAuthStore()
  const [members, setMembers] = useState<Member[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [selectedMember, setSelectedMember] = useState<Member | null>(null)
  const [creditsToAdd, setCreditsToAdd] = useState('')

  useEffect(() => {
    fetchMembers()
  }, [user])

  const fetchMembers = async () => {
    if (!user) return

    try {
      const { data: franchise } = await supabase
        .from('franchises')
        .select('id')
        .eq('owner_id', user.id)
        .single()

      if (!franchise) return

      // Récupérer tous les membres qui ont eu une séance dans cette franchise
      const { data: sessions } = await supabase
        .from('sessions')
        .select('user_id')
        .eq('franchise_id', franchise.id)

      const userIds = [
        ...new Set(
          sessions
            ?.map((s) => s.user_id)
            .filter((id): id is string => id !== null) || []
        ),
      ]

      if (userIds.length === 0) {
        setMembers([])
        setIsLoading(false)
        return
      }

      const { data: profiles } = await supabase
        .from('user_profiles')
        .select('id, full_name, phone, credits, email')
        .in('id', userIds)

      // Récupérer les stats de séances par membre
      const membersWithStats: Member[] = await Promise.all(
        (profiles || []).map(async (profile) => {
          const { data: memberSessions } = await supabase
            .from('sessions')
            .select('session_date')
            .eq('user_id', profile.id)
            .eq('franchise_id', franchise.id)
            .order('session_date', { ascending: false })
            .limit(1)

          return {
            id: profile.id,
            full_name: profile.full_name || 'N/A',
            email: profile.email || 'Email non disponible',
            phone: profile.phone || '',
            credits: profile.credits || 0,
            total_sessions: memberSessions?.length || 0,
            last_session: memberSessions?.[0]?.session_date || null,
          }
        })
      )

      setMembers(membersWithStats)
    } catch (error) {
      console.error('Erreur lors du chargement des membres:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleAddCredits = async () => {
    if (!selectedMember || !creditsToAdd) return

    const credits = parseInt(creditsToAdd, 10)
    if (isNaN(credits) || credits <= 0) {
      alert('Veuillez entrer un nombre valide')
      return
    }

    try {
      const { data: currentProfile } = await supabase
        .from('user_profiles')
        .select('credits')
        .eq('id', selectedMember.id)
        .single()

      const newCredits = (currentProfile?.credits || 0) + credits

      const { error } = await supabase
        .from('user_profiles')
        .update({ credits: newCredits })
        .eq('id', selectedMember.id)

      if (error) throw error

      setSelectedMember(null)
      setCreditsToAdd('')
      await fetchMembers()
      alert(`Crédits ajoutés avec succès !`)
    } catch (error) {
      console.error('Erreur lors de l\'ajout de crédits:', error)
      alert('Erreur lors de l\'ajout de crédits')
    }
  }

  const filteredMembers = members.filter(
    (member) =>
      member.full_name.toLowerCase().includes(search.toLowerCase()) ||
      member.email.toLowerCase().includes(search.toLowerCase())
  )

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
      key: 'phone',
      label: 'Téléphone',
      sortable: false,
      render: (value: string) => <span className="text-zinc-300">{value || 'N/A'}</span>,
    },
    {
      key: 'credits',
      label: 'Crédits',
      sortable: true,
      render: (value: number) => (
        <span className={`font-semibold ${value > 0 ? 'text-green-400' : 'text-red-400'}`}>
          {value}
        </span>
      ),
    },
    {
      key: 'total_sessions',
      label: 'Séances',
      sortable: true,
      render: (value: number) => <span className="text-zinc-300">{value}</span>,
    },
    {
      key: 'last_session',
      label: 'Dernière séance',
      sortable: true,
      render: (value: string | null) => (
        <span className="text-zinc-300">
          {value ? new Date(value).toLocaleDateString('fr-FR') : 'Jamais'}
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
          <h1 className="text-3xl font-bold text-white">Gestion des membres</h1>
          <p className="mt-1 text-zinc-400">Gérez les membres et leurs crédits</p>
        </div>
      </div>

      <div className="flex gap-4">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-zinc-400" />
            <input
              type="text"
              placeholder="Rechercher par nom ou email..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-lg border border-zinc-700 bg-zinc-900/50 px-10 py-2 text-white placeholder-zinc-500 focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500/20"
            />
          </div>
        </div>
      </div>

      <DataTable
        data={filteredMembers}
        columns={columns}
        searchable={false}
        onEdit={(member) => setSelectedMember(member as Member)}
        actions={true}
      />

      {/* Modal pour ajouter des crédits */}
      {selectedMember && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-xl border border-white/10 bg-zinc-900 p-6 shadow-2xl">
            <h2 className="mb-4 text-xl font-bold text-white">
              Ajouter des crédits à {selectedMember.full_name}
            </h2>
            <div className="space-y-4">
              <div>
                <p className="mb-2 text-sm text-zinc-400">Crédits actuels: {selectedMember.credits}</p>
                <Input
                  label="Nombre de crédits à ajouter"
                  type="number"
                  value={creditsToAdd}
                  onChange={(e) => setCreditsToAdd(e.target.value)}
                  placeholder="Ex: 10"
                />
              </div>
              <div className="flex justify-end gap-3">
                <Button
                  variant="secondary"
                  onClick={() => {
                    setSelectedMember(null)
                    setCreditsToAdd('')
                  }}
                >
                  Annuler
                </Button>
                <Button onClick={handleAddCredits}>
                  <CreditCard className="mr-2 h-4 w-4" />
                  Ajouter
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

