import type { Metadata } from 'next'
import { Playfair_Display, Inter } from 'next/font/google'
import './globals.css'

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '900'],
  style: ['normal', 'italic'],
  variable: '--font-playfair',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Challenge SPI Dauphine — 45ème édition | Cogolin, Avril 2026',
  description:
    "Le plus grand événement étudiant du sud de la France. 7 jours de voile, de sport, de fêtes et de rencontres dans le golfe de Saint-Tropez. 45ème édition du Challenge SPI Dauphine — Avril 2026.",
  keywords: ['SPI Dauphine', 'régate étudiante', 'voile', 'Méditerranée', 'Cogolin', 'Saint-Tropez', 'Challenge étudiant'],
  authors: [{ name: 'Association SPI Dauphine' }],
  openGraph: {
    title: 'Challenge SPI Dauphine — 45ème édition',
    description: 'Le plus grand événement étudiant du sud de la France. 7 jours de voile, sport et fête à Cogolin.',
    url: 'https://www.spidauphine.com',
    siteName: 'Challenge SPI Dauphine',
    locale: 'fr_FR',
    type: 'website',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1569263979104-865ab7cd8d13?w=1200&q=80',
        width: 1200,
        height: 630,
        alt: 'Challenge SPI Dauphine — régate étudiante Méditerranée',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Challenge SPI Dauphine — 45ème édition',
    description: 'Le plus grand événement étudiant du sud de la France.',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="fr"
      className={`${playfair.variable} ${inter.variable} h-full`}
    >
      <body
        className="min-h-full flex flex-col"
        style={{ fontFamily: 'var(--font-inter), system-ui, sans-serif' }}
      >
        {children}
      </body>
    </html>
  )
}
