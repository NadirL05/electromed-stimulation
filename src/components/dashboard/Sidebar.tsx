import { NavLink } from 'react-router-dom'
import { Home, CalendarDays, Users, User, Settings, X, CalendarClock, CreditCard } from 'lucide-react'
import { useAuthStore } from '../../stores/authStore'

const navItems = [
  { label: 'Tableau de bord', icon: Home, path: '/dashboard' },
  { label: 'Mes séances', icon: CalendarDays, path: '/sessions' },
  { label: 'Réserver', icon: CalendarClock, path: '/booking' },
  { label: 'Coachs', icon: Users, path: '/coaches' },
  { label: 'Crédits', icon: CreditCard, path: '/credits' },
  { label: 'Profil', icon: User, path: '/profile' },
  { label: 'Paramètres', icon: Settings, path: '/settings' },
]

interface SidebarProps {
  open: boolean
  onClose: () => void
}

export default function Sidebar({ open, onClose }: SidebarProps) {
  const { user } = useAuthStore()

  return (
    <aside
      className={`${
        open ? 'translate-x-0' : '-translate-x-full'
      } fixed left-0 top-0 z-40 flex h-full w-64 flex-col border-r border-white/10 bg-zinc-950/90 p-4 shadow-2xl shadow-orange-500/10 backdrop-blur transition-transform md:translate-x-0`}
    >
      <div className="mb-8 flex items-center justify-between">
        <div className="text-lg font-semibold tracking-tight text-white">ElectroMed</div>
        <button
          className="rounded-full p-2 text-zinc-400 transition hover:bg-white/5 hover:text-white md:hidden"
          onClick={onClose}
          aria-label="Fermer le menu"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      <nav className="space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium transition ${
                  isActive
                    ? 'bg-orange-500 text-zinc-900 shadow-lg shadow-orange-500/30'
                    : 'text-zinc-300 hover:bg-white/5 hover:text-white'
                }`
              }
              onClick={onClose}
            >
              <Icon className="h-4 w-4" />
              {item.label}
            </NavLink>
          )
        })}
      </nav>

      <div className="mt-auto pt-6">
        <div className="mb-3 text-xs uppercase text-zinc-500">Utilisateur</div>
        <div className="rounded-xl border border-white/10 bg-white/5 p-3 text-sm text-zinc-200">
          <div className="font-semibold text-white">{user?.full_name || user?.email || 'Invité'}</div>
          <div className="text-xs text-zinc-400">{user?.role ?? 'client'}</div>
        </div>
      </div>
    </aside>
  )
}

