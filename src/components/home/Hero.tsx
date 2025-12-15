import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Sparkles, ArrowRight } from 'lucide-react'
import { Button } from '../ui/Button'
import { useAuthModals } from '../../contexts/AuthModalContext'
import { useAuthStore } from '../../stores/authStore'

export default function Hero() {
  const { openSignup } = useAuthModals()
  const { isAuthenticated } = useAuthStore()

  return (
    <section className="grid gap-10 py-8 md:grid-cols-2 md:items-center md:py-12">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="space-y-6"
      >
        <motion.p 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#DBEAFE] to-[#E0E7FF] px-4 py-1.5 text-xs font-semibold text-[#1D4ED8] ring-1 ring-[#93C5FD]/50"
        >
          <Sparkles className="h-3.5 w-3.5" />
          Plateforme SaaS d&apos;électrostimulation médicale
        </motion.p>
        <h1 className="text-3xl font-bold leading-[1.1] tracking-tight text-[#111827] sm:text-4xl lg:text-5xl">
          Transformez votre corps avec{' '}
          <span className="bg-gradient-to-r from-[#2563EB] to-[#10B981] bg-clip-text text-transparent">
            l&apos;électrostimulation
          </span>{' '}
          médicale
        </h1>
        <p className="max-w-xl text-base leading-relaxed text-[#4B5563] sm:text-lg">
          ElectroMed centralise la gestion de vos séances EMS : planning intelligent, suivi
          des résultats et gestion des abonnements, pour vos franchises et vos coachs.
        </p>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
          {isAuthenticated ? (
            <Link to="/dashboard">
              <Button variant="primary" size="lg">
                Accéder à mon espace
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          ) : (
            <Button variant="primary" size="lg" onClick={openSignup}>
              Essayer gratuitement
              <ArrowRight className="h-4 w-4" />
            </Button>
          )}
          <Link to="/services">
            <Button variant="secondary" size="lg">
              En savoir plus
            </Button>
          </Link>
        </div>
        <div className="mt-4 flex flex-wrap gap-4 text-xs text-[#6B7280] sm:text-sm">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-[#10B981]" />
            <span>Résultats visibles en moins de 8 séances</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-[#2563EB]" />
            <span>Suivi personnalisé de chaque membre</span>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut', delay: 0.1 }}
        className="relative"
      >
        <div className="pointer-events-none absolute -inset-10 -z-10 bg-[radial-gradient(circle_at_top,_#2563EB1a,_transparent_60%),radial-gradient(circle_at_bottom,_#10B9811a,_transparent_55%)]" />
        <div className="relative overflow-hidden rounded-3xl border border-white/70 bg-gradient-to-br from-[#2563EB] via-[#10B981] to-[#F97316] p-[1px] shadow-2xl shadow-[#2563EB]/30">
          <div className="flex h-full min-h-[260px] flex-col justify-between rounded-[1.4rem] bg-white/95 p-6">
            <div className="space-y-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-[#6B7280]">
                Vue coach
              </p>
              <p className="text-lg font-semibold text-[#111827]">
                Planning de la journée
              </p>
              <div className="space-y-2 text-sm">
                <div className="flex items-center justify-between rounded-xl bg-[#EFF6FF] px-3 py-2">
                  <span className="font-medium text-[#1D4ED8]">09:00 - 09:30</span>
                  <span className="text-xs text-[#4B5563]">Perte de poids</span>
                </div>
                <div className="flex items-center justify-between rounded-xl bg-[#ECFEFF] px-3 py-2">
                  <span className="font-medium text-[#0F766E]">10:00 - 10:30</span>
                  <span className="text-xs text-[#4B5563]">Renforcement musculaire</span>
                </div>
                <div className="flex items-center justify-between rounded-xl bg-[#FFFBEB] px-3 py-2">
                  <span className="font-medium text-[#C2410C]">11:00 - 11:30</span>
                  <span className="text-xs text-[#4B5563]">Récupération sportive</span>
                </div>
              </div>
            </div>
            <div className="mt-4 flex items-center justify-between rounded-2xl bg-[#111827] px-4 py-3 text-xs text-white">
              <div>
                <p className="text-[11px] uppercase tracking-wide text-[#9CA3AF]">
                  Taux d&apos;occupation
                </p>
                <p className="text-lg font-semibold">87%</p>
              </div>
              <div>
                <p className="text-[11px] uppercase tracking-wide text-[#9CA3AF]">
                  Séances du jour
                </p>
                <p className="text-lg font-semibold">18</p>
              </div>
              <div>
                <p className="text-[11px] uppercase tracking-wide text-[#9CA3AF]">
                  Membres actifs
                </p>
                <p className="text-lg font-semibold">132</p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  )
}


