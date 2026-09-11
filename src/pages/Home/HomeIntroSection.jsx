import React from 'react'

export default function HomeIntroSection() {
  return (
    <>
      <style>{`
        .home-intro-sec {
          position: relative;
          background: #04091e;
          color: #ffffff;
          min-height: clamp(800px, 100vh, 1100px);
          padding: clamp(90px, 12vh, 160px) 0 clamp(110px, 16vh, 200px);
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          border: none !important;
          border-bottom: none !important;
          margin: 0;
          z-index: 5;
          box-sizing: border-box;
        }

        /* ── Full-Screen Panoramic Background Image ── */
        .home-intro-bg-media {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          z-index: 1;
          pointer-events: none;
        }

        .home-intro-bg-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center bottom;
          opacity: 0.95;
          filter: brightness(0.9) contrast(1.15);
          display: block;
        }

        /* Ambient Center & Edge Overlays */
        .home-intro-bg-overlay {
          position: absolute;
          inset: 0;
          background: radial-gradient(
            ellipse 70% 80% at 50% 45%,
            rgba(4, 9, 30, 0.6) 0%,
            rgba(4, 9, 30, 0.35) 55%,
            rgba(4, 9, 30, 0.05) 100%
          );
        }

        .home-intro-edge-fade-top {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 100px;
          background: linear-gradient(to bottom, #070f30 0%, transparent 100%);
          z-index: 2;
        }

        .home-intro-edge-fade-bottom {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 120px;
          background: linear-gradient(to top, #070f30 0%, transparent 100%);
          z-index: 2;
        }

        /* ── Connecting Trajectory Line (SVG) ── */
        .home-intro-route-svg {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          z-index: 3;
        }

        /* ── Compact Transparent Glassmorphic Card ── */
        .home-intro-wrap {
          position: relative;
          z-index: 10;
          max-width: 1280px;
          width: 100%;
          margin: 0 auto;
          padding: 0 24px;
          display: flex;
          justify-content: center;
        }

        .home-intro-glass-card {
          position: relative;
          z-index: 10;
          opacity: 1 !important;
          visibility: visible !important;
          display: block !important;
          max-width: 680px;
          width: 100%;
          padding: clamp(24px, 3.5vw, 36px) clamp(20px, 3.5vw, 38px);
          border-radius: 22px;
          background: transparent !important;
          backdrop-filter: blur(6px);
          -webkit-backdrop-filter: blur(6px);
          border: 1px solid rgba(126, 231, 255, 0.32);
          box-shadow: none !important;
          text-align: center;
          transition: transform 0.3s ease, border-color 0.3s ease;
        }

        .home-intro-glass-card:hover {
          border-color: rgba(126, 231, 255, 0.55);
        }

        /* Snowflake Top Header Accent */
        .intro-snowflake-header {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
          margin-bottom: 14px;
        }

        .intro-accent-line {
          width: 50px;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(147, 197, 253, 0.75));
        }

        .intro-accent-line.right {
          background: linear-gradient(90deg, rgba(147, 197, 253, 0.75), transparent);
        }

        .intro-snowflake-icon {
          width: 20px;
          height: 20px;
          color: #7ee7ff;
          filter: drop-shadow(0 0 8px rgba(126, 231, 255, 0.8));
          display: block;
        }

        /* H1 Heading (Compact Size) */
        .home-intro-title {
          font-family: var(--display, 'Satoshi', sans-serif);
          font-size: clamp(1.35rem, 2.1vw, 1.85rem);
          font-weight: 800;
          line-height: 1.25;
          letter-spacing: -0.02em;
          color: #ffffff;
          margin: 0 0 12px;
          text-shadow: 0 2px 14px rgba(0, 0, 0, 0.6);
        }

        /* Subtitle Lede (Compact Size) */
        .home-intro-lede {
          font-family: var(--body, 'Inter', sans-serif);
          font-size: clamp(0.84rem, 0.95vw, 0.92rem);
          line-height: 1.62;
          color: rgba(220, 235, 255, 0.9);
          max-width: 580px;
          margin: 0 auto;
          text-shadow: 0 1px 6px rgba(0, 0, 0, 0.5);
        }

        /* Responsive Media Queries */
        @media (max-width: 900px) {
          .home-intro-sec {
            min-height: 700px;
            padding: 80px 0 100px;
          }
          .home-intro-glass-card {
            border-radius: 20px;
            padding: 26px 20px;
          }
          .intro-accent-line {
            width: 36px;
          }
        }

        @media (max-width: 640px) {
          .home-intro-sec {
            min-height: 560px;
            padding: 50px 0 70px;
          }
          .home-intro-route-svg {
            display: none;
          }
          .home-intro-glass-card {
            padding: 22px 16px;
            border-radius: 18px;
          }
        }
      `}</style>

      <section className="home-intro-sec" id="intro-overview">
        {/* Full-width Panoramic Background Image */}
        <div className="home-intro-bg-media" aria-hidden="true">
          <img
            src="/cold-chain-hero-bg.jpg"
            alt="Cold chain logistics network"
            className="home-intro-bg-img"
            loading="eager"
          />
          <div className="home-intro-bg-overlay" />
          <div className="home-intro-edge-fade-top" />
          <div className="home-intro-edge-fade-bottom" />
        </div>

        {/* Trajectory Route Arc Line (SVG) */}
        <svg
          className="home-intro-route-svg"
          viewBox="0 0 1400 650"
          preserveAspectRatio="none"
          fill="none"
          aria-hidden="true"
        >
          <defs>
            <filter id="route-glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3.5" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
            <linearGradient id="route-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.1" />
              <stop offset="15%" stopColor="#38bdf8" stopOpacity="0.85" />
              <stop offset="50%" stopColor="#60a5fa" stopOpacity="0.3" />
              <stop offset="85%" stopColor="#38bdf8" stopOpacity="0.85" />
              <stop offset="100%" stopColor="#38bdf8" stopOpacity="0.1" />
            </linearGradient>
          </defs>

          {/* Left arc flowing towards center */}
          <path
            d="M 10 450 C 140 310, 220 340, 320 390"
            stroke="url(#route-gradient)"
            strokeWidth="2.2"
            filter="url(#route-glow)"
          />

          {/* Left waypoint dot */}
          <circle cx="210" cy="345" r="5" fill="#7ee7ff" filter="url(#route-glow)" />
          <circle cx="210" cy="345" r="11" stroke="rgba(126, 231, 255, 0.45)" strokeWidth="1.5" />

          {/* Right arc flowing from center to warehouse */}
          <path
            d="M 1080 390 C 1180 430, 1260 480, 1390 530"
            stroke="url(#route-gradient)"
            strokeWidth="2.2"
            filter="url(#route-glow)"
          />

          {/* Right waypoint dot */}
          <circle cx="1200" cy="440" r="5" fill="#7ee7ff" filter="url(#route-glow)" />
          <circle cx="1200" cy="440" r="11" stroke="rgba(126, 231, 255, 0.45)" strokeWidth="1.5" />
        </svg>

        {/* Center Floating Glassmorphic Hero Card */}
        <div className="home-intro-wrap">
          <div className="home-intro-glass-card">
            {/* Snowflake Icon Header */}
            <div className="intro-snowflake-header">
              <span className="intro-accent-line" />
              <svg
                className="intro-snowflake-icon"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="12" y1="2" x2="12" y2="22" />
                <line x1="2" y1="12" x2="22" y2="12" />
                <line x1="4.93" y1="4.93" x2="19.07" y2="19.07" />
                <line x1="19.07" y1="4.93" x2="4.93" y2="19.07" />
                <polyline points="9 3 12 6 15 3" />
                <polyline points="9 21 12 18 15 21" />
                <polyline points="3 9 6 12 3 15" />
                <polyline points="21 9 18 12 21 15" />
              </svg>
              <span className="intro-accent-line right" />
            </div>

            <h1 className="home-intro-title">
              Reliable Cold Chain Logistics, Delivered with Precision
            </h1>

            <p className="home-intro-lede">
              We keep your cargo at the right temperature, every mile of the way.
              Our cold chain logistics network covers storage, transport and
              real-time tracking — so nothing slips through the cracks.
            </p>
          </div>
        </div>
      </section>
    </>
  )
}
