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
    <footer className="relative mt-auto overflow-hidden border-t border-gray-200 bg-gradient-to-b from-gray-50 to-white">
      {/* Decorative background gradient */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -left-40 top-0 h-96 w-96 rounded-full bg-gradient-to-br from-blue-400/10 via-cyan-400/10 to-teal-400/10 blur-3xl" />
        <div className="absolute -right-40 bottom-0 h-96 w-96 rounded-full bg-gradient-to-tr from-purple-400/10 via-pink-400/10 to-orange-400/10 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="space-y-4">
            <Link to="/" className="group flex items-center gap-2.5 text-lg font-bold">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-orange-500 via-pink-500 to-purple-600 text-white shadow-lg shadow-orange-500/30 transition-all group-hover:scale-110 group-hover:shadow-xl group-hover:shadow-orange-500/40">
                <Zap className="h-5 w-5" />
              </span>
              <span className="bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                ElectroMed
              </span>
            </Link>
            <p className="text-sm text-gray-600 leading-relaxed">
              La plateforme SaaS de référence pour la gestion de vos séances d'électrostimulation médicale.
            </p>
          </div>

          {/* Produit */}
          <div>
            <h4 className="mb-4 text-sm font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
              Produit
            </h4>
            <ul className="space-y-2.5">
              {footerLinks.product.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="group inline-flex items-center gap-1 text-sm text-gray-600 transition-all hover:translate-x-1 hover:text-transparent hover:bg-gradient-to-r hover:from-blue-600 hover:to-cyan-600 hover:bg-clip-text"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Légal */}
          <div>
            <h4 className="mb-4 text-sm font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
              Légal
            </h4>
            <ul className="space-y-2.5">
              {footerLinks.legal.map((link) => (
                <li key={link.to}>
                  <a
                    href={link.to}
                    className="group inline-flex items-center gap-1 text-sm text-gray-600 transition-all hover:translate-x-1 hover:text-transparent hover:bg-gradient-to-r hover:from-blue-600 hover:to-cyan-600 hover:bg-clip-text"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Social */}
          <div>
            <h4 className="mb-4 text-sm font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
              Nous suivre
            </h4>
            <div className="flex items-center gap-3">
              {socialLinks.map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Suivre ElectroMed sur ${label}`}
                  className="group flex h-11 w-11 items-center justify-center rounded-xl bg-white text-gray-600 shadow-md ring-1 ring-gray-100 transition-all hover:-translate-y-1 hover:bg-gradient-to-r hover:from-orange-500 hover:via-pink-500 hover:to-purple-600 hover:text-white hover:shadow-xl hover:shadow-orange-500/30 hover:ring-transparent"
                >
                  <Icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-gray-200 pt-6 sm:flex-row">
          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} ElectroMed. Tous droits réservés.
          </p>
          <p className="flex items-center gap-1.5 text-sm text-gray-500">
            Fait avec{' '}
            <span className="inline-block animate-pulse text-base">❤️</span>{' '}
            en France
          </p>
        </div>
      </div>
    </footer>
  )
}


