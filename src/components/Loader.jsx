import { useEffect, useRef } from 'react'

export default function Loader() {
  const rootRef    = useRef(null)
  const fillRef    = useRef(null)
  const tagRef     = useRef(null)

  useEffect(() => {
    const root   = rootRef.current
    const fill   = fillRef.current
    const tagEl  = tagRef.current
    if (!root || !fill || !tagEl) return

    const phases = [
      'Initializing systems',
      'Loading assets',
      'Calibrating temperature',
      'Almost ready',
      'Done',
    ]
    let phaseIdx = 0
    tagEl.textContent = phases[0]

    const phaseTimer = setInterval(() => {
      phaseIdx++
      if (phaseIdx < phases.length) {
        tagEl.style.opacity = '0'
        setTimeout(() => {
          tagEl.textContent = phases[phaseIdx]
          tagEl.style.opacity = '1'
        }, 300)
      } else {
        clearInterval(phaseTimer)
      }
    }, 900)

    // Progress bar
    let progress = 0
    const tick = () => {
      progress += Math.random() * 14 + 6
      if (progress > 100) progress = 100
      fill.style.width = progress + '%'

      if (progress >= 100) {
        setTimeout(() => {
          root.classList.add('si-exit')
          setTimeout(() => root.classList.add('si-gone'), 900)
        }, 420)
      } else {
        setTimeout(tick, 110 + Math.random() * 80)
      }
    }
    setTimeout(tick, 320)

    return () => clearInterval(phaseTimer)
  }, [])

  return (
    <div id="si-root" ref={rootRef} aria-hidden="true">
      {/* Curtain panels — split apart on exit */}
      <div className="si-panel si-panel-l" />
      <div className="si-panel si-panel-r" />

      {/* Frost grid overlay */}
      <div className="si-frost" />

      {/* Floating ice crystals */}
      <div className="si-crystals" aria-hidden="true">
        {[...Array(14)].map((_, i) => (
          <span key={i} className="si-cry" style={{
            left: `${5 + i * 6.8}%`,
            animationDuration: `${6 + (i % 5) * 2.2}s`,
            animationDelay: `${-(i * 0.7)}s`,
            fontSize: `${10 + (i % 4) * 6}px`,
            opacity: 0.12 + (i % 3) * 0.06,
          }}>
            {['❄','❅','❆'][i % 3]}
          </span>
        ))}
      </div>

      {/* Centre content */}
      <div className="si-body">
        {/* Logo */}
        <div className="si-logo-wrap">
          <img src="/VCC-Icon.png" alt="VCC" className="si-logo" />
        </div>

        {/* Brand name */}
        <div className="si-brand">
          <span className="si-brand-v">V</span>
          <span className="si-brand-rest">ERSAILLES</span>
          <span className="si-brand-divider" />
          <span className="si-brand-cc">COLD CHAIN</span>
        </div>

        {/* Tagline typewriter */}
        <p className="si-tagline" ref={tagRef}>&nbsp;</p>

        {/* Progress */}
        <div className="si-progress-wrap">
          <div className="si-bar">
            <div className="si-fill" ref={fillRef} />
            <div className="si-glow" />
          </div>
        </div>
      </div>
    </div>
  )
}
