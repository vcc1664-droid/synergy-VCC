import { useState, useEffect, useRef } from 'react'
import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { SERVICES_DATA } from '../data/servicesData'
import { smoothScrollToEl } from '../utils/smoothScroll'

/* ── 3 Advantage Pillars (Matching User Reference Image Section 2) ── */
const ADVANTAGE_PILLARS = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <circle cx="12" cy="8" r="6" />
        <path d="M15.5 13.5L18 22l-6-3-6 3 2.5-8.5" />
        <polygon points="12 4.5 13.3 7.2 16.2 7.6 14.1 9.6 14.6 12.5 12 11.1 9.4 12.5 9.9 9.6 7.8 7.6 10.7 7.2 12 4.5" fill="currentColor" stroke="none" opacity="0.3" />
      </svg>
    ),
    title: 'Temperature Precision',
    desc: 'Guaranteed multi-zone thermal stability (−25°C to +25°C) powered by 150mm PIR insulation, zero hot-spot airflow, and redundant Freon refrigeration cycles.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <rect x="5" y="5" width="14" height="14" rx="2.5" />
        <circle cx="12" cy="12" r="2.5" />
        <path d="M5 9H2M5 15H2M19 9h3M19 15h3M9 5V2M15 5V2M9 19v3M15 19v3" />
        <path d="M9 10l2 2 4-4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    title: 'Advanced IoT Technology',
    desc: 'Round-the-clock 30-second telemetry capturing ambient temperature, humidity, door events, and GPS movement with instant automated alerting.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 4.44-5.04z" />
        <path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-4.44-5.04z" />
        <circle cx="8" cy="10" r="1" fill="currentColor" />
        <circle cx="16" cy="10" r="1" fill="currentColor" />
      </svg>
    ),
    title: 'GDP & Compliance Advisory',
    desc: 'Uncompromising adherence to Good Distribution Practices (GDP), FSSAI food safety regulations, cold chain SOPs, and validated pharmaceutical protocols.',
  },
]

/* ── Interactive Constellation Pipeline Nodes (Matching User Reference Image Section 3) ── */
const CONSTELLATION_NODES = [
  { id: 1, name: 'Origin & Pre-Cooling', temp: '+4.0°C', role: 'Harvest & Production', slug: 'supply-chain-solutions' },
  { id: 2, name: 'Blast Freezing', temp: '−40.0°C', role: 'Rapid Flash Freezing', slug: 'value-added-services' },
  { id: 3, name: 'Central Cold Hub', temp: '−20.0°C', role: 'VCC 7,000-Pallet Storage', slug: 'storage-warehousing' },
  { id: 4, name: 'Illuminated Core Node', temp: '−18.0°C', role: 'Precision Telemetry Center', isCore: true, slug: 'technology-visibility' },
  { id: 5, name: 'Multi-Temp Reefer Fleet', temp: '−18.5°C', role: 'GPS Tracked Freight', slug: 'transportation-distribution' },
  { id: 6, name: 'WMS Inventory Control', temp: '+2.0°C', role: 'Verified Cold Hand-off', slug: 'inventory-management' },
]

/* ── Temperature Spectrum Categories ── */
const TEMP_CATEGORIES = [
  {
    id: 'frozen',
    tab: 'Deep Frozen (−25°C to −18°C)',
    badge: 'Deep Frozen',
    temp: '−25°C to −18°C',
    color: '#888FA2',
    icon: '❄️',
    desc: 'Designed for ice creams, seafood, processed meats, and ultra-cold frozen formulations requiring zero ice crystallization and unbroken thermal hold.',
    items: ['Ice Creams & Gelato', 'Frozen Seafood & Prawns', 'Processed & Dressed Meats', 'Frozen Dough & Ready Meals', 'Biological Samples & Plasma'],
    specs: ['−25°C Chamber Setpoint', 'Continuous Temp Logging', 'Air Curtain Isolation', 'Flash Freezer Dock Access'],
  },
  {
    id: 'chilled',
    tab: 'Chilled (0°C to +5°C)',
    badge: 'Chilled Storage',
    temp: '0°C to +5°C',
    color: '#888FA2',
    icon: '🥛',
    desc: 'Optimal micro-climate for dairy, fresh fruits, leafy vegetables, vaccines, and biologics where exact humidity and temperature control prevent spoilage.',
    items: ['Milk, Cheese & Butter', 'Fresh Fruits & Vegetables', 'Poultry & Fresh Meats', 'Cold-Pressed Juices', 'Vaccines & Biologics'],
    specs: ['Controlled Humidity (85-90%)', 'Ethylene Gas Scrubbing', 'Pre-Cooling Staging', 'Dedicated Chilled Docks'],
  },
  {
    id: 'ambient',
    tab: 'Controlled Ambient (+10°C to +25°C)',
    badge: 'Controlled Ambient',
    temp: '+10°C to +25°C',
    color: '#888FA2',
    icon: '🍫',
    desc: 'Stabilized environment for temperature-sensitive confectioneries, premium chocolates, specialty bakery, and dry pharmaceuticals.',
    items: ['Fine Chocolates & Cocoa', 'Confectionery & Candies', 'Specialty Bakery Goods', 'Pharmaceutical Formulations', 'Specialty Seeds & Grains'],
    specs: ['Dehumidified Environment', 'Pest-Controlled Facility', 'VNA Racking System', '24/7 HVAC Regulation'],
  },
]

/* ── FAQs ── */
const FAQS = [
  {
    q: 'What temperature ranges does Versailles Cold Chain handle?',
    a: 'Our facilities and reefer fleets operate seamlessly across a −25°C to +25°C range, including deep frozen (−25°C to −18°C), chilled (0°C to +5°C), and controlled ambient (+10°C to +25°C). We also provide blast freezing capabilities down to −40°C.',
  },
  {
    q: 'How does your real-time IoT monitoring work?',
    a: 'Every chamber and reefer vehicle is outfitted with calibrated IoT probes transmitting temperature, relative humidity, door open cycles, and GPS coordinates every 30 seconds to our central cloud platform. If a setpoint drifts by even ±0.5°C, automated alerts are dispatched instantly.',
  },
  {
    q: 'Are your facilities and processes GDP and FSSAI compliant?',
    a: 'Yes. Versailles Cold Chain is designed in full adherence with Good Distribution Practices (GDP), ISO 22000, FSSAI regulations, and global pharmaceutical supply chain standards. We maintain complete batch-level lot traceability and audit-ready digital logs.',
  },
  {
    q: 'Can you handle emergency cross-docking and staging?',
    a: 'Yes. Our facility features 10 insulated dock bays, an 8,500 sqft temperature-controlled staging arena, and 24/7 operations to support rapid cross-docking, consolidation, and zero-delay turnaround for time-sensitive cargo.',
  },
  {
    q: 'How can we get a tailored cold chain logistics quote?',
    a: 'You can reach out through our Get in Touch form or contact our cold chain specialists directly. Share your origin, destination, cargo volume, temperature requirements, and frequency — and we will provide a customized proposal within 24 hours.',
  },
]

