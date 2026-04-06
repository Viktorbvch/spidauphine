'use client'

import Image from 'next/image'
import { useRef, useState, useEffect, useCallback } from 'react'
import { motion } from 'framer-motion'
import {
  ArrowLeft, Heart, Leaf, Users, Lightbulb,
  Play, Pause, Volume2, VolumeX, Camera,
  Trophy, GraduationCap, MapPin,
  ShieldCheck, AlertCircle, Award, Megaphone,
  Recycle, Trash2, BookOpen, Package,
} from 'lucide-react'
import Link from 'next/link'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

/* ── Jalons ─────────────────────────────────────────────────── */
const jalons = [
  { annee: '1981', fait: 'Fondée par des étudiants de Paris Dauphine — dont Catherine Chabaud, future première femme à boucler un tour du monde en solitaire.' },
  { annee: '1982', fait: 'Invention du binôme : une équipe étudiante + une équipe d\'entreprise sous la même enseigne. Un concept toujours inédit.' },
  { annee: '1986', fait: 'Cap sur la Méditerranée. La SPI trouve son identité : soleil, voile et esprit de fête sur les côtes du Sud.' },
  { annee: '2026', fait: '45ème édition à Marina di Imperia. +1 000 étudiants, 36 équipages, 7 jours. La plus grande régate universitaire du sud de la France.' },
]

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6, delay, ease: "easeOut" as const },
})

/* ══════════════════════════════════════════════════════════════
   LECTEUR VIDÉO PRINCIPAL (histoire)
══════════════════════════════════════════════════════════════ */
function MainVideoPlayer() {
  const videoRef      = useRef<HTMLVideoElement>(null)
  const containerRef  = useRef<HTMLDivElement>(null)
  const [playing, setPlaying] = useState(false)
  const [muted,   setMuted]   = useState(false)
  const [started, setStarted] = useState(false)
  const [progress, setProgress] = useState(0)

  // Démarre quand ≥ 2/3 de la vidéo sont visibles à l'écran
  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0]
        const v = videoRef.current; if (!v) return

        if (entry.intersectionRatio >= 0.66) {
          // ≥ 2/3 visible → lancer avec son
          v.muted = false
          v.play()
            .then(() => { setPlaying(true); setStarted(true); setMuted(false) })
            .catch(() => {
              // Navigateur bloque le son → fallback muet
              v.muted = true; setMuted(true)
              v.play().then(() => { setPlaying(true); setStarted(true) }).catch(() => {})
            })
        } else if (entry.intersectionRatio < 0.66 && !v.paused) {
          // Moins de 2/3 visible (scroll vers le haut ou vers le bas) → pause
          v.pause(); setPlaying(false)
        }
      },
      { threshold: [0, 0.66] }
    )

    observer.observe(container)
    return () => observer.disconnect()
  }, [started])

  const togglePlay = useCallback(() => {
    const v = videoRef.current; if (!v) return
    if (v.paused) { v.play(); setPlaying(true); setStarted(true) }
    else          { v.pause(); setPlaying(false) }
  }, [])

  const toggleMute = useCallback(() => {
    const v = videoRef.current; if (!v) return
    v.muted = !v.muted; setMuted(v.muted)
  }, [])

  const handleSeek = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const v = videoRef.current; if (!v) return
    const r = e.currentTarget.getBoundingClientRect()
    v.currentTime = ((e.clientX - r.left) / r.width) * v.duration
  }, [])

  return (
    <div
      ref={containerRef}
      className="relative w-full overflow-hidden rounded-2xl bg-black cursor-pointer"
      style={{ aspectRatio: '16/9' }}
    >
      <video
        ref={videoRef}
        src="/assets/spi-history.mp4"
        loop playsInline
        onTimeUpdate={() => {
          const v = videoRef.current
          if (v?.duration) setProgress((v.currentTime / v.duration) * 100)
        }}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        className="absolute inset-0 w-full h-full object-cover"
        onClick={togglePlay}
      />

      {/* Overlay play centré si en pause */}
      {!playing && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/35 z-10 gap-4" onClick={togglePlay}>
          <motion.div
            initial={{ scale: 0.85, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
            className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center"
          >
            <Play className="w-8 h-8 text-white fill-white ml-1" />
          </motion.div>
          {!started && (
            <p className="text-white/50 text-xs uppercase tracking-[0.2em] font-medium">
              Scrollez pour lancer la vidéo
            </p>
          )}
        </div>
      )}

      {/* Barre de contrôles */}
      <div
        className="absolute bottom-0 left-0 right-0 z-20 px-4 pb-4 pt-10 pointer-events-none"
        style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.65) 0%, transparent 100%)' }}
      >
        <div
          className="w-full h-1 bg-white/25 rounded-full mb-3 cursor-pointer hover:h-1.5 transition-all pointer-events-auto"
          onClick={handleSeek}
        >
          <div className="h-full rounded-full bg-[#C8A24D] transition-all duration-200" style={{ width: `${progress}%` }} />
        </div>
        <div className="flex items-center gap-3 pointer-events-auto">
          <button onClick={togglePlay} aria-label={playing ? 'Pause' : 'Lecture'}
            className="flex items-center justify-center w-9 h-9 rounded-full bg-white/15 hover:bg-white/25 transition-colors border border-white/20 cursor-pointer">
            {playing ? <Pause className="w-4 h-4 text-white fill-white" /> : <Play className="w-4 h-4 text-white fill-white ml-0.5" />}
          </button>
          <button onClick={toggleMute} aria-label={muted ? 'Activer le son' : 'Couper le son'}
            className="flex items-center justify-center w-9 h-9 rounded-full bg-white/15 hover:bg-white/25 transition-colors border border-white/20 cursor-pointer">
            {muted ? <VolumeX className="w-4 h-4 text-white" /> : <Volume2 className="w-4 h-4 text-white" />}
          </button>
          {muted && started && (
            <span className="text-[10px] text-white/50 font-medium uppercase tracking-wide">
              Son coupé · cliquez pour activer
            </span>
          )}
        </div>
      </div>
    </div>
  )
}

