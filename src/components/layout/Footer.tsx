export default function Footer() {
  return (
    <footer className="mt-16 border-t border-gray-200 bg-[#F9FAFB]">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-8 text-sm text-[#6B7280] sm:px-6 sm:flex-row sm:items-center sm:justify-between">
        <p>© {new Date().getFullYear()} ElectroMed. Tous droits réservés.</p>
        <div className="flex flex-wrap items-center gap-4">
          <a href="#confidentialite" className="hover:text-[#111827]">
            Politique de confidentialité
          </a>
          <a href="#cgv" className="hover:text-[#111827]">
            CGV
          </a>
          <div className="flex items-center gap-3">
            <a
              href="#"
              aria-label="Suivre ElectroMed sur Instagram"
              className="h-8 w-8 rounded-full bg-white shadow-sm shadow-black/5 ring-1 ring-gray-100 transition hover:-translate-y-0.5 hover:shadow-md"
            >
              <span className="sr-only">Instagram</span>
            </a>
            <a
              href="#"
              aria-label="Suivre ElectroMed sur LinkedIn"
              className="h-8 w-8 rounded-full bg-white shadow-sm shadow-black/5 ring-1 ring-gray-100 transition hover:-translate-y-0.5 hover:shadow-md"
            >
              <span className="sr-only">LinkedIn</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}


