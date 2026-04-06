'use client'

import { useRef, useEffect } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Star, Users, Leaf, Radio, Percent, Banknote, Anchor, Building2 } from 'lucide-react'
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
        border: isYCF ? '1.5px solid rgba(200,162,77,0.55)' : '1px solid rgba(214,222,235,0.9)',
        boxShadow: isYCF ? '0 2px 14px rgba(200,162,77,0.14)' : '0 2px 8px rgba(0,0,0,0.06)',
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
                <div className="h-px bg-[#3DB8A4]/50 w-5" aria-hidden="true" />
                <p className="text-[#3DB8A4] font-bold uppercase tracking-[0.32em] whitespace-nowrap"
                  style={{ fontSize: 'clamp(8px, 0.75vw, 10px)' }}>
                  Ils nous soutiennent
                </p>
                <div className="h-px bg-[#3DB8A4]/50 w-5" aria-hidden="true" />
              </div>

              {/* Titre */}
              <h1
                className="text-[#0C1B33] leading-[1.18] flex-shrink-0"
                style={{
                  fontFamily: 'var(--font-playfair)',
                  fontSize: 'clamp(1.25rem, 3vw, 2.5rem)',
                  fontWeight: 700,
                }}
              >
                Un grand merci<br />
                à nos <span style={{ color: '#C8A24D' }}>partenaires</span>
              </h1>

              {/* Sous-titre */}
              <p className="text-[#8A95A8] flex-shrink-0" style={{ fontSize: 'clamp(0.68rem, 0.95vw, 0.82rem)', letterSpacing: '0.05em' }}>
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
            <span className="text-[8.5px] text-[#8A95A8] uppercase tracking-[0.28em] font-medium">Tous les partenaires</span>
            <div className="w-px h-5 bg-gradient-to-b from-[#8A95A8]/40 to-transparent" aria-hidden="true" />
          </motion.div>
        </div>

        {/* ══════════════════════════════════════════════════════
            GRILLE COMPLÈTE
        ══════════════════════════════════════════════════════ */}
        <section
          className="py-20 lg:py-28"
          style={{ background: '#0C1B33', borderTop: '1px solid rgba(255,255,255,0.06)' }}
        >
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55 }}
              className="text-center mb-10"
            >
              <p className="text-[#3DB8A4] text-[10px] font-bold uppercase tracking-[0.3em] mb-3">Nos 28 partenaires</p>
              <h2 className="text-white"
                style={{ fontFamily: 'var(--font-playfair)', fontSize: 'clamp(1.6rem, 3vw, 2.2rem)', fontWeight: 700 }}>
                Ensemble pour la <span style={{ color: '#C8A24D' }}>45ème édition</span>
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
                style={{ border: '1.5px solid rgba(200,162,77,0.4)', boxShadow: '0 4px 24px rgba(200,162,77,0.12)' }}>
                <div>
                  <p className="text-[9px] font-bold uppercase tracking-[0.22em] text-[#C8A24D] mb-0.5">Régate homologuée</p>
                  <p className="text-sm font-semibold text-[#0C1B33]">Yacht Club de France</p>
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
                    className="flex items-center justify-center bg-white rounded-xl border border-slate-100 hover:border-[#3DB8A4]/25 hover:shadow-md transition-all duration-200 p-3"
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
            POURQUOI S'ENGAGER
        ══════════════════════════════════════════════════════ */}
        <section className="py-20 lg:py-28 border-t border-slate-100" style={{ background: '#0C1B33' }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

            {/* En-tête */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="max-w-2xl mb-14"
            >
              <div className="flex items-center gap-3 mb-5">
                <div className="h-px w-8" style={{ background: 'rgba(200,162,77,0.5)' }} aria-hidden="true" />
                <span className="text-[10px] font-bold uppercase tracking-[0.40em]" style={{ color: '#C8A24D' }}>
                  Rejoindre l&apos;aventure
                </span>
              </div>
              <h2
                className="text-white leading-tight mb-4"
                style={{ fontFamily: 'var(--font-playfair)', fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 700 }}
              >
                Pourquoi s&apos;engager<br />
                <span style={{ color: '#C8A24D' }}>à nos côtés&nbsp;?</span>
              </h2>
              <p className="text-white/55 leading-relaxed" style={{ fontSize: 'clamp(0.9rem, 1.4vw, 1.05rem)' }}>
                S&apos;associer au Challenge SPI Dauphine, c&apos;est rejoindre un événement étudiant de référence — sportif, engagé, médiatisé —
                et bénéficier d&apos;une visibilité privilégiée auprès d&apos;un public jeune, qualifié et en mouvement.
              </p>
            </motion.div>

            {/* Bloc featured — Un événement de référence */}
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.06 }}
              className="grid lg:grid-cols-[3fr_2fr] gap-8 lg:gap-12 p-7 lg:p-10 rounded-2xl mb-5"
              style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.09)' }}
            >
              <div>
                <div className="flex items-center gap-3 mb-5">
                  <div
                    className="w-9 h-9 rounded-xl flex items-center justify-center"
                    style={{ background: 'rgba(200,162,77,0.12)', border: '1px solid rgba(200,162,77,0.25)' }}
                  >
                    <Star className="w-[18px] h-[18px]" style={{ color: '#C8A24D' }} aria-hidden="true" />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-[0.38em]" style={{ color: '#C8A24D' }}>
                    Un événement de référence
                  </span>
                </div>
                <h3
                  className="text-white font-bold leading-tight mb-4"
                  style={{ fontFamily: 'var(--font-playfair)', fontSize: 'clamp(1.3rem, 2.2vw, 1.75rem)' }}
                >
                  45 ans de voile étudiante,<br />soutenu par le Yacht Club de France
                </h3>
                <p className="text-white/55 leading-relaxed" style={{ fontSize: 'clamp(0.88rem, 1.15vw, 0.97rem)' }}>
                  Organisé depuis 1981, le Challenge SPI Dauphine est une régate homologuée et reconnue,
                  soutenue par le Yacht Club de France. Chaque édition réunit des étudiants issus d&apos;universités,
                  de grandes écoles de commerce et d&apos;écoles d&apos;ingénieurs — des profils académiques d&apos;excellence,
                  reconnus en France comme à l&apos;international.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-3 content-start">
                {([
                  { val: '45', label: 'ans d\'existence' },
                  { val: '+1 000', label: 'étudiants par édition' },
                  { val: 'YCF', label: 'Yacht Club de France' },
                  { val: '36', label: 'équipages en course' },
                ] as { val: string; label: string }[]).map(({ val, label }) => (
                  <div
                    key={label}
                    className="p-4 rounded-xl text-center"
                    style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}
                  >
                    <div
                      className="font-bold tabular-nums mb-1"
                      style={{ fontFamily: 'var(--font-playfair)', fontSize: 'clamp(1.15rem, 2vw, 1.45rem)', color: '#C8A24D' }}
                    >
                      {val}
                    </div>
                    <div
                      className="text-white/30 font-semibold"
                      style={{ fontSize: 9, letterSpacing: '0.12em', textTransform: 'uppercase' }}
                    >
                      {label}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Deux cards — Opportunité & Valeurs */}
            <div className="grid sm:grid-cols-2 gap-5">

              {/* Opportunité entreprise */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: 0.1 }}
                className="p-7 rounded-2xl flex flex-col gap-5"
                style={{ background: 'rgba(61,184,164,0.05)', border: '1px solid rgba(61,184,164,0.14)' }}
              >
                <div className="flex items-center gap-3">
                  <div
                    className="w-9 h-9 rounded-xl flex items-center justify-center"
                    style={{ background: 'rgba(61,184,164,0.12)', border: '1px solid rgba(61,184,164,0.22)' }}
                  >
                    <Users className="w-[18px] h-[18px]" style={{ color: '#3DB8A4' }} aria-hidden="true" />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-[0.35em]" style={{ color: '#3DB8A4' }}>
                    Opportunité entreprise
                  </span>
                </div>
                <div>
                  <h3
                    className="text-white font-bold leading-tight mb-3"
                    style={{ fontFamily: 'var(--font-playfair)', fontSize: 'clamp(1.1rem, 1.8vw, 1.3rem)' }}
                  >
                    Un public qualifié, dans un cadre idéal pour votre marque employeur
                  </h3>
                  <p className="text-white/50 text-sm leading-relaxed mb-5">
                    Devenir partenaire, c&apos;est bénéficier d&apos;une visibilité privilégiée auprès d&apos;un public jeune, engagé et qualifié —
                    et d&apos;une opportunité concrète de rencontrer des étudiants intéressés par des stages, alternances et emplois,
                    dans un environnement à la fois professionnel, sportif et fédérateur.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {['Marque employeur', 'Stages & alternances', 'Recrutement', 'Networking'].map(tag => (
                      <span
                        key={tag}
                        className="px-2.5 py-1 rounded-full text-[10px] font-semibold"
                        style={{ background: 'rgba(61,184,164,0.10)', color: 'rgba(61,184,164,0.80)', border: '1px solid rgba(61,184,164,0.20)' }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>

              {/* Valeurs partagées */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: 0.17 }}
                className="p-7 rounded-2xl flex flex-col gap-5"
                style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}
              >
                <div className="flex items-center gap-3">
                  <div
                    className="w-9 h-9 rounded-xl flex items-center justify-center"
                    style={{ background: 'rgba(26,140,107,0.12)', border: '1px solid rgba(26,140,107,0.22)' }}
                  >
                    <Leaf className="w-[18px] h-[18px]" style={{ color: '#1A8C6B' }} aria-hidden="true" />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-[0.35em]" style={{ color: '#1A8C6B' }}>
                    Des valeurs partagées
                  </span>
                </div>
                <div>
                  <h3
                    className="text-white font-bold leading-tight mb-3"
                    style={{ fontFamily: 'var(--font-playfair)', fontSize: 'clamp(1.1rem, 1.8vw, 1.3rem)' }}
                  >
                    S&apos;associer à un projet à fort impact positif
                  </h3>
                  <p className="text-white/50 text-sm leading-relaxed mb-5">
                    Soutenir la SPI, c&apos;est s&apos;associer à des valeurs fortes et à un événement à notoriété croissante,
                    à impact positif pour ses partenaires comme pour le territoire d&apos;accueil.
                  </p>
                  <div className="grid grid-cols-2 gap-y-3 gap-x-4">
                    {([
                      { label: 'Esprit d\'équipe',          color: '#C8A24D' },
                      { label: 'Performance',               color: '#3DB8A4' },
                      { label: 'Engagement sociétal',       color: '#E2593A' },
                      { label: 'Engagement environnemental', color: '#1A8C6B' },
                    ] as { label: string; color: string }[]).map(({ label, color }) => (
                      <div key={label} className="flex items-center gap-2.5">
                        <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: color }} aria-hidden="true" />
                        <span className="text-white/58 text-sm leading-snug">{label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>

          </div>
        </section>

        {/* ══════════════════════════════════════════════════════
            BILAN MÉDIATIQUE
        ══════════════════════════════════════════════════════ */}
        <section className="py-20 lg:py-24 border-t border-white/6" style={{ background: '#070D1F' }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

              {/* Texte */}
              <motion.div
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <div className="flex items-center gap-3 mb-5">
                  <div
                    className="w-9 h-9 rounded-xl flex items-center justify-center"
                    style={{ background: 'rgba(200,162,77,0.12)', border: '1px solid rgba(200,162,77,0.22)' }}
                  >
                    <Radio className="w-[18px] h-[18px]" style={{ color: '#C8A24D' }} aria-hidden="true" />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-[0.38em]" style={{ color: '#C8A24D' }}>
                    Rayonnement · Visibilité
                  </span>
                </div>
                <h2
                  className="text-white leading-tight mb-5"
                  style={{ fontFamily: 'var(--font-playfair)', fontSize: 'clamp(1.7rem, 3.2vw, 2.4rem)', fontWeight: 700 }}
                >
                  Un événement qui résonne<br />
                  <span style={{ color: '#C8A24D' }}>bien au-delà de la marina</span>
                </h2>
                <p className="text-white/55 leading-relaxed mb-4" style={{ fontSize: 'clamp(0.88rem, 1.15vw, 0.97rem)' }}>
                  Le Challenge SPI Dauphine bénéficie d&apos;un écho médiatique réel — presse nautique, médias grand public,
                  relais institutionnels et numériques. Devenir partenaire, c&apos;est s&apos;inscrire dans un environnement
                  médiatique crédible et valorisant.
                </p>
                <p className="text-white/40 text-sm leading-relaxed">
                  Chaque édition génère des retombées presse, des publications digitales et une visibilité
                  auprès des communautés étudiantes, nautiques et institutionnelles en France et en Europe.
                </p>
              </motion.div>

              {/* Chips médias */}
              <motion.div
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                <p
                  className="text-[10px] font-bold uppercase tracking-[0.30em] mb-5"
                  style={{ color: 'rgba(255,255,255,0.28)' }}
                >
                  Ils ont parlé de nous
                </p>
                <div className="flex flex-wrap gap-3">
                  {[
                    'Course au Large',
                    'BFM TV',
                    'France Inter',
                    'NRJ',
                    'Le Figaro Nautisme',
                    'Var-Matin',
                    'Dauphine · PSL',
                  ].map((media, i) => (
                    <motion.div
                      key={media}
                      initial={{ opacity: 0, scale: 0.92 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.35, delay: 0.12 + i * 0.05 }}
                      className="px-4 py-2.5 rounded-xl"
                      style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.10)' }}
                    >
                      <span className="text-white/70 text-sm font-semibold">{media}</span>
                    </motion.div>
                  ))}
                </div>
                <p
                  className="mt-6 text-xs leading-relaxed"
                  style={{ color: 'rgba(255,255,255,0.25)', fontStyle: 'italic' }}
                >
                  Retombées presse, couverture digitale et relais institutionnels — 45ème édition · 2026
                </p>
              </motion.div>

            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════
            VOTRE PARTICIPATION — IMPACT DU SOUTIEN
        ══════════════════════════════════════════════════════ */}
        <section className="py-20 lg:py-28 border-t border-white/6" style={{ background: '#0C1B33' }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

            {/* Badge fiscal 60% + intro */}
            <div className="grid lg:grid-cols-[auto_1fr] gap-10 lg:gap-16 items-start mb-14">

              <motion.div
                initial={{ opacity: 0, scale: 0.94 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55 }}
                className="flex-shrink-0 text-center px-10 py-8 rounded-2xl"
                style={{ background: 'rgba(200,162,77,0.07)', border: '1px solid rgba(200,162,77,0.22)' }}
              >
                <div
                  className="font-bold tabular-nums leading-none mb-1"
                  style={{ fontFamily: 'var(--font-playfair)', fontSize: 'clamp(3.5rem, 8vw, 5rem)', color: '#C8A24D' }}
                >
                  60<span style={{ fontSize: '55%' }}>%</span>
                </div>
                <p className="text-white/55 text-sm font-semibold mb-1">de déduction fiscale</p>
                <p className="text-white/28 text-[10px] uppercase tracking-[0.18em]">association loi 1901</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.08 }}
              >
                <div className="flex items-center gap-3 mb-5">
                  <div
                    className="w-9 h-9 rounded-xl flex items-center justify-center"
                    style={{ background: 'rgba(200,162,77,0.12)', border: '1px solid rgba(200,162,77,0.22)' }}
                  >
                    <Percent className="w-[18px] h-[18px]" style={{ color: '#C8A24D' }} aria-hidden="true" />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-[0.38em]" style={{ color: '#C8A24D' }}>
                    Votre participation
                  </span>
                </div>
                <h2
                  className="text-white leading-tight mb-5"
                  style={{ fontFamily: 'var(--font-playfair)', fontSize: 'clamp(1.7rem, 3.2vw, 2.4rem)', fontWeight: 700 }}
                >
                  Voir concrètement<br />
                  <span style={{ color: '#C8A24D' }}>l&apos;impact de son soutien</span>
                </h2>
                <p className="text-white/55 leading-relaxed" style={{ fontSize: 'clamp(0.88rem, 1.15vw, 0.97rem)' }}>
                  Le Challenge SPI Dauphine est une association loi 1901. Votre soutien ouvre droit à une déduction fiscale
                  équivalente à 60&nbsp;% du montant du don — et finance directement ce qui fait la réussite de l&apos;événement.
                </p>
              </motion.div>
            </div>

            {/* 2 colonnes : ce que ça finance / ce que ça permet */}
            <div className="grid sm:grid-cols-2 gap-5 mb-8">

              <motion.div
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: 0.05 }}
                className="p-7 rounded-2xl"
                style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}
              >
                <p
                  className="text-[10px] font-bold uppercase tracking-[0.30em] mb-5"
                  style={{ color: 'rgba(255,255,255,0.30)' }}
                >
                  Votre participation finance
                </p>
                <div className="flex flex-col gap-3.5">
                  {[
                    'Une sécurité renforcée pour tous les participants',
                    'Des infrastructures solides et accueillantes',
                    'Des services pensés pour l\'expérience des participants et du public',
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0" style={{ background: '#C8A24D' }} aria-hidden="true" />
                      <span className="text-white/60 text-sm leading-relaxed">{item}</span>
                    </div>
                  ))}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: 0.12 }}
                className="p-7 rounded-2xl"
                style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}
              >
                <p
                  className="text-[10px] font-bold uppercase tracking-[0.30em] mb-5"
                  style={{ color: 'rgba(255,255,255,0.30)' }}
                >
                  Votre engagement permet de
                </p>
                <div className="flex flex-col gap-3.5">
                  {[
                    'Développer des actions d\'inclusion concrètes',
                    'Investir dans des équipements durables',
                    'Proposer des activités sportives accessibles',
                    'Mener des actions de sensibilisation tout au long de la semaine',
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0" style={{ background: '#3DB8A4' }} aria-hidden="true" />
                      <span className="text-white/60 text-sm leading-relaxed">{item}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Quote callout */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: 0.15 }}
              className="p-6 rounded-2xl"
              style={{
                background: 'rgba(200,162,77,0.05)',
                borderLeft: '3px solid rgba(200,162,77,0.5)',
                border: '1px solid rgba(200,162,77,0.14)',
              }}
            >
              <p
                className="text-white/75 font-semibold leading-relaxed"
                style={{ fontFamily: 'var(--font-playfair)', fontSize: 'clamp(0.95rem, 1.5vw, 1.1rem)' }}
              >
                Chaque euro investi est fléché, lisible et assumé — il alimente un projet sportif,
                responsable et ouvert, qui transforme un simple événement en expérience collective à impact réel.
              </p>
            </motion.div>

          </div>
        </section>

        {/* ══════════════════════════════════════════════════════
            LES OFFRES DE SPONSORING
        ══════════════════════════════════════════════════════ */}
        <section className="py-20 lg:py-28 border-t border-white/6" style={{ background: '#070D1F' }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="max-w-xl mb-14"
            >
              <div className="flex items-center gap-3 mb-5">
                <div className="h-px w-8" style={{ background: 'rgba(61,184,164,0.5)' }} aria-hidden="true" />
                <span className="text-[10px] font-bold uppercase tracking-[0.40em]" style={{ color: '#3DB8A4' }}>
                  Formes de partenariat
                </span>
              </div>
              <h2
                className="text-white leading-tight mb-4"
                style={{ fontFamily: 'var(--font-playfair)', fontSize: 'clamp(1.7rem, 3.2vw, 2.4rem)', fontWeight: 700 }}
              >
                Les offres de <span style={{ color: '#C8A24D' }}>sponsoring</span>
              </h2>
              <p className="text-white/50 leading-relaxed" style={{ fontSize: 'clamp(0.88rem, 1.15vw, 0.97rem)' }}>
                Trois formes d&apos;engagement pour s&apos;associer à la 45ème édition — de la participation financière
                à la présence active sur le village et sur l&apos;eau.
              </p>
            </motion.div>

            <div className="grid sm:grid-cols-3 gap-5">
              {([
                {
                  icon: Banknote,
                  color: '#C8A24D',
                  titre: 'Partenariats financiers',
                  desc: 'Un soutien direct à l\'événement, avec visibilité logo sur l\'ensemble des supports de communication — affiche officielle, site, réseaux et diffusions sur place.',
                  tag: 'Visibilité · Notoriété',
                },
                {
                  icon: Anchor,
                  color: '#3DB8A4',
                  titre: 'Sailing & Business',
                  desc: 'Participez à la régate au sein d\'une équipe mixte étudiants–entreprise. Une expérience unique de cohésion, de dépassement et d\'immersion dans l\'événement.',
                  tag: 'Expérience · Team building',
                },
                {
                  icon: Building2,
                  color: '#1E6FA8',
                  titre: 'Village entreprises',
                  desc: 'Disposez d\'un espace de 9 m² au cœur du village d\'animation — stand, animations, contact direct avec plus d\'un millier de participants pendant toute la semaine.',
                  tag: 'Présence · Contact direct',
                },
              ] as { icon: React.ElementType; color: string; titre: string; desc: string; tag: string }[]).map(({ icon: Icon, color, titre, desc, tag }, i) => (
                <motion.div
                  key={titre}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.55, delay: i * 0.09 }}
                  className="p-7 rounded-2xl flex flex-col gap-5"
                  style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}
                >
                  <div>
                    <div
                      className="w-11 h-11 rounded-xl flex items-center justify-center mb-5"
                      style={{ background: `${color}15`, border: `1px solid ${color}28` }}
                    >
                      <Icon className="w-5 h-5" style={{ color }} aria-hidden="true" />
                    </div>
                    <h3
                      className="text-white font-bold leading-snug mb-3"
                      style={{ fontFamily: 'var(--font-playfair)', fontSize: 'clamp(1.1rem, 1.8vw, 1.25rem)' }}
                    >
                      {titre}
                    </h3>
                    <p className="text-white/50 text-sm leading-relaxed">{desc}</p>
                  </div>
                  <div className="mt-auto pt-4" style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }}>
                    <span
                      className="text-[10px] font-bold uppercase tracking-[0.22em]"
                      style={{ color }}
                    >
                      {tag}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>

          </div>
        </section>

        {/* ══════════════════════════════════════════════════════
            DEVENIR PARTENAIRE
        ══════════════════════════════════════════════════════ */}
        <section className="py-20 lg:py-28" style={{
          background: 'linear-gradient(135deg, #0C1B33 0%, #0F3460 50%, #0C1B33 100%)',
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
                <div className="h-px w-10 bg-[#C8A24D]/50" />
                <p className="text-[#C8A24D] text-[9px] font-bold uppercase tracking-[0.38em]">Rejoignez l'aventure</p>
                <div className="h-px w-10 bg-[#C8A24D]/50" />
              </div>

              {/* Titre */}
              <h2 className="text-white leading-tight mb-5"
                style={{ fontFamily: 'var(--font-playfair)', fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)', fontWeight: 700 }}>
                Devenez partenaire de la<br />
                <span style={{ color: '#C8A24D' }}>45ème édition</span>
              </h2>

              {/* CTA */}
              <div className="flex justify-center mt-8">
                <a
                  href="/contact"
                  className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full font-bold text-[#0C1B33] transition-all duration-200 hover:scale-105 cursor-pointer"
                  style={{
                    background: 'linear-gradient(135deg, #C8A24D 0%, #D4921A 100%)',
                    boxShadow: '0 6px 28px rgba(200,162,77,0.35)',
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
