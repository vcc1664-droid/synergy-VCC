import { ScrollSmoother } from '../lib/gsap'

/**
 * Scrolls to an element or #id, routing through the active ScrollSmoother
 * instance when one exists so the motion stays eased, and falling back to
 * the native scrollIntoView/scrollTo otherwise (reduced motion, or before
 * the smoother has mounted).
 */
export function smoothScrollToEl(target) {
  const el = typeof target === 'string' ? document.getElementById(target) : target
  if (!el) return

  const smoother = ScrollSmoother.get?.()
  if (smoother) {
    smoother.scrollTo(el, true, 'top top')
  } else {
    el.scrollIntoView({ behavior: 'smooth' })
  }
}

export function smoothScrollToTop() {
  const smoother = ScrollSmoother.get?.()
  if (smoother) {
    smoother.scrollTo(0, true)
  } else {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
}

export function scrollToTop() {
  const smoother = ScrollSmoother.get?.()
  if (smoother) {
    smoother.scrollTop(0)
    smoother.scrollTo(0, false)
  }
  window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
}
