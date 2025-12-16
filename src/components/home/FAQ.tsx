import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, HelpCircle } from 'lucide-react'

const questions = [
  {
    q: "Qu'est-ce que l'électrostimulation ?",
    a: "L'électrostimulation (EMS) utilise des impulsions électriques douces pour contracter les muscles de manière contrôlée. Combinée à un accompagnement professionnel, elle permet d'optimiser le renforcement musculaire, la perte de poids et la récupération.",
  },
  {
    q: 'Est-ce douloureux ?',
    a: "Non, les séances sont conçues pour être confortables. L'intensité est ajustée en fonction de votre profil et de vos sensations, avec un coach formé à vos côtés.",
  },
  {
    q: 'Combien de temps dure une séance ?',
    a: 'Une séance dure généralement entre 20 et 30 minutes, avec un échauffement et un retour au calme inclus.',
  },
  {
    q: 'Quels sont les résultats ?',
    a: 'La plupart des membres constatent une amélioration de la tonicité, de la posture et de la silhouette après 6 à 8 séances régulières.',
  },
  {
    q: 'Y a-t-il des contre-indications ?',
    a: "Oui, certaines pathologies (port de pacemaker, grossesse, épilepsie, etc.) nécessitent l'avis d'un professionnel de santé. Un questionnaire de santé est systématiquement rempli avant la première séance.",
  },
  {
    q: 'Comment prendre rendez-vous ?',
    a: "Vos membres peuvent réserver directement en ligne via l'application ElectroMed ou depuis votre site web connecté à la plateforme.",
  },
]

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <section className="mt-20 space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="space-y-3 text-center"
      >
        <span className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-purple-100 via-fuchsia-100 to-pink-100 px-4 py-2 text-xs font-semibold text-purple-600 ring-1 ring-purple-200/50">
          <HelpCircle className="h-3.5 w-3.5" />
          FAQ
        </span>
        <h2 className="text-3xl font-bold sm:text-4xl">
          <span className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent">
            Questions
          </span>{' '}
          <span className="bg-gradient-to-r from-purple-500 via-fuchsia-500 to-pink-600 bg-clip-text text-transparent">
            fréquentes
          </span>
        </h2>
        <p className="mx-auto max-w-2xl text-base text-gray-600">
          Tout ce que vos futurs membres veulent savoir avant de réserver leur première séance.
        </p>
      </motion.div>

      <div className="mx-auto max-w-3xl space-y-3">
        {questions.map((item, index) => {
          const isOpen = openIndex === index
          return (
            <motion.div
              key={item.q}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              viewport={{ once: true }}
              className={`group relative overflow-hidden rounded-2xl shadow-lg transition-all duration-300 ${
                isOpen
                  ? 'bg-gradient-to-br from-purple-50 via-fuchsia-50 to-pink-50 ring-2 ring-purple-500/30 shadow-xl shadow-purple-500/20'
                  : 'bg-white ring-1 ring-gray-100 hover:shadow-xl hover:ring-gray-200'
              }`}
            >
              {/* Animated background gradient on hover */}
              {!isOpen && (
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-fuchsia-500/5 to-pink-500/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              )}

              <button
                type="button"
                className="relative flex w-full items-center justify-between gap-4 p-5 text-left"
                onClick={() => setOpenIndex(isOpen ? null : index)}
                aria-expanded={isOpen}
              >
                <span className={`text-sm font-bold sm:text-base ${
                  isOpen
                    ? 'bg-gradient-to-r from-purple-600 via-fuchsia-600 to-pink-600 bg-clip-text text-transparent'
                    : 'text-gray-900'
                }`}>
                  {item.q}
                </span>
                <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition-all duration-300 ${
                  isOpen
                    ? 'bg-gradient-to-r from-purple-500 via-fuchsia-500 to-pink-600 text-white shadow-lg shadow-purple-500/30'
                    : 'bg-gray-100 text-gray-600 group-hover:bg-gradient-to-r group-hover:from-purple-500 group-hover:to-pink-500 group-hover:text-white'
                }`}>
                  <ChevronDown
                    className={`h-4 w-4 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
                  />
                </span>
              </button>
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <p className="relative px-5 pb-5 text-sm leading-relaxed text-gray-700">{item.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )
        })}
      </div>
    </section>
  )
}


