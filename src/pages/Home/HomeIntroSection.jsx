import React from 'react'

export default function HomeIntroSection() {
  return (
    <>
      <style>{`
        .cold-chain-hero {
          position: relative;
          background-color: #03081e;
          background-image: url('/cold-chain-hero-bg.jpg');
          background-size: cover;
          background-position: center center;
          background-repeat: no-repeat;
          color: #ffffff;
          padding: clamp(80px, 11vh, 140px) 20px clamp(90px, 12vh, 150px);
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          z-index: 5;
          box-sizing: border-box;
        }

        /* Ambient Lighting and Vignette Overlays */
        .cold-chain-hero::before {
          content: '';
          position: absolute;
          inset: 0;
          background: radial-gradient(
            circle at 50% 28%,
            rgba(2, 44, 90, 0.48) 0%,
            rgba(4, 18, 48, 0.65) 45%,
            rgba(3, 8, 25, 0.88) 100%
          );
          pointer-events: none;
          z-index: 1;
        }

        /* Top and Bottom Seamless Edge Blends */
        .cch-fade-top {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 100px;
          background: linear-gradient(to bottom, #070f30 0%, transparent 100%);
          z-index: 2;
          pointer-events: none;
        }

        .cch-fade-bottom {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 110px;
          background: linear-gradient(to top, #070f30 0%, transparent 100%);
          z-index: 2;
          pointer-events: none;
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

        /* ── Top Eyebrow / Badge: ── COLD CHAIN ❄ LOGISTICS ── ── */
        .cch-eyebrow {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 16px;
          margin-bottom: 24px;
          font-family: var(--display, 'Satoshi', sans-serif);
          font-size: clamp(0.78rem, 1.1vw, 0.92rem);
          font-weight: 700;
          letter-spacing: 0.28em;
          text-transform: uppercase;
          color: #93c5fd;
          user-select: none;
        }

        .cch-eyebrow-line {
          width: clamp(40px, 6vw, 75px);
          height: 1.5px;
          background: linear-gradient(90deg, transparent, rgba(56, 189, 248, 0.75));
          border-radius: 2px;
        }

        .cch-eyebrow-line.right {
          background: linear-gradient(90deg, rgba(56, 189, 248, 0.75), transparent);
        }

        .cch-snowflake-glow {
          position: relative;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 26px;
          height: 26px;
          color: #38bdf8;
          filter: drop-shadow(0 0 10px rgba(56, 189, 248, 0.95)) drop-shadow(0 0 20px rgba(56, 189, 248, 0.5));
          animation: cch-pulse 3s ease-in-out infinite alternate;
        }

        @keyframes cch-pulse {
          0% { filter: drop-shadow(0 0 8px rgba(56, 189, 248, 0.8)); transform: scale(0.97); }
          100% { filter: drop-shadow(0 0 14px rgba(56, 189, 248, 1)) drop-shadow(0 0 24px rgba(56, 189, 248, 0.6)); transform: scale(1.03); }
        }

        /* ── Main Headline ── */
        .cch-title {
          font-family: var(--display, 'Satoshi', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif);
          font-size: clamp(2.2rem, 4.3vw, 3.85rem);
          font-weight: 800;
          line-height: 1.16;
          letter-spacing: -0.025em;
          margin: 0 0 22px 0;
          color: #ffffff;
          text-shadow: 0 3px 20px rgba(0, 0, 0, 0.85);
        }

        .cch-title-accent {
          display: block;
          color: #888FA2;
          font-weight: 800;
          text-shadow: 0 3px 20px rgba(0, 0, 0, 0.85);
        }

        /* ── Subtitle Description ── */
        .cch-subtitle {
          font-family: var(--body, 'Inter', -apple-system, BlinkMacSystemFont, sans-serif);
          font-size: clamp(0.98rem, 1.22vw, 1.14rem);
          line-height: 1.68;
          font-weight: 400;
          color: rgba(224, 237, 255, 0.9);
          max-width: 820px;
          margin: 0 auto 52px auto;
          text-shadow: 0 2px 10px rgba(0, 0, 0, 0.7);
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

        /* Glowing Circular Icon Container */
        .cch-icon-circle {
          width: clamp(62px, 6vw, 76px);
          height: clamp(62px, 6vw, 76px);
          border-radius: 50%;
          background: radial-gradient(circle at 35% 35%, rgba(15, 45, 95, 0.92) 0%, rgba(4, 15, 38, 0.98) 100%);
          border: 2px solid #0284c7;
          box-shadow: 0 0 16px rgba(56, 189, 248, 0.35), inset 0 0 12px rgba(56, 189, 248, 0.2);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #ffffff;
          margin-bottom: 16px;
          transition: border-color 0.3s ease, box-shadow 0.3s ease, transform 0.3s ease;
        }

        .cch-feature-item:hover .cch-icon-circle {
          border-color: #38bdf8;
          box-shadow: 0 0 24px rgba(56, 189, 248, 0.65), inset 0 0 16px rgba(56, 189, 248, 0.35);
          color: #e0f2fe;
          transform: scale(1.05);
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
          color: #ffffff;
          letter-spacing: -0.01em;
          text-shadow: 0 2px 8px rgba(0, 0, 0, 0.8);
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
            rgba(56, 189, 248, 0.05) 0%,
            rgba(56, 189, 248, 0.45) 50%,
            rgba(56, 189, 248, 0.05) 100%
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
            padding: 60px 16px 80px;
          }

          .cch-eyebrow {
            gap: 10px;
            font-size: 0.72rem;
            letter-spacing: 0.18em;
            margin-bottom: 18px;
          }

          .cch-eyebrow-line {
            width: 28px;
          }

          .cch-title {
            margin-bottom: 16px;
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
        {/* Edge gradient fades for seamless transitions */}
        <div className="cch-fade-top" aria-hidden="true" />
        <div className="cch-fade-bottom" aria-hidden="true" />

        <div className="cch-container">
          {/* ── Top Eyebrow Badge ── */}
          <div className="cch-eyebrow" aria-label="Cold Chain Logistics">
            <span className="cch-eyebrow-line" />
            <span>COLD CHAIN</span>
            <span className="cch-snowflake-glow" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round">
                <line x1="12" y1="2" x2="12" y2="22" />
                <line x1="2" y1="12" x2="22" y2="12" />
                <line x1="4.93" y1="4.93" x2="19.07" y2="19.07" />
                <line x1="19.07" y1="4.93" x2="4.93" y2="19.07" />
                {/* Chevrons / crystalline accents on tips */}
                <polyline points="9 3.5 12 6.5 15 3.5" />
                <polyline points="9 20.5 12 17.5 15 20.5" />
                <polyline points="3.5 9 6.5 12 3.5 15" />
                <polyline points="20.5 9 17.5 12 20.5 15" />
                <polyline points="6 6.5 7.5 8 9 6.5" />
                <polyline points="18 17.5 16.5 16 15 17.5" />
                <polyline points="17.5 6 16 7.5 17.5 9" />
                <polyline points="6.5 18 8 16.5 6.5 15" />
              </svg>
            </span>
            <span>LOGISTICS</span>
            <span className="cch-eyebrow-line right" />
          </div>

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

