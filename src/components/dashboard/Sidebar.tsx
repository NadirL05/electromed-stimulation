import { NavLink, useNavigate } from 'react-router-dom'
import { Home, CalendarDays, Users, User, Settings, X, CalendarClock, CreditCard, Zap, LayoutDashboard, LogOut, ChevronRight } from 'lucide-react'
import { useAuthStore } from '../../stores/authStore'

const mainNavItems = [
  { label: 'Vue d\'ensemble', icon: LayoutDashboard, path: '/dashboard' },
  { label: 'Mes séances', icon: CalendarDays, path: '/dashboard/sessions' },
  { label: 'Réserver', icon: CalendarClock, path: '/dashboard/booking' },
  { label: 'Coachs', icon: Users, path: '/dashboard/coaches' },
  { label: 'Crédits', icon: CreditCard, path: '/dashboard/credits' },
]

const accountNavItems = [
  { label: 'Mon profil', icon: User, path: '/dashboard/profile' },
  { label: 'Paramètres', icon: Settings, path: '/dashboard/settings' },
]

interface SidebarProps {
  open: boolean
  onClose: () => void
}

export default function Sidebar({ open, onClose }: SidebarProps) {
  const { user, logout } = useAuthStore()
  const navigate = useNavigate()
  const credits = user?.credits ?? 0

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <aside
      className={`${
        open ? 'translate-x-0' : '-translate-x-full'
      } fixed left-0 top-0 z-40 flex h-full w-72 flex-col border-r border-white/5 bg-zinc-950 transition-transform duration-300 ease-out md:translate-x-0`}
    >
      {/* Header */}
      <div className="flex h-16 items-center justify-between border-b border-white/5 px-5">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-orange-500 to-orange-600 shadow-lg shadow-orange-500/30">
            <Zap className="h-5 w-5 text-white" />
          </div>
          <span className="text-lg font-bold text-white">ElectroMed</span>
        </div>
        <button
          className="rounded-lg p-2 text-zinc-400 transition hover:bg-white/5 hover:text-white md:hidden"
          onClick={onClose}
          aria-label="Fermer le menu"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      {/* Credits badge */}
      <div className="mx-4 mt-4">
        <div className="flex items-center justify-between rounded-xl bg-gradient-to-r from-orange-500/10 to-orange-600/5 p-3 ring-1 ring-orange-500/20">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-orange-500/20">
              <CreditCard className="h-5 w-5 text-orange-400" />
            </div>
            <div>
              <p className="text-xs text-zinc-400">Crédits disponibles</p>
              <p className="text-lg font-bold text-white">{credits}</p>
            </div>
          </div>
          <button 
            onClick={() => { navigate('/dashboard/credits'); onClose(); }}
            className="rounded-lg p-1.5 text-orange-400 transition hover:bg-orange-500/20"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-6 overflow-y-auto px-4 py-6">
        {/* Main section */}
        <div>
          <p className="mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-zinc-500">
            Menu
          </p>
          <div className="space-y-1">
            {mainNavItems.map((item) => {
              const Icon = item.icon
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  end={item.path === '/dashboard'}
                  className={({ isActive }) =>
                    `group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all ${
                      isActive
                        ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/25'
                        : 'text-zinc-400 hover:bg-white/5 hover:text-white'
                    }`
                  }
                  onClick={onClose}
                >
                  <Icon className="h-5 w-5" />
                  {item.label}
                </NavLink>
              )
            })}
          </div>
        </div>

        {/* Account section */}
        <div>
          <p className="mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-zinc-500">
            Compte
          </p>
          <div className="space-y-1">
            {accountNavItems.map((item) => {
              const Icon = item.icon
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) =>
                    `group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all ${
                      isActive
                        ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/25'
                        : 'text-zinc-400 hover:bg-white/5 hover:text-white'
                    }`
                  }
                  onClick={onClose}
                >
                  <Icon className="h-5 w-5" />
                  {item.label}
                </NavLink>
              )
            })}
          </div>
        </div>
      </nav>

      {/* User section */}
      <div className="border-t border-white/5 p-4">
        <div className="flex items-center gap-3 rounded-xl bg-white/5 p-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-zinc-600 to-zinc-700 text-sm font-bold text-white">
            {(user?.full_name || user?.email || 'U')[0].toUpperCase()}
          </div>
          <div className="flex-1 truncate">
            <p className="truncate text-sm font-medium text-white">
              {user?.full_name || user?.email || 'Invité'}
            </p>
            <p className="text-xs text-zinc-500 capitalize">{user?.role ?? 'client'}</p>
          </div>
          <button
            onClick={handleLogout}
            className="rounded-lg p-2 text-zinc-400 transition hover:bg-red-500/10 hover:text-red-400"
            aria-label="Déconnexion"
          >
            <LogOut className="h-4 w-4" />
          </button>
        </div>
      </div>
    </aside>
  )
}

