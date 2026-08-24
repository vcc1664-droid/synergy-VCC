import { useState } from 'react'
import { Link } from 'react-router-dom'

const NODES = [
  { id: 'wms', label: 'WMS', badge: 'LIVE', badgeClass: 'live', title: 'Cloud WMS', body: 'Real-time warehouse management with RFID scan, auto-slotting and full inventory visibility.', progress: 92, date: 'Live · 24/7', related: ['iot', 'rfid'] },
  { id: 'iot', label: 'IoT', badge: 'LIVE', badgeClass: 'live', title: 'IoT Sensors', body: '1,800+ probes logging temperature, humidity & door events every 30 seconds.', progress: 100, date: 'Live · 24/7', related: ['wms', 'ai'] },
  { id: 'rfid', label: 'RFID', badge: 'LIVE', badgeClass: 'live', title: 'UHF RFID', body: 'Pallet-level RFID tagging across every dock — inbound, outbound, and yard.', progress: 88, date: 'Live · 24/7', related: ['wms', 'track'] },
  { id: 'ai', label: 'AI', badge: 'IN PROGRESS', badgeClass: 'progress', title: 'AI Route Optimisation', body: 'Predictive routing & dynamic re-slotting engine. Currently in controlled deployment.', progress: 60, date: 'Q3 2025', related: ['iot', 'track'] },
  { id: 'track', label: 'TRACK', badge: 'LIVE', badgeClass: 'live', title: 'Live Track & Trace', body: 'Customer-facing portal: live GPS position, temperature curve, and ETA — no login needed.', progress: 95, date: 'Live · 24/7', related: ['rfid', 'ai'] },
  { id: 'gdp', label: 'GDP', badge: 'CERTIFIED', badgeClass: 'live', title: 'GDP Compliance', body: 'SGS-certified Good Distribution Practice. Regulator-ready audit PDFs with every shipment.', progress: 100, date: 'Certified', related: ['wms', 'rfid'] },
  { id: 'api', label: 'API', badge: 'PENDING', badgeClass: 'pending', title: 'Open API Layer', body: 'REST / webhook integration for ERP, TMS and customer systems. Currently in beta.', progress: 35, date: 'Q4 2025', related: ['wms', 'track'] },
  { id: 'cold', label: 'COLD', badge: 'LIVE', badgeClass: 'live', title: 'Cold Rooms', body: 'Six zones: +4°C, −18°C, −24°C and deep-freeze at −40°C. 50,000 pallet positions total.', progress: 100, date: 'Live · 24/7', related: ['iot', 'wms'] },
]

const N = NODES.length
const ANGLE_STEP = (2 * Math.PI) / N
const R = 210  // ring radius in px (set to match CSS .orbital .ring width/2)

export default function EdgeSection() {
  const [active, setActive] = useState(null)

  const getPos = (i) => {
    const angle = -Math.PI / 2 + i * ANGLE_STEP
    return {
      left: `calc(50% + ${Math.cos(angle) * R}px - 20px)`,
      top: `calc(50% + ${Math.sin(angle) * R}px - 20px)`,
    }
  }

  const activeNode = NODES.find((n) => n.id === active)

  return (
    <section className="sec edge-section" id="edge-home" style={{ padding: '100px 0 120px' }}>
      <div className="wrap">
        <div className="edge-head">
          <div className="sec-eyebrow">VCC Edge · Technology Stack</div>
          <h2 className="sec-title">
            <span className="hline">The intelligence</span>
            <span className="hline"><span className="accent">behind the cold.</span></span>
          </h2>
          <p className="sec-sub">
            Every sensor, every scan, every route — unified in a single platform built for cold-chain compliance.
          </p>
        </div>

        <div className="orbital">
          <div className="ring"></div>
          <div className="ring r-mid"></div>

          <div className="o-hub">
            <div className="o-hub-core"></div>
          </div>

          <div className="o-nodes">
            {NODES.map((node, i) => (
              <div
                key={node.id}
                className={`o-node${active === node.id ? ' active' : ''}${activeNode?.related?.includes(node.id) ? ' related' : ''}`}
                style={getPos(i)}
                onClick={() => setActive(active === node.id ? null : node.id)}
              >
                <div className="o-glow" />
                <div className="o-orb">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
                    <circle cx="12" cy="12" r="4" /><circle cx="12" cy="12" r="9" strokeOpacity=".3" />
                  </svg>
                </div>
                <div className="o-lbl">{node.label}</div>
              </div>
            ))}
          </div>

          {activeNode && (
            <div className="o-card show">
              <div className="oc-head">
                <span className={`oc-badge ${activeNode.badgeClass}`}>{activeNode.badge}</span>
                <span className="oc-date">{activeNode.date}</span>
              </div>
              <p className="oc-title">{activeNode.title}</p>
              <p className="oc-body">{activeNode.body}</p>
              <div className="oc-stat">
                <span className="zap">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>
                  Uptime
                </span>
                <span>{activeNode.progress}%</span>
              </div>
              <div className="oc-bar"><i style={{ width: activeNode.progress + '%' }} /></div>
              {activeNode.related?.length > 0 && (
                <div className="oc-conn">
                  <h6>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>
                    Connected systems
                  </h6>
                  <div className="oc-conn-chips">
                    {activeNode.related.map((r) => {
                      const rel = NODES.find((n) => n.id === r)
                      return rel ? (
                        <button key={r} className="oc-chip" onClick={() => setActive(r)}>
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="10" height="10"><circle cx="12" cy="12" r="4"/></svg>
                          {rel.label}
                        </button>
                      ) : null
                    })}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        <div style={{ textAlign: 'center', marginTop: 48 }}>
          <Link to="/edge" className="btn btn-p">
            Explore VCC Edge
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="15" height="15">
              <path d="M5 12h14M13 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  )
}
