'use client'

import { useState, useRef, useEffect, useCallback, useMemo } from 'react'
import Image from 'next/image'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { motion, AnimatePresence } from 'framer-motion'
import { Utensils, MonitorPlay, Tent, ShieldCheck, Building2 } from 'lucide-react'

/* ══ Utils ═══════════════════════════════════════════════════════ */
function lerp(a: number, b: number, t: number) { return a + (b - a) * t }
function clamp(v: number, lo = 0, hi = 1) { return Math.max(lo, Math.min(hi, v)) }

type RGBA = [number, number, number, number]
function lerpRgba(a: RGBA, b: RGBA, t: number): string {
  return `rgba(${Math.round(lerp(a[0],b[0],t))},${Math.round(lerp(a[1],b[1],t))},${Math.round(lerp(a[2],b[2],t))},${lerp(a[3],b[3],t).toFixed(3)})`
}
function interpRgba(stops: { p: number; v: RGBA }[], progress: number): string {
  const i = stops.findIndex(s => s.p >= progress)
  if (i <= 0) return lerpRgba(stops[0].v, stops[0].v, 0)
  if (i === -1) return lerpRgba(stops[stops.length - 1].v, stops[stops.length - 1].v, 0)
  const a = stops[i - 1], b = stops[i]
  return lerpRgba(a.v, b.v, (progress - a.p) / (b.p - a.p))
}
function interpVal(stops: { p: number; v: number }[], progress: number): number {
  const i = stops.findIndex(s => s.p >= progress)
  if (i <= 0) return stops[0].v
  if (i === -1) return stops[stops.length - 1].v
  const a = stops[i - 1], b = stops[i]
  return lerp(a.v, b.v, (progress - a.p) / (b.p - a.p))
}