/* ══════════════════════════════════════════════════════════════
   CARTE VIDÉO ENGAGEMENT (hover-only)
══════════════════════════════════════════════════════════════ */
function EngagementVideoCard({
  src, tag, couleur, titre, desc, date, side,
}: {
  src: string; tag: string; couleur: string
  titre: string; desc: string; date: string; side: 'left' | 'right'
}) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [playing, setPlaying] = useState(false)
  const [muted,   setMuted]   = useState(true)
  const [hovered, setHovered] = useState(false)

  const handleEnter = useCallback(() => {
    setHovered(true)
    const v = videoRef.current; if (!v) return
    v.muted = true; setMuted(true)
    v.play().then(() => setPlaying(true)).catch(() => {})
  }, [])

  const handleLeave = useCallback(() => {
    setHovered(false)
    const v = videoRef.current; if (!v) return
    v.pause(); setPlaying(false)
  }, [])

  const toggleMute = useCallback((e: React.MouseEvent) => {
    e.stopPropagation()
    const v = videoRef.current; if (!v) return
    v.muted = !v.muted; setMuted(v.muted)
  }, [])

  return (
    <div
      className="relative overflow-hidden flex-1"
      style={{ aspectRatio: '4/3' }}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
    >
      <video
        ref={videoRef} src={src} loop playsInline muted
        onPlay={() => setPlaying(true)} onPause={() => setPlaying(false)}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700"
        style={{ transform: hovered ? 'scale(1.04)' : 'scale(1)' }}
      />

      {/* Overlay couleur directionnel */}
      <div className="absolute inset-0 pointer-events-none transition-opacity duration-300"
        style={{
          background: side === 'left'
            ? `linear-gradient(135deg, ${couleur}60 0%, transparent 65%)`
            : `linear-gradient(225deg, ${couleur}60 0%, transparent 65%)`,
          opacity: hovered ? 0.8 : 0.55,
        }}
        aria-hidden="true"
      />
      {/* Dégradé bas */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.82) 0%, rgba(0,0,0,0.2) 50%, transparent 100%)' }}
        aria-hidden="true"
      />

      {/* Icône play au centre si pas encore joué */}
      <div
        className="absolute inset-0 flex items-center justify-center transition-opacity duration-300 pointer-events-none"
        style={{ opacity: !hovered ? 1 : 0 }}
      >
        <div className="w-14 h-14 rounded-full bg-white/15 backdrop-blur-sm border border-white/25 flex items-center justify-center">
          <Play className="w-6 h-6 text-white/70 fill-white/70 ml-0.5" />
        </div>
      </div>

      {/* Contenu bas */}
      <div className="absolute bottom-0 left-0 right-0 p-5 z-10">
        <div className="flex items-center gap-2 mb-2">
          <span className="px-2.5 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-[0.2em] text-white"
            style={{ background: couleur }}>
            {tag}
          </span>
          <span className="text-white/45 text-[10px]">{date}</span>
        </div>
        <p className="text-white font-bold text-lg leading-tight mb-1.5" style={{ fontFamily: 'var(--font-playfair)' }}>
          {titre}
        </p>
        <p className="text-white/60 text-xs leading-relaxed line-clamp-2 transition-opacity duration-300"
          style={{ opacity: hovered ? 1 : 0.7 }}>
          {desc}
        </p>
      </div>

      {/* Bouton son — apparaît au hover */}
      <div className="absolute top-3 right-3 transition-opacity duration-200" style={{ opacity: hovered && playing ? 1 : 0 }}>
        <button onClick={toggleMute}
          className="w-8 h-8 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center border border-white/20 hover:bg-black/60 transition-colors cursor-pointer"
          aria-label={muted ? 'Activer le son' : 'Couper le son'}>
          {muted ? <VolumeX className="w-3.5 h-3.5 text-white" /> : <Volume2 className="w-3.5 h-3.5 text-white" />}
        </button>
      </div>
    </div>
  )
}

