import { Suspense, lazy, useEffect, useRef } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import Navigation from './components/Navigation'
import Footer from './components/Footer'
import WhatsAppButton from './components/WhatsAppButton'
import Loader from './components/Loader'
import Home from './pages/Home'

const About         = lazy(() => import('./pages/About'))
const Services      = lazy(() => import('./pages/Services'))
const Facilities    = lazy(() => import('./pages/Facilities'))
const Edge          = lazy(() => import('./pages/Edge'))
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy'))
const LegalTerms    = lazy(() => import('./pages/LegalTerms'))

function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return null
}

function SnowEffect() {
  const canvasRef = useRef(null)

  useEffect(() => {
    // Skip on mobile — 22 animated DOM elements are expensive on slow CPUs
    if (window.innerWidth <= 768) return
    // Skip if user prefers reduced motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const canvas = canvasRef.current
    if (!canvas) return

    const run = () => {
      const chars = ['❄', '❅', '❆']
      const created = []
      for (let i = 0; i < 22; i++) {
        const el = document.createElement('span')
        el.className = 'sf'
        el.textContent = chars[Math.floor(Math.random() * chars.length)]
        el.style.cssText = [
          'left:'              + (Math.random() * 100)            + '%',
          'font-size:'         + (8  + Math.random() * 10)        + 'px',
          'animation-duration:'+ (10 + Math.random() * 16)        + 's',
          'animation-delay:'   + -(Math.random() * 18)            + 's',
          '--sf-o:'            + (0.55 + Math.random() * 0.45),
        ].join(';')
        canvas.appendChild(el)
        created.push(el)
      }
      return () => created.forEach(el => el.remove())
    }

    // Defer to idle so it never blocks first paint
    let cleanup = () => {}
    if ('requestIdleCallback' in window) {
      const id = requestIdleCallback(() => { cleanup = run() ?? (() => {}) }, { timeout: 3000 })
      return () => { cancelIdleCallback(id); cleanup() }
    } else {
      const t = setTimeout(() => { cleanup = run() ?? (() => {}) }, 1500)
      return () => { clearTimeout(t); cleanup() }
    }
  }, [])

  return (
    <div
      ref={canvasRef}
      aria-hidden="true"
      style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 99998, overflow: 'hidden' }}
    />
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Loader />
      <Navigation />
      <SnowEffect />
      <main id="main-content">
        <Suspense fallback={<div style={{ minHeight: '100vh', background: '#070f30' }} />}>
          <Routes>
            <Route path="/"          element={<Home />} />
            <Route path="/about"     element={<About />} />
            <Route path="/services"  element={<Services />} />
            <Route path="/facilities" element={<Facilities />} />
            <Route path="/edge"           element={<Edge />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/legal-terms"    element={<LegalTerms />} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
      <WhatsAppButton />
    </BrowserRouter>
  )
}
