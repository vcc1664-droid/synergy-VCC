import { useEffect, useRef, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { smoothScrollToEl } from '../utils/smoothScroll'

const EH_CARDS = [
  {
    stat: '10', statSup: null,
    label: 'Dock Bays',
    sub: 'Zero bottlenecks · always ready',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <rect x="2" y="4" width="20" height="14" rx="2"/><path d="M8 18v2M16 18v2M2 10h20"/>
        <circle cx="8" cy="14" r="1.5" fill="currentColor" stroke="none"/>
        <circle cx="12" cy="14" r="1.5" fill="currentColor" stroke="none"/>
        <circle cx="16" cy="14" r="1.5" fill="currentColor" stroke="none"/>
      </svg>
    ),
  },
  {
    stat: '8,500', statSup: 'sqft',
    label: 'Staging Area',
    sub: 'Temperature-controlled · certified',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <rect x="2" y="7" width="20" height="14" rx="2"/>
        <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/>
        <line x1="12" y1="12" x2="12" y2="16"/><line x1="10" y1="14" x2="14" y2="14"/>
      </svg>
    ),
  },
  {
    stat: '24/7', statSup: null,
    label: 'Operations',
    sub: 'Round-the-clock facility management',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
      </svg>
    ),
  },
  {
    stat: 'Freon', statSup: null,
    label: 'Freon-Based Cooling',
    sub: 'Efficient · precision-controlled',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <line x1="12" y1="2" x2="12" y2="22"/><line x1="2" y1="12" x2="22" y2="12"/>
        <line x1="5" y1="5" x2="19" y2="19"/><line x1="5" y1="19" x2="19" y2="5"/>
        <circle cx="12" cy="12" r="2" fill="currentColor" stroke="none"/>
      </svg>
    ),
  },
  {
    stat: '150', statSup: 'mm',
    label: 'PIR Panels',
    sub: 'Superior thermal protection',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M12 22s8-4 8-12V4l-8-2-8 2v6c0 8 8 12 8 12Z"/>
        <path d="m9 12 2 2 4-4"/>
      </svg>
    ),
  },
  {
    stat: '100', statSup: ' %',
    label: 'Cold Uptime',
    sub: '365 days · zero excursions',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
      </svg>
    ),
  },
  {
    stat: '100', statSup: null,
    label: 'IoT Probes',
    sub: '30s telemetry · temp + humidity',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <rect x="2" y="3" width="20" height="14" rx="2"/>
        <path d="M8 21h8M12 17v4"/>
        <circle cx="12" cy="10" r="2"/>
      </svg>
    ),
  },
  {
    stat: '500', statSup: 'KW',
    label: 'Rooftop Solar',
    sub: '7 of 11 hubs · off-grid capable',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <circle cx="12" cy="12" r="5"/>
        <path d="M12 1v3M12 20v3M4.22 4.22l2.12 2.12M17.66 17.66l2.12 2.12M1 12h3M20 12h3M4.22 19.78l2.12-2.12M17.66 6.34l2.12-2.12"/>
      </svg>
    ),
  },
]

