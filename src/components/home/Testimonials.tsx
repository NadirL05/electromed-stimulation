import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react'

interface Testimonial {
  name: string
  role: string
  quote: string
  rating: number
  initials: string
  color: string
}

const testimonials: Testimonial[] = [
  {
    name: 'Sophie, 34 ans',
    role: 'Membre depuis 6 mois',
    quote:
      "En quelques séances, j'ai retrouvé de l'énergie et une silhouette plus tonique. Le suivi dans l'application est ultra motivant !",
    rating: 5,
    initials: 'S',
    color: 'bg-orange-500',
  },
  {
    name: 'Julien, 41 ans',
    role: 'Coach certifié EMS',
    quote:
      "La plateforme me permet de gérer tous mes rendez-vous et le suivi de mes clients sans perdre de temps sur l'administratif.",
    rating: 5,
    initials: 'J',
    color: 'bg-purple-600',
  },
  {
    name: 'Claire',
    role: 'Gérante de studio',
    quote:
      "Je visualise en un coup d'œil le taux de remplissage, les abonnements et la performance de mes coachs. Indispensable !",
    rating: 5,
    initials: 'C',
    color: 'bg-blue-500',
  },
  {
    name: 'Marc',
    role: 'Sportif amateur',
    quote:
      "Les séances d'électrostimulation ont boosté ma récupération entre deux entraînements. Je recommande à 100% !",
    rating: 5,
    initials: 'M',
    color: 'bg-emerald-500',
  },
]

export default function Testimonials() {
  const [index, setIndex] = useState(0)

  const goNext = () => {
    setIndex((prev) => (prev + 1) % testimonials.length)
  }

  const goPrev = () => {
    setIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  const current = testimonials[index]

  return (
    <section className="py-20">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-12"
      >
        <span className="inline-block rounded-full bg-pink-100 px-4 py-1.5 text-xs font-bold text-pink-600 uppercase tracking-wider">
          Témoignages
        </span>
        <h2 className="mt-4 text-3xl font-black text-gray-900 sm:text-4xl">
          Ils ont <span className="text-orange-500">transformé</span> leur corps
        </h2>
        <p className="mt-4 mx-auto max-w-2xl text-gray-600">
          Découvrez les témoignages de nos membres satisfaits.
        </p>
      </motion.div>

      <div className="mx-auto max-w-3xl">
        <div className="relative overflow-hidden rounded-2xl bg-white p-8 shadow-xl">
          {/* Quote icon */}
          <Quote className="absolute -top-2 left-6 h-16 w-16 rotate-180 text-orange-500/10" />

          <div className="relative flex items-center justify-between gap-4">
            <button
              type="button"
              aria-label="Témoignage précédent"
              onClick={goPrev}
              className="hidden h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gray-100 text-gray-600 transition-all hover:bg-orange-500 hover:text-white sm:inline-flex"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>

            <div className="flex-1">
              <AnimatePresence mode="wait">
                <motion.div
                  key={current.name}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="text-center"
                >
                  {/* Avatar */}
                  <div className="mb-6 flex justify-center">
                    <div className={`flex h-20 w-20 items-center justify-center rounded-full ${current.color} text-3xl font-bold text-white shadow-lg`}>
                      {current.initials}
                    </div>
                  </div>

                  {/* Quote */}
                  <p className="mb-6 text-lg italic leading-relaxed text-gray-700 sm:text-xl">
                    &ldquo;{current.quote}&rdquo;
                  </p>

                  {/* Rating */}
                  <div className="mb-4 flex items-center justify-center gap-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`h-5 w-5 ${
                          i < current.rating ? 'fill-orange-400 text-orange-400' : 'fill-none text-gray-300'
                        }`}
                      />
                    ))}
                  </div>

                  {/* Author */}
                  <div>
                    <p className="text-lg font-bold text-gray-900">{current.name}</p>
                    <p className="text-sm text-gray-500">{current.role}</p>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            <button
              type="button"
              aria-label="Témoignage suivant"
              onClick={goNext}
              className="hidden h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gray-100 text-gray-600 transition-all hover:bg-orange-500 hover:text-white sm:inline-flex"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          </div>

          {/* Dots */}
          <div className="mt-8 flex items-center justify-center gap-2">
            {testimonials.map((t, i) => (
              <button
                key={t.name}
                type="button"
                aria-label={`Aller au témoignage ${i + 1}`}
                onClick={() => setIndex(i)}
                className={`h-3 rounded-full transition-all duration-300 ${
                  i === index ? 'w-8 bg-orange-500' : 'w-3 bg-gray-300 hover:bg-gray-400'
                }`}
              />
            ))}
          </div>

          {/* Mobile navigation */}
          <div className="mt-6 flex justify-center gap-3 sm:hidden">
            <button
              type="button"
              aria-label="Témoignage précédent"
              onClick={goPrev}
              className="inline-flex items-center justify-center rounded-full bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 transition-all hover:bg-orange-500 hover:text-white"
            >
              <ChevronLeft className="mr-1 h-4 w-4" />
              Précédent
            </button>
            <button
              type="button"
              aria-label="Témoignage suivant"
              onClick={goNext}
              className="inline-flex items-center justify-center rounded-full bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 transition-all hover:bg-orange-500 hover:text-white"
            >
              Suivant
              <ChevronRight className="ml-1 h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
