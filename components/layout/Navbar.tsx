'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import clsx from 'clsx'
import { usePreloader } from '@/contexts/PreloaderContext'

gsap.registerPlugin(ScrollTrigger)

const NAV_LINKS = [
  { label: 'Work',     href: '#work' },
  { label: 'Studio',   href: '#studio' },
  { label: 'Services', href: '#services' },
  { label: 'Contact',  href: '#contact' },
]

export default function Navbar() {
  const { isLoaded } = usePreloader()
  const navRef          = useRef<HTMLElement>(null)
  const logoRef         = useRef<HTMLDivElement>(null)
  const desktopLinksRef = useRef<HTMLUListElement>(null)
  const ctaRef          = useRef<HTMLAnchorElement>(null)
  const menuBtnRef      = useRef<HTMLButtonElement>(null)
  const overlayRef      = useRef<HTMLDivElement>(null)
  const overlayItemsRef = useRef<HTMLElement[]>([])

  const [menuOpen, setMenuOpen]   = useState(false)
  const [scrolled, setScrolled]   = useState(false)

  // ── Entrance after preloader ──────────────────────────────────────
  useGSAP(() => {
    if (!isLoaded) return

    const items = [
      logoRef.current,
      ...(desktopLinksRef.current?.querySelectorAll('li') ?? []),
      ctaRef.current,
      menuBtnRef.current,
    ].filter(Boolean)

    gsap.fromTo(
      items,
      { y: -16, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.7, stagger: 0.07, ease: 'power3.out', delay: 0.1 }
    )
  }, { dependencies: [isLoaded] })

  // ── Scroll hairline ───────────────────────────────────────────────
  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  // ── Mobile overlay animation ──────────────────────────────────────
  useGSAP(() => {
    const overlay = overlayRef.current
    if (!overlay) return

    if (menuOpen) {
      gsap.set(overlay, { display: 'flex' })
      gsap.fromTo(overlay,
        { clipPath: 'inset(0 0 100% 0)' },
        { clipPath: 'inset(0 0 0% 0)', duration: 0.65, ease: 'power4.inOut' }
      )
      gsap.fromTo(overlayItemsRef.current.filter(Boolean),
        { y: 48, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.07, duration: 0.55, delay: 0.25, ease: 'power3.out' }
      )
    } else {
      gsap.to(overlay, {
        clipPath: 'inset(0 0 100% 0)',
        duration: 0.55,
        ease: 'power4.inOut',
        onComplete: () => gsap.set(overlay, { display: 'none' }),
      })
    }
  }, { dependencies: [menuOpen] })

  const toggleMenu = () => setMenuOpen((v) => !v)
  const closeMenu  = () => setMenuOpen(false)

  return (
    <>
      <header
        ref={navRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          height: 'clamp(60px, 8vw, 80px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 clamp(1.25rem, 5vw, 4rem)',
          transition: 'border-color 0.3s, backdrop-filter 0.3s',
          borderBottom: scrolled ? '1px solid var(--hairline)' : '1px solid transparent',
          backdropFilter: scrolled ? 'blur(12px)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(12px)' : 'none',
        }}
      >
        {/* ── Logo ─── */}
        <div ref={logoRef} style={{ opacity: 0, flexShrink: 0 }}>
          <Link
            href="/"
            aria-label="Byte Broz home"
            style={{
              fontFamily: 'var(--font-display), Georgia, serif',
              fontSize: 'clamp(15px, 1.5vw, 18px)',
              fontWeight: 400,
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
              color: 'var(--white)',
              textDecoration: 'none',
              display: 'flex',
              alignItems: 'center',
              gap: '0.25rem',
            }}
          >
            Byte
            <span style={{ opacity: 0.35, margin: '0 1px' }}>/</span>
            Broz
          </Link>
        </div>

        {/* ── Desktop links (hidden < 768px) ─── */}
        <ul
          ref={desktopLinksRef}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 'clamp(1.5rem, 3vw, 2.5rem)',
            listStyle: 'none',
            margin: 0,
            padding: 0,
          }}
          className="nav-desktop-links"
        >
          {NAV_LINKS.map((link) => (
            <li key={link.label} style={{ opacity: 0 }}>
              <Link
                href={link.href}
                className="nav-link"
                style={{
                  fontSize: '11px',
                  letterSpacing: '0.16em',
                  textTransform: 'uppercase',
                  color: 'var(--muted)',
                  textDecoration: 'none',
                  transition: 'color 0.2s',
                }}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* ── Desktop CTA ─── */}
        <a
          ref={ctaRef}
          href="#contact"
          data-cursor-label="Talk"
          style={{
            opacity: 0,
            fontSize: '11px',
            letterSpacing: '0.16em',
            textTransform: 'uppercase',
            color: 'var(--white)',
            textDecoration: 'none',
            border: '1px solid var(--hairline)',
            padding: '0.6rem 1.25rem',
            transition: 'background 0.25s, color 0.25s, border-color 0.25s',
          }}
          className="nav-cta nav-desktop-links"
        >
          Let&apos;s Talk
        </a>

        {/* ── Hamburger (visible < 768px) ─── */}
        <button
          ref={menuBtnRef}
          onClick={toggleMenu}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          style={{
            opacity: 0,
            background: 'none',
            border: 'none',
            padding: '8px',
            display: 'flex',
            flexDirection: 'column',
            gap: '5px',
            cursor: 'none',
          }}
          className="nav-hamburger"
        >
          <span
            style={{
              display: 'block',
              width: 22,
              height: 1,
              backgroundColor: 'var(--white)',
              transition: 'transform 0.3s, opacity 0.3s',
              transformOrigin: 'center',
              transform: menuOpen ? 'rotate(45deg) translate(4px, 4px)' : 'none',
            }}
          />
          <span
            style={{
              display: 'block',
              width: 14,
              height: 1,
              backgroundColor: 'var(--white)',
              transition: 'transform 0.3s, opacity 0.3s',
              opacity: menuOpen ? 0 : 1,
              transform: menuOpen ? 'translateX(-6px)' : 'none',
            }}
          />
          <span
            style={{
              display: 'block',
              width: 22,
              height: 1,
              backgroundColor: 'var(--white)',
              transition: 'transform 0.3s, opacity 0.3s',
              transformOrigin: 'center',
              transform: menuOpen ? 'rotate(-45deg) translate(4px, -4px)' : 'none',
            }}
          />
        </button>
      </header>

      {/* ════════════════════════════════════════════════════════
          MOBILE FULLSCREEN OVERLAY
      ════════════════════════════════════════════════════════ */}
      <div
        ref={overlayRef}
        style={{
          display: 'none',
          position: 'fixed',
          inset: 0,
          zIndex: 40,
          backgroundColor: '#0a0a0a',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          padding: 'clamp(1.5rem, 5vw, 3rem)',
          clipPath: 'inset(0 0 100% 0)',
        }}
      >
        {/* Top brand line inside overlay */}
        <div
          ref={(el) => { if (el) overlayItemsRef.current[0] = el }}
          style={{
            position: 'absolute',
            top: 'clamp(1.25rem, 5vw, 2.5rem)',
            left: 'clamp(1.25rem, 5vw, 2.5rem)',
            opacity: 0,
          }}
        >
          <span
            style={{
              fontSize: '11px',
              letterSpacing: '0.16em',
              textTransform: 'uppercase',
              color: 'var(--muted)',
            }}
          >
            Byte Broz
          </span>
        </div>

        {/* Nav links */}
        <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
          {NAV_LINKS.map((link, i) => (
            <Link
              key={link.label}
              href={link.href}
              onClick={closeMenu}
              ref={(el) => { if (el) overlayItemsRef.current[i + 1] = el }}
              style={{
                fontFamily: 'var(--font-display), Georgia, serif',
                fontSize: 'clamp(44px, 12vw, 96px)',
                fontWeight: 300,
                lineHeight: 1,
                letterSpacing: '-0.025em',
                color: 'var(--white)',
                textDecoration: 'none',
                opacity: 0,
                display: 'block',
                transition: 'color 0.2s',
              }}
              className="overlay-link"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Bottom meta */}
        <div
          ref={(el) => { if (el) overlayItemsRef.current[NAV_LINKS.length + 1] = el }}
          style={{
            marginTop: '3rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            opacity: 0,
          }}
        >
          <span style={{ fontSize: '11px', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--muted)' }}>
            © 2026 Byte Broz
          </span>
          <a
            href="#contact"
            onClick={closeMenu}
            style={{
              fontSize: '11px',
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: 'var(--white)',
              textDecoration: 'none',
              borderBottom: '1px solid var(--hairline)',
              paddingBottom: '2px',
            }}
          >
            Let&apos;s Talk
          </a>
        </div>
      </div>
    </>
  )
}
