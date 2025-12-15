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
        className="space-y-2 text-center"
      >
        <span className="inline-block rounded-full bg-[#F3F4F6] px-4 py-1.5 text-xs font-semibold text-[#4B5563]">
          <HelpCircle className="mr-1 inline-block h-3.5 w-3.5" />
          FAQ
        </span>
        <h2 className="text-2xl font-bold text-[#111827] sm:text-3xl">
          Questions fréquentes
        </h2>
        <p className="mx-auto max-w-2xl text-sm text-[#6B7280] sm:text-base">
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
              className={`overflow-hidden rounded-2xl transition-all duration-300 ${
                isOpen 
                  ? 'bg-gradient-to-br from-[#EFF6FF] to-white ring-2 ring-[#2563EB]/20' 
                  : 'bg-white ring-1 ring-gray-100 hover:ring-gray-200'
              }`}
            >
              <button
                type="button"
                className="flex w-full items-center justify-between gap-4 p-5 text-left"
                onClick={() => setOpenIndex(isOpen ? null : index)}
                aria-expanded={isOpen}
              >
                <span className={`text-sm font-semibold sm:text-base ${isOpen ? 'text-[#2563EB]' : 'text-[#111827]'}`}>
                  {item.q}
                </span>
                <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-all duration-300 ${
                  isOpen ? 'bg-[#2563EB] text-white' : 'bg-gray-100 text-[#6B7280]'
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
                    <p className="px-5 pb-5 text-sm leading-relaxed text-[#4B5563]">{item.a}</p>
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


