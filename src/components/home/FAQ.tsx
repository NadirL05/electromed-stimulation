import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, HelpCircle } from 'lucide-react'

const questions = [
  {
    q: "Qu'est-ce que l'électrostimulation (EMS) ?",
    a: "L'électrostimulation utilise des impulsions électriques douces pour contracter les muscles de manière contrôlée. Combinée à un accompagnement professionnel, elle permet d'optimiser le renforcement musculaire, la perte de poids et la récupération en seulement 20 minutes.",
  },
  {
    q: 'Est-ce douloureux ?',
    a: "Non, les séances sont conçues pour être confortables. L'intensité est ajustée en fonction de votre profil et de vos sensations, avec un coach certifié à vos côtés pour vous guider.",
  },
  {
    q: 'Combien de temps dure une séance ?',
    a: 'Une séance dure généralement 20 minutes, avec un échauffement et un retour au calme inclus. L\'équivalent de 4 heures de sport traditionnel !',
  },
  {
    q: 'En combien de temps voit-on des résultats ?',
    a: 'La plupart des membres constatent une amélioration de la tonicité et de la silhouette après 6 à 8 séances régulières. Les premiers effets sur l\'énergie se ressentent dès les premières séances.',
  },
  {
    q: 'Y a-t-il des contre-indications ?',
    a: "Certaines pathologies (port de pacemaker, grossesse, épilepsie) nécessitent l'avis d'un médecin. Un questionnaire de santé est rempli avant la première séance pour garantir votre sécurité.",
  },
  {
    q: 'Comment prendre rendez-vous ?',
    a: "Vous pouvez réserver directement en ligne via notre application ou site web. Choisissez votre créneau, votre studio et confirmez en quelques clics !",
  },
]

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <section className="py-20">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-12"
      >
        <span className="inline-block rounded-full bg-gray-100 px-4 py-1.5 text-xs font-bold text-gray-600 uppercase tracking-wider">
          <HelpCircle className="mr-1 inline-block h-3.5 w-3.5" />
          FAQ
        </span>
        <h2 className="mt-4 text-3xl font-black text-gray-900 sm:text-4xl">
          Questions <span className="text-orange-500">fréquentes</span>
        </h2>
        <p className="mt-4 mx-auto max-w-2xl text-gray-600">
          Tout ce que vous voulez savoir avant de réserver votre première séance.
        </p>
      </motion.div>

      <div className="mx-auto max-w-3xl space-y-4">
        {questions.map((item, index) => {
          const isOpen = openIndex === index
          return (
            <motion.div
              key={item.q}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              viewport={{ once: true }}
              className={`overflow-hidden rounded-xl transition-all duration-300 ${
                isOpen
                  ? 'bg-orange-50 ring-2 ring-orange-500/20'
                  : 'bg-white shadow-md hover:shadow-lg'
              }`}
            >
              <button
                type="button"
                className="flex w-full items-center justify-between gap-4 p-5 text-left"
                onClick={() => setOpenIndex(isOpen ? null : index)}
                aria-expanded={isOpen}
              >
                <span className={`text-sm font-semibold sm:text-base ${isOpen ? 'text-orange-600' : 'text-gray-900'}`}>
                  {item.q}
                </span>
                <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-all duration-300 ${
                  isOpen ? 'bg-orange-500 text-white' : 'bg-gray-100 text-gray-600'
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
                    <p className="px-5 pb-5 text-sm leading-relaxed text-gray-600">{item.a}</p>
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
