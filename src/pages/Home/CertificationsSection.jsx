export default function CertificationsSection() {
  return (
    <section className="sec dark-sec" id="certs" style={{ padding: '90px 0 120px', position: 'relative' }}>
      <div className="wrap">
        <div style={{ textAlign: 'center', maxWidth: 760, margin: '0 auto' }}>
          <h2 className="sec-title" data-anim="up" style={{ margin: '18px auto 0', whiteSpace: 'nowrap', fontSize: 'clamp(28px,4.5vw,64px)' }}>
            Certified, audited, accredited.<span style={{ fontSize: '0.55em', verticalAlign: 'super', letterSpacing: 0 }}>*</span>
          </h2>
          <p className="sec-sub" style={{ margin: '24px auto 0', maxWidth: 620 }}>
            Six global and national accreditations covering food safety, environment, export, retail and pharma GDP. Audited annually. Never lapsed.
          </p>
        </div>

        <div className="certs-grid" data-anim-group>
          <div className="cert" data-anim="scale">
            <div className="medal">
              <div className="medal-inner">
                <div className="cert-fssai">f<em>s</em>s<em>a</em><i>i</i></div>
              </div>
            </div>
            <div className="ribbon"></div>
            <h5>FSSAI</h5>
          </div>

          <div className="cert" data-anim="scale">
            <div className="medal">
              <div className="medal-inner">
                <div className="cert-iso22">
                  <svg width="34" height="22" viewBox="0 0 34 22" fill="none" stroke="#1c3a8f" strokeWidth="1.3" style={{ margin: '0 auto 2px', display: 'block' }}>
                    <circle cx="17" cy="11" r="9"/>
                    <ellipse cx="17" cy="11" rx="4" ry="9"/>
                    <path d="M8 11h18M11 5c2 1 8 1 12 0M11 17c2-1 8-1 12 0"/>
                  </svg>
                  ISO 22000
                  <small>Food Safety Mgmt</small>
                </div>
              </div>
            </div>
            <div className="ribbon"></div>
            <h5>ISO 22000</h5>
          </div>

          <div className="cert" data-anim="scale">
            <div className="medal">
              <div className="medal-inner">
                <div className="cert-iso14">
                  <svg width="20" height="22" viewBox="0 0 20 22" fill="#0aa84a" style={{ margin: '0 auto 2px', display: 'block' }}>
                    <circle cx="10" cy="6" r="3"/>
                    <circle cx="5" cy="11" r="3"/>
                    <circle cx="15" cy="11" r="3"/>
                    <circle cx="10" cy="16" r="3"/>
                    <path d="M10 8v12" stroke="#0aa84a" strokeWidth="1" fill="none"/>
                  </svg>
                  ISO 14001
                  <small>Environmental Mgmt</small>
                </div>
              </div>
            </div>
            <div className="ribbon"></div>
            <h5>ISO 14001</h5>
          </div>

          <div className="cert" data-anim="scale">
            <div className="medal">
              <div className="medal-inner">
                <div className="cert-eic">
                  <span className="seal">⚜</span>
                  EXPORT<br/>INSPECTION<br/>COUNCIL
                </div>
              </div>
            </div>
            <div className="ribbon"></div>
            <h5>Export Inspection</h5>
          </div>

          <div className="cert" data-anim="scale">
            <div className="medal">
              <div className="medal-inner">
                <div className="cert-brc">
                  <svg width="22" height="22" viewBox="0 0 22 22" fill="#1c3a8f" style={{ margin: '0 auto 4px', display: 'block' }}>
                    <rect width="22" height="22" rx="2"/>
                    <path d="M5 11l4 4 8-8" stroke="#fff" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <b>BRC</b>
                  <small>GLOBAL STANDARDS</small>
                </div>
              </div>
            </div>
            <div className="ribbon"></div>
            <h5>BRC Global</h5>
          </div>

          <div className="cert" data-anim="scale">
            <div className="medal">
              <div className="medal-inner">
                <div className="cert-sgs">
                  <svg width="36" height="22" viewBox="0 0 36 22" fill="none" style={{ margin: '0 auto 2px', display: 'block' }}>
                    <path d="M2 18 Q 18 2 34 18" stroke="#444" strokeWidth="2" fill="none"/>
                    <circle cx="18" cy="14" r="6" fill="#e9531d"/>
                    <path d="M14 14l3 3 5-5" stroke="#fff" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <b>SGS</b>
                  <small>GDP CERTIFIED</small>
                </div>
              </div>
            </div>
            <div className="ribbon"></div>
            <h5>SGS · GDP</h5>
          </div>
        </div>

      </div>

      {/* Bottom-left corner footnote */}
      <p style={{
        position: 'absolute', bottom: 24, left: 32,
        fontSize: 11, color: 'rgba(255,255,255,0.35)',
        letterSpacing: '.06em', fontFamily: 'var(--mono,"JetBrains Mono",monospace)',
        margin: 0,
      }}>
        * In Process
      </p>
    </section>
  )
}
