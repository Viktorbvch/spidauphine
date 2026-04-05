'use client'

import { useRef, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { MapPin, Anchor, Wind, Thermometer, Navigation } from 'lucide-react'

const photos = [
  { src: '/photos/imperia-1.jpg', label: 'Imperia depuis la mer', sub: 'La ville haute et son dôme' },
  { src: '/photos/imperia-2.jpg', label: 'Marina di Imperia',    sub: 'L\'une des plus grandes de Ligurie' },
  { src: '/photos/imperia-3.jpg', label: 'Le port et les couleurs', sub: 'Architecture ligure typique' },
]

const facts = [
  { icon: MapPin,      label: 'Localisation',   value: 'Ligurie, Italie' },
  { icon: Navigation,  label: 'De Paris',        value: '~7h en train' },
  { icon: Thermometer, label: 'Climat en avril', value: '18 – 22 °C' },
  { icon: Wind,        label: 'Vent dominant',   value: 'Tramontane & brise marine' },
  { icon: Anchor,      label: 'Marina',          value: '1 000+ anneaux' },
]

export default function Imperia() {
  const sectionRef   = useRef<HTMLDivElement>(null)
  const videoRef     = useRef<HTMLVideoElement>(null)
  const [active, setActive] = useState(0)
  const [muted] = useState(true)

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] })
  const videoScale  = useTransform(scrollYProgress, [0, 0.5], [1.08, 1])
  const textY       = useTransform(scrollYProgress, [0.1, 0.5], [30, 0])
  const textOpacity = useTransform(scrollYProgress, [0.1, 0.35], [0, 1])

  return (
    <section id="imperia" ref={sectionRef} className="bg-[#060F1E] overflow-hidden">

      {/* ══ BLOC 1 : Vidéo hero plein-écran ══════════════════════════════ */}
      <div className="relative h-[82svh] flex items-end overflow-hidden">

        {/* Vidéo en parallaxe */}
        <motion.div className="absolute inset-0" style={{ scale: videoScale }}>
          <video
            ref={videoRef}
            src="/assets/imperia-aerial.mp4"
            autoPlay
            loop
            muted={muted}
            playsInline
            className="w-full h-full object-cover"
          />
        </motion.div>

        {/* Dégradés superposés */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#060F1E] via-[#060F1E]/30 to-transparent pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#060F1E]/40 via-transparent to-transparent pointer-events-none" />

        {/* Texte hero bas-gauche */}
        <motion.div
          style={{ y: textY, opacity: textOpacity }}
          className="relative z-10 px-8 pb-14 lg:px-16 lg:pb-20 max-w-3xl"
        >
          <p className="text-[#0BBFBF] text-[10px] font-bold uppercase tracking-[0.38em] mb-4">
            Ville hôte · 45ème édition
          </p>
          <h2
            className="text-white leading-[1.05] mb-5"
            style={{ fontFamily: 'var(--font-playfair)', fontSize: 'clamp(2.4rem, 5vw, 4rem)', fontWeight: 700 }}
          >
            Imperia, <span style={{ color: '#E8A930' }}>côte ligure</span>
          </h2>
          <p className="text-white/90 leading-relaxed max-w-lg" style={{ fontSize: 'clamp(0.9rem, 1.4vw, 1.05rem)', textShadow: '0 1px 12px rgba(0,0,0,0.6)' }}>
            Nichée entre mer Méditerranée et collines parfumées, Imperia est l'écrin idéal
            de la SPI Dauphine. Une ville portuaire, solaire, et authentiquement italienne.
          </p>
        </motion.div>

        {/* Scroll cue */}
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }}
          className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 pointer-events-none"
        >
          <div className="w-px h-10 bg-gradient-to-b from-white/40 to-transparent" />
          <span className="text-white/35 text-[9px] uppercase tracking-[0.3em]">Découvrir</span>
        </motion.div>
      </div>

      {/* ══ BLOC 2 : Galerie photos interactive ══════════════════════════ */}
      <div className="relative bg-[#060F1E] py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">

          <div className="grid lg:grid-cols-[1fr_420px] gap-10 lg:gap-16 items-center">

            {/* Photo principale */}
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
              {photos.map((p, i) => (
                <motion.div
                  key={i}
                  className="absolute inset-0"
                  initial={false}
                  animate={{ opacity: active === i ? 1 : 0, scale: active === i ? 1 : 1.04 }}
                  transition={{ duration: 0.65, ease: "easeOut" }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={p.src} alt={p.label} className="w-full h-full object-cover" />
                </motion.div>
              ))}
              {/* Overlay bas */}
              <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
              <div className="absolute bottom-5 left-5 pointer-events-none">
                <p className="text-white font-semibold text-sm">{photos[active].label}</p>
                <p className="text-white/55 text-xs mt-0.5">{photos[active].sub}</p>
              </div>
              {/* Indicateurs */}
              <div className="absolute bottom-5 right-5 flex gap-1.5 pointer-events-none">
                {photos.map((_, i) => (
                  <div
                    key={i}
                    className="h-[2px] rounded-full transition-all duration-400"
                    style={{ width: active === i ? 20 : 8, background: active === i ? '#E8A930' : 'rgba(255,255,255,0.35)' }}
                  />
                ))}
              </div>
            </div>

            {/* Panneau droite */}
            <div className="flex flex-col gap-6">

              {/* Titre bloc */}
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-px w-8 bg-[#0BBFBF]/50" />
                  <span className="text-[#0BBFBF] text-[9px] font-bold uppercase tracking-[0.35em]">La ville hôte</span>
                </div>
                <h3 className="text-white leading-tight mb-3"
                  style={{ fontFamily: 'var(--font-playfair)', fontSize: 'clamp(1.5rem, 2.5vw, 2rem)', fontWeight: 700 }}>
                  Une ville à part entière
                </h3>
                <p className="text-white/50 text-sm leading-relaxed">
                  Imperia conjugue patrimoine ligure, marina de classe internationale et douceur de vivre.
                  Pendant une semaine, elle devient la capitale de la voile universitaire française.
                </p>
              </div>

              {/* Vignettes photos cliquables */}
              <div className="grid grid-cols-3 gap-3">
                {photos.map((p, i) => (
                  <button
                    key={i}
                    onClick={() => setActive(i)}
                    className="relative aspect-square rounded-xl overflow-hidden cursor-pointer group"
                    style={{ outline: active === i ? '2px solid #E8A930' : '2px solid transparent', outlineOffset: 2 }}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={p.src} alt={p.label} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
                    <div className={`absolute inset-0 transition-opacity duration-200 ${active === i ? 'opacity-0' : 'opacity-40 bg-black'}`} />
                  </button>
                ))}
              </div>

              {/* Séparateur */}
              <div className="h-px bg-white/8" />

              {/* Facts */}
              <div className="grid grid-cols-1 gap-3">
                {facts.map(({ icon: Icon, label, value }) => (
                  <div key={label} className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                      style={{ background: 'rgba(11,191,191,0.1)' }}>
                      <Icon className="w-3.5 h-3.5 text-[#0BBFBF]" aria-hidden="true" />
                    </div>
                    <div className="flex-1 flex items-center justify-between min-w-0">
                      <span className="text-white/40 text-[11px] uppercase tracking-[0.1em]">{label}</span>
                      <span className="text-white text-[12px] font-semibold">{value}</span>
                    </div>
                  </div>
                ))}
              </div>

            </div>
          </div>
        </div>
      </div>

      {/* ══ BLOC 3 : Carte ═══════════════════════════════════════════════ */}
      <div className="px-6 lg:px-12 pb-20 lg:pb-28">
        <div className="max-w-7xl mx-auto">
          <div className="rounded-2xl overflow-hidden" style={{ border: '1px solid rgba(255,255,255,0.06)' }}>
            <div className="px-5 py-3.5 flex items-center gap-3"
              style={{ background: 'rgba(255,255,255,0.04)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
              <Anchor className="w-4 h-4 text-[#E8A930]" aria-hidden="true" />
              <span className="text-white/70 text-sm font-medium">Marina di Imperia — lieu du Challenge SPI Dauphine 45</span>
              <div className="ml-auto flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 rounded-full bg-[#0BBFBF] animate-pulse" />
                <span className="text-[#0BBFBF] text-[10px] font-semibold uppercase tracking-wider">Live</span>
              </div>
            </div>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2898.0!2d8.0173!3d43.8818!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12cde8a3b3b3b3b3%3A0x0!2sMarina+di+Imperia!5e0!3m2!1sfr!2sfr!4v1700000000000!5m2!1sfr!2sfr"
              width="100%"
              height="360"
              style={{ border: 0, display: 'block' }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Carte Marina di Imperia"
            />
          </div>
        </div>
      </div>

    </section>
  )
}
