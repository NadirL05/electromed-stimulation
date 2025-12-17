import { Link } from 'react-router-dom'
import { Instagram, Linkedin, Facebook, Zap } from 'lucide-react'

const footerLinks = {
  product: [
    { label: 'Services', to: '/services' },
    { label: 'Tarifs', to: '/pricing' },
    { label: 'Contact', to: '/contact' },
  ],
  legal: [
    { label: 'Politique de confidentialité', to: '#confidentialite' },
    { label: 'Conditions générales', to: '#cgv' },
    { label: 'Mentions légales', to: '#mentions' },
  ],
}

const socialLinks = [
  { icon: Instagram, label: 'Instagram', href: 'https://instagram.com/electromed' },
  { icon: Facebook, label: 'Facebook', href: 'https://facebook.com/electromed' },
  { icon: Linkedin, label: 'LinkedIn', href: 'https://linkedin.com/company/electromed' },
]

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-gray-200/50 bg-gradient-to-b from-white via-gray-50/50 to-white">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="space-y-4">
            <Link to="/" className="group flex items-center gap-3 text-xl font-bold text-gray-900 transition-all hover:scale-105">
              <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-orange-500 via-pink-500 to-purple-600 text-white shadow-lg shadow-orange-500/30 transition-all group-hover:scale-110 group-hover:rotate-3 group-hover:shadow-xl">
                <Zap className="h-5 w-5" />
              </span>
              <span className="bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent group-hover:from-orange-600 group-hover:via-pink-600 group-hover:to-purple-600 transition-all">
                ElectroMed
              </span>
            </Link>
            <p className="text-sm text-gray-600 leading-relaxed max-w-xs">
              La plateforme SaaS de référence pour la gestion de vos séances d'électrostimulation médicale.
            </p>
          </div>

          {/* Produit */}
          <div>
            <h4 className="mb-5 text-sm font-bold text-gray-900 uppercase tracking-wide">Produit</h4>
            <ul className="space-y-3">
              {footerLinks.product.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-sm text-gray-600 transition-all duration-200 hover:text-transparent hover:bg-gradient-to-r hover:from-orange-500 hover:via-pink-500 hover:to-purple-600 hover:bg-clip-text hover:font-medium"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Légal */}
          <div>
            <h4 className="mb-5 text-sm font-bold text-gray-900 uppercase tracking-wide">Légal</h4>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.to}>
                  <a
                    href={link.to}
                    className="text-sm text-gray-600 transition-all duration-200 hover:text-transparent hover:bg-gradient-to-r hover:from-orange-500 hover:via-pink-500 hover:to-purple-600 hover:bg-clip-text hover:font-medium"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Social */}
          <div>
            <h4 className="mb-5 text-sm font-bold text-gray-900 uppercase tracking-wide">Nous suivre</h4>
            <div className="flex items-center gap-3">
              {socialLinks.map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Suivre ElectroMed sur ${label}`}
                  className="group flex h-12 w-12 items-center justify-center rounded-2xl bg-white/80 backdrop-blur-sm text-gray-600 shadow-md ring-1 ring-gray-200/50 transition-all duration-300 hover:-translate-y-1 hover:scale-110 hover:bg-gradient-to-br hover:from-orange-500 hover:via-pink-500 hover:to-purple-600 hover:text-white hover:shadow-xl hover:shadow-orange-500/30 hover:ring-0"
                >
                  <Icon className="h-5 w-5 transition-transform group-hover:scale-110" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-gray-200/50 pt-8 sm:flex-row">
          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} ElectroMed. Tous droits réservés.
          </p>
          <p className="text-xs text-gray-400 flex items-center gap-1.5">
            Fait avec <span className="text-red-500 animate-pulse">❤️</span> en France
          </p>
        </div>
      </div>
    </footer>
  )
}


