import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: {
    default: 'PicoMini CTF 2025 Write-ups | Cybersecurity Challenge Solutions',
    template: '%s | PicoMini CTF 2025 Write-ups'
  },
  description: 'Comprehensive collection of detailed write-ups for PicoMini CTF 2025 challenges. Learn cybersecurity through hands-on solutions covering Web Exploitation, Reverse Engineering, Cryptography, Forensics, Binary Exploitation, and General Skills.',
  keywords: [
    'PicoMini CTF 2025',
    'CTF write-ups',
    'cybersecurity challenges',
    'web exploitation',
    'reverse engineering',
    'cryptography',
    'forensics',
    'binary exploitation',
    'penetration testing',
    'security research'
  ],
  authors: [{ name: 'Siddharth Sehgal' }],
  creator: 'Siddharth Sehgal',
  publisher: 'Siddharth Sehgal',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://picomini2025-writeups.vercel.app'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://picomini2025-writeups.vercel.app',
    title: 'PicoMini CTF 2025 Write-ups | Cybersecurity Challenge Solutions',
    description: 'Comprehensive collection of detailed write-ups for PicoMini CTF 2025 challenges. Learn cybersecurity through hands-on solutions.',
    siteName: 'PicoMini CTF 2025 Write-ups',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'PicoMini CTF 2025 Write-ups',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PicoMini CTF 2025 Write-ups | Cybersecurity Challenge Solutions',
    description: 'Comprehensive collection of detailed write-ups for PicoMini CTF 2025 challenges. Learn cybersecurity through hands-on solutions.',
    images: ['/og-image.png'],
    creator: '@sidddevcs',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="min-h-screen bg-gray-50 flex flex-col">
          <Navigation />
          <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  )
}