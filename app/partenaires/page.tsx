'use client'

import { useRef, useEffect } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

/* ── Logos ───────────────────────────────────────────────────── */
const innerRing = [
  'Dauphine.png', 'FFV.svg', 'CVEC.png', 'YCF.png',
  'Logo_JPA_International.png', 'Red-Bull-Logo.png', 'Deliveroo-logo.png',
  'Logo-VandB-groupe-2023.png', 'Sumeria.png', 'Fondation-de-la-Mer.jpg',
  'Citta-di-Imperia.png', 'Marina-di-Imperia.jpg', 'FIV.png',
  'Vents-Differents.jpg', 'Un-geste-pour-la-mer.webp',
]

const outerRing = [
  'Ambassia.webp', 'Brasserie-Artisanale-de-Provence.png', 'CR-Custom.webp',
  'En-voiture-Simone.png', 'Espadrille-de-Venise.png', 'FF-Tag-Rugby.png',
  'Ineja.png', 'Misstinguett.jpg', 'OLAGO.png', 'Quadmission.png',
  'SafeHub.png', 'Secret-Arts-of-Spirit.png', 'Solly.svg',
  'nautistore.png', 'sportmate.png', 'YC-Imperia.png',
]

const INNER_DUR = 52   // secondes, sens horaire
const OUTER_DUR = 78   // secondes, sens anti-horaire
const CHIP_W    = 88   // px
const CHIP_H    = 56   // px

/* ── Point sur rectangle arrondi (coordonnées centrées sur 0,0) ─ */
function pointOnRoundedRect(t: number, w: number, h: number, r: number) {
  r = Math.min(r, Math.min(w, h) / 2)
  const sw = w - 2 * r
  const sh = h - 2 * r
  const arc = (Math.PI / 2) * r
  const perim = 2 * sw + 2 * sh + 4 * arc
  const d = (((t % 1) + 1) % 1) * perim

  const b1 = sw, b2 = b1 + arc, b3 = b2 + sh
  const b4 = b3 + arc, b5 = b4 + sw, b6 = b5 + arc, b7 = b6 + sh

  if (d < b1) return { x: -w / 2 + r + d, y: -h / 2 }
  if (d < b2) {
    const a = -Math.PI / 2 + ((d - b1) / arc) * (Math.PI / 2)
    return { x: w / 2 - r + r * Math.cos(a), y: -h / 2 + r + r * Math.sin(a) }
  }
  if (d < b3) return { x: w / 2, y: -h / 2 + r + (d - b2) }
  if (d < b4) {
    const a = ((d - b3) / arc) * (Math.PI / 2)
    return { x: w / 2 - r + r * Math.cos(a), y: h / 2 - r + r * Math.sin(a) }
  }
  if (d < b5) return { x: w / 2 - r - (d - b4), y: h / 2 }
  if (d < b6) {
    const a = Math.PI / 2 + ((d - b5) / arc) * (Math.PI / 2)
    return { x: -w / 2 + r + r * Math.cos(a), y: h / 2 - r + r * Math.sin(a) }
  }
  if (d < b7) return { x: -w / 2, y: h / 2 - r - (d - b6) }
  const a = Math.PI + ((d - b7) / arc) * (Math.PI / 2)
  return { x: -w / 2 + r + r * Math.cos(a), y: -h / 2 + r + r * Math.sin(a) }
}

/* ── Chip logo ──────────────────────────────────────────────── */
function LogoChip({ file }: { file: string }) {
  const name = file.replace(/\.[^.]+$/, '').replace(/[-_]/g, ' ')
  const isYCF = file === 'YCF.png'
  return (
    <div
      className="flex items-center justify-center bg-white rounded-xl transition-shadow duration-300 hover:shadow-lg"
      style={{
        width: CHIP_W, height: CHIP_H, padding: '8px 12px',
        border: isYCF ? '1.5px solid rgba(232,169,48,0.55)' : '1px solid rgba(214,222,235,0.9)',
        boxShadow: isYCF ? '0 2px 14px rgba(232,169,48,0.14)' : '0 2px 8px rgba(0,0,0,0.06)',
        transform: 'translate(-50%, -50%)',
      }}
      title={name}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={`/assets/partenaires/${file}`} alt={name} className="w-full h-full object-contain" loading="lazy" />
    </div>
  )
}

