import { useEffect, useRef } from 'react'
import { Helmet } from 'react-helmet-async'
import { Link, useNavigate } from 'react-router-dom'

const ROADMAP = [
  {
    date: 'September 2025', title: 'Land Acquired',
    body: "Strategic land secured to establish VCC's next-generation cold chain infrastructure hub, designed for −25°C to +5°C multi-zone operations.",
    icon: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-7 8-13a8 8 0 0 0-16 0c0 6 8 13 8 13Z"/><circle cx="12" cy="9" r="2.5"/></svg>),
  },
  {
    date: 'February 2026', title: 'Site Plan Approval',
    body: 'Project planning, engineering layouts, and approvals aligned to support scalable cold chain operations.',
    icon: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="7" y1="8" x2="17" y2="8"/><line x1="7" y1="12" x2="13" y2="12"/><path d="M15 16l2-2 3 3"/></svg>),
  },
  {
    date: 'April 2026', title: 'Construction Commenced',
    body: "Groundbreaking and execution of VCC's premium cold chain facility with multi-temperature infrastructure (−25°C to +5°C).",
    icon: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><line x1="4" y1="22" x2="4" y2="2"/><path d="M4 9h12l2 4-2 4H4"/><line x1="8" y1="2" x2="8" y2="22"/><line x1="1" y1="22" x2="23" y2="22"/></svg>),
  },
  {
    date: 'October 2026', title: 'Facility Live',
    body: 'VCC becomes operational, delivering enterprise-grade cold chain solutions for a wide range of industries.',
    icon: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>),
  },
]

const MVV_PANELS = [
  {
    num: '01',
    // tag: '// VISION',
    heading: 'Our Vision',
    body: 'To transform the food supply chain by creating a more efficient, sustainable, and resilient cold chain that reduces waste and helps feed the world.',
    foot: "India's most trusted cold chain infrastructure",
    accent: '#7ee7ff',
  },
  {
    num: '02',
    // tag: '// MISSION',
    heading: 'Our Mission',
    body: 'To protect product integrity and empower supply chains through intelligent cold chain infrastructure, precision-controlled environments, and unwavering operational excellence.',
    foot: 'Zero compromise on temperature integrity',
    accent: '#97b2ff',
  },
]

