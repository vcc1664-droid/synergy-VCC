import { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { SERVICES_DATA, getServiceBySlug } from '../data/servicesData'
import { smoothScrollToEl, smoothScrollToTop } from '../utils/smoothScroll'

const SERVICE_DETAIL_STYLES = `
/* ==========================================================================
   SERVICE DETAIL PAGE STYLES
   ========================================================================== */

.sd-page {
  position: relative;
  background-color: #060c23;
  color: #e2e8f0;
  font-family: var(--body, 'Inter', -apple-system, BlinkMacSystemFont, sans-serif);
  overflow-x: hidden;
  padding-bottom: 50px;
}

/* ── Hero Section ── */
.sd-hero {
  position: relative;
  padding: 130px 24px 70px 24px;
  background: radial-gradient(ellipse at 50% 15%, #182357 0%, #0d163d 50%, #060c23 100%);
  border-bottom: 1px solid rgba(56, 189, 248, 0.12);
  overflow: hidden;
}

.sd-hero-glow {
  position: absolute;
  top: 10%;
  left: 50%;
  transform: translateX(-50%);
  width: 600px;
  height: 400px;
  background: radial-gradient(circle, rgba(56, 189, 248, 0.15) 0%, transparent 70%);
  filter: blur(60px);
  pointer-events: none;
  z-index: 1;
}

.sd-wrap {
  position: relative;
  z-index: 2;
  max-width: 1240px;
  margin: 0 auto;
}

/* Breadcrumbs */
.sd-breadcrumbs {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.85rem;
  color: rgba(203, 213, 225, 0.7);
  margin-bottom: 24px;
}

.sd-breadcrumbs a {
  color: rgba(203, 213, 225, 0.8);
  text-decoration: none;
  transition: color 0.2s ease;
}

.sd-breadcrumbs a:hover {
  color: #38bdf8;
}

.sd-breadcrumbs span.curr {
  color: #38bdf8;
  font-weight: 600;
}

.sd-badge {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 5px 14px;
  border-radius: 999px;
  background: rgba(56, 189, 248, 0.08);
  border: 1px solid rgba(56, 189, 248, 0.28);
  color: #38bdf8;
  font-size: 0.82rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  margin-bottom: 18px;
}

.sd-title {
  font-family: var(--display, 'Satoshi', -apple-system, BlinkMacSystemFont, sans-serif);
  font-size: clamp(2.3rem, 4.2vw, 3.8rem);
  font-weight: 800;
  line-height: 1.15;
  letter-spacing: -0.025em;
  color: #ffffff;
  margin: 0 0 16px 0;
}

.sd-title .accent {
  display: block;
  color: #888FA2;
  font-weight: 800;
}

.sd-tagline {
  font-size: clamp(1.02rem, 1.25vw, 1.16rem);
  line-height: 1.68;
  color: rgba(226, 232, 240, 0.85);
  max-width: 780px;
  margin-bottom: 32px;
}

.sd-hero-actions {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 16px;
  margin-bottom: 40px;
}

.sd-btn-primary {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 13px 30px;
  border-radius: 999px;
  background: #0f1c48;
  color: #ffffff;
  font-weight: 600;
  font-size: 0.96rem;
  text-decoration: none;
  border: 1px solid rgba(56, 189, 248, 0.45);
  box-shadow: 0 0 20px rgba(56, 189, 248, 0.22);
  transition: all 0.25s ease;
  cursor: pointer;
}

.sd-btn-primary:hover {
  background: #172a6b;
  border-color: #38bdf8;
  box-shadow: 0 0 30px rgba(56, 189, 248, 0.4);
  transform: translateY(-2px);
  color: #ffffff;
}

.sd-btn-secondary {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 13px 26px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.05);
  color: #cbd5e1;
  font-weight: 500;
  font-size: 0.96rem;
  text-decoration: none;
  border: 1px solid rgba(255, 255, 255, 0.14);
  transition: all 0.25s ease;
  cursor: pointer;
}

.sd-btn-secondary:hover {
  background: rgba(255, 255, 255, 0.1);
  color: #ffffff;
  border-color: rgba(255, 255, 255, 0.3);
  transform: translateY(-2px);
}

/* Quick Stats Bar in Hero */
.sd-quick-stats {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
  padding-top: 24px;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
}

.sd-stat-card {
  background: rgba(13, 22, 53, 0.6);
  border: 1px solid rgba(56, 189, 248, 0.15);
  border-radius: 14px;
  padding: 16px 20px;
  backdrop-filter: blur(10px);
}

.sd-stat-lbl {
  font-size: 0.76rem;
  color: rgba(148, 163, 184, 0.85);
  text-transform: uppercase;
  letter-spacing: 0.06em;
  margin-bottom: 4px;
}

.sd-stat-val {
  font-family: var(--display, 'Satoshi', sans-serif);
  font-size: 1.22rem;
  font-weight: 700;
  color: #38bdf8;
}

/* ── Overview Section ── */
.sd-sec {
  padding: 80px 24px;
  position: relative;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
}

.sd-overview-grid {
  display: grid;
  grid-template-columns: 1.1fr 1fr;
  align-items: center;
  gap: 50px;
}

.sd-overview-text h2 {
  font-family: var(--display, 'Satoshi', sans-serif);
  font-size: clamp(1.8rem, 3vw, 2.5rem);
  font-weight: 800;
  color: #ffffff;
  margin: 0 0 20px 0;
}

.sd-overview-text p {
  font-size: 1rem;
  line-height: 1.74;
  color: rgba(226, 232, 240, 0.82);
  margin-bottom: 20px;
}

.sd-overview-img-card {
  position: relative;
  border-radius: 24px;
  overflow: hidden;
  border: 1px solid rgba(56, 189, 248, 0.22);
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.6), 0 0 35px rgba(56, 189, 248, 0.12);
  aspect-ratio: 16 / 11;
}

.sd-overview-img-card img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.sd-img-badge {
  position: absolute;
  bottom: 18px;
  left: 18px;
  background: rgba(6, 12, 35, 0.9);
  border: 1px solid rgba(56, 189, 248, 0.35);
  border-radius: 12px;
  padding: 10px 16px;
  backdrop-filter: blur(10px);
}

.sd-img-badge-lbl {
  font-size: 0.72rem;
  color: #94a3b8;
  text-transform: uppercase;
}

.sd-img-badge-val {
  font-size: 0.98rem;
  font-weight: 700;
  color: #38bdf8;
}

/* ── Capabilities Section ── */
.sd-sec-head {
  text-align: center;
  max-width: 720px;
  margin: 0 auto 50px auto;
}

.sd-sec-title {
  font-family: var(--display, 'Satoshi', sans-serif);
  font-size: clamp(1.8rem, 3vw, 2.5rem);
  font-weight: 800;
  color: #ffffff;
  margin: 0 0 12px 0;
}

.sd-sec-title .accent {
  display: block;
  color: #888FA2;
  font-weight: 800;
}

.sd-sec-sub {
  font-size: 1rem;
  color: rgba(226, 232, 240, 0.75);
  line-height: 1.65;
}

.sd-caps-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 28px;
}

.sd-cap-card {
  background: rgba(13, 22, 53, 0.7);
  border: 1px solid rgba(56, 189, 248, 0.15);
  border-radius: 20px;
  padding: 34px 28px;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
}

.sd-cap-card:hover {
  transform: translateY(-5px);
  border-color: rgba(56, 189, 248, 0.4);
  box-shadow: 0 16px 36px rgba(0, 0, 0, 0.4), 0 0 25px rgba(56, 189, 248, 0.15);
  background: rgba(17, 28, 68, 0.85);
}

.sd-cap-icon-box {
  width: 52px;
  height: 52px;
  border-radius: 14px;
  background: rgba(56, 189, 248, 0.1);
  border: 1px solid rgba(56, 189, 248, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #38bdf8;
  margin-bottom: 20px;
  font-size: 1.4rem;
}

.sd-cap-title {
  font-family: var(--display, 'Satoshi', sans-serif);
  font-size: 1.25rem;
  font-weight: 700;
  color: #ffffff;
  margin: 0 0 10px 0;
}

.sd-cap-desc {
  font-size: 0.94rem;
  line-height: 1.68;
  color: rgba(203, 213, 225, 0.8);
  margin: 0;
}

/* ── Process Workflow ── */
.sd-process-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;
}

.sd-process-card {
  background: rgba(13, 22, 53, 0.6);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 18px;
  padding: 28px 22px;
  position: relative;
  display: flex;
  flex-direction: column;
}

.sd-process-num {
  font-family: var(--display, 'Satoshi', sans-serif);
  font-size: 2.2rem;
  font-weight: 800;
  color: #38bdf8;
  opacity: 0.6;
  margin-bottom: 14px;
}

.sd-process-title {
  font-family: var(--display, 'Satoshi', sans-serif);
  font-size: 1.12rem;
  font-weight: 700;
  color: #ffffff;
  margin: 0 0 10px 0;
}

.sd-process-desc {
  font-size: 0.88rem;
  line-height: 1.65;
  color: rgba(203, 213, 225, 0.78);
  margin: 0;
}

/* ── Technical Specifications Table ── */
.sd-specs-box {
  background: rgba(10, 18, 44, 0.8);
  border: 1px solid rgba(56, 189, 248, 0.2);
  border-radius: 20px;
  padding: 36px;
  backdrop-filter: blur(12px);
  box-shadow: 0 20px 45px rgba(0, 0, 0, 0.4);
}

.sd-specs-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
}

.sd-spec-item {
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 14px;
  padding: 18px 20px;
}

.sd-spec-label {
  font-size: 0.78rem;
  color: #94a3b8;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: 6px;
}

.sd-spec-value {
  font-size: 1.05rem;
  font-weight: 700;
  color: #ffffff;
}

/* ── Other Services Navigation ── */
.sd-other-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 22px;
}

.sd-other-card {
  background: rgba(13, 22, 53, 0.6);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 16px;
  overflow: hidden;
  text-decoration: none;
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
}

.sd-other-card:hover {
  transform: translateY(-5px);
  border-color: rgba(56, 189, 248, 0.35);
  box-shadow: 0 14px 30px rgba(0, 0, 0, 0.4);
}

.sd-other-img {
  width: 100%;
  height: 140px;
  object-fit: cover;
}

.sd-other-body {
  padding: 18px 20px;
}

.sd-other-num {
  font-size: 0.78rem;
  color: #38bdf8;
  font-weight: 700;
  margin-bottom: 4px;
}

.sd-other-title {
  font-family: var(--display, 'Satoshi', sans-serif);
  font-size: 1.15rem;
  font-weight: 700;
  color: #ffffff;
  margin: 0 0 6px 0;
}

.sd-other-sub {
  font-size: 0.84rem;
  color: rgba(203, 213, 225, 0.7);
}

/* ── FAQ Accordion ── */
.sd-faq-list {
  max-width: 860px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.sd-faq-item {
  background: rgba(13, 22, 53, 0.6);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 16px;
  overflow: hidden;
  transition: all 0.25s ease;
}

.sd-faq-item.active {
  border-color: rgba(56, 189, 248, 0.35);
  background: rgba(16, 27, 65, 0.85);
}

.sd-faq-q {
  padding: 20px 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  cursor: pointer;
  user-select: none;
}

.sd-faq-q-text {
  font-family: var(--display, 'Satoshi', sans-serif);
  font-size: 1.05rem;
  font-weight: 700;
  color: #ffffff;
}

.sd-faq-toggle {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: rgba(56, 189, 248, 0.1);
  border: 1px solid rgba(56, 189, 248, 0.25);
  color: #38bdf8;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.1rem;
  font-weight: 600;
  transition: transform 0.25s ease;
  flex-shrink: 0;
}

.sd-faq-item.active .sd-faq-toggle {
  transform: rotate(45deg);
  background: #38bdf8;
  color: #060c23;
}

.sd-faq-a {
  padding: 0 24px 20px 24px;
  font-size: 0.94rem;
  line-height: 1.7;
  color: rgba(226, 232, 240, 0.82);
}

/* ── CTA Banner ── */
.sd-cta-card {
  border-radius: 26px;
  background: radial-gradient(ellipse at 50% 20%, #15225c 0%, #0b1335 70%, #060b20 100%);
  border: 1px solid rgba(56, 189, 248, 0.25);
  box-shadow: 0 25px 60px rgba(0, 0, 0, 0.6), 0 0 40px rgba(56, 189, 248, 0.12);
  padding: 56px 36px;
  text-align: center;
  position: relative;
  overflow: hidden;
}

.sd-cta-title {
  font-family: var(--display, 'Satoshi', sans-serif);
  font-size: clamp(1.9rem, 3.2vw, 2.7rem);
  font-weight: 800;
  color: #ffffff;
  margin: 0 0 14px 0;
}

.sd-cta-title .accent {
  display: block;
  color: #888FA2;
  font-weight: 800;
}

.sd-cta-desc {
  font-size: 1.02rem;
  color: rgba(226, 232, 240, 0.82);
  max-width: 620px;
  margin: 0 auto 32px auto;
  line-height: 1.68;
}

.sd-cta-btns {
  display: flex;
  justify-content: center;
  gap: 16px;
  flex-wrap: wrap;
}

/* ── Responsive ── */
@media (max-width: 1024px) {
  .sd-overview-grid {
    grid-template-columns: 1fr;
    gap: 36px;
  }
  .sd-caps-grid {
    grid-template-columns: 1fr;
  }
  .sd-process-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  .sd-specs-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  .sd-other-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .sd-hero {
    padding-top: 100px;
  }
  .sd-process-grid {
    grid-template-columns: 1fr;
  }
  .sd-specs-grid {
    grid-template-columns: 1fr;
  }
  .sd-other-grid {
    grid-template-columns: 1fr;
  }
  .sd-specs-box {
    padding: 22px;
  }
  .sd-cta-card {
    padding: 36px 20px;
  }
}
`

export default function ServiceDetail() {
  const { slug } = useParams()
  const navigate = useNavigate()
  const [openFaq, setOpenFaq] = useState(null)

  const service = getServiceBySlug(slug)

  useEffect(() => {
    smoothScrollToTop()
  }, [slug])

  if (!service) {
    return (
      <div className="sd-page" style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '140px 24px' }}>
        <div style={{ maxWidth: 500 }}>
          <h1 style={{ fontSize: '2.5rem', marginBottom: 16, color: '#fff' }}>Service Not Found</h1>
          <p style={{ color: 'rgba(226,232,240,0.8)', marginBottom: 28 }}>
            The requested cold chain service does not exist or has been moved.
          </p>
          <Link to="/services" className="sd-btn-primary">
            ← Back to All Services
          </Link>
        </div>
      </div>
    )
  }

  const otherServices = SERVICES_DATA.filter(s => s.slug !== service.slug).slice(0, 3)

  const handleContactClick = (e) => {
    e.preventDefault()
    navigate('/')
    setTimeout(() => smoothScrollToEl('contact'), 350)
  }

  return (
    <div className="sd-page">
      <Helmet>
        <title>{`${service.title} — Versailles Cold Chain`}</title>
        <meta name="description" content={service.heroDesc} />
      </Helmet>

      <style>{SERVICE_DETAIL_STYLES}</style>

      {/* ── 1. Hero Section ── */}
      <section className="sd-hero">
        <div className="sd-hero-glow" />
        <div className="sd-wrap">
          {/* Breadcrumbs */}
          <nav className="sd-breadcrumbs" aria-label="Breadcrumb">
            <Link to="/">Home</Link>
            <span>/</span>
            <Link to="/services">Services</Link>
            <span>/</span>
            <span className="curr">{service.shortTitle}</span>
          </nav>

          <div className="sd-badge">
            <span>✦</span> SERVICE {service.n}
          </div>

          <h1 className="sd-title">
            {service.title}
            <span className="accent">{service.subtitle}</span>
          </h1>

          <p className="sd-tagline">
            {service.tagline}
          </p>

          <div className="sd-hero-actions">
            <a href="#contact" onClick={handleContactClick} className="sd-btn-primary">
              Request a Service Quote
            </a>
            <Link to="/services" className="sd-btn-secondary">
              ← View All Services
            </Link>
          </div>

          {/* Quick Stats Bar */}
          <div className="sd-quick-stats">
            <div className="sd-stat-card">
              <div className="sd-stat-lbl">Operating Range</div>
              <div className="sd-stat-val">{service.tempRange}</div>
            </div>
            <div className="sd-stat-card">
              <div className="sd-stat-lbl">Capacity / Fleet</div>
              <div className="sd-stat-val">{service.capacity}</div>
            </div>
            <div className="sd-stat-card">
              <div className="sd-stat-lbl">Compliance Standard</div>
              <div className="sd-stat-val">GDP / FSSAI Audited</div>
            </div>
            <div className="sd-stat-card">
              <div className="sd-stat-lbl">Telemetry Sync</div>
              <div className="sd-stat-val">Every 30 Seconds</div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 2. Detailed Overview ── */}
      <section className="sd-sec">
        <div className="sd-wrap">
          <div className="sd-overview-grid">
            <div className="sd-overview-text">
              <div className="sd-badge" style={{ marginBottom: 12 }}>
                Service Overview
              </div>
              <h2>
                Engineered for uncompromising <span style={{ color: '#38bdf8' }}>thermal integrity.</span>
              </h2>
              {service.overview.map((para, idx) => (
                <p key={idx}>{para}</p>
              ))}
            </div>

            <div className="sd-overview-img-card">
              <img
                src={service.img}
                alt={service.alt}
                loading="lazy"
                decoding="async"
                onError={(e) => {
                  if (service.n === '03') {
                    e.currentTarget.src = 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=900&q=80&auto=format&fit=crop'
                  } else if (service.n === '06') {
                    e.currentTarget.src = 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=900&q=80&auto=format&fit=crop'
                  }
                }}
              />
              <div className="sd-img-badge">
                <div className="sd-img-badge-lbl">Service Rating</div>
                <div className="sd-img-badge-val">99.98% Cold Continuity SLA</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 3. Key Capabilities ── */}
      <section className="sd-sec" style={{ background: 'rgba(10, 18, 44, 0.5)' }}>
        <div className="sd-wrap">
          <div className="sd-sec-head">
            <div className="sd-badge" style={{ marginBottom: 12 }}>Capabilities</div>
            <h2 className="sd-sec-title">
              What sets our {service.shortTitle}
              <span className="accent">apart from standard logistics.</span>
            </h2>
            <p className="sd-sec-sub">
              Purpose-built infrastructure and digital telemetry designed for zero hot spots and maximum product shelf life.
            </p>
          </div>

          <div className="sd-caps-grid">
            {service.capabilities.map((cap, idx) => (
              <div key={idx} className="sd-cap-card">
                <div className="sd-cap-icon-box">
                  ✦
                </div>
                <h3 className="sd-cap-title">{cap.title}</h3>
                <p className="sd-cap-desc">{cap.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. Process Workflow ── */}
      <section className="sd-sec">
        <div className="sd-wrap">
          <div className="sd-sec-head">
            <div className="sd-badge" style={{ marginBottom: 12 }}>Execution Process</div>
            <h2 className="sd-sec-title">
              How we execute
              <span className="accent">seamless cold chain operations.</span>
            </h2>
            <p className="sd-sec-sub">
              A 4-step systematic methodology ensuring zero temperature excursions and full audit readiness.
            </p>
          </div>

          <div className="sd-process-grid">
            {service.process.map((p, idx) => (
              <div key={idx} className="sd-process-card">
                <div className="sd-process-num">{p.step}</div>
                <h3 className="sd-process-title">{p.title}</h3>
                <p className="sd-process-desc">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 5. Technical Specifications Grid ── */}
      <section className="sd-sec" style={{ background: 'rgba(10, 18, 44, 0.4)' }}>
        <div className="sd-wrap">
          <div className="sd-sec-head">
            <div className="sd-badge" style={{ marginBottom: 12 }}>Specifications</div>
            <h2 className="sd-sec-title">
              Technical parameters &
              <span className="accent">infrastructure standards.</span>
            </h2>
          </div>

          <div className="sd-specs-box">
            <div className="sd-specs-grid">
              {service.specs.map((sp, idx) => (
                <div key={idx} className="sd-spec-item">
                  <div className="sd-spec-label">{sp.label}</div>
                  <div className="sd-spec-value">{sp.val}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── 6. Service-Specific FAQs ── */}
      <section className="sd-sec">
        <div className="sd-wrap">
          <div className="sd-sec-head">
            <div className="sd-badge" style={{ marginBottom: 12 }}>FAQ</div>
            <h2 className="sd-sec-title">
              Frequently asked questions about
              <span className="accent">{service.shortTitle}.</span>
            </h2>
          </div>

          <div className="sd-faq-list">
            {service.faqs.map((f, i) => {
              const isOpen = openFaq === i
              return (
                <div key={i} className={`sd-faq-item ${isOpen ? 'active' : ''}`}>
                  <div
                    className="sd-faq-q"
                    onClick={() => setOpenFaq(isOpen ? null : i)}
                  >
                    <span className="sd-faq-q-text">{f.q}</span>
                    <span className="sd-faq-toggle">+</span>
                  </div>
                  {isOpen && (
                    <div className="sd-faq-a">
                      {f.a}
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── 7. Explore Other Services ── */}
      <section className="sd-sec" style={{ background: 'rgba(10, 18, 44, 0.5)' }}>
        <div className="sd-wrap">
          <div className="sd-sec-head">
            <div className="sd-badge" style={{ marginBottom: 12 }}>Explore More</div>
            <h2 className="sd-sec-title">
              Other cold logistics
              <span className="accent">solutions you may need.</span>
            </h2>
          </div>

          <div className="sd-other-grid">
            {otherServices.map((os) => (
              <Link key={os.slug} to={`/services/${os.slug}`} className="sd-other-card">
                <img
                  src={os.img}
                  alt={os.alt}
                  className="sd-other-img"
                  loading="lazy"
                  decoding="async"
                  onError={(e) => {
                    if (os.n === '03') {
                      e.currentTarget.src = 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=900&q=80&auto=format&fit=crop'
                    } else if (os.n === '06') {
                      e.currentTarget.src = 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=900&q=80&auto=format&fit=crop'
                    }
                  }}
                />
                <div className="sd-other-body">
                  <div className="sd-other-num">Service {os.n}</div>
                  <h3 className="sd-other-title">{os.title}</h3>
                  <div className="sd-other-sub">{os.subtitle}</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── 8. Closing CTA ── */}
      <section className="sd-sec" style={{ borderBottom: 'none' }}>
        <div className="sd-wrap">
          <div className="sd-cta-card">
            <h2 className="sd-cta-title">
              Ready to deploy {service.shortTitle}?
              <span className="accent">Let's discuss your requirements.</span>
            </h2>
            <p className="sd-cta-desc">
              Contact our cold chain engineers today to configure a tailored proposal, reserve pallet space, or schedule a facility walkthrough.
            </p>
            <div className="sd-cta-btns">
              <a href="#contact" onClick={handleContactClick} className="sd-btn-primary">
                Get a Custom Quote
              </a>
              <Link to="/facilities" className="sd-btn-secondary">
                View Network Facilities →
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
