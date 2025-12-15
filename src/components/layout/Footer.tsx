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
    <footer className="mt-auto border-t border-gray-200 bg-gradient-to-b from-[#F9FAFB] to-white">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2 text-lg font-semibold text-[#111827]">
              <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-tr from-[#2563EB] via-[#10B981] to-[#F97316] text-white shadow-md">
                <Zap className="h-4 w-4" />
              </span>
              <span>ElectroMed</span>
            </Link>
            <p className="text-sm text-[#6B7280] leading-relaxed">
              La plateforme SaaS de référence pour la gestion de vos séances d'électrostimulation médicale.
            </p>
          </div>

          {/* Produit */}
          <div>
            <h4 className="mb-4 text-sm font-semibold text-[#111827]">Produit</h4>
            <ul className="space-y-2">
              {footerLinks.product.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-sm text-[#6B7280] transition hover:text-[#2563EB]"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Légal */}
          <div>
            <h4 className="mb-4 text-sm font-semibold text-[#111827]">Légal</h4>
            <ul className="space-y-2">
              {footerLinks.legal.map((link) => (
                <li key={link.to}>
                  <a
                    href={link.to}
                    className="text-sm text-[#6B7280] transition hover:text-[#2563EB]"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Social */}
          <div>
            <h4 className="mb-4 text-sm font-semibold text-[#111827]">Nous suivre</h4>
            <div className="flex items-center gap-3">
              {socialLinks.map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Suivre ElectroMed sur ${label}`}
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-[#6B7280] shadow-sm ring-1 ring-gray-100 transition hover:-translate-y-0.5 hover:text-[#2563EB] hover:shadow-md"
                >
                  <Icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-gray-100 pt-6 sm:flex-row">
          <p className="text-sm text-[#9CA3AF]">
            © {new Date().getFullYear()} ElectroMed. Tous droits réservés.
          </p>
          <p className="text-xs text-[#9CA3AF]">
            Fait avec ❤️ en France
          </p>
        </div>
      </div>
    </footer>
  )
}


