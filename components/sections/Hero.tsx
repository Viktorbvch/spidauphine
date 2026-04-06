'use client'

import Image from 'next/image'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import CountdownTimer from '@/components/ui/CountdownTimer'

/* ── Helpers ────────────────────────────────────────────────── */
const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, delay, ease: [0.25, 0.1, 0.25, 1] as const },
})

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '25%'])
  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.15])
  const contentOpacity = useTransform(scrollYProgress, [0, 0.45], [1, 0])
  const contentY = useTransform(scrollYProgress, [0, 0.45], [0, -60])

  return (
    <section
      id="hero"
      ref={ref}
      className="relative h-screen min-h-[600px] overflow-hidden flex flex-col justify-end"
      aria-label="Challenge SPI Dauphine — 45ème édition"
    >
      {/* ── Background photo with parallax ── */}
      <motion.div className="absolute inset-0" style={{ y: bgY, scale: bgScale }}>
        <Image
          src="/photos/spi-09.jpg"
          alt="Voiliers en régate lors du Challenge SPI Dauphine"
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
      </motion.div>

      {/* ── Gradient overlays — cinematic depth ── */}
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(to bottom, rgba(7,13,31,0.10) 0%, rgba(7,13,31,0.25) 40%, rgba(7,13,31,0.70) 75%, rgba(7,13,31,0.95) 100%)',
        }}
        aria-hidden="true"
      />
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(to right, rgba(7,13,31,0.55) 0%, transparent 55%)',
        }}
        aria-hidden="true"
      />

      {/* ── Vignette haute — cinématique ── */}
      <div
        className="absolute top-0 left-0 right-0 h-48"
        style={{ background: 'linear-gradient(to bottom, rgba(7,13,31,0.40), transparent)' }}
        aria-hidden="true"
      />

      {/* ── Main content — anchored to bottom ── */}
      <motion.div
        style={{ opacity: contentOpacity, y: contentY }}
        className="relative z-10 max-w-7xl mx-auto w-full px-5 sm:px-8 lg:px-10 pb-14 sm:pb-20 lg:pb-28"
      >
        <div className="max-w-2xl lg:max-w-3xl">

          {/* Edition tag — monospace, data-feel */}
          <motion.div
            {...fadeUp(0.15)}
            className="flex items-center gap-3 mb-8"
          >
            <div className="h-px w-8 bg-[#3DB8A4]/50" />
            <p
              className="text-[10px] font-bold uppercase tracking-[0.4em]"
              style={{
                fontFamily: 'var(--font-mono)',
                color: 'rgba(61,184,164,0.8)',
                textShadow: '0 1px 8px rgba(0,0,0,0.6)',
              }}
            >
              45ème édition · Depuis 1981
            </p>
          </motion.div>

          {/* Title — grand, Instrument Serif */}
          <motion.h1
            {...fadeUp(0.28)}
            style={{
              fontFamily: 'var(--font-playfair)',
              fontSize: 'var(--text-hero)',
              fontWeight: 400,
              lineHeight: 1.02,
              color: '#ffffff',
              letterSpacing: '-0.02em',
              textShadow: '0 2px 30px rgba(0,0,0,0.45)',
            }}
            className="mb-6"
          >
            Challenge{' '}
            <span
              style={{
                color: '#C8A24D',
                fontStyle: 'italic',
              }}
            >
              SPI
            </span>
            <br />
            Dauphine
          </motion.h1>

          {/* Description — wider, editorial */}
          <motion.p
            {...fadeUp(0.40)}
            className="text-white/55 max-w-lg mb-8 leading-relaxed"
            style={{
              fontSize: 'var(--text-body)',
              textShadow: '0 1px 8px rgba(0,0,0,0.5)',
            }}
          >
            Régate universitaire européenne en Méditerranée — une semaine,
            près de 1&nbsp;000 étudiants, sous l&apos;égide de la Fédération
            Française de Voile.
          </motion.p>

          {/* Location + date row */}
          <motion.div
            {...fadeUp(0.50)}
            className="flex flex-wrap items-center gap-x-5 gap-y-2 mb-10"
          >
            <p
              className="text-white/75 font-light tracking-wide"
              style={{
                fontSize: 'var(--text-subhead)',
                fontFamily: 'var(--font-playfair)',
                fontStyle: 'italic',
                textShadow: '0 1px 10px rgba(0,0,0,0.55)',
              }}
            >
              Marina di Imperia, Italie
            </p>
            <span className="text-white/20 hidden sm:inline">|</span>
            <p
              className="text-white/40 text-xs uppercase tracking-[0.25em] font-semibold"
              style={{
                fontFamily: 'var(--font-mono)',
                textShadow: '0 1px 6px rgba(0,0,0,0.5)',
              }}
            >
              18 — 25 Avril 2026
            </p>
          </motion.div>

          {/* Countdown — compact, single line */}
          <motion.div
            {...fadeUp(0.60)}
          >
            <p
              className="text-white/30 text-[10px] font-semibold uppercase tracking-[0.32em] mb-3"
              style={{
                fontFamily: 'var(--font-mono)',
                textShadow: '0 1px 6px rgba(0,0,0,0.5)',
              }}
            >
              Départ dans
            </p>
            <CountdownTimer compact />
          </motion.div>

        </div>
      </motion.div>

      {/* ── Scroll indicator ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 0.8 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 pointer-events-none"
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="w-[1px] h-8 bg-gradient-to-b from-white/40 to-transparent"
        />
        <span
          className="text-white/25 text-[9px] uppercase tracking-[0.35em]"
          style={{ fontFamily: 'var(--font-mono)' }}
        >
          Scroll
        </span>
      </motion.div>
    </section>
  )
}
