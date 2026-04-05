'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import CountdownTimer from '@/components/ui/CountdownTimer'

/* ── Helpers ────────────────────────────────────────────────── */
const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, delay, ease: "easeOut" as const },
})

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative h-screen min-h-[640px] overflow-hidden flex flex-col justify-end"
      aria-label="Challenge SPI Dauphine — 45ème édition"
    >
      {/* ── Background photo ── */}
      <Image
        src="/photos/spi-09.jpg"
        alt="Voiliers en régate lors du Challenge SPI Dauphine"
        fill
        priority
        className="object-cover object-center"
        sizes="100vw"
      />

      {/* ── Gradient overlay — transparent top, deep navy bottom ── */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/15 via-black/35 to-[#071A35]/95" aria-hidden="true" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#071A35]/50 via-transparent to-transparent" aria-hidden="true" />

      {/* ── Logo — top left ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0 }}
        className="absolute top-20 left-6 sm:left-8 lg:left-10 z-10"
      >
        <Image
          src="/assets/logo.png"
          alt="Logo officiel Challenge SPI Dauphine"
          width={140}
          height={140}
          className="drop-shadow-2xl"
          priority
        />
      </motion.div>

      {/* ── Affiche flottante — desktop uniquement, côté droit ── */}
      <motion.div
        initial={{ opacity: 0, x: 48, rotate: 6 }}
        animate={{ opacity: 1, x: 0, rotate: 3 }}
        transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
        className="absolute right-8 lg:right-16 xl:right-24 top-1/2 -translate-y-1/2 z-10 hidden lg:block"
        aria-label="Affiche officielle 45ème Challenge SPI Dauphine"
      >
        <div className="flex flex-col items-center gap-2.5">
          <div
            className="relative rounded-xl overflow-hidden"
            style={{
              width: 270,
              aspectRatio: '210 / 297',
              boxShadow: '0 32px 80px rgba(0,0,0,0.65), 0 4px 20px rgba(0,0,0,0.35)',
            }}
          >
            <Image
              src="/assets/affiche-45.png"
              alt="Affiche officielle 45ème Challenge SPI Dauphine — Marina di Imperia 2026"
              fill
              className="object-cover"
              sizes="270px"
            />
          </div>
          <p className="text-white/70 text-[9px] uppercase tracking-[0.28em] font-semibold"
            style={{ textShadow: '0 1px 6px rgba(0,0,0,0.7)' }}>
            Affiche officielle · 45ème édition
          </p>
        </div>
      </motion.div>

      {/* ── Main content — anchored to bottom ── */}
      <div className="relative z-10 max-w-7xl mx-auto w-full px-6 sm:px-8 lg:px-10 pb-16 lg:pb-20">
        <div className="max-w-xl lg:max-w-2xl">

          {/* Eyebrow */}
          <motion.p
            {...fadeUp(0.1)}
            className="text-[#0BBFBF] text-xs font-semibold uppercase tracking-[0.3em] mb-6"
            style={{ textShadow: '0 1px 8px rgba(0,0,0,0.6)' }}
          >
            45ème édition · Depuis 1981
          </motion.p>

          {/* Title */}
          <motion.h1
            {...fadeUp(0.22)}
            style={{
              fontFamily: 'var(--font-playfair)',
              fontSize: 'clamp(2rem, 5vw, 4.2rem)',
              fontWeight: 700,
              lineHeight: 1.08,
              color: '#ffffff',
              whiteSpace: 'nowrap',
              textShadow: '0 2px 20px rgba(0,0,0,0.55), 0 1px 4px rgba(0,0,0,0.4)',
            }}
            className="mb-4"
          >
            Challenge{' '}
            <span style={{ color: '#E8A930' }}>SPI</span>
            {' '}Dauphine
          </motion.h1>

          {/* Description */}
          <motion.p
            {...fadeUp(0.31)}
            className="text-white/50 text-sm leading-relaxed max-w-md mb-5"
            style={{ textShadow: '0 1px 6px rgba(0,0,0,0.5)' }}
          >
            Régate universitaire européenne en Méditerranée — une semaine, près de 1&nbsp;000 étudiants, sous l&apos;égide de la Fédération Française de Voile.
          </motion.p>

          {/* Location */}
          <motion.p
            {...fadeUp(0.40)}
            className="text-white/65 text-lg font-light tracking-wide mb-1"
            style={{ textShadow: '0 1px 10px rgba(0,0,0,0.55)' }}
          >
            Marina di Imperia, Italie
          </motion.p>

          {/* Date */}
          <motion.p
            {...fadeUp(0.50)}
            className="text-white/40 text-xs uppercase tracking-[0.25em] mb-8"
            style={{ textShadow: '0 1px 6px rgba(0,0,0,0.5)' }}
          >
            18 — 25 Avril 2026
          </motion.p>

          {/* Countdown — compact, single line */}
          <motion.div
            {...fadeUp(0.58)}
            className="mb-10"
          >
            <p
              className="text-white/35 text-[10px] font-semibold uppercase tracking-[0.32em] mb-2"
              style={{ textShadow: '0 1px 6px rgba(0,0,0,0.5)' }}
            >
              Départ dans
            </p>
            <CountdownTimer compact />
          </motion.div>

        </div>

        {/* Affiche mobile — sous le titre, centrée */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.45 }}
          className="lg:hidden mt-10 flex justify-start"
        >
          <div className="flex flex-col items-start gap-2">
            <div
              className="relative rounded-lg overflow-hidden"
              style={{
                width: 150,
                aspectRatio: '210 / 297',
                boxShadow: '0 16px 40px rgba(0,0,0,0.55)',
                transform: 'rotate(2deg)',
              }}
            >
              <Image
                src="/assets/affiche-45.png"
                alt="Affiche officielle 45ème Challenge SPI Dauphine"
                fill
                className="object-cover"
                sizes="150px"
              />
            </div>
            <p className="text-white/70 text-[9px] uppercase tracking-[0.28em] font-semibold pl-1"
              style={{ textShadow: '0 1px 6px rgba(0,0,0,0.7)' }}>
              Affiche officielle · 45ème
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
