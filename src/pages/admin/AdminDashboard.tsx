import { useEffect, useState } from 'react'
import { DollarSign, Calendar, Users, TrendingUp, Plus, ArrowRight } from 'lucide-react'
import StatCard from '../../components/admin/StatCard'
import RevenueChart from '../../components/admin/RevenueChart'
import { Button } from '../../components/ui/Button'
import { useAuthStore } from '../../stores/authStore'
import { getDashboardStats } from '../../lib/adminQueries'
import { supabase } from '../../lib/supabase'
import { useNavigate } from 'react-router-dom'

interface MonthlyChartData {
  month: string
  revenue: number
  sessions: number
}

export default function AdminDashboard() {
  const { user } = useAuthStore()
  const navigate = useNavigate()
  const [stats, setStats] = useState({
    totalRevenue: 0,
    totalSessions: 0,
    activeMembers: 0,
    occupancyRate: 0,
    revenueTrend: 0,
    sessionsTrend: 0,
  })
  const [chartData, setChartData] = useState<MonthlyChartData[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchStats = async () => {
      if (!user) return

      try {
        // Récupérer la franchise du propriétaire
        const { data: franchise } = await supabase
          .from('franchises')
          .select('id')
          .eq('owner_id', user.id)
          .single()

        if (!franchise) {
          console.error('Franchise non trouvée')
          return
        }

        const dashboardStats = await getDashboardStats(franchise.id)
        setStats(dashboardStats)

        // Récupérer les données pour le graphique (6 derniers mois)
        const sixMonthsAgo = new Date()
        sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6)

        const { data: payments } = await supabase
          .from('payments')
          .select('amount, created_at')
          .eq('status', 'succeeded')
          .gte('created_at', sixMonthsAgo.toISOString())

        const { data: sessions } = await supabase
          .from('sessions')
          .select('session_date')
          .eq('franchise_id', franchise.id)
          .gte('session_date', sixMonthsAgo.toISOString())

        const monthlyMap = new Map<string, { revenue: number; sessions: number }>()

        payments?.forEach((payment) => {
          const monthKey = new Date(payment.created_at || Date.now()).toISOString().slice(0, 7)
          const current = monthlyMap.get(monthKey) || { revenue: 0, sessions: 0 }
          monthlyMap.set(monthKey, { ...current, revenue: current.revenue + payment.amount })
        })

        sessions?.forEach((session) => {
          const monthKey = new Date(session.session_date).toISOString().slice(0, 7)
          const current = monthlyMap.get(monthKey) || { revenue: 0, sessions: 0 }
          monthlyMap.set(monthKey, { ...current, sessions: current.sessions + 1 })
        })

        const chartDataArray: MonthlyChartData[] = Array.from(monthlyMap.entries())
          .map(([month, stats]) => ({
            month,
            revenue: stats.revenue,
            sessions: stats.sessions,
          }))
          .sort((a, b) => a.month.localeCompare(b.month))

        setChartData(chartDataArray)
      } catch (error) {
        console.error('Erreur lors du chargement des stats:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchStats()
  }, [user])

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
          <h1 className="text-3xl font-bold text-white">Vue d'ensemble</h1>
          <p className="mt-1 text-zinc-400">Statistiques de votre franchise</p>
        </div>
        <div className="flex gap-3">
          <Button onClick={() => navigate('/admin/coaches')}>
            <Plus className="mr-2 h-4 w-4" />
            Ajouter un coach
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          icon={DollarSign}
          label="Revenus ce mois"
          value={`${stats.totalRevenue.toFixed(2)} €`}
          trend={{
            value: Math.abs(stats.revenueTrend),
            isPositive: stats.revenueTrend >= 0,
          }}
          color="green"
        />
        <StatCard
          icon={Calendar}
          label="Séances ce mois"
          value={stats.totalSessions}
          trend={{
            value: Math.abs(stats.sessionsTrend),
            isPositive: stats.sessionsTrend >= 0,
          }}
          color="orange"
        />
        <StatCard
          icon={Users}
          label="Membres actifs"
          value={stats.activeMembers}
          color="blue"
        />
        <StatCard
          icon={TrendingUp}
          label="Taux d'occupation"
          value={`${stats.occupancyRate.toFixed(1)}%`}
          color="orange"
        />
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <div className="rounded-xl border border-white/5 bg-zinc-800/50 p-6">
          <h3 className="mb-2 text-lg font-semibold text-white">Actions rapides</h3>
          <div className="space-y-2">
            <Button
              variant="secondary"
              size="sm"
              className="w-full"
              onClick={() => navigate('/admin/coaches')}
            >
              Gérer les coachs
            </Button>
            <Button
              variant="secondary"
              size="sm"
              className="w-full"
              onClick={() => navigate('/admin/sessions')}
            >
              Voir les séances
            </Button>
            <Button
              variant="secondary"
              size="sm"
              className="w-full"
              onClick={() => navigate('/admin/members')}
            >
              Gérer les membres
            </Button>
          </div>
        </div>

        <div className="rounded-xl border border-white/5 bg-zinc-800/50 p-6">
          <h3 className="mb-2 text-lg font-semibold text-white">Récent</h3>
          <p className="text-sm text-zinc-400">Aucune activité récente</p>
        </div>

        <div className="rounded-xl border border-white/5 bg-zinc-800/50 p-6">
          <h3 className="mb-2 text-lg font-semibold text-white">Notifications</h3>
          <p className="text-sm text-zinc-400">Aucune notification</p>
        </div>
      </div>

      {/* Revenue Chart */}
      {chartData.length > 0 && (
        <div className="rounded-xl border border-white/5 bg-zinc-800/50 p-6">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-xl font-semibold text-white">Évolution des revenus (6 derniers mois)</h2>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate('/admin/analytics')}
            >
              Voir plus
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
          <RevenueChart data={chartData} />
        </div>
      )}
    </div>
  )
}

