import { useEffect, useRef, useState } from 'react'

const GUARANTEES = [
  {
    num: '01',
    title: 'Temperature, locked.',
    body: 'Every chamber runs independently at its assigned setpoint. IoT probes log readings every 30 seconds — and trigger an alert before a deviation becomes a problem.',
    stat: '±0.3°C',
    statLabel: 'Maximum drift — ever',
    accent: '#0d2d6e',
    icon: (
      <svg viewBox="0 0 52 52" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M26 8v20M26 36v8"/>
        <circle cx="26" cy="32" r="8"/>
        <path d="M26 28v4"/>
        <path d="M14 18a16 16 0 0 0 0 20M38 18a16 16 0 0 0 0 20"/>
        <path d="M8 12a26 26 0 0 0 0 28M44 12a26 26 0 0 0 0 28"/>
      </svg>
    ),
  },
  {
    num: '02',
    title: 'Your cargo, visible.',
    body: 'Every pallet carries a UHF RFID tag from inbound to outbound. You get live location, temperature history, lot number, and expiry — from your phone.',
    stat: '100%',
    statLabel: 'Pallet-level traceability',
    accent: '#162058',
    icon: (
      <svg viewBox="0 0 52 52" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <rect x="8"  y="8"  width="14" height="14" rx="2"/>
        <rect x="30" y="8"  width="14" height="14" rx="2"/>
        <rect x="8"  y="30" width="14" height="14" rx="2"/>
        <path d="M30 37h4m4 0h4M37 30v4m0 4v4"/>
        <path d="M12 12h2v2h-2zM34 12h2v2h-2zM12 34h2v2h-2z"/>
      </svg>
    ),
  },
  {
    num: '03',
    title: 'Audit-ready, always.',
    body: 'Every movement, every temperature reading, every access event is logged and signed. Your QA team gets a GDP-compliant PDF export — no chasing, no gaps.',
    stat: '5 yr',
    statLabel: 'Digital record retention',
    accent: '#070f30',
    icon: (
      <svg viewBox="0 0 52 52" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 6h24a2 2 0 0 1 2 2v36a2 2 0 0 1-2 2H14a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2z"/>
        <path d="M19 18h14M19 25h14M19 32h8"/>
        <path d="M32 30l4 4 6-6" strokeWidth="2"/>
      </svg>
    ),
  },
]

export default function CurveSection() {
  const sectionRef = useRef(null)
  const cardRefs   = useRef([])
  const rafRef     = useRef(null)
  const [entered, setEntered] = useState(false)

  /* scroll trigger */
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setEntered(true); obs.disconnect() } },
      { threshold: 0.1 }
    )
    if (sectionRef.current) obs.observe(sectionRef.current)
    return () => obs.disconnect()
  }, [])

  /* clear stagger delay after entrance so hover tilt is instant on all cards */
  useEffect(() => {
    if (!entered) return
    const maxDelay = (GUARANTEES.length - 1) * 0.14 + 0.65
    const t = setTimeout(() => {
      cardRefs.current.forEach(c => { if (c) c.style.transitionDelay = '0s' })
    }, maxDelay * 1000)
    return () => clearTimeout(t)
  }, [entered])

  /* parallax orbs */
  useEffect(() => {
    const onScroll = () => {
      cancelAnimationFrame(rafRef.current)
      rafRef.current = requestAnimationFrame(() => {
        const el = sectionRef.current
        if (!el) return
        const rect  = el.getBoundingClientRect()
        const total = rect.height + window.innerHeight
        const p     = (-rect.top) / total          // 0 → 1 as section scrolls through
        el.style.setProperty('--py', `${(p - 0.5) * 90}px`)
      })
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => { window.removeEventListener('scroll', onScroll); cancelAnimationFrame(rafRef.current) }
  }, [])

  /* 3D tilt per card */
  const handleMove = (e, i) => {
    const c = cardRefs.current[i]
    if (!c) return
    const r = c.getBoundingClientRect()
    const x = (e.clientX - r.left) / r.width  - 0.5
    const y = (e.clientY - r.top)  / r.height - 0.5
    c.style.transform = `perspective(900px) rotateY(${x * 14}deg) rotateX(${-y * 9}deg) translateZ(14px) scale(1.02)`
  }
  const handleLeave = (i) => {
    const c = cardRefs.current[i]
    if (c) c.style.transform = 'perspective(900px) rotateY(0) rotateX(0) translateZ(0) scale(1)'
  }

  return (
    <section className="guar-section" id="guarantee" ref={sectionRef}>

      {/* ── Background layer ── */}
      <div className="guar-bg" aria-hidden="true">
        <div className="guar-orb guar-orb-1" />
        <div className="guar-orb guar-orb-2" />
        <div className="guar-orb guar-orb-3" />
        <div className="guar-dots" />
      </div>

      <div className="wrap guar-wrap">

        {/* Header */}
        <div className="guar-head">
          <div>
            <h2 className="sec-title" style={{ marginTop: 0 }}>
              <span className="hline">Built on reliability.</span>
              <span className="hline"><span className="accent">Delivered with precision.</span></span>
            </h2>
          </div>
          <p className="guar-sub">
            Ensuring product integrity across every pallet, every shipment, and every stage of the cold chain.
          </p>
        </div>

        {/* Cards */}
        <div className="guar-grid">
          {GUARANTEES.map((g, i) => (
            <div
              key={g.num}
              ref={el => { cardRefs.current[i] = el }}
              className={`guar-card${entered ? ' guar-in' : ''}`}
              style={{
                '--ga': g.accent,
                transitionDelay: entered ? `${i * 0.14}s` : '0s',
              }}
              onMouseMove={e => handleMove(e, i)}
              onMouseLeave={() => handleLeave(i)}
            >
              {/* shimmer border top */}
              <div className="guar-shimmer" style={{ '--ga': g.accent }} />

              <div className="guar-num">{g.num}</div>

              <div className="guar-icon" style={{ color: g.accent }}>
                {g.icon}
              </div>

              <h3 className="guar-title">{g.title}</h3>
              <p className="guar-body">{g.body}</p>

              <div className="guar-stat">
                <span className="guar-stat-val" style={{ color: g.accent }}>{g.stat}</span>
                <span className="guar-stat-label">{g.statLabel}</span>
              </div>

              {/* glow on hover */}
              <div className="guar-glow" style={{ background: g.accent }} />
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
