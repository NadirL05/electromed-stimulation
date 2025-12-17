import { motion } from 'framer-motion'
import { Button } from '../ui/Button'
import { Zap, Sparkles, Activity } from 'lucide-react'

export default function Hero() {
  return (
    <section className="relative grid gap-12 md:grid-cols-2 md:items-center py-8 md:py-12">
      {/* Animated background blobs */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -right-40 -top-40 h-96 w-96 rounded-full bg-gradient-to-br from-cyan-400/30 via-blue-500/30 to-purple-600/30 blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            rotate: [0, -90, 0],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
          className="absolute -bottom-20 -left-40 h-80 w-80 rounded-full bg-gradient-to-tr from-orange-400/30 via-pink-500/30 to-fuchsia-600/30 blur-3xl"
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="relative space-y-6"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-cyan-500/10 via-blue-500/10 to-purple-500/10 px-4 py-2 text-xs font-semibold backdrop-blur-sm ring-1 ring-cyan-500/30"
        >
          <Sparkles className="h-3.5 w-3.5 text-cyan-600" />
          <span className="bg-gradient-to-r from-cyan-600 via-blue-600 to-purple-600 bg-clip-text text-transparent">
            Plateforme SaaS d&apos;électrostimulation médicale
          </span>
        </motion.div>

        <h1 className="text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl lg:text-6xl xl:text-7xl">
          <span className="block bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent">
            Transformez votre corps avec l&apos;
          </span>
          <span className="block bg-gradient-to-r from-orange-500 via-pink-500 to-purple-600 bg-clip-text text-transparent animate-gradient">
            électrostimulation médicale
          </span>
        </h1>

        <p className="max-w-xl text-base leading-relaxed text-gray-600 sm:text-lg md:text-xl">
          ElectroMed centralise la gestion de vos séances EMS : planning intelligent, suivi
          des résultats et gestion des abonnements, pour vos franchises et vos coachs.
        </p>

        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-4">
          <Button 
            variant="primary" 
            size="lg" 
            className="group relative overflow-hidden bg-gradient-to-r from-orange-500 via-pink-500 to-purple-600 shadow-lg shadow-orange-500/30 hover:shadow-xl hover:shadow-orange-500/40 transition-all duration-300 hover:scale-105"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-orange-600 via-pink-600 to-purple-700 opacity-0 transition-opacity group-hover:opacity-100" />
            <span className="relative z-10 flex items-center gap-2 font-semibold">
              Essayer gratuitement
              <Zap className="h-4 w-4 transition-transform group-hover:rotate-12 group-hover:scale-110" />
            </span>
          </Button>
          <Button 
            variant="secondary" 
            size="lg" 
            className="border-2 border-gray-200 bg-white/90 backdrop-blur-sm hover:border-gray-300 hover:bg-white hover:shadow-md transition-all duration-300 hover:scale-105"
          >
            En savoir plus
          </Button>
        </div>

        <div className="mt-4 flex flex-wrap gap-4 text-sm">
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="flex items-center gap-2"
          >
            <span className="flex h-2 w-2">
              <span className="absolute inline-flex h-2 w-2 animate-ping rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500"></span>
            </span>
            <span className="text-gray-700">Résultats visibles en moins de 8 séances</span>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="flex items-center gap-2"
          >
            <Activity className="h-4 w-4 text-blue-500" />
            <span className="text-gray-700">Suivi personnalisé de chaque membre</span>
          </motion.div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut', delay: 0.1 }}
        className="relative"
      >
        {/* Glowing backdrop */}
        <div className="pointer-events-none absolute -inset-10 -z-10">
          <div className="absolute inset-0 bg-gradient-radial from-orange-500/20 via-pink-500/10 to-transparent blur-2xl" />
        </div>

        {/* Main card with gradient border */}
        <motion.div
          animate={{
            boxShadow: [
              '0 25px 50px -12px rgba(249, 115, 22, 0.25)',
              '0 25px 50px -12px rgba(236, 72, 153, 0.35)',
              '0 25px 50px -12px rgba(168, 85, 247, 0.25)',
              '0 25px 50px -12px rgba(249, 115, 22, 0.25)',
            ],
          }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-orange-500 via-pink-500 to-purple-600 p-[2px] shadow-2xl"
        >
          <div className="relative flex h-full min-h-[320px] flex-col justify-between rounded-[1.4rem] bg-white/98 p-8 backdrop-blur-xl shadow-inner">
            {/* Subtle gradient overlay */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-orange-50/50 via-pink-50/30 to-purple-50/50 opacity-50" />

            <div className="relative space-y-4">
              <div className="flex items-center justify-between">
                <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                  Vue coach
                </p>
                <span className="flex items-center gap-1.5 rounded-full bg-gradient-to-r from-emerald-500 to-cyan-500 px-2.5 py-1 text-xs font-semibold text-white shadow-lg shadow-emerald-500/30">
                  <span className="flex h-1.5 w-1.5 rounded-full bg-white animate-pulse" />
                  En direct
                </span>
              </div>

              <p className="text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                Planning de la journée
              </p>

              <div className="space-y-2 text-sm">
                <motion.div
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="group flex items-center justify-between rounded-xl bg-gradient-to-r from-blue-50 to-cyan-50 px-3.5 py-2.5 transition-all hover:shadow-md hover:shadow-blue-100"
                >
                  <span className="font-semibold text-blue-700">09:00 - 09:30</span>
                  <span className="text-xs font-medium text-gray-600">Perte de poids</span>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="group flex items-center justify-between rounded-xl bg-gradient-to-r from-emerald-50 to-teal-50 px-3.5 py-2.5 transition-all hover:shadow-md hover:shadow-emerald-100"
                >
                  <span className="font-semibold text-emerald-700">10:00 - 10:30</span>
                  <span className="text-xs font-medium text-gray-600">Renforcement musculaire</span>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="group flex items-center justify-between rounded-xl bg-gradient-to-r from-orange-50 to-amber-50 px-3.5 py-2.5 transition-all hover:shadow-md hover:shadow-orange-100"
                >
                  <span className="font-semibold text-orange-700">11:00 - 11:30</span>
                  <span className="text-xs font-medium text-gray-600">Récupération sportive</span>
                </motion.div>
              </div>
            </div>

            <div className="relative mt-4 flex items-center justify-between rounded-2xl bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 px-4 py-3.5 text-xs text-white shadow-xl">
              <div>
                <p className="text-[11px] uppercase tracking-wide text-gray-400">
                  Taux d&apos;occupation
                </p>
                <p className="mt-0.5 text-lg font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">87%</p>
              </div>
              <div>
                <p className="text-[11px] uppercase tracking-wide text-gray-400">
                  Séances du jour
                </p>
                <p className="mt-0.5 text-lg font-bold bg-gradient-to-r from-orange-400 to-pink-400 bg-clip-text text-transparent">18</p>
              </div>
              <div>
                <p className="text-[11px] uppercase tracking-wide text-gray-400">
                  Membres actifs
                </p>
                <p className="mt-0.5 text-lg font-bold bg-gradient-to-r from-purple-400 to-fuchsia-400 bg-clip-text text-transparent">132</p>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}