const EDGE_ROWS = [
  {
    num: '01',
    eyebrow: 'Carbon · Efficiency · Operations',
    title: 'Sustainability',
    body: 'Energy-efficient cold storage reducing environmental impact through optimized refrigeration and responsible operations.',
    stats: [{ b: 'Low', s: 'Carbon footprint' }, { b: 'Optimized', s: 'Refrigeration systems' }, { b: 'Responsible', s: 'Operations' }],
    vizEye: 'CO₂ / SHIPMENT · 5-YEAR',
    viz: (
      <svg viewBox="0 0 300 140" preserveAspectRatio="xMidYMid meet">
        <defs>
          <linearGradient id="susG" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0" stopColor="#5fffb1" stopOpacity=".4"/>
            <stop offset="1" stopColor="#5fffb1" stopOpacity="0"/>
          </linearGradient>
        </defs>
        <path d="M0,30 C40,28 80,38 130,52 C180,68 230,90 300,118 L300,140 L0,140 Z" fill="url(#susG)"/>
        <path d="M0,30 C40,28 80,38 130,52 C180,68 230,90 300,118" stroke="#5fffb1" strokeWidth="1.8" fill="none" filter="drop-shadow(0 0 4px rgba(95,255,177,.5))"/>
        <circle cx="0" cy="30" r="4" fill="#5fffb1"/>
        <circle cx="300" cy="118" r="4" fill="#5fffb1"/>
        <text x="6" y="22" fontFamily="JetBrains Mono" fontSize="9" fill="rgba(255,255,255,.5)" letterSpacing="2">2019</text>
        <text x="270" y="134" fontFamily="JetBrains Mono" fontSize="9" fill="rgba(255,255,255,.5)" letterSpacing="2">2026</text>
      </svg>
    ),
    vizFoot: ['Δ −47%', 'VERIFIED LEDGER'],
  },
  {
    num: '02',
    eyebrow: 'Sensors · Monitoring · Real-Time',
    title: 'IoT Enabled',
    body: 'Connected sensors continuously monitor temperature, equipment performance, and warehouse conditions in real time.',
    stats: [{ b: '24/7', s: 'Continuous monitoring' }, { b: '30 s', s: 'Telemetry interval' }, { b: 'Live', s: 'Equipment health' }],
    vizEye: 'SOLAR GENERATION · TODAY',
    viz: (
      <svg viewBox="0 0 300 140" preserveAspectRatio="xMidYMid meet">
        <g fill="none" stroke="rgba(255,255,255,.12)" strokeWidth="1">
          <line x1="0" y1="35" x2="300" y2="35"/><line x1="0" y1="70" x2="300" y2="70"/><line x1="0" y1="105" x2="300" y2="105"/>
        </g>
        <path d="M0,110 C30,108 50,98 80,85 C110,72 130,52 160,42 C190,38 220,42 250,56 C275,70 290,90 300,110 L300,140 L0,140 Z" fill="rgba(255,210,0,.18)"/>
        <path d="M0,110 C30,108 50,98 80,85 C110,72 130,52 160,42 C190,38 220,42 250,56 C275,70 290,90 300,110" stroke="#ffd954" strokeWidth="1.8" fill="none" filter="drop-shadow(0 0 6px rgba(255,217,84,.6))"/>
        <text x="6" y="20" fontFamily="JetBrains Mono" fontSize="9" fill="rgba(255,255,255,.5)" letterSpacing="2">06:00</text>
        <text x="270" y="20" fontFamily="JetBrains Mono" fontSize="9" fill="rgba(255,255,255,.5)" letterSpacing="2">18:00</text>
        <circle cx="160" cy="42" r="5" fill="#ffd954" filter="drop-shadow(0 0 8px rgba(255,217,84,.8))"/>
        <text x="160" y="32" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="9" fill="#fff" letterSpacing="1">PEAK</text>
      </svg>
    ),
    vizFoot: ['2.1 MWh', 'TODAY'],
  },
  {
    num: '03',
    eyebrow: 'Detection · Prediction · Stability',
    title: 'AI Monitored',
    body: 'AI systems detect anomalies early and maintain precise temperature stability across storage zones.',
    stats: [{ b: 'Early', s: 'Anomaly detection' }, { b: 'Precise', s: 'Temperature stability' }, { b: 'Zero', s: 'Missed deviations' }],
    vizEye: 'POWER STACK · LIVE',
    viz: (
      <svg viewBox="0 0 300 140" preserveAspectRatio="xMidYMid meet" fill="none">
        <g fontFamily="JetBrains Mono" fontSize="9" fill="rgba(255,255,255,.55)" letterSpacing="2">
          <rect x="20" y="20" width="60" height="100" rx="4" stroke="rgba(255,255,255,.2)" strokeWidth="1.2"/>
          <rect x="20" y="40" width="60" height="80" rx="4" fill="rgba(95,255,177,.25)"/>
          <text x="50" y="14" textAnchor="middle">SOLAR</text>
          <rect x="90" y="20" width="60" height="100" rx="4" stroke="rgba(255,255,255,.2)" strokeWidth="1.2"/>
          <rect x="90" y="35" width="60" height="85" rx="4" fill="rgba(255,255,255,.20)"/>
          <text x="120" y="14" textAnchor="middle">BATTERY</text>
          <rect x="160" y="20" width="60" height="100" rx="4" stroke="rgba(255,255,255,.2)" strokeWidth="1.2"/>
          <rect x="160" y="100" width="60" height="20" rx="4" fill="rgba(255,210,0,.25)"/>
          <text x="190" y="14" textAnchor="middle">DG</text>
          <rect x="230" y="20" width="60" height="100" rx="4" stroke="rgba(255,255,255,.2)" strokeWidth="1.2"/>
          <rect x="230" y="105" width="60" height="15" rx="4" fill="rgba(215,68,92,.25)"/>
          <text x="260" y="14" textAnchor="middle">GRID</text>
        </g>
      </svg>
    ),
    vizFoot: ['STACK · ACTIVE', '100% UPTIME'],
  },
  {
    num: '04',
    eyebrow: 'Inventory · Pallets · Temperature',
    title: 'Real-Time Tracking',
    body: 'Live monitoring of inventory, pallet movement, and temperature for complete operational visibility.',
    stats: [{ b: 'Live', s: 'Inventory visibility' }, { b: 'Complete', s: 'Pallet traceability' }, { b: '30 s', s: 'Dashboard refresh' }],
    vizEye: 'CERTIFICATIONS · LIVE',
    viz: (
      <svg viewBox="0 0 300 140" preserveAspectRatio="xMidYMid meet" fill="none">
        <g fontFamily="JetBrains Mono" fontSize="9" fill="#fff" letterSpacing="2">
          <rect x="20" y="22" width="60" height="34" rx="6" stroke="rgba(255,255,255,.2)" strokeWidth="1" fill="rgba(255,255,255,.06)"/><text x="50" y="42" textAnchor="middle">FSSAI</text>
          <rect x="90" y="22" width="60" height="34" rx="6" stroke="rgba(255,255,255,.2)" strokeWidth="1" fill="rgba(255,255,255,.06)"/><text x="120" y="42" textAnchor="middle">ISO 22K</text>
          <rect x="160" y="22" width="60" height="34" rx="6" stroke="rgba(255,255,255,.2)" strokeWidth="1" fill="rgba(255,255,255,.06)"/><text x="190" y="42" textAnchor="middle">ISO 14K</text>
          <rect x="230" y="22" width="60" height="34" rx="6" stroke="rgba(255,255,255,.2)" strokeWidth="1" fill="rgba(255,255,255,.06)"/><text x="260" y="42" textAnchor="middle">BRC</text>
          <rect x="20" y="68" width="60" height="34" rx="6" stroke="rgba(255,255,255,.2)" strokeWidth="1" fill="rgba(255,255,255,.06)"/><text x="50" y="88" textAnchor="middle">SGS GDP</text>
          <rect x="90" y="68" width="60" height="34" rx="6" stroke="rgba(255,255,255,.2)" strokeWidth="1" fill="rgba(255,255,255,.06)"/><text x="120" y="88" textAnchor="middle">EIC</text>
          <rect x="160" y="68" width="60" height="34" rx="6" stroke="rgba(255,255,255,.2)" strokeWidth="1" fill="rgba(255,255,255,.06)"/><text x="190" y="88" textAnchor="middle">CDSCO</text>
          <rect x="230" y="68" width="60" height="34" rx="6" stroke="#5fffb1" strokeWidth="1" fill="rgba(95,255,177,.15)"/><text x="260" y="88" textAnchor="middle" fill="#5fffb1">+1 SOC2</text>
        </g>
      </svg>
    ),
    vizFoot: ['ALL CURRENT', 'AUDIT-READY'],
  },
  {
    num: '05',
    eyebrow: 'HA · Failover · Continuous Operations',
    title: 'Zero Downtime',
    body: 'Backup infrastructure ensures uninterrupted cold storage operations during power or system failures.',
    stats: [{ b: '100%', s: 'Cold uptime' }, { b: '< 2 s', s: 'Failover time' }, { b: '72 h', s: 'Reserve capacity' }],
    vizEye: 'SOP ADHERENCE · 30-DAY',
    viz: (
      <svg viewBox="0 0 300 140" preserveAspectRatio="xMidYMid meet" fill="none">
        <g stroke="rgba(255,255,255,.12)" strokeWidth="1">
          <line x1="0" y1="40" x2="300" y2="40"/>
          <line x1="0" y1="80" x2="300" y2="80"/>
          <line x1="0" y1="120" x2="300" y2="120"/>
        </g>
        <g fontFamily="JetBrains Mono" fontSize="9" fill="rgba(255,255,255,.5)" letterSpacing="2">
          <text x="290" y="36" textAnchor="end">100%</text>
          <text x="290" y="116" textAnchor="end">90%</text>
        </g>
        <polyline points="10,52 30,48 50,55 70,48 90,42 110,50 130,46 150,42 170,52 190,46 210,42 230,50 250,46 270,42 290,46" stroke="#fff" strokeWidth="2" fill="none" filter="drop-shadow(0 0 4px rgba(255,255,255,.3))"/>
        <circle cx="290" cy="46" r="4" fill="#fff"/>
      </svg>
    ),
    vizFoot: ['98.4%', '+1.2% MOM'],
  },
  {
    num: '06',
    eyebrow: 'Playbooks · Adherence · QA Sign-off',
    title: 'SOP-Based Operations',
    body: 'Standardized procedures maintain operational consistency, hygiene, safety, and inventory handling accuracy.',
    stats: [{ b: '240+', s: 'Operational Discipline' }, { b: '98.4%', s: 'Adherence rate' }, { b: 'Quarterly', s: 'Audit cycle' }],
    vizEye: 'COLD UPTIME · 365D',
    viz: (
      <svg viewBox="0 0 220 140" preserveAspectRatio="xMidYMid meet" fill="none">
        <circle cx="110" cy="70" r="56" stroke="rgba(255,255,255,.1)" strokeWidth="10"/>
        <circle cx="110" cy="70" r="56" stroke="#5fffb1" strokeWidth="10" strokeLinecap="round" strokeDasharray="351.86" strokeDashoffset="0" transform="rotate(-90 110 70)" filter="drop-shadow(0 0 6px rgba(95,255,177,.4))"/>
        <text x="110" y="68" textAnchor="middle" fontFamily="Space Grotesk" fontWeight="500" fontSize="30" fill="#fff" letterSpacing="-1">
          100<tspan fontSize="14" fill="rgba(255,255,255,.6)" fontFamily="JetBrains Mono">.00%</tspan>
        </text>
        <text x="110" y="88" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="9" fill="rgba(255,255,255,.5)" letterSpacing="3">UPTIME 365D</text>
      </svg>
    ),
    vizFoot: ['AUDITED', 'WALL-POSTED'],
  },
  {
    num: '07',
    eyebrow: 'GDP · ISO · FSSAI · BRC',
    title: 'Compliance & Audit Ready',
    body: 'Complete documentation and traceability maintained for inspections, compliance checks, and operational audits.',
    stats: [{ b: '6*', s: 'Accreditations · In Process' }, { b: '0', s: 'Audit breaches' }, { b: '5 yr', s: 'Record retention' }],
    vizEye: 'PROBE GRID · LIVE',
    vizIsProbeGrid: true,
    vizFoot: ['3,820 STREAMS', '0.02% ANOMALY'],
  },
  {
    num: '08',
    eyebrow: 'Reserve · Failover · Hot-standby',
    title: 'Backup with Redundancy',
    body: 'Dedicated backup systems eliminate operational dependency risks and ensure continuous temperature control.',
    stats: [{ b: '2×', s: 'Redundant power paths' }, { b: '72 h', s: 'Cold-room reserve' }, { b: 'Always On', s: 'Temperature control' }],
    vizEye: 'ANOMALY DETECTION · 24H',
    viz: (
      <svg viewBox="0 0 300 140" preserveAspectRatio="xMidYMid meet" fill="none">
        <g stroke="rgba(255,255,255,.12)" strokeWidth="1">
          <line x1="0" y1="40" x2="300" y2="40"/>
          <line x1="0" y1="80" x2="300" y2="80"/>
        </g>
        <polyline points="0,80 20,82 40,78 60,80 80,78 100,80 120,40 140,82 160,78 180,80 200,78 220,80 240,82 260,78 280,80 300,80" stroke="#fff" strokeWidth="1.5" fill="none" filter="drop-shadow(0 0 4px rgba(255,255,255,.3))"/>
        <circle cx="120" cy="40" r="6" fill="#d7445c" filter="drop-shadow(0 0 6px rgba(215,68,92,.7))"/>
        <line x1="120" y1="20" x2="120" y2="55" stroke="#d7445c" strokeWidth="1" strokeDasharray="2 3"/>
        <text x="125" y="20" fontFamily="JetBrains Mono" fontSize="9" fill="#d7445c" letterSpacing="2">PAGE</text>
      </svg>
    ),
    vizFoot: ['1 ANOMALY', 'RESOLVED 96s'],
  },
]

