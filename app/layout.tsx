import type { Metadata } from 'next'
import { Playfair_Display, Plus_Jakarta_Sans } from 'next/font/google'
import './globals.css'

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '900'],
  style: ['normal', 'italic'],
  variable: '--font-playfair',
  display: 'swap',
})

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-jakarta',
  display: 'swap',
})

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
        url: 'https://images.unsplash.com/photo-1569263979104-865ab7cd8d13?w=1200&q=80',
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

/* ── Schema.org Event (SEO structuré) ─────────────────────────── */
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

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="fr"
      className={`${playfair.variable} ${jakarta.variable} h-full`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(eventSchema) }}
        />
      </head>
      <body
        className="min-h-full flex flex-col"
        style={{ fontFamily: 'var(--font-jakarta), system-ui, sans-serif' }}
      >
        {children}
      </body>
    </html>
  )
}
