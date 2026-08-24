import { useEffect, useRef, useState } from 'react'

export default function HeroSection() {
  const videoRef = useRef(null)
  const tourVideoRef = useRef(null)
  const [tourOpen, setTourOpen] = useState(false)

  useEffect(() => {
    const vid = videoRef.current
    if (!vid) return

    const load = () => {
      vid.src = '/Header.webm'
      vid.load()
      vid.play().catch(() => {})
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
      setTimeout(() => tourVideoRef.current?.play().catch(() => {}), 100)
    } else {
      tourVideoRef.current?.pause()
    }
    return () => { document.body.style.overflow = '' }
  }, [tourOpen])

  return (
    <>
      {tourOpen && (
        <div className="vt-overlay" onClick={() => setTourOpen(false)}>
          <div className="vt-box" onClick={e => e.stopPropagation()}>
            <button className="vt-close" onClick={() => setTourOpen(false)} aria-label="Close virtual tour">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" width="16" height="16">
                <path d="M18 6L6 18M6 6l12 12"/>
              </svg>
            </button>
            <video
              ref={tourVideoRef}
              className="vt-video"
              src="/virtual-tour.mp4"
              poster="/virtual-tour-poster.jpg"
              controls
              playsInline
              preload="auto"
            />
          </div>
        </div>
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

        <button className="hs-vt-btn" onClick={() => setTourOpen(true)}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="15" height="15">
            <circle cx="12" cy="12" r="9"/><path d="M10 8l6 4-6 4z"/>
          </svg>
          Virtual Tour
        </button>
      </section>

      <h1 className="vh">
        Versailles Cold Chain &mdash; Cold Storage &amp; Temperature-Controlled Logistics
      </h1>
    </>
  )
}
