import { useState } from 'react'
import { useAuthStore } from './stores/authStore'
import { AuthModal } from './components/auth/AuthModal'
import { Button } from './components/ui/Button'

function App() {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false)
  const { user, isAuthenticated, logout } = useAuthStore()

  return (
    <div className="min-h-screen bg-zinc-900 text-white">
      <header className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6">
        <div className="text-xl font-semibold tracking-tight">ElectroMed</div>

        <nav className="hidden items-center gap-8 text-sm font-medium text-zinc-200 md:flex">
          <a href="#" className="hover:text-white">
            Accueil
          </a>
          <a href="#" className="hover:text-white">
            Services
          </a>
          <a href="#" className="hover:text-white">
            Tarifs
          </a>
        </nav>

        {/* Bouton Connexion / User menu */}
        {isAuthenticated && user ? (
          <div className="flex items-center gap-4">
            <span className="hidden text-sm text-zinc-300 md:inline">
              {user.full_name || user.email}
            </span>
            <Button variant="ghost" size="sm" onClick={logout}>
              Déconnexion
            </Button>
          </div>
        ) : (
          <Button
            variant="primary"
            size="sm"
            onClick={() => setIsAuthModalOpen(true)}
          >
            Connexion
          </Button>
        )}
      </header>

      <main className="mx-auto flex max-w-6xl flex-col gap-10 px-6 pb-16 pt-4 md:flex-row md:items-center md:gap-16">
        <div className="flex-1 space-y-6">
          <p className="inline-flex rounded-full bg-orange-500/10 px-3 py-1 text-xs font-semibold text-orange-300 ring-1 ring-orange-500/30">
            Électrostimulation médicale
          </p>
          <h1 className="text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">
            Transformez votre corps avec l&apos;électrostimulation médicale
          </h1>
          <p className="max-w-2xl text-lg text-zinc-200">
            Perdez du poids, tonifiez vos muscles et améliorez votre santé grâce à nos
            séances personnalisées encadrées par des professionnels.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
            <Button
              variant="primary"
              size="lg"
              onClick={() => setIsAuthModalOpen(true)}
            >
              Essayer gratuitement
            </Button>
            <Button variant="secondary" size="lg">
              En savoir plus
            </Button>
          </div>
        </div>

        <div className="flex-1">
          <div className="aspect-[4/3] overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-orange-500/20 via-orange-400/10 to-zinc-800 shadow-2xl shadow-orange-500/10">
            <div className="flex h-full items-center justify-center">
              <p className="text-center text-sm font-medium text-orange-100">
                Image / visuel produit ici
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Modal Auth */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
      />
    </div>
  )
}

export default App
