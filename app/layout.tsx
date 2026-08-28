import type { Metadata } from 'next'
import { Cormorant_Garamond, Inter } from 'next/font/google'
import './globals.css'
import { PreloaderProvider } from '@/contexts/PreloaderContext'
import SmoothScrollProvider from '@/components/providers/SmoothScrollProvider'
import Navbar from '@/components/layout/Navbar'
import Preloader from '@/components/layout/Preloader'
import CustomCursor from '@/components/layout/CustomCursor'

const cormorant = Cormorant_Garamond({
  variable: '--font-cormorant',
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
})

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Byte Broz — Digital Creative Studio',
  description:
    'We craft immersive digital products for brands that refuse to be average. Strategy, design and code under one roof.',
  keywords: ['creative studio', 'web design', 'digital agency', 'UI/UX', 'Byte Broz'],
  authors: [{ name: 'Byte Broz' }],
  openGraph: {
    title: 'Byte Broz — Digital Creative Studio',
    description: 'Immersive digital products for ambitious brands.',
    type: 'website',
  },
}

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html lang="en" className={`${cormorant.variable} ${inter.variable}`}>
      <body>
        <PreloaderProvider>
          <SmoothScrollProvider>
            <CustomCursor />
            <Preloader />
            <Navbar />
            <main>{children}</main>
          </SmoothScrollProvider>
        </PreloaderProvider>
      </body>
    </html>
  )
}
