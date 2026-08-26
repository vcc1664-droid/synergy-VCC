import { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'

export default function Footer() {
  const navigate = useNavigate()
  const location = useLocation()
  const [subscribed, setSubscribed] = useState(false)
  const [newsEmail, setNewsEmail]   = useState('')
  const [newsErr,   setNewsErr]     = useState(false)

  const handleSubscribe = () => {
    if (!newsEmail.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(newsEmail.trim())) {
      setNewsErr(true)
      setTimeout(() => setNewsErr(false), 2500)
      return
    }
    setSubscribed(true)
    setNewsEmail('')
    setTimeout(() => setSubscribed(false), 4000)
  }

  const scrollTo = (id) => (e) => {
    e.preventDefault()
    if (location.pathname !== '/') {
      navigate('/')
      setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }), 350)
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <>
      <footer>
        <div className="wrap">
          <div className="f-hero">
            <h2 className="big">
              <span className="hline">Built to Preserve.</span>
              <span className="hline">Trusted to Perform.</span>
            </h2>
            <div className="news">
              {subscribed ? (
                <div style={{
                  display: 'flex', alignItems: 'center', gap: 10,
                  background: 'rgba(7,15,48,.06)', border: '1px solid rgba(7,15,48,.12)',
                  borderRadius: 14, padding: '12px 20px',
                }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#070f30" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 13l4 4L19 7"/></svg>
                  <span style={{ fontSize: 13.5, color: '#070f30', fontWeight: 500 }}>
                    Newsletter coming soon — we'll notify you when VCC updates go live!
                  </span>
                </div>
              ) : (
                <>
                  <input
                    type="email"
                    placeholder="your@email.com"
                    aria-label="Email address for newsletter"
                    value={newsEmail}
                    onChange={e => { setNewsEmail(e.target.value); setNewsErr(false) }}
                    onKeyDown={e => e.key === 'Enter' && handleSubscribe()}
                    style={newsErr ? { borderColor: '#ff6b6b', boxShadow: '0 0 0 3px rgba(255,107,107,.15)' } : {}}
                  />
                  <button type="button" aria-label="Subscribe to newsletter" onClick={handleSubscribe}>Subscribe</button>
                  {newsErr && <span style={{ position:'absolute', bottom:-20, left:0, fontSize:11, color:'#ff6b6b', whiteSpace:'nowrap' }}>Please enter a valid email</span>}
                </>
              )}
            </div>
          </div>

          <div className="f-grid">
            <div>
              <div className="brand">
                <img src="/VCC-Icon.png" alt="VCC" width="32" height="32" />
                <b>VERSAILLES COLD CHAIN</b>
              </div>
              <div className="tag">Chill, we got it.<br/>Cold-chain logistics for cargo that matters.</div>
            </div>
            <div>
              <h3>Services</h3>
              <ul>
                <li><Link to="/services">Storage &amp; Warehousing</Link></li>
                <li><Link to="/services">Transportation &amp; Distribution</Link></li>
                <li><Link to="/services">Inventory Management</Link></li>
                <li><Link to="/services">Value-Added Services</Link></li>
                <li><Link to="/services">Supply Chain Solutions</Link></li>
                <li><Link to="/services">Technology &amp; Visibility</Link></li>
              </ul>
            </div>
            <div>
              <h3>Company</h3>
              <ul>
                <li><Link to="/about">About</Link></li>
                <li><Link to="/facilities">Network</Link></li>
                <li><a href="#certs" onClick={scrollTo('certs')}>Certifications</a></li>
              </ul>
            </div>
            <div>
              <h3>Contact</h3>
              <ul>
                <li><a href="tel:+919988118803">+91 99881 18803</a></li>
                <li><a href="mailto:info@versaillescoldchain.com">info@versaillescoldchain.com</a></li>
                <li><a href="mailto:sales@versaillescoldchain.com">sales@versaillescoldchain.com</a></li>
                <li style={{ lineHeight: 1.55 }}>
                  Hadbast No. 206, Village&nbsp;Toffanpur,<br />
                  Tehsil Dera Bassi, Distt. SAS Nagar,<br />
                  Punjab, India &ndash; 140506
                </li>
              </ul>
            </div>
            <div>
              <h3>A Venture By</h3>
              <a href="https://thesynergygroup.co.in" target="_blank" rel="noopener noreferrer" style={{ display: 'inline-block', marginTop: 10 }}>
                <img src="/Group-Logo.png" alt="Synergy Group"
                  style={{ maxWidth: 180, width: '100%', height: 'auto', display: 'block', opacity: 0.9, transition: 'opacity .2s' }}
                  loading="lazy"
                  onMouseEnter={e => e.currentTarget.style.opacity = 1}
                  onMouseLeave={e => e.currentTarget.style.opacity = 0.9}
                />
              </a>
            </div>
          </div>

          <div className="f-bottom">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <span>&copy; 2026 Versailles Cold Chain</span>
              <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
                {[
                  { to: '/privacy-policy', label: 'Privacy Policy' },
                  { to: '/legal-terms',    label: 'Legal Terms' },
                ].map(({ to, label }) => (
                  <Link
                    key={to}
                    to={to}
                    style={{ color: 'rgba(7,15,48,.4)', textTransform: 'uppercase', letterSpacing: '.01em', fontSize: '11px', transition: 'color .2s' }}
                    onMouseEnter={e => e.currentTarget.style.color = '#070f30'}
                    onMouseLeave={e => e.currentTarget.style.color = 'rgba(7,15,48,.4)'}
                  >
                    {label}
                  </Link>
                ))}
              </div>
            </div>
            <div className="socials">
              <a href="https://www.linkedin.com/in/versailles-cold-chain-595063413/?isSelfProfile=true" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                <img src="/linkedin.png" alt="LinkedIn" style={{ width: 28, height: 28, objectFit: 'contain', display: 'block' }} />
              </a>
              <a href="https://www.instagram.com/versaillescoldchain?igsh=MWk0ZTQ4ZmYxbWdncQ==" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <img src="/instagram.png" alt="Instagram" style={{ width: 28, height: 28, objectFit: 'contain', display: 'block' }} />
              </a>
              <a href="https://www.facebook.com/profile.php?id=61590586707674" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                <img src="/facebook.png" alt="Facebook" style={{ width: 28, height: 28, objectFit: 'contain', display: 'block' }} />
              </a>
            </div>
          </div>
        </div>
      </footer>

      <section className="ft-video-scene">
        <video autoPlay muted loop playsInline aria-hidden="true">
          <source src="/Footer.webm" type="video/webm" />
        </video>
      </section>
    </>
  )
}
