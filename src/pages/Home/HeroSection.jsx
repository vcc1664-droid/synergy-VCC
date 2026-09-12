import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { gsap, prefersReducedMotion } from '../../lib/gsap'

export default function HeroSection() {
  const videoRef = useRef(null)
  const tourVideoRef = useRef(null)
  const vtBtnRef = useRef(null)
  const [tourOpen, setTourOpen] = useState(false)

  useEffect(() => {
    if (prefersReducedMotion() || !vtBtnRef.current) return
    gsap.fromTo(
      vtBtnRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out', delay: 0.3 }
    )
  }, [])

  useEffect(() => {
    const vid = videoRef.current
    if (!vid) return

    const load = () => {
      vid.src = '/Header.webm'
      vid.load()
      vid.play().catch(() => { })
    }

    if ('requestIdleCallback' in window) {
      requestIdleCallback(load, { timeout: 2000 })
    } else {
      setTimeout(load, 800)
    }
  }, [])

  useEffect(() => {
    document.body.style.overflow = tourOpen ? 'hidden' : ''
    if (tourOpen) {
      setTimeout(() => tourVideoRef.current?.play().catch(() => { }), 100)
    } else {
      tourVideoRef.current?.pause()
    }
    return () => { document.body.style.overflow = '' }
  }, [tourOpen])

  return (
    <>
      {tourOpen && typeof document !== 'undefined' && createPortal(
        <div className="vt-overlay" onClick={() => setTourOpen(false)}>
          <div className="vt-box" onClick={e => e.stopPropagation()}>
            <button className="vt-close" onClick={() => setTourOpen(false)} aria-label="Close virtual tour">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" width="16" height="16">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
            <video
              ref={tourVideoRef}
              className="vt-video"
              src="/virtual-tour.mp4"
              poster="/virtual-tour-poster.jpg"
              controls
              autoPlay
              playsInline
              preload="auto"
            />
          </div>
        </div>,
        document.body
      )}

      <section className="hs-wrap" id="hsWrap" style={{ position: 'relative' }}>
        <video
          className="hs-video-bg"
          id="heroVid"
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          preload="none"
        />
        <div className="hs-video-overlay"></div>

        <button className="hs-vt-btn" ref={vtBtnRef} onClick={() => setTourOpen(true)} aria-label="Open Virtual Tour">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" width="18" height="18">
            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
            <polygon points="10,8 16,12 10,16" fill="currentColor" />
          </svg>
          <span>Virtual Tour</span>
        </button>
      </section>

      <h1 className="vh">
        Versailles Cold Chain &mdash; Cold Storage &amp; Temperature-Controlled Logistics
      </h1>
    </>
  )
}
