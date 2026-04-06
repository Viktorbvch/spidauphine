'use client'

import { useState, useRef, useEffect, useCallback, useMemo } from 'react'
import Image from 'next/image'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'

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

/* ══ Hook: detect mobile ═══════════════════════════════════════ */
function useIsMobile(breakpoint = 768) {
  const [isMobile, setIsMobile] = useState(false)
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < breakpoint)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [breakpoint])
  return isMobile
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
  const isMobile = useIsMobile()
  const [progress, setProgress] = useState(0.30)
  const [mobileActIdx, setMobileActIdx] = useState(2) // Start at régate
  const tintRef     = useRef<HTMLDivElement>(null)
  const parallaxRef = useRef<HTMLDivElement>(null)
  const cursorRef   = useRef<HTMLDivElement>(null)

  const act = useMemo((): Act => {
    // On mobile, select directly by index
    if (isMobile) return ACTS[mobileActIdx] || ACTS[0]
    const active = ACTS.filter(a => progress >= a.s && progress <= a.e)
    if (active.length) return active[active.length - 1]
    const past = ACTS.filter(a => progress > a.e)
    return past.length ? past[past.length - 1] : ACTS[0]
  }, [progress, isMobile, mobileActIdx])

  const time   = getTime(progress)
  const actIdx = ACTS.findIndex(a => a.id === act.id)

  /* DOM direct — tint + photo filter (desktop only) */
  useEffect(() => {
    if (isMobile) return
    if (tintRef.current)
      tintRef.current.style.background = interpRgba(TINT, progress)
    if (parallaxRef.current)
      parallaxRef.current.style.filter =
        `brightness(${interpVal(BRIGHT, progress).toFixed(2)}) saturate(${interpVal(SAT, progress).toFixed(2)})`
  }, [progress, isMobile])

  /* Souris → progress + curseur + parallax (desktop only) */
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
    if (isMobile) return // No mouse tracking on mobile
    const mm = (e: MouseEvent) => update(e.clientX, e.clientY)
    window.addEventListener('mousemove', mm)
    return () => {
      window.removeEventListener('mousemove', mm)
    }
  }, [update, isMobile])

  /* Mobile: swipe gesture support */
  const touchStartX = useRef(0)
  useEffect(() => {
    if (!isMobile) return
    const onStart = (e: TouchEvent) => { touchStartX.current = e.touches[0].clientX }
    const onEnd = (e: TouchEvent) => {
      const dx = e.changedTouches[0].clientX - touchStartX.current
      if (Math.abs(dx) < 50) return // Ignore small movements
      if (dx < 0 && actIdx < ACTS.length - 1) {
        // Swipe left → next
        const next = actIdx + 1
        setMobileActIdx(next)
        setProgress((ACTS[next].s + ACTS[next].e) / 2)
      } else if (dx > 0 && actIdx > 0) {
        // Swipe right → prev
        const prev = actIdx - 1
        setMobileActIdx(prev)
        setProgress((ACTS[prev].s + ACTS[prev].e) / 2)
      }
    }
    window.addEventListener('touchstart', onStart, { passive: true })
    window.addEventListener('touchend', onEnd, { passive: true })
    return () => {
      window.removeEventListener('touchstart', onStart)
      window.removeEventListener('touchend', onEnd)
    }
  }, [isMobile, actIdx])

  return (
    <>
      <Header />

      {/* ══════════════════════════════════════════════════════════════
          HEADER VIDÉO — placeholder prêt à recevoir la vidéo
      ══════════════════════════════════════════════════════════════ */}
      <div
        className="relative overflow-hidden"
        style={{ height: 'clamp(380px, 65vh, 860px)', marginTop: 82 }}
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
          style={{ background: 'linear-gradient(to bottom, rgba(7,13,31,0.18) 0%, rgba(7,13,31,0.15) 40%, rgba(7,13,31,0.65) 75%, #070D1F 100%)' }}
          aria-hidden="true"
        />
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: 'linear-gradient(to right, rgba(7,13,31,0.5) 0%, rgba(7,13,31,0.15) 50%, transparent 100%)' }}
          aria-hidden="true"
        />

        {/* Contenu overlay */}
        <div className="absolute inset-0 flex flex-col justify-end">
          <div className="max-w-7xl mx-auto w-full px-5 sm:px-10 lg:px-16 pb-8 sm:pb-14 lg:pb-20">
            <motion.p
              initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}
              className="text-[#3DB8A4] font-bold uppercase mb-3 sm:mb-4"
              style={{ fontSize: 10, letterSpacing: '0.40em' }}
            >
              Marina di Imperia · Avril 2026
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65, delay: 0.2 }}
              className="text-white leading-tight mb-3 sm:mb-5"
              style={{ fontFamily: 'var(--font-playfair)', fontSize: 'clamp(1.8rem, 5vw, 4rem)', fontWeight: 400, textShadow: '0 2px 20px rgba(0,0,0,0.55)' }}
            >
              Le village <span style={{ color: '#C8A24D' }}>SPI Dauphine</span>
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
          SECTION : LE VILLAGE EN IMAGES
      ══════════════════════════════════════════════════════════════ */}
      <section
        id="infrastructures"
        style={{ background: '#070D1F' }}
        className="py-16 sm:py-24 lg:py-32"
      >
        <div className="max-w-7xl mx-auto px-5 sm:px-10 lg:px-16">

          {/* ── En-tête ── */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="mb-10 sm:mb-14 max-w-2xl"
          >
            <div className="flex items-center gap-3 mb-5">
              <div className="h-px w-8 bg-[#3DB8A4]/50" />
              <span className="text-[#3DB8A4] text-[10px] font-bold uppercase tracking-[0.40em]">
                Le village d&apos;animation
              </span>
            </div>
            <h2
              className="text-white mb-5 leading-tight"
              style={{ fontFamily: 'var(--font-playfair)', fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 700 }}
            >
              Une semaine <span style={{ color: '#C8A24D' }}>hors du commun</span>
            </h2>
            <p className="text-white/50 leading-relaxed" style={{ fontSize: 'clamp(0.9rem, 1.4vw, 1.05rem)' }}>
              Plus de 1 000 m² au cœur de la marina — stands partenaires, écran géant, chapiteau festif et espace de détente.
              Du briefing du matin à la soirée sous les étoiles, le village est le lieu de vie de la semaine SPI.
            </p>
          </motion.div>

          {/* ── Bento gallery ── */}
          <div
            className="grid gap-3 lg:gap-4"
            style={{
              gridTemplateColumns: 'repeat(3, 1fr)',
              gridTemplateRows: 'repeat(3, 230px)',
            }}
          >

            {/* Photo 1 — grande, col 1, rows 1-2 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ duration: 0.65 }}
              className="relative rounded-2xl overflow-hidden"
              style={{ gridColumn: '1', gridRow: '1 / 3' }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/photos/village-foule.jpg" alt="L'ambiance sur le village SPI" className="absolute inset-0 w-full h-full object-cover" />
              <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.1) 55%, transparent 100%)' }} />
              <div className="absolute bottom-0 left-0 p-5">
                <p className="font-bold uppercase mb-1.5" style={{ color: '#C8A24D', fontSize: 9, letterSpacing: '0.30em' }}>Ambiance</p>
                <p className="text-white font-semibold leading-snug" style={{ fontSize: 'clamp(0.95rem, 1.6vw, 1.1rem)', fontFamily: 'var(--font-playfair)' }}>
                  Le cœur battant<br />de la marina
                </p>
              </div>
            </motion.div>

            {/* Photo 2 — animations, col 2, row 1 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ duration: 0.65, delay: 0.07 }}
              className="relative rounded-2xl overflow-hidden"
              style={{ gridColumn: '2', gridRow: '1' }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/photos/village-animations.jpg" alt="Animations et défis sportifs" className="absolute inset-0 w-full h-full object-cover" />
              <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.68) 0%, transparent 60%)' }} />
              <div className="absolute bottom-0 left-0 p-4">
                <p className="font-bold uppercase mb-1" style={{ color: '#3DB8A4', fontSize: 9, letterSpacing: '0.28em' }}>Animations</p>
                <p className="text-white text-xs font-semibold">Défis & challenges</p>
              </div>
            </motion.div>

            {/* Photo 3 — écran géant, col 3, row 1 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ duration: 0.65, delay: 0.12 }}
              className="relative rounded-2xl overflow-hidden"
              style={{ gridColumn: '3', gridRow: '1' }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/photos/village-ecran.jpg" alt="Écran géant et projections live" className="absolute inset-0 w-full h-full object-cover" />
              <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.68) 0%, transparent 60%)' }} />
              <div className="absolute bottom-0 left-0 p-4">
                <p className="font-bold uppercase mb-1" style={{ color: '#C8A24D', fontSize: 9, letterSpacing: '0.28em' }}>Écran géant</p>
                <p className="text-white text-xs font-semibold">Live & JT du soir</p>
              </div>
            </motion.div>

            {/* Photo 4 — chapiteau, cols 2-3, row 2 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ duration: 0.65, delay: 0.16 }}
              className="relative rounded-2xl overflow-hidden"
              style={{ gridColumn: '2 / 4', gridRow: '2' }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/photos/village-chapiteau.jpg" alt="Le chapiteau et les soirées SPI" className="absolute inset-0 w-full h-full object-cover" />
              <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.70) 0%, rgba(0,0,0,0.08) 55%, transparent 100%)' }} />
              <div className="absolute bottom-0 left-0 right-0 p-5 flex items-end justify-between gap-6">
                <div>
                  <p className="font-bold uppercase mb-1" style={{ color: '#C8A24D', fontSize: 9, letterSpacing: '0.28em' }}>Chapiteau 240 m²</p>
                  <p className="text-white font-semibold leading-snug" style={{ fontSize: 'clamp(0.9rem, 1.4vw, 1rem)', fontFamily: 'var(--font-playfair)' }}>
                    Les soirées sous la grande toile
                  </p>
                </div>
                <p className="text-white/40 text-xs leading-relaxed max-w-[220px] hidden lg:block text-right">
                  Structure 12 × 20 m — son, lumière et dancefloor chaque soir.
                </p>
              </div>
            </motion.div>

            {/* Photo 5 — détente, full row 3 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ duration: 0.65, delay: 0.2 }}
              className="relative rounded-2xl overflow-hidden"
              style={{ gridColumn: '1 / 4', gridRow: '3' }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/photos/village-detente.jpg" alt="Espace détente et convivialité" className="absolute inset-0 w-full h-full object-cover object-center" />
              <div className="absolute inset-0" style={{ background: 'linear-gradient(to right, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.1) 50%, transparent 100%)' }} />
              <div className="absolute inset-y-0 left-0 flex flex-col justify-center p-6 lg:p-10">
                <p className="font-bold uppercase mb-2" style={{ color: '#3DB8A4', fontSize: 9, letterSpacing: '0.30em' }}>Espace détente</p>
                <p className="text-white font-semibold leading-snug mb-3" style={{ fontSize: 'clamp(0.95rem, 1.6vw, 1.15rem)', fontFamily: 'var(--font-playfair)' }}>
                  Entre deux courses, le village<br className="hidden lg:block" /> est un espace de convivialité
                </p>
                {/* Stats inline */}
                <div className="flex flex-wrap gap-5 lg:gap-8">
                  {[
                    { value: '1 000 m²', label: 'Surface totale' },
                    { value: '10 stands', label: 'Partenaires' },
                    { value: '3×5 m', label: 'Écran LED' },
                  ].map(({ value, label }) => (
                    <div key={label} className="flex items-baseline gap-1.5">
                      <span className="font-bold" style={{ fontFamily: 'var(--font-playfair)', fontSize: 'clamp(1rem, 1.8vw, 1.25rem)', color: '#C8A24D' }}>{value}</span>
                      <span className="text-white/35 uppercase" style={{ fontSize: 9, letterSpacing: '0.15em' }}>{label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          JOURNÉE TYPE — Desktop: cursor-driven · Mobile: tap cards
      ══════════════════════════════════════════════════════════════ */}

      {/* Curseur custom — desktop only */}
      {!isMobile && (
        <div
          ref={cursorRef}
          aria-hidden="true"
          className="fixed pointer-events-none hidden md:block"
          style={{
            top: 0, left: 0, width: 8, height: 8,
            borderRadius: '50%', background: 'rgba(255,255,255,0.85)',
            zIndex: 9999, willChange: 'transform',
          }}
        />
      )}

      {/* ── DESKTOP: cursor-driven immersive timeline ── */}
      <div className="hidden md:block relative h-screen overflow-hidden" style={{ cursor: 'none', background: '#070D1F' }}>

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
            <div className="flex flex-col items-end" style={{ paddingTop: 4 }}>
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

      {/* ── MOBILE: tap-to-navigate timeline ── */}
      <div className="md:hidden" style={{ background: '#070D1F' }}>

        {/* Eyebrow */}
        <div className="px-5 pt-10 pb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="h-px w-6 bg-[#C8A24D]/40" />
            <span
              className="text-[10px] font-bold uppercase tracking-[0.35em]"
              style={{ color: '#C8A24D', fontFamily: 'var(--font-mono)' }}
            >
              Journée type
            </span>
          </div>
          <h2
            className="text-white leading-tight"
            style={{ fontFamily: 'var(--font-playfair)', fontSize: 'clamp(1.6rem, 6vw, 2rem)', fontWeight: 400 }}
          >
            De 9h à 2h du matin
          </h2>
        </div>

        {/* Active card — photo + content */}
        <div className="relative" style={{ minHeight: '70svh' }}>

          {/* Photo background */}
          <AnimatePresence mode="wait">
            <motion.div
              key={act.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8 }}
              className="absolute inset-0"
            >
              <Image
                src={act.photo}
                alt={act.label}
                fill
                className="object-cover"
                sizes="100vw"
                priority={act.id === 'briefing' || act.id === 'regate'}
              />
            </motion.div>
          </AnimatePresence>

          {/* Tint */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ background: interpRgba(TINT, (act.s + act.e) / 2) }}
            aria-hidden="true"
          />

          {/* Gradient overlay for text readability */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ background: 'linear-gradient(to bottom, rgba(7,13,31,0.15) 0%, rgba(7,13,31,0.20) 30%, rgba(7,13,31,0.75) 65%, rgba(7,13,31,0.95) 100%)' }}
            aria-hidden="true"
          />

          {/* Content overlay */}
          <div className="relative z-10 flex flex-col justify-end h-full" style={{ minHeight: '70svh' }}>

            {/* Step indicator dots */}
            <div className="px-5 mb-4">
              <div className="flex items-center gap-1.5">
                {ACTS.map((a, i) => (
                  <button
                    key={a.id}
                    onClick={() => {
                      setMobileActIdx(i)
                      setProgress((ACTS[i].s + ACTS[i].e) / 2)
                    }}
                    className="relative"
                    style={{
                      width: actIdx === i ? 24 : 6,
                      height: 6,
                      borderRadius: 3,
                      background: actIdx === i ? '#C8A24D' : 'rgba(255,255,255,0.20)',
                      transition: 'all 0.4s cubic-bezier(0.22,1,0.36,1)',
                    }}
                    aria-label={`Voir ${a.label}`}
                  />
                ))}
              </div>
            </div>

            {/* Time + period */}
            <div className="px-5 mb-3">
              <p
                className="text-white/40 mb-1"
                style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.45em', textTransform: 'uppercase', fontFamily: 'var(--font-mono)' }}
              >
                {act.period}
              </p>
              <div
                className="text-white tabular-nums leading-none"
                style={{
                  fontFamily: 'var(--font-playfair)',
                  fontSize: 'clamp(3rem, 14vw, 5rem)',
                  fontWeight: 400,
                  letterSpacing: '-0.03em',
                }}
              >
                {act.sub}
              </div>
            </div>

            {/* Activity info */}
            <AnimatePresence mode="wait">
              <motion.div
                key={act.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.4 }}
                className="px-5 pb-5"
              >
                <h3
                  className="text-white leading-snug mb-2"
                  style={{ fontFamily: 'var(--font-playfair)', fontSize: 'clamp(1.15rem, 5vw, 1.4rem)', fontWeight: 400 }}
                >
                  {act.label}
                </h3>
                <p
                  className="text-white/45 leading-relaxed"
                  style={{ fontSize: 13 }}
                >
                  {act.desc}
                </p>
              </motion.div>
            </AnimatePresence>

            {/* Navigation buttons */}
            <div className="px-5 pb-8 flex items-center justify-between">
              <button
                onClick={() => {
                  const prev = Math.max(0, actIdx - 1)
                  setMobileActIdx(prev)
                  setProgress((ACTS[prev].s + ACTS[prev].e) / 2)
                }}
                disabled={actIdx === 0}
                className="flex items-center gap-2 py-2.5 px-4 rounded-full transition-all duration-200 active:scale-95"
                style={{
                  background: actIdx === 0 ? 'rgba(255,255,255,0.04)' : 'rgba(255,255,255,0.08)',
                  border: '1px solid rgba(255,255,255,0.10)',
                  opacity: actIdx === 0 ? 0.3 : 1,
                }}
                aria-label="Activité précédente"
              >
                <ChevronLeft className="w-4 h-4 text-white/70" />
                <span className="text-white/60 text-xs font-medium" style={{ fontFamily: 'var(--font-mono)' }}>Préc.</span>
              </button>

              <span
                className="text-white/20 text-[10px] tabular-nums"
                style={{ fontFamily: 'var(--font-mono)', letterSpacing: '0.12em' }}
              >
                {actIdx + 1} / {ACTS.length}
              </span>

              <button
                onClick={() => {
                  const next = Math.min(ACTS.length - 1, actIdx + 1)
                  setMobileActIdx(next)
                  setProgress((ACTS[next].s + ACTS[next].e) / 2)
                }}
                disabled={actIdx === ACTS.length - 1}
                className="flex items-center gap-2 py-2.5 px-4 rounded-full transition-all duration-200 active:scale-95"
                style={{
                  background: actIdx === ACTS.length - 1 ? 'rgba(255,255,255,0.04)' : 'rgba(255,255,255,0.08)',
                  border: '1px solid rgba(255,255,255,0.10)',
                  opacity: actIdx === ACTS.length - 1 ? 0.3 : 1,
                }}
                aria-label="Activité suivante"
              >
                <span className="text-white/60 text-xs font-medium" style={{ fontFamily: 'var(--font-mono)' }}>Suiv.</span>
                <ChevronRight className="w-4 h-4 text-white/70" />
              </button>
            </div>

          </div>
        </div>
      </div>

      <Footer />
    </>
  )
}

