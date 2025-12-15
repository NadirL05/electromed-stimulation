import { useNavigate } from 'react-router-dom'
import { CalendarDays, Clock, CreditCard, TrendingUp, ArrowRight, CalendarClock, Users, Bell, CheckCircle2, AlertCircle } from 'lucide-react'
import { StatsCard } from '../components/dashboard/StatsCard'
import { Button } from '../components/ui/Button'
import { useAuthStore } from '../stores/authStore'

export default function Dashboard() {
  const navigate = useNavigate()
  const { user } = useAuthStore()
  const credits = user?.credits ?? 0

  return (
    <div className="space-y-8">
      {/* Welcome banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-orange-500 via-orange-600 to-amber-500 p-6 text-white shadow-xl shadow-orange-500/20 sm:p-8">
        <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute -bottom-10 -left-10 h-40 w-40 rounded-full bg-white/10 blur-2xl" />
        
        <div className="relative flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-2">
            <p className="text-sm font-medium text-orange-100">
              Bienvenue, {user?.full_name?.split(' ')[0] || 'membre'} 👋
            </p>
            <h2 className="text-2xl font-bold sm:text-3xl">
              Prêt pour votre prochaine séance ?
            </h2>
            <p className="max-w-md text-sm text-orange-100">
              Vous avez <span className="font-semibold text-white">{credits} crédits</span> disponibles. 
              Réservez maintenant votre prochaine séance EMS.
            </p>
          </div>
          <Button 
            variant="secondary" 
            size="lg" 
            className="w-full bg-white text-orange-600 shadow-lg hover:bg-orange-50 sm:w-auto"
            onClick={() => navigate('/dashboard/booking')}
          >
            <CalendarClock className="h-5 w-5" />
            Réserver
          </Button>
        </div>
      </div>

      {/* Stats grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatsCard 
          label="Séances ce mois" 
          value="8" 
          hint="Sur 10 prévues"
          icon={CalendarDays}
          color="orange"
          trend={{ value: 12, isPositive: true }}
        />
        <StatsCard 
          label="Prochaine séance" 
          value="Jeu 14:00" 
          hint="Coach Sarah"
          icon={Clock}
          color="blue"
        />
        <StatsCard 
          label="Crédits restants" 
          value={String(credits)}
          hint="Rechargez si besoin"
          icon={CreditCard}
          color="green"
        />
        <StatsCard 
          label="Progression" 
          value="+15%" 
          hint="Force musculaire"
          icon={TrendingUp}
          color="purple"
          trend={{ value: 15, isPositive: true }}
        />
      </div>

      {/* Quick actions */}
      <div className="grid gap-4 sm:grid-cols-3">
        <button 
          onClick={() => navigate('/dashboard/booking')}
          className="group flex items-center gap-4 rounded-2xl border border-white/5 bg-zinc-800/50 p-5 text-left transition-all hover:border-orange-500/20 hover:bg-zinc-800"
        >
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-500/10 text-orange-400 transition-transform group-hover:scale-110">
            <CalendarClock className="h-6 w-6" />
          </div>
          <div className="flex-1">
            <p className="font-semibold text-white">Réserver une séance</p>
            <p className="text-xs text-zinc-500">Choisissez votre créneau</p>
          </div>
          <ArrowRight className="h-5 w-5 text-zinc-600 transition-transform group-hover:translate-x-1 group-hover:text-orange-400" />
        </button>

        <button 
          onClick={() => navigate('/dashboard/coaches')}
          className="group flex items-center gap-4 rounded-2xl border border-white/5 bg-zinc-800/50 p-5 text-left transition-all hover:border-blue-500/20 hover:bg-zinc-800"
        >
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400 transition-transform group-hover:scale-110">
            <Users className="h-6 w-6" />
          </div>
          <div className="flex-1">
            <p className="font-semibold text-white">Voir les coachs</p>
            <p className="text-xs text-zinc-500">Nos experts EMS</p>
          </div>
          <ArrowRight className="h-5 w-5 text-zinc-600 transition-transform group-hover:translate-x-1 group-hover:text-blue-400" />
        </button>

        <button 
          onClick={() => navigate('/dashboard/credits')}
          className="group flex items-center gap-4 rounded-2xl border border-white/5 bg-zinc-800/50 p-5 text-left transition-all hover:border-emerald-500/20 hover:bg-zinc-800"
        >
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400 transition-transform group-hover:scale-110">
            <CreditCard className="h-6 w-6" />
          </div>
          <div className="flex-1">
            <p className="font-semibold text-white">Acheter des crédits</p>
            <p className="text-xs text-zinc-500">Packs avantageux</p>
          </div>
          <ArrowRight className="h-5 w-5 text-zinc-600 transition-transform group-hover:translate-x-1 group-hover:text-emerald-400" />
        </button>
      </div>

      {/* Recent activity & notifications */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Recent sessions */}
        <div className="rounded-2xl border border-white/5 bg-zinc-800/50 p-6">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-lg font-semibold text-white">Séances récentes</h3>
            <button 
              onClick={() => navigate('/dashboard/sessions')}
              className="text-sm text-orange-400 transition hover:text-orange-300"
            >
              Tout voir →
            </button>
          </div>
          <div className="space-y-3">
            {[
              { coach: 'Sarah', date: "Aujourd'hui", time: '16:00', status: 'confirmed' },
              { coach: 'Max', date: 'Demain', time: '10:00', status: 'pending' },
              { coach: 'Sarah', date: 'Vendredi', time: '14:00', status: 'confirmed' },
            ].map((session, i) => (
              <div key={i} className="flex items-center justify-between rounded-xl bg-zinc-900/50 p-4">
                <div className="flex items-center gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-zinc-600 to-zinc-700 text-sm font-bold text-white">
                    {session.coach[0]}
                  </div>
                  <div>
                    <p className="font-medium text-white">Séance avec {session.coach}</p>
                    <p className="text-xs text-zinc-500">{session.date} • {session.time} • 20 min</p>
                  </div>
                </div>
                <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium ${
                  session.status === 'confirmed' 
                    ? 'bg-emerald-500/10 text-emerald-400' 
                    : 'bg-amber-500/10 text-amber-400'
                }`}>
                  {session.status === 'confirmed' ? (
                    <><CheckCircle2 className="h-3 w-3" /> Confirmée</>
                  ) : (
                    <><Clock className="h-3 w-3" /> En attente</>
                  )}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Notifications */}
        <div className="rounded-2xl border border-white/5 bg-zinc-800/50 p-6">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-lg font-semibold text-white">Notifications</h3>
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-orange-500 text-xs font-bold text-white">
              2
            </span>
          </div>
          <div className="space-y-3">
            <div className="flex gap-4 rounded-xl bg-amber-500/10 p-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-amber-500/20">
                <AlertCircle className="h-5 w-5 text-amber-400" />
              </div>
              <div>
                <p className="font-medium text-white">Renouvellement proche</p>
                <p className="mt-0.5 text-xs text-zinc-400">
                  Votre forfait expire dans 3 jours. Pensez à le renouveler.
                </p>
              </div>
            </div>
            <div className="flex gap-4 rounded-xl bg-zinc-900/50 p-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-500/20">
                <Bell className="h-5 w-5 text-blue-400" />
              </div>
              <div>
                <p className="font-medium text-white">Nouveau créneau</p>
                <p className="mt-0.5 text-xs text-zinc-400">
                  Coach Sarah a ouvert des créneaux ce samedi.
                </p>
              </div>
            </div>
            <div className="flex gap-4 rounded-xl bg-zinc-900/50 p-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-500/20">
                <CheckCircle2 className="h-5 w-5 text-emerald-400" />
              </div>
              <div>
                <p className="font-medium text-white">Objectif atteint</p>
                <p className="mt-0.5 text-xs text-zinc-400">
                  Bravo ! Vous avez complété 10 séances ce mois.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

