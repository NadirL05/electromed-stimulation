import { useState } from 'react'
import { motion } from 'framer-motion'
import { Search, MapPin } from 'lucide-react'

const popularCities = [
  'Paris',
  'Lyon',
  'Marseille',
  'Bordeaux',
  'Toulouse',
  'Nice',
  'Nantes',
  'Strasbourg',
]

export default function StudioFinder() {
  const [searchQuery, setSearchQuery] = useState('')

  return (
    <section className="relative bg-white py-12 shadow-lg -mt-1">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
          {/* Left - Title */}
          <div>
            <h2 className="text-2xl font-black text-gray-900 uppercase tracking-tight sm:text-3xl">
              Trouver votre studio
            </h2>
            <p className="mt-2 text-gray-600">
              Accès à tous les{' '}
              <span className="font-bold text-orange-500">+25 studios</span>{' '}
              en France
            </p>
          </div>

          {/* Right - Search */}
          <div className="flex-1 lg:max-w-xl">
            <div className="relative">
              <input
                type="text"
                placeholder="Rechercher par ville"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-xl border-2 border-gray-200 bg-white py-4 pl-12 pr-4 text-gray-900 placeholder-gray-400 focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500/20 transition-all"
              />
              <MapPin className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
              <button className="absolute right-2 top-1/2 -translate-y-1/2 rounded-lg bg-gray-100 p-2 text-gray-600 hover:bg-orange-500 hover:text-white transition-colors">
                <Search className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Popular Cities */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
          className="mt-8"
        >
          <div className="flex flex-wrap gap-2">
            {popularCities.map((city) => (
              <button
                key={city}
                className="rounded-full border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:border-orange-500 hover:bg-orange-50 hover:text-orange-500 transition-all"
              >
                {city}
              </button>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
