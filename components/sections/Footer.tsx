'use client'

import { useRef, useState } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { usePreloader } from '@/contexts/PreloaderContext'

gsap.registerPlugin(ScrollTrigger)

export default function Footer() {
  const containerRef = useRef<HTMLElement>(null)
  const formRef = useRef<HTMLFormElement>(null)
  const { isLoaded } = usePreloader()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formStatus, setFormStatus] = useState<null | 'success' | 'error'>(null)

  useGSAP(() => {
    if (!isLoaded) return

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 75%',
        end: 'bottom bottom',
        toggleActions: 'play none none reverse',
      }
    })

    tl.fromTo('.footer-heading', 
      { yPercent: 40, opacity: 0, filter: 'blur(10px)' },
      { yPercent: 0, opacity: 1, filter: 'blur(0px)', duration: 1.2, ease: 'power4.out' }
    )
    .fromTo('.footer-form-wrapper',
      { y: 40, opacity: 0, filter: 'blur(10px)' },
      { y: 0, opacity: 1, filter: 'blur(0px)', duration: 1.2, ease: 'power4.out' },
      '-=0.8'
    )
    .fromTo('.footer-bottom',
      { opacity: 0 },
      { opacity: 1, duration: 1, ease: 'power2.out' },
      '-=0.5'
    )

  }, { dependencies: [isLoaded], scope: containerRef })

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    setFormStatus(null)

    const formData = new FormData(e.currentTarget)
    
    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData
      })
      const data = await response.json()
      if (data.success) {
        setFormStatus('success')
        formRef.current?.reset()
      } else {
        setFormStatus('error')
      }
    } catch (err) {
      setFormStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section ref={containerRef} id="contact" style={{ backgroundColor: 'var(--black)', position: 'relative', overflow: 'hidden' }}>
      
      {/* Reuse breathing gradient but position it relative to the footer */}
      <div className="gradient-bg-breath" style={{ top: '50%', bottom: 'auto', transform: 'translate(-50%, -50%)', opacity: 0.5 }} />

      <div style={{ padding: '10rem clamp(1.25rem, 5vw, 4rem) 2rem', position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', minHeight: '100svh' }}>
        
        <div style={{ flex: 1, display: 'grid', gridTemplateColumns: '1fr', gap: '6rem', alignItems: 'center' }} className="footer-grid">
          
          <div>
            <h2 
              className="font-display footer-heading" 
              style={{ fontSize: 'clamp(80px, 15vw, 220px)', fontWeight: 300, color: 'var(--white)', lineHeight: 0.9, letterSpacing: '-0.03em', margin: 0 }}
            >
              Let's<br/>Talk.
            </h2>
          </div>

          <div className="footer-form-wrapper" style={{ maxWidth: '500px', width: '100%' }}>
            <form ref={formRef} onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
              <input type="hidden" name="access_key" value="96e639a4-de3b-4ac9-95aa-826b905850c4" />
              
              <div className="input-group">
                <input type="text" name="name" required placeholder="Your Name" className="form-input" />
              </div>
              
              <div className="input-group">
                <input type="email" name="email" required placeholder="Email Address" className="form-input" />
              </div>

              <div className="input-group">
                <textarea name="message" required placeholder="Project Details" rows={4} className="form-input" style={{ resize: 'none' }}></textarea>
              </div>

              <button 
                type="submit" 
                disabled={isSubmitting}
                style={{
                  alignSelf: 'flex-start',
                  backgroundColor: 'transparent',
                  color: 'var(--white)',
                  border: '1px solid var(--hairline)',
                  padding: '1.25rem 3rem',
                  borderRadius: '100px',
                  fontSize: '12px',
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                  cursor: isSubmitting ? 'not-allowed' : 'pointer',
                  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                  opacity: isSubmitting ? 0.7 : 1,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem'
                }}
                onMouseEnter={(e) => {
                  if(!isSubmitting) {
                    e.currentTarget.style.backgroundColor = 'var(--white)'
                    e.currentTarget.style.color = 'var(--black)'
                  }
                }}
                onMouseLeave={(e) => {
                  if(!isSubmitting) {
                    e.currentTarget.style.backgroundColor = 'transparent'
                    e.currentTarget.style.color = 'var(--white)'
                  }
                }}
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>

              {formStatus === 'success' && <p style={{ color: '#4ade80', fontSize: '14px' }}>Message sent successfully. We'll be in touch soon.</p>}
              {formStatus === 'error' && <p style={{ color: '#f87171', fontSize: '14px' }}>Something went wrong. Please try again.</p>}

            </form>
          </div>
        </div>

        {/* Bottom Footer Row */}
        <div className="footer-bottom" style={{ marginTop: '8rem', display: 'flex', flexDirection: 'column', gap: '3rem', borderTop: '1px solid var(--hairline)', paddingTop: '3rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '2rem' }}>
            <span className="label" style={{ color: 'var(--white)', fontSize: '13px' }}>hello@bytebroz.studio</span>
            
            <div style={{ display: 'flex', gap: '2.5rem' }}>
              <a href="#" className="label" style={{ color: 'var(--muted)', textDecoration: 'none', transition: 'color 0.3s' }} onMouseEnter={(e) => e.currentTarget.style.color = 'var(--white)'} onMouseLeave={(e) => e.currentTarget.style.color = 'var(--muted)'}>Twitter</a>
              <a href="#" className="label" style={{ color: 'var(--muted)', textDecoration: 'none', transition: 'color 0.3s' }} onMouseEnter={(e) => e.currentTarget.style.color = 'var(--white)'} onMouseLeave={(e) => e.currentTarget.style.color = 'var(--muted)'}>Instagram</a>
              <a href="#" className="label" style={{ color: 'var(--muted)', textDecoration: 'none', transition: 'color 0.3s' }} onMouseEnter={(e) => e.currentTarget.style.color = 'var(--white)'} onMouseLeave={(e) => e.currentTarget.style.color = 'var(--muted)'}>LinkedIn</a>
            </div>
          </div>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '2rem' }}>
            <span className="label" style={{ color: 'var(--muted)', opacity: 0.5 }}>© 2026 Byte Broz Studio</span>
            <div style={{ display: 'flex', gap: '2rem' }}>
              <a href="#work" className="label" style={{ color: 'var(--muted)', textDecoration: 'none' }}>Work</a>
              <a href="#about" className="label" style={{ color: 'var(--muted)', textDecoration: 'none' }}>Studio</a>
              <a href="#services" className="label" style={{ color: 'var(--muted)', textDecoration: 'none' }}>Services</a>
            </div>
          </div>
        </div>
        
      </div>

      <style>{`
        .form-input {
          width: 100%;
          background: transparent;
          border: none;
          border-bottom: 1px solid var(--hairline);
          padding: 1rem 0;
          color: var(--white);
          font-family: var(--font-body);
          font-size: 16px;
          outline: none;
          transition: border-color 0.4s ease;
          border-radius: 0;
        }
        .form-input::placeholder {
          color: var(--muted);
          transition: color 0.4s ease;
        }
        .form-input:focus {
          border-bottom-color: var(--white);
        }
        .form-input:focus::placeholder {
          color: var(--off-white);
        }
        @media (min-width: 1024px) {
          .footer-grid {
            grid-template-columns: 1fr 1fr !important;
          }
          .footer-form-wrapper {
            margin-left: auto;
          }
        }
      `}</style>
    </section>
  )
}
