'use client'

import { useEffect, useRef, useState } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { usePreloader } from '@/contexts/PreloaderContext'

export default function Preloader() {
  const { setIsLoaded } = usePreloader()
  const containerRef    = useRef<HTMLDivElement>(null)
  const topPanelRef     = useRef<HTMLDivElement>(null)
  const bottomPanelRef  = useRef<HTMLDivElement>(null)
  const counterRef      = useRef<HTMLSpanElement>(null)
  const labelRef        = useRef<HTMLParagraphElement>(null)

  const [count, setCount] = useState(0)
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    // Skip if already seen this session
    if (sessionStorage.getItem('bb_preloaded')) {
      setIsLoaded(true)
      setVisible(false)
      return
    }

    let frame: number
    let current = 0
    const duration = 2200 // ms
    const start = performance.now()

    const tick = (now: number) => {
      const elapsed = now - start
      const progress = Math.min(elapsed / duration, 1)
      // Ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3)
      current = Math.round(eased * 100)
      setCount(current)

      if (progress < 1) {
        frame = requestAnimationFrame(tick)
      }
    }

    frame = requestAnimationFrame(tick)

    return () => cancelAnimationFrame(frame)
  }, [setIsLoaded])

  // When count hits 100, run the exit animation
  useGSAP(() => {
    if (count < 100) return

    const tl = gsap.timeline({
      onComplete: () => {
        setIsLoaded(true)
        setVisible(false)
        sessionStorage.setItem('bb_preloaded', '1')
      },
    })

    // Fade out counter + label
    tl.to([counterRef.current, labelRef.current], {
      opacity: 0,
      duration: 0.35,
      ease: 'power2.in',
    })
    // Split panels apart — top slides up, bottom slides down
    .to(topPanelRef.current, {
      yPercent: -100,
      duration: 0.9,
      ease: 'power4.inOut',
    }, '-=0.1')
    .to(bottomPanelRef.current, {
      yPercent: 100,
      duration: 0.9,
      ease: 'power4.inOut',
    }, '<')
  }, { dependencies: [count] })

  if (!visible) return null

  const padded = String(count).padStart(2, '0')

  return (
    <div
      ref={containerRef}
      aria-label="Loading"
      aria-live="polite"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 100,
        pointerEvents: 'all',
      }}
    >
      {/* Top panel */}
      <div
        ref={topPanelRef}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '50%',
          backgroundColor: 'var(--black)',
        }}
      />

      {/* Bottom panel */}
      <div
        ref={bottomPanelRef}
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '50%',
          backgroundColor: 'var(--black)',
        }}
      />

      {/* Counter — sits above both panels in the center */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'flex-end',
          padding: '3rem 2.5rem',
        }}
      >
        <span
          ref={counterRef}
          aria-hidden="true"
          style={{
            fontFamily: 'var(--font-display), Georgia, serif',
            fontSize: 'clamp(80px, 15vw, 200px)',
            fontWeight: 300,
            lineHeight: 0.9,
            letterSpacing: '-0.04em',
            color: 'var(--white)',
            display: 'block',
            tabularNums: 'tabular-nums',
          } as React.CSSProperties}
        >
          {padded}
        </span>

        <p
          ref={labelRef}
          className="label mt-4"
          style={{ color: 'var(--muted)' }}
        >
          Loading experience
        </p>
      </div>
    </div>
  )
}
