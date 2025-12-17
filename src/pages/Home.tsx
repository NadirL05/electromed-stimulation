import Layout from '../components/layout/Layout'
import Hero from '../components/home/Hero'
import StudioFinder from '../components/home/StudioFinder'
import Stats from '../components/home/Stats'
import HowItWorks from '../components/home/HowItWorks'
import Services from '../components/home/Services'
import PricingSection from '../components/home/Pricing'
import Testimonials from '../components/home/Testimonials'
import FAQ from '../components/home/FAQ'

export default function Home() {
  return (
    <Layout fullWidth>
      <Hero />
      <StudioFinder />
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <Stats />
        <HowItWorks />
        <Services />
        <PricingSection />
        <Testimonials />
        <FAQ />
      </div>
    </Layout>
  )
}
