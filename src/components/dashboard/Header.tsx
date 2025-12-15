import { Bell, Menu, User, LogOut, Coins } from 'lucide-react'
import { useAuthStore } from '../../stores/authStore'
import { useNavigate } from 'react-router-dom'

interface HeaderProps {
  onMenu: () => void
}

export default function Header({ onMenu }: HeaderProps) {
  const { user, logout } = useAuthStore()
  const navigate = useNavigate()
  const credits = user?.credits ?? 0

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-white/10 bg-zinc-900/80 px-4 backdrop-blur">
      <div className="flex items-center gap-3">
        <button
          className="rounded-full p-2 text-zinc-400 transition hover:bg-white/5 hover:text-white md:hidden"
          onClick={onMenu}
          aria-label="Ouvrir le menu"
        >
          <Menu className="h-5 w-5" />
        </button>
        <div>
          <div className="text-sm font-semibold text-white">Tableau de bord</div>
          <div className="text-xs text-zinc-400">Gestion des franchises et séances EMS</div>
        </div>
      </div>
      <div className="flex items-center gap-2">
        {/* Badge crédits */}
        <button
          onClick={() => navigate('/dashboard/credits')}
          className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-2 text-sm transition hover:border-orange-500/50 hover:bg-orange-500/10"
        >
          <Coins className="h-4 w-4 text-orange-400" />
          <span className="font-semibold text-white">{credits}</span>
          <span className="text-xs text-zinc-400">crédits</span>
        </button>

        <button
          className="relative rounded-full p-2 text-zinc-400 transition hover:bg-white/5 hover:text-white"
          aria-label="Notifications"
        >
          <Bell className="h-5 w-5" />
          <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-orange-500" />
        </button>
        <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-2 text-sm">
          <User className="h-4 w-4 text-zinc-300" />
          <span className="text-zinc-200">{user?.full_name || user?.email || 'Invité'}</span>
        </div>
        <button
          onClick={logout}
          className="rounded-full border border-white/10 px-3 py-2 text-xs font-semibold text-white transition hover:border-white/30 hover:bg-white/5"
        >
          <span className="inline-flex items-center gap-1">
            <LogOut className="h-4 w-4" />
            Déconnexion
          </span>
        </button>
      </div>
    </header>
  )
}



