import { motion } from 'framer-motion'
import { Button } from '../ui/Button'
import { Zap, Gift, ArrowRight } from 'lucide-react'

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-orange-500 via-orange-400 to-orange-500">
      {/* Background Pattern - "ELECTROMED" repeated */}
      <div className="pointer-events-none absolute inset-0 select-none overflow-hidden">
        <div className="absolute inset-0 flex flex-col justify-center opacity-[0.08]">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="whitespace-nowrap text-[120px] font-black leading-none text-white tracking-tight"
              style={{
                transform: `translateX(${i % 2 === 0 ? '-5%' : '5%'})`,
              }}
            >
              ELECTROMED ELECTROMED ELECTROMED ELECTROMED
            </div>
          ))}
        </div>
      </div>

      <div className="relative mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:py-20">
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="relative z-10"
          >
            {/* Promotional Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mb-6"
            >
              <span className="text-orange-100 text-lg font-semibold uppercase tracking-wide">
                PROFITEZ DE
              </span>
            </motion.div>

            {/* Main Headline */}
            <h1 className="text-4xl font-black leading-none sm:text-5xl lg:text-6xl xl:text-7xl">
              <span className="text-white">VOTRE</span>
              <br />
              <span className="text-purple-900">1ÈRE SÉANCE</span>
              <br />
              <span className="text-white">OFFERTE*</span>
            </h1>

            {/* CTA Buttons */}
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
              <Button
                variant="primary"
                size="lg"
                className="group bg-purple-700 hover:bg-purple-800 text-white font-bold px-8 py-4 rounded-lg shadow-xl shadow-purple-900/30 hover:shadow-2xl transition-all"
              >
                <span className="flex items-center gap-2">
                  S'INSCRIRE !
                  <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                </span>
              </Button>
              <Button
                variant="secondary"
                size="lg"
                className="border-2 border-purple-700 bg-transparent text-purple-900 font-bold px-8 py-4 rounded-lg hover:bg-purple-700/10 transition-all"
              >
                VOIR LES TARIFS
              </Button>
            </div>

            {/* Bonus Gift */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="mt-6 flex items-center gap-2 text-purple-900 font-bold"
            >
              <Gift className="h-5 w-5" />
              <span>+ UN KIT DE BIENVENUE OFFERT</span>
            </motion.div>

            {/* Fine Print */}
            <p className="mt-6 text-sm text-orange-100 max-w-md leading-relaxed">
              *Offre de Bienvenue valable pour une première inscription à un abonnement
              mensuel Starter (49€/mois), Premium (79€/mois) ou Elite (99€/mois).
              Hors frais d'inscription. Engagement 3 mois minimum.
            </p>
          </motion.div>

          {/* Right Content - Image Area */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 0.1 }}
            className="relative"
          >
            {/* Badge floating */}
            <motion.div
              animate={{
                y: [0, -10, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="absolute -top-2 right-4 z-20 sm:right-8 lg:right-12"
            >
              <div className="flex h-24 w-24 sm:h-28 sm:w-28 items-center justify-center rounded-full bg-gray-900 text-white shadow-2xl">
                <div className="text-center">
                  <span className="block text-xs font-bold text-orange-400">BOOSTEZ</span>
                  <span className="block text-sm font-black">VOTRE</span>
                  <span className="block text-lg font-black text-orange-400">CORPS</span>
                </div>
              </div>
            </motion.div>

            {/* Image Placeholder */}
            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-gradient-to-br from-orange-300/50 to-orange-600/50 shadow-2xl sm:aspect-[3/4] lg:aspect-[4/5]">
              {/* Placeholder content - replace with actual image */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center text-white/80">
                  <Zap className="mx-auto h-16 w-16 mb-4" />
                  <p className="text-lg font-bold">Image EMS</p>
                  <p className="text-sm">Personne en séance</p>
                </div>
              </div>

              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-orange-600/40 via-transparent to-transparent" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
