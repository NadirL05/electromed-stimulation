import Layout from '../components/layout/Layout'
import PricingSection from '../components/home/Pricing'
import FAQ from '../components/home/FAQ'

export default function PricingPage() {
  return (
    <Layout>
      <section className="space-y-3">
        <h1 className="text-3xl font-bold text-[#111827]">Tarifs ElectroMed</h1>
        <p className="max-w-2xl text-sm text-[#6B7280] sm:text-base">
          Des abonnements flexibles pour découvrir l’EMS ou intensifier votre programme,
          avec un suivi professionnel à chaque étape.
        </p>
      </section>
      <PricingSection />
      <FAQ />
    </Layout>
  )
}


