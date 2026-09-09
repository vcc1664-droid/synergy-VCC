import React from 'react'

export default function HomeIntroSection() {
  return (
    <>
      <style>{`
        .home-intro-sec {
          position: relative;
          background: #070f30;
          color: #ffffff;
          padding: clamp(28px, 3.5vw, 44px) 0 clamp(40px, 5vw, 60px);
          overflow: hidden;
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
          z-index: 10;
        }

        /* Ambient Glow & Subtle Pattern */
        .home-intro-bg {
          position: absolute;
          inset: 0;
          pointer-events: none;
          z-index: 0;
        }

        .home-intro-orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(100px);
          opacity: 0.3;
        }

        .home-intro-orb-1 {
          width: 550px;
          height: 550px;
          top: -20%;
          left: 50%;
          transform: translateX(-50%);
          background: radial-gradient(circle, #2563eb 0%, rgba(37, 99, 235, 0) 70%);
        }

        .home-intro-grid-pattern {
          position: absolute;
          inset: 0;
          background-image: 
            linear-gradient(to right, rgba(255, 255, 255, 0.04) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 255, 255, 0.04) 1px, transparent 1px);
          background-size: 40px 40px;
          mask-image: radial-gradient(ellipse 80% 70% at 50% 50%, black 30%, transparent 80%);
          -webkit-mask-image: radial-gradient(ellipse 80% 70% at 50% 50%, black 30%, transparent 80%);
        }

        .home-intro-wrap {
          position: relative;
          z-index: 2;
          max-width: 1100px;
          margin: 0 auto;
          padding: 0 24px;
          text-align: center;
        }

        /* H1 Heading - Guaranteed Visible 56px */
        .home-intro-title {
          font-family: var(--display, 'Satoshi', sans-serif);
          font-size: 56px;
          font-weight: 800;
          line-height: 1.2;
          letter-spacing: -0.025em;
          color: #ffffff !important;
          opacity: 1 !important;
          visibility: visible !important;
          max-width: 1040px;
          margin: 0 auto 24px;
          display: block;
        }

        .intro-title-accent {
          display: block;
          font-size: 56px;
          font-weight: 800;
          line-height: 1.2;
          color: #CBD0DA !important;
          margin-top: 8px;
        }

        /* Subtitle Lede */
        .home-intro-lede {
          font-family: var(--body, 'Inter', sans-serif);
          font-size: clamp(1.1rem, 1.4vw, 1.25rem);
          line-height: 1.75;
          color: #dce8ff !important;
          opacity: 1 !important;
          visibility: visible !important;
          max-width: 860px;
          margin: 0 auto;
        }

        @media (max-width: 900px) {
          .home-intro-title,
          .intro-title-accent {
            font-size: 42px;
          }
        }

        @media (max-width: 640px) {
          .home-intro-sec {
            padding: 24px 0 32px;
          }
          .home-intro-title,
          .intro-title-accent {
            font-size: 32px;
          }
        }
      `}</style>

      <section className="home-intro-sec" id="intro-overview">
        <div className="home-intro-bg" aria-hidden="true">
          <div className="home-intro-orb home-intro-orb-1" />
          <div className="home-intro-grid-pattern" />
        </div>

        <div className="home-intro-wrap">
          <h1 className="home-intro-title">
            Versailles Cold Chain &mdash;
            <span className="intro-title-accent">
              Reliable Cold Chain Logistics, Delivered with Precision
            </span>
          </h1>

          <p className="home-intro-lede">
            We keep your cargo at the right temperature, every mile of the way.
            Our cold chain logistics network covers storage, transport and
            real-time tracking — so nothing slips through the cracks.
          </p>
        </div>
      </section>
    </>
  )
}