const VALUES_LIST = [
  {
    num: '01', title: 'Precision',
    body: 'We believe every degree matters. Our commitment to accuracy ensures the highest standards of temperature control and operational performance.',
    accent: '#97b2ff',
    icon: (<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="3"/><line x1="12" y1="2" x2="12" y2="6"/><line x1="12" y1="18" x2="12" y2="22"/><line x1="2" y1="12" x2="6" y2="12"/><line x1="18" y1="12" x2="22" y2="12"/></svg>),
  },
  {
    num: '02', title: 'Reliability',
    body: 'We deliver consistent, dependable solutions through resilient infrastructure and disciplined execution.',
    accent: '#7ee7ff',
    icon: (<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-12V4l-8-2-8 2v6c0 8 8 12 8 12Z"/><path d="m9 12 2 2 4-4"/></svg>),
  },
  {
    num: '03', title: 'Innovation',
    body: 'We harness advanced technologies, automation, and data-driven intelligence to continuously improve efficiency and service quality.',
    accent: '#e0d4ff',
    icon: (<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M13 2 3 14h9l-1 8 10-12h-9z"/></svg>),
  },
  {
    num: '04', title: 'Integrity',
    body: 'We conduct business with transparency, accountability, and professionalism in every interaction.',
    accent: '#a8e6cf',
    icon: (<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-12V4l-8-2-8 2v6c0 8 8 12 8 12Z"/><path d="m9 12 2 2 4-4"/></svg>),
  },
  {
    num: '05', title: 'Partnership',
    body: 'We build enduring relationships through trust, responsiveness, and a shared commitment to success.',
    accent: '#ffd3b6',
    icon: (<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>),
  },
  {
    num: '06', title: 'Excellence',
    body: 'We strive to exceed expectations by setting higher standards in quality, safety, and operational performance.',
    accent: '#ffe08a',
    icon: (<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>),
  },
]

const PILLARS = [
  {
    label: 'Integrity', sub: 'is our foundation',
    icon: (<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-12V4l-8-2-8 2v6c0 8 8 12 8 12Z"/><path d="m9 12 2 2 4-4"/></svg>),
  },
  {
    label: 'Experience', sub: 'you can rely on',
    icon: (<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="4"/><path d="M6 20v-2a6 6 0 0 1 12 0v2"/></svg>),
  },
  {
    label: 'Partnership', sub: 'you can count on',
    icon: (<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/></svg>),
  },
]

function MvvSection() {
  const secRef    = useRef(null)
  const panelRefs = useRef([])
  const cardRefs  = useRef([])
  const rafRef    = useRef(null)

  useEffect(() => {
    const onScroll = () => {
      cancelAnimationFrame(rafRef.current)
      rafRef.current = requestAnimationFrame(() => {
        const s = secRef.current
        if (!s) return
        const r = s.getBoundingClientRect()
        const p = Math.max(0, Math.min(1, (-r.top + window.innerHeight) / (r.height + window.innerHeight)))
        s.style.setProperty('--pp', p.toFixed(3))
      })
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => { window.removeEventListener('scroll', onScroll); cancelAnimationFrame(rafRef.current) }
  }, [])

  useEffect(() => {
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('mvv-in'); obs.unobserve(e.target) }
      }),
      { threshold: 0.1 }
    )
    panelRefs.current.forEach(el => el && obs.observe(el))
    cardRefs.current.forEach(el => el && obs.observe(el))
    return () => obs.disconnect()
  }, [])

  const tiltEl = (e, el) => {
    if (!el) return
    const r = el.getBoundingClientRect()
    const x = (e.clientX - r.left) / r.width  - 0.5
    const y = (e.clientY - r.top)  / r.height - 0.5
    el.style.transition = 'transform 0s, box-shadow .3s, border-color .4s'
    el.style.transform = `perspective(900px) rotateY(${x * 12}deg) rotateX(${-y * 8}deg) translateZ(22px) scale(1.02)`
    el.style.setProperty('--sx', `${(x + 0.5) * 100}%`)
    el.style.setProperty('--sy', `${(y + 0.5) * 100}%`)
  }
  const resetEl = el => {
    if (!el) return
    el.style.transition = 'transform .55s cubic-bezier(.2,.7,.2,1), box-shadow .5s, border-color .4s'
    el.style.transform = ''
  }

  return (
    <section className="mvv-sec" ref={secRef} id="mission">
      <div className="mvv-bg" aria-hidden="true">
        <div className="mvv-orb mvv-oa" />
        <div className="mvv-orb mvv-ob" />
        <div className="mvv-orb mvv-oc" />
        <div className="mvv-mesh" />
      </div>

      <div className="wrap">
        <h2 className="mvv-main-head">What Drives Us</h2>

        <div className="mvv-duo">
          {MVV_PANELS.map((p, i) => (
            <div
              key={p.num}
              className="mvv-panel"
              ref={el => { panelRefs.current[i] = el }}
              style={{ '--acc': p.accent, '--delay': `${i * 0.14}s` }}
              onMouseMove={e => tiltEl(e, panelRefs.current[i])}
              onMouseLeave={() => resetEl(panelRefs.current[i])}
            >
              <div className="mvv-panel-content">
                <span className="mvv-tag">{p.tag}</span>
                <h3 className="mvv-ph">{p.heading}</h3>
                <p className="mvv-pb">{p.body}</p>
                <div className="mvv-pf">
                  <span className="mvv-dot" />
                  <span className="mvv-pft">{p.foot}</span>
                </div>
              </div>
              <div className="mvv-panel-glow" aria-hidden="true" />
            </div>
          ))}
        </div>

        <div className="mvv-vh">
          <span className="mvv-vl">Our Values</span>
          <div className="mvv-vr" />
        </div>

        <div className="mvv-vg">
          {VALUES_LIST.map((v, i) => (
            <div
              key={v.title}
              className="mvv-vc"
              ref={el => { cardRefs.current[i] = el }}
              style={{ '--acc': v.accent, '--d': `${i * 0.07}s` }}
              onMouseMove={e => tiltEl(e, cardRefs.current[i])}
              onMouseLeave={() => resetEl(cardRefs.current[i])}
            >
              <div className="mvv-vbar" />
              <div className="mvv-vico" style={{ color: v.accent }}>{v.icon}</div>
              <h4 className="mvv-vt">{v.title}</h4>
              <p className="mvv-vb">{v.body}</p>
              <div className="mvv-shine" aria-hidden="true" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}


export default function About() {
  const navigate = useNavigate()

  const goToContact = (e) => {
    e.preventDefault()
    navigate('/')
    setTimeout(() => {
      document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
    }, 350)
  }

  return (
    <>
      <Helmet>
        <title>About &mdash; Versailles Cold Chain</title>
        <meta name="description" content="Versailles Cold Chain: our mission, vision, values, development roadmap, and manifesto." />
      </Helmet>

      <section className="page-hero about-ph">
        <div className="wrap about-ph-grid">
          <div className="about-ph-text">
            <h1>
              <span className="hline">Preserving Freshness.</span>
              <span className="hline"><span className="accent">Powering Possibilities.</span></span>
            </h1>
            <p className="lede">
              <span className="hline">Powering possibilities with a people-first approach</span>{' '}
              <span className="hline">that enhances workforce wellbeing while maintaining efficiency across every cold environment.</span>
            </p>
          </div>
        </div>
      </section>

      <section className="sec roadmap-section" id="roadmap">
        <div className="wrap">
          <div className="rm-head">
            <h2 className="sec-title" style={{ whiteSpace: 'normal' }}>Development Pipeline.</h2>
            <p className="sec-sub">From land acquisition to a fully operational enterprise-grade cold chain facility.</p>
          </div>
          <div className="roadmap">
            {ROADMAP.map((step, i) => (
              <div className="rm-step" key={i}>
                <div className="rm-badge">{step.icon}</div>
                {i < ROADMAP.length - 1 && <span className="rm-chevron">&raquo;</span>}
                <div className="rm-date">{step.date}</div>
                <div className="rm-divider" />
                <h5 className="rm-title">{step.title}</h5>
                <p className="rm-body">{step.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <MvvSection />

      <section className="sec" style={{ padding: '60px 0' }}>
        <div className="wrap">
          <div className="manifesto">
            <div className="manifesto-inner">
              <div className="mf-left">
                <span className="eye">Our Manifesto</span>
                <h2 className="mf-headline">
                  <span className="hline">We don&rsquo;t just store your cargo.</span>
                  <span className="hline"><em>We protect every degree of your trust.</em></span>
                </h2>
                <p className="mf-sub">Temperature-controlled. Technology-powered. Trusted by industries where it matters most.</p>
              </div>
              <div className="mf-right">
                <div className="manifesto-stats">
                  <div><b>0<sup>&deg;C</sup></b><span>Tolerance broken since 2022</span></div>
                  <div><b>100<sup>%</sup></b><span>On-time SLA &middot; 7-day</span></div>
                  <div><b>Pan&#8209;India</b><span>Cold chain network</span></div>
                  <div><b>MNCs</b><span>Trusted across industries</span></div>
                </div>
              </div>
            </div>
            <div className="mf-bar">
              <div className="mf-bar-left">
                <div className="mf-bar-icon">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-12V4l-8-2-8 2v6c0 8 8 12 8 12Z"/><path d="m9 12 2 2 4-4"/></svg>
                </div>
                <div className="mf-bar-text">
                  <b>Your cargo. Our commitment.</b>
                  <span>Every pallet. Every degree. Every time.</span>
                </div>
              </div>
              <Link to="/" onClick={goToContact} className="btn" style={{ background: '#fff', color: '#070f30', borderColor: '#fff', fontSize: 13, padding: '12px 22px' }}>
                Book Your Pallet with Confidence &rarr;
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="sec" style={{ paddingTop: 40 }}>
        <div className="wrap">
          <div className="sus-values-wrap">
            <h2 className="sec-title">
              <span className="hline">Trusted to protect</span>
              <span className="hline">what matters.</span>
              <span className="hline"><span className="accent">Every degree. Every time.</span></span>
            </h2>
            <p className="sec-sub" style={{ marginTop: 18, maxWidth: 540, marginLeft: 'auto', marginRight: 'auto' }}>
              With 100+ years of combined expertise in cold chain solutions, we deliver more than storage &mdash; <strong style={{ color: 'var(--navy)' }}>we deliver commitment.</strong>
            </p>
            <div className="sus-pillars">
              {PILLARS.map((p) => (
                <div className="sus-pillar" key={p.label}>
                  <div className="sus-pillar-ico">{p.icon}</div>
                  <b>{p.label}</b>
                  <span>{p.sub}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
