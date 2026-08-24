import { Helmet } from 'react-helmet-async'
import { lazy, Suspense } from 'react'
import HeroSection from './HeroSection'
import CurveSection from './CurveSection'

// Lazy-load below-fold sections — reduces initial JS parse / TBT on mobile
const ProcessSection      = lazy(() => import('./ProcessSection'))
const TestimonialsSection = lazy(() => import('./TestimonialsSection'))
const CertificationsSection = lazy(() => import('./CertificationsSection'))
const IndustriesSection   = lazy(() => import('./IndustriesSection'))
const ContactSection      = lazy(() => import('./ContactSection'))

const BelowFold = () => (
  <Suspense fallback={null}>
    <ProcessSection />
    <TestimonialsSection />
    <CertificationsSection />
    <IndustriesSection />
    <ContactSection />
  </Suspense>
)

export default function Home() {
  return (
    <>
      <Helmet>
        <title>Versailles Cold Chain — Cold Storage & Temperature-Controlled Logistics</title>
        <meta name="description" content="Enterprise cold storage and temperature-controlled logistics in Punjab. FSSAI · ISO 22000 · GDP certified. Zero excursions, full traceability." />
        <link rel="canonical" href="https://versaillecoldchain.com/" />
      </Helmet>

      <HeroSection />
      <CurveSection />
      <BelowFold />
    </>
  )
}
