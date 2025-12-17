import { Link } from 'react-router-dom'
import { Instagram, Linkedin, Facebook, Zap, Mail, Phone, MapPin } from 'lucide-react'

const footerLinks = {
  product: [
    { label: 'Accueil', to: '/' },
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
    <footer className="mt-auto bg-gray-900 text-white">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-2.5">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-orange-500 to-orange-600 text-white shadow-lg">
                <Zap className="h-6 w-6" />
              </span>
              <span className="text-xl font-bold">
                Electro<span className="text-orange-500">Med</span>
              </span>
            </Link>
            <p className="text-sm text-gray-400 leading-relaxed max-w-sm">
              Transformez votre corps en 20 minutes grâce à l'électrostimulation.
              Résultats visibles en 8 séances avec nos coachs certifiés.
            </p>

            {/* Contact Info */}
            <div className="space-y-2">
              <a href="mailto:contact@electromed.fr" className="flex items-center gap-2 text-sm text-gray-400 hover:text-orange-500 transition-colors">
                <Mail className="h-4 w-4" />
                contact@electromed.fr
              </a>
              <a href="tel:+33123456789" className="flex items-center gap-2 text-sm text-gray-400 hover:text-orange-500 transition-colors">
                <Phone className="h-4 w-4" />
                01 23 45 67 89
              </a>
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <MapPin className="h-4 w-4" />
                Paris, France
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="mb-4 text-sm font-bold uppercase tracking-wider text-white">Navigation</h4>
            <ul className="space-y-2">
              {footerLinks.product.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-sm text-gray-400 transition hover:text-orange-500"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Légal */}
          <div>
            <h4 className="mb-4 text-sm font-bold uppercase tracking-wider text-white">Légal</h4>
            <ul className="space-y-2">
              {footerLinks.legal.map((link) => (
                <li key={link.to}>
                  <a
                    href={link.to}
                    className="text-sm text-gray-400 transition hover:text-orange-500"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Social & Bottom */}
        <div className="mt-8 flex flex-col items-center justify-between gap-4 border-t border-gray-800 pt-8 sm:flex-row">
          <div className="flex items-center gap-3">
            {socialLinks.map(({ icon: Icon, label, href }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Suivre ElectroMed sur ${label}`}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-800 text-gray-400 transition hover:bg-orange-500 hover:text-white"
              >
                <Icon className="h-5 w-5" />
              </a>
            ))}
          </div>

          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} ElectroMed. Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  )
}
