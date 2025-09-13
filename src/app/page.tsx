import Navbar from '@/components/landing/Navbar'
import Hero from '@/components/landing/Hero'

import Features from '@/components/landing/Features'
import UseCases from '@/components/landing/UseCases'
import FeedbackControl from '@/components/landing/FeedbackControl'
import Connections from '@/components/landing/Connections'
import PrivacySection from '@/components/landing/PrivacySection'
import SmartSearch from '@/components/landing/SmartSearch'
import Pricing from '@/components/landing/Pricing'
import Footer from '@/components/landing/Footer'

export default function Home() {
  return (
    <div className="bg-black text-white min-h-screen">
      <Navbar/>
      <Hero />
      <Features />
      <UseCases />
      <FeedbackControl />
      <Connections />
      <PrivacySection />
      <SmartSearch />
      <Pricing />
      <Footer/>
    </div>
  )
}
