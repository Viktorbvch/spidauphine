'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { Mail } from 'lucide-react'

/* ── Liste complète des partenaires ────────────────────────── */
const PARTENAIRES = [
  { nom: 'Marina di Imperia',     couleur: '#0B2545' },
  { nom: 'Yacht Club Imperia',    couleur: '#1A6B8C' },
  { nom: 'FFVoile',               couleur: '#0B2545' },
  { nom: 'FIV',                   couleur: '#008C45' },
  { nom: 'Fondation de la Mer',   couleur: '#0077B6' },
  { nom: 'Città di Imperia',      couleur: '#1A6B8C' },
  { nom: 'Ineja',                 couleur: '#2D6A4F' },
  { nom: 'Geste pour la Mer',     couleur: '#0B2545' },
  { nom: 'FFTW',                  couleur: '#1A6B8C' },
  { nom: 'Dauphine PSL',          couleur: '#990000' },
  { nom: 'CVEC',                  couleur: '#0B2545' },
  { nom: 'JPA International',     couleur: '#C4A000' },
  { nom: 'Deliveroo',             couleur: '#00CCBC' },
  { nom: 'Nautistore',            couleur: '#1A6B8C' },
  { nom: "L'épaulette de Classe", couleur: '#0B2545' },
  { nom: 'BAP',                   couleur: '#E8A930' },
  { nom: 'VandB Groupe',          couleur: '#7B2D8B' },
  { nom: 'Red Bull',              couleur: '#CC0000' },
  { nom: 'CRCustom.fr',           couleur: '#0B2545' },
  { nom: 'Sumeria',               couleur: '#6366F1' },
  { nom: 'En Voiture Simone',     couleur: '#059669' },
  { nom: "Martinpêch'",           couleur: '#0B2545' },
  { nom: 'Solly',                 couleur: '#E8A930' },
  { nom: 'Ambassia',              couleur: '#7C3AED' },
  { nom: 'Sport Mate',            couleur: '#0B2545' },
  { nom: 'Quadmission',           couleur: '#1A6B8C' },
  { nom: 'Olago',                 couleur: '#059669' },
  { nom: 'SafeHub',               couleur: '#E05B40' },
]

/* ── Pill compact pour l'orbite desktop ─────────────────────── */
function OrbitPill({ nom, couleur }: { nom: string; couleur: string }) {
  return (
    <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-gray-100/80 shadow-sm select-none">
      <div
        className="w-3 h-3 rounded-full flex-shrink-0"
        style={{ background: couleur }}
        aria-hidden="true"
      />
      <span className="text-[11px] font-medium text-[#0B2545] whitespace-nowrap leading-none">
        {nom}
      </span>
    </div>
  )
}

