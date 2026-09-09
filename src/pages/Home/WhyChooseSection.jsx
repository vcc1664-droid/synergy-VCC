import React from 'react'

const PILLARS = [
  {
    num: '01',
    badge: 'DISCIPLINE & PRECISION',
    title: 'Modern Facility & Climate Precision',
    text: "Versailles Cold Chain runs a modern facility built for cargo that can't wait and can't warm up. From fresh produce to vaccines, we handle it with total discipline — precise, documented, always on time.",
    highlights: ['Multi-Temperature Zones', 'Zero-Excursion Protocol', 'Pharma & Food Grade'],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 3h12" />
        <path d="M6 8h12" />
        <path d="m6 13 8.5 8" />
        <path d="M6 13h3a4 4 0 0 0 0-8" />
      </svg>
    ),
    accent: '#38bdf8',
    gradient: 'linear-gradient(135deg, rgba(56, 189, 248, 0.15) 0%, rgba(37, 99, 235, 0.08) 100%)',
    borderGlow: 'rgba(56, 189, 248, 0.35)',
  },
  {
    num: '02',
    badge: 'REAL-TIME VISIBILITY',
    title: 'RFID-Tagged & IoT Monitored',
    text: "Every pallet is RFID-tagged and IoT-monitored right from arrival. Live data feeds into our cold chain platform, so you always know your stock's location, condition, and ship time.",
    highlights: ['UHF RFID Traceability', '24/7 Live Telemetry', 'Cloud WMS Integration'],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 12h20M20 12l-4-4m4 4-4 4M4 6h16M4 18h16" />
      </svg>
    ),
    accent: '#818cf8',
    gradient: 'linear-gradient(135deg, rgba(129, 140, 248, 0.15) 0%, rgba(37, 99, 235, 0.08) 100%)',
    borderGlow: 'rgba(129, 140, 248, 0.35)',
  },
  {
    num: '03',
    badge: 'PAN-INDIA AGILITY',
    title: 'Scale from Pallet to Truckload',
    text: 'We serve clients across India with temperature-controlled logistics built to scale with you — from a single pallet to a full truckload, backed by dedicated fleet support.',
    highlights: ['Pan-India Network', 'Flexible LTL & FTL', 'Dedicated Fleet Support'],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="1" y="3" width="15" height="13" rx="2" />
        <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
        <circle cx="5.5" cy="18.5" r="2.5" />
        <circle cx="18.5" cy="18.5" r="2.5" />
      </svg>
    ),
    accent: '#34d399',
    gradient: 'linear-gradient(135deg, rgba(52, 211, 153, 0.15) 0%, rgba(37, 99, 235, 0.08) 100%)',
    borderGlow: 'rgba(52, 211, 153, 0.35)',
  },
]