/* ══════════════════════════════════════════════════════════════ */
export default function PartenairesPage() {
  const sectionRef  = useRef<HTMLDivElement>(null)
  const panelRef    = useRef<HTMLDivElement>(null)
  const innerRefs   = useRef<(HTMLDivElement | null)[]>([])
  const outerRefs   = useRef<(HTMLDivElement | null)[]>([])
  const dimsRef     = useRef({ ow: 880, oh: 460, iw: 640, ih: 300, r: 50 })
  const rafRef      = useRef<number>(0)
  const startRef    = useRef(0)

  /* Calcul des dimensions du rectangle */
  useEffect(() => {
    const compute = () => {
      const s = sectionRef.current
      if (!s) return
      const vw = s.offsetWidth
      const ow = Math.min(vw * 0.70, 980)
      const oh = Math.min(ow * 0.50, 490)
      const iw = Math.max(ow - 230, 380)
      const ih = Math.max(oh - 150, 230)
      const r  = Math.min(ow * 0.055, 58)
      dimsRef.current = { ow, oh, iw, ih, r }

      /* Zone sûre : à l'intérieur du chemin intérieur, marge = demi-chip + 8px */
      const p = panelRef.current
      if (p) {
        p.style.width  = `${iw - CHIP_W - 16}px`
        p.style.height = `${ih - CHIP_H - 16}px`
      }
    }
    compute()
    const ro = new ResizeObserver(compute)
    if (sectionRef.current) ro.observe(sectionRef.current)
    return () => ro.disconnect()
  }, [])

  /* Boucle d'animation RAF — aucun setState, 0 re-render */
  useEffect(() => {
    startRef.current = performance.now()

    const tick = () => {
      const elapsed = (performance.now() - startRef.current) / 1000
      const { ow, oh, iw, ih, r } = dimsRef.current

      innerRefs.current.forEach((el, i) => {
        if (!el) return
        const t = ((elapsed / INNER_DUR) + (i / innerRing.length)) % 1
        const { x, y } = pointOnRoundedRect(t, iw, ih, r * 0.78)
        el.style.transform = `translate(calc(${x}px - 50%), calc(${y}px - 50%))`
      })

      outerRefs.current.forEach((el, i) => {
        if (!el) return
        // sens anti-horaire → t inversé
        const t = 1 - ((elapsed / OUTER_DUR) + (i / outerRing.length)) % 1
        const { x, y } = pointOnRoundedRect(t, ow, oh, r)
        el.style.transform = `translate(calc(${x}px - 50%), calc(${y}px - 50%))`
      })

      rafRef.current = requestAnimationFrame(tick)
    }

    rafRef.current = requestAnimationFrame(tick)
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current) }
  }, [])

  return (
    <>
      <Header />
      <main>

        {/* ══════════════════════════════════════════════════════
            HERO ORBITAL RECTANGULAIRE
        ══════════════════════════════════════════════════════ */}
        <div
          ref={sectionRef}
          className="relative flex items-center justify-center"
          style={{
            minHeight: 'max(100svh, 820px)',
            paddingTop:    'clamp(140px, 18vh, 200px)',
            paddingBottom: 'clamp(80px, 10vh, 120px)',
            background: 'radial-gradient(ellipse 85% 75% at 50% 52%, #E8F2FA 0%, #F4F8FC 40%, #EDF2F7 100%)',
          }}
        >
          {/* Logos ring intérieur */}
          {innerRing.map((file, i) => (
            <div
              key={`inner-${file}`}
              ref={el => { innerRefs.current[i] = el }}
              style={{ position: 'absolute', top: '50%', left: '50%', zIndex: 5 }}
            >
              <LogoChip file={file} />
            </div>
          ))}

          {/* Logos ring extérieur */}
          {outerRing.map((file, i) => (
            <div
              key={`outer-${file}`}
              ref={el => { outerRefs.current[i] = el }}
              style={{ position: 'absolute', top: '50%', left: '50%', zIndex: 5 }}
            >
              <LogoChip file={file} />
            </div>
          ))}

          {/* Contenu central — calé dans la zone sûre de l'anneau intérieur */}
          <div
            ref={panelRef}
            className="relative flex flex-col items-center justify-center text-center overflow-hidden"
            style={{
              zIndex: 10,
              pointerEvents: 'none',
              /* valeurs par défaut avant premier ResizeObserver */
              width:  `${640 - CHIP_W - 16}px`,
              height: `${300 - CHIP_H - 16}px`,
              gap: '6%',
              marginTop: '-12%',
            }}
          >
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: "easeOut" }}
              className="flex flex-col items-center justify-center w-full h-full"
              style={{ gap: '5%' }}
            >
              {/* Logo */}
              <Image
                src="/assets/logo.png"
                alt="SPI Dauphine"
                width={64}
                height={64}
                className="drop-shadow-md flex-shrink-0"
                style={{ width: 'clamp(44px, 6%, 68px)', height: 'auto' }}
              />

              {/* Eyebrow */}
              <div className="flex items-center gap-2 flex-shrink-0">
                <div className="h-px bg-[#0BBFBF]/50 w-5" aria-hidden="true" />
                <p className="text-[#0BBFBF] font-bold uppercase tracking-[0.32em] whitespace-nowrap"
                  style={{ fontSize: 'clamp(8px, 0.75vw, 10px)' }}>
                  Ils nous soutiennent
                </p>
                <div className="h-px bg-[#0BBFBF]/50 w-5" aria-hidden="true" />
              </div>

              {/* Titre */}
              <h1
                className="text-[#0B2545] leading-[1.18] flex-shrink-0"
                style={{
                  fontFamily: 'var(--font-playfair)',
                  fontSize: 'clamp(1.25rem, 3vw, 2.5rem)',
                  fontWeight: 700,
                }}
              >
                Un grand merci<br />
                à nos <span style={{ color: '#E8A930' }}>partenaires</span>
              </h1>

              {/* Sous-titre */}
              <p className="text-[#94A3B8] flex-shrink-0" style={{ fontSize: 'clamp(0.68rem, 0.95vw, 0.82rem)', letterSpacing: '0.05em' }}>
                28 partenaires · 45ème édition · 2026
              </p>
            </motion.div>
          </div>

          {/* Invite scroll */}
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            transition={{ delay: 1.3, duration: 0.6 }}
            className="absolute bottom-7 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5"
            style={{ zIndex: 10 }}
          >
            <span className="text-[8.5px] text-[#94A3B8] uppercase tracking-[0.28em] font-medium">Tous les partenaires</span>
            <div className="w-px h-5 bg-gradient-to-b from-[#94A3B8]/40 to-transparent" aria-hidden="true" />
          </motion.div>
        </div>

        {/* ══════════════════════════════════════════════════════
            GRILLE COMPLÈTE
        ══════════════════════════════════════════════════════ */}
        <section className="py-20 lg:py-28 bg-white border-t border-slate-100">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55 }}
              className="text-center mb-10"
            >
              <p className="text-[#0BBFBF] text-[10px] font-bold uppercase tracking-[0.3em] mb-3">Nos 28 partenaires</p>
              <h2 className="text-[#0B2545]"
                style={{ fontFamily: 'var(--font-playfair)', fontSize: 'clamp(1.6rem, 3vw, 2.2rem)', fontWeight: 700 }}>
                Ensemble pour la <span style={{ color: '#E8A930' }}>45ème édition</span>
              </h2>
            </motion.div>

            {/* YCF vedette */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex justify-center mb-8"
            >
              <div className="flex items-center gap-5 px-7 py-4 rounded-2xl bg-white"
                style={{ border: '1.5px solid rgba(232,169,48,0.4)', boxShadow: '0 4px 24px rgba(232,169,48,0.12)' }}>
                <div>
                  <p className="text-[9px] font-bold uppercase tracking-[0.22em] text-[#E8A930] mb-0.5">Régate homologuée</p>
                  <p className="text-sm font-semibold text-[#0B2545]">Yacht Club de France</p>
                </div>
                <div style={{ width: 100, height: 52 }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/assets/partenaires/YCF.png" alt="YCF" className="w-full h-full object-contain" />
                </div>
              </div>
            </motion.div>

            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-4">
              {[...innerRing, ...outerRing].map((file, i) => {
                const name = file.replace(/\.[^.]+$/, '').replace(/[-_]/g, ' ')
                return (
                  <motion.div key={file}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: (i % 6) * 0.04 }}
                    className="flex items-center justify-center bg-white rounded-xl border border-slate-100 hover:border-[#0BBFBF]/25 hover:shadow-md transition-all duration-200 p-3"
                    style={{ aspectRatio: '3/2' }}
                    title={name}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={`/assets/partenaires/${file}`} alt={name} className="w-full h-full object-contain" loading="lazy" />
                  </motion.div>
                )
              })}
            </div>

          </div>
        </section>

        {/* ══════════════════════════════════════════════════════
            DEVENIR PARTENAIRE
        ══════════════════════════════════════════════════════ */}
        <section className="py-20 lg:py-28" style={{
          background: 'linear-gradient(135deg, #0B2545 0%, #0F3460 50%, #0B2545 100%)',
        }}>
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.65 }}
              className="text-center"
            >
              {/* Eyebrow */}
              <div className="flex items-center justify-center gap-3 mb-6">
                <div className="h-px w-10 bg-[#E8A930]/50" />
                <p className="text-[#E8A930] text-[9px] font-bold uppercase tracking-[0.38em]">Rejoignez l'aventure</p>
                <div className="h-px w-10 bg-[#E8A930]/50" />
              </div>

              {/* Titre */}
              <h2 className="text-white leading-tight mb-5"
                style={{ fontFamily: 'var(--font-playfair)', fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)', fontWeight: 700 }}>
                Devenez partenaire de la<br />
                <span style={{ color: '#E8A930' }}>45ème édition</span>
              </h2>

              {/* CTA */}
              <div className="flex justify-center mt-8">
                <a
                  href="/contact"
                  className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full font-bold text-[#0B2545] transition-all duration-200 hover:scale-105 cursor-pointer"
                  style={{
                    background: 'linear-gradient(135deg, #E8A930 0%, #D4921A 100%)',
                    boxShadow: '0 6px 28px rgba(232,169,48,0.35)',
                    fontSize: '0.88rem',
                    letterSpacing: '0.04em',
                  }}
                >
                  Nous contacter
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </a>
              </div>

            </motion.div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  )
}
