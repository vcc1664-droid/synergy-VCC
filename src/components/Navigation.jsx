import { useState, useEffect, useRef } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { smoothScrollToEl, smoothScrollToTop } from '../utils/smoothScroll'

const SERVICES_NAV_ITEMS = [
  {
    to: '/services',
    label: 'All Services Overview',
    desc: 'Explore our complete cold chain portfolio',
    isOverview: true,
  },
  {
    to: '/services/storage-warehousing',
    label: 'Storage & Warehousing',
    desc: 'Multi-temperature validated cold storage',
    n: '01',
  },
  {
    to: '/services/transportation-distribution',
    label: 'Transportation & Distribution',
    desc: 'Refrigerated freight & last-mile logistics',
    n: '02',
  },
  {
    to: '/services/inventory-management',
    label: 'Inventory Management',
    desc: 'WMS-powered control & lot traceability',
    n: '03',
  },
  {
    to: '/services/value-added-services',
    label: 'Value-Added Services',
    desc: 'Blast freezing, repackaging & labelling',
    n: '04',
  },
  {
    to: '/services/supply-chain-solutions',
    label: 'Supply Chain Solutions',
    desc: 'Turnkey logistics & cross-docking',
    n: '05',
  },
  {
    to: '/services/technology-visibility',
    label: 'Technology & Visibility',
    desc: '30s IoT telemetry & real-time client portal',
    n: '06',
  },
]

const NAV_LINKS = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/services', label: 'Services', hasDropdown: true },
  { to: '/facilities', label: 'Facilities' },
  { to: '/edge', label: 'VCC Edge' },
]

