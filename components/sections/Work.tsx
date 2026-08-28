'use client'

import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { projects } from '@/data/projects'
import { usePreloader } from '@/contexts/PreloaderContext'

gsap.registerPlugin(ScrollTrigger)

export default function Work() {
  const containerRef = useRef<HTMLElement>(null)
  const { isLoaded } = usePreloader()

  useGSAP(() => {
    if (!isLoaded) return

    const projectElements = gsap.utils.toArray<HTMLElement>('.project-item')

    projectElements.forEach((project) => {
      const image = project.querySelector('.project-image')
      const info = project.querySelector('.project-info')
      const line = project.querySelector('.project-line')

      // Parallax image
      gsap.fromTo(
        image,
        { scale: 1.15, yPercent: -5 },
        {
          scale: 1,
          yPercent: 5,
          ease: 'none',
          scrollTrigger: {
            trigger: project,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.2,
          },
        }
      )

      // Reveal info & line
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: project,
          start: 'top 85%',
          end: 'top 50%',
          toggleActions: 'play none none reverse',
        },
      })

      tl.fromTo(
        line,
        { scaleX: 0 },
        { scaleX: 1, duration: 1.2, ease: 'power4.inOut', transformOrigin: 'left' }
      ).fromTo(
        info,
        { opacity: 0, y: 40, filter: 'blur(10px)' },
        { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1, ease: 'power4.out' },
        '-=0.8'
      )
    })
  }, { dependencies: [isLoaded], scope: containerRef })

  return (
    <section ref={containerRef} id="work" style={{ paddingTop: '8rem', paddingBottom: '10rem', backgroundColor: 'var(--black)' }}>
      <div style={{ padding: '0 clamp(1.25rem, 5vw, 4rem)', marginBottom: '8rem' }}>
        <h2 
          className="font-display" 
          style={{ fontSize: 'clamp(48px, 9vw, 120px)', fontWeight: 300, letterSpacing: '-0.02em', color: 'var(--white)' }}
        >
          Selected Work.
        </h2>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '10rem' }}>
        {projects.map((project, idx) => (
          <ProjectItem key={project.id} project={project} index={idx} />
        ))}
      </div>
    </section>
  )
}

function ProjectItem({ project, index }: { project: any; index: number }) {
  const itemRef = useRef<HTMLDivElement>(null)
  
  const handleMouseEnter = () => {
    // Wrapper scales down slightly for an editorial inset feel
    gsap.to(itemRef.current?.querySelector('.project-image-wrapper'), {
      scale: 0.98,
      duration: 0.8,
      ease: 'power3.out'
    })
    // Image scales up subtly
    gsap.to(itemRef.current?.querySelector('.project-image'), {
      scale: 1.05,
      duration: 0.8,
      ease: 'power3.out'
    })
    // Title shifts right
    gsap.to(itemRef.current?.querySelector('.project-title'), {
      x: 16,
      color: 'var(--white)',
      duration: 0.6,
      ease: 'power3.out'
    })
    // Metadata shifts left slightly
    gsap.to(itemRef.current?.querySelector('.project-meta'), {
      x: -8,
      duration: 0.6,
      ease: 'power3.out'
    })
  }

  const handleMouseLeave = () => {
    gsap.to(itemRef.current?.querySelector('.project-image-wrapper'), {
      scale: 1,
      duration: 0.8,
      ease: 'power3.out'
    })
    gsap.to(itemRef.current?.querySelector('.project-image'), {
      scale: 1,
      duration: 0.8,
      ease: 'power3.out'
    })
    gsap.to(itemRef.current?.querySelector('.project-title'), {
      x: 0,
      color: 'var(--off-white)',
      duration: 0.6,
      ease: 'power3.out'
    })
    gsap.to(itemRef.current?.querySelector('.project-meta'), {
      x: 0,
      duration: 0.6,
      ease: 'power3.out'
    })
  }

  return (
    <div 
      ref={itemRef}
      className="project-item"
      style={{
        padding: '0 clamp(1.25rem, 5vw, 4rem)',
        display: 'flex',
        flexDirection: 'column',
        gap: '2.5rem',
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div 
        className="project-line"
        style={{ width: '100%', height: '1px', backgroundColor: 'var(--hairline)' }}
      />
      
      <div 
        className="project-info"
        style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '2rem' }}
      >
        <div>
          <span className="label" style={{ display: 'block', marginBottom: '1rem', color: 'var(--muted)' }}>
            {project.number}
          </span>
          <h3 
            className="font-display project-title" 
            style={{ fontSize: 'clamp(36px, 6vw, 84px)', fontWeight: 300, color: 'var(--off-white)', lineHeight: 1, letterSpacing: '-0.02em' }}
          >
            {project.title}
          </h3>
        </div>
        <div className="project-meta" style={{ textAlign: 'right' }}>
          <p className="label" style={{ color: 'var(--off-white)' }}>{project.category}</p>
          <p className="label" style={{ marginTop: '0.5rem', color: 'var(--muted)' }}>{project.year}</p>
        </div>
      </div>

      <div 
        className="project-image-wrapper"
        style={{
          position: 'relative',
          width: '100%',
          height: 'clamp(60vh, 80vh, 900px)',
          overflow: 'hidden',
          backgroundColor: '#111',
          willChange: 'transform'
        }}
        data-cursor-label="View"
      >
        <img 
          className="project-image"
          src={project.image} 
          alt={project.title} 
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            willChange: 'transform'
          }}
        />
      </div>
    </div>
  )
}