function ProbeGrid() {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    el.innerHTML = ''
    for (let i = 0; i < 160; i++) {
      const cell = document.createElement('div')
      const r = Math.random()
      if (r < 0.02) cell.style.background = '#d7445c'
      else if (r < 0.06) cell.style.background = 'rgba(255,210,0,.7)'
      else cell.style.background = 'rgba(95,255,177,.55)'
      cell.style.borderRadius = '2px'
      el.appendChild(cell)
    }
  }, [])
  return (
    <div
      ref={ref}
      style={{ display: 'grid', gridTemplateColumns: 'repeat(16,1fr)', gridTemplateRows: 'repeat(10,7px)', gap: 2, width: '100%' }}
    />
  )
}

function handleContactClick(e) {
  e.preventDefault()
  window.location.hash = '#/'
  setTimeout(() => smoothScrollToEl('contact'), 100)
}

const EH_SLIDER_STYLES = `
  .eh-stats-slider {
    position: relative;
    width: calc(100% - 80px);
    max-width: 900px;
    margin: 40px auto 0;
    padding-top: 12px;
    padding-bottom: 12px;
    overflow: hidden;
  }
  .eh-stats-slider::before,
  .eh-stats-slider::after {
    content: "";
    position: absolute;
    top: 0;
    width: 120px;
    height: 100%;
    z-index: 2;
    pointer-events: none;
  }
  .eh-stats-slider::before {
    left: 0;
    background: linear-gradient(to right, #06091c, transparent);
  }
  .eh-stats-slider::after {
    right: 0;
    background: linear-gradient(to left, #06091c, transparent);
  }
  .eh-stats-track {
    display: flex;
    gap: 20px;
    width: max-content;
    animation: eh-marquee 28s linear infinite;
  }
  .eh-stats-track:hover {
    animation-play-state: paused;
  }
  .eh-stats-slider:active .eh-stats-track {
    animation-play-state: paused;
  }
  .eh-stats-track .eh-card {
    flex-shrink: 0;
  }
  @keyframes eh-marquee {
    from { transform: translateX(0); }
    to   { transform: translateX(-50%); }
  }
  @media (max-width: 768px) {
    .eh-stats-slider { width: calc(100% - 40px); }
    .eh-stats-track  { animation-duration: 18s; }
    .eh-stats-slider::before,
    .eh-stats-slider::after { width: 60px; }
  }
`

