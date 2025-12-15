import { supabase } from './supabase'

export interface DashboardStats {
  totalRevenue: number
  totalSessions: number
  activeMembers: number
  occupancyRate: number
  revenueTrend: number
  sessionsTrend: number
}

export interface CoachWithStats {
  id: string
  full_name: string
  email: string
  total_sessions: number
  rating: number
  is_active: boolean
}

export async function getDashboardStats(franchiseId: string): Promise<DashboardStats> {
  const now = new Date()
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1)
  const startOfLastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1)
  const endOfLastMonth = new Date(now.getFullYear(), now.getMonth(), 0)

  // Revenus ce mois
  const { data: paymentsThisMonth } = await supabase
    .from('payments')
    .select('amount')
    .eq('status', 'succeeded')
    .gte('created_at', startOfMonth.toISOString())

  // Revenus mois dernier
  const { data: paymentsLastMonth } = await supabase
    .from('payments')
    .select('amount')
    .eq('status', 'succeeded')
    .gte('created_at', startOfLastMonth.toISOString())
    .lte('created_at', endOfLastMonth.toISOString())

  const totalRevenue = paymentsThisMonth?.reduce((sum, p) => sum + p.amount, 0) || 0
  const lastMonthRevenue = paymentsLastMonth?.reduce((sum, p) => sum + p.amount, 0) || 0
  const revenueTrend = lastMonthRevenue > 0 ? ((totalRevenue - lastMonthRevenue) / lastMonthRevenue) * 100 : 0

  // Séances ce mois
  const { count: sessionsThisMonthCount } = await supabase
    .from('sessions')
    .select('*', { count: 'exact', head: true })
    .eq('franchise_id', franchiseId)
    .gte('session_date', startOfMonth.toISOString())

  const { count: sessionsLastMonthCount } = await supabase
    .from('sessions')
    .select('*', { count: 'exact', head: true })
    .eq('franchise_id', franchiseId)
    .gte('session_date', startOfLastMonth.toISOString())
    .lte('session_date', endOfLastMonth.toISOString())

  const totalSessions = sessionsThisMonthCount || 0
  const lastMonthSessions = sessionsLastMonthCount || 0
  const sessionsTrend = lastMonthSessions > 0 ? ((totalSessions - lastMonthSessions) / lastMonthSessions) * 100 : 0

  // Membres actifs (ont eu une séance ce mois)
  const { data: activeMembersData } = await supabase
    .from('sessions')
    .select('user_id')
    .eq('franchise_id', franchiseId)
    .gte('session_date', startOfMonth.toISOString())

  const activeMembers = new Set(activeMembersData?.map((s) => s.user_id).filter(Boolean)).size

  // Taux d'occupation (séances / créneaux disponibles)
  const { data: coaches } = await supabase
    .from('coaches')
    .select('availability')
    .eq('franchise_id', franchiseId)
    .eq('is_active', true)

  const totalSlots = coaches?.reduce((sum, coach) => {
    const avail = coach.availability as Record<string, string[]> | null
    if (!avail) return sum
    return sum + Object.values(avail).reduce((s, slots) => s + slots.length, 0)
  }, 0) || 0

  const occupancyRate = totalSlots > 0 ? (totalSessions / totalSlots) * 100 : 0

  return {
    totalRevenue,
    totalSessions,
    activeMembers,
    occupancyRate,
    revenueTrend,
    sessionsTrend,
  }
}

export async function getCoachesWithStats(franchiseId: string): Promise<CoachWithStats[]> {
  const { data: coaches, error } = await supabase
    .from('coaches')
    .select(`
      id,
      user_id,
      total_sessions,
      rating,
      is_active,
      user_profiles!coaches_user_id_fkey (
        full_name,
        email
      )
    `)
    .eq('franchise_id', franchiseId)

  if (error) {
    console.error('Error fetching coaches:', error)
    return []
  }

  return (
    coaches?.map((coach) => ({
      id: coach.id,
      full_name: (coach.user_profiles as any)?.full_name || 'N/A',
      email: (coach.user_profiles as any)?.email || 'N/A',
      total_sessions: coach.total_sessions || 0,
      rating: coach.rating || 0,
      is_active: coach.is_active ?? true,
    })) || []
  )
}

export async function exportSessionsToCSV(
  franchiseId: string,
  startDate?: string,
  endDate?: string
): Promise<string> {
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
    .eq('franchise_id', franchiseId)

  if (startDate) {
    query = query.gte('session_date', startDate)
  }
  if (endDate) {
    query = query.lte('session_date', endDate)
  }

  const { data: sessions, error } = await query.order('session_date', { ascending: false })

  if (error) {
    throw new Error('Erreur lors de l\'export')
  }

  const headers = ['Date', 'Membre', 'Email', 'Coach', 'Type', 'Durée (min)', 'Statut']
  const rows = sessions?.map((session) => [
    new Date(session.session_date).toLocaleDateString('fr-FR'),
    (session.user_profiles as any)?.full_name || 'N/A',
    (session.user_profiles as any)?.email || 'N/A',
    (session.coaches as any)?.user_profiles?.full_name || 'N/A',
    session.session_type || 'N/A',
    session.duration_minutes?.toString() || '0',
    session.status || 'N/A',
  ]) || []

  const csvContent = [headers, ...rows].map((row) => row.join(',')).join('\n')
  return csvContent
}

