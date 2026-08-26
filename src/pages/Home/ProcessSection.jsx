import { useEffect, useRef, useState } from 'react'

const STEPS = [
  {
    n: '01', title: 'Order Received', accent: '#ff7a18',
    desc: 'Customer order received with cargo details, temperature needs & SLAs.',
    tags: ['CARGO DETAILS', 'SLA LOGGED'],
    icon: <svg viewBox="0 0 100 100" fill="none" stroke="#07122f" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round"><rect x="24" y="26" width="52" height="60" rx="8"/><rect x="36" y="16" width="28" height="20" rx="5"/><line x1="35" y1="50" x2="65" y2="50"/><line x1="35" y1="62" x2="55" y2="62"/><path d="M55 74l6 6 14-16"/></svg>,
  },
  {
    n: '02', title: 'RFID Tagged', accent: '#6ca0ff',
    desc: 'Each pallet / SKU tagged with UHF RFID for unique identity and traceability.',
    tags: ['UHF RFID', 'UNIQUE ID'],
    icon: <svg viewBox="0 0 100 100" fill="none" stroke="#07122f" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round"><rect x="30" y="30" width="40" height="40" rx="6"/><line x1="40" y1="30" x2="40" y2="70"/><line x1="50" y1="30" x2="50" y2="70"/><line x1="60" y1="30" x2="60" y2="70"/><path d="M16 36 Q10 50 16 64"/><path d="M84 36 Q90 50 84 64"/></svg>,
  },
  {
    n: '03', title: 'User Created', accent: '#9c7cff',
    desc: 'Customer profile created with role-based access controls for full visibility.',
    tags: ['PROFILE', 'RBAC'],
    icon: <svg viewBox="0 0 100 100" fill="none" stroke="#07122f" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round"><circle cx="44" cy="34" r="14"/><path d="M14 80 Q14 58 44 58 Q74 58 74 80"/><circle cx="74" cy="30" r="14"/><path d="M68 30l4 5 10-10"/></svg>,
  },
  {
    n: '04', title: 'Uploaded to WMS', accent: '#7ee7ff',
    desc: 'Order, inventory & user data uploaded to cloud-based Warehouse Management System.',
    tags: ['CLOUD WMS', 'SYNCED'],
    icon: <svg viewBox="0 0 100 100" fill="none" stroke="#07122f" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round"><path d="M30 64 Q14 64 14 50 Q14 36 30 34 Q34 20 50 20 Q66 20 70 34 Q86 36 86 50 Q86 64 70 64"/><line x1="50" y1="80" x2="50" y2="48"/><path d="M38 58l12-12 12 12"/></svg>,
  },
  {
    n: '05', title: 'Inbounds Scheduled', accent: '#63df9a',
    desc: 'Dock, slot & receiving time auto-assigned based on availability & cargo profile.',
    tags: ['DOCK SLOT', 'AUTO-ASSIGN'],
    icon: <svg viewBox="0 0 100 100" fill="none" stroke="#07122f" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round"><rect x="12" y="24" width="76" height="64" rx="8"/><line x1="12" y1="44" x2="88" y2="44"/><line x1="32" y1="14" x2="32" y2="34"/><line x1="68" y1="14" x2="68" y2="34"/><rect x="43" y="52" width="14" height="14" rx="3" fill="#07122f" stroke="none"/></svg>,
  },
  {
    n: '06', title: 'Receiving & QC', accent: '#ff7a18',
    desc: 'RFID scan, IoT sensor check & quality validation performed on arrival.',
    tags: ['RFID SCAN', 'QC PASS'],
    icon: <svg viewBox="0 0 100 100" fill="none" stroke="#07122f" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round"><circle cx="50" cy="50" r="36"/><path d="M28 50l16 16 28-32"/></svg>,
  },
  {
    n: '07', title: 'Put-away', accent: '#6ca0ff',
    desc: 'Pallets put-away to designated zones using AI path optimization for efficiency.',
    tags: ['ZONE ASSIGN', 'AI OPTIMISED'],
    icon: <svg viewBox="0 0 100 100" fill="none" stroke="#07122f" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round"><rect x="12" y="70" width="76" height="16" rx="4"/><rect x="28" y="28" width="44" height="40" rx="6"/><line x1="28" y1="44" x2="72" y2="44"/><path d="M42 64l8 8 8-8"/></svg>,
  },
  {
    n: '08', title: 'Real-time Monitoring', accent: '#63df9a',
    desc: '24/7 monitoring of temperature, humidity, power & equipment health via IoT.',
    tags: ['24/7 IoT', 'LIVE'],
    icon: <svg viewBox="0 0 100 100" fill="none" stroke="#07122f" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round"><line x1="8" y1="58" x2="92" y2="58" strokeWidth="3" strokeOpacity=".3"/><polyline points="8,58 26,58 38,24 50,82 62,36 72,58 92,58"/><circle cx="62" cy="36" r="5" fill="#07122f" stroke="none"/></svg>,
  },
  {
    n: '09', title: 'Dispatch Request', accent: '#f59e0b',
    desc: 'Dispatch orders created from real-time WMS data, ensuring accurate stock allocation and timely fulfilment.',
    tags: ['REAL-TIME WMS', 'DISPATCH'],
    icon: <svg viewBox="0 0 100 100" fill="none" stroke="#07122f" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round"><rect x="14" y="20" width="72" height="60" rx="8"/><line x1="14" y1="42" x2="86" y2="42"/><line x1="30" y1="58" x2="50" y2="58"/><line x1="30" y1="68" x2="44" y2="68"/><circle cx="68" cy="63" r="12"/><path d="M68 57v6l4 4"/></svg>,
  },
  {
    n: '10', title: 'Outbound & Dispatch', accent: '#9c7cff',
    desc: 'Digital verification, AI-driven route planning & dispatch execution with full audit trail.',
    tags: ['VERIFIED', 'DISPATCHED'],
    icon: <svg viewBox="0 0 100 100" fill="none" stroke="#07122f" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round"><rect x="6" y="36" width="56" height="40" rx="6"/><path d="M62 50h16l10 14v12H62V50z"/><circle cx="22" cy="76" r="9"/><circle cx="72" cy="76" r="9"/><line x1="6" y1="56" x2="62" y2="56"/></svg>,
  },
]

