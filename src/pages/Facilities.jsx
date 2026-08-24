import { useEffect, useRef } from 'react'
import { Helmet } from 'react-helmet-async'

const ZONES = [
  { cls: 'z4', temp: '−25°C', label: 'Deep Freeze', title: 'Deep-Freeze Chamber', desc: 'Tissue · Reagents · Ultra-low pharma · Long-tail storage' },
  { cls: 'z3', temp: '−18°C', label: 'Frozen', title: 'Frozen Zone', desc: 'Ice cream · Ready meals · Frozen meat · Seafood' },
  { cls: 'z2', temp: '+2 / +5°C', label: 'Pharma', title: 'Pharma Cold Room', desc: 'GDP-validated · Vaccines · Biologics · Clinical samples' },
  { cls: 'z1', temp: '+5°C', label: 'Chill', title: 'Chill Zone', desc: 'Dairy · Fresh produce · Beverages · Pharma room-temp' },
]

const FEATURES = [
  {
    title: 'FIFO Management',
    desc: 'Expiry-first inventory movement powered by WMS-driven FIFO & FEFO logic for zero product compromise.',
    meta: ['FIFO + FEFO', 'WMS-ENFORCED'],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="3 6 9 6 9 18 3 18"/><polyline points="9 12 15 12 15 18"/>
        <line x1="15" y1="18" x2="21" y2="18"/><polyline points="21 18 21 12 15 12"/>
      </svg>
    ),
  },
  {
    title: 'Smart WMS',
    desc: 'Real-time pallet visibility, lot traceability, dock scheduling, and customer access — unified seamlessly.',
    meta: ['LOT TRACE', 'API-NATIVE'],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="4" width="18" height="14" rx="2"/><circle cx="12" cy="11" r="2.5"/><path d="M2 20h20"/>
      </svg>
    ),
  },
  {
    title: 'Multi-Zone Chambers',
    desc: '25 individually controlled chambers operating from −25°C to +5°C for precise product storage.',
    meta: ['−25 → +5°C', 'CALIBRATED'],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <line x1="12" y1="2" x2="12" y2="22"/><line x1="2" y1="12" x2="22" y2="12"/>
        <line x1="5" y1="5" x2="19" y2="19"/><line x1="5" y1="19" x2="19" y2="5"/>
      </svg>
    ),
  },
  {
    title: 'Audit-Ready Compliance',
    desc: 'Built to global cold-chain standards with digital records, controlled access, and traceable operations.',
    meta: ['GDP · ISO 22000', 'TRACEABLE'],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-12V4l-8-2-8 2v6c0 8 8 12 8 12Z"/><path d="m9 12 2 2 4-4"/>
      </svg>
    ),
  },
  {
    title: 'High-Density Racked Storage',
    desc: '7,000 pallet positions engineered for efficient movement, faster handling, and scalable warehousing operations.',
    meta: ['7,000 POS', 'HIGH-DENSITY'],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 7l9-4 9 4-9 4-9-4z"/><path d="M3 12l9 4 9-4M3 17l9 4 9-4"/>
      </svg>
    ),
  },
  {
    title: 'Live Telemetry',
    desc: '24/7 IoT-enabled monitoring tracking temperature, humidity, equipment health, and chamber performance in real time.',
    meta: ['30s INTERVAL', 'AI-BATCHED'],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 12h3l3-9 4 18 3-9h5"/>
      </svg>
    ),
  },
]

