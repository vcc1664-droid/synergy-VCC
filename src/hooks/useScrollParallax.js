import { useEffect } from 'react'

/**
 * Calls `callback(scrollY)` on every scroll event.
 * Returns cleanup automatically.
 */
export default function useScrollParallax(callback) {
  useEffect(() => {
    if (typeof callback !== 'function') return
    const handler = () => callback(window.scrollY)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [callback])
}