/* ── Inline Scoped Styles for Services Page ── */
const SERVICES_PAGE_STYLES = `
/* ==========================================================================
   SERVICES PAGE — CELESTIAL MODERN COLD CHAIN THEME
   ========================================================================== */

.svc-page {
  position: relative;
  background-color: #060c23;
  color: #e2e8f0;
  font-family: var(--body, 'Inter', -apple-system, BlinkMacSystemFont, sans-serif);
  overflow-x: hidden;
  padding-bottom: 0;
}

/* ── Celestial Hero Section ── */
.svc-celestial-hero {
  position: relative;
  min-height: 85vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 130px 24px 80px 24px;
  background: radial-gradient(ellipse at 50% 15%, #182357 0%, #0d163d 50%, #060c23 100%);
  overflow: hidden;
  border-bottom: 1px solid rgba(56, 189, 248, 0.12);
}

.svc-hero-stars-canvas {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 1;
}

.svc-hero-glow {
  position: absolute;
  width: 650px;
  height: 650px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(56, 189, 248, 0.15) 0%, rgba(97, 139, 255, 0.04) 50%, transparent 70%);
  top: 5%;
  left: 45%;
  transform: translateX(-50%);
  filter: blur(50px);
  pointer-events: none;
  z-index: 1;
}

.svc-hero-moon {
  position: absolute;
  top: 14%;
  right: 18%;
  width: 38px;
  height: 38px;
  border-radius: 50%;
  transform: rotate(-25deg);
  z-index: 2;
  pointer-events: none;
}

.svc-hero-wrap {
  position: relative;
  z-index: 3;
  width: 100%;
  max-width: 1260px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1.15fr 0.85fr;
  align-items: center;
  gap: 50px;
}

.svc-hero-text {
  max-width: 620px;
}

.svc-badge {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 6px 16px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.25);
  color: #ffffff;
  font-size: 0.82rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  margin-bottom: 22px;
}

.svc-hero-title {
  font-family: var(--display, 'Satoshi', -apple-system, BlinkMacSystemFont, sans-serif);
  font-size: clamp(2.4rem, 4.4vw, 4.1rem);
  font-weight: 800;
  line-height: 1.14;
  letter-spacing: -0.025em;
  color: #ffffff;
  margin: 0 0 22px 0;
}

.svc-hero-title .accent {
  display: block;
  color: #888FA2;
  font-weight: 800;
}

.svc-hero-desc {
  font-size: clamp(1.02rem, 1.25vw, 1.18rem);
  line-height: 1.7;
  color: rgba(226, 232, 240, 0.85);
  margin-bottom: 36px;
  max-width: 540px;
}

.svc-hero-actions {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 16px;
}

.svc-btn-primary {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 14px 34px;
  border-radius: 999px;
  background: #0f1c48;
  color: #ffffff;
  font-weight: 600;
  font-size: 0.98rem;
  text-decoration: none;
  border: 1px solid rgba(56, 189, 248, 0.45);
  transition: all 0.28s cubic-bezier(0.16, 1, 0.3, 1);
  cursor: pointer;
}

.svc-btn-primary:hover {
  background: #172a6b;
  border-color: #38bdf8;
  transform: translateY(-2px);
  color: #ffffff;
}

.svc-btn-secondary {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 14px 28px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.04);
  color: #cbd5e1;
  font-weight: 500;
  font-size: 0.98rem;
  text-decoration: none;
  border: 1px solid rgba(255, 255, 255, 0.14);
  transition: all 0.25s ease;
  cursor: pointer;
}

.svc-btn-secondary:hover {
  background: rgba(255, 255, 255, 0.09);
  color: #ffffff;
  border-color: rgba(255, 255, 255, 0.3);
  transform: translateY(-2px);
}

/* Right Hero Artwork SVG */
.svc-hero-art-container {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

.svc-hero-svg-card {
  width: 100%;
  max-width: 500px;
  aspect-ratio: 1 / 1.05;
  border-radius: 28px;
  overflow: hidden;
  background: linear-gradient(180deg, #101a44 0%, #0a112f 60%, #060b1e 100%);
  border: 1px solid rgba(56, 189, 248, 0.2);
  position: relative;
}

/* ── Section 2: Cold Chain Advantage (3 Pillars) ── */
.svc-advantage-sec {
  padding: 90px 24px;
  background: #ffffff;
  position: relative;
  border-top: 1px solid #e2e8f0;
  border-bottom: 1px solid #e2e8f0;
}

.svc-sec-header {
  text-align: center;
  max-width: 780px;
  margin: 0 auto 56px auto;
}

.svc-advantage-title {
  font-family: var(--display, 'Satoshi', -apple-system, BlinkMacSystemFont, sans-serif);
  font-size: clamp(1.8rem, 3.2vw, 2.6rem);
  font-weight: 700;
  color: #888FA2;
  margin: 0 0 14px 0;
  letter-spacing: -0.02em;
}

.svc-advantage-sub {
  font-size: clamp(0.98rem, 1.15vw, 1.08rem);
  color: #475569;
  line-height: 1.65;
}

.svc-pillars-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 32px;
  max-width: 1200px;
  margin: 0 auto;
}

.svc-pillar-card {
  background: #ffffff;
  border: 1px solid rgba(7, 15, 48, 0.08);
  border-radius: 20px;
  padding: 36px 28px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  position: relative;
  overflow: hidden;
}

.svc-pillar-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 2px;
  background: linear-gradient(90deg, transparent, rgba(56, 189, 248, 0.6), transparent);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.svc-pillar-card:hover {
  transform: translateY(-6px);
  border-color: rgba(56, 189, 248, 0.38);
  background: #ffffff;
}

.svc-pillar-card:hover::before {
  opacity: 1;
}

.svc-pillar-icon-box {
  width: 58px;
  height: 58px;
  border-radius: 16px;
  background: rgba(56, 189, 248, 0.08);
  border: 1px solid rgba(56, 189, 248, 0.28);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #888FA2;
  margin-bottom: 24px;
  transition: transform 0.3s ease;
}

.svc-pillar-icon-box svg {
  width: 28px;
  height: 28px;
}

.svc-pillar-card:hover .svc-pillar-icon-box {
  transform: scale(1.08);
  background: rgba(56, 189, 248, 0.14);
}

.svc-pillar-title {
  font-family: var(--display, 'Satoshi', -apple-system, BlinkMacSystemFont, sans-serif);
  font-size: 1.28rem;
  font-weight: 700;
  color: #071952;
  margin: 0 0 12px 0;
}

.svc-pillar-desc {
  font-size: 0.94rem;
  line-height: 1.65;
  color: #475569;
  margin: 0;
}

/* ── Section 3: Connecting The Dots Constellation ── */
.svc-constellation-sec {
  padding: 100px 24px;
  background: radial-gradient(ellipse at 70% 50%, #121c4b 0%, #09102c 50%, #060c23 100%);
  position: relative;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  overflow: hidden;
}

.svc-constellation-grid {
  display: grid;
  grid-template-columns: 1.05fr 1fr;
  align-items: center;
  gap: 50px;
  max-width: 1260px;
  margin: 0 auto;
}

.svc-const-eyebrow {
  display: inline-block;
  color: #888FA2;
  font-size: 0.84rem;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  margin-bottom: 18px;
}

.svc-const-title {
  font-family: var(--display, 'Satoshi', -apple-system, BlinkMacSystemFont, sans-serif);
  font-size: clamp(2rem, 3.4vw, 3.1rem);
  font-weight: 800;
  line-height: 1.18;
  color: #ffffff;
  margin: 0 0 20px 0;
  letter-spacing: -0.02em;
}

.svc-const-title .accent {
  display: block;
  color: #888FA2;
  font-weight: 800;
}

.svc-const-desc {
  font-size: clamp(0.98rem, 1.15vw, 1.08rem);
  line-height: 1.72;
  color: rgba(226, 232, 240, 0.8);
  margin-bottom: 32px;
  max-width: 540px;
}

.svc-const-stats {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 18px;
  max-width: 480px;
  margin-bottom: 30px;
}

.svc-stat-chip {
  background: rgba(15, 25, 60, 0.6);
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 14px;
  padding: 14px 18px;
  backdrop-filter: blur(8px);
}

.svc-stat-val {
  font-family: var(--display, 'Satoshi', -apple-system, BlinkMacSystemFont, sans-serif);
  font-size: 1.5rem;
  font-weight: 800;
  color: #ffffff;
  display: block;
}

.svc-stat-lbl {
  font-size: 0.82rem;
  color: rgba(255, 255, 255, 0.85);
  text-transform: uppercase;
  letter-spacing: 0.06em;
  font-weight: 500;
}

.svc-const-card {
  position: relative;
  background: linear-gradient(180deg, #0e173e 0%, #09102c 60%, #050a1d 100%);
  border: 1px solid rgba(56, 189, 248, 0.25);
  border-radius: 28px;
  aspect-ratio: 1 / 1.12;
  overflow: hidden;
}

/* ── Section 4: All 6 Cold Chain Services Grid ── */
.svc-core-sec {
  padding: 100px 24px;
  background: #ffffff;
  position: relative;
  border-top: 1px solid #e2e8f0;
  border-bottom: 1px solid #e2e8f0;
}

.svc-core-sec .svc-hero-title {
  color: #071952;
}

.svc-core-sec .svc-hero-title .accent {
  color: #888FA2;
}

.svc-core-sec .svc-advantage-sub {
  color: #475569;
}

.svc-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 28px;
  max-width: 1260px;
  margin: 0 auto;
}

.svc-card {
  background: #ffffff;
  border: 1px solid rgba(7, 15, 48, 0.08);
  border-radius: 20px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  text-decoration: none;
  color: inherit;
  transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);
  position: relative;
  cursor: pointer;
}

.svc-card:hover {
  transform: translateY(-8px);
  border-color: rgba(56, 189, 248, 0.45);
}

.svc-card-img-wrap {
  position: relative;
  width: 100%;
  height: 210px;
  overflow: hidden;
}

.svc-card-img-wrap img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
}

.svc-card:hover .svc-card-img-wrap img {
  transform: scale(1.08);
}

.svc-card-num-badge {
  position: absolute;
  top: 14px;
  left: 14px;
  background: rgba(6, 12, 35, 0.85);
  border: 1px solid rgba(136, 143, 162, 0.35);
  color: #888FA2;
  font-family: var(--display, 'Satoshi', sans-serif);
  font-weight: 800;
  font-size: 0.88rem;
  padding: 4px 10px;
  border-radius: 8px;
  backdrop-filter: blur(8px);
}

.svc-card-arrow-badge {
  position: absolute;
  top: 14px;
  right: 14px;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: rgba(6, 12, 35, 0.85);
  border: 1px solid rgba(136, 143, 162, 0.35);
  color: #888FA2;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.3s ease, background 0.3s ease;
}

.svc-card:hover .svc-card-arrow-badge {
  transform: translate(2px, -2px);
  background: #888FA2;
  color: #060c23;
}

.svc-card-body {
  padding: 24px;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}

.svc-card-sub {
  font-size: 0.82rem;
  color: #888FA2;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: 6px;
}

.svc-card-title {
  font-family: var(--display, 'Satoshi', sans-serif);
  font-size: 1.35rem;
  font-weight: 700;
  color: #071952;
  margin: 0 0 12px 0;
  transition: color 0.2s ease;
}

.svc-card:hover .svc-card-title {
  color: #888FA2;
}

.svc-card-desc {
  font-size: 0.92rem;
  line-height: 1.62;
  color: #475569;
  margin: 0 0 20px 0;
  flex-grow: 1;
}

.svc-card-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 20px;
}

.svc-tag {
  background: rgba(7, 15, 48, 0.04);
  border: 1px solid rgba(7, 15, 48, 0.1);
  color: #334155;
  font-size: 0.78rem;
  font-weight: 500;
  padding: 3px 10px;
  border-radius: 999px;
}

.svc-card-footer-cta {
  border-top: 1px solid rgba(7, 15, 48, 0.07);
  padding-top: 14px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 0.86rem;
  font-weight: 600;
  color: #888FA2;
}

/* ── Section 5: Temperature Spectrum Matrix ── */
.svc-spectrum-sec {
  padding: 100px 24px;
  background: radial-gradient(ellipse at 50% 10%, #121f52 0%, #070d28 70%);
  position: relative;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
}

.svc-tab-bar {
  display: flex;
  justify-content: center;
  gap: 12px;
  flex-wrap: wrap;
  margin-bottom: 40px;
}

.svc-tab-btn {
  background: rgba(15, 25, 60, 0.7);
  border: 1px solid rgba(255, 255, 255, 0.12);
  color: #cbd5e1;
  padding: 12px 24px;
  border-radius: 999px;
  font-size: 0.94rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.25s ease;
  backdrop-filter: blur(8px);
}

.svc-tab-btn:hover {
  background: rgba(255, 255, 255, 0.08);
  border-color: rgba(56, 189, 248, 0.35);
  color: #ffffff;
}

.svc-tab-btn.active {
  background: #0f2358;
  border-color: #888FA2;
  color: #ffffff;
}

.svc-spectrum-box {
  max-width: 1080px;
  margin: 0 auto;
  background: rgba(10, 18, 44, 0.8);
  border: 1px solid rgba(56, 189, 248, 0.22);
  border-radius: 24px;
  padding: 40px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px;
  backdrop-filter: blur(14px);
}

.svc-spec-head-badge {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 4px 14px;
  border-radius: 999px;
  font-size: 0.82rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  margin-bottom: 14px;
}

.svc-spec-title {
  font-family: var(--display, 'Satoshi', sans-serif);
  font-size: 2rem;
  font-weight: 800;
  color: #ffffff;
  margin: 0 0 14px 0;
}

.svc-spec-desc {
  font-size: 0.98rem;
  line-height: 1.7;
  color: rgba(226, 232, 240, 0.82);
  margin-bottom: 24px;
}

.svc-spec-items-grid {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.svc-spec-item-row {
  display: flex;
  align-items: center;
  gap: 12px;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.06);
  padding: 10px 16px;
  border-radius: 12px;
  font-size: 0.92rem;
  color: #e2e8f0;
}

.svc-spec-item-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #888FA2;
}

.svc-spec-feats-grid {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 14px;
}

.svc-spec-feat-card {
  background: rgba(17, 28, 68, 0.6);
  border: 1px solid rgba(56, 189, 248, 0.16);
  border-radius: 14px;
  padding: 16px 20px;
  display: flex;
  align-items: center;
  gap: 16px;
}

.svc-spec-feat-icon {
  width: 36px;
  height: 36px;
  border-radius: 10px;
  background: rgba(56, 189, 248, 0.12);
  color: #38bdf8;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.1rem;
  flex-shrink: 0;
}

.svc-spec-feat-text {
  font-size: 0.94rem;
  font-weight: 600;
  color: #ffffff;
}

/* ── Section 6: FAQ Accordion ── */
.svc-faq-sec {
  padding: 90px 24px;
  background: #ffffff;
  position: relative;
  border-top: 1px solid #e2e8f0;
  border-bottom: 1px solid #e2e8f0;
}

.svc-faq-sec .svc-hero-title {
  color: #071952;
}

.svc-faq-sec .svc-hero-title .accent {
  color: #888FA2;
}

.svc-faq-sec .svc-advantage-sub {
  color: #475569;
}

.svc-faq-list {
  max-width: 860px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.svc-faq-item {
  background: #ffffff;
  border: 1px solid rgba(7, 15, 48, 0.08);
  border-radius: 16px;
  overflow: hidden;
  transition: all 0.25s ease;
}

.svc-faq-item.active {
  border-color: rgba(56, 189, 248, 0.45);
  background: #ffffff;
}

.svc-faq-q {
  padding: 22px 26px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  cursor: pointer;
  user-select: none;
}

.svc-faq-q-text {
  font-family: var(--display, 'Satoshi', sans-serif);
  font-size: 1.08rem;
  font-weight: 700;
  color: #071952;
}

.svc-faq-toggle {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: rgba(7, 15, 48, 0.05);
  border: 1px solid rgba(7, 15, 48, 0.1);
  color: #071952;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.1rem;
  font-weight: 600;
  transition: transform 0.25s ease;
  flex-shrink: 0;
}

.svc-faq-item.active .svc-faq-toggle {
  transform: rotate(45deg);
  background: #888FA2;
  color: #ffffff;
}

.svc-faq-a {
  padding: 0 26px 22px 26px;
  font-size: 0.95rem;
  line-height: 1.7;
  color: #475569;
}

/* ── Section 7: Bottom CTA Banner ── */
.svc-cta-sec {
  padding: 80px 24px;
  background: #060c23;
  position: relative;
}

.svc-cta-card {
  max-width: 1100px;
  margin: 0 auto;
  border-radius: 28px;
  background: radial-gradient(ellipse at 50% 20%, #15225c 0%, #0b1335 70%, #060b20 100%);
  border: 1px solid rgba(56, 189, 248, 0.25);
  padding: 60px 40px;
  text-align: center;
  position: relative;
  overflow: hidden;
}

.svc-cta-card::before {
  content: '';
  position: absolute;
  top: -50%;
  left: 50%;
  transform: translateX(-50%);
  width: 400px;
  height: 300px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(56, 189, 248, 0.2) 0%, transparent 70%);
  filter: blur(40px);
  pointer-events: none;
}

.svc-cta-title {
  font-family: var(--display, 'Satoshi', sans-serif);
  font-size: clamp(2rem, 3.5vw, 2.9rem);
  font-weight: 800;
  color: #ffffff;
  margin: 0 0 16px 0;
  letter-spacing: -0.02em;
}

.svc-cta-title .accent {
  display: block;
  color: #888FA2;
  font-weight: 800;
}

.svc-cta-desc {
  font-size: 1.05rem;
  color: rgba(226, 232, 240, 0.82);
  max-width: 620px;
  margin: 0 auto 36px auto;
  line-height: 1.68;
}

.svc-cta-btns {
  display: flex;
  justify-content: center;
  gap: 16px;
  flex-wrap: wrap;
}

/* ── Responsive Media Queries ── */
@media (max-width: 1024px) {
  .svc-hero-wrap {
    grid-template-columns: 1fr;
    text-align: center;
    gap: 40px;
  }
  .svc-hero-text {
    max-width: 100%;
    margin: 0 auto;
  }
  .svc-hero-desc {
    margin-left: auto;
    margin-right: auto;
  }
  .svc-hero-actions {
    justify-content: center;
  }
  .svc-hero-art-container {
    max-width: 440px;
    margin: 0 auto;
  }
  .svc-pillars-grid {
    grid-template-columns: 1fr;
    max-width: 580px;
  }
  .svc-constellation-grid {
    grid-template-columns: 1fr;
    gap: 40px;
    text-align: center;
  }
  .svc-const-desc {
    margin-left: auto;
    margin-right: auto;
  }
  .svc-const-stats {
    margin: 0 auto 30px auto;
  }
  .svc-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  .svc-spectrum-box {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 768px) {
  .svc-celestial-hero {
    padding-top: 100px;
    padding-bottom: 50px;
    min-height: auto;
  }
  .svc-grid {
    grid-template-columns: 1fr;
  }
  .svc-spectrum-box {
    padding: 24px;
  }
  .svc-cta-card {
    padding: 40px 20px;
  }
}
`

