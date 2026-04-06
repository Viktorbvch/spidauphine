'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

const cards = [
  {
    href: '/village',
    photo: '/photos/spi-soiree-chapiteau.jpg',
    title: 'Le Village',
    subtitle: 'Vie du village · Journée type · Soirées',
  },
  {
    href: '/engagement',
    photo: '/photos/aftersea.jpg',
    title: "SPI s'engage",
    subtitle: 'Histoire · Valeurs · Engagements RSE',
  },
  {
    href: '/partenaires',
    photo: '/photos/spi-01.jpg',
    title: 'Partenaires',
    subtitle: 'Sponsoring · Visibilité · Offres',
  },
] as const

export default function DiscoverGrid() {
  return (
    <section
      aria-label="Explorer le Challenge SPI Dauphine"
      style={{ background: '#070D1F', borderTop: '1px solid rgba(255,255,255,0.06)' }}
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 py-16 sm:py-24 lg:py-32">

        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-3 mb-6"
        >
          <div className="h-px w-8 bg-[#3DB8A4]/40" />
          <p
            className="text-[10px] font-bold uppercase tracking-[0.4em]"
            style={{ fontFamily: 'var(--font-mono)', color: 'rgba(61,184,164,0.65)' }}
          >
            Explorer
          </p>
        </motion.div>

        {/* Title */}
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-white mb-8 sm:mb-14"
          style={{
            fontFamily: 'var(--font-playfair)',
            fontSize: 'var(--text-heading)',
            fontWeight: 400,
            lineHeight: 1.15,
          }}
        >
          Prolonger{' '}
          <span style={{ color: '#C8A24D', fontStyle: 'italic' }}>l&apos;expérience</span>
        </motion.h2>

        {/* Cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 lg:gap-6">
          {cards.map((card, i) => (
            <motion.div
              key={card.href}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '0px' }}
              transition={{ duration: 0.6, delay: 0.15 + i * 0.1 }}
            >
              <Link
                href={card.href}
                className="group relative overflow-hidden rounded-2xl block aspect-[3/2] sm:aspect-[4/5]"
              >
                <Image
                  src={card.photo}
                  alt={card.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, 33vw"
                />
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      'linear-gradient(to top, rgba(7,13,31,0.92) 0%, rgba(7,13,31,0.25) 50%, transparent 100%)',
                  }}
                  aria-hidden="true"
                />
                <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-7">
                  <p
                    className="font-semibold uppercase mb-2"
                    style={{
                      color: '#C8A24D',
                      fontSize: 10,
                      letterSpacing: '0.22em',
                      fontFamily: 'var(--font-mono)',
                    }}
                  >
                    {card.subtitle}
                  </p>
                  <div className="flex items-center justify-between">
                    <h3
                      className="text-white text-xl"
                      style={{ fontFamily: 'var(--font-playfair)' }}
                    >
                      {card.title}
                    </h3>
                    <ArrowRight
                      className="w-4 h-4 text-white/25 group-hover:text-white group-hover:translate-x-1 transition-all duration-300 flex-shrink-0"
                      aria-hidden="true"
                    />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  )
}
