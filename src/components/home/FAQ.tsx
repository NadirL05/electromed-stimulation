import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'

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
    <section className="mt-16 space-y-6">
      <div className="space-y-2 text-center">
        <h2 className="text-2xl font-semibold text-[#111827]">Questions fréquentes</h2>
        <p className="text-sm text-[#6B7280] sm:text-base">
          Tout ce que vos futurs membres veulent savoir avant de réserver leur première séance.
        </p>
      </div>

      <div className="mx-auto max-w-3xl space-y-3">
        {questions.map((item, index) => {
          const isOpen = openIndex === index
          return (
            <div
              key={item.q}
              className="rounded-2xl bg-white p-4 shadow-sm shadow-black/5 ring-1 ring-gray-100"
            >
              <button
                type="button"
                className="flex w-full items-center justify-between gap-4 text-left"
                onClick={() => setOpenIndex(isOpen ? null : index)}
                aria-expanded={isOpen}
              >
                <span className="text-sm font-medium text-[#111827] sm:text-base">
                  {item.q}
                </span>
                <ChevronDown
                  className={`h-4 w-4 shrink-0 text-[#6B7280] transition-transform ${
                    isOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <p className="mt-3 text-sm text-[#4B5563]">{item.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )
        })}
      </div>
    </section>
  )
}


