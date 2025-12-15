import Layout from '../components/layout/Layout'
import ServicesSection from '../components/home/Services'
import HowItWorks from '../components/home/HowItWorks'

export default function ServicesPage() {
  return (
    <Layout>
      <section className="space-y-3">
        <h1 className="text-3xl font-bold text-[#111827]">Nos services EMS</h1>
        <p className="max-w-2xl text-sm text-[#6B7280] sm:text-base">
          Découvrez comment ElectroMed structure vos offres : perte de poids, renforcement
          musculaire, récupération sportive et bien-être global.
        </p>
      </section>
      <ServicesSection />
      <HowItWorks />
    </Layout>
  )
}


