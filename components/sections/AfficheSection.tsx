'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { Download } from 'lucide-react'

export default function AfficheSection() {
  return (
    <section
      id="affiche"
      className="py-20 lg:py-28 bg-[#071A35] overflow-hidden"
      aria-label="Affiche officielle 45ème édition"
    >
      <div className="max-w-5xl mx-auto px-6 sm:px-8 text-center">
        {/* Eyebrow */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-[#0BBFBF] text-xs font-semibold uppercase tracking-[0.3em] mb-4"
        >
          45ème Challenge SPI Dauphine
        </motion.p>

        {/* Title */}
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, delay: 0.1 }}
          className="text-white mb-14"
          style={{
            fontFamily: 'var(--font-playfair)',
            fontSize: 'clamp(1.8rem, 4vw, 3rem)',
            fontWeight: 700,
            lineHeight: 1.2,
          }}
        >
          L&apos;Affiche{' '}
          <span style={{ color: '#E8A930' }}>Officielle</span>
        </motion.h2>

        {/* Affiche grande taille */}
        <motion.div
          initial={{ opacity: 0, y: 24, scale: 0.97 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
          className="relative inline-block mb-10"
        >
          <div
            className="relative mx-auto rounded-2xl overflow-hidden"
            style={{
              width: 'min(420px, 85vw)',
              aspectRatio: '210 / 297',
              boxShadow: '0 40px 100px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.05)',
            }}
          >
            <Image
              src="/assets/affiche-45.png"
              alt="Affiche officielle 45ème Challenge SPI Dauphine — Marina di Imperia, 18 au 25 avril 2026"
              fill
              className="object-cover"
              sizes="(max-width: 640px) 85vw, 420px"
            />
          </div>

          {/* Halo glow effect */}
          <div
            className="absolute inset-0 rounded-2xl pointer-events-none"
            style={{
              background: 'radial-gradient(ellipse at center, rgba(14,191,191,0.06) 0%, transparent 70%)',
            }}
            aria-hidden="true"
          />
        </motion.div>

        {/* Download CTA */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.45 }}
        >
          <a
            href="/assets/affiche-45.png"
            download="affiche-challenge-spi-dauphine-45.png"
            className="inline-flex items-center gap-2.5 border border-white/20 rounded-full px-7 py-3 text-white/70 text-sm font-medium hover:bg-white/8 hover:text-white hover:border-white/40 transition-all duration-300 cursor-pointer"
          >
            <Download className="w-4 h-4" aria-hidden="true" />
            Télécharger l&apos;affiche
          </a>
        </motion.div>
      </div>
    </section>
  )
}
