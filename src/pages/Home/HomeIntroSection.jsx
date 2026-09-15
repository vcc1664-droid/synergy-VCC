import React from 'react'

export default function HomeIntroSection() {
  return (
    <>
      <style>{`
        .cold-chain-hero {
          position: relative;
          background-color: #ffffff;
          color: #071952;
          padding: clamp(70px, 9vh, 120px) 20px clamp(75px, 10vh, 130px);
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          z-index: 5;
          box-sizing: border-box;
          border-top: 1px solid #e2e8f0;
          border-bottom: 1px solid #e2e8f0;
        }

        /* Central Content Container */
        .cch-container {
          position: relative;
          z-index: 10;
          max-width: 1080px;
          width: 100%;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
        }



        /* ── Main Headline ── */
        .cch-title {
          font-family: var(--display, 'Satoshi', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif);
          font-size: clamp(2.2rem, 4.3vw, 3.85rem);
          font-weight: 800;
          line-height: 1.16;
          letter-spacing: -0.025em;
          margin: 0 0 20px 0;
          color: #071952;
        }

        .cch-title-accent {
          display: block;
          color: #888FA2;
          font-weight: 800;
        }

        /* ── Subtitle Description ── */
        .cch-subtitle {
          font-family: var(--body, 'Inter', -apple-system, BlinkMacSystemFont, sans-serif);
          font-size: clamp(0.98rem, 1.22vw, 1.14rem);
          line-height: 1.68;
          font-weight: 450;
          color: #334155;
          max-width: 820px;
          margin: 0 auto 50px auto;
        }

        /* ── 4 Pillar Feature Badges ── */
        .cch-features-row {
          display: flex;
          align-items: flex-start;
          justify-content: center;
          gap: clamp(16px, 3.5vw, 44px);
          width: 100%;
          max-width: 920px;
          margin: 0 auto;
        }

        .cch-feature-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          flex: 1;
          min-width: 110px;
          cursor: default;
          transition: transform 0.28s ease;
        }

        .cch-feature-item:hover {
          transform: translateY(-4px);
        }

        /* Circular Icon Container */
        .cch-icon-circle {
          width: clamp(62px, 6vw, 76px);
          height: clamp(62px, 6vw, 76px);
          border-radius: 50%;
          background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
          border: 2px solid #888FA2;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #888FA2;
          margin-bottom: 16px;
          transition: all 0.3s ease;
        }

        .cch-feature-item:hover .cch-icon-circle {
          border-color: #64748b;
          background: #888FA2;
          color: #ffffff;
          transform: scale(1.06);
        }

        .cch-icon-circle svg {
          width: clamp(26px, 2.7vw, 34px);
          height: clamp(26px, 2.7vw, 34px);
          display: block;
        }

        /* 2-line Feature Labels */
        .cch-feature-label {
          font-family: var(--display, 'Satoshi', sans-serif);
          font-size: clamp(0.88rem, 1.1vw, 1.02rem);
          font-weight: 700;
          line-height: 1.35;
          color: #071952;
          letter-spacing: -0.01em;
        }

        .cch-feature-label span {
          display: block;
          white-space: nowrap;
        }

        /* Vertical Divider Between Columns */
        .cch-divider {
          width: 1px;
          height: 64px;
          background: linear-gradient(
            to bottom,
            rgba(136, 143, 162, 0.05) 0%,
            rgba(136, 143, 162, 0.35) 50%,
            rgba(136, 143, 162, 0.05) 100%
          );
          margin-top: 6px;
          flex-shrink: 0;
        }

        /* ── Responsive Styling ── */
        @media (max-width: 820px) {
          .cch-features-row {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 28px 20px;
            max-width: 440px;
          }

          .cch-divider {
            display: none;
          }

          .cch-subtitle {
            margin-bottom: 40px;
          }
        }

        @media (max-width: 520px) {
          .cold-chain-hero {
            padding: 55px 16px 70px;
          }



          .cch-title {
            margin-bottom: 14px;
          }

          .cch-features-row {
            gap: 24px 16px;
          }

          .cch-icon-circle {
            width: 58px;
            height: 58px;
            margin-bottom: 12px;
          }

          .cch-feature-label {
            font-size: 0.84rem;
          }
        }
      `}</style>

      <section className="cold-chain-hero" id="cold-chain-precision">
        <div className="cch-container">


          {/* ── Main Heading ── */}
          <h2 className="cch-title">
            Reliable Cold Chain Logistics,
            <span className="cch-title-accent">Delivered with Precision</span>
          </h2>

          {/* ── Subtitle Description ── */}
          <p className="cch-subtitle">
            We keep your cargo at the right temperature, every mile of the way.
            Our cold chain logistics network covers storage, transport and real-time
            tracking — so nothing slips through the cracks.
          </p>

          {/* ── 4 Feature Pillars ── */}
          <div className="cch-features-row">
            {/* Feature 1: Temperature Controlled */}
            <div className="cch-feature-item">
              <div className="cch-icon-circle" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="12" y1="2" x2="12" y2="22" />
                  <line x1="2" y1="12" x2="22" y2="12" />
                  <line x1="4.93" y1="4.93" x2="19.07" y2="19.07" />
                  <line x1="19.07" y1="4.93" x2="4.93" y2="19.07" />
                  <polyline points="9 3.5 12 6.5 15 3.5" />
                  <polyline points="9 20.5 12 17.5 15 20.5" />
                  <polyline points="3.5 9 6.5 12 3.5 15" />
                  <polyline points="20.5 9 17.5 12 20.5 15" />
                </svg>
              </div>
              <div className="cch-feature-label">
                <span>Temperature</span>
                <span>Controlled</span>
              </div>
            </div>

            <div className="cch-divider" aria-hidden="true" />

            {/* Feature 2: Secure Transport */}
            <div className="cch-feature-item">
              <div className="cch-icon-circle" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  {/* Delivery / Reefer Truck Solid Silhouette */}
                  <path d="M1 4.5A1.5 1.5 0 0 1 2.5 3h12A1.5 1.5 0 0 1 16 4.5V6h3.25a1.5 1.5 0 0 1 1.17.56l2.75 3.5c.21.27.33.6.33.94V16.5a1.5 1.5 0 0 1-1.5 1.5h-1.05a3.001 3.001 0 0 1-5.9 0H9.95a3.001 3.001 0 0 1-5.9 0H2.5A1.5 1.5 0 0 1 1 16.5v-12zM7 16a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zm11 0a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zM16 8v3.5h5.12L18.7 8H16z" />
                </svg>
              </div>
              <div className="cch-feature-label">
                <span>Secure</span>
                <span>Transport</span>
              </div>
            </div>

            <div className="cch-divider" aria-hidden="true" />

            {/* Feature 3: Real-Time Tracking */}
            <div className="cch-feature-item">
              <div className="cch-icon-circle" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  {/* Solid Map Location Pin with Inner Hole */}
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5z" />
                </svg>
              </div>
              <div className="cch-feature-label">
                <span>Real-Time</span>
                <span>Tracking</span>
              </div>
            </div>

            <div className="cch-divider" aria-hidden="true" />

            {/* Feature 4: Safe & Reliable */}
            <div className="cch-feature-item">
              <div className="cch-icon-circle" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  {/* Shield with Checkmark */}
                  <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 15.5l-4-4 1.41-1.41L10 13.67l6.59-6.59L18 8.5l-8 8z" />
                </svg>
              </div>
              <div className="cch-feature-label">
                <span>Safe &</span>
                <span>Reliable</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

