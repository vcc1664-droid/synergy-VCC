import { useState, useEffect, useRef } from 'react'
import { Helmet } from 'react-helmet-async'

const SERVICES = [
  {
    n: '01', title: 'Storage & Warehousing', sub: '· Multi-temperature cold storage',
    img: '/img-cold-warehousing.webp',
    alt: 'Cold storage and warehousing',
    desc: 'Temperature-controlled storage from −25°C to +5°C with 7,000 pallet positions, validated chambers, FIFO/FEFO management, and full lot traceability.',
    tags: ['−25°C to +5°C', '7,000 pallets', 'FEFO enforced', 'GDP-compliant'],
  },
  {
    n: '02', title: 'Transportation & Distribution', sub: '· Refrigerated freight & last-mile',
    img: '/img-refrigerated-freight.webp',
    alt: 'Refrigerated transportation and distribution',
    desc: 'End-to-end refrigerated freight and last-mile distribution with live GPS tracking, temperature visibility, and tamper-evident cold-chain movement.',
    tags: ['Live GPS', 'Temp-controlled', 'Last-mile', 'Tamper-evident'],
  },
  {
    n: '03', title: 'Inventory Management', sub: '· WMS-powered control',
    img: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=900&q=80&auto=format&fit=crop',
    alt: 'WMS inventory management',
    desc: 'Real-time WMS-enabled inventory tracking with FIFO/FEFO enforcement, lot traceability, dock scheduling, and customer portal access.',
    tags: ['FIFO / FEFO', 'Live dashboard', 'Lot traceability', 'Customer portal'],
  },
  {
    n: '04', title: 'Value-Added Services', sub: '· Beyond storage',
    img: '/img-regulated-cargo.webp',
    alt: 'Value-added cold chain services',
    desc: 'Compliant cold-chain handling, re-packing, labelling, quality checks, and regulated cargo management across all temperature-sensitive product categories.',
    tags: ['Re-packing', 'QC checks', 'Labelling', 'Compliance-ready'],
  },
  {
    n: '05', title: 'Supply Chain Solutions', sub: '· End-to-end cold chain',
    img: '/img-supply-chain.webp',
    alt: 'Cold chain supply chain logistics',
    desc: 'Integrated cold chain solutions covering procurement, storage, distribution, and reverse logistics — tailored to your specific supply chain requirements.',
    tags: ['End-to-end', 'Multi-zone', 'Reverse logistics', 'Scalable'],
  },
  {
    n: '06', title: 'Technology & Visibility', sub: '· IoT-powered intelligence',
    img: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=900&q=80&auto=format&fit=crop',
    alt: 'Cold chain technology and visibility',
    desc: 'IoT-enabled monitoring with live telemetry every 30 seconds, predictive alerts, and a customer-facing track & trace portal for complete supply chain visibility.',
    tags: ['IoT sensors', '30s telemetry', 'Predictive alerts', 'Track & trace'],
  },
]

const FAQS = [
  { q: 'What temperature ranges do you cover?', a: 'We operate across a −25°C to +5°C range, covering chilled, deep-chill, frozen, and ultra-low storage and transport requirements. Our multi-zone facilities and reefers maintain precise, validated temperatures throughout — ensuring compliance and product integrity across every cold environment.' },
  { q: 'How fast is your live monitoring?', a: 'Our platform is designed to report temperature, humidity, GPS every 30 seconds — accessible through a real-time dashboard your team can monitor around the clock. Alerts are built to be predictive, flagging set-point drift before any threshold is breached.' },
  { q: 'Is your network GDP-compliant?', a: 'Compliance is built into the foundation — not added on. Our network is being designed to meet GDP (Good Distribution Practice) standards, with infrastructure aligned to ISO 22000, FSSAI, and BRC Global Standards requirements. Full certification audits are planned prior to commercial operations.' },
  { q: 'Do you offer same-day delivery?', a: 'Our network is planned to serve key metro areas with same-day capability, and provide next-day coverage across major Indian states at launch. Exact service zones and cut-off windows will be confirmed closer to operations — get in touch to register your interest and discuss your route requirements.' },
  { q: 'What does pricing look like?', a: 'Pricing is customised to your route, volume, and temperature requirements. Get in touch with us and we\'ll put together a tailored proposal for you.' },
  { q: 'How do I get started?', a: 'Send us your requirements — origin, destination, cargo type, temperature, volume, frequency. We come back within 24 hours with a tailored proposal.' },
]

