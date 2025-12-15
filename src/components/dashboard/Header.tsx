import { Bell, Menu, Search, Sparkles } from 'lucide-react'
import { useAuthStore } from '../../stores/authStore'
import { useLocation } from 'react-router-dom'

interface HeaderProps {
  onMenu: () => void
}

const pageTitles: Record<string, { title: string; description: string }> = {
  '/dashboard': { title: 'Tableau de bord', description: 'Bienvenue dans votre espace ElectroMed' },
  '/dashboard/sessions': { title: 'Mes séances', description: 'Gérez vos réservations et historique' },
  '/dashboard/booking': { title: 'Réserver', description: 'Planifiez votre prochaine séance EMS' },
  '/dashboard/coaches': { title: 'Coachs', description: 'Découvrez nos coachs certifiés' },
  '/dashboard/credits': { title: 'Crédits', description: 'Gérez vos crédits et abonnements' },
  '/dashboard/profile': { title: 'Mon profil', description: 'Vos informations personnelles' },
  '/dashboard/settings': { title: 'Paramètres', description: 'Configurez votre compte' },
}

export default function Header({ onMenu }: HeaderProps) {
  const { user } = useAuthStore()
  const location = useLocation()
  const pageInfo = pageTitles[location.pathname] || { title: 'Dashboard', description: '' }

  return (
    <header className="sticky top-0 z-20 border-b border-white/5 bg-zinc-900/80 backdrop-blur-xl">
      <div className="flex h-16 items-center justify-between px-4 sm:px-6">
        {/* Left section */}
        <div className="flex items-center gap-4">
          <button
            className="rounded-xl p-2 text-zinc-400 transition hover:bg-white/5 hover:text-white md:hidden"
            onClick={onMenu}
            aria-label="Ouvrir le menu"
          >
            <Menu className="h-6 w-6" />
          </button>
          <div className="hidden sm:block">
            <h1 className="text-lg font-semibold text-white">{pageInfo.title}</h1>
            <p className="text-xs text-zinc-500">{pageInfo.description}</p>
          </div>
        </div>

        {/* Right section */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Search (desktop) */}
          <div className="relative hidden lg:block">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500" />
            <input
              type="text"
              placeholder="Rechercher..."
              className="w-64 rounded-xl border border-white/10 bg-white/5 py-2 pl-10 pr-4 text-sm text-white placeholder-zinc-500 transition focus:border-orange-500/50 focus:outline-none focus:ring-2 focus:ring-orange-500/20"
            />
          </div>

          {/* Quick action */}
          <button className="hidden items-center gap-2 rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 px-4 py-2 text-sm font-medium text-white shadow-lg shadow-orange-500/25 transition hover:shadow-orange-500/40 sm:flex">
            <Sparkles className="h-4 w-4" />
            Réserver
          </button>

          {/* Notifications */}
          <button
            className="relative rounded-xl p-2.5 text-zinc-400 transition hover:bg-white/5 hover:text-white"
            aria-label="Notifications"
          >
            <Bell className="h-5 w-5" />
            <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-orange-500 ring-2 ring-zinc-900" />
          </button>

          {/* User avatar */}
          <button className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-orange-500 to-orange-600 text-sm font-bold text-white shadow-lg shadow-orange-500/20 transition hover:shadow-orange-500/40">
            {(user?.full_name || user?.email || 'U')[0].toUpperCase()}
          </button>
        </div>
      </div>

      {/* Mobile title */}
      <div className="border-t border-white/5 px-4 py-3 sm:hidden">
        <h1 className="text-lg font-semibold text-white">{pageInfo.title}</h1>
        <p className="text-xs text-zinc-500">{pageInfo.description}</p>
      </div>
    </header>
  )
}



