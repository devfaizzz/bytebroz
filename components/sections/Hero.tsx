'use client'

import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'
import { usePreloader } from '@/contexts/PreloaderContext'

gsap.registerPlugin(ScrollTrigger, SplitText)

export default function Hero() {
  const { isLoaded } = usePreloader()

  const sectionRef    = useRef<HTMLElement>(null)
  const eyebrowRef    = useRef<HTMLDivElement>(null)
  const headlineRef   = useRef<HTMLHeadingElement>(null)
  const descColRef    = useRef<HTMLDivElement>(null)
  const dividerRef    = useRef<HTMLDivElement>(null)
  const bottomRowRef  = useRef<HTMLDivElement>(null)
  const scrollLineRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    if (!isLoaded || !headlineRef.current) return

    const split = new SplitText(headlineRef.current, { type: 'lines' })

    // Wrap each line in an overflow clip
    split.lines.forEach((line) => {
      const wrapper = document.createElement('div')
      wrapper.style.overflow = 'hidden'
      wrapper.style.display  = 'block'
      line.parentNode?.insertBefore(wrapper, line)
      wrapper.appendChild(line)
    })

    const tl = gsap.timeline({ delay: 0.1 })

    // Eyebrow
    tl.fromTo(eyebrowRef.current,
      { opacity: 0, y: 12 },
      { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' }
    )
    // Headline lines clip-reveal
    .fromTo(split.lines,
      { yPercent: 102 },
      { yPercent: 0, duration: 1.0, stagger: 0.1, ease: 'power4.out' },
      '-=0.3'
    )
    // Divider line
    .fromTo(dividerRef.current,
      { scaleX: 0, transformOrigin: 'left' },
      { scaleX: 1, duration: 0.8, ease: 'power3.inOut' },
      '-=0.4'
    )
    // Right desc column
    .fromTo(descColRef.current,
      { opacity: 0, y: 16 },
      { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' },
      '-=0.5'
    )
    // Bottom row
    .fromTo(bottomRowRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.6, ease: 'power2.out' },
      '-=0.3'
    )
    // Scroll indicator line grows
    .fromTo(scrollLineRef.current,
      { scaleY: 0, transformOrigin: 'top' },
      { scaleY: 1, duration: 1.0, ease: 'power3.inOut' },
      '-=0.5'
    )

    // Subtle scroll parallax on headline
    gsap.to(headlineRef.current, {
      yPercent: 8,
      ease: 'none',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: 1.2,
      },
    })

    return () => split.revert()
  }, { dependencies: [isLoaded], scope: sectionRef })

  return (
    <section
      ref={sectionRef}
      id="hero"
      style={{
        position: 'relative',
        minHeight: '100svh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        paddingTop: 'var(--nav-h, 80px)',
        overflow: 'hidden',
      }}
    >
      {/* ── Decorative right rail ─────────────────────────────── */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: 0,
          right: 'clamp(1.5rem, 5vw, 4rem)',
          width: '1px',
          height: '100%',
          background: 'var(--hairline)',
          pointerEvents: 'none',
        }}
      />

      {/* ════════════════════════════════════════════════════════
          TOP BODY
      ════════════════════════════════════════════════════════ */}
      <div
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: 'clamp(2rem, 5vw, 5rem) clamp(1.25rem, 5vw, 4rem)',
          gap: 'clamp(2rem, 4vw, 3.5rem)',
        }}
      >
        {/* ── Eyebrow row ─── */}
        <div
          ref={eyebrowRef}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1.5rem',
            opacity: 0,
          }}
        >
          <span
            style={{
              display: 'inline-block',
              width: 6,
              height: 6,
              borderRadius: '50%',
              backgroundColor: 'var(--white)',
              flexShrink: 0,
            }}
          />
          <span
            className="label"
            style={{ color: 'var(--muted)' }}
          >
            Creative Digital Studio — Est. 2022
          </span>
          <span
            className="label"
            style={{
              marginLeft: 'auto',
              color: 'var(--muted)',
              display: 'none',
            }}
            id="hero-index"
          >
            01 / 05
          </span>
        </div>

        {/* ── Headline + right col grid ─── */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr',
            gap: 'clamp(1.5rem, 3vw, 2.5rem)',
            alignItems: 'flex-end',
          }}
          className="hero-grid"
        >
          {/* Headline */}
          <h1
            ref={headlineRef}
            style={{
              fontFamily: 'var(--font-display), Georgia, serif',
              fontSize: 'clamp(52px, 11.5vw, 188px)',
              fontWeight: 300,
              lineHeight: 0.93,
              letterSpacing: '-0.03em',
              color: 'var(--white)',
            }}
          >
            We Build<br />
            Digital<br />
            Worlds.
          </h1>

          {/* Right column — only visible on md+ */}
          <div
            ref={descColRef}
            style={{ opacity: 0 }}
            className="hero-desc-col"
          >
            <p
              style={{
                fontSize: 'clamp(14px, 1.1vw, 16px)',
                lineHeight: 1.7,
                color: 'var(--muted)',
                maxWidth: 340,
              }}
            >
              We craft immersive digital products for brands that
              refuse to be average — strategy, design, and code
              under one roof.
            </p>
            <a
              href="#work"
              data-cursor-label="View"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.75rem',
                marginTop: '2rem',
                fontSize: '12px',
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color: 'var(--white)',
                textDecoration: 'none',
                borderBottom: '1px solid var(--hairline)',
                paddingBottom: '0.35rem',
              }}
            >
              Selected Work
              <svg width="16" height="8" viewBox="0 0 16 8" fill="none" aria-hidden="true">
                <path d="M0 4H14M14 4L11 1M14 4L11 7" stroke="currentColor" strokeWidth="1"/>
              </svg>
            </a>
          </div>
        </div>
      </div>

      {/* ── Hairline divider ─── */}
      <div
        ref={dividerRef}
        style={{
          width: '100%',
          height: '1px',
          background: 'var(--hairline)',
          transform: 'scaleX(0)',
          transformOrigin: 'left',
        }}
      />

      {/* ════════════════════════════════════════════════════════
          BOTTOM STRIP
      ════════════════════════════════════════════════════════ */}
      <div
        ref={bottomRowRef}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding:
            'clamp(1rem, 2vw, 1.5rem) clamp(1.25rem, 5vw, 4rem)',
          opacity: 0,
          gap: '1rem',
        }}
      >
        {/* Scroll indicator */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.875rem' }}>
          <div
            ref={scrollLineRef}
            style={{
              width: '1px',
              height: '36px',
              backgroundColor: 'var(--muted)',
              transform: 'scaleY(0)',
              transformOrigin: 'top',
              flexShrink: 0,
            }}
          />
          <span className="label" style={{ color: 'var(--muted)' }}>
            Scroll to explore
          </span>
        </div>

        {/* Center — availability pill */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            position: 'absolute',
            left: '50%',
            transform: 'translateX(-50%)',
          }}
          className="avail-pill"
        >
          <span
            style={{
              display: 'inline-block',
              width: 6,
              height: 6,
              borderRadius: '50%',
              backgroundColor: '#4ade80',
            }}
          />
          <span className="label" style={{ color: 'var(--muted)' }}>
            Available for projects
          </span>
        </div>

        {/* Right — copyright */}
        <span
          className="label"
          style={{ color: 'var(--muted)', opacity: 0.45, flexShrink: 0 }}
        >
          © 2026
        </span>
      </div>
    </section>
  )
}
