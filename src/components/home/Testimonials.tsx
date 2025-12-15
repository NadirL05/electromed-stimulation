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
    role: 'Membre ElectroMed',
    quote:
      "En quelques séances, j'ai retrouvé de l'énergie et une silhouette plus tonique. Le suivi dans l'application est ultra motivant.",
    rating: 5,
    initials: 'S',
    color: 'from-[#2563EB] to-[#60A5FA]',
  },
  {
    name: 'Julien, 41 ans',
    role: 'Coach EMS',
    quote:
      "La plateforme me permet de gérer tous mes rendez-vous et le suivi de mes clients sans perdre de temps sur l'administratif.",
    rating: 5,
    initials: 'J',
    color: 'from-[#10B981] to-[#34D399]',
  },
  {
    name: 'Claire',
    role: 'Gérante de franchise',
    quote:
      "Je visualise en un coup d'œil le taux de remplissage, les abonnements et la performance de mes coachs. Indispensable au quotidien.",
    rating: 5,
    initials: 'C',
    color: 'from-[#F97316] to-[#FDBA74]',
  },
  {
    name: 'Marc',
    role: 'Sportif amateur',
    quote:
      "Les séances d'électrostimulation ont boosté ma récupération entre deux entraînements. L'organisation des créneaux est super simple.",
    rating: 5,
    initials: 'M',
    color: 'from-[#8B5CF6] to-[#A78BFA]',
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
    <section className="mt-20 space-y-8">
      <motion.div 
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="space-y-2 text-center"
      >
        <span className="inline-block rounded-full bg-[#FDF2F8] px-4 py-1.5 text-xs font-semibold text-[#EC4899]">
          Témoignages
        </span>
        <h2 className="text-2xl font-bold text-[#111827] sm:text-3xl">
          Ils parlent d'ElectroMed
        </h2>
        <p className="mx-auto max-w-2xl text-sm text-[#6B7280] sm:text-base">
          Membres, coachs et gérants de franchises partagent leur expérience.
        </p>
      </motion.div>

      <div className="mx-auto max-w-3xl">
        <div className="relative overflow-hidden rounded-3xl bg-white p-8 shadow-xl ring-1 ring-gray-100">
          {/* Quote icon */}
          <Quote className="absolute -top-2 left-6 h-16 w-16 rotate-180 text-[#2563EB]/10" />
          
          <div className="relative flex items-center justify-between gap-4">
            <button
              type="button"
              aria-label="Témoignage précédent"
              onClick={goPrev}
              className="hidden h-10 w-10 shrink-0 items-center justify-center rounded-full border border-gray-200 text-[#4B5563] transition-all hover:border-[#2563EB] hover:bg-[#EFF6FF] hover:text-[#2563EB] sm:inline-flex"
            >
              <ChevronLeft className="h-5 w-5" />
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
                  <div className="mb-5 flex justify-center">
                    <div className={`flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br ${current.color} text-2xl font-bold text-white shadow-lg`}>
                      {current.initials}
                    </div>
                  </div>
                  
                  {/* Quote */}
                  <p className="mb-5 text-base italic leading-relaxed text-[#374151] sm:text-lg">
                    &ldquo;{current.quote}&rdquo;
                  </p>
                  
                  {/* Author */}
                  <div className="space-y-1">
                    <p className="text-base font-semibold text-[#111827]">{current.name}</p>
                    <p className="text-sm text-[#6B7280]">{current.role}</p>
                  </div>
                  
                  {/* Rating */}
                  <div className="mt-3 flex items-center justify-center gap-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`h-5 w-5 ${
                          i < current.rating ? 'fill-[#F97316] text-[#F97316]' : 'fill-none text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            <button
              type="button"
              aria-label="Témoignage suivant"
              onClick={goNext}
              className="hidden h-10 w-10 shrink-0 items-center justify-center rounded-full border border-gray-200 text-[#4B5563] transition-all hover:border-[#2563EB] hover:bg-[#EFF6FF] hover:text-[#2563EB] sm:inline-flex"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>

          {/* Dots */}
          <div className="mt-6 flex items-center justify-center gap-2">
            {testimonials.map((t, i) => (
              <button
                key={t.name}
                type="button"
                aria-label={`Aller au témoignage ${i + 1}`}
                onClick={() => setIndex(i)}
                className={`h-2.5 rounded-full transition-all duration-300 ${
                  i === index ? 'w-8 bg-[#2563EB]' : 'w-2.5 bg-gray-300 hover:bg-gray-400'
                }`}
              />
            ))}
          </div>

          {/* Mobile navigation */}
          <div className="mt-5 flex justify-center gap-3 sm:hidden">
            <button
              type="button"
              aria-label="Témoignage précédent"
              onClick={goPrev}
              className="inline-flex items-center justify-center rounded-full border border-gray-200 px-4 py-2 text-sm font-medium text-[#4B5563] transition-all hover:border-[#2563EB] hover:text-[#2563EB]"
            >
              <ChevronLeft className="mr-1 h-4 w-4" />
              Précédent
            </button>
            <button
              type="button"
              aria-label="Témoignage suivant"
              onClick={goNext}
              className="inline-flex items-center justify-center rounded-full border border-gray-200 px-4 py-2 text-sm font-medium text-[#4B5563] transition-all hover:border-[#2563EB] hover:text-[#2563EB]"
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


