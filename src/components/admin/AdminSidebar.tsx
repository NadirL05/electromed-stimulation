import { NavLink } from 'react-router-dom'
import {
  LayoutDashboard,
  Users,
  Calendar,
  UserCheck,
  BarChart,
  X,
} from 'lucide-react'

const menuItems = [
  {
    label: 'Vue d\'ensemble',
    icon: LayoutDashboard,
    path: '/admin',
  },
  {
    label: 'Coachs',
    icon: Users,
    path: '/admin/coaches',
  },
  {
    label: 'Séances',
    icon: Calendar,
    path: '/admin/sessions',
  },
  {
    label: 'Membres',
    icon: UserCheck,
    path: '/admin/members',
  },
  {
    label: 'Analytics',
    icon: BarChart,
    path: '/admin/analytics',
  },
]

interface AdminSidebarProps {
  open: boolean
  onClose: () => void
}

export default function AdminSidebar({ open, onClose }: AdminSidebarProps) {
  return (
    <>
      {/* Mobile overlay */}
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/50 md:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 z-50 h-full w-64 transform border-r border-white/10 bg-zinc-900 transition-transform duration-300 md:translate-x-0 ${
          open ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex h-full flex-col">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-white/10 p-6">
            <h1 className="text-xl font-bold text-white">ElectroMed Admin</h1>
            <button
              onClick={onClose}
              className="rounded-lg p-2 text-zinc-400 transition hover:bg-zinc-800 hover:text-white md:hidden"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 space-y-1 p-4">
            {menuItems.map((item) => {
              const Icon = item.icon
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={() => {
                    if (window.innerWidth < 768) {
                      onClose()
                    }
                  }}
                  className={({ isActive }) =>
                    `flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition ${
                      isActive
                        ? 'bg-orange-500/20 text-orange-400'
                        : 'text-zinc-400 hover:bg-zinc-800 hover:text-white'
                    }`
                  }
                >
                  <Icon className="h-5 w-5" />
                  {item.label}
                </NavLink>
              )
            })}
          </nav>

          {/* Footer */}
          <div className="border-t border-white/10 p-4">
            <NavLink
              to="/dashboard"
              className="flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium text-zinc-400 transition hover:bg-zinc-800 hover:text-white"
            >
              ← Retour au dashboard
            </NavLink>
          </div>
        </div>
      </aside>
    </>
  )
}