const TOUR_MODAL_STYLES = `
  .vt-overlay {
    position: fixed;
    top: 0; left: 0; right: 0; bottom: 0;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,.85);
    z-index: 9999;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 16px;
    box-sizing: border-box;
    backdrop-filter: blur(6px);
    -webkit-backdrop-filter: blur(6px);
    animation: vt-in .22s ease;
  }
  @keyframes vt-in {
    from { opacity: 0; }
    to   { opacity: 1; }
  }
  .vt-box {
    position: relative;
    width: 100%;
    max-width: 900px;
    background: #000;
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 24px 80px rgba(0,0,0,.8);
    animation: vt-up .25s ease;
    flex-shrink: 0;
  }
  @keyframes vt-up {
    from { transform: translateY(20px); opacity: 0; }
    to   { transform: translateY(0);    opacity: 1; }
  }
  .vt-close {
    position: absolute;
    top: 10px;
    right: 10px;
    width: 36px;
    height: 36px;
    border-radius: 50%;
    background: rgba(0,0,0,.55);
    border: 1px solid rgba(255,255,255,.2);
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    z-index: 10;
    transition: background .15s;
  }
  .vt-close:hover { background: rgba(0,0,0,.8); }
  .vt-video {
    width: 100%;
    display: block;
    aspect-ratio: 16/9;
    background: #000;
    outline: none;
    max-height: calc(100vh - 32px);
    object-fit: contain;
  }
  @media (max-width: 480px) {
    .vt-overlay { padding: 0; align-items: center; }
    .vt-box { border-radius: 0; max-width: 100%; }
    .vt-video { max-height: 56vw; aspect-ratio: 16/9; }
  }
`

