import { Zap, Clock, Award, MapPin, User, HelpCircle, Globe } from 'lucide-react'

const highlights = [
  { icon: Zap, label: 'Résultats en 8 séances' },
  { icon: Clock, label: 'Séances de 20 min' },
  { icon: Award, label: 'Coachs certifiés EMS' },
  { icon: MapPin, label: 'Studios partout en France' },
]

export default function TopBar() {
  return (
    <div className="bg-white border-b border-gray-100">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2 sm:px-6">
        {/* Left side - Highlights */}
        <div className="flex items-center gap-6 overflow-x-auto scrollbar-hide">
          {highlights.map((item, index) => {
            const Icon = item.icon
            return (
              <div
                key={index}
                className="flex items-center gap-2 text-xs font-medium text-gray-700 whitespace-nowrap"
              >
                <Icon className="h-4 w-4 text-orange-500" />
                <span>{item.label}</span>
              </div>
            )
          })}
        </div>

        {/* Right side - Actions */}
        <div className="hidden items-center gap-4 md:flex">
          <button className="flex items-center gap-1.5 text-xs font-medium text-gray-700 hover:text-orange-500 transition-colors">
            <User className="h-4 w-4" />
            <span>Mon ElectroMed</span>
          </button>
          <button className="flex items-center gap-1.5 text-xs font-medium text-gray-700 hover:text-orange-500 transition-colors">
            <HelpCircle className="h-4 w-4" />
            <span>Aide</span>
          </button>
          <button className="flex items-center gap-1.5 text-xs font-medium text-gray-700 hover:text-orange-500 transition-colors">
            <Globe className="h-4 w-4" />
            <span>FR</span>
          </button>
        </div>
      </div>
    </div>
  )
}
