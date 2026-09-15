import { useState } from 'react'
import { Link } from 'react-router-dom'

const HOME_SERVICES = [
  {
    num: '01',
    slug: 'storage-warehousing',
    title: 'Storage & Warehousing',
    shortTitle: 'Storage & Warehousing',
    sub: 'Multi-temperature cold storage',
    desc: 'Purpose-built chambers holding precise temperature zones for every cargo type — from frozen to chilled.',
    img: '/img-cold-warehousing.webp',
    alt: 'Multi-temperature cold storage and warehousing',
  },
  {
    num: '02',
    slug: 'transportation-distribution',
    title: 'Transportation & Distribution',
    shortTitle: 'Refrigerated Transport',
    sub: 'Refrigerated freight & last-mile',
    desc: 'Temperature-controlled fleet moving your cargo from dock to destination, without breaking the cold chain.',
    img: '/img-refrigerated-freight.webp',
    alt: 'Refrigerated transportation and freight distribution',
  },
  {
    num: '03',
    slug: 'inventory-management',
    title: 'Inventory Management',
    shortTitle: 'Inventory Control',
    sub: 'WMS-powered control',
    desc: 'Real-time stock visibility and control, powered by our cloud-based Warehouse Management System.',
    img: '/03.webp',
    alt: 'WMS inventory management and real-time dashboard',
  },
  {
    num: '04',
    slug: 'value-added-services',
    title: 'Value-Added Services',
    shortTitle: 'Value-Added Services',
    sub: 'Beyond storage',
    desc: 'Labelling, repackaging, blast freezing, and cargo handling — tailored support beyond standard storage.',
    img: '/img-regulated-cargo.webp',
    alt: 'Value-added cold chain services and cargo handling',
  },
  {
    num: '05',
    slug: 'supply-chain-solutions',
    title: 'Supply Chain Solutions',
    shortTitle: 'Supply Chain Solutions',
    sub: 'End-to-end cold chain',
    desc: 'A single partner managing your entire cold chain, from harvest sourcing to retail shelf.',
    img: '/img-supply-chain.webp',
    alt: 'End-to-end cold supply chain solutions',
  },
  {
    num: '06',
    slug: 'technology-visibility',
    title: 'Technology & Visibility',
    shortTitle: 'Technology & IoT',
    sub: 'IoT-powered intelligence',
    desc: 'Live dashboards and IoT sensors giving you full visibility into every pallet, every step of the way.',
    img: '/42050.webp',
    alt: 'IoT technology and live cold chain monitoring',
  },
]

