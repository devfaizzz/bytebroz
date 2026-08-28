'use client'

import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'
import { usePreloader } from '@/contexts/PreloaderContext'

gsap.registerPlugin(ScrollTrigger, SplitText)

export default function About() {
  const containerRef = useRef<HTMLElement>(null)
  const textRef = useRef<HTMLParagraphElement>(null)
  const { isLoaded } = usePreloader()

  useGSAP(() => {
    if (!isLoaded || !textRef.current) return

    const split = new SplitText(textRef.current, { type: 'lines' })
    
    // Wrap each line in an overflow clip
    split.lines.forEach((line) => {
      const wrapper = document.createElement('div')
      wrapper.style.overflow = 'hidden'
      wrapper.style.display  = 'block'
      line.parentNode?.insertBefore(wrapper, line)
      wrapper.appendChild(line)
    })

    gsap.fromTo(split.lines, 
      { yPercent: 120, opacity: 0 },
      {
        yPercent: 0,
        opacity: 1,
        duration: 1.2,
        stagger: 0.1,
        ease: 'power4.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%',
          end: 'center center',
          toggleActions: 'play none none reverse',
        }
      }
    )

    return () => split.revert()
  }, { dependencies: [isLoaded], scope: containerRef })

  return (
    <section ref={containerRef} id="about" style={{ padding: '15rem 0', backgroundColor: 'var(--black)' }}>
      <div style={{ padding: '0 clamp(1.25rem, 5vw, 4rem)', maxWidth: '1400px', margin: '0 auto' }}>
        <p 
          ref={textRef}
          className="font-display" 
          style={{ 
            fontSize: 'clamp(32px, 5vw, 76px)', 
            fontWeight: 300, 
            lineHeight: 1.1, 
            color: 'var(--white)',
            letterSpacing: '-0.02em'
          }}
        >
          We are a digital studio focused on creating immersive and interactive experiences. We believe in the power of design and technology to elevate brands and build lasting connections in the digital world.
        </p>
      </div>
    </section>
  )
}
