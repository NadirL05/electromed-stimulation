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

  return (
    <>
      <header className="sticky inset-x-0 top-0 z-50 border-b border-gray-200/50 bg-white/90 shadow-sm backdrop-blur-xl backdrop-saturate-150">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <Link
            to="/"
            className="group flex items-center gap-3 text-xl font-bold"
            onClick={closeMenus}
          >
            <span className="relative flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-orange-500 via-pink-500 to-purple-600 text-white shadow-lg shadow-orange-500/30 transition-all duration-300 group-hover:scale-110 group-hover:rotate-3 group-hover:shadow-xl group-hover:shadow-orange-500/50">
              <Zap className="h-5 w-5 transition-transform group-hover:scale-110" />
              <span className="absolute inset-0 rounded-2xl bg-gradient-to-br from-orange-400 via-pink-400 to-purple-500 opacity-0 blur-md transition-opacity group-hover:opacity-50" />
            </span>
            <span className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent transition-all group-hover:from-orange-600 group-hover:via-pink-600 group-hover:to-purple-600">
              ElectroMed
            </span>
          </Link>

          <nav className="hidden items-center gap-8 text-sm font-medium md:flex">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `relative transition-all duration-200 ${
                    isActive || location.pathname === item.to
                      ? 'text-transparent bg-gradient-to-r from-orange-500 via-pink-500 to-purple-600 bg-clip-text font-semibold'
                      : 'text-gray-600 hover:text-gray-900 hover:scale-105'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <span className="relative z-10">{item.label}</span>
                    {(isActive || location.pathname === item.to) && (
                      <>
                        <span className="absolute -bottom-1 left-0 right-0 h-0.5 rounded-full bg-gradient-to-r from-orange-500 via-pink-500 to-purple-600" />
                        <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 h-1 w-1 rounded-full bg-gradient-to-r from-orange-500 via-pink-500 to-purple-600 animate-pulse" />
                      </>
                    )}
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          <div className="hidden items-center gap-3 md:flex">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsLoginOpen(true)}
              className="hover:bg-gray-100/80 transition-all duration-200"
            >
              Connexion
            </Button>
            <Button
              variant="primary"
              size="sm"
              onClick={() => setIsSignupOpen(true)}
              className="bg-gradient-to-r from-orange-500 via-pink-500 to-purple-600 hover:from-orange-600 hover:via-pink-600 hover:to-purple-700 shadow-lg shadow-orange-500/30 hover:shadow-xl hover:shadow-orange-500/40 transition-all duration-300 hover:scale-105"
            >
              Essayer gratuitement
            </Button>
          </div>

          <button
            type="button"
            className="inline-flex items-center justify-center rounded-xl p-2 text-[#4B5563] hover:bg-white/60 hover:text-[#111827] md:hidden"
            onClick={() => setIsMobileOpen((prev) => !prev)}
            aria-label="Ouvrir le menu de navigation"
          >
            {isMobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {isMobileOpen && (
          <div className="border-t border-gray-200/50 bg-white/95 backdrop-blur-xl px-4 py-4 shadow-lg md:hidden">
            <nav className="flex flex-col gap-2 text-sm font-medium">
              {navItems.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={({ isActive }) =>
                    `rounded-lg px-2 py-2 transition ${
                      isActive || location.pathname === item.to
                        ? 'bg-[#2563EB]/10 text-[#2563EB]'
                        : 'text-[#4B5563] hover:bg-white'
                    }`
                  }
                  onClick={() => setIsMobileOpen(false)}
                >
                  {item.label}
                </NavLink>
              ))}
            </nav>
            <div className="mt-3 flex flex-col gap-2">
              <Button
                variant="ghost"
                size="sm"
                className="w-full"
                onClick={() => {
                  setIsLoginOpen(true)
                  setIsMobileOpen(false)
                }}
              >
                Connexion
              </Button>
              <Button
                variant="primary"
                size="sm"
                className="w-full"
                onClick={() => {
                  setIsSignupOpen(true)
                  setIsMobileOpen(false)
                }}
              >
                Essayer gratuitement
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