const N = STEPS.length

export default function ProcessSection() {
  const [active, setActive] = useState(0)
  const stageRef = useRef(null)
  const cardRefs = useRef([])

  // Compute dimensions
  const getDims = () => {
    const w = stageRef.current?.clientWidth ?? 900
    return { cardW: w < 760 ? 280 : 400, gap: w < 760 ? 30 : 60 }
  }

  const layout = (activeIdx) => {
    if (!stageRef.current) return
    const { cardW, gap } = getDims()
    cardRefs.current.forEach((c, i) => {
      if (!c) return
      const offset = i - activeIdx
      const abs = Math.abs(offset)
      const sign = Math.sign(offset)
      const tx = offset * (cardW + gap)
      let ry = 0, scale = 1, opacity = 1, tz = 0
      if (abs === 0)      { ry = 0;           scale = 1;    opacity = 1;   tz = 50   }
      else if (abs === 1) { ry = -sign * 38;  scale = 0.86; opacity = 0.8; tz = -120 }
      else if (abs === 2) { ry = -sign * 52;  scale = 0.7;  opacity = 0.4; tz = -260 }
      else                { ry = -sign * 60;  scale = 0.6;  opacity = 0;   tz = -400 }
      c.style.transform = `translate3d(${tx}px, 0, ${tz}px) rotateY(${ry}deg) scale(${scale})`
      c.style.opacity = opacity
      c.style.zIndex = 100 - abs
      c.style.pointerEvents = abs <= 1 ? 'auto' : 'none'
    })
  }

  const go = (i) => {
    const next = ((i % N) + N) % N
    setActive(next)
    layout(next)
  }

  // Initial layout + resize
  useEffect(() => {
    layout(active)
    const onResize = () => layout(active)
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [active])

  // Touch swipe
  useEffect(() => {
    const stage = stageRef.current
    if (!stage) return
    let tx0 = null
    const onTouchStart = (e) => { tx0 = e.touches[0].clientX }
    const onTouchEnd = (e) => {
      if (tx0 === null) return
      const dx = e.changedTouches[0].clientX - tx0
      if (Math.abs(dx) > 50) go(dx < 0 ? active + 1 : active - 1)
      tx0 = null
    }
    stage.addEventListener('touchstart', onTouchStart, { passive: true })
    stage.addEventListener('touchend', onTouchEnd)
    return () => {
      stage.removeEventListener('touchstart', onTouchStart)
      stage.removeEventListener('touchend', onTouchEnd)
    }
  }, [active])

  // Cursor glow
  const handleMouseMove = (e, idx) => {
    const c = cardRefs.current[idx]
    if (!c) return
    const r = c.getBoundingClientRect()
    c.style.setProperty('--mx', ((e.clientX - r.left) / r.width * 100) + '%')
    c.style.setProperty('--my', ((e.clientY - r.top) / r.height * 100) + '%')
  }

  return (
    <section className="sec dark-sec" id="how">
      <div className="wrap">
        <h2 className="sec-title" data-anim="up">
          <span className="hline">Smart Cold Storage.</span>
          <span className="hline"><span className="accent">Seamless</span> from Start to Store.</span>
        </h2>

        <div className="proc3d-wrap">
          <div className="proc3d-stage" id="proc3dStage" ref={stageRef} tabIndex="0"
            onKeyDown={(e) => { if (e.key === 'ArrowLeft') go(active - 1); else if (e.key === 'ArrowRight') go(active + 1) }}>
            <div className="proc3d-track" id="proc3dTrack">
              {STEPS.map((step, idx) => (
                <div
                  key={idx}
                  className="proc3d-card"
                  data-step={idx}
                  ref={(el) => { cardRefs.current[idx] = el }}
                  onClick={() => go(idx)}
                  onMouseMove={(e) => handleMouseMove(e, idx)}
                >
                  <div className="pnode" style={{ '--accent': step.accent }}>
                    {step.icon}
                  </div>
                  <div className="pbody">
                    <span className="pn">Step {step.n}</span>
                    <h4>{step.title}</h4>
                    <p>{step.desc}</p>
                    <div className="pmeta">
                      {step.tags.map((t) => <span key={t}>{t}</span>)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="proc3d-ctl">
            <button className="pcarrow" id="proc3dPrev" aria-label="Previous" onClick={() => go(active - 1)}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6"/></svg>
            </button>
            <div className="dots" id="proc3dDots">
              {STEPS.map((_, i) => (
                <span key={i} className={`dot${i === active ? ' on' : ''}`} onClick={() => go(i)} />
              ))}
            </div>
            <div className="counter">
              <b id="proc3dN">{String(active + 1).padStart(2, '0')}</b> / {String(N).padStart(2, '0')}
            </div>
            <button className="pcarrow" id="proc3dNext" aria-label="Next" onClick={() => go(active + 1)}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6"/></svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