/* ── Celestial Hero Night-Sky Canvas ── */
function CelestialCanvas() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let animId
    let stars = []
    let meteors = []

    class Star {
      constructor(x, y, radius, alpha, speed) {
        this.x = x
        this.y = y
        this.radius = radius
        this.baseAlpha = alpha
        this.alpha = alpha
        this.speed = speed
        this.phase = Math.random() * Math.PI * 2
      }
      update() {
        this.phase += this.speed
        this.alpha = this.baseAlpha + Math.sin(this.phase) * (this.baseAlpha * 0.45)
      }
      draw() {
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(224, 237, 255, ${Math.max(0.1, this.alpha)})`
        ctx.fill()
      }
    }

    class Meteor {
      constructor() {
        this.reset()
      }
      reset() {
        this.x = Math.random() * canvas.width * 0.8
        this.y = Math.random() * canvas.height * 0.3
        this.len = 60 + Math.random() * 80
        this.speed = 4 + Math.random() * 5
        this.angle = Math.PI / 5 + (Math.random() - 0.5) * 0.1
        this.alpha = 1
        this.active = false
      }
      trigger() {
        this.reset()
        this.active = true
      }
      update() {
        if (!this.active) return
        this.x += Math.cos(this.angle) * this.speed
        this.y += Math.sin(this.angle) * this.speed
        this.alpha -= 0.012
        if (this.alpha <= 0) {
          this.active = false
        }
      }
      draw() {
        if (!this.active) return
        ctx.save()
        ctx.beginPath()
        ctx.moveTo(this.x, this.y)
        ctx.lineTo(
          this.x - Math.cos(this.angle) * this.len,
          this.y - Math.sin(this.angle) * this.len
        )
        const grad = ctx.createLinearGradient(
          this.x,
          this.y,
          this.x - Math.cos(this.angle) * this.len,
          this.y - Math.sin(this.angle) * this.len
        )
        grad.addColorStop(0, `rgba(255, 255, 255, ${this.alpha})`)
        grad.addColorStop(0.3, `rgba(56, 189, 248, ${this.alpha * 0.7})`)
        grad.addColorStop(1, 'rgba(56, 189, 248, 0)')
        ctx.strokeStyle = grad
        ctx.lineWidth = 1.6
        ctx.stroke()
        ctx.restore()
      }
    }

    const resize = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
      stars = []
      const count = Math.floor((canvas.width * canvas.height) / 4500)
      for (let i = 0; i < count; i++) {
        const x = Math.random() * canvas.width
        const y = Math.random() * canvas.height
        const r = Math.random() * 1.5 + 0.4
        const a = Math.random() * 0.6 + 0.3
        const sp = 0.015 + Math.random() * 0.03
        stars.push(new Star(x, y, r, a, sp))
      }
      meteors = [new Meteor(), new Meteor()]
    }

    let meteorTimer = 0
    const animate = () => {
      animId = requestAnimationFrame(animate)
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      stars.forEach(s => {
        s.update()
        s.draw()
      })

      meteorTimer++
      if (meteorTimer % 180 === 0) {
        const inactive = meteors.find(m => !m.active)
        if (inactive) inactive.trigger()
      }

      meteors.forEach(m => {
        m.update()
        m.draw()
      })
    }

    window.addEventListener('resize', resize)
    resize()
    animate()

    return () => {
      window.removeEventListener('resize', resize)
      cancelAnimationFrame(animId)
    }
  }, [])

  return <canvas ref={canvasRef} className="svc-hero-stars-canvas" />
}

/* ── Stargazer Silhouette Artwork ── */
function StargazerArtwork() {
  return (
    <div className="svc-hero-art-container">
      <div className="svc-hero-svg-card">
        <svg
          viewBox="0 0 500 525"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ width: '100%', height: '100%', display: 'block' }}
        >
          <defs>
            <linearGradient id="skyGrad" x1="250" y1="0" x2="250" y2="525" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#25164f" />
              <stop offset="35%" stopColor="#141a4a" />
              <stop offset="70%" stopColor="#0a1236" />
              <stop offset="100%" stopColor="#04091e" />
            </linearGradient>

            <linearGradient id="hillBackGrad" x1="250" y1="280" x2="250" y2="460" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#162963" />
              <stop offset="100%" stopColor="#0c173c" />
            </linearGradient>

            <linearGradient id="hillMidGrad" x1="250" y1="330" x2="250" y2="500" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#0f1f4e" />
              <stop offset="100%" stopColor="#070e28" />
            </linearGradient>

            <linearGradient id="hillFrontGrad" x1="250" y1="360" x2="250" y2="525" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#091436" />
              <stop offset="100%" stopColor="#030614" />
            </linearGradient>

            <linearGradient id="beamGrad" x1="380" y1="120" x2="260" y2="50" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.85" />
              <stop offset="100%" stopColor="#38bdf8" stopOpacity="0" />
            </linearGradient>

            <linearGradient id="shirtGrad" x1="410" y1="140" x2="410" y2="240" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#4f96f6" />
              <stop offset="100%" stopColor="#1e4ca8" />
            </linearGradient>
          </defs>

          <rect width="500" height="525" fill="url(#skyGrad)" />

          <path
            d="M345 58 A15 15 0 0 0 358 75 A13 13 0 1 1 345 58 Z"
            fill="#fff3c4"
          />

          <line x1="255" y1="48" x2="215" y2="60" stroke="rgba(255,255,255,0.75)" strokeWidth="1.5" strokeLinecap="round" />
          <circle cx="215" cy="60" r="1.5" fill="#ffffff" />

          <circle cx="95" cy="110" r="1.5" fill="#ffffff" opacity="0.8" />
          <circle cx="140" cy="85" r="2" fill="#ffffff" opacity="0.9" />
          <circle cx="180" cy="130" r="1.5" fill="#a5b4fc" opacity="0.85" />
          <circle cx="220" cy="95" r="2.2" fill="#ffffff" />
          <circle cx="270" cy="140" r="1.8" fill="#38bdf8" opacity="0.9" />
          <circle cx="310" cy="100" r="1.6" fill="#ffffff" opacity="0.75" />
          <circle cx="390" cy="85" r="2" fill="#fef08a" opacity="0.85" />
          <circle cx="120" cy="160" r="1.4" fill="#ffffff" opacity="0.6" />
          <circle cx="60" cy="180" r="1.8" fill="#a5b4fc" opacity="0.7" />
          <circle cx="160" cy="210" r="1.5" fill="#ffffff" opacity="0.8" />

          <path d="M45 235 A25 25 0 0 1 95 235 L95 260 L45 260 Z" fill="#0c173d" />
          <rect x="65" y="215" width="8" height="20" fill="#08102b" rx="2" />
          <rect x="40" y="255" width="60" height="25" fill="#08102b" rx="3" />

          <path
            d="M-20 340 Q150 250 300 310 T520 330 L520 530 L-20 530 Z"
            fill="url(#hillBackGrad)"
          />

          <line x1="165" y1="285" x2="168" y2="330" stroke="#070e28" strokeWidth="2.5" />
          <path d="M165 285 Q150 270 142 278 M165 285 Q155 260 162 260 M165 285 Q178 262 185 270 M165 285 Q182 280 188 288 M165 285 Q150 292 144 286" stroke="#070e28" strokeWidth="2" fill="none" />
          <line x1="185" y1="298" x2="187" y2="335" stroke="#070e28" strokeWidth="2.2" />
          <path d="M185 298 Q172 285 166 292 M185 298 Q178 278 184 278 M185 298 Q196 280 202 287 M185 298 Q200 295 204 302" stroke="#070e28" strokeWidth="1.8" fill="none" />

          <path
            d="M-20 380 Q120 300 280 340 T520 360 L520 530 L-20 530 Z"
            fill="url(#hillMidGrad)"
          />

          <g transform="translate(325, 115)">
            <line x1="25" y1="3" x2="-80" y2="-45" stroke="url(#beamGrad)" strokeWidth="2.5" strokeDasharray="3 3" />
            <rect x="0" y="0" width="55" height="12" rx="3" fill="#e05739" transform="rotate(-26)" />
            <rect x="36" y="-18" width="16" height="15" rx="2" fill="#ff7a59" transform="rotate(-26)" />
            <circle cx="48" cy="-20" r="3" fill="#38bdf8" />

            <circle cx="68" cy="22" r="16" fill="#0a1538" />
            <path d="M54 18 C58 8 78 8 84 18 Z" fill="#243b78" />
            <ellipse cx="69" cy="20" rx="19" ry="5" fill="#1b2d5d" />

            <path
              d="M62 38 Q42 35 28 14 Q32 10 38 12 Q50 28 68 32 Z"
              fill="#0d1b44"
            />
            <path d="M22 10 Q28 6 30 14 Q24 16 22 10 Z" fill="#0d1b44" />

            <path
              d="M52 42 Q82 45 92 88 L90 170 Q62 170 48 165 L44 88 Q42 55 52 42 Z"
              fill="url(#shirtGrad)"
            />

            <path d="M49 110 L91 114" stroke="#7bb2ff" strokeWidth="4" opacity="0.8" />
            <path d="M48 124 L91 128" stroke="#7bb2ff" strokeWidth="4" opacity="0.8" />

            <path d="M48 165 L46 250 L66 250 L68 170 Z" fill="#060e28" />
            <path d="M72 170 L74 250 L94 250 L90 170 Z" fill="#081436" />
          </g>

          <path
            d="M-20 430 Q140 370 320 400 T520 390 L520 530 L-20 530 Z"
            fill="url(#hillFrontGrad)"
          />

          <path d="M5 410 Q12 360 8 330 Q18 365 24 410" fill="#030614" />
          <path d="M20 420 Q32 355 38 320 Q44 365 48 420" fill="#030614" />
          <path d="M45 425 Q58 375 70 345 Q68 385 64 425" fill="#030614" />
          <path d="M75 435 Q90 385 105 355 Q98 395 90 435" fill="#030614" />

          <path d="M420 410 Q435 340 445 305 Q442 355 435 410" fill="#030614" />
          <path d="M440 415 Q462 330 475 295 Q468 350 458 415" fill="#030614" />
          <path d="M465 420 Q485 345 500 310 Q492 360 482 420" fill="#030614" />
          <circle cx="445" cy="305" r="3" fill="#2d4f96" />
          <circle cx="475" cy="295" r="3" fill="#2d4f96" />
          <circle cx="500" cy="310" r="3" fill="#2d4f96" />
        </svg>
      </div>
    </div>
  )
}

/* ── Interactive Connecting The Dots Constellation Visual ── */
function ConstellationNetworkArtwork() {
  const [selectedNode, setSelectedNode] = useState(CONSTELLATION_NODES[3])

  return (
    <div className="svc-const-card">
      <svg
        viewBox="0 0 500 560"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ width: '100%', height: '100%', display: 'block' }}
      >
        <defs>
          <radialGradient id="starGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#fef08a" stopOpacity="0.95" />
            <stop offset="25%" stopColor="#38bdf8" stopOpacity="0.8" />
            <stop offset="60%" stopColor="#6366f1" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#060c23" stopOpacity="0" />
          </radialGradient>

          <linearGradient id="reacherGrad" x1="340" y1="360" x2="340" y2="560" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#3b82f6" />
            <stop offset="45%" stopColor="#1d4ed8" />
            <stop offset="100%" stopColor="#071238" />
          </linearGradient>

          <linearGradient id="lineGrad" x1="0" y1="0" x2="500" y2="0" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="rgba(56,189,248,0.3)" />
            <stop offset="50%" stopColor="rgba(254,240,138,0.9)" />
            <stop offset="100%" stopColor="rgba(56,189,248,0.4)" />
          </linearGradient>
        </defs>

        <rect width="500" height="560" fill="#070f30" />

        <line x1="230" y1="410" x2="190" y2="425" stroke="rgba(255,255,255,0.7)" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="190" cy="425" r="1.5" fill="#ffffff" />

        <circle cx="80" cy="80" r="1.2" fill="#fff" opacity="0.6" />
        <circle cx="150" cy="40" r="1.5" fill="#93c5fd" opacity="0.8" />
        <circle cx="210" cy="90" r="1.8" fill="#fff" opacity="0.7" />
        <circle cx="290" cy="60" r="1.3" fill="#fff" opacity="0.6" />
        <circle cx="340" cy="110" r="2" fill="#fef08a" opacity="0.8" />
        <circle cx="420" cy="50" r="1.6" fill="#38bdf8" opacity="0.75" />
        <circle cx="470" cy="120" r="1.4" fill="#fff" opacity="0.6" />
        <circle cx="120" cy="180" r="1.5" fill="#fff" opacity="0.7" />
        <circle cx="260" cy="220" r="1.7" fill="#93c5fd" opacity="0.8" />

        <polyline
          points="30,380 115,290 220,340 340,200 420,260 480,150"
          stroke="url(#lineGrad)"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        <line x1="220" y1="340" x2="340" y2="200" stroke="#fef08a" strokeWidth="2.5" opacity="0.85" />
        <line x1="340" y1="200" x2="420" y2="260" stroke="#fef08a" strokeWidth="2.5" opacity="0.85" />

        <circle cx="340" cy="200" r="48" fill="url(#starGlow)" />
        <circle cx="340" cy="200" r="10" fill="#fef08a" />
        <circle cx="340" cy="200" r="4" fill="#ffffff" />

        {[
          { cx: 30, cy: 380, node: CONSTELLATION_NODES[0] },
          { cx: 115, cy: 290, node: CONSTELLATION_NODES[1] },
          { cx: 220, cy: 340, node: CONSTELLATION_NODES[2] },
          { cx: 340, cy: 200, node: CONSTELLATION_NODES[3] },
          { cx: 420, cy: 260, node: CONSTELLATION_NODES[4] },
          { cx: 480, cy: 150, node: CONSTELLATION_NODES[5] },
        ].map(({ cx, cy, node }) => {
          const isSelected = selectedNode.id === node.id
          return (
            <g
              key={node.id}
              style={{ cursor: 'pointer' }}
              onClick={() => setSelectedNode(node)}
            >
              <circle
                cx={cx}
                cy={cy}
                r={isSelected ? 14 : 9}
                fill={isSelected ? 'rgba(56,189,248,0.25)' : 'rgba(255,255,255,0.1)'}
                stroke={isSelected ? '#38bdf8' : 'rgba(255,255,255,0.6)'}
                strokeWidth={isSelected ? 2.5 : 1.5}
              />
              <circle cx={cx} cy={cy} r={isSelected ? 5 : 3} fill="#ffffff" />
            </g>
          )
        })}

        <g transform="translate(290, 195)">
          <path
            d="M50 8 Q45 2 48 5 Q52 8 50 15 L32 85 Q28 110 24 140 L38 140 Q46 105 58 60 Q62 25 54 8 Z"
            fill="#08143c"
          />
          <path d="M12 145 Q-8 160 -15 220 L15 220 Q16 175 24 145 Z" fill="#142c6e" />
          <circle cx="56" cy="100" r="22" fill="#070f2c" />
          <path d="M48 105 L62 105 L62 135 L46 135 Z" fill="#070f2c" />
          <path
            d="M10 145 Q55 130 92 155 L85 365 Q45 370 5 365 Z"
            fill="url(#reacherGrad)"
          />
          <path d="M55 142 Q78 152 85 185 L72 230 Q60 170 52 148 Z" fill="#2563eb" opacity="0.75" />
        </g>

        <path
          d="M-20 480 Q150 430 300 460 T520 450 L520 560 L-20 560 Z"
          fill="#050a20"
        />

        <line x1="195" y1="420" x2="198" y2="465" stroke="#040716" strokeWidth="2.2" />
        <path d="M195 420 Q180 405 174 412 M195 420 Q185 395 192 395 M195 420 Q208 398 214 405 M195 420 Q212 415 218 422" stroke="#040716" strokeWidth="2" fill="none" />

        <path d="M420 510 Q435 440 445 405 Q442 455 435 510" fill="#02040c" />
        <path d="M440 515 Q462 430 475 395 Q468 450 458 515" fill="#02040c" />
        <path d="M465 520 Q485 445 500 410 Q492 460 482 520" fill="#02040c" />
      </svg>

      <div
        style={{
          position: 'absolute',
          bottom: '18px',
          left: '18px',
          right: '18px',
          background: 'rgba(6, 12, 35, 0.88)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          borderRadius: '16px',
          padding: '14px 18px',
          backdropFilter: 'blur(12px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '12px',
        }}
      >
        <div>
          <div style={{ fontSize: '0.72rem', color: '#ffffff', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 700 }}>
            Active Constellation Node #{selectedNode.id}
          </div>
          <div style={{ fontSize: '0.98rem', fontWeight: 700, color: '#ffffff' }}>
            {selectedNode.name}
          </div>
          <div style={{ fontSize: '0.78rem', color: 'rgba(255, 255, 255, 0.85)' }}>
            {selectedNode.role}
          </div>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div style={{ fontSize: '0.72rem', color: 'rgba(255, 255, 255, 0.85)', textTransform: 'uppercase' }}>
            Validated Temp
          </div>
          <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#ffffff', fontFamily: 'var(--display, sans-serif)' }}>
            {selectedNode.temp}
          </div>
        </div>
      </div>
    </div>
  )
}

/* ── Main Services Page Component ── */
export default function Services() {
  const [activeTab, setActiveTab] = useState('frozen')
  const [openFaq, setOpenFaq] = useState(null)

  const activeSpectrum = TEMP_CATEGORIES.find(c => c.id === activeTab) || TEMP_CATEGORIES[0]

  const handleContactClick = (e) => {
    e.preventDefault()
    smoothScrollToEl('contact')
  }

  const handleServicesScroll = (e) => {
    e.preventDefault()
    smoothScrollToEl('services-grid')
  }

  return (
    <div className="svc-page">
      <Helmet>
        <title>Cold Logistics Services — Versailles Cold Chain</title>
        <meta
          name="description"
          content="End-to-end temperature-controlled cold logistics: multi-temp cold storage, refrigerated freight, WMS inventory management, IoT telemetry, and GDP-compliant cargo handling."
        />
      </Helmet>

      {/* Embedded Scoped CSS */}
      <style>{SERVICES_PAGE_STYLES}</style>

      {/* ── 1. CELESTIAL HERO SECTION ── */}
      <section className="svc-celestial-hero">
        <CelestialCanvas />
        <div className="svc-hero-glow" />
        <div className="svc-hero-moon" />

        <div className="svc-hero-wrap">
          {/* Left Text */}
          <div className="svc-hero-text">
            <div className="svc-badge">
              <span>✦</span> VERSAILLES COLD CHAIN SERVICES
            </div>

            <h1 className="svc-hero-title">
              Explore the precision you need.
              <span className="accent">Put your cold chain to work.</span>
            </h1>

            <p className="svc-hero-desc">
              From multi-temperature cold storage to real-time IoT monitored freight — we deliver uncompromising thermal stability, GDP assurance, and full cargo visibility across India.
            </p>

            <div className="svc-hero-actions">
              <a href="#contact" onClick={handleContactClick} className="svc-btn-primary">
                Get in Touch
              </a>
              <a href="#services-grid" onClick={handleServicesScroll} className="svc-btn-secondary">
                Explore Solutions ↓
              </a>
            </div>
          </div>

          {/* Right Hero Artwork */}
          <StargazerArtwork />
        </div>
      </section>

      {/* ── 2. COLD CHAIN ADVANTAGE (3 PILLARS) ── */}
      <section className="svc-advantage-sec">
        <div className="svc-sec-header">
          <h2 className="svc-advantage-title">Cold Chain Advantage</h2>
          <p className="svc-advantage-sub">
            Engineered with zero-excursion architecture, 30-second telemetry intelligence, and strict regulatory compliance.
          </p>
        </div>

        <div className="svc-pillars-grid">
          {ADVANTAGE_PILLARS.map((p, idx) => (
            <div key={idx} className="svc-pillar-card">
              <div className="svc-pillar-icon-box">
                {p.icon}
              </div>
              <h3 className="svc-pillar-title">{p.title}</h3>
              <p className="svc-pillar-desc">{p.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── 3. CONNECTING THE DOTS ── */}
      <section className="svc-constellation-sec">
        <div className="svc-constellation-grid">
          <div>
            <div className="svc-const-eyebrow">Analysis of Your Cold Chain</div>
            <h2 className="svc-const-title">
              Helping you connect the dots.
              <span className="accent">So you can see what life could look like into the future.</span>
            </h2>

            <p className="svc-const-desc">
              We bridge the gap between primary harvest, blast freezing, multi-temperature storage, and customer delivery. With live sensor feeds and predictive analytics, your cold logistics become fully transparent, audit-ready, and resilient.
            </p>

            <div className="svc-const-stats">
              <div className="svc-stat-chip">
                <span className="svc-stat-val">99.98%</span>
                <span className="svc-stat-lbl">Temp Hold Integrity</span>
              </div>
              <div className="svc-stat-chip">
                <span className="svc-stat-val">30s</span>
                <span className="svc-stat-lbl">Live Telemetry Cycle</span>
              </div>
              <div className="svc-stat-chip">
                <span className="svc-stat-val">7,000+</span>
                <span className="svc-stat-lbl">Pallet Positions</span>
              </div>
              <div className="svc-stat-chip">
                <span className="svc-stat-val">−25°C</span>
                <span className="svc-stat-lbl">Deep Chill Storage</span>
              </div>
            </div>

            <a href="#contact" onClick={handleContactClick} className="svc-btn-primary">
              Connect With an Expert
            </a>
          </div>

          <ConstellationNetworkArtwork />
        </div>
      </section>

      {/* ── 4. ALL 6 CORE SERVICES GRID (With direct links to separate service detail pages) ── */}
      <section className="svc-core-sec" id="services-grid">
        <div className="svc-sec-header">
          <h2 className="svc-hero-title" style={{ fontSize: 'clamp(2rem, 3.2vw, 2.8rem)', marginBottom: 12 }}>
            Cold logistics,
            <span className="accent">end to end.</span>
          </h2>
          <p className="svc-advantage-sub" style={{ maxWidth: 640, margin: '0 auto' }}>
            Click on any service below to explore detailed specifications, operational capabilities, and tailored workflows.
          </p>
        </div>

        <div className="svc-grid">
          {SERVICES_DATA.map((s) => (
            <Link key={s.slug} to={`/services/${s.slug}`} className="svc-card">
              <div className="svc-card-img-wrap">
                <img
                  src={s.img}
                  alt={s.alt}
                  loading="lazy"
                  decoding="async"
                  onError={(e) => {
                    if (s.n === '03') {
                      e.currentTarget.src = 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=900&q=80&auto=format&fit=crop'
                    } else if (s.n === '06') {
                      e.currentTarget.src = 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=900&q=80&auto=format&fit=crop'
                    }
                  }}
                />
                <span className="svc-card-num-badge">{s.n}</span>
                <div className="svc-card-arrow-badge">↗</div>
              </div>

              <div className="svc-card-body">
                <div className="svc-card-sub">{s.subtitle}</div>
                <h3 className="svc-card-title">{s.title}</h3>
                <p className="svc-card-desc">{s.heroDesc}</p>

                <div className="svc-card-tags">
                  {s.tags.map((t) => (
                    <span key={t} className="svc-tag">{t}</span>
                  ))}
                </div>

                <div className="svc-card-footer-cta">
                  <span>Explore {s.shortTitle}</span>
                  <span>View Details →</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ── 5. TEMPERATURE SPECTRUM MATRIX ── */}
      <section className="svc-spectrum-sec">
        <div className="svc-sec-header">
          <div className="svc-badge" style={{ marginBottom: 12 }}>
            Temperature Precision
          </div>
          <h2 className="svc-hero-title" style={{ fontSize: 'clamp(2rem, 3.2vw, 2.8rem)', marginBottom: 12 }}>
            Every category.
            <span className="accent">Every temperature.</span>
          </h2>
          <p className="svc-advantage-sub">
            Custom engineered thermal zones maintained with strict setpoint accuracy and zero thermal drift.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="svc-tab-bar">
          {TEMP_CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              type="button"
              className={`svc-tab-btn ${activeTab === cat.id ? 'active' : ''}`}
              onClick={() => setActiveTab(cat.id)}
            >
              {cat.tab}
            </button>
          ))}
        </div>

        {/* Tab Detail Card */}
        <div className="svc-spectrum-box">
          <div>
            <div
              className="svc-spec-head-badge"
              style={{ background: activeSpectrum.color + '18', color: activeSpectrum.color, border: `1px solid ${activeSpectrum.color}44` }}
            >
              <span>{activeSpectrum.icon}</span>
              <span>{activeSpectrum.badge}</span>
              <span>•</span>
              <span>{activeSpectrum.temp}</span>
            </div>

            <h3 className="svc-spec-title">{activeSpectrum.badge}</h3>
            <p className="svc-spec-desc">{activeSpectrum.desc}</p>

            <div className="svc-spec-items-grid">
              {activeSpectrum.items.map((it, idx) => (
                <div key={idx} className="svc-spec-item-row">
                  <span className="svc-spec-item-dot" style={{ background: activeSpectrum.color }} />
                  <span>{it}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="svc-spec-feats-grid">
            <h4 style={{ margin: '0 0 10px 0', fontSize: '1.05rem', color: '#cbd5e1', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
              Facility Standards & Guarantees
            </h4>
            {activeSpectrum.specs.map((feat, idx) => (
              <div key={idx} className="svc-spec-feat-card">
                <div className="svc-spec-feat-icon">✓</div>
                <div className="svc-spec-feat-text">{feat}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 6. FREQUENTLY ASKED QUESTIONS ── */}
      <section className="svc-faq-sec">
        <div className="svc-sec-header">
          <div className="svc-badge" style={{ marginBottom: 12 }}>FAQ</div>
          <h2 className="svc-hero-title" style={{ fontSize: 'clamp(2rem, 3.2vw, 2.8rem)', marginBottom: 12 }}>
            Questions our
            <span className="accent">customers actually ask.</span>
          </h2>
          <p className="svc-advantage-sub">
            Answers to common questions regarding temperatures, monitoring intervals, GDP protocols, and logistics agreements.
          </p>
        </div>

        <div className="svc-faq-list">
          {FAQS.map((f, i) => {
            const isOpen = openFaq === i
            return (
              <div key={i} className={`svc-faq-item ${isOpen ? 'active' : ''}`}>
                <div
                  className="svc-faq-q"
                  onClick={() => setOpenFaq(isOpen ? null : i)}
                >
                  <span className="svc-faq-q-text">{f.q}</span>
                  <span className="svc-faq-toggle">+</span>
                </div>
                {isOpen && (
                  <div className="svc-faq-a">
                    {f.a}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </section>

      {/* ── 7. CLOSING CALL TO ACTION ── */}
      <section className="svc-cta-sec">
        <div className="svc-cta-card">
          <h2 className="svc-cta-title">
            Ready to optimize your cold chain?
            <span className="accent">Let's talk logistics.</span>
          </h2>
          <p className="svc-cta-desc">
            Tell us about your cargo specifications, temperature thresholds, and distribution schedule. Our team will tailor a high-performance cold logistics proposal within 24 hours.
          </p>
          <div className="svc-cta-btns">
            <a href="#contact" onClick={handleContactClick} className="svc-btn-primary">
              Request a Custom Proposal
            </a>
            <Link to="/facilities" className="svc-btn-secondary">
              View Our Facilities →
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