/* Curated subset — distinct products spread cleanly, centre kept clear for heading */
/* Right-side icons use `r` (CSS right) so they stay within bounds on every screen size */
const FLOAT_ICONS = [
  // top band — left to right
  { icon: '🍦', name: 'Ice Cream',      range: '−18°C & Below',      color: '#7ee7ff', l: '7%',  t: '13%' },
  { icon: '🥩', name: 'Processed Meat', range: '−18°C & Below',      color: '#7ee7ff', l: '24%', t: '8%'  },
  { icon: '🍎', name: 'Fruits',         range: '0° to 5°C',          color: '#97b2ff', l: '43%', t: '11%' },
  { icon: '🍫', name: 'Chocolate',      range: '10° to 20°C',        color: '#e0e8ff', l: '60%', t: '8%'  },
  { icon: '🦐', name: 'Frozen Seafood', range: '−18°C & Below',      color: '#7ee7ff', r: '15%', t: '13%' },
  { icon: '🥛', name: 'Dairy',          range: '0° to 5°C',          color: '#97b2ff', r: '2%',  t: '9%'  },
  // mid sides only — keep centre open
  { icon: '🍌', name: 'Banana',         range: '8° to 10°C',         color: '#c4d4f0', l: '4%',  t: '44%' },
  { icon: '🥤', name: 'Beverages',      range: '8° to 10°C',         color: '#c4d4f0', r: '2%',  t: '46%' },
  // bottom band — left to right
  { icon: '🌾', name: 'Food Grains',    range: 'Controlled Ambient', color: '#d8d9e4', l: '9%',  t: '80%' },
  { icon: '🍞', name: 'Fresh Bakery',   range: '8° to 10°C',         color: '#c4d4f0', l: '27%', t: '74%' },
  { icon: '🥡', name: 'Ready-to-eat',   range: '10° to 20°C',        color: '#e0e8ff', l: '45%', t: '83%' },
  { icon: '🧃', name: 'Juices',         range: '0° to 5°C',          color: '#97b2ff', l: '62%', t: '76%' },
  { icon: '🛒', name: 'FMCG',           range: 'Controlled Ambient', color: '#d8d9e4', r: '13%', t: '81%' },
  { icon: '🌶️', name: 'Spices',         range: 'Dry Storage',        color: '#b0b2c8', r: '2%',  t: '73%' },
]

const N_ICONS = FLOAT_ICONS.length

const FLOAT_PARAMS = Array.from({ length: N_ICONS }, (_, i) => ({
  dur: 5 + (i * 1.3) % 5,
  del: (i * 0.7) % 4,
  rx: 4 + (i * 3) % 8,
  ry: 5 + (i * 2) % 9,
  rot: 3 + (i * 1.7) % 6,
}))

