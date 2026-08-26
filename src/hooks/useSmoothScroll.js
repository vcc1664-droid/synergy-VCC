import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import { ScrollSmoother, ScrollTrigger, prefersReducedMotion } from '../lib/gsap'

/**
 * Creates a single GSAP ScrollSmoother instance for the whole app.
 *
 * ScrollSmoother eases the visual scroll position while leaving native
 * document scroll (window.scrollY, scrollIntoView, browser back/forward,
 * scrollbar drag) fully intact — it only smooths what's rendered, so
 * every existing scroll-based feature keeps working unchanged.
 *
 * Desktop wheel/trackpad get the eased feel; touch devices are left at
 * `smoothTouch: false` so mobile scrolling stays fully native.
 * Disabled entirely when the user prefers reduced motion.
 */
export default function useSmoothScroll() {
  const location = useLocation()
  const smootherRef = useRef(null)

  useEffect(() => {
    if (prefersReducedMotion()) return

    const smoother = ScrollSmoother.create({
      wrapper: '#smooth-wrapper',
      content: '#smooth-content',
      smooth: 1,
      smoothTouch: false,
      normalizeScroll: true,
      ignoreMobileResize: true,
      effects: false,
    })
    smootherRef.current = smoother
    document.documentElement.classList.add('has-smooth-scroll')

    return () => {
      smoother.kill()
      smootherRef.current = null
      document.documentElement.classList.remove('has-smooth-scroll')
    }
  }, [])

  // Recalculate trigger/content height whenever the route changes,
  // since React Router swaps page content without a full reload.
  useEffect(() => {
    const id = requestAnimationFrame(() => ScrollTrigger.refresh())
    return () => cancelAnimationFrame(id)
  }, [location.pathname])
}
