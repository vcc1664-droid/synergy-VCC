import React from "react";

const QUOTES = [
  {
    text: "VCC took a 14-hour cold run from being our biggest risk to a non-event. The audit logs alone changed how we manage inventory with our retail partners.",
    initials: "CR",
    name: "Priya Sharma",
    role: "Head of Cold Supply",
  },
  {
    text: "They picked up the contract two operators had failed. Three months in, zero excursions, and a dashboard our ops team actually likes.",
    initials: "ML",
    name: "Rohit Khanna",
    role: "Director of Logistics",
  },
  {
    text: "We deep-freeze seafood from Kochi. Every degree matters. VCC is the first facility we trust to never break the curve, ever.",
    initials: "ID",
    name: "Anjali Nair",
    role: "COO",
  },
  {
    text: "The team is precise without being precious. They show up early, in clean bays, with the right paperwork. That is rare in cold chain.",
    initials: "HV",
    name: "Vikram Patel",
    role: "VP Operations",
  },
  {
    text: "Our fresh produce moves across three states before it hits the shelf. VCC handles multi-zone storage like it is routine. For them, it is.",
    initials: "AB",
    name: "Meera Iyer",
    role: "Logistics Head",
  },
];

function QuoteCard({ q }) {
  return (
    <div className="quote-card">
      <div className="qmark">"</div>

      <p className="quote-text">{q.text}</p>

      <div className="qfoot">
        <div className="avi">{q.initials}</div>

        <div className="author">
          <b>{q.name}</b>
          <span>{q.role}</span>
        </div>
      </div>
    </div>
  );
}

export default function TestimonialsSection() {
  return (
    <>
      <style>{`
        .sec {
          padding: 100px 0;
          background: #fff;
          overflow: hidden;
        }

        .wrap {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 20px;
        }

        .sec-title {
          text-align: center;
          font-size: clamp(2rem, 5vw, 4rem);
          font-weight: 700;
          margin-bottom: 20px;
        }

        .hline {
          display: inline-block;
        }

        .testimonial-slider {
          position: relative;
          width: 100%;
          overflow: hidden;
          margin-top: 60px;
        }

        .testimonial-slider::before,
        .testimonial-slider::after {
          content: "";
          position: absolute;
          top: 0;
          width: 120px;
          height: 100%;
          z-index: 2;
          pointer-events: none;
        }

        .testimonial-slider::before {
          left: 0;
          background: linear-gradient(
            to right,
            rgba(255,255,255,1),
            rgba(255,255,255,0)
          );
        }

        .testimonial-slider::after {
          right: 0;
          background: linear-gradient(
            to left,
            rgba(255,255,255,1),
            rgba(255,255,255,0)
          );
        }

        .testimonial-track {
          display: flex;
          gap: 24px;
          width: max-content;
          animation: marquee 30s linear infinite;
        }

        .testimonial-track:hover {
          animation-play-state: paused;
        }

        .quote-card {
          width: 420px;
          min-height: 260px;
          padding: 32px;
          border-radius: 24px;
          background: #ffffff;
          border: 1px solid #e5e7eb;
          box-shadow: 0 10px 30px rgba(0,0,0,0.08);
          flex-shrink: 0;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }

        .qmark {
          font-size: 4rem;
          line-height: 1;
          color: #070f30;
          opacity: 0.2;
        }

        .quote-text {
          font-size: 1rem;
          line-height: 1.8;
          color: #374151;
          margin: 12px 0 24px;
        }

        .qfoot {
          display: flex;
          align-items: center;
          gap: 14px;
        }

        .avi {
          width: 52px;
          height: 52px;
          border-radius: 50%;
          background: #070f30;
          color: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
        }

        .author {
          display: flex;
          flex-direction: column;
        }

        .author b {
          color: #111827;
          margin-bottom: 4px;
        }

        .author span {
          color: #6b7280;
          font-size: 0.9rem;
        }

        @keyframes marquee {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
          }
        }

        @media (max-width: 768px) {
          .quote-card {
            width: 320px;
            min-height: 280px;
          }

          .testimonial-track {
            animation-duration: 20s;
          }

          .testimonial-slider::before,
          .testimonial-slider::after {
            width: 50px;
          }
        }
      `}</style>

      <section className="sec" id="stories">
        <div className="wrap">
          <h2 className="sec-title" data-anim="up">
            <span className="hline">Your Trust. Our Pallet.</span>
          </h2>
        </div>

        <div className="testimonial-slider">
          <div className="testimonial-track">
            {[...QUOTES, ...QUOTES].map((q, i) => (
              <QuoteCard key={i} q={q} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}