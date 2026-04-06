'use client'

import { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { Phone, ChevronLeft, ChevronRight } from 'lucide-react'
import { equipes } from '@/data/equipes'

/* ── Slides carrousel — chaque photo porte un fragment du récit ── */
const SLIDES = [
  {
    photo: '/photos/regate-flotte.jpg',
    objectPosition: 'center 45%',
    eyebrow: 'La flotte',
    title: 'Environ 40 bateaux',
    subtitle: 'Mer Ligure · Jauge OSIRIS',
    facts: [
      { label: 'Jauge officielle', value: 'OSIRIS' },
      { label: 'Bateaux engagés', value: '~40 monocoques' },
      { label: 'Longueur', value: '8 à 12 mètres' },
    ],
  },
  {
    photo: '/photos/regate-cotier.jpg',
    objectPosition: 'center 50%',
    eyebrow: 'Les parcours',
    title: 'Côtiers & construits',
    subtitle: 'Alternance chaque journée',
    facts: [
      { label: 'Format', value: 'Parcours construits' },
      { label: 'Variante', value: 'Tracés côtiers' },
      { label: 'Tirant d\'eau max', value: '2,5 mètres' },
    ],
  },
  {
    photo: '/photos/regate-bateaux.jpg',
    objectPosition: 'center 50%',
    eyebrow: 'Le binôme',
    title: 'Étudiants & entreprises',
    subtitle: 'Concept fondateur · 1982',
    facts: [
      { label: 'Format unique', value: 'Équipe mixte' },
      { label: 'Monocoques', value: '8 – 12 m' },
      { label: 'Tirant max', value: '2,5 m' },
    ],
  },
  {
    photo: '/photos/regate-crew.jpg',
    objectPosition: 'center 35%',
    eyebrow: 'Encadrement',
    title: 'FFV & comité de course',
    subtitle: 'Briefing skippers chaque matin',
    facts: [
      { label: 'Autorité', value: 'FFVoile · YC Imperia' },
      { label: 'Briefing', value: 'Chaque matin' },
      { label: 'Catamaran d\'arbitrage', value: '40 pieds' },
    ],
  },
  {
    photo: '/photos/regate-securite.jpg',
    objectPosition: 'center 40%',
    eyebrow: 'Sécurité en mer',
    title: 'Deux semi-rigides dédiés',
    subtitle: 'Suivi & sécurité des courses',
    facts: [
      { label: 'Semi-rigides', value: '2 zodiacs' },
      { label: 'Catamaran', value: 'Arbitrage · 40 pieds' },
      { label: 'Couverture', value: 'Parcours complet' },
    ],
  },
]

export default function Regate() {
  const [active, setActive] = useState(0)
  const [dir, setDir] = useState(1)

  const go = useCallback((next: number) => {
    setDir(next > active ? 1 : -1)
    setActive(next)
  }, [active])

  const prev = useCallback(() => go((active - 1 + SLIDES.length) % SLIDES.length), [active, go])
  const next = useCallback(() => go((active + 1) % SLIDES.length), [active, go])

  // Auto-advance
  useEffect(() => {
    const t = setInterval(next, 6000)
    return () => clearInterval(t)
  }, [next])

  const slide = SLIDES[active]

  return (
    <section id="regate" className="bg-[#0C1B33]">

      {/* ── Bannière hero ── */}
      <div className="relative w-full overflow-hidden" style={{ height: 'clamp(480px, 75vh, 880px)' }}>
        <Image
          src="/photos/regate-hero.jpg"
          alt="Voiliers en régate lors du Challenge SPI Dauphine"
          fill
          priority
          className="object-cover"
          style={{ objectPosition: 'center 40%' }}
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/10 to-[#0C1B33]/85" aria-hidden="true" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0C1B33]/60 via-transparent to-transparent" aria-hidden="true" />


        {/* Texte overlay */}
        <div className="absolute inset-0 flex flex-col justify-end">
          <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pb-12 lg:pb-16">
            {/* Titre + badge 70% — même pattern que Multisports */}
            <div className="flex flex-wrap items-end gap-5 mb-4">
              <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} style={{ fontFamily: 'var(--font-playfair)', fontSize: 'clamp(2.2rem, 5vw, 4rem)', fontWeight: 700, lineHeight: 1.08, color: '#ffffff', textShadow: '0 2px 20px rgba(0,0,0,0.55), 0 1px 4px rgba(0,0,0,0.4)' }}>
                La Régate <span style={{ color: '#C8A24D' }}>SPI Dauphine</span>
              </motion.h2>
              <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.45, delay: 0.15 }} className="flex-shrink-0 mb-1">
                <div className="flex items-baseline gap-1 px-4 py-2 rounded-full border border-[#C8A24D]/40 bg-[#C8A24D]/10 backdrop-blur-sm">
                  <span className="font-bold text-[#C8A24D]" style={{ fontFamily: 'var(--font-playfair)', fontSize: '1.6rem', lineHeight: 1 }}>70%</span>
                  <span className="text-white/60 text-xs font-medium">du classement final</span>
                </div>
              </motion.div>
            </div>
            <motion.p initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }} className="text-white/70 text-base max-w-xl leading-relaxed" style={{ textShadow: '0 1px 10px rgba(0,0,0,0.55)' }}>
              Sous l'égide du Yacht Club Imperia, du comité de course et de la FFVoile. Prologue stratégique, parcours banane et tracés côtiers sur la mer Ligure.
            </motion.p>
          </div>
        </div>
      </div>

      {/* ── Bannière défilante — équipes (glassmorphism pills) ── */}
      <div className="bg-[#0C1B33] py-6 overflow-hidden" style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }}>
        <p
          className="text-center text-[10px] font-bold uppercase tracking-[0.35em] mb-5 px-4"
          style={{ fontFamily: 'var(--font-mono)', color: 'rgba(61,184,164,0.6)' }}
        >
          36 équipes participantes · 45ème édition
        </p>

        {/* Row 1 — forward */}
        <div className="flex animate-marquee mb-3" style={{ animationDuration: '30s' }} aria-hidden="true">
          {[...equipes, ...equipes].map((e, i) => (
            <div
              key={`a-${i}`}
              className="flex items-center gap-2.5 px-4 py-2 rounded-full flex-shrink-0 mx-1.5"
              style={{
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.07)',
              }}
            >
              <span
                className="text-[10px] tabular-nums flex-shrink-0"
                style={{ fontFamily: 'var(--font-mono)', color: 'rgba(200,162,77,0.5)' }}
              >
                {String(e.numero).padStart(2, '0')}
              </span>
              <span
                className="text-[15px] text-white/80 whitespace-nowrap"
                style={{ fontFamily: 'var(--font-playfair)', fontStyle: 'italic' }}
              >
                {e.nom}
              </span>
            </div>
          ))}
        </div>

        {/* Row 2 — reverse direction */}
        <div
          className="flex animate-marquee"
          style={{ animationDuration: '35s', animationDirection: 'reverse' }}
          aria-hidden="true"
        >
          {[...equipes.slice().reverse(), ...equipes.slice().reverse()].map((e, i) => (
            <div
              key={`b-${i}`}
              className="flex items-center gap-2.5 px-4 py-2 rounded-full flex-shrink-0 mx-1.5"
              style={{
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.07)',
              }}
            >
              <span
                className="text-[10px] tabular-nums flex-shrink-0"
                style={{ fontFamily: 'var(--font-mono)', color: 'rgba(200,162,77,0.5)' }}
              >
                {String(e.numero).padStart(2, '0')}
              </span>
              <span
                className="text-[15px] text-white/80 whitespace-nowrap"
                style={{ fontFamily: 'var(--font-playfair)', fontStyle: 'italic' }}
              >
                {e.nom}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Carrousel photo + infos régate ── */}
      <div className="bg-[#0C1B33] py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative overflow-hidden rounded-2xl"
            style={{ minHeight: 'clamp(460px, 60vh, 680px)' }}
          >
            {/* Photos en crossfade */}
            <AnimatePresence initial={false} mode="sync">
              <motion.div
                key={active}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.9 }}
                className="absolute inset-0"
              >
                <Image
                  src={slide.photo}
                  alt={slide.title}
                  fill
                  className="object-cover"
                  style={{ objectPosition: slide.objectPosition }}
                  sizes="100vw"
                  priority={active === 0}
                />
              </motion.div>
            </AnimatePresence>

            {/* Dégradés */}
            <div className="absolute inset-0 pointer-events-none" style={{ background: 'linear-gradient(to bottom, rgba(12,27,51,0.15) 0%, rgba(12,27,51,0.1) 30%, rgba(12,27,51,0.78) 75%, rgba(12,27,51,0.96) 100%)' }} aria-hidden="true" />
            <div className="absolute inset-0 pointer-events-none" style={{ background: 'linear-gradient(to right, rgba(12,27,51,0.55) 0%, transparent 55%)' }} aria-hidden="true" />

            {/* Contenu overlay */}
            <div className="absolute inset-0 flex flex-col justify-between p-6 sm:p-8 lg:p-12">

              {/* Haut — progress dots */}
              <div className="flex items-center gap-2">
                {SLIDES.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => go(i)}
                    className="h-[3px] rounded-full transition-all duration-500 cursor-pointer"
                    style={{
                      width: active === i ? 28 : 8,
                      background: active === i ? '#C8A24D' : 'rgba(255,255,255,0.25)',
                    }}
                    aria-label={`Slide ${i + 1}`}
                  />
                ))}
              </div>

              {/* Bas — texte + facts */}
              <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">

                {/* Texte gauche */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={active}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.4 }}
                    className="max-w-sm"
                  >
                    <p
                      className="text-[10px] font-bold uppercase tracking-[0.40em] mb-2"
                      style={{ color: '#C8A24D', fontFamily: 'var(--font-mono)' }}
                    >
                      {slide.eyebrow}
                    </p>
                    <h3
                      className="text-white leading-tight mb-1"
                      style={{ fontFamily: 'var(--font-playfair)', fontSize: 'clamp(1.4rem, 3vw, 2rem)', fontWeight: 400 }}
                    >
                      {slide.title}
                    </h3>
                    <p className="text-white/45 text-sm">{slide.subtitle}</p>
                  </motion.div>
                </AnimatePresence>

                {/* Facts droite — glassmorphism */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={active}
                    initial={{ opacity: 0, x: 12 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4, delay: 0.1 }}
                    className="flex flex-col gap-1.5 min-w-[200px]"
                  >
                    {slide.facts.map(f => (
                      <div
                        key={f.label}
                        className="flex items-center justify-between gap-6 px-4 py-2.5 rounded-xl"
                        style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.10)', backdropFilter: 'blur(8px)' }}
                      >
                        <span style={{ fontSize: 10, fontFamily: 'var(--font-mono)', color: 'rgba(255,255,255,0.38)', textTransform: 'uppercase', letterSpacing: '0.15em', whiteSpace: 'nowrap' }}>
                          {f.label}
                        </span>
                        <span className="text-white font-semibold text-sm whitespace-nowrap">{f.value}</span>
                      </div>
                    ))}
                  </motion.div>
                </AnimatePresence>

              </div>
            </div>

            {/* Flèches navigation */}
            <button
              onClick={prev}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full flex items-center justify-center cursor-pointer transition-all duration-200 hover:scale-110"
              style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.14)', backdropFilter: 'blur(8px)' }}
              aria-label="Slide précédent"
            >
              <ChevronLeft className="w-4 h-4 text-white/70" />
            </button>
            <button
              onClick={next}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full flex items-center justify-center cursor-pointer transition-all duration-200 hover:scale-110"
              style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.14)', backdropFilter: 'blur(8px)' }}
              aria-label="Slide suivant"
            >
              <ChevronRight className="w-4 h-4 text-white/70" />
            </button>
          </motion.div>

          {/* Pied — contact + PDF */}
          <div className="flex flex-wrap items-center justify-between gap-4 mt-6 pt-5" style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }}>
            <div className="flex items-center gap-3 text-sm text-white/45">
              <Phone className="w-3.5 h-3.5 text-[#3DB8A4] flex-shrink-0" aria-hidden="true" />
              <span>Marc Morgeneyer — <a href="tel:+33698698849" className="text-[#3DB8A4] font-medium hover:underline cursor-pointer">+33 6 98 69 88 49</a></span>
            </div>
            <a
              href="/assets/avis-de-course-45.pdf"
              download="Avis-de-course-SPI-Dauphine-45.pdf"
              className="inline-flex items-center gap-2 text-sm font-semibold text-[#3DB8A4] hover:text-white transition-colors duration-150 cursor-pointer"
            >
              <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 10v6m0 0l-3-3m3 3l3-3M3 17V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
              </svg>
              Avis de course — 45ème édition (PDF)
            </a>
          </div>

        </div>
      </div>
    </section>
  )
}
