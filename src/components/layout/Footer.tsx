import { Link } from 'react-router-dom'
import { Instagram, Linkedin, Facebook, Zap, Mail, Phone, MapPin } from 'lucide-react'

const footerLinks = {
  product: [
    { label: 'Trouver un studio', to: '/studios' },
    { label: 'Nos programmes', to: '/services' },
    { label: 'Tarifs', to: '/pricing' },
    { label: 'Résultats', to: '/results' },
  ],
  company: [
    { label: 'À propos', to: '/about' },
    { label: 'Carrières', to: '/careers' },
    { label: 'Presse', to: '/press' },
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
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-5">
          {/* Brand */}
          <div className="lg:col-span-2 space-y-6">
            <Link to="/" className="flex items-center gap-2.5">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-orange-500 to-orange-600 text-white shadow-lg">
                <Zap className="h-6 w-6" />
              </span>
              <span className="text-xl font-bold">
                Electro<span className="text-orange-500">Med</span>
              </span>
            </Link>
            <p className="text-sm text-gray-400 leading-relaxed max-w-sm">
              La plateforme de référence pour l'électrostimulation médicale. Transformez votre corps en seulement 20 minutes par séance.
            </p>

            {/* Contact Info */}
            <div className="space-y-3">
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

          {/* Nos Services */}
          <div>
            <h4 className="mb-4 text-sm font-bold uppercase tracking-wider text-white">Nos Services</h4>
            <ul className="space-y-3">
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

          {/* Entreprise */}
          <div>
            <h4 className="mb-4 text-sm font-bold uppercase tracking-wider text-white">Entreprise</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
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
            <ul className="space-y-3">
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
        <div className="mt-12 flex flex-col items-center justify-between gap-6 border-t border-gray-800 pt-8 lg:flex-row">
          <div className="flex items-center gap-4">
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
