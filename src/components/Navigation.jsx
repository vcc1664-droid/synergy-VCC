import { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'

const NAV_LINKS = [
  { to: '/', label: 'Home', newTab: false },
  { to: '/about', label: 'About', newTab: true },
  { to: '/services', label: 'Services', newTab: true },
  { to: '/facilities', label: 'Facilities', newTab: true },
  { to: '/edge', label: 'VCC Edge', newTab: true },
]

export default function Navigation() {
  const location = useLocation()
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)
  const [tight, setTight] = useState(false)

  useEffect(() => {
    const handler = () => setTight(window.scrollY > 60)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  useEffect(() => {
    setOpen(false)
    document.body.style.overflow = ''
  }, [location.pathname])

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
      setTimeout(() => {
        document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
      }, 350)
    } else {
      document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
    }
    setOpen(false)
    document.body.style.overflow = ''
  }

  const isActive = (to) => {
    if (to === '/') return location.pathname === '/'
    return location.pathname.startsWith(to)
  }

  const scrollTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })

  return (
    <>
      <nav className={`nav${tight ? ' tight' : ''}`} id="nav" aria-label="Main navigation">
        <Link className="brand" to="/" onClick={scrollTop}>
          <img src="/VCC-Icon.png" alt="VCC" width="32" height="32" />
          <b>VERSAILLES COLD CHAIN</b>
        </Link>
        <ul>
          {NAV_LINKS.map(({ to, label, newTab }) => (
            <li key={to}>
              <Link
                to={to}
                className={isActive(to) ? 'on' : ''}
                target={newTab ? '_blank' : undefined}
                rel={newTab ? 'noopener noreferrer' : undefined}
                data-link={to.replace('/', '') || 'home'}
                onClick={to === '/' ? scrollTop : undefined}
              >
                {label}
              </Link>
            </li>
          ))}
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

      <div className={`nav-drawer${open ? ' open' : ''}`} id="navDrawer">
        {NAV_LINKS.map(({ to, label, newTab }) => (
          <Link
            key={to}
            to={to}
            className={isActive(to) ? 'on' : ''}
            target={newTab ? '_blank' : undefined}
            rel={newTab ? 'noopener noreferrer' : undefined}
            onClick={() => {
              setOpen(false)
              document.body.style.overflow = ''
              if (to === '/') window.scrollTo({ top: 0, behavior: 'smooth' })
            }}
          >
            {label}
          </Link>
        ))}
        <a href="#contact" className="drawer-cta" onClick={handleQuote}>
          Get a quote &rarr;
        </a>
      </div>
    </>
  )
}