export default function ServicesSection() {
  const [activeIdx, setActiveIdx] = useState(2)

  return (
    <section className="sec dark-sec home-svc-section" id="services">
      {/* 60FPS Compact & Balanced Overlapping Deck Styles */}
      <style>{`
        .home-svc-section {
          position: relative;
          padding: 85px 0 95px;
          background: #060c23;
          overflow: hidden;
        }

        .home-svc-header {
          text-align: center;
          max-width: 760px;
          margin: 0 auto 40px auto;
        }

        .home-svc-lede {
          font-size: 1.02rem;
          color: rgba(226, 232, 240, 0.85);
          line-height: 1.65;
          margin-top: 12px;
        }

        /* Overlapping Layered Deck Container */
        .home-deck-container {
          max-width: 1360px;
          margin: 0 auto;
          position: relative;
          padding: 10px 0 15px 0;
        }

        .home-deck-track {
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          min-height: 435px;
          padding: 20px 10px 30px 10px;
        }

        /* Compact card height (395px) to prevent overly long appearance */
        .home-deck-card {
          position: relative;
          width: 250px;
          flex: 0 0 250px;
          height: 395px;
          border-radius: 24px;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          text-decoration: none;
          color: #ffffff;
          background: #081030;
          border: 3px solid #ffffff;
          box-shadow: 0 14px 34px -10px rgba(0, 0, 0, 0.5);
          cursor: pointer;
          flex-shrink: 0;
          transform-origin: center bottom;
          will-change: transform, opacity, box-shadow;
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
          transform: translateZ(0);
          transition: transform 0.35s cubic-bezier(0.2, 0.9, 0.3, 1),
                      box-shadow 0.35s ease,
                      opacity 0.35s ease,
                      border-color 0.3s ease;
        }

        .home-deck-card-img {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          z-index: 1;
          will-change: transform;
          transform: translateZ(0);
          transition: transform 0.5s cubic-bezier(0.2, 0.9, 0.3, 1);
        }

        .home-deck-card:hover .home-deck-card-img,
        .home-deck-card.is-active .home-deck-card-img {
          transform: scale(1.05);
        }

        .home-deck-card-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(
            180deg,
            rgba(6, 12, 35, 0.1) 0%,
            rgba(6, 12, 35, 0.35) 35%,
            rgba(6, 12, 35, 0.88) 72%,
            #060c23 100%
          );
          z-index: 2;
          pointer-events: none;
        }

        .home-deck-card-top {
          position: absolute;
          top: 14px;
          left: 14px;
          right: 14px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          z-index: 3;
          pointer-events: none;
        }

        .home-deck-badge {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          background: rgba(6, 12, 35, 0.82);
          border: 1px solid rgba(255, 255, 255, 0.28);
          color: #ffffff;
          font-family: var(--display, 'Satoshi', sans-serif);
          font-weight: 700;
          font-size: 0.78rem;
          padding: 4px 10px;
          border-radius: 999px;
          letter-spacing: 0.04em;
        }

        .home-deck-badge span {
          color: #888FA2;
          font-size: 0.72rem;
        }

        .home-deck-arrow {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: rgba(6, 12, 35, 0.82);
          border: 1px solid rgba(255, 255, 255, 0.28);
          color: #ffffff;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.9rem;
          font-weight: 700;
          transition: transform 0.25s cubic-bezier(0.2, 0.9, 0.3, 1),
                      background 0.25s ease,
                      border-color 0.25s ease;
        }

        .home-deck-card:hover .home-deck-arrow,
        .home-deck-card.is-active .home-deck-arrow {
          transform: translate3d(2px, -2px, 0);
          background: #888FA2;
          border-color: #888FA2;
          color: #ffffff;
        }

        .home-deck-card-body {
          position: relative;
          z-index: 3;
          padding: 16px 18px 16px 18px;
          display: flex;
          flex-direction: column;
        }

        .home-deck-sub {
          font-size: 0.72rem;
          color: #888FA2;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          margin-bottom: 4px;
          line-height: 1.3;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .home-deck-title {
          font-family: var(--display, 'Satoshi', sans-serif);
          font-size: 1.22rem;
          font-weight: 800;
          color: #ffffff;
          margin: 0 0 5px 0;
          line-height: 1.22;
          letter-spacing: -0.015em;
        }

        .home-deck-desc {
          font-size: 0.82rem;
          line-height: 1.45;
          color: rgba(226, 232, 240, 0.85);
          margin: 0 0 10px 0;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .home-deck-footer {
          border-top: 1px solid rgba(255, 255, 255, 0.14);
          padding-top: 8px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-size: 0.78rem;
          font-weight: 600;
          color: #888FA2;
          transition: color 0.25s ease;
        }

        .home-deck-card:hover .home-deck-footer,
        .home-deck-card.is-active .home-deck-footer {
          color: #ffffff;
        }

        .home-deck-footer-arrow {
          transition: transform 0.25s ease;
        }

        .home-deck-card:hover .home-deck-footer-arrow,
        .home-deck-card.is-active .home-deck-footer-arrow {
          transform: translate3d(3px, 0, 0);
        }

        /* Navigation Controls below the Deck */
        .home-deck-nav {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 14px;
          margin-top: 20px;
          flex-wrap: wrap;
        }

        .home-deck-nav-btn {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: rgba(15, 25, 60, 0.8);
          border: 1px solid rgba(255, 255, 255, 0.2);
          color: #ffffff;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.1rem;
          cursor: pointer;
          transition: all 0.25s ease;
          box-shadow: 0 4px 14px rgba(0, 0, 0, 0.3);
        }

        .home-deck-nav-btn:hover {
          background: #888FA2;
          color: #ffffff;
          border-color: #888FA2;
          transform: scale(1.06);
        }

        .home-deck-indicators {
          display: flex;
          align-items: center;
          gap: 8px;
          flex-wrap: wrap;
          justify-content: center;
        }

        .home-deck-indicator {
          padding: 5px 12px;
          border-radius: 999px;
          background: rgba(255, 255, 255, 0.06);
          border: 1px solid rgba(255, 255, 255, 0.15);
          color: rgba(226, 232, 240, 0.75);
          font-size: 0.78rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.25s ease;
        }

        .home-deck-indicator:hover,
        .home-deck-indicator.active {
          background: #888FA2;
          border-color: #888FA2;
          color: #ffffff;
        }

        @media (max-width: 1150px) {
          .home-deck-track {
            overflow-x: auto;
            justify-content: flex-start;
            padding: 20px 15px 30px 15px;
            scrollbar-width: none;
            -webkit-overflow-scrolling: touch;
          }
          .home-deck-track::-webkit-scrollbar {
            display: none;
          }
          .home-deck-card {
            height: 380px;
          }
        }

        @media (max-width: 768px) {
          .home-deck-track {
            flex-direction: column;
            align-items: stretch;
            min-height: auto;
            padding: 10px 0 20px 0;
            overflow-x: visible;
          }
          .home-deck-card {
            width: 100% !important;
            flex: 0 0 auto !important;
            height: 360px !important;
            margin-left: 0 !important;
            transform: none !important;
            opacity: 1 !important;
            margin-bottom: 18px;
          }
          .home-deck-nav {
            display: none;
          }
        }
      `}</style>

      <div className="wrap">
        <div className="home-svc-header">
          <h2 className="sec-title" data-anim="up">
            <span className="hline">Our Services</span>
          </h2>
          <p className="sec-sub home-svc-lede" data-anim="up">
            From cold storage to last-mile delivery, our cold chain logistics services cover every step your cargo takes — end to end, temperature never compromised.
          </p>
        </div>

        {/* Overlapping Layered Card Deck */}
        <div className="home-deck-container">
          <div className="home-deck-track">
            {HOME_SERVICES.map((service, idx) => {
              const isActive = activeIdx === idx
              const dist = Math.abs(idx - activeIdx)

              // Moderate, well-proportioned hover lifts (not overly tall)
              const zIndex = isActive ? 20 : 15 - dist
              const scale = isActive ? 1.025 : Math.max(0.94, 1 - dist * 0.02)
              const translateY = isActive ? -8 : 0
              const opacity = isActive ? 1 : Math.max(0.88, 1 - dist * 0.035)
              const marginLeft = idx === 0 ? '0px' : '-44px'

              return (
                <Link
                  key={service.num}
                  to={`/services/${service.slug}`}
                  className={`home-deck-card ${isActive ? 'is-active' : ''}`}
                  style={{
                    zIndex,
                    opacity,
                    marginLeft,
                    transform: `translate3d(0, ${translateY}px, 0) scale(${scale})`,
                    borderColor: isActive ? '#ffffff' : 'rgba(255, 255, 255, 0.85)',
                    boxShadow: isActive
                      ? '0 20px 50px -10px rgba(0, 0, 0, 0.65)'
                      : '0 12px 28px -8px rgba(0, 0, 0, 0.45)',
                  }}
                  onMouseEnter={() => setActiveIdx(idx)}
                  onClick={() => setActiveIdx(idx)}
                >
                  <img
                    src={service.img}
                    alt={service.alt}
                    className="home-deck-card-img"
                    loading="lazy"
                    decoding="async"
                    onError={(e) => {
                      if (service.num === '03') {
                        e.currentTarget.src = 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=900&q=80&auto=format&fit=crop'
                      } else if (service.num === '06') {
                        e.currentTarget.src = 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=900&q=80&auto=format&fit=crop'
                      }
                    }}
                  />
                  <div className="home-deck-card-overlay" />

                  <div className="home-deck-card-top">
                    <span className="home-deck-badge">
                      <span>✦</span> {service.num}
                    </span>
                    <div className="home-deck-arrow">↗</div>
                  </div>

                  <div className="home-deck-card-body">
                    <div className="home-deck-sub">{service.sub}</div>
                    <h3 className="home-deck-title">{service.title}</h3>
                    <p className="home-deck-desc">{service.desc}</p>

                    <div className="home-deck-footer">
                      <span>Explore {service.shortTitle}</span>
                      <span className="home-deck-footer-arrow">→</span>
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>

          {/* Bottom Interactive Navigation */}
          <div className="home-deck-nav">
            <button
              type="button"
              className="home-deck-nav-btn"
              onClick={() => setActiveIdx((prev) => (prev > 0 ? prev - 1 : HOME_SERVICES.length - 1))}
              aria-label="Previous Service"
            >
              ←
            </button>

            <div className="home-deck-indicators">
              {HOME_SERVICES.map((s, idx) => (
                <button
                  key={s.num}
                  type="button"
                  className={`home-deck-indicator ${activeIdx === idx ? 'active' : ''}`}
                  onClick={() => setActiveIdx(idx)}
                >
                  {s.num} {s.shortTitle}
                </button>
              ))}
            </div>

            <button
              type="button"
              className="home-deck-nav-btn"
              onClick={() => setActiveIdx((prev) => (prev < HOME_SERVICES.length - 1 ? prev + 1 : 0))}
              aria-label="Next Service"
            >
              →
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
