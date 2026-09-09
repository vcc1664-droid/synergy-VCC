import { useState } from 'react'
import { Link } from 'react-router-dom'

const HOME_SERVICES = [
  {
    num: '01',
    title: 'Storage & Warehousing',
    sub: 'Multi-temperature cold storage',
    desc: 'Purpose-built chambers holding precise temperature zones for every cargo type — from frozen to chilled.',
    img: '/img-cold-warehousing.webp',
    alt: 'Multi-temperature cold storage and warehousing',
  },
  {
    num: '02',
    title: 'Transportation & Distribution',
    sub: 'Refrigerated freight & last-mile',
    desc: 'Temperature-controlled fleet moving your cargo from dock to destination, without breaking the cold chain.',
    img: '/img-refrigerated-freight.webp',
    alt: 'Refrigerated transportation and freight distribution',
  },
  {
    num: '03',
    title: 'Inventory Management',
    sub: 'WMS-powered control',
    desc: 'Real-time stock visibility and control, powered by our cloud-based Warehouse Management System.',
    img: '/03.webp',
    alt: 'WMS inventory management and real-time dashboard',
  },
  {
    num: '04',
    title: 'Value-Added Services',
    sub: 'Beyond storage',
    desc: 'Labelling, repackaging and cargo handling — tailored support that goes beyond just storage.',
    img: '/img-regulated-cargo.webp',
    alt: 'Value-added cold chain services and cargo handling',
  },
  {
    num: '05',
    title: 'Supply Chain Solutions',
    sub: 'End-to-end cold chain',
    desc: 'A single partner managing your entire cold chain, from sourcing to shelf.',
    img: '/img-supply-chain.webp',
    alt: 'End-to-end cold supply chain solutions',
  },
  {
    num: '06',
    title: 'Technology & Visibility',
    sub: 'IoT-powered intelligence',
    desc: 'Live dashboards and IoT sensors giving you full visibility into every pallet, every step of the way.',
    img: '/42050.webp',
    alt: 'IoT technology and live cold chain monitoring',
  },
]

function ServiceGridCard({ service }) {
  const [hovered, setHovered] = useState(false)

  return (
    <div
      className={`home-svc-card${hovered ? ' is-hovered' : ''}`}
      data-anim="up"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="home-svc-badge">
        <span>{service.num}</span>
      </div>

      <img
        src={service.img}
        alt={service.alt}
        className="home-svc-img"
        loading="lazy"
        decoding="async"
        onError={(e) => {
          // Fallback if local image not found
          if (service.num === '03') {
            e.currentTarget.src = 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=900&q=80&auto=format&fit=crop'
          } else if (service.num === '06') {
            e.currentTarget.src = 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=900&q=80&auto=format&fit=crop'
          }
        }}
      />

      <div className="home-svc-overlay">
        <h3 className="home-svc-title">{service.title}</h3>
        <p className="home-svc-sub">{service.sub}</p>
        <p className="home-svc-desc">{service.desc}</p>
      </div>
    </div>
  )
}

export default function ServicesSection() {
  return (
    <section className="sec dark-sec home-svc-section" id="services">
      <div className="wrap">
        <div className="home-svc-header">
          <h2 className="sec-title" data-anim="up">
            <span className="hline">Our Services</span>
          </h2>
          <p className="sec-sub home-svc-lede" data-anim="up">
            From cold storage to last-mile delivery, our cold chain logistics services cover every step your cargo takes — end to end, temperature never compromised.
          </p>
        </div>

        <div className="home-svc-grid" data-anim-group>
          {HOME_SERVICES.map((service) => (
            <ServiceGridCard key={service.num} service={service} />
          ))}
        </div>
      </div>
    </section>
  )
}
