'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'

/* ─── SVG arrow cursor (matches uploaded reference) ─────────────────
   Bold dark geometric arrow, white sticker outline, tip at origin.
   The SVG has 3px padding so the stroke isn't clipped.
─────────────────────────────────────────────────────────────────── */
const CURSOR_SVG = `
<svg xmlns="http://www.w3.org/2000/svg" width="38" height="44" viewBox="-3 -3 38 44">
  <path
    d="M 0 0 L 0 30 L 6 23 L 11.5 35 L 16 33 L 10.5 21 L 19.5 21 Z"
    fill="#1a1a1a"
    stroke="white"
    stroke-width="3"
    stroke-linejoin="round"
    stroke-linecap="round"
  />
</svg>
`

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Touch / coarse-pointer devices — skip
    if (window.matchMedia('(pointer: coarse)').matches) return

    const cursor = cursorRef.current!

    // Park off-screen on load
    gsap.set(cursor, { x: -80, y: -80, opacity: 0, scale: 1 })

    // Smooth follower — tip tracks the mouse position
    const moveX = gsap.quickTo(cursor, 'x', { duration: 0.2, ease: 'power3' })
    const moveY = gsap.quickTo(cursor, 'y', { duration: 0.2, ease: 'power3' })

    let visible = false

    const onMove = (e: MouseEvent) => {
      moveX(e.clientX)
      moveY(e.clientY)
      if (!visible) {
        gsap.to(cursor, { opacity: 1, duration: 0.15 })
        visible = true
      }
    }

    // ── Hover: scale up slightly on interactive elements ─────────
    const onEnter = () => {
      gsap.to(cursor, { scale: 0.8, duration: 0.25, ease: 'power2.out' })
    }
    const onLeave = () => {
      gsap.to(cursor, { scale: 1, duration: 0.3, ease: 'power2.out' })
    }

    const attached = new Set<Element>()

    const attach = () => {
      document.querySelectorAll<HTMLElement>('a, button, [data-cursor-hover]').forEach((el) => {
        if (attached.has(el)) return
        el.addEventListener('mouseenter', onEnter)
        el.addEventListener('mouseleave', onLeave)
        attached.add(el)
      })
    }

    attach()
    document.addEventListener('mousemove', onMove)

    const observer = new MutationObserver(attach)
    observer.observe(document.body, { childList: true, subtree: true })

    return () => {
      document.removeEventListener('mousemove', onMove)
      observer.disconnect()
      attached.forEach((el) => {
        el.removeEventListener('mouseenter', onEnter)
        el.removeEventListener('mouseleave', onLeave)
      })
    }
  }, [])

  return (
    <div
      ref={cursorRef}
      aria-hidden="true"
      /* tip of arrow sits exactly at mouse coords — no centering offset */
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        pointerEvents: 'none',
        zIndex: 9999,
        willChange: 'transform',
        /* shift by the 3px SVG padding so the path tip = (0,0) = mouse */
        marginLeft: '-3px',
        marginTop: '-3px',
      }}
      dangerouslySetInnerHTML={{ __html: CURSOR_SVG }}
    />
  )
}
