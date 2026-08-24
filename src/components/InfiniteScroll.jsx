import { useEffect, useRef } from 'react'

export default function InfiniteScroll({
  children,
  pxPerSec = 60,
  className = '',
  trackClassName = '',
  style = {},
}) {
  const trackRef = useRef(null)

  useEffect(() => {
    const track = trackRef.current
    if (!track) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    let pos = 0
    let raf
    let half = 0
    let last = null

    // Sum offsetWidth + margins of first half of children
    // (items are duplicated, so first half = one full loop)
    function calcHalf() {
      const kids = Array.from(track.children)
      const n = Math.floor(kids.length / 2)
      let w = 0
      for (let i = 0; i < n; i++) {
        const cs = window.getComputedStyle(kids[i])
        w += kids[i].offsetWidth
          + parseFloat(cs.marginLeft  || '0')
          + parseFloat(cs.marginRight || '0')
      }
      half = w > 0 ? w : 1
    }

    function tick(ts) {
      if (last === null) last = ts
      const delta = Math.min(ts - last, 64) // cap delta so tab-switch doesn't jump
      last = ts
      pos += (pxPerSec * delta) / 1000
      if (pos >= half) pos -= half
      track.style.transform = `translateX(${-pos}px)`
      raf = requestAnimationFrame(tick)
    }

    // Two rAF frames to let fonts/images settle before measuring
    raf = requestAnimationFrame(() => {
      raf = requestAnimationFrame((ts) => {
        calcHalf()
        last = ts
        tick(ts)
      })
    })

    window.addEventListener('resize', calcHalf, { passive: true })
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', calcHalf)
    }
  }, [pxPerSec])

  return (
    <div className={`inf-strip ${className}`} style={style}>
      <div ref={trackRef} className={`inf-track ${trackClassName}`}>
        {children}
      </div>
    </div>
  )
}
