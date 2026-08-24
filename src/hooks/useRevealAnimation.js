import { useEffect } from 'react'

/**
 * Attach IntersectionObserver to every element matching `selector`
 * inside `containerRef`. When the element enters the viewport it
 * receives the class `reveal-on` which triggers the CSS animation.
 */
export default function useRevealAnimation(containerRef, selector = '[data-reveal]') {
  useEffect(() => {
    const container = containerRef?.current ?? document
    const els = container.querySelectorAll(selector)
    if (!els.length) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('reveal-on')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.15 }
    )

    els.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [containerRef, selector])
}
