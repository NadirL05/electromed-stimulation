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
      <header className="sticky inset-x-0 top-0 z-40 border-b border-white/10 bg-white/70 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
          <Link
            to="/"
            className="flex items-center gap-2 text-lg font-semibold text-[#1F2937]"
            onClick={closeMenus}
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-tr from-[#2563EB] via-[#10B981] to-[#F97316] text-white shadow-md">
              <Zap className="h-4 w-4" />
            </span>
            <span>ElectroMed</span>
          </Link>

          <nav className="hidden items-center gap-8 text-sm font-medium text-[#4B5563] md:flex">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `transition hover:text-[#111827] ${
                    isActive || location.pathname === item.to
                      ? 'text-[#2563EB]'
                      : 'text-[#4B5563]'
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          <div className="hidden items-center gap-3 md:flex">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsLoginOpen(true)}
            >
              Connexion
            </Button>
            <Button
              variant="primary"
              size="sm"
              onClick={() => setIsSignupOpen(true)}
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
          <div className="border-t border-white/10 bg-white/80 px-4 py-3 shadow-md md:hidden">
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

