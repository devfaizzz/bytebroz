'use client'

import { useRef, useEffect } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { services } from '@/data/services'
import { usePreloader } from '@/contexts/PreloaderContext'

gsap.registerPlugin(ScrollTrigger)

export default function Services() {
  const containerRef = useRef<HTMLElement>(null)
  const { isLoaded } = usePreloader()

  useGSAP(() => {
    if (!isLoaded) return

    const rows = gsap.utils.toArray<HTMLElement>('.service-row')

    rows.forEach((row) => {
      const line = row.querySelector('.service-line')
      const content = row.querySelector('.service-content')

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: row,
          start: 'top 85%',
          end: 'top 50%',
          toggleActions: 'play none none reverse',
        },
      })

      tl.fromTo(line, 
        { scaleX: 0 }, 
        { scaleX: 1, duration: 1.2, ease: 'power4.inOut', transformOrigin: 'left' }
      ).fromTo(content,
        { opacity: 0, y: 30, filter: 'blur(10px)' },
        { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1, ease: 'power4.out' },
        '-=0.8'
      )
    })
  }, { dependencies: [isLoaded], scope: containerRef })

  return (
    <section ref={containerRef} id="services" style={{ padding: '8rem 0', backgroundColor: 'var(--black)' }}>
      <div style={{ padding: '0 clamp(1.25rem, 5vw, 4rem)', marginBottom: '8rem' }}>
        <h2 
          className="font-display" 
          style={{ fontSize: 'clamp(48px, 9vw, 120px)', fontWeight: 300, letterSpacing: '-0.02em', color: 'var(--white)' }}
        >
          Expertise.
        </h2>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {services.map((service, idx) => (
          <ServiceRow key={service.id} service={service} index={idx} />
        ))}
        {/* Final bottom line */}
        <div style={{ padding: '0 clamp(1.25rem, 5vw, 4rem)' }} className="service-row">
          <div className="service-line" style={{ width: '100%', height: '1px', backgroundColor: 'var(--hairline)' }} />
        </div>
      </div>
    </section>
  )
}

function ServiceRow({ service, index }: { service: any; index: number }) {
  const rowRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  
  const handleMouseEnter = () => {
    gsap.to(imageRef.current, {
      opacity: 1,
      scale: 1,
      y: 0,
      duration: 0.6,
      ease: 'power3.out'
    })
    gsap.to(titleRef.current, {
      x: 30,
      color: 'var(--white)',
      duration: 0.6,
      ease: 'power3.out'
    })
    const desc = rowRef.current?.querySelector('.service-desc')
    if (desc) {
      gsap.to(desc, {
        opacity: 0.4,
        x: -20,
        duration: 0.6,
        ease: 'power3.out'
      })
    }
  }

  const handleMouseLeave = () => {
    gsap.to(imageRef.current, {
      opacity: 0,
      scale: 0.85,
      y: 20,
      duration: 0.6,
      ease: 'power3.out'
    })
    gsap.to(titleRef.current, {
      x: 0,
      color: 'var(--off-white)',
      duration: 0.6,
      ease: 'power3.out'
    })
    const desc = rowRef.current?.querySelector('.service-desc')
    if (desc) {
      gsap.to(desc, {
        opacity: 1,
        x: 0,
        duration: 0.6,
        ease: 'power3.out'
      })
    }
  }

  // Mouse move parallax for the image reveal
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!imageRef.current || !rowRef.current) return
    const rect = rowRef.current.getBoundingClientRect()
    // Calculate position relative to row
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    
    // Smoothly animate the image to follow cursor roughly, centering on cursor
    gsap.to(imageRef.current, {
      x: x - 175, // Half of image width (350/2)
      y: y - 110, // Half of image height (220/2)
      duration: 0.8,
      ease: 'power3.out'
    })
  }

  return (
    <div 
      ref={rowRef}
      className="service-row"
      style={{ padding: '0 clamp(1.25rem, 5vw, 4rem)', position: 'relative' }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
    >
      <div 
        className="service-line"
        style={{ width: '100%', height: '1px', backgroundColor: 'var(--hairline)' }}
      />
      <div 
        className="service-content"
        style={{ 
          position: 'relative',
          display: 'grid', 
          gridTemplateColumns: '1fr', 
          padding: 'clamp(3rem, 5vw, 6rem) 0',
          gap: '2rem',
          cursor: 'pointer'
        }}
        data-cursor-label="Explore"
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '2rem', zIndex: 2 }}>
          <span className="label" style={{ color: 'var(--muted)', width: '30px' }}>{service.number}</span>
          <h3 
            ref={titleRef}
            className="font-display" 
            style={{ fontSize: 'clamp(36px, 6vw, 84px)', fontWeight: 300, color: 'var(--off-white)', margin: 0, lineHeight: 1 }}
          >
            {service.title}
          </h3>
        </div>
        
        <div className="service-desc" style={{ display: 'flex', alignItems: 'center', zIndex: 2 }}>
          <p style={{ maxWidth: '320px', color: 'var(--muted)', fontSize: '15px', lineHeight: 1.6 }}>
            {service.description}
          </p>
        </div>
      </div>

      {/* Hover Image Reveal - absolute positioned floating */}
      <div 
        ref={imageRef}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '350px',
          height: '220px',
          opacity: 0,
          pointerEvents: 'none',
          zIndex: 1,
          overflow: 'hidden',
          willChange: 'transform, opacity'
        }}
      >
        <img 
          src={service.image} 
          alt={service.title}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
      </div>
      
      {/* CSS for grid layout on tablet+ */}
      <style>{`
        @media (min-width: 768px) {
          .service-content {
            grid-template-columns: 1fr auto !important;
            justify-content: space-between;
          }
          .service-desc {
            justify-content: flex-end;
            text-align: right;
          }
        }
      `}</style>
    </div>
  )
}