export default function WhyChooseSection() {
  return (
    <>
      <style>{`
        #why-choose {
          padding: clamp(70px, 8vw, 110px) 0;
          background: #070f30;
          position: relative;
          overflow: hidden;
          border-top: 1px solid rgba(255, 255, 255, 0.06);
          border-bottom: 1px solid rgba(255, 255, 255, 0.06);
        }

        #why-choose::before {
          content: '';
          position: absolute;
          top: -150px;
          left: 50%;
          transform: translateX(-50%);
          width: 800px;
          height: 400px;
          background: radial-gradient(circle, rgba(37, 99, 235, 0.16) 0%, transparent 70%);
          pointer-events: none;
        }

        .why-choose-header {
          text-align: center;
          max-width: 860px;
          margin: 0 auto clamp(40px, 6vw, 64px);
        }

        .why-cards-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: clamp(20px, 2.5vw, 32px);
          position: relative;
          z-index: 2;
        }

        .why-card {
          background: linear-gradient(180deg, rgba(255, 255, 255, 0.06) 0%, rgba(255, 255, 255, 0.02) 100%);
          border-radius: 20px;
          padding: clamp(28px, 3.2vw, 38px);
          border: 1px solid rgba(255, 255, 255, 0.09);
          backdrop-filter: blur(12px);
          transition: transform 0.35s cubic-bezier(0.2, 0.8, 0.2, 1), border-color 0.35s ease, box-shadow 0.35s ease;
          display: flex;
          flex-direction: column;
          position: relative;
          overflow: hidden;
        }

        .why-card:hover {
          transform: translateY(-6px);
          border-color: var(--card-border-glow);
          box-shadow: 0 16px 36px rgba(0, 0, 0, 0.35);
          background: linear-gradient(180deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.03) 100%);
        }

        .why-card-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 24px;
        }

        .why-icon-box {
          width: 52px;
          height: 52px;
          border-radius: 14px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: var(--card-gradient);
          color: var(--card-accent);
          border: 1px solid var(--card-border-glow);
        }

        .why-icon-box svg {
          width: 26px;
          height: 26px;
        }

        .why-card-num {
          font-family: 'Satoshi', sans-serif;
          font-size: 1.5rem;
          font-weight: 800;
          color: rgba(255, 255, 255, 0.18);
          letter-spacing: -0.02em;
        }

        .why-card-badge {
          font-size: 0.75rem;
          font-weight: 700;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          color: var(--card-accent);
          margin-bottom: 8px;
        }

        .why-card-title {
          font-size: clamp(1.2rem, 1.6vw, 1.4rem);
          font-weight: 700;
          color: #ffffff;
          margin: 0 0 14px;
          line-height: 1.25;
        }

        .why-card-text {
          font-size: 0.98rem;
          line-height: 1.68;
          color: rgba(220, 232, 255, 0.78);
          margin: 0 0 24px;
          flex-grow: 1;
        }

        .why-pill-list {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          padding-top: 16px;
          border-top: 1px dashed rgba(255, 255, 255, 0.12);
        }

        .why-pill {
          font-size: 0.76rem;
          font-weight: 600;
          padding: 4px 10px;
          border-radius: 6px;
          background: rgba(255, 255, 255, 0.06);
          color: rgba(220, 232, 255, 0.9);
          border: 1px solid rgba(255, 255, 255, 0.08);
          letter-spacing: 0.02em;
        }

        @media (max-width: 1024px) {
          .why-cards-grid {
            grid-template-columns: 1fr;
            max-width: 640px;
            margin: 0 auto;
          }
        }
      `}</style>

      <section className="sec dark-sec" id="why-choose">
        <div className="wrap">
          <div className="why-choose-header">
            <h2 className="sec-title" data-anim="up" style={{ textAlign: 'center', marginBottom: 16, color: '#ffffff' }}>
              <span className="hline">Why Choose <span className="accent" style={{ color: '#7ee7ff' }}>Versailles Cold Chain</span></span>
            </h2>
            <p
              className="sec-sub"
              data-anim="up"
              style={{
                maxWidth: 720,
                margin: '0 auto',
                textAlign: 'center',
                color: 'rgba(220, 232, 255, 0.8)',
                fontSize: 'clamp(1rem, 1.25vw, 1.12rem)',
                lineHeight: 1.65,
              }}
            >
              From fresh produce to vaccines, our infrastructure is engineered for zero excursions, absolute traceability, and seamless nationwide scale.
            </p>
          </div>

          <div className="why-cards-grid" data-anim-group>
            {PILLARS.map((pillar) => (
              <div
                key={pillar.num}
                className="why-card"
                style={{
                  '--card-accent': pillar.accent,
                  '--card-gradient': pillar.gradient,
                  '--card-border-glow': pillar.borderGlow,
                }}
              >
                <div className="why-card-top">
                  <div className="why-icon-box">{pillar.icon}</div>
                  <span className="why-card-num">{pillar.num}</span>
                </div>
                <div className="why-card-badge">{pillar.badge}</div>
                <h3 className="why-card-title">{pillar.title}</h3>
                <p className="why-card-text">{pillar.text}</p>
                <div className="why-pill-list">
                  {pillar.highlights.map((h, i) => (
                    <span key={i} className="why-pill">
                      {h}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
