import { useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { Zap, Menu, X } from 'lucide-react'
import { Button } from '../ui/Button'
import LoginModal from '../auth/LoginModal'
import SignupModal from '../auth/SignupModal'

const navItems = [
  { label: 'Accueil', to: '/' },
  { label: 'Services', to: '/services' },
  { label: 'Tarifs', to: '/pricing' },
  { label: 'Contact', to: '/contact' },
]

export default function Navbar() {
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const [isLoginOpen, setIsLoginOpen] = useState(false)
  const [isSignupOpen, setIsSignupOpen] = useState(false)
  const location = useLocation()

  const closeMenus = () => {
    setIsMobileOpen(false)
    setIsLoginOpen(false)
    setIsSignupOpen(false)
  }

  const isActive = (path: string) => location.pathname === path

  return (
    <>
      <header className="sticky inset-x-0 top-0 z-40 bg-white shadow-sm">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6">
          {/* Logo */}
          <Link
            to="/"
            className="group flex items-center gap-2.5"
            onClick={closeMenus}
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-orange-500 to-orange-600 text-white shadow-lg shadow-orange-500/30 transition-all group-hover:scale-105">
              <Zap className="h-6 w-6" />
            </span>
            <span className="text-xl font-bold text-gray-900">
              Electro<span className="text-orange-500">Med</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden items-center gap-1 md:flex">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                  isActive(item.to)
                    ? 'text-orange-500'
                    : 'text-gray-700 hover:text-orange-500'
                }`}
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          {/* Right Actions */}
          <div className="hidden items-center gap-3 md:flex">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsLoginOpen(true)}
              className="text-gray-700 hover:text-gray-900"
            >
              Connexion
            </Button>
            <Button
              variant="primary"
              size="md"
              onClick={() => setIsSignupOpen(true)}
              className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 rounded-lg shadow-md shadow-orange-500/30 hover:shadow-lg hover:shadow-orange-500/40 transition-all"
            >
              S'INSCRIRE
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-lg p-2 text-gray-600 hover:bg-gray-100 hover:text-gray-900 md:hidden"
            onClick={() => setIsMobileOpen((prev) => !prev)}
            aria-label="Ouvrir le menu de navigation"
          >
            {isMobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileOpen && (
          <div className="border-t border-gray-100 bg-white px-4 py-4 shadow-lg md:hidden">
            <nav className="flex flex-col gap-1">
              {navItems.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={`rounded-lg px-4 py-3 text-sm font-medium transition-colors ${
                    isActive(item.to)
                      ? 'bg-orange-50 text-orange-500'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                  onClick={() => setIsMobileOpen(false)}
                >
                  {item.label}
                </NavLink>
              ))}
            </nav>
            <div className="mt-4 flex flex-col gap-2 border-t border-gray-100 pt-4">
              <Button
                variant="ghost"
                size="md"
                className="w-full justify-center"
                onClick={() => {
                  setIsLoginOpen(true)
                  setIsMobileOpen(false)
                }}
              >
                Connexion
              </Button>
              <Button
                variant="primary"
                size="md"
                className="w-full justify-center bg-orange-500 hover:bg-orange-600"
                onClick={() => {
                  setIsSignupOpen(true)
                  setIsMobileOpen(false)
                }}
              >
                S'INSCRIRE
              </Button>
            </div>
          </div>
        )}
      </header>

      <LoginModal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
      <SignupModal isOpen={isSignupOpen} onClose={() => setIsSignupOpen(false)} />
    </>
  )
}