/* ══ Time: 9h → 2h (17h range) ═════════════════════════════════ */
function getTime(p: number) {
  const mins = Math.round(p * 17 * 60)
  const h = (9 + Math.floor(mins / 60)) % 24
  const m = mins % 60
  return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`
}

/* ══ Teinte atmosphérique — très subtile ═════════════════════════ */
const TINT: { p: number; v: RGBA }[] = [
  { p: 0,    v: [8,  18, 55, 0.14] },  // 9h  frais, bleu léger
  { p: 0.15, v: [0,   0,  0, 0.00] },  // 11h30 clair
  { p: 0.45, v: [0,   0,  0, 0.00] },  // 16h30 plein jour
  { p: 0.56, v: [130, 55, 0, 0.22] },  // 18h30 golden
  { p: 0.72, v: [80,  20, 0, 0.26] },  // 21h coucher
  { p: 0.80, v: [5,    5,22, 0.30] },  // 22h30 nuit
  { p: 1.0,  v: [2,    2, 8, 0.42] },  // 2h   nuit profonde
]

/* ══ Filtres photo — brightness & saturation par heure ══════════ */
const BRIGHT: { p: number; v: number }[] = [
  { p: 0, v: 0.96 }, { p: 0.12, v: 1.02 }, { p: 0.25, v: 1.04 },
  { p: 0.50, v: 1.0 }, { p: 0.65, v: 0.88 }, { p: 0.80, v: 0.65 }, { p: 1.0, v: 0.50 },
]
const SAT: { p: number; v: number }[] = [
  { p: 0, v: 0.95 }, { p: 0.15, v: 1.04 }, { p: 0.40, v: 1.06 },
  { p: 0.65, v: 0.96 }, { p: 0.80, v: 0.72 }, { p: 1.0, v: 0.55 },
]

/* ══ Activités — journée type réelle ════════════════════════════ */
interface Act {
  id: string; s: number; e: number
  period: string; label: string; sub: string; desc: string
  photo: string
}
const ACTS: Act[] = [
  {
    id: 'briefing', s: 0, e: 0.08,
    period: 'Briefing', label: 'Réunion des skippers', sub: '9h – 10h',
    desc: 'Rassemblés face au comité de course, les skippers scrutent les cartes météo. Courants, vent annoncé, parcours du jour — chaque détail compte. La tension est palpable, les stratégies se dessinent en silence.',
    photo: '/photos/spi-01.jpg',
  },
  {
    id: 'pdej', s: 0.05, e: 0.15,
    period: 'Matin', label: 'Petit-déjeuner sous le chapiteau', sub: '10h – 11h',
    desc: 'L\'odeur du café se mêle à l\'air marin sous la grande toile blanche. On refait les courses de la veille entre deux tartines, on ajuste les derniers réglages. L\'excitation monte, les équipages se jaugent du regard.',
    photo: '/photos/spi-petit-dej.jpg',
  },
  {
    id: 'regate', s: 0.12, e: 0.50,
    period: 'En course', label: 'Régate & Challenge Multisport', sub: '11h – 17h',
    desc: 'Le coup de canon résonne sur l\'eau. Les voiliers s\'élancent en mer Ligure — virements de bord, empannages, sprints au portant. Sur la plage, le challenge multisport bat son plein. Six heures d\'adrénaline pure.',
    photo: '/photos/spi-regate-village.jpg',
  },
  {
    id: 'aftersea', s: 0.48, e: 0.63,
    period: 'AfterSea', label: 'L\'AfterSea sur le village', sub: '18h – 19h',
    desc: 'Les bateaux rentrent au port un à un. Sur le village, la musique démarre et les premiers verres se lèvent. Cette heure magique où la compétition laisse place à la fête, baignée dans la lumière dorée de la Riviera.',
    photo: '/photos/spi-aftersea-1.jpg',
  },
  {
    id: 'tournois', s: 0.60, e: 0.73,
    period: 'AfterSea', label: 'Tournois & Quiz', sub: '19h – 21h',
    desc: 'L\'ambiance monte d\'un cran. Beer-pong entre équipages, quiz culture SPI, défis improbables. Le village s\'anime, les rires résonnent entre les mâts. C\'est l\'esprit SPI dans toute sa folie.',
    photo: '/photos/spi-soiree-dj.jpg',
  },
  {
    id: 'projection', s: 0.71, e: 0.80,
    period: 'Projection', label: 'Photos & JT du jour', sub: '21h – 22h',
    desc: 'Le silence se fait. Sur le grand écran, les images du jour défilent — les plus belles manœuvres, les chutes mémorables, les moments de grâce. Le JT de la SPI, rituel sacré de chaque soir.',
    photo: '/photos/spi-12.jpg',
  },
  {
    id: 'soiree', s: 0.78, e: 1.0,
    period: 'Nuit', label: 'Soirée sous le chapiteau', sub: '22h – 2h',
    desc: 'Les basses vibrent sous la toile. La nuit s\'empare de la marina. Dancefloor, confettis, chants d\'équipages — la soirée SPI, celle dont on parlera encore dans dix ans.',
    photo: '/photos/spi-soiree-chapiteau.jpg',
  },
]

const MARKS = [
  { p: 0, l: '9h' }, { p: 0.059, l: '10h' }, { p: 0.118, l: '11h' },
  { p: 0.353, l: '15h' }, { p: 0.529, l: '18h' }, { p: 0.706, l: '21h' },
  { p: 0.765, l: '22h' }, { p: 1.0, l: '2h' },
]

/* ══ Stagger variants (titre mot-par-mot) ══════════════════════ */
const staggerParent = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.04, delayChildren: 0.05 } },
  exit: { opacity: 0, transition: { duration: 0.2 } },
}
const staggerChild = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.42, ease: "easeOut" as const } },
}

/* ══════════════════════════════════════════════════════════════════
   PAGE
══════════════════════════════════════════════════════════════════ */
export default function VillagePage() {
  const [progress, setProgress] = useState(0.30)
  const tintRef     = useRef<HTMLDivElement>(null)
  const parallaxRef = useRef<HTMLDivElement>(null)
  const cursorRef   = useRef<HTMLDivElement>(null)

  const act = useMemo((): Act => {
    const active = ACTS.filter(a => progress >= a.s && progress <= a.e)
    if (active.length) return active[active.length - 1]
    const past = ACTS.filter(a => progress > a.e)
    return past.length ? past[past.length - 1] : ACTS[0]
  }, [progress])

  const time   = getTime(progress)
  const actIdx = ACTS.findIndex(a => a.id === act.id)

  /* DOM direct — tint + photo filter */
  useEffect(() => {
    if (tintRef.current)
      tintRef.current.style.background = interpRgba(TINT, progress)
    if (parallaxRef.current)
      parallaxRef.current.style.filter =
        `brightness(${interpVal(BRIGHT, progress).toFixed(2)}) saturate(${interpVal(SAT, progress).toFixed(2)})`
  }, [progress])

  /* Souris / touch → progress + curseur + parallax */
  const update = useCallback((cx: number, cy: number) => {
    setProgress(clamp(cx / window.innerWidth))
    if (cursorRef.current)
      cursorRef.current.style.transform = `translate(${cx - 4}px, ${cy - 4}px)`
    if (parallaxRef.current) {
      const ox = (cx / window.innerWidth - 0.5) * 14
      const oy = (cy / window.innerHeight - 0.5) * 10
      parallaxRef.current.style.transform = `translate(${ox}px, ${oy}px) scale(1.06)`
    }
  }, [])

  useEffect(() => {
    const mm = (e: MouseEvent) => update(e.clientX, e.clientY)
    const tm = (e: TouchEvent) => update(e.touches[0].clientX, e.touches[0].clientY)
    window.addEventListener('mousemove', mm)
    window.addEventListener('touchmove', tm, { passive: true })
    return () => {
      window.removeEventListener('mousemove', mm)
      window.removeEventListener('touchmove', tm)
    }
  }, [update])

  return (
    <>
      <Header />

      {/* ══════════════════════════════════════════════════════════════
          HEADER VIDÉO — placeholder prêt à recevoir la vidéo
      ══════════════════════════════════════════════════════════════ */}
      <div
        className="relative overflow-hidden"
        style={{ height: 'clamp(520px, 78vh, 860px)', marginTop: 82 }}
      >
        {/* TODO: remplacer l'image par <video src="..." autoPlay muted loop playsInline> */}
        <Image
          src="/photos/spi-regate-village.jpg"
          alt="Le village SPI Dauphine"
          fill
          priority
          className="object-cover"
          style={{ objectPosition: 'center 55%' }}
          sizes="100vw"
        />

        {/* Gradients */}
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: 'linear-gradient(to bottom, rgba(5,10,20,0.18) 0%, rgba(5,10,20,0.15) 40%, rgba(5,10,20,0.65) 75%, #050a14 100%)' }}
          aria-hidden="true"
        />
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: 'linear-gradient(to right, rgba(5,10,20,0.5) 0%, rgba(5,10,20,0.15) 50%, transparent 100%)' }}
          aria-hidden="true"
        />

        {/* Contenu overlay */}
        <div className="absolute inset-0 flex flex-col justify-end">
          <div className="max-w-7xl mx-auto w-full px-6 sm:px-10 lg:px-16 pb-14 lg:pb-20">
            <motion.p
              initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}
              className="text-[#0BBFBF] font-bold uppercase mb-4"
              style={{ fontSize: 10, letterSpacing: '0.40em' }}
            >
              Marina di Imperia · Avril 2026
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65, delay: 0.2 }}
              className="text-white leading-tight mb-5"
              style={{ fontFamily: 'var(--font-playfair)', fontSize: 'clamp(2.4rem, 5vw, 4rem)', fontWeight: 700, textShadow: '0 2px 20px rgba(0,0,0,0.55)' }}
            >
              Le village <span style={{ color: '#E8A930' }}>SPI Dauphine</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.32 }}
              className="text-white/60 leading-relaxed max-w-xl"
              style={{ fontSize: 'clamp(0.88rem, 1.3vw, 1rem)' }}
            >
              Espace de vie au cœur du challenge — stands partenaires, animations sportives,
              AfterSea en bord de mer et soirées sous chapiteau. Sept jours où la compétition rencontre la fête.
            </motion.p>
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════════
          SECTION INFRASTRUCTURES
      ══════════════════════════════════════════════════════════════ */}
      <section
        id="infrastructures"
        style={{ background: 'linear-gradient(180deg, #050a14 0%, #060f1e 100%)' }}
        className="py-24 lg:py-32"
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">

          {/* ── En-tête de section ── */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="mb-16 lg:mb-20 max-w-3xl"
          >
            <div className="flex items-center gap-3 mb-5">
              <div className="h-px w-8 bg-[#0BBFBF]/50" />
              <span className="text-[#0BBFBF] text-[10px] font-bold uppercase tracking-[0.40em]">
                Le village d&apos;animation
              </span>
            </div>
            <h2
              className="text-white mb-6 leading-tight"
              style={{
                fontFamily: 'var(--font-playfair)',
                fontSize: 'clamp(2rem, 4vw, 3rem)',
                fontWeight: 700,
              }}
            >
              Ses <span style={{ color: '#E8A930' }}>infrastructures</span>
            </h2>
            <p className="text-white/50 leading-relaxed" style={{ fontSize: 'clamp(0.9rem, 1.4vw, 1.05rem)' }}>
              Espace de minimum <strong className="text-white/75 font-semibold">1 000 m²</strong> au cœur du dispositif,
              le village d&apos;animation accueille partenaires institutionnels et entreprises autour de stands,
              d&apos;activités et de sensibilisation. En soirée, il se transforme en lieu festif encadré — musique live,
              remises de prix — dans le strict respect des règles de sécurité et de tranquillité publique.
            </p>
          </motion.div>

          {/* ── Grille des infrastructures ── */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">

            {/* 1 — Restauration */}
            <InfraCard
              index={0}
              icon={Utensils}
              color="#0BBFBF"
              stat="75 m²"
              statLabel="3 tentes · 5×5 m"
              title="L'espace restauration"
              bullets={[
                'Débit de boissons Licence 3',
                'Snacks et petite restauration',
                'À caractère non commercial',
              ]}
            />

            {/* 2 — Écran LED */}
            <InfraCard
              index={1}
              icon={MonitorPlay}
              color="#E8A930"
              stat="15 m²"
              statLabel="Écran 3×5 m"
              title="L'écran géant LED"
              bullets={[
                'Dalle LED 3 m × 5 m',
                'Estrade de 24 m²',
                'Diffusions live & JT du soir',
              ]}
            />

            {/* 3 — Tentes entreprises */}
            <InfraCard
              index={2}
              icon={Building2}
              color="#1A6B8C"
              stat="90 m²"
              statLabel="10 tentes · 3×3 m"
              title="Les tentes entreprises"
              bullets={[
                '10 espaces de 9 m² chacun',
                'Stands partenaires & animations',
                'Configuration modulable',
              ]}
            />

            {/* 4 — Sécurité & organisation */}
            <InfraCard
              index={3}
              icon={ShieldCheck}
              color="#64748B"
              stat="36 m²"
              statLabel="4 tentes · 9 m²"
              title="Sécurité & organisation"
              bullets={[
                '2 tentes Protection civile',
                '2 tentes Centre opérationnel',
                'Dispositif réglementaire complet',
              ]}
            />

            {/* 5 — Chapiteau (featured — span 2 sur lg) */}
            <InfraCard
              index={4}
              icon={Tent}
              color="#E8A930"
              stat="240 m²"
              statLabel="12×20 m · structure principale"
              title="Le chapiteau"
              featured
              bullets={[
                'Structure piquetée ou lestée selon le terrain',
                '3 sorties de secours avec blocs lumineux',
                '3 blocs d\'éclairage de sécurité autonomes',
                '3 extincteurs AB + 1 extincteur CO₂',
              ]}
            />

          </div>
        </div>
      </section>

      {/* Curseur custom — journée type */}
      <div
        ref={cursorRef}
        aria-hidden="true"
        className="fixed pointer-events-none"
        style={{
          top: 0, left: 0, width: 8, height: 8,
          borderRadius: '50%', background: 'rgba(255,255,255,0.85)',
          zIndex: 9999, willChange: 'transform',
        }}
      />

      <div className="relative h-screen overflow-hidden" style={{ cursor: 'none', background: '#050a14' }}>

        {/* ══ PHOTOS — parallax wrapper + crossfade ══ */}
        <div
          ref={parallaxRef}
          className="absolute pointer-events-none"
          style={{
            inset: -16,
            zIndex: 1,
            willChange: 'transform, filter',
            transition: 'filter 0.15s linear',
          }}
        >
          {ACTS.map(a => (
            <div
              key={a.id}
              className="absolute inset-0"
              style={{
                opacity: act.id === a.id ? 1 : 0,
                transition: 'opacity 1.6s cubic-bezier(0.4, 0, 0.2, 1)',
                zIndex: act.id === a.id ? 2 : 1,
              }}
            >
              <Image src={a.photo} alt="" fill className="object-cover object-center"
                sizes="100vw" priority={a.id === 'briefing' || a.id === 'regate'} />
            </div>
          ))}
        </div>

        {/* ══ Teinte atmosphérique ══ */}
        <div ref={tintRef} className="absolute inset-0 pointer-events-none" style={{ zIndex: 8 }} aria-hidden="true" />

        {/* ══ Vignette discrète ══ */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse 88% 78% at 50% 38%, transparent 40%, rgba(0,0,0,0.42) 100%)',
            zIndex: 9,
          }}
          aria-hidden="true"
        />

        {/* ══ Gradient lisibilité ══ */}
        <div
          className="absolute inset-0 pointer-events-none"
          aria-hidden="true"
          style={{
            background: 'linear-gradient(to bottom, rgba(0,0,0,0.28) 0%, rgba(0,0,0,0.04) 28%, rgba(0,0,0,0.04) 52%, rgba(0,0,0,0.82) 100%)',
            zIndex: 10,
          }}
        />

        {/* ══ CONTENU ══ */}
        <div className="absolute inset-0 flex flex-col justify-between" style={{ paddingTop: 82, zIndex: 20 }}>

          {/* ── Heure (haut) ── */}
          <div className="px-10 sm:px-14 lg:px-20 pt-10 lg:pt-14 flex items-start justify-between">
            <div>
              <AnimatePresence mode="wait">
                <motion.p
                  key={act.period}
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="text-white/40 mb-2.5"
                  style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.50em', textTransform: 'uppercase' }}
                >
                  {act.period}
                </motion.p>
              </AnimatePresence>

              <div
                className="text-white tabular-nums leading-none"
                style={{
                  fontFamily: 'var(--font-playfair)',
                  fontSize: 'clamp(4.8rem, 12vw, 9.5rem)',
                  fontWeight: 700,
                  letterSpacing: '-0.045em',
                }}
              >
                {time}
              </div>
            </div>

            {/* Droite : lieu + indicateur scènes */}
            <div className="hidden sm:flex flex-col items-end" style={{ paddingTop: 4 }}>
              <p className="text-white/26" style={{ fontSize: 10, letterSpacing: '0.32em', textTransform: 'uppercase', fontWeight: 500 }}>
                Marina di Imperia
              </p>
              <p className="text-white/16 mt-1" style={{ fontSize: 10, letterSpacing: '0.28em', textTransform: 'uppercase', fontWeight: 500 }}>
                Avril 2026
              </p>

              {/* 7 traits verticaux — progression scènes */}
              <div className="flex items-end gap-1.5 mt-7">
                {ACTS.map((a, i) => (
                  <div
                    key={a.id}
                    style={{
                      width: 1.5,
                      height: actIdx === i ? 20 : 10,
                      borderRadius: 1,
                      background:
                        actIdx === i
                          ? 'rgba(255,255,255,0.85)'
                          : actIdx > i
                          ? 'rgba(255,255,255,0.30)'
                          : 'rgba(255,255,255,0.12)',
                      transition: 'all 0.5s cubic-bezier(0.22,1,0.36,1)',
                    }}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* ── Activité + barre (bas) ── */}
          <div className="px-10 sm:px-14 lg:px-20 pb-10 lg:pb-12">

            {/* Séparateur fin */}
            <div className="mb-7" style={{ height: 1, background: 'rgba(255,255,255,0.08)' }} />

            {/* Activité — titre staggered mot par mot */}
            <AnimatePresence mode="wait">
              <motion.div
                key={act.id}
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={staggerParent}
                className="mb-7"
              >
                <div className="flex items-end justify-between gap-6 mb-3">
                  <h2
                    className="text-white leading-tight"
                    style={{
                      fontFamily: 'var(--font-playfair)',
                      fontSize: 'clamp(1.1rem, 2.4vw, 1.65rem)',
                      fontWeight: 400,
                    }}
                  >
                    {act.label.split(' ').map((word, i) => (
                      <motion.span
                        key={i}
                        variants={staggerChild}
                        className="inline-block"
                        style={{ marginRight: '0.28em' }}
                      >
                        {word}
                      </motion.span>
                    ))}
                  </h2>
                  <motion.p
                    variants={staggerChild}
                    className="text-white/30 flex-shrink-0 mb-0.5 whitespace-nowrap"
                    style={{ fontSize: 10, letterSpacing: '0.30em', textTransform: 'uppercase', fontWeight: 500 }}
                  >
                    {act.sub}
                  </motion.p>
                </div>

                {/* Description — apparition douce décalée */}
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.7, delay: 0.30 }}
                  className="text-white/38 leading-relaxed max-w-xl"
                  style={{ fontSize: 13, letterSpacing: '0.005em' }}
                >
                  {act.desc}
                </motion.p>
              </motion.div>
            </AnimatePresence>

            {/* Barre de progression */}
            <div className="relative" style={{ height: 1, background: 'rgba(255,255,255,0.10)' }}>
              {ACTS.map(a => (
                <div
                  key={a.id}
                  className="absolute top-1/2 pointer-events-none"
                  style={{
                    left: `${a.s * 100}%`,
                    width: 1,
                    height: a.id === act.id ? 12 : 6,
                    background: a.id === act.id ? 'rgba(255,255,255,0.75)' : 'rgba(255,255,255,0.20)',
                    transform: 'translateY(-50%)',
                    transition: 'height 0.4s ease, background 0.4s ease',
                  }}
                />
              ))}

              <div
                className="absolute left-0 top-0"
                style={{
                  height: 1,
                  width: `${progress * 100}%`,
                  background: 'rgba(255,255,255,0.60)',
                  transition: 'width 0.05s linear',
                }}
              />

              <div
                className="absolute top-1/2"
                style={{
                  left: `${progress * 100}%`,
                  width: 7, height: 7,
                  borderRadius: '50%',
                  background: 'white',
                  transform: 'translate(-50%, -50%)',
                  transition: 'left 0.05s linear',
                  boxShadow: '0 0 12px rgba(255,255,255,0.55)',
                }}
              />
            </div>

            {/* Marqueurs heures */}
            <div className="relative mt-3" style={{ height: 14 }}>
              {MARKS.map(m => {
                const near = Math.abs(progress - m.p) < 0.045
                return (
                  <span
                    key={m.l}
                    className="absolute -translate-x-1/2 tabular-nums"
                    style={{
                      left: `${m.p * 100}%`,
                      fontSize: 9,
                      fontWeight: 500,
                      letterSpacing: '0.07em',
                      color: near ? 'rgba(255,255,255,0.68)' : 'rgba(255,255,255,0.18)',
                      transition: 'color 0.35s ease',
                    }}
                  >
                    {m.l}
                  </span>
                )
              })}
            </div>

          </div>
        </div>
      </div>

      <Footer />
    </>
  )
}

/* ══════════════════════════════════════════════════════════════════
   COMPOSANT CARD INFRASTRUCTURE
══════════════════════════════════════════════════════════════════ */
function InfraCard({
  index, icon: Icon, color, stat, statLabel, title, bullets, featured = false,
}: {
  index: number
  icon: React.ElementType
  color: string
  stat: string
  statLabel: string
  title: string
  bullets: string[]
  featured?: boolean
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.55, delay: index * 0.08, ease: 'easeOut' }}
      className={`relative rounded-2xl flex flex-col overflow-hidden ${featured ? 'sm:col-span-2 lg:col-span-2' : ''}`}
      style={{
        background: 'rgba(255,255,255,0.03)',
        border: '1px solid rgba(255,255,255,0.07)',
      }}
    >
      {/* Bande couleur haut */}
      <div className="h-[2px] w-full" style={{ background: `linear-gradient(90deg, ${color}, ${color}44)` }} />

      <div className="p-7 lg:p-8 flex flex-col gap-6 flex-1">

        {/* Icône + stat */}
        <div className={`flex ${featured ? 'items-start justify-between flex-wrap gap-4' : 'items-start justify-between'}`}>
          <div
            className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{ background: `${color}18`, border: `1px solid ${color}30` }}
          >
            <Icon className="w-5 h-5" style={{ color }} aria-hidden="true" />
          </div>

          <div className="text-right">
            <div
              className="font-bold leading-none tabular-nums"
              style={{
                fontFamily: 'var(--font-playfair)',
                fontSize: featured ? 'clamp(2rem, 3.5vw, 2.8rem)' : 'clamp(1.7rem, 2.8vw, 2.2rem)',
                color,
              }}
            >
              {stat}
            </div>
            <div className="text-white/30 mt-1" style={{ fontSize: 10, letterSpacing: '0.15em', textTransform: 'uppercase', fontWeight: 600 }}>
              {statLabel}
            </div>
          </div>
        </div>

        {/* Titre */}
        <h3
          className="text-white font-semibold leading-snug"
          style={{
            fontFamily: 'var(--font-playfair)',
            fontSize: featured ? 'clamp(1.15rem, 1.8vw, 1.35rem)' : 'clamp(1rem, 1.5vw, 1.15rem)',
          }}
        >
          {title}
        </h3>

        {/* Bullets */}
        <ul className={`flex flex-col gap-2 mt-auto ${featured ? 'sm:grid sm:grid-cols-2 sm:gap-x-8 sm:gap-y-2' : ''}`}>
          {bullets.map((b, i) => (
            <li key={i} className="flex items-start gap-2.5">
              <div
                className="w-1 h-1 rounded-full mt-[7px] flex-shrink-0"
                style={{ background: color }}
              />
              <span className="text-white/50 text-sm leading-relaxed">{b}</span>
            </li>
          ))}
        </ul>

      </div>
    </motion.div>
  )
}
