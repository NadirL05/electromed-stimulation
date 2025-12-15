import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Star, ChevronLeft, ChevronRight } from 'lucide-react'
import { Card } from '../ui/Card'

interface Testimonial {
  name: string
  role: string
  quote: string
  rating: number
}

const testimonials: Testimonial[] = [
  {
    name: 'Sophie, 34 ans',
    role: 'Membre ElectroMed',
    quote:
      "En quelques séances, j’ai retrouvé de l’énergie et une silhouette plus tonique. Le suivi dans l’application est ultra motivant.",
    rating: 5,
  },
  {
    name: 'Julien, 41 ans',
    role: 'Coach EMS',
    quote:
      "La plateforme me permet de gérer tous mes rendez-vous et le suivi de mes clients sans perdre de temps sur l’administratif.",
    rating: 5,
  },
  {
    name: 'Claire',
    role: 'Gérante de franchise',
    quote:
      "Je visualise en un coup d’œil le taux de remplissage, les abonnements et la performance de mes coachs. Indispensable au quotidien.",
    rating: 5,
  },
  {
    name: 'Marc',
    role: 'Sportif amateur',
    quote:
      "Les séances d’électrostimulation ont boosté ma récupération entre deux entraînements. L’organisation des créneaux est super simple.",
    rating: 5,
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
    <section className="mt-16 space-y-6">
      <div className="space-y-2 text-center">
        <h2 className="text-2xl font-semibold text-[#111827]">Ils parlent d’ElectroMed</h2>
        <p className="text-sm text-[#6B7280] sm:text-base">
          Membres, coachs et gérants de franchises partagent leur expérience.
        </p>
      </div>

      <div className="mx-auto max-w-3xl">
        <Card>
          <div className="flex items-center justify-between gap-3">
            <button
              type="button"
              aria-label="Témoignage précédent"
              onClick={goPrev}
              className="hidden h-9 w-9 items-center justify-center rounded-full border border-gray-200 text-[#4B5563] hover:bg-gray-50 sm:inline-flex"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>

            <div className="flex-1">
              <AnimatePresence mode="wait">
                <motion.div
                  key={current.name}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.25 }}
                >
                  <p className="mb-3 text-sm text-[#4B5563] sm:text-base">&ldquo;{current.quote}&rdquo;</p>
                  <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <p className="text-sm font-semibold text-[#111827]">{current.name}</p>
                      <p className="text-xs text-[#6B7280]">{current.role}</p>
                    </div>
                    <div className="flex items-center gap-1 text-[#F97316]">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < current.rating ? 'fill-[#F97316]' : 'fill-none text-gray-300'
                          }`}
                        />
                      ))}
                      <span className="ml-1 text-xs text-[#6B7280]">5.0 / 5</span>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            <button
              type="button"
              aria-label="Témoignage suivant"
              onClick={goNext}
              className="hidden h-9 w-9 items-center justify-center rounded-full border border-gray-200 text-[#4B5563] hover:bg-gray-50 sm:inline-flex"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>

          <div className="mt-4 flex items-center justify-center gap-2">
            {testimonials.map((t, i) => (
              <button
                key={t.name}
                type="button"
                aria-label={`Aller au témoignage ${i + 1}`}
                onClick={() => setIndex(i)}
                className={`h-2.5 rounded-full transition-all ${
                  i === index ? 'w-6 bg-[#2563EB]' : 'w-2 bg-gray-300'
                }`}
              />
            ))}
          </div>

          <div className="mt-4 flex justify-between gap-3 sm:hidden">
            <button
              type="button"
              aria-label="Témoignage précédent"
              onClick={goPrev}
              className="inline-flex flex-1 items-center justify-center rounded-full border border-gray-200 px-3 py-2 text-xs text-[#4B5563] hover:bg-gray-50"
            >
              <ChevronLeft className="mr-1 h-3 w-3" />
              Précédent
            </button>
            <button
              type="button"
              aria-label="Témoignage suivant"
              onClick={goNext}
              className="inline-flex flex-1 items-center justify-center rounded-full border border-gray-200 px-3 py-2 text-xs text-[#4B5563] hover:bg-gray-50"
            >
              Suivant
              <ChevronRight className="ml-1 h-3 w-3" />
            </button>
          </div>
        </Card>
      </div>
    </section>
  )
}