/* ══════════════════════════════════════════════════════════════
   CARTE JOURNÉE THÉMATIQUE (photo slot + contenu dark)
══════════════════════════════════════════════════════════════ */
function ThemeCard({
  icon: Icon, couleur, tag, date, titre, desc, photoSide = 'left', photo, index,
}: {
  icon: React.ElementType; couleur: string; tag: string; date: string
  titre: string; desc: string; photoSide?: 'left' | 'right'; photo?: string; index: number
}) {
  return (
    <motion.div
      {...fadeUp(index * 0.09)}
      className="flex flex-col md:flex-row overflow-hidden rounded-2xl"
      style={{ boxShadow: '0 4px 32px rgba(12,27,51,0.13)' }}
    >
      {/* Photo slot */}
      {photoSide === 'left' && (
        <div
          className="relative md:w-[42%] flex-shrink-0 min-h-[220px]"
          style={photo ? {} : { background: `linear-gradient(135deg, #0C1B33 0%, ${couleur}30 100%)` }}
        >
          {photo ? (
            <Image src={photo} alt={titre} fill className="object-cover" sizes="42vw" />
          ) : (
            <>
              <div className="absolute inset-0 opacity-5 pointer-events-none"
                style={{ backgroundImage: 'repeating-linear-gradient(45deg, currentColor 0, currentColor 1px, transparent 0, transparent 50%)', backgroundSize: '8px 8px', color: couleur }}
                aria-hidden="true"
              />
              <div className="relative z-10 flex h-full flex-col items-center justify-center gap-3 text-center px-6">
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center border border-white/10"
                  style={{ background: `${couleur}20` }}>
                  <Camera className="w-7 h-7" style={{ color: couleur }} />
                </div>
                <p className="text-white/35 text-[10px] uppercase tracking-[0.22em] font-semibold">Photo à venir</p>
              </div>
            </>
          )}
          {/* Stripe couleur gauche */}
          <div className="absolute left-0 top-0 bottom-0 w-1 rounded-l-2xl z-10" style={{ background: couleur }} aria-hidden="true" />
        </div>
      )}

      {/* Contenu */}
      <div className="flex-1 bg-[#0C1B33] p-7 lg:p-9 flex flex-col justify-between gap-5">
        {/* Header */}
        <div>
          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{ background: `${couleur}25`, border: `1px solid ${couleur}40` }}>
              <Icon className="w-5 h-5" style={{ color: couleur }} aria-hidden="true" />
            </div>
            <div>
              <span className="block text-[10px] font-bold uppercase tracking-[0.22em]" style={{ color: couleur }}>
                {tag}
              </span>
              <span className="block text-[11px] text-white/35 font-medium mt-0.5">{date}</span>
            </div>
          </div>
          <h3 className="text-white text-2xl font-bold mb-3 leading-tight" style={{ fontFamily: 'var(--font-playfair)' }}>
            {titre}
          </h3>
          <p className="text-white/55 text-sm leading-relaxed">{desc}</p>
        </div>

        {/* Footer tag */}
        <div className="pt-4 border-t border-white/8">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[10px] font-semibold uppercase tracking-[0.15em]"
            style={{ background: `${couleur}18`, color: couleur, border: `1px solid ${couleur}30` }}>
            <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: couleur }} aria-hidden="true" />
            SPI Dauphine · 45ème édition
          </div>
        </div>
      </div>

      {/* Photo slot right */}
      {photoSide === 'right' && (
        <div
          className="relative md:w-[42%] flex-shrink-0 min-h-[220px]"
          style={photo ? {} : { background: `linear-gradient(225deg, #0C1B33 0%, ${couleur}30 100%)` }}
        >
          {photo ? (
            <Image src={photo} alt={titre} fill className="object-cover" sizes="42vw" />
          ) : (
            <>
              <div className="absolute inset-0 opacity-5 pointer-events-none"
                style={{ backgroundImage: 'repeating-linear-gradient(45deg, currentColor 0, currentColor 1px, transparent 0, transparent 50%)', backgroundSize: '8px 8px', color: couleur }}
                aria-hidden="true"
              />
              <div className="relative z-10 flex h-full flex-col items-center justify-center gap-3 text-center px-6">
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center border border-white/10"
                  style={{ background: `${couleur}20` }}>
                  <Camera className="w-7 h-7" style={{ color: couleur }} />
                </div>
                <p className="text-white/35 text-[10px] uppercase tracking-[0.22em] font-semibold">Photo à venir</p>
              </div>
            </>
          )}
          <div className="absolute right-0 top-0 bottom-0 w-1 rounded-r-2xl z-10" style={{ background: couleur }} aria-hidden="true" />
        </div>
      )}
    </motion.div>
  )
}

