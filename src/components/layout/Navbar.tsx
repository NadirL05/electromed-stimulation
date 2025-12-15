import { useState } from 'react'
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom'
import { Zap, Menu, X, User, LogOut } from 'lucide-react'
import { Button } from '../ui/Button'
import { useAuthModals } from '../../contexts/AuthModalContext'
import { useAuthStore } from '../../stores/authStore'

const navItems = [
  { label: 'Accueil', to: '/' },
  { label: 'Services', to: '/services' },
  { label: 'Tarifs', to: '/pricing' },
  { label: 'Contact', to: '/contact' },
]

export default function Navbar() {
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()
  const { openLogin, openSignup } = useAuthModals()
  const { user, isAuthenticated, logout } = useAuthStore()

  const closeMobileMenu = () => setIsMobileOpen(false)

  const handleLogout = () => {
    logout()
    closeMobileMenu()
    navigate('/')
  }

  return (
    <header className="sticky inset-x-0 top-0 z-40 border-b border-gray-100 bg-white/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-2 text-lg font-semibold text-[#1F2937]"
          onClick={closeMobileMenu}
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-tr from-[#2563EB] via-[#10B981] to-[#F97316] text-white shadow-md">
            <Zap className="h-4 w-4" />
          </span>
          <span>ElectroMed</span>
        </Link>

        {/* Navigation desktop */}
        <nav className="hidden items-center gap-8 text-sm font-medium text-[#4B5563] md:flex">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `relative py-1 transition hover:text-[#111827] ${
                  isActive || location.pathname === item.to
                    ? 'text-[#2563EB] after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:bg-[#2563EB] after:rounded-full'
                    : 'text-[#4B5563]'
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        {/* Actions desktop */}
        <div className="hidden items-center gap-3 md:flex">
          {isAuthenticated && user ? (
            <>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate('/dashboard')}
              >
                <User className="h-4 w-4" />
                {user.full_name || 'Mon espace'}
              </Button>
              <Button variant="secondary" size="sm" onClick={handleLogout}>
                <LogOut className="h-4 w-4" />
                Déconnexion
              </Button>
            </>
          ) : (
            <>
              <Button variant="ghost" size="sm" onClick={openLogin}>
                Connexion
              </Button>
              <Button variant="primary" size="sm" onClick={openSignup}>
                Essayer gratuitement
              </Button>
            </>
          )}
        </div>

        {/* Burger mobile */}
        <button
          type="button"
          className="inline-flex items-center justify-center rounded-xl p-2 text-[#4B5563] transition hover:bg-gray-100 hover:text-[#111827] md:hidden"
          onClick={() => setIsMobileOpen((prev) => !prev)}
          aria-label={isMobileOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
          aria-expanded={isMobileOpen}
        >
          {isMobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Menu mobile */}
      {isMobileOpen && (
        <div className="border-t border-gray-100 bg-white px-4 py-4 shadow-lg md:hidden">
          <nav className="flex flex-col gap-1">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `rounded-xl px-3 py-2.5 text-sm font-medium transition ${
                    isActive || location.pathname === item.to
                      ? 'bg-[#EFF6FF] text-[#2563EB]'
                      : 'text-[#4B5563] hover:bg-gray-50'
                  }`
                }
                onClick={closeMobileMenu}
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
          
          <div className="mt-4 flex flex-col gap-2 border-t border-gray-100 pt-4">
            {isAuthenticated && user ? (
              <>
                <Button
                  variant="secondary"
                  size="sm"
                  className="w-full justify-start"
                  onClick={() => {
                    navigate('/dashboard')
                    closeMobileMenu()
                  }}
                >
                  <User className="h-4 w-4" />
                  Mon espace
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full justify-start text-red-600 hover:bg-red-50"
                  onClick={handleLogout}
                >
                  <LogOut className="h-4 w-4" />
                  Déconnexion
                </Button>
              </>
            ) : (
              <>
                <Button
                  variant="secondary"
                  size="sm"
                  className="w-full"
                  onClick={() => {
                    openLogin()
                    closeMobileMenu()
                  }}
                >
                  Connexion
                </Button>
                <Button
                  variant="primary"
                  size="sm"
                  className="w-full"
                  onClick={() => {
                    openSignup()
                    closeMobileMenu()
                  }}
                >
                  Essayer gratuitement
                </Button>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  )
}