const NAV_DROPDOWN_STYLES = `
/* ── Services Dropdown Menu Desktop ── */
.nav-item-dropdown {
  position: relative;
  display: inline-flex;
  align-items: center;
}

.nav-dropdown-trigger {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  cursor: pointer;
  padding: 6px 0;
  line-height: 1.2;
}

.nav-dropdown-chevron {
  width: 12px;
  height: 12px;
  transition: transform 0.22s ease;
  opacity: 0.75;
  display: inline-block;
  flex-shrink: 0;
}

.nav-item-dropdown:hover .nav-dropdown-chevron,
.nav-item-dropdown.is-open .nav-dropdown-chevron {
  transform: rotate(180deg);
  opacity: 1;
}

/* Dropdown Container with Hover Bridge (zero gap) */
.nav-dropdown-wrapper {
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%) translateY(4px);
  padding-top: 12px; /* Invisible bridge to bridge cursor movement */
  z-index: 1000;
  opacity: 0;
  visibility: hidden;
  pointer-events: none;
  transition: opacity 0.2s ease, transform 0.2s ease, visibility 0.2s ease;
}

/* Active / Open state */
.nav-item-dropdown:hover .nav-dropdown-wrapper,
.nav-item-dropdown:focus-within .nav-dropdown-wrapper,
.nav-item-dropdown.is-open .nav-dropdown-wrapper,
.nav-dropdown-wrapper:hover {
  opacity: 1;
  visibility: visible;
  pointer-events: auto;
  transform: translateX(-50%) translateY(0);
}

.nav-dropdown-menu {
  width: 330px;
  background: rgba(6, 12, 35, 0.98);
  border: 1px solid rgba(56, 189, 248, 0.28);
  border-radius: 18px;
  box-shadow: 0 24px 50px rgba(0, 0, 0, 0.75), 0 0 35px rgba(56, 189, 248, 0.16);
  backdrop-filter: blur(20px);
  padding: 10px;
  display: flex;
  flex-direction: column;
  gap: 3px;
  position: relative;
}

/* Arrow pointer */
.nav-dropdown-menu::before {
  content: '';
  position: absolute;
  top: -6px;
  left: 50%;
  transform: translateX(-50%) rotate(45deg);
  width: 12px;
  height: 12px;
  background: rgba(6, 12, 35, 0.98);
  border-left: 1px solid rgba(56, 189, 248, 0.28);
  border-top: 1px solid rgba(56, 189, 248, 0.28);
}

/* Invisible wide top bridge */
.nav-dropdown-menu::after {
  content: '';
  position: absolute;
  top: -20px;
  left: -20px;
  right: -20px;
  height: 24px;
  background: transparent;
}

.nav-dropdown-item {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 10px 14px;
  border-radius: 12px;
  text-decoration: none;
  transition: all 0.2s ease;
  color: #e2e8f0;
}

.nav-dropdown-item:hover {
  background: rgba(56, 189, 248, 0.12);
  color: #ffffff;
  transform: translateX(2px);
}

.nav-dropdown-item.is-overview {
  background: rgba(56, 189, 248, 0.08);
  border: 1px solid rgba(56, 189, 248, 0.2);
  margin-bottom: 4px;
}

.nav-dropdown-item.is-overview:hover {
  background: rgba(56, 189, 248, 0.18);
  border-color: rgba(56, 189, 248, 0.4);
}

.nav-dropdown-item-num {
  font-size: 0.72rem;
  font-weight: 700;
  color: #38bdf8;
  background: rgba(56, 189, 248, 0.14);
  padding: 2px 6px;
  border-radius: 6px;
  margin-top: 2px;
  font-family: var(--display, 'Satoshi', sans-serif);
  flex-shrink: 0;
}

.nav-dropdown-item-content {
  display: flex;
  flex-direction: column;
}

.nav-dropdown-item-title {
  font-size: 0.88rem;
  font-weight: 600;
  color: #ffffff;
  line-height: 1.3;
}

.nav-dropdown-item:hover .nav-dropdown-item-title {
  color: #38bdf8;
}

.nav-dropdown-item-desc {
  font-size: 0.74rem;
  color: rgba(203, 213, 225, 0.7);
  line-height: 1.35;
  margin-top: 2px;
}

/* ── Mobile Drawer Dropdown ── */
.drawer-services-toggle {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
}

.drawer-toggle-btn {
  background: rgba(56, 189, 248, 0.1);
  border: 1px solid rgba(56, 189, 248, 0.25);
  color: #38bdf8;
  width: 32px;
  height: 32px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.1rem;
  font-weight: 700;
  cursor: pointer;
  margin-left: 10px;
}

.drawer-sub-menu {
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 10px 0 10px 16px;
  border-left: 2px solid rgba(56, 189, 248, 0.25);
  margin: 6px 0 12px 8px;
}

.drawer-sub-link {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 0.94rem;
  color: rgba(226, 232, 240, 0.85);
  text-decoration: none;
  padding: 6px 0;
  transition: color 0.2s ease;
}

.drawer-sub-link:hover,
.drawer-sub-link.active {
  color: #38bdf8;
}

.drawer-sub-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #38bdf8;
}
`