/* ══════════════════════════════════════════════════════════════
   PAGE
══════════════════════════════════════════════════════════════ */
export default function EngagementPage() {
  return (
    <>
      <Header />
      <main className="bg-[#0C1B33]">

        {/* ══════════════════════════════════════════════════════
            BANNIÈRE — fondu vers le navy en dessous
        ══════════════════════════════════════════════════════ */}
        <div className="relative overflow-hidden" style={{ height: 'clamp(560px, 78vh, 820px)' }}>
          <Image
            src="/photos/aftersea.jpg"
            alt="Voilier du Challenge SPI Dauphine avec spinnaker rouge"
            fill priority
            className="object-cover"
            sizes="100vw"
            style={{ objectPosition: 'center 45%', transform: 'scale(0.92)', transformOrigin: 'center center' }}
          />
          {/* Fondu navy en bas (vers la section suivante) */}
          <div className="absolute inset-0 pointer-events-none"
            style={{ background: 'linear-gradient(to bottom, rgba(12,27,51,0.05) 0%, rgba(12,27,51,0.15) 35%, rgba(12,27,51,0.55) 65%, #0C1B33 100%)' }}
            aria-hidden="true"
          />
          {/* Fondu gauche pour lisibilité du titre */}
          <div className="absolute inset-0 pointer-events-none"
            style={{ background: 'linear-gradient(to right, rgba(12,27,51,0.6) 0%, rgba(12,27,51,0.2) 50%, transparent 100%)' }}
            aria-hidden="true"
          />

          {/* Back */}
          <div className="absolute top-[82px] left-0 right-0 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Link href="/" className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full border border-white/25 bg-white/10 backdrop-blur-sm text-white/80 hover:text-white hover:bg-white/18 hover:border-white/40 transition-all duration-200 text-sm font-medium cursor-pointer group">
              <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform duration-200" />
              Retour à l'accueil
            </Link>
          </div>

          {/* Titre */}
          <div className="absolute inset-0 flex flex-col justify-end pointer-events-none">
            <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pb-14 lg:pb-18">
              <motion.div
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.1 }}
                className="flex items-center gap-3 mb-5"
              >
                <div className="h-px w-8 bg-[#3DB8A4]/40" />
                <p
                  className="text-[10px] font-bold uppercase tracking-[0.4em]"
                  style={{ fontFamily: 'var(--font-mono)', color: 'rgba(61,184,164,0.8)', textShadow: '0 1px 8px rgba(0,0,0,0.6)' }}
                >
                  Challenge SPI Dauphine · 45ème édition
                </p>
              </motion.div>
              <motion.h1
                initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65, delay: 0.22, ease: [0.25, 0.1, 0.25, 1] }}
                className="text-white"
                style={{ fontFamily: 'var(--font-playfair)', fontSize: 'clamp(2.4rem, 5vw, 4rem)', fontWeight: 400, lineHeight: 1.08, letterSpacing: '-0.01em', textShadow: '0 2px 24px rgba(0,0,0,0.45)' }}
              >
                Histoire &amp; <span style={{ color: '#C8A24D', fontStyle: 'italic' }}>engagements</span>
              </motion.h1>
            </div>
          </div>
        </div>

        {/* ══════════════════════════════════════════════════════
            VIDÉO HISTOIRE
        ══════════════════════════════════════════════════════ */}
        <section>
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-2 pb-16 lg:pb-20">
            <motion.div {...fadeUp()} className="flex flex-wrap items-end justify-between gap-4 mb-8">
              <div>
                <p className="text-[#3DB8A4] text-[10px] font-semibold uppercase tracking-[0.3em] mb-3">La SPI en images</p>
                <h2 className="text-white" style={{ fontFamily: 'var(--font-playfair)', fontSize: 'clamp(1.6rem, 3vw, 2.4rem)', fontWeight: 700 }}>
                  Revivez <span style={{ color: '#C8A24D' }}>45 ans</span> de SPI
                </h2>
              </div>
              <p className="text-white/35 text-sm max-w-xs leading-relaxed">
                De 1981 à aujourd'hui — une histoire écrite par des milliers d'étudiants passionnés.
              </p>
            </motion.div>
            <motion.div {...fadeUp(0.1)}>
              <MainVideoPlayer />
            </motion.div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════
            GENÈSE — la naissance de la SPI en 1981
        ══════════════════════════════════════════════════════ */}
        <section className="border-t border-white/6 py-14 lg:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">

              {/* Gauche : récit */}
              <motion.div {...fadeUp()}>
                <div className="flex items-center gap-3 mb-6">
                  <div className="h-px w-8" style={{ background: 'rgba(200,162,77,0.5)' }} />
                  <span className="text-[#C8A24D] text-[10px] font-bold uppercase tracking-[0.40em]">
                    La genèse · 1981
                  </span>
                </div>
                <h2
                  className="text-white mb-6 leading-tight"
                  style={{ fontFamily: 'var(--font-playfair)', fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)', fontWeight: 700 }}
                >
                  Nés d&apos;une <span style={{ color: '#C8A24D' }}>frustration</span>,<br />devenus une légende
                </h2>
                <p className="text-white/60 text-base leading-relaxed mb-5">
                  Tout commence par une conviction : les étudiants de Paris Dauphine méritent leur propre régate. Frustrés des conditions d&apos;accueil de la régate Edhec Voile, un groupe d&apos;étudiants passionnés décide en 1981 de créer quelque chose à eux — plus humain, plus festif, plus dauphinois.
                </p>
                <p className="text-white/60 text-base leading-relaxed mb-5">
                  Parmi les fondateurs, une jeune étudiante nommée Catherine Chabaud. Elle deviendra en 2000 la première femme à boucler un tour du monde en solitaire sans escale et sans assistance, puis Secrétaire d&apos;État chargée de la Mer sous le gouvernement Borne.
                </p>
                <p className="text-white/60 text-base leading-relaxed">
                  Quarante-cinq ans plus tard, la SPI rassemble chaque année plus de 1 000 étudiants en Méditerranée — toujours portée par cet esprit originel : la passion, l&apos;audace et le goût du large.
                </p>
              </motion.div>

              {/* Droite : citation + stats */}
              <motion.div {...fadeUp(0.15)} className="flex flex-col gap-5">
                <blockquote
                  className="relative p-8 rounded-2xl overflow-hidden"
                  style={{ background: 'rgba(200,162,77,0.06)', border: '1px solid rgba(200,162,77,0.15)' }}
                >
                  <div
                    className="absolute top-4 left-7 pointer-events-none select-none"
                    style={{ fontFamily: 'var(--font-playfair)', fontSize: '5.5rem', lineHeight: 1, color: 'rgba(200,162,77,0.18)' }}
                    aria-hidden="true"
                  >&ldquo;</div>
                  <p className="relative text-white/75 text-lg leading-relaxed italic mt-6" style={{ fontFamily: 'var(--font-playfair)' }}>
                    On voulait une régate qui ressemble à Dauphine — libre, joyeuse, et un peu folle.
                  </p>
                  <footer className="mt-5 flex items-center gap-3">
                    <div className="h-px flex-1" style={{ background: 'rgba(200,162,77,0.20)' }} />
                    <span className="text-[#C8A24D] text-[10px] font-bold uppercase tracking-[0.25em]">
                      Fondateurs · 1981
                    </span>
                  </footer>
                </blockquote>

                <div className="grid grid-cols-3 gap-3">
                  {[
                    { val: '1981', label: 'Année de fondation' },
                    { val: '45', label: 'Éditions au compteur' },
                    { val: '+1 000', label: 'Étudiants par an' },
                  ].map(stat => (
                    <div
                      key={stat.label}
                      className="text-center p-5 rounded-xl"
                      style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}
                    >
                      <div
                        className="font-bold mb-1.5 tabular-nums"
                        style={{ fontFamily: 'var(--font-playfair)', fontSize: 'clamp(1.3rem, 2.5vw, 1.7rem)', color: '#C8A24D' }}
                      >
                        {stat.val}
                      </div>
                      <div
                        className="text-white/35 font-semibold"
                        style={{ fontSize: 9, letterSpacing: '0.14em', textTransform: 'uppercase' }}
                      >
                        {stat.label}
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>

            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════
            HISTOIRE — jalons
        ══════════════════════════════════════════════════════ */}
        <section className="border-t border-white/6 py-14 lg:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div {...fadeUp()} className="max-w-xl mb-10">
              <p className="text-[#3DB8A4] text-[10px] font-semibold uppercase tracking-[0.3em] mb-3">Depuis 1981</p>
              <h2 className="text-white mb-3" style={{ fontFamily: 'var(--font-playfair)', fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)', fontWeight: 700 }}>
                Une histoire de <span style={{ color: '#C8A24D' }}>passion</span>
              </h2>
              <p className="text-white/50 text-base leading-relaxed">
                Né de la volonté d'étudiants de Paris Dauphine, le Challenge SPI est devenu en 45 ans l'événement étudiant le plus emblématique du sud de l'Europe.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-0">
              {jalons.map((j, i) => (
                <motion.div key={j.annee} {...fadeUp(i * 0.08)}
                  className="relative pl-6 pr-6 pb-10 lg:pb-0"
                  style={{ borderLeft: '2px solid', borderColor: j.annee === '2026' ? '#C8A24D' : 'rgba(255,255,255,0.1)' }}
                >
                  <div className="absolute left-0 top-0 w-3 h-3 rounded-full -translate-x-[7px]"
                    style={{ backgroundColor: j.annee === '2026' ? '#C8A24D' : 'rgba(255,255,255,0.4)', boxShadow: j.annee === '2026' ? '0 0 0 4px rgba(200,162,77,0.2)' : 'none' }}
                    aria-hidden="true"
                  />
                  <p className="text-3xl font-bold mb-3 tabular-nums"
                    style={{ fontFamily: 'var(--font-playfair)', color: j.annee === '2026' ? '#C8A24D' : '#fff' }}>
                    {j.annee}
                  </p>
                  <p className="text-sm text-white/45 leading-relaxed">{j.fait}</p>
                </motion.div>
              ))}
            </div>

            {/* ── Vidéo : 45 ans de SPI ── */}
            <motion.div {...fadeUp(0.12)} className="mt-14">
              <div className="flex items-center gap-3 mb-4">
                <div className="h-px w-8" style={{ background: 'rgba(200,162,77,0.4)' }} />
                <span className="text-[#C8A24D] text-[10px] font-bold uppercase tracking-[0.35em]">En images</span>
              </div>
              <div
                className="relative w-full overflow-hidden rounded-2xl aspect-video"
                style={{ border: '1px solid rgba(255,255,255,0.07)', boxShadow: '0 8px 40px rgba(0,0,0,0.45)' }}
              >
                <iframe
                  src="https://www.youtube.com/embed/O2VMuHXUj2g?rel=0&modestbranding=1"
                  title="L'histoire des 45 ans de la SPI Dauphine"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="absolute inset-0 w-full h-full"
                  style={{ border: 0 }}
                />
              </div>
            </motion.div>

          </div>
        </section>

        {/* ══════════════════════════════════════════════════════
            LA SPI S'ENGAGE
        ══════════════════════════════════════════════════════ */}
        <section className="border-t border-white/6 py-14 lg:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

            <motion.div {...fadeUp()} className="max-w-xl mb-12">
              <p className="text-[#3DB8A4] text-[10px] font-semibold uppercase tracking-[0.3em] mb-3">Notre engagement</p>
              <h2 className="text-white mb-3" style={{ fontFamily: 'var(--font-playfair)', fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)', fontWeight: 700 }}>
                La SPI <span style={{ color: '#C8A24D' }}>s&apos;engage</span>
              </h2>
              <p className="text-white/50 text-base leading-relaxed">
                Au-delà de la régate, le Challenge SPI Dauphine structure chaque édition autour de six piliers forts — sport, inclusion, environnement, respect, engagement associatif et valorisation du territoire.
              </p>
            </motion.div>

            {/* ── 6 piliers d'engagement ── */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: 'easeOut' as const }}
              className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-14"
            >
              {([
                { icon: Trophy,        color: '#C8A24D', label: 'Sport et esprit',               desc: 'La compétition comme vecteur de dépassement et de cohésion collective.' },
                { icon: Users,         color: '#3DB8A4', label: 'Inclusion',                     desc: 'Label 100% Handinamique — l\'événement accessible à tous.' },
                { icon: Leaf,          color: '#1A8C6B', label: 'Responsabilité environnementale', desc: 'Collectes, partenariats Fondation de la Mer, réduction d\'empreinte.' },
                { icon: Heart,         color: '#E2593A', label: 'Respect des participants',      desc: 'Charte de conduite, sécurité et bien-être de chaque participant.' },
                { icon: GraduationCap, color: '#A855F7', label: 'Engagement associatif',        desc: 'Un événement géré entièrement par des étudiants bénévoles.' },
                { icon: MapPin,        color: '#1E6FA8', label: 'Valorisation du territoire',   desc: 'Ancrage local fort, partenariat actif avec la commune d\'Imperia.' },
              ] as { icon: React.ElementType; color: string; label: string; desc: string }[]).map(({ icon: Icon, color, label, desc }, i) => (
                <motion.div
                  key={label}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.07, ease: 'easeOut' as const }}
                  className="p-5 rounded-xl flex flex-col gap-3"
                  style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}
                >
                  <div
                    className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ background: `${color}18`, border: `1px solid ${color}30` }}
                  >
                    <Icon className="w-[18px] h-[18px]" style={{ color }} aria-hidden="true" />
                  </div>
                  <div>
                    <p className="text-white font-semibold text-sm mb-1 leading-snug">{label}</p>
                    <p className="text-white/40 text-xs leading-relaxed">{desc}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* ── Duo vidéo cinématique ── */}
            <motion.div {...fadeUp(0.08)} className="mb-4">
              <div className="flex flex-col sm:flex-row overflow-hidden rounded-2xl"
                style={{ boxShadow: '0 8px 40px rgba(0,0,0,0.35)' }}>
                <EngagementVideoCard
                  src="/assets/course-caritative.mp4"
                  tag="Solidarité" couleur="#E2593A"
                  titre="Course Caritative" date="Lundi 20 avril"
                  desc="Course à pied au profit de Vents Différents — ~1 000 coureurs mobilisés sur le front de mer d'Imperia."
                  side="left"
                />
                <div className="w-px flex-shrink-0 bg-white/8 hidden sm:block" aria-hidden="true" />
                <EngagementVideoCard
                  src="/assets/collecte-dechets.mp4"
                  tag="Environnement" couleur="#1A8C6B"
                  titre="Collecte Port Propre" date="Mar. 21 & Jeu. 23"
                  desc="Deux collectes de déchets sur le littoral avec la commune d'Imperia et la Fondation de la Mer."
                  side="right"
                />
              </div>
              <p className="text-[10px] text-white/25 mt-2.5 text-center uppercase tracking-[0.2em]">
                Passez la souris pour lancer la vidéo
              </p>
            </motion.div>

            {/* ── Journées thématiques ── */}
            <div className="flex flex-col gap-4 mt-4">
              <ThemeCard
                icon={Users}
                couleur="#1E6FA8"
                tag="Inclusion"
                date="Lundi 20 avril"
                titre="Journée de l'Inclusion"
                desc={`Label "100% Handinamique". Tournoi de Cécifoot, quizz avec Vents Différents, cocktail de clôture et table ronde à Paris Dauphine. Un engagement fort pour rendre l'événement accessible à tous.`}
                photoSide="left"
                photo="/photos/handi-sport.jpg"
                index={0}
              />
              <ThemeCard
                icon={Lightbulb}
                couleur="#C8A24D"
                tag="Entrepreneuriat"
                date="Mercredi 22 avril"
                titre="Journée Entrepreneuriat"
                desc="5 start-ups innovantes avec stands et prises de parole : Quadmission, Solly, Ambassia, Sport Mate, Olago. Une journée pour connecter les étudiants avec les entrepreneurs de demain."
                photoSide="right"
                photo="/photos/startup.jpg"
                index={1}
              />
            </div>

          </div>
        </section>

        {/* ══════════════════════════════════════════════════════
            VIOLENCES SEXISTES ET SEXUELLES
        ══════════════════════════════════════════════════════ */}
        <section className="border-t border-white/6 py-14 lg:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

            {/* En-tête */}
            <div className="grid lg:grid-cols-[1fr_auto] gap-8 lg:gap-16 items-start mb-12">
              <motion.div {...fadeUp()}>
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center"
                    style={{ background: 'rgba(167,139,250,0.15)', border: '1px solid rgba(167,139,250,0.28)' }}>
                    <ShieldCheck className="w-4 h-4" style={{ color: '#A78BFA' }} />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-[0.40em]" style={{ color: '#A78BFA' }}>
                    Sécurité · Tolérance zéro
                  </span>
                </div>
                <h2
                  className="text-white leading-tight mb-5"
                  style={{ fontFamily: 'var(--font-playfair)', fontSize: 'clamp(1.7rem, 3.2vw, 2.4rem)', fontWeight: 700 }}
                >
                  Un événement plus sûr<br />
                  <span style={{ color: '#C8A24D' }}>pour toutes et tous</span>
                </h2>
                <p className="text-white/55 leading-relaxed max-w-xl" style={{ fontSize: 'clamp(0.88rem, 1.2vw, 1rem)' }}>
                  La SPI Dauphine applique une politique de tolérance zéro face aux violences sexistes et sexuelles.
                  Un dispositif concret, structuré et humain est déployé à chaque édition — pour que chaque participant·e
                  vive l&apos;événement dans un cadre rassurant, vigilant et encadré.
                </p>
              </motion.div>

              {/* Badge SafeHub */}
              <motion.div {...fadeUp(0.15)} className="flex-shrink-0">
                <div
                  className="px-6 py-5 rounded-2xl"
                  style={{ background: 'rgba(167,139,250,0.07)', border: '1px solid rgba(167,139,250,0.20)' }}
                >
                  <p className="text-[9px] font-bold uppercase tracking-[0.35em] mb-2" style={{ color: '#A78BFA' }}>
                    Partenaire sécurité
                  </p>
                  <p className="text-white font-bold text-2xl mb-2" style={{ fontFamily: 'var(--font-playfair)' }}>
                    SafeHub
                  </p>
                  <p className="text-white/40 text-xs leading-relaxed" style={{ maxWidth: 210 }}>
                    Dispositif d&apos;alerte et de sécurité déployé sur l&apos;ensemble de l&apos;événement.
                  </p>
                </div>
              </motion.div>
            </div>

            {/* 4 mesures concrètes */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {([
                {
                  icon: ShieldCheck,
                  title: 'Charte VSS',
                  desc: 'Une charte contre les violences sexistes et sexuelles, adoptée et appliquée à l\'ensemble de nos événements.',
                },
                {
                  icon: Users,
                  title: 'Responsables VSS',
                  desc: 'Plusieurs référent·e·s identifiés et disponibles à tout moment pendant toute la semaine.',
                },
                {
                  icon: AlertCircle,
                  title: 'Dispositif d\'alerte',
                  desc: 'Système de signalement structuré avec SafeHub — simple d\'accès, réponse rapide et encadrée.',
                },
                {
                  icon: Heart,
                  title: 'Espace d\'écoute',
                  desc: 'Équipe formée et espace accessible pour accompagner toute personne en difficulté.',
                },
              ] as { icon: React.ElementType; title: string; desc: string }[]).map(({ icon: Icon, title, desc }, i) => (
                <motion.div
                  key={title}
                  {...fadeUp(i * 0.07)}
                  className="p-5 rounded-xl flex flex-col gap-4"
                  style={{ background: 'rgba(167,139,250,0.05)', border: '1px solid rgba(167,139,250,0.13)' }}
                >
                  <div
                    className="w-9 h-9 rounded-xl flex items-center justify-center"
                    style={{ background: 'rgba(167,139,250,0.12)', border: '1px solid rgba(167,139,250,0.22)' }}
                  >
                    <Icon className="w-[18px] h-[18px]" style={{ color: '#A78BFA' }} aria-hidden="true" />
                  </div>
                  <div>
                    <p className="text-white font-semibold text-sm mb-1.5 leading-snug">{title}</p>
                    <p className="text-white/45 text-xs leading-relaxed">{desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>

          </div>
        </section>

        {/* ══════════════════════════════════════════════════════
            INCLUSION — section enrichie
        ══════════════════════════════════════════════════════ */}
        <section
          className="border-t border-white/6 py-14 lg:py-20"
          style={{ background: 'linear-gradient(180deg, #0C1B33 0%, #070D1F 100%)' }}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

            {/* Intro deux colonnes */}
            <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start mb-16">
              <motion.div {...fadeUp()}>
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center"
                    style={{ background: 'rgba(61,184,164,0.12)', border: '1px solid rgba(61,184,164,0.25)' }}>
                    <Users className="w-4 h-4" style={{ color: '#3DB8A4' }} />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-[0.40em]" style={{ color: '#3DB8A4' }}>
                    Inclusion · Mixité
                  </span>
                </div>
                <h2
                  className="text-white leading-tight mb-6"
                  style={{ fontFamily: 'var(--font-playfair)', fontSize: 'clamp(1.7rem, 3.2vw, 2.4rem)', fontWeight: 700 }}
                >
                  Un événement <span style={{ color: '#C8A24D' }}>inclusif</span>
                </h2>
                <p className="text-white/55 leading-relaxed mb-4" style={{ fontSize: 'clamp(0.88rem, 1.2vw, 1rem)' }}>
                  Sur l&apos;eau, des bateaux mixtes aux couleurs de l&apos;inclusion prennent chaque année le départ —
                  symbole concret de l&apos;engagement de la SPI pour l&apos;égalité et la mixité en compétition.
                </p>
                <p className="text-white/55 leading-relaxed" style={{ fontSize: 'clamp(0.88rem, 1.2vw, 1rem)' }}>
                  À terre, des actions de sensibilisation au handicap sont déployées à travers des interventions
                  associatives, des mises en situation, des pratiques sportives inclusives, des dispositifs de
                  parrainage et des temps de partage entre participants.
                </p>
              </motion.div>

              <motion.div {...fadeUp(0.12)}>
                <div className="relative overflow-hidden rounded-2xl" style={{ aspectRatio: '4/3' }}>
                  <Image
                    src="/photos/vents-differents.jpg"
                    alt="Vents Différents — inclusion au Challenge SPI Dauphine"
                    fill
                    className="object-cover"
                    style={{ objectPosition: 'center 25%' }}
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{ background: 'linear-gradient(to top, rgba(7,13,31,0.75) 0%, transparent 55%)' }}
                    aria-hidden="true"
                  />
                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    <span
                      className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] text-white"
                      style={{ background: '#1E6FA8' }}
                    >
                      Journée inclusion · Chaque édition
                    </span>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Séparateur "Ce que nous avons concrétisé" */}
            <motion.div {...fadeUp(0.1)} className="mb-10">
              <div className="flex items-center gap-4">
                <div className="h-px flex-1" style={{ background: 'rgba(255,255,255,0.08)' }} />
                <span className="text-[10px] font-semibold uppercase tracking-[0.30em] flex-shrink-0" style={{ color: 'rgba(255,255,255,0.30)' }}>
                  Ce que nous avons concrétisé
                </span>
                <div className="h-px flex-1" style={{ background: 'rgba(255,255,255,0.08)' }} />
              </div>
            </motion.div>

            {/* Label Handinamique — mis en valeur */}
            <motion.div {...fadeUp(0.08)} className="mb-5">
              <div
                className="flex items-center gap-5 p-5 rounded-2xl"
                style={{ background: 'rgba(200,162,77,0.07)', border: '1px solid rgba(200,162,77,0.20)' }}
              >
                <div
                  className="w-12 h-12 rounded-xl flex-shrink-0 flex items-center justify-center"
                  style={{ background: 'rgba(200,162,77,0.14)', border: '1px solid rgba(200,162,77,0.30)' }}
                >
                  <Award className="w-6 h-6" style={{ color: '#C8A24D' }} aria-hidden="true" />
                </div>
                <div className="flex-1">
                  <p
                    className="text-[9px] font-bold uppercase tracking-[0.35em] mb-1"
                    style={{ color: '#C8A24D' }}
                  >
                    Label officiel
                  </p>
                  <p
                    className="text-white font-bold text-xl leading-tight mb-1"
                    style={{ fontFamily: 'var(--font-playfair)' }}
                  >
                    Association Étudiante 100% Handinamique
                  </p>
                  <p className="text-white/45 text-xs leading-relaxed">
                    Distinction obtenue en reconnaissance des engagements concrets de la SPI pour l&apos;accessibilité et l&apos;inclusion à chaque édition.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Texte synthèse éditorial */}
            <motion.p
              {...fadeUp(0.08)}
              className="text-white/55 leading-relaxed"
              style={{ fontSize: 'clamp(0.88rem, 1.2vw, 1rem)' }}
            >
              Depuis plusieurs éditions, ces engagements se traduisent en actions mesurables.
              Quatre courses caritatives ont été organisées sur le front de mer d&apos;Imperia — au profit
              des associations AIDA, Comme Les Autres et Vents Différents — mobilisant près de 1&nbsp;000 coureurs
              à chaque édition. Des équipages en situation de handicap, accueillis aux côtés de l&apos;ASEI et de
              Vents Différents, prennent le départ dans les mêmes conditions que tous les autres équipages,
              voile et compétition à armes égales. Ces actions sont documentées et relayées à l&apos;échelle nationale,
              en lien étroit avec les territoires et associations partenaires.
            </motion.p>

            {/* ── Vidéo : Course Caritative ── */}
            <motion.div {...fadeUp(0.1)} className="mt-10">
              <div className="flex items-center gap-3 mb-4">
                <div className="h-px w-8" style={{ background: 'rgba(226,89,58,0.5)' }} />
                <span className="text-[10px] font-bold uppercase tracking-[0.35em]" style={{ color: '#E2593A' }}>Course Caritative · Vents Différents</span>
              </div>
              <div
                className="relative w-full overflow-hidden rounded-2xl aspect-video"
                style={{ border: '1px solid rgba(255,255,255,0.07)', boxShadow: '0 8px 40px rgba(0,0,0,0.45)' }}
              >
                <iframe
                  src="https://www.youtube.com/embed/-4Hvh6j6R8U?rel=0&modestbranding=1"
                  title="Course Caritative SPI Dauphine — Vents Différents"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="absolute inset-0 w-full h-full"
                  style={{ border: 0 }}
                />
              </div>
            </motion.div>

          </div>
        </section>

        {/* ══════════════════════════════════════════════════════
            ÉCORESPONSABILITÉ
        ══════════════════════════════════════════════════════ */}
        <section className="border-t border-white/6 py-14 lg:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

            {/* En-tête */}
            <div className="grid lg:grid-cols-[1fr_auto] gap-8 lg:gap-12 items-start mb-10">
              <motion.div {...fadeUp()}>
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center"
                    style={{ background: 'rgba(26,140,107,0.15)', border: '1px solid rgba(26,140,107,0.28)' }}>
                    <Leaf className="w-4 h-4" style={{ color: '#1A8C6B' }} />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-[0.40em]" style={{ color: '#1A8C6B' }}>
                    Écoresponsabilité · RSE
                  </span>
                </div>
                <h2
                  className="text-white leading-tight mb-5"
                  style={{ fontFamily: 'var(--font-playfair)', fontSize: 'clamp(1.7rem, 3.2vw, 2.4rem)', fontWeight: 700 }}
                >
                  Un événement <span style={{ color: '#C8A24D' }}>écoresponsable</span>
                </h2>
                <p className="text-white/55 leading-relaxed max-w-2xl" style={{ fontSize: 'clamp(0.88rem, 1.2vw, 1rem)' }}>
                  Aux côtés de la Fondation de la Mer et d&apos;Un Geste Pour la Mer, notre engagement dépasse
                  la régate : collectes sur le littoral, sensibilisation des participants, co-construction avec le
                  port et la commune d&apos;Imperia. Chaque édition est l&apos;occasion de renforcer concrètement
                  nos pratiques — sur place et dans la durée.
                </p>
              </motion.div>

              {/* Logos partenaires environnement */}
              <motion.div {...fadeUp(0.12)} className="flex-shrink-0 flex flex-row lg:flex-col gap-3">
                {[
                  { file: 'Fondation-de-la-Mer.jpg', label: 'Fondation de la Mer', sub: 'Partenaire environnement' },
                  { file: 'Un-geste-pour-la-mer.webp', label: 'Un Geste Pour la Mer', sub: 'Engagement mer' },
                ].map(({ file, label, sub }) => (
                  <div
                    key={file}
                    className="flex items-center gap-3 px-4 py-3 rounded-xl"
                    style={{ background: 'rgba(26,140,107,0.07)', border: '1px solid rgba(26,140,107,0.18)' }}
                  >
                    <div
                      className="w-10 h-10 rounded-lg flex-shrink-0 flex items-center justify-center bg-white overflow-hidden"
                      style={{ border: '1px solid rgba(26,140,107,0.15)' }}
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={`/assets/partenaires/${file}`}
                        alt={label}
                        className="w-full h-full object-contain p-0.5"
                        loading="lazy"
                      />
                    </div>
                    <div>
                      <p className="text-[9px] font-bold uppercase tracking-[0.25em] mb-0.5" style={{ color: '#1A8C6B' }}>{sub}</p>
                      <p className="text-white font-semibold text-sm leading-tight">{label}</p>
                    </div>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Phrase forte */}
            <motion.div
              {...fadeUp(0.08)}
              className="mb-10 p-6 rounded-2xl"
              style={{
                background: 'rgba(26,140,107,0.06)',
                borderLeft: '3px solid rgba(26,140,107,0.6)',
                border: '1px solid rgba(26,140,107,0.15)',
              }}
            >
              <p
                className="text-white/75 font-semibold leading-relaxed"
                style={{ fontFamily: 'var(--font-playfair)', fontSize: 'clamp(1rem, 1.6vw, 1.15rem)' }}
              >
                Poursuivre et renforcer nos engagements RSE aux côtés du port et de la commune.
              </p>
            </motion.div>

            {/* ── Vidéo : Collecte de déchets ── */}
            <motion.div {...fadeUp(0.1)} className="mb-10">
              <div className="flex items-center gap-3 mb-4">
                <div className="h-px w-8" style={{ background: 'rgba(26,140,107,0.5)' }} />
                <span className="text-[10px] font-bold uppercase tracking-[0.35em]" style={{ color: '#1A8C6B' }}>Collecte Port Propre · En vidéo</span>
              </div>
              <div
                className="relative w-full overflow-hidden rounded-2xl aspect-video"
                style={{ border: '1px solid rgba(255,255,255,0.07)', boxShadow: '0 8px 40px rgba(0,0,0,0.45)' }}
              >
                <iframe
                  src="https://www.youtube.com/embed/e1luWl4taco?rel=0&modestbranding=1"
                  title="Collecte de déchets SPI Dauphine — Port Propre"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="absolute inset-0 w-full h-full"
                  style={{ border: 0 }}
                />
              </div>
            </motion.div>

            {/* 5 actions */}
            <div className="flex flex-col gap-3">
              {([
                {
                  icon: Recycle,
                  title: 'Co-construction des actions RSE',
                  desc: 'En association avec le port et la commune, nous co-construisons les actions RSE avec les acteurs locaux — collectifs de tri, associations engagées et protecteurs du littoral.',
                },
                {
                  icon: Trash2,
                  title: 'Collectes de déchets',
                  desc: 'Collectes sur le port, les plages et dans la commune — opérations Port Propre en partenariat avec des associations nationales, locales et la Fondation de la Mer.',
                },
                {
                  icon: BookOpen,
                  title: 'Sensibilisation environnementale',
                  desc: 'Ateliers pédagogiques, interventions associatives et temps d\'échange à destination des participants et du public tout au long de la semaine.',
                },
                {
                  icon: Package,
                  title: 'Dispositifs concrets sur site',
                  desc: 'Tri des déchets en plusieurs flux, cendriers incitatifs, mobilier recyclé — gestion responsable de l\'ensemble des espaces de l\'événement.',
                },
                {
                  icon: Megaphone,
                  title: 'Communication RSE dédiée',
                  desc: 'Valorisation de l\'implication du port et de la commune accueillante auprès des participants, partenaires et du grand public à chaque édition.',
                },
              ] as { icon: React.ElementType; title: string; desc: string }[]).map(({ icon: Icon, title, desc }, i) => (
                <motion.div
                  key={title}
                  {...fadeUp(i * 0.07)}
                  className="flex items-start gap-5 p-5 rounded-xl"
                  style={{ background: 'rgba(255,255,255,0.025)', border: '1px solid rgba(255,255,255,0.06)' }}
                >
                  <div
                    className="w-9 h-9 rounded-xl flex-shrink-0 flex items-center justify-center mt-0.5"
                    style={{ background: 'rgba(26,140,107,0.12)', border: '1px solid rgba(26,140,107,0.22)' }}
                  >
                    <Icon className="w-[18px] h-[18px]" style={{ color: '#1A8C6B' }} aria-hidden="true" />
                  </div>
                  <div className="flex-1">
                    <p className="text-white font-semibold text-sm mb-1.5 leading-snug">{title}</p>
                    <p className="text-white/45 text-sm leading-relaxed">{desc}</p>
                  </div>
                  <div className="flex-shrink-0 pt-2 pl-2">
                    <div className="w-1.5 h-1.5 rounded-full" style={{ background: 'rgba(26,140,107,0.5)' }} aria-hidden="true" />
                  </div>
                </motion.div>
              ))}
            </div>

          </div>
        </section>

      </main>
      <Footer />
    </>
  )
}