function FacStats() {
  return (
    <>
      <div className="fs">
        <div className="ic"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M3 7l9-4 9 4-9 4-9-4z"/><path d="M3 12l9 4 9-4M3 17l9 4 9-4"/></svg></div>
        <b>7,000</b><span>Pallet Positions / Facility</span>
      </div>
      <div className="fs">
        <div className="ic"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="3" y1="15" x2="21" y2="15"/><line x1="9" y1="3" x2="9" y2="21"/><line x1="15" y1="3" x2="15" y2="21"/></svg></div>
        <b>70,000<small> sqft</small></b><span>Validated Cold Floor</span>
      </div>
      <div className="fs">
        <div className="ic"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="2" x2="12" y2="22"/><line x1="2" y1="12" x2="22" y2="12"/><line x1="5" y1="5" x2="19" y2="19"/><line x1="5" y1="19" x2="19" y2="5"/><circle cx="12" cy="12" r="2" fill="currentColor" stroke="none"/></svg></div>
        <b>−25 / +5<small>°C</small></b><span>Multi-Zone Range</span>
      </div>
      <div className="fs">
        <div className="ic"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="18" rx="2"/><path d="M8 3v18M2 9h6M2 15h6"/></svg></div>
        <b>8,000<small> sqft</small></b><span>Anti Room</span>
      </div>
      <div className="fs">
        <div className="ic"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/><line x1="12" y1="12" x2="12" y2="16"/><line x1="10" y1="14" x2="14" y2="14"/></svg></div>
        <b>8,500<small> sqft</small></b><span>Staging Area</span>
      </div>
      <div className="fs">
        <div className="ic"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="14" rx="2"/><path d="M8 18v2M16 18v2M2 10h20"/><circle cx="8" cy="14" r="1.5" fill="currentColor" stroke="none"/><circle cx="12" cy="14" r="1.5" fill="currentColor" stroke="none"/><circle cx="16" cy="14" r="1.5" fill="currentColor" stroke="none"/></svg></div>
        <b>10</b><span>Loading / Unloading Docks</span>
      </div>
    </>
  )
}

function WmsPanel() {
  const gridRef = useRef(null)

  useEffect(() => {
    const grid = gridRef.current
    if (!grid) return
    grid.innerHTML = ''
    const total = 120
    const fefoCount = 18
    const excursionCount = 2
    const emptyCount = 8
    const indices = Array.from({ length: total }, (_, i) => i)
    // shuffle deterministically
    const shuffle = (arr) => {
      const a = [...arr]
      for (let i = a.length - 1; i > 0; i--) {
        const j = (i * 1103515245 + 12345) % (i + 1)
        ;[a[i], a[j]] = [a[j], a[i]]
      }
      return a
    }
    const shuffled = shuffle(indices)
    const fefoSet = new Set(shuffled.slice(0, fefoCount))
    const excSet = new Set(shuffled.slice(fefoCount, fefoCount + excursionCount))
    const emptySet = new Set(shuffled.slice(fefoCount + excursionCount, fefoCount + excursionCount + emptyCount))

    for (let i = 0; i < total; i++) {
      const cell = document.createElement('div')
      cell.className = 'wp-cell'
      if (emptySet.has(i)) cell.classList.add('empty')
      else if (excSet.has(i)) cell.classList.add('exc')
      else if (fefoSet.has(i)) cell.classList.add('fefo')
      grid.appendChild(cell)
    }
  }, [])

  return (
    <div className="wms-panel">
      <div className="wp-head"><span>PALLET MAP · CHANDIGARH HQ</span><span>LIVE</span></div>
      <div className="wp-grid" ref={gridRef}></div>
      <div className="wp-legend">
        <span>Occupied</span>
        <span className="fef">FEFO next</span>
        <span className="alert">Excursion</span>
      </div>
      <div className="wp-stat">
        <div><b>6,142</b><span>Occupied</span></div>
        <div><b>94.5%</b><span>Capacity</span></div>
        <div><b>312</b><span>FEFO Queue</span></div>
        <div><b>0</b><span>Excursions · 30d</span></div>
      </div>
    </div>
  )
}

const FAC_SLIDER_STYLES = `
  .fac-stats-slider {
    position: relative;
    width: calc(100% - 80px);
    max-width: 1000px;
    margin: 32px auto 0;
    padding-top: 12px;
    overflow: hidden;
  }
  .fac-stats-slider::before,
  .fac-stats-slider::after {
    content: "";
    position: absolute;
    top: 0;
    width: 120px;
    height: 100%;
    z-index: 2;
    pointer-events: none;
  }
  .fac-stats-slider::before {
    left: 0;
    background: linear-gradient(to right, #070f30, transparent);
  }
  .fac-stats-slider::after {
    right: 0;
    background: linear-gradient(to left, #070f30, transparent);
  }
  .fac-stats-track {
    display: flex;
    gap: 0;
    width: max-content;
    animation: fac-marquee 22s linear infinite;
  }
  .fac-stats-track:hover {
    animation-play-state: paused;
  }
  .fac-stats-slider:active .fac-stats-track {
    animation-play-state: paused;
  }
  .fac-stats-track .fs {
    width: 230px;
    flex-shrink: 0;
    margin-right: 16px;
  }
  @keyframes fac-marquee {
    from { transform: translateX(0); }
    to   { transform: translateX(-50%); }
  }
  @media (max-width: 768px) {
    .fac-stats-slider { width: calc(100% - 40px); }
    .fac-stats-track  { animation-duration: 14s; }
    .fac-stats-slider::before,
    .fac-stats-slider::after { width: 60px; }
  }
`

