'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { X, Phone } from 'lucide-react'
import { equipes } from '@/data/equipes'

export default function Regate() {

  return (
    <section id="regate" className="bg-[#071A35]">

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
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/10 to-[#0B2545]/85" aria-hidden="true" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0B2545]/60 via-transparent to-transparent" aria-hidden="true" />


        {/* Texte overlay */}
        <div className="absolute inset-0 flex flex-col justify-end">
          <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pb-12 lg:pb-16">
            {/* Titre + badge 70% — même pattern que Multisports */}
            <div className="flex flex-wrap items-end gap-5 mb-4">
              <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} style={{ fontFamily: 'var(--font-playfair)', fontSize: 'clamp(2.2rem, 5vw, 4rem)', fontWeight: 700, lineHeight: 1.08, color: '#ffffff', textShadow: '0 2px 20px rgba(0,0,0,0.55), 0 1px 4px rgba(0,0,0,0.4)' }}>
                La Régate <span style={{ color: '#E8A930' }}>SPI Dauphine</span>
              </motion.h2>
              <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.45, delay: 0.15 }} className="flex-shrink-0 mb-1">
                <div className="flex items-baseline gap-1 px-4 py-2 rounded-full border border-[#E8A930]/40 bg-[#E8A930]/10 backdrop-blur-sm">
                  <span className="font-bold text-[#E8A930]" style={{ fontFamily: 'var(--font-playfair)', fontSize: '1.6rem', lineHeight: 1 }}>70%</span>
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

      {/* ── Bannière défilante — équipes ── */}
      <div className="bg-[#071A35] py-5 overflow-hidden" style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }}>
        <p className="text-center text-[#0BBFBF] text-[10px] font-semibold uppercase tracking-[0.28em] mb-4 px-4">
          36 équipes participantes · 45ème édition
        </p>
        <div className="flex animate-marquee" style={{ animationDuration: '20s' }} aria-hidden="true">
          {[...equipes, ...equipes].map((e, i) => (
            <div key={i} className="flex items-center gap-3 px-7 flex-shrink-0">
              <span className="text-[10px] font-mono text-white/25 tabular-nums flex-shrink-0">
                {String(e.numero).padStart(2, '0')}
              </span>
              <span className="text-[17px] text-white/85 whitespace-nowrap" style={{ fontFamily: 'var(--font-playfair)', fontStyle: 'italic', fontWeight: 500 }}>
                {e.nom}
              </span>
              <span className="text-[#E8A930]/40 text-[10px] select-none ml-1">◆</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Contenu principal ── */}
      <div className="py-20 lg:py-28 bg-[#071A35]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* ── Binôme + format ── */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative rounded-2xl overflow-hidden"
              style={{ minHeight: 340 }}
            >
              <Image src="/photos/spi-01.jpg" alt="Équipage en régate" fill className="object-cover" sizes="(max-width: 1024px) 100vw, 50vw" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B2545]/90 via-[#0B2545]/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-7">
                <p className="text-[#E8A930] text-[10px] font-semibold uppercase tracking-[0.25em] mb-2">Concept fondateur · 1982</p>
                <h3 className="text-white text-2xl font-bold mb-2" style={{ fontFamily: 'var(--font-playfair)' }}>Le binôme</h3>
                <p className="text-white/75 text-sm leading-relaxed">
                  Une équipe étudiante et une équipe d'entreprise unies sous la même enseigne. Ils naviguent ensemble, concourent ensemble, et partagent la victoire.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="flex flex-col justify-between gap-8"
            >
              <div>
                <p className="text-[#0BBFBF] text-[10px] font-semibold uppercase tracking-[0.25em] mb-5">Format officiel</p>
                <ul className="space-y-4">
                  {[
                    { label: 'Parcours', val: 'Prologue + parcours banane + tracés côtiers' },
                    { label: 'Briefing', val: 'Réunion skippers chaque matin — Point FFV' },
                    { label: 'Égide',    val: 'YC Imperia · FFVoile · FIV' },
                  ].map(({ label, val }) => (
                    <li key={label} className="flex gap-4 items-start">
                      <span className="text-[11px] font-semibold uppercase tracking-wide text-[#0BBFBF] min-w-20 pt-0.5 flex-shrink-0">{label}</span>
                      <span className="text-sm text-white/45 leading-snug">{val}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {[
                  { titre: 'Sélection 37', desc: '37 pieds · régates en baie et côtiers' },
                  { titre: 'First 31.7',   desc: '31 pieds · monotype accessible' },
                ].map(b => (
                  <div key={b.titre} className="bg-[#0B2545] rounded-xl p-4 text-white">
                    <p className="font-bold text-sm mb-1">{b.titre}</p>
                    <p className="text-xs text-white/50 leading-relaxed">{b.desc}</p>
                  </div>
                ))}
              </div>

              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-3 text-sm text-white/45">
                  <Phone className="w-3.5 h-3.5 text-[#0BBFBF] flex-shrink-0" aria-hidden="true" />
                  <span>Marc Morgeneyer — <a href="tel:+33698698849" className="text-[#0BBFBF] font-medium hover:underline cursor-pointer">+33 6 98 69 88 49</a></span>
                </div>
                <a
                  href="/assets/avis-de-course-45.pdf"
                  download="Avis-de-course-SPI-Dauphine-45.pdf"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-[#0BBFBF] hover:text-white transition-colors duration-150 cursor-pointer"
                >
                  <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 10v6m0 0l-3-3m3 3l3-3M3 17V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
                  </svg>
                  Avis de course — 45ème édition (PDF)
                </a>
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  )
}
