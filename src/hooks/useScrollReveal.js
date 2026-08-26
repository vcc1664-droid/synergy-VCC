import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { gsap, ScrollTrigger, prefersReducedMotion } from '../lib/gsap'

const FROM_VARS = {
  up:    { opacity: 0, y: 32 },
  fade:  { opacity: 0 },
  scale: { opacity: 0, scale: 0.94 },
  img:   { opacity: 0, scale: 1.08 },
}

const EASE = 'power2.out'
const DURATION = 0.8
const STAGGER = 0.09

function animateEl(el) {
  const kind = el.getAttribute('data-anim') || 'up'
  const fromVars = FROM_VARS[kind] || FROM_VARS.up

  gsap.from(el, {
    ...fromVars,
    duration: DURATION,
    ease: EASE,
    scrollTrigger: {
      trigger: el,
      start: 'top 85%',
      once: true,
    },
  })
}

function animateGroup(group) {
  const items = Array.from(group.querySelectorAll(':scope > [data-anim]'))
  if (!items.length) return

  items.forEach((item) => {
    const kind = item.getAttribute('data-anim') || 'up'
    const fromVars = FROM_VARS[kind] || FROM_VARS.up
    gsap.set(item, fromVars)
  })

  ScrollTrigger.create({
    trigger: group,
    start: 'top 85%',
    once: true,
    onEnter: () => {
      gsap.to(items, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: DURATION,
        ease: EASE,
        stagger: STAGGER,
      })
    },
  })
}

/**
 * Wires up scroll-triggered reveal animations for every element marked
 * with `data-anim="up|fade|scale|img"` inside #main-content, and staggers
 * direct children of any `[data-anim-group]` container.
 *
 * Uses a MutationObserver so lazy-loaded / Suspense-resolved sections
 * (which mount after the initial scan) still get animated. All GSAP
 * ScrollTrigger instances are killed on route change and unmount so
 * nothing leaks or double-fires.
 *
 * No-ops entirely when the user prefers reduced motion — elements simply
 * render in their final state via normal CSS, nothing is hidden.
 */
export default function useScrollReveal() {
  const location = useLocation()

  useEffect(() => {
    if (prefersReducedMotion()) return

    const root = document.getElementById('main-content')
    if (!root) return

    const bound = new WeakSet()

    const scan = () => {
      root.querySelectorAll('[data-anim-group]').forEach((group) => {
        if (bound.has(group)) return
        bound.add(group)
        group.querySelectorAll(':scope > [data-anim]').forEach((el) => bound.add(el))
        animateGroup(group)
      })

      root.querySelectorAll('[data-anim]').forEach((el) => {
        if (bound.has(el)) return
        if (el.closest('[data-anim-group]')) { bound.add(el); return }
        bound.add(el)
        animateEl(el)
      })
    }

    scan()

    const observer = new MutationObserver(() => scan())
    observer.observe(root, { childList: true, subtree: true })

    return () => {
      observer.disconnect()
      ScrollTrigger.getAll().forEach((t) => t.kill())
    }
  }, [location.pathname])
}
