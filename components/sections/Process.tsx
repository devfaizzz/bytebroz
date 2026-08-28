'use client'

import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { process } from '@/data/process'
import { usePreloader } from '@/contexts/PreloaderContext'

gsap.registerPlugin(ScrollTrigger)

export default function Process() {
  const containerRef = useRef<HTMLElement>(null)
  const { isLoaded } = usePreloader()

  useGSAP(() => {
    if (!isLoaded) return

    const steps = gsap.utils.toArray<HTMLElement>('.process-step')

    steps.forEach((step) => {
      gsap.fromTo(step,
        { opacity: 0, y: 80, filter: 'blur(10px)' },
        {
          opacity: 1, 
          y: 0, 
          filter: 'blur(0px)',
          duration: 1.2, 
          ease: 'power4.out',
          scrollTrigger: {
            trigger: step,
            start: 'top 85%',
            end: 'top 60%',
            toggleActions: 'play none none reverse',
          }
        }
      )
    })
  }, { dependencies: [isLoaded], scope: containerRef })

  return (
    <section ref={containerRef} id="process" style={{ padding: '10rem 0', backgroundColor: 'var(--black)' }}>
      <div style={{ padding: '0 clamp(1.25rem, 5vw, 4rem)', marginBottom: '8rem' }}>
        <h2 
          className="font-display" 
          style={{ fontSize: 'clamp(48px, 9vw, 120px)', fontWeight: 300, letterSpacing: '-0.02em', color: 'var(--white)' }}
        >
          Our Process.
        </h2>
      </div>

      <div style={{ padding: '0 clamp(1.25rem, 5vw, 4rem)', display: 'flex', flexDirection: 'column', gap: '8rem' }}>
        {process.map((step) => (
          <div key={step.id} className="process-step" style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '2rem' }}>
            <h3 
              className="font-display" 
              style={{ fontSize: 'clamp(80px, 15vw, 200px)', fontWeight: 300, color: 'var(--hairline)', lineHeight: 0.8, margin: 0, letterSpacing: '-0.03em' }}
            >
              {step.number}
            </h3>
            <div style={{ paddingTop: '1rem', maxWidth: '400px' }}>
              <h4 className="font-display" style={{ fontSize: '32px', fontWeight: 300, color: 'var(--white)', marginBottom: '1.5rem', letterSpacing: '0.02em' }}>
                {step.title}
              </h4>
              <p style={{ color: 'var(--muted)', fontSize: '15px', lineHeight: 1.7 }}>
                {step.description}
              </p>
            </div>
            <style>{`
              @media (min-width: 768px) {
                .process-step {
                  grid-template-columns: 250px 1fr !important;
                  gap: 4rem !important;
                }
              }
              @media (min-width: 1024px) {
                .process-step {
                  grid-template-columns: 400px 1fr !important;
                  gap: 8rem !important;
                }
              }
            `}</style>
          </div>
        ))}
      </div>
    </section>
  )
}
