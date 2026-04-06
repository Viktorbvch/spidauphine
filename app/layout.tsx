import type { Metadata } from 'next'
import { Instrument_Serif, Plus_Jakarta_Sans, JetBrains_Mono } from 'next/font/google'
import './globals.css'

/* ── Fonts ─────────────────────────────────────────────────────── */

// Display serif — titres h1/h2, sections monumentales
// Variable gardée comme --font-playfair pour compatibilité downstream
const displaySerif = Instrument_Serif({
  subsets: ['latin'],
  weight: ['400'],
  style: ['normal', 'italic'],
  variable: '--font-playfair',
  display: 'swap',
})

// Sans-serif — navigation, body, boutons
const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-jakarta',
  display: 'swap',
})

// Monospace — labels, compteurs, tags, données
const mono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-mono',
  display: 'swap',
})

/* ── Metadata ──────────────────────────────────────────────────── */

export const metadata: Metadata = {
  title: 'Challenge SPI Dauphine — 45ème édition | Marina di Imperia, Avril 2026',
  description:
    'Régate universitaire européenne en Méditerranée. 1 000 étudiants, 36 équipages, 7 jours de voile et de sport à Marina di Imperia — 45ème édition, 18–25 Avril 2026.',
  keywords: [
    'SPI Dauphine', 'régate étudiante', 'voile', 'Méditerranée',
    'Imperia', 'Ligurie', 'Challenge étudiant', 'FFVoile', 'Dauphine-PSL',
  ],
  authors: [{ name: 'Association SPI Dauphine' }],
  openGraph: {
    title: 'Challenge SPI Dauphine — 45ème édition',
    description:
      'Régate universitaire européenne en Méditerranée. 1 000 étudiants, 36 équipages, 7 jours de voile à Marina di Imperia.',
    url: 'https://www.spidauphine.com',
    siteName: 'Challenge SPI Dauphine',
    locale: 'fr_FR',
    type: 'website',
    images: [
      {
        url: 'https://www.spidauphine.com/photos/spi-09.jpg',
        width: 1200,
        height: 630,
        alt: 'Challenge SPI Dauphine — régate universitaire Méditerranée, Marina di Imperia',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Challenge SPI Dauphine — 45ème édition',
    description:
      'Régate universitaire européenne à Marina di Imperia — 18–25 Avril 2026.',
  },
}

/* ── Schema.org Event ──────────────────────────────────────────── */

const eventSchema = {
  '@context': 'https://schema.org',
  '@type': 'SportsEvent',
  name: 'Challenge SPI Dauphine — 45ème édition',
  description:
    'Régate universitaire européenne en Méditerranée. 1 000 étudiants, 36 équipages, 7 jours de voile à Marina di Imperia.',
  startDate: '2026-04-18',
  endDate: '2026-04-25',
  location: {
    '@type': 'Place',
    name: 'Marina di Imperia',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Imperia',
      addressRegion: 'Ligurie',
      addressCountry: 'IT',
    },
  },
  organizer: {
    '@type': 'Organization',
    name: 'Association SPI Dauphine',
    url: 'https://www.spidauphine.com',
  },
  sport: 'Sailing',
}

/* ── Layout ────────────────────────────────────────────────────── */

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="fr"
      className={`${displaySerif.variable} ${jakarta.variable} ${mono.variable} h-full`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(eventSchema) }}
        />
      </head>
      <body
        className="min-h-full flex flex-col relative"
        style={{ fontFamily: 'var(--font-jakarta), system-ui, sans-serif' }}
      >
        {/* Grain photographique — texture argentique subtile */}
        <div
          aria-hidden="true"
          className="fixed inset-0 pointer-events-none"
          style={{
            zIndex: 9999,
            opacity: 0.018,
            mixBlendMode: 'overlay',
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
            backgroundRepeat: 'repeat',
            backgroundSize: '200px 200px',
          }}
        />
        {children}
      </body>
    </html>
  )
}