/* ── Pill pour le marquee mobile ────────────────────────────── */
function MarqueePill({ nom, couleur }: { nom: string; couleur: string }) {
  return (
    <div className="flex-shrink-0 flex items-center gap-2.5 px-5 py-3 rounded-full bg-white border border-gray-100 shadow-sm select-none mx-2">
      <div
        className="w-5 h-5 rounded-full flex items-center justify-center text-white font-bold text-[9px] flex-shrink-0"
        style={{ background: couleur }}
        aria-hidden="true"
      >
        {nom.split(/[\s'\-]/g).filter(w => w.length > 1).slice(0, 2).map(w => w[0].toUpperCase()).join('') || nom.slice(0, 2).toUpperCase()}
      </div>
      <span className="text-sm font-medium text-[#0B2545] whitespace-nowrap">{nom}</span>
    </div>
  )
}

/* ── Section ────────────────────────────────────────────────── */
export default function Partenaires() {
  // Distribution sur 3 anneaux : 8 + 10 + 10 = 28
  const ring1 = PARTENAIRES.slice(0, 8)   // rayon 130px — CW  45s
  const ring2 = PARTENAIRES.slice(8, 18)  // rayon 225px — CCW 70s
  const ring3 = PARTENAIRES.slice(18)     // rayon 330px — CW  100s

  // Marquee mobile — double la liste pour loop sans rupture
  const row1 = [...PARTENAIRES.slice(0, 14), ...PARTENAIRES.slice(0, 14)]
  const row2 = [...PARTENAIRES.slice(14),    ...PARTENAIRES.slice(14)]

  return (
    <section id="partenaires" className="py-20 lg:py-28 bg-[#F8FAFC] overflow-hidden">

      {/* ── En-tête texte ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-4">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-[#0BBFBF] text-xs font-semibold uppercase tracking-[0.3em] mb-4"
        >
          Ils nous soutiennent
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, delay: 0.1 }}
          className="text-[#0B2545] mb-4"
          style={{
            fontFamily: 'var(--font-playfair)',
            fontSize: 'clamp(1.8rem, 4vw, 3rem)',
            fontWeight: 700,
          }}
        >
          Un grand merci à nos{' '}
          <span style={{ color: '#E8A930' }}>partenaires</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-[#64748B] text-base max-w-lg mx-auto"
        >
          28 partenaires institutionnels, académiques, sportifs et entrepreneuriaux
          aux côtés de la 45ème édition.
        </motion.p>
      </div>

      {/* ── Orbital desktop (lg+) ──────────────────────────────── */}
      {/* 3 anneaux en orbite autour du message central.
          Animation CSS pure : orbit-cw / orbit-ccw définis dans globals.css.
          Chaque item utilise animation-delay négatif pour répartir les pills sur le cercle. */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="hidden lg:flex items-center justify-center"
        aria-label="Logos des partenaires en orbite"
      >
        {/* Conteneur 760×760 — doit contenir anneau 3 (r=330) + demi-pill (~70px) = 400 de rayon minimum */}
        <div className="relative" style={{ width: 760, height: 760 }}>

          {/* Guides visuels — cercles en pointillés discrets */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none" aria-hidden="true">
            <div className="absolute rounded-full border border-dashed" style={{ width: 296, height: 296, borderColor: 'rgba(11,37,69,0.08)' }} />
            <div className="absolute rounded-full border border-dashed" style={{ width: 492, height: 492, borderColor: 'rgba(11,37,69,0.06)' }} />
            <div className="absolute rounded-full border border-dashed" style={{ width: 702, height: 702, borderColor: 'rgba(11,37,69,0.04)' }} />
          </div>

          {/* Anneau 1 — 8 items — rayon 130px — sens CW — 45s */}
          {ring1.map((p, i) => (
            <div
              key={p.nom}
              className="absolute top-1/2 left-1/2"
              style={{
                animation: `orbit-cw 45s linear infinite`,
                animationDelay: `-${(i / ring1.length) * 45}s`,
                '--r': '-130px',
              } as React.CSSProperties}
            >
              <OrbitPill nom={p.nom} couleur={p.couleur} />
            </div>
          ))}

          {/* Anneau 2 — 10 items — rayon 225px — sens CCW — 70s */}
          {ring2.map((p, i) => (
            <div
              key={p.nom}
              className="absolute top-1/2 left-1/2"
              style={{
                animation: `orbit-ccw 70s linear infinite`,
                animationDelay: `-${(i / ring2.length) * 70}s`,
                '--r': '-225px',
              } as React.CSSProperties}
            >
              <OrbitPill nom={p.nom} couleur={p.couleur} />
            </div>
          ))}

          {/* Anneau 3 — 10 items — rayon 330px — sens CW — 100s */}
          {ring3.map((p, i) => (
            <div
              key={p.nom}
              className="absolute top-1/2 left-1/2"
              style={{
                animation: `orbit-cw 100s linear infinite`,
                animationDelay: `-${(i / ring3.length) * 100}s`,
                '--r': '-330px',
              } as React.CSSProperties}
            >
              <OrbitPill nom={p.nom} couleur={p.couleur} />
            </div>
          ))}

          {/* Centre — logo + message de remerciement */}
          <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
            <div className="text-center px-6 max-w-[210px]">
              <div className="w-14 h-14 rounded-2xl bg-[#0B2545] flex items-center justify-center mx-auto mb-4 shadow-lg">
                <Image
                  src="/assets/logo.png"
                  alt="Logo SPI Dauphine"
                  width={32}
                  height={32}
                  className="brightness-0 invert"
                />
              </div>
              <p
                className="text-[#0B2545] font-bold leading-tight mb-1.5"
                style={{ fontFamily: 'var(--font-playfair)', fontSize: '1.05rem' }}
              >
                Un grand merci à nos{' '}
                <span style={{ color: '#E8A930' }}>partenaires</span>
              </p>
              <p className="text-[11px] text-[#94A3B8] font-medium">
                28 partenaires · 45ème édition
              </p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* ── Marquee mobile (< lg) — deux rangées défilantes ────── */}
      <div className="lg:hidden mt-10">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mb-4"
          aria-hidden="true"
        >
          <div className="flex animate-marquee">
            {row1.map((p, i) => (
              <MarqueePill key={`r1-${i}`} nom={p.nom} couleur={p.couleur} />
            ))}
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          aria-hidden="true"
        >
          <div className="flex animate-marquee" style={{ animationDirection: 'reverse', animationDuration: '45s' }}>
            {row2.map((p, i) => (
              <MarqueePill key={`r2-${i}`} nom={p.nom} couleur={p.couleur} />
            ))}
          </div>
        </motion.div>
      </div>

      {/* ── CTA partenariat ── */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="text-center mt-8 lg:mt-4"
      >
        <a
          href="mailto:pauline.petitdidier@spidauphine.com?subject=Demande%20de%20partenariat%20SPI%20Dauphine%2045"
          className="inline-flex items-center gap-2.5 bg-[#0B2545] hover:bg-[#133366] text-white rounded-full px-8 py-3.5 text-sm font-semibold transition-colors duration-200 cursor-pointer"
        >
          <Mail className="w-4 h-4" aria-hidden="true" />
          Devenir partenaire de la 45ème édition
        </a>
        <p className="text-xs text-[#94A3B8] mt-3">
          Pauline Petitdidier — pauline.petitdidier@spidauphine.com
        </p>
      </motion.div>
    </section>
  )
}
