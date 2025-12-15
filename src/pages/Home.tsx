import Layout from '../components/layout/Layout'
import Hero from '../components/home/Hero'
import Stats from '../components/home/Stats'
import HowItWorks from '../components/home/HowItWorks'
import Services from '../components/home/Services'
import PricingSection from '../components/home/Pricing'
import Testimonials from '../components/home/Testimonials'
import FAQ from '../components/home/FAQ'

export default function Home() {
  return (
    <Layout>
      <Hero />
      <Stats />
      <HowItWorks />
      <Services />
      <PricingSection />
      <Testimonials />
      <FAQ />
    </Layout>
  )
}