export default function Edge() {
  const [tourOpen, setTourOpen] = useState(false)
  const tourVideoRef = useRef(null)

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
      <style>{EH_SLIDER_STYLES + TOUR_MODAL_STYLES}</style>

      {/* Virtual Tour Modal */}
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
      <Helmet>
        <title>VCC Edge — Versailles Cold Chain</title>
        <meta name="description" content="Eight systems powering one unbroken cold curve: IoT sensors, AI monitoring, WMS, GDP compliance, zero downtime, SOP operations, real-time tracking, backup power, and sustainability." />
      </Helmet>

      {/* Hero */}
      <section className="edge-page-hero">
        <div className="wrap">
          <span className="eyebrow"><span className="dot"></span>8 SYSTEMS · 1 NETWORK · ZERO BROKEN CURVES</span>
          {/* Sub-heading — facility descriptor */}
          <p className="edge-hero-sub">One of North India's Largest Facilities Beyond NCR</p>
          {/* Main heading */}
          <h1 data-anim="up">Built for Scale. Designed for Growth.</h1>
          {/* Temperature sub-heading */}
          <p className="lede">Temperature Range: &minus;25°C to +5°C</p>

        </div>
        <div className="eh-stats-slider">
          <div className="eh-stats-track">
            {[...EH_CARDS, ...EH_CARDS].map((c, i) => (
              <div className="eh-card" key={i}>
                <div className="eh-icon">{c.icon}</div>
                <div className="eh-stat">
                  {c.stat}{c.statSup && <span>{c.statSup}</span>}
                </div>
                <div className="eh-label">{c.label}</div>
                <div className="eh-sub">{c.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section heading */}
      <section className="sec" style={{ padding: '30px 0 60px' }}>
        <div className="wrap">
          <h2 className="sec-title" data-anim="up" style={{ margin: '14px 0 14px' }}>
            <span className="hline">Eight systems,</span>
            <span className="hline">one <span className="accent">unbroken curve.</span></span>
          </h2>
          <p className="sec-sub" style={{ maxWidth: 640 }}>
            Each pillar is the difference between cargo that leaves storage release-ready and cargo that doesn't. They're not features — they're the operating standard behind every degree we hold.
          </p>
        </div>
      </section>

      {/* Edge rows */}
      <section className="sec" style={{ padding: '0 0 80px' }}>
        <div className="wrap">
          {EDGE_ROWS.map((row) => (
            <div className="edge-row" data-anim="up" key={row.num}>
              <div className="er-num">{row.num}</div>
              <div className="er-content">
                <span className="er-eyebrow">{row.eyebrow}</span>
                <h3>{row.title}</h3>
                <p>{row.body}</p>
                <div className="er-stats">
                  {row.stats.map((s) => (
                    <div key={s.s}><b>{s.b}</b><span>{s.s}</span></div>
                  ))}
                </div>
              </div>
              <div className="er-viz">
                <span className="v-eye">{row.vizEye}</span>
                <div className="v-main">
                  {row.vizIsProbeGrid ? <ProbeGrid /> : row.viz}
                </div>
                <div className="v-foot">
                  {row.vizFoot.map((f) => <span key={f}>{f}</span>)}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="sec" style={{ padding: '60px 0 120px', background: '#070f30', borderRadius: 24, margin: '0 24px' }}>
        <div className="wrap" style={{ textAlign: 'center', maxWidth: 780, margin: '0 auto' }}>
          <h2 className="sec-title" data-anim="up" style={{ margin: '14px auto 0', color: '#fff' }}>
            <span className="hline">Every Pallet.</span>
            <span className="hline">Perfectly Preserved.</span>
          </h2>
          <p className="sec-sub" style={{ margin: '24px auto 0', color: 'rgba(200,215,255,.7)' }}>
            Step inside North India's leading cold chain facility.
          </p>
          <div style={{ display: 'flex', gap: 14, justifyContent: 'center', marginTop: 30, flexWrap: 'wrap' }}>
            <button className="btn btn-p" onClick={() => setTourOpen(true)}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="15" height="15">
                <circle cx="12" cy="12" r="9"/><path d="M10 8l6 4-6 4z"/>
              </svg>
              Virtual Tour
            </button>
            <Link className="btn btn-g" to="/">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="15" height="15">
                <circle cx="12" cy="12" r="9"/><path d="M10 8l6 4-6 4z"/>
              </svg>
              Back to home
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