function TempZoneSection() {
  const canvasRef  = useRef(null)
  const sectionRef = useRef(null)
  const iconRefs   = useRef([])
  const mouseRef   = useRef({ x: -9999, y: -9999 })
  const velRef     = useRef(Array.from({ length: N_ICONS }, () => ({ x: 0, y: 0 })))
  const posRef     = useRef(Array.from({ length: N_ICONS }, () => ({ x: 0, y: 0 })))
  const rafRepel   = useRef(null)

  /* ── canvas particles ── */
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let animId, particles = []
    const mouse = { x: null, y: null, radius: 160 }

    class Particle {
      constructor(x, y, dx, dy, size) { Object.assign(this, { x, y, dx, dy, size }) }
      draw() { ctx.beginPath(); ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2); ctx.fillStyle = 'rgba(151,178,255,0.55)'; ctx.fill() }
      update() {
        if (this.x > canvas.width || this.x < 0) this.dx = -this.dx
        if (this.y > canvas.height || this.y < 0) this.dy = -this.dy
        if (mouse.x !== null) {
          const dx = mouse.x - this.x, dy = mouse.y - this.y, d = Math.sqrt(dx * dx + dy * dy)
          if (d < mouse.radius + this.size) { const f = (mouse.radius - d) / mouse.radius; this.x -= (dx / d) * f * 5; this.y -= (dy / d) * f * 5 }
        }
        this.x += this.dx; this.y += this.dy; this.draw()
      }
    }

    const resize = () => {
      canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight; particles = []
      const n = Math.floor((canvas.width * canvas.height) / 11000)
      for (let i = 0; i < n; i++) particles.push(new Particle(Math.random() * canvas.width, Math.random() * canvas.height, (Math.random() - .5) * .4, (Math.random() - .5) * .4, Math.random() * 1.6 + .5))
    }
    const connect = () => {
      const thr = (canvas.width / 7) * (canvas.height / 7)
      for (let a = 0; a < particles.length; a++) for (let b = a + 1; b < particles.length; b++) {
        const dx = particles[a].x - particles[b].x, dy = particles[a].y - particles[b].y, d = dx * dx + dy * dy
        if (d < thr) { const op = (1 - d / thr) * .35; ctx.strokeStyle = `rgba(97,139,255,${op})`; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(particles[a].x, particles[a].y); ctx.lineTo(particles[b].x, particles[b].y); ctx.stroke() }
      }
    }
    const animate = () => { animId = requestAnimationFrame(animate); ctx.fillStyle = '#070f30'; ctx.fillRect(0, 0, canvas.width, canvas.height); particles.forEach(p => p.update()); connect() }
    const onMove = e => { const r = canvas.getBoundingClientRect(); mouse.x = e.clientX - r.left; mouse.y = e.clientY - r.top }
    const onLeave = () => { mouse.x = null; mouse.y = null }

    window.addEventListener('resize', resize)
    canvas.addEventListener('mousemove', onMove)
    canvas.addEventListener('mouseleave', onLeave)
    resize(); animate()
    return () => { window.removeEventListener('resize', resize); canvas.removeEventListener('mousemove', onMove); canvas.removeEventListener('mouseleave', onLeave); cancelAnimationFrame(animId) }
  }, [])

  /* ── icon mouse repel (spring physics) ── */
  useEffect(() => {
    const section = sectionRef.current
    if (!section) return
    const STIFF = 0.12, DAMP = 0.75, REPEL_R = 150, REPEL_F = 60

    const onMove = e => {
      const r = section.getBoundingClientRect()
      mouseRef.current = { x: e.clientX - r.left, y: e.clientY - r.top }
    }
    const onLeave = () => { mouseRef.current = { x: -9999, y: -9999 } }

    const tick = () => {
      iconRefs.current.forEach((el, i) => {
        if (!el) return
        const r   = el.getBoundingClientRect()
        const sec = section.getBoundingClientRect()
        const cx  = r.left + r.width / 2  - sec.left
        const cy  = r.top  + r.height / 2 - sec.top
        const dx  = mouseRef.current.x - cx
        const dy  = mouseRef.current.y - cy
        const dist = Math.sqrt(dx * dx + dy * dy)

        let targetX = 0, targetY = 0
        if (dist < REPEL_R) {
          const angle = Math.atan2(dy, dx)
          const force = (1 - dist / REPEL_R) * REPEL_F
          targetX = -Math.cos(angle) * force
          targetY = -Math.sin(angle) * force
        }

        const p = posRef.current[i], v = velRef.current[i]
        v.x = (v.x + (targetX - p.x) * STIFF) * DAMP
        v.y = (v.y + (targetY - p.y) * STIFF) * DAMP
        p.x += v.x; p.y += v.y

        el.style.transform = `translate(${p.x.toFixed(2)}px,${p.y.toFixed(2)}px)`
      })
      rafRepel.current = requestAnimationFrame(tick)
    }

    section.addEventListener('mousemove', onMove)
    section.addEventListener('mouseleave', onLeave)
    rafRepel.current = requestAnimationFrame(tick)
    return () => {
      section.removeEventListener('mousemove', onMove)
      section.removeEventListener('mouseleave', onLeave)
      cancelAnimationFrame(rafRepel.current)
    }
  }, [])

  return (
    <section ref={sectionRef} className="tz-section">
      <canvas ref={canvasRef} className="tz-canvas" />

      {/* Floating icons */}
      {FLOAT_ICONS.map((icon, idx) => {
        const fp = FLOAT_PARAMS[idx]
        return (
          <div
            key={icon.name + idx}
            ref={el => { iconRefs.current[idx] = el }}
            className="tz-fi-wrap"
            style={{ ...(icon.r ? { right: icon.r } : { left: icon.l }), top: icon.t }}
          >
            <div
              className="tz-fi-card"
              style={{
                '--fd':  `${fp.dur}s`,
                '--fdel':`${fp.del}s`,
                '--frx': `${fp.rx}px`,
                '--fry': `${fp.ry}px`,
                '--frot':`${fp.rot}deg`,
                borderColor: icon.color + '44',
              }}
            >
              <span className="tz-fi-emoji">{icon.icon}</span>
              <span className="tz-fi-label">{icon.name}</span>
              <span className="tz-fi-range" style={{ color: icon.color }}>{icon.range}</span>
            </div>
          </div>
        )
      })}

      {/* Centre heading */}
      <div className="tz-center">
        <div className="tz-eyebrow">What We Store</div>
        <h2 className="tz-h2">
          Every category.<br/>
          <span className="tz-accent">Every temperature.</span>
        </h2>
       
      </div>
    </section>
  )
}

