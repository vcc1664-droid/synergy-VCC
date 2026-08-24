import { useEffect, useRef, useState } from 'react'

const INDUSTRIES = [
  { i: 0, cat: '01 · Farm to fork', title: 'Food & Beverages', sub: 'Fresh produce · Juices · Packaged foods · Beverages', img: '/ind-food-beverages.webp', alt: 'Food and Beverages cold storage warehouse' },
  { i: 1, cat: '02 · Pharma-grade', title: 'Pharmaceuticals', sub: 'Vaccines · Biologics · Clinical trial materials', img: '/42050.webp', alt: 'Pharmaceutical cold storage' },
  { i: 2, cat: '03 · Creamery to retail', title: 'Dairy', sub: 'Cheese · Butter · Cultured products', img: '/ind-dairy.webp', alt: 'Dairy cold storage warehouse' },
  { i: 3, cat: '04 · Blast-frozen lane', title: 'Frozen Foods', sub: 'Ice cream · Ready meals · Frozen dough', img: '/ind-frozen-foods.webp', alt: 'Frozen Foods cold storage' },
  { i: 10, cat: '11 · Cold-chain cuts', title: 'Meat & Poultry', sub: 'Fresh cuts · Processed meat · Poultry · Cold-chain butchery', img: 'https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?w=900&q=80&auto=format&fit=crop', alt: 'Meat and Poultry' },
  { i: 4, cat: '05 · Dock to table', title: 'Seafood', sub: 'Catch · Shellfish · Cured · Smoked', img: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=900&q=80&auto=format&fit=crop', alt: 'Fresh Seafood' },
  { i: 5, cat: '06 · Kitchen supply chain', title: 'QSR', sub: 'Fast food chains · Cloud kitchens · Restaurant groups', img: '/ind-qsr.webp', alt: 'QSR cold storage warehouse' },
  { i: 6, cat: '07 · Factory to shelf', title: 'Processed Food', sub: 'Ready-to-eat · Snacks · Packaged meals · Condiments', img: '/ind-processed-food.webp', alt: 'Processed Food cold storage' },
  { i: 7, cat: '08 · Chain-of-custody', title: 'Healthcare', sub: 'Tissue · Samples · Reagents · Ultra-low', img: 'https://images.unsplash.com/photo-1581093588401-fbb62a02f120?w=900&q=80&auto=format&fit=crop', alt: 'Healthcare' },
  { i: 8, cat: '09 · Velocity lane', title: 'FMCG', sub: 'Beverages · Confectionery · Chilled snacks', img: '/img-fmcg.webp', alt: 'FMCG products' },
  { i: 9, cat: '10 · Last-mile', title: 'Retail', sub: 'Grocery · Q-commerce · Hypermarket · D2C', img: 'https://images.unsplash.com/photo-1601598851547-4302969d0614?w=900&q=80&auto=format&fit=crop', alt: 'Retail' },
]

const TOTAL = INDUSTRIES.length
const ANGLE_PER = 360 / TOTAL
const SENS = 0.4

export default function IndustriesSection() {
  const [active, setActiveState] = useState(0)
  const stageRef = useRef(null)
  const ringRef = useRef(null)
  const cardRefs = useRef([])
  const numRef = useRef(null)

  const rotationRef = useRef(0)
  const targetRotationRef = useRef(0)
  const activeRef = useRef(0)
  const radiusRef = useRef(480)
  const rafRef = useRef(null)
  const draggingRef = useRef(false)
  const dragStartXRef = useRef(0)
  const dragStartRotationRef = useRef(0)

  const calcRadius = () => {
    const w = window.innerWidth
    radiusRef.current = Math.max(360, Math.min(700, w * 0.38))
  }

  const placeCards = () => {
    cardRefs.current.forEach((c, i) => {
      if (!c) return
      c.style.transform = `rotateY(${i * ANGLE_PER}deg) translateZ(${radiusRef.current}px)`
    })
  }

  const applyRotation = () => {
    if (!ringRef.current) return
    ringRef.current.style.transform = `rotateY(${rotationRef.current}deg)`
    cardRefs.current.forEach((c, i) => {
      if (!c) return
      const ia   = (i * ANGLE_PER + rotationRef.current) % 360
      const rel  = ((ia + 360) % 360)
      const norm = Math.abs(rel > 180 ? 360 - rel : rel)
      const opacity = Math.max(0.15, 1 - norm / 150)
      const blur    = Math.min(9, norm / 15)
      c.style.opacity = String(opacity)
      c.style.filter  = blur > 0.2 ? `blur(${blur.toFixed(1)}px)` : ''
    })
  }

  const snapAngleForIndex = (i) => {
    const target = -i * ANGLE_PER
    const diff = ((target - rotationRef.current + 540) % 360) - 180
    return rotationRef.current + diff
  }

  const tick = () => {
    const dr = targetRotationRef.current - rotationRef.current
    if (Math.abs(dr) < 0.05) {
      rotationRef.current = targetRotationRef.current
      applyRotation()
      rafRef.current = null
      return
    }
    rotationRef.current += dr * 0.12
    applyRotation()
    rafRef.current = requestAnimationFrame(tick)
  }

  const animateRing = () => {
    if (rafRef.current === null) rafRef.current = requestAnimationFrame(tick)
  }

  const setActive = (i, animate = true) => {
    const next = ((i % TOTAL) + TOTAL) % TOTAL
    activeRef.current = next
    setActiveState(next)
    targetRotationRef.current = snapAngleForIndex(next)
    if (!animate) {
      rotationRef.current = targetRotationRef.current
      applyRotation()
    }
    if (numRef.current) numRef.current.textContent = String(next + 1).padStart(2, '0')
  }

  useEffect(() => {
    const stage = stageRef.current
    if (!stage) return

    calcRadius()
    placeCards()
    setActive(0, false)

    const onDown = (e) => {
      draggingRef.current = true
      stage.classList.add('dragging')
      dragStartXRef.current = e.touches ? e.touches[0].clientX : e.clientX
      dragStartRotationRef.current = rotationRef.current
      if (rafRef.current !== null) { cancelAnimationFrame(rafRef.current); rafRef.current = null }
    }
    const onMove = (e) => {
      if (!draggingRef.current) return
      const cx = e.touches ? e.touches[0].clientX : e.clientX
      rotationRef.current = dragStartRotationRef.current + (cx - dragStartXRef.current) * SENS
      applyRotation()
    }
    const onUp = () => {
      if (!draggingRef.current) return
      draggingRef.current = false
      stage.classList.remove('dragging')
      const nearest = Math.round(-rotationRef.current / ANGLE_PER)
      setActive(nearest, true)
      animateRing()
    }
    const onResize = () => {
      calcRadius()
      placeCards()
      setActive(activeRef.current, false)
    }
    const onKey = (e) => {
      if (e.key === 'ArrowLeft') { setActive(activeRef.current - 1); animateRing() }
      else if (e.key === 'ArrowRight') { setActive(activeRef.current + 1); animateRing() }
    }

    stage.addEventListener('mousedown', onDown)
    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseup', onUp)
    stage.addEventListener('touchstart', onDown, { passive: true })
    window.addEventListener('touchmove', onMove, { passive: true })
    window.addEventListener('touchend', onUp)
    window.addEventListener('resize', onResize)
    stage.addEventListener('keydown', onKey)

    return () => {
      stage.removeEventListener('mousedown', onDown)
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseup', onUp)
      stage.removeEventListener('touchstart', onDown)
      window.removeEventListener('touchmove', onMove)
      window.removeEventListener('touchend', onUp)
      window.removeEventListener('resize', onResize)
      stage.removeEventListener('keydown', onKey)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [])

  return (
    <section className="sec" id="industries" style={{ padding: 'clamp(50px,8vw,90px) 0 0' }}>
      <div className="wrap">
        <h2 className="sec-title">
          <span className="hline">Built for cargo that</span>
          <span className="hline"><span className="accent">doesn't forgive</span> mistakes.</span>
        </h2>
      </div>

      <div className="ind-gallery-wrap" id="indGalleryWrap">
        <div className="ind-gallery-stage" id="indGalleryStage" ref={stageRef} tabIndex={0}>
          <div className="ind-gallery">
            <div className="ind-gallery-ring" id="indGalleryRing" ref={ringRef}>
              {INDUSTRIES.map((ind, idx) => (
                <div
                  key={ind.i}
                  className="ig-card"
                  data-i={ind.i}
                  ref={(el) => { cardRefs.current[idx] = el }}
                  onClick={() => { setActive(idx); animateRing() }}
                >
                  <img src={ind.img} alt={ind.alt} loading="lazy" decoding="async" onError={(e) => { e.target.style.display = 'none' }} />
                  <div className="ig-overlay">
                    <h4>{ind.title}</h4>
                    <span className="ig-binomial">{ind.sub}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="ind-gallery-controls">
          <button className="igarrow" id="igPrev" aria-label="Previous" onClick={() => { setActive(activeRef.current - 1); animateRing() }}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>
          <div className="igdots" id="igDots">
            {INDUSTRIES.map((_, i) => (
              <span key={i} className={`igdot${i === active ? ' on' : ''}`} onClick={() => { setActive(i); animateRing() }} />
            ))}
          </div>
          <div className="igcounter">
            <b ref={numRef}>01</b> / 10 INDUSTRIES
          </div>
          <button className="igarrow" id="igNext" aria-label="Next" onClick={() => { setActive(activeRef.current + 1); animateRing() }}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
        </div>
        <span className="ind-gallery-hint">&#8596; Drag to rotate &middot; or use arrows</span>
      </div>
    </section>
  )
}