export default function Facilities() {
  return (
    <>
      <style>{FAC_SLIDER_STYLES}</style>
      <Helmet>
        <title>Facilities — Versailles Cold Chain</title>
        <meta name="description" content="7,000pallet positions, 45,000 sqft validated cold floor. Four temperature zones from −25°C to +5°C. FIFO/FEFO WMS-enforced. Dera Bassi facility ready October 2026." />
      </Helmet>

      {/* Hero */}
      <section className="page-hero fac-hero-sec" style={{ textAlign: 'center' }}>
        <div className="wrap" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', maxWidth: 1000, margin: '0 auto', paddingTop: 'clamp(70px,10vw,100px)', paddingBottom: 0 }}>
          <h1 style={{ maxWidth: 'none' }}>
            <span className="hline">Pallet positions,</span>
            <span className="hline"><span className="accent">precision-engineered.</span></span>
          </h1>
          <p className="lede fac-hero-lede" style={{ textAlign: 'center', fontSize: 'clamp(15px,1.8vw,18px)', maxWidth: 820 }}>
            <span className="hline">Built for brands that demand excellence.</span>{' '}
            <span className="hline">Our upcoming Dera Bassi facility features 7,000 pallet capacity, 25 independent chambers,</span>{' '}
            <span className="hline">and advanced temperature-controlled infrastructure ready by October 2026.</span>
          </p>

        </div>
        <div className="fac-stats-slider">
          <div className="fac-stats-track fac-marquee-set">
            <FacStats /><FacStats />
          </div>
        </div>
      </section>

      {/* Zones */}
      <section className="sec" style={{ padding: '60px 0 40px' }}>
        <div className="wrap">
          <h2 className="sec-title" style={{ margin: '14px 0 14px' }}>
            <span className="hline">Four temperature zones,</span>
            <span className="hline"><span className="accent">one cold floor.</span></span>
          </h2>
          <p className="sec-sub" style={{ maxWidth: 600 }}>
            Validated chambers calibrated against your release SOP. Pallets are mapped to the zone that matches their profile — and the WMS won't allow a mis-pick.
          </p>

          <div className="fac-zones">
            <div className="fac-zones-grid">
              {ZONES.map((z) => (
                <div className={`fac-zone ${z.cls}`} key={z.cls}>
                  <div>
                    <div className="ztemp">{z.temp}</div>
                    <div className="zlabel">{z.label}</div>
                  </div>
                  <div>
                    <h5>{z.title}</h5>
                    <p className="zdesc">{z.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="fac-zones-scale">
              <span>← −25°C · Deep Freeze</span>
              <span>−18°C · Frozen</span>
              <span>+2 / +5°C · Pharma</span>
              <span>+5°C · Chill →</span>
            </div>
          </div>
        </div>
      </section>

      {/* Features grid */}
      <section className="sec" style={{ padding: '40px 0' }}>
        <div className="wrap">
          <h2 className="sec-title" style={{ margin: '14px 0 14px' }}>
            <span className="hline">Engineered for cargo that</span>
            <span className="hline"><span className="accent">needs proof.</span></span>
          </h2>
          <div className="fac-features">
            {FEATURES.map((f) => (
              <div className="fac-feature" key={f.title}>
                <div className="fi">{f.icon}</div>
                <h4>{f.title}</h4>
                <p>{f.desc}</p>
                <div className="meta">
                  {f.meta.map((m) => <span key={m}>{m}</span>)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

    </>
  )
}