function FaqItem({ q, a }) {
  const [open, setOpen] = useState(false)
  return (
    <div className={`faq-item${open ? ' on' : ''}`}>
      <div
        className="faq-q"
        role="button"
        tabIndex={0}
        onClick={() => setOpen(!open)}
        onKeyDown={(e) => e.key === 'Enter' && setOpen(!open)}
      >
        {q}
        <span className="plus">+</span>
      </div>
      <div className="faq-a">
        <div className="faq-a-inner">{a}</div>
      </div>
    </div>
  )
}

function ServiceCard({ s }) {
  const [hovered, setHovered] = useState(false)
  return (
    <div
      className={`fc-card${hovered ? ' fc-hovered' : ''}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <span className="fc-num">{s.n}</span>
      <img src={s.img} alt={s.alt} loading="lazy" decoding="async" />
      <div className="fc-title-always">
        <h3>
          <span className="hline">{s.title}</span>
          <span className="hline"><em style={{ fontWeight: 400, fontStyle: 'normal', opacity: 0.7 }}>{s.sub}</em></span>
        </h3>
      </div>
      <div className="fc-overlay">
        <p className="fc-overlay-title">{s.title}</p>
        <p className="fc-overlay-desc">{s.desc}</p>
        <div className="fc-tags">
          {s.tags.map((t) => <span key={t} className="fc-tag">{t}</span>)}
        </div>
      </div>
    </div>
  )
}

export default function Services() {
  return (
    <>
      <Helmet>
        <title>Services — Versailles Cold Chain</title>
        <meta name="description" content="Cold logistics end to end: refrigerated freight, cold warehousing, regulated cargo handling, last-mile delivery, WMS inventory and multi-zone storage." />
      </Helmet>

      {/* Hero */}
      <section className="page-hero svc-hero" style={{ textAlign: 'center' }}>
        <div className="wrap" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', maxWidth: 1000, margin: '0 auto', paddingTop: 'clamp(70px,10vw,100px)', paddingBottom: 'clamp(40px,6vw,80px)' }}>
          <h1 style={{ maxWidth: 'none' }}>
            <span className="hline">Cold logistics,</span>
            <span className="hline"><span className="accent">end to end.</span></span>
          </h1>
          <p className="lede" style={{ textAlign: 'center', fontSize: 17, maxWidth: 520 }}>
            Reliable cold chain solutions across storage, transport, and last-mile — engineered for temperature-critical cargo.
          </p>
        </div>
      </section>

      {/* Services grid */}
      <section className="sec" style={{ paddingTop: 20 }}>
        <div className="wrap">
          <div className="fc-grid" id="fcGrid">
            {SERVICES.map((s) => <ServiceCard key={s.n} s={s} />)}
          </div>
        </div>
      </section>

      {/* Temperature Zone — floating icons */}
      <TempZoneSection />

      {/* FAQ */}
      <section className="sec" style={{ paddingTop: 40 }}>
        <div className="wrap" style={{ maxWidth: 920 }}>
          <div className="sec-eyebrow">FAQ</div>
          <h2 className="sec-title" style={{ marginBottom: 14 }}>
            <span className="hline">Questions our</span>
            <span className="hline">customers <span className="accent">actually ask.</span></span>
          </h2>
          <div className="faq">
            {FAQS.map((f, i) => <FaqItem key={i} q={f.q} a={f.a} />)}
          </div>
        </div>
      </section>
    </>
  )
}