export default function Navigation() {
  const location = useLocation()
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)
  const [tight, setTight] = useState(false)
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false)
  const [desktopServicesOpen, setDesktopServicesOpen] = useState(false)
  const timeoutRef = useRef(null)

  useEffect(() => {
    const handler = () => setTight(window.scrollY > 60)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  useEffect(() => {
    setOpen(false)
    setDesktopServicesOpen(false)
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    document.body.style.overflow = ''
  }, [location.pathname])

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    setDesktopServicesOpen(true)
  }

  const handleMouseLeave = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    timeoutRef.current = setTimeout(() => {
      setDesktopServicesOpen(false)
    }, 220)
  }

  const toggleMenu = () => {
    setOpen((v) => {
      document.body.style.overflow = !v ? 'hidden' : ''
      return !v
    })
  }

  const handleQuote = (e) => {
    e.preventDefault()
    if (location.pathname !== '/') {
      navigate('/')
      setTimeout(() => smoothScrollToEl('contact'), 350)
    } else {
      smoothScrollToEl('contact')
    }
    setOpen(false)
    document.body.style.overflow = ''
  }

  const isActive = (to) => {
    if (to === '/') return location.pathname === '/'
    return location.pathname.startsWith(to)
  }

  const scrollTop = () => smoothScrollToTop()

  return (
    <>
      <style>{NAV_DROPDOWN_STYLES}</style>

      <nav className={`nav${tight ? ' tight' : ''}`} id="nav" aria-label="Main navigation">
        <Link className="brand" to="/" onClick={scrollTop}>
          <img src="/VCC-Icon.png" alt="VCC" width="32" height="32" />
          <b>VERSAILLES COLD CHAIN</b>
        </Link>
        <ul>
          {NAV_LINKS.map(({ to, label, hasDropdown }) => {
            if (hasDropdown) {
              return (
                <li
                  key={to}
                  className={`nav-item-dropdown ${desktopServicesOpen ? 'is-open' : ''}`}
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                >
                  <Link
                    to={to}
                    className={`nav-dropdown-trigger ${isActive(to) ? 'on' : ''}`}
                    data-link="services"
                  >
                    <span>{label}</span>
                    <svg className="nav-dropdown-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  </Link>

                  {/* Desktop Dropdown Wrapper with hover bridge */}
                  <div
                    className="nav-dropdown-wrapper"
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                  >
                    <div className="nav-dropdown-menu">
                      {SERVICES_NAV_ITEMS.map((item) => (
                        <Link
                          key={item.to}
                          to={item.to}
                          className={`nav-dropdown-item ${item.isOverview ? 'is-overview' : ''}`}
                          onClick={() => {
                            if (timeoutRef.current) clearTimeout(timeoutRef.current)
                            setDesktopServicesOpen(false)
                          }}
                        >
                          {item.n ? (
                            <span className="nav-dropdown-item-num">{item.n}</span>
                          ) : (
                            <span className="nav-dropdown-item-num">✦</span>
                          )}
                          <div className="nav-dropdown-item-content">
                            <span className="nav-dropdown-item-title">{item.label}</span>
                            <span className="nav-dropdown-item-desc">{item.desc}</span>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                </li>
              )
            }

            return (
              <li key={to}>
                <Link
                  to={to}
                  className={isActive(to) ? 'on' : ''}
                  data-link={to.replace('/', '') || 'home'}
                  onClick={to === '/' ? scrollTop : undefined}
                >
                  {label}
                </Link>
              </li>
            )
          })}
        </ul>

        <a className="cta" href="#contact" onClick={handleQuote}>
          Get a quote
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M5 12h14M13 5l7 7-7 7" />
          </svg>
        </a>

        <button
          className={`nav-ham${open ? ' open' : ''}`}
          id="navHam"
          aria-label="Open menu"
          onClick={toggleMenu}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </nav>

      {/* Mobile Drawer */}
      <div className={`nav-drawer${open ? ' open' : ''}`} id="navDrawer">
        {NAV_LINKS.map(({ to, label, hasDropdown }) => {
          if (hasDropdown) {
            return (
              <div key={to} style={{ width: '100%' }}>
                <div className="drawer-services-toggle">
                  <Link
                    to={to}
                    className={isActive(to) ? 'on' : ''}
                    onClick={() => {
                      setOpen(false)
                      document.body.style.overflow = ''
                    }}
                  >
                    {label}
                  </Link>
                  <button
                    type="button"
                    className="drawer-toggle-btn"
                    onClick={(e) => {
                      e.stopPropagation()
                      setMobileServicesOpen(!mobileServicesOpen)
                    }}
                    aria-label="Toggle Services sub-menu"
                  >
                    {mobileServicesOpen ? '−' : '+'}
                  </button>
                </div>

                {mobileServicesOpen && (
                  <div className="drawer-sub-menu">
                    {SERVICES_NAV_ITEMS.map((item) => (
                      <Link
                        key={item.to}
                        to={item.to}
                        className={`drawer-sub-link ${location.pathname === item.to ? 'active' : ''}`}
                        onClick={() => {
                          setOpen(false)
                          document.body.style.overflow = ''
                        }}
                      >
                        <span className="drawer-sub-dot" />
                        <span>{item.label}</span>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            )
          }

          return (
            <Link
              key={to}
              to={to}
              className={isActive(to) ? 'on' : ''}
              onClick={() => {
                setOpen(false)
                document.body.style.overflow = ''
                if (to === '/') smoothScrollToTop()
              }}
            >
              {label}
            </Link>
          )
        })}

        <a href="#contact" className="drawer-cta" onClick={handleQuote}>
          Get a quote &rarr;
        </a>
      </div>
    </>
  )
}
