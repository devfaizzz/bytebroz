import Hero from '@/components/sections/Hero'

export default function HomePage() {
  return (
    <>
      <Hero />

      {/* Placeholder for future sections */}
      <div
        style={{
          height: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderTop: '1px solid var(--hairline)',
        }}
      >
        <p
          style={{
            fontFamily: 'var(--font-display), Georgia, serif',
            fontSize: 'clamp(24px, 4vw, 48px)',
            fontWeight: 300,
            color: 'var(--muted)',
            letterSpacing: '-0.02em',
          }}
        >
          More sections coming soon.
        </p>
      </div>
    </>
  )
}
