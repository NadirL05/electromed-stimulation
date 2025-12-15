import { useEffect, useState } from 'react'
import { Download, TrendingUp, Calendar, Award } from 'lucide-react'
import { Button } from '../../components/ui/Button'
import StatCard from '../../components/admin/StatCard'
import RevenueChart from '../../components/admin/RevenueChart'
import SessionsBarChart from '../../components/admin/SessionsBarChart'
import TopCoachesChart from '../../components/admin/TopCoachesChart'
import { useAuthStore } from '../../stores/authStore'
import { exportSessionsToCSV, getCoachesWithStats } from '../../lib/adminQueries'
import { supabase } from '../../lib/supabase'

interface MonthlyData {
  month: string
  revenue: number
  sessions: number
  confirmed: number
  cancelled: number
}

interface TopCoach {
  name: string
  sessions: number
  rating: number
}

export default function Analytics() {
  const { user } = useAuthStore()
  const [monthlyData, setMonthlyData] = useState<MonthlyData[]>([])
  const [topCoaches, setTopCoaches] = useState<TopCoach[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [dateRange, setDateRange] = useState({
    from: new Date(new Date().getFullYear(), 0, 1).toISOString().split('T')[0],
    to: new Date().toISOString().split('T')[0],
  })

  useEffect(() => {
    fetchAnalytics()
  }, [user, dateRange])

  const fetchAnalytics = async () => {
    if (!user) return

    try {
      const { data: franchise } = await supabase
        .from('franchises')
        .select('id')
        .eq('owner_id', user.id)
        .single()

      if (!franchise) return

      // Récupérer les revenus mensuels
      const { data: payments } = await supabase
        .from('payments')
        .select('amount, created_at')
        .eq('status', 'succeeded')
        .gte('created_at', dateRange.from)
        .lte('created_at', dateRange.to)

      // Récupérer les séances mensuelles avec statut
      const { data: sessions } = await supabase
        .from('sessions')
        .select('session_date, status')
        .eq('franchise_id', franchise.id)
        .gte('session_date', dateRange.from)
        .lte('session_date', dateRange.to)

      // Grouper par mois
      const monthlyMap = new Map<
        string,
        { revenue: number; sessions: number; confirmed: number; cancelled: number }
      >()

      payments?.forEach((payment) => {
        if (!payment.created_at) return // Ignorer les paiements sans date
        
        const monthKey = new Date(payment.created_at).toISOString().slice(0, 7) // YYYY-MM
        const monthLabel = new Date(payment.created_at).toLocaleDateString('fr-FR', {
          month: 'long',
          year: 'numeric',
        })
        const current = monthlyMap.get(monthKey) || {
          revenue: 0,
          sessions: 0,
          confirmed: 0,
          cancelled: 0,
          label: monthLabel,
        }
        monthlyMap.set(monthKey, { ...current, revenue: current.revenue + payment.amount })
      })

      sessions?.forEach((session) => {
        const monthKey = new Date(session.session_date).toISOString().slice(0, 7)
        const monthLabel = new Date(session.session_date).toLocaleDateString('fr-FR', {
          month: 'long',
          year: 'numeric',
        })
        const current = monthlyMap.get(monthKey) || {
          revenue: 0,
          sessions: 0,
          confirmed: 0,
          cancelled: 0,
          label: monthLabel,
        }
        monthlyMap.set(monthKey, {
          ...current,
          sessions: current.sessions + 1,
          confirmed: session.status === 'confirmed' ? current.confirmed + 1 : current.confirmed,
          cancelled: session.status === 'cancelled' ? current.cancelled + 1 : current.cancelled,
        })
      })

      const data: MonthlyData[] = Array.from(monthlyMap.entries()).map(([monthKey, stats]) => ({
        month: monthKey,
        revenue: stats.revenue,
        sessions: stats.sessions,
        confirmed: stats.confirmed,
        cancelled: stats.cancelled,
      }))

      setMonthlyData(data.sort((a, b) => a.month.localeCompare(b.month)))

      // Récupérer les top coachs
      const coachesData = await getCoachesWithStats(franchise.id)
      const topCoachesData: TopCoach[] = coachesData
        .filter((c) => c.total_sessions > 0)
        .map((coach) => ({
          name: coach.full_name,
          sessions: coach.total_sessions,
          rating: coach.rating,
        }))
        .sort((a, b) => b.sessions - a.sessions)
        .slice(0, 5)

      setTopCoaches(topCoachesData)
    } catch (error) {
      console.error('Erreur lors du chargement des analytics:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleExportCSV = async () => {
    if (!user) return

    try {
      const { data: franchise } = await supabase
        .from('franchises')
        .select('id')
        .eq('owner_id', user.id)
        .single()

      if (!franchise) return

      const csvContent = await exportSessionsToCSV(franchise.id, dateRange.from, dateRange.to)

      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
      const link = document.createElement('a')
      const url = URL.createObjectURL(blob)
      link.setAttribute('href', url)
      link.setAttribute('download', `sessions_${dateRange.from}_${dateRange.to}.csv`)
      link.style.visibility = 'hidden'
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    } catch (error) {
      console.error('Erreur lors de l\'export:', error)
      alert('Erreur lors de l\'export CSV')
    }
  }

  const totalRevenue = monthlyData.reduce((sum, m) => sum + m.revenue, 0)
  const totalSessions = monthlyData.reduce((sum, m) => sum + m.sessions, 0)

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
          <h1 className="text-3xl font-bold text-white">Analytics</h1>
          <p className="mt-1 text-zinc-400">Analysez les performances de votre franchise</p>
        </div>
        <Button variant="secondary" onClick={handleExportCSV}>
          <Download className="mr-2 h-4 w-4" />
          Exporter CSV
        </Button>
      </div>

      {/* Date Range */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <div>
          <label className="mb-2 block text-sm font-medium text-zinc-300">Date de début</label>
          <input
            type="date"
            value={dateRange.from}
            onChange={(e) => setDateRange({ ...dateRange, from: e.target.value })}
            className="w-full rounded-lg border border-zinc-700 bg-zinc-900/50 px-4 py-2 text-white focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500/20"
          />
        </div>
        <div>
          <label className="mb-2 block text-sm font-medium text-zinc-300">Date de fin</label>
          <input
            type="date"
            value={dateRange.to}
            onChange={(e) => setDateRange({ ...dateRange, to: e.target.value })}
            className="w-full rounded-lg border border-zinc-700 bg-zinc-900/50 px-4 py-2 text-white focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500/20"
          />
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <StatCard
          icon={TrendingUp}
          label="Revenus totaux"
          value={`${totalRevenue.toFixed(2)} €`}
          color="green"
        />
        <StatCard
          icon={Calendar}
          label="Total séances"
          value={totalSessions}
          color="orange"
        />
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Revenue Chart */}
        <div className="rounded-xl border border-white/5 bg-zinc-800/50 p-6">
          <h2 className="mb-4 text-xl font-semibold text-white">Évolution des revenus et séances</h2>
          {monthlyData.length === 0 ? (
            <div className="flex h-[300px] items-center justify-center">
              <p className="text-zinc-400">Aucune donnée pour cette période</p>
            </div>
          ) : (
            <RevenueChart data={monthlyData} />
          )}
        </div>

        {/* Sessions Status Chart */}
        <div className="rounded-xl border border-white/5 bg-zinc-800/50 p-6">
          <h2 className="mb-4 text-xl font-semibold text-white">Statut des séances</h2>
          {monthlyData.length === 0 ? (
            <div className="flex h-[300px] items-center justify-center">
              <p className="text-zinc-400">Aucune donnée pour cette période</p>
            </div>
          ) : (
            <SessionsBarChart data={monthlyData} />
          )}
        </div>
      </div>

      {/* Top Coaches */}
      <div className="rounded-xl border border-white/5 bg-zinc-800/50 p-6">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-white">Top 5 Coachs</h2>
          <Award className="h-5 w-5 text-orange-500" />
        </div>
        {topCoaches.length === 0 ? (
          <div className="flex h-[300px] items-center justify-center">
            <p className="text-zinc-400">Aucun coach avec des séances</p>
          </div>
        ) : (
          <TopCoachesChart data={topCoaches} />
        )}
      </div>
    </div>
  )
}

