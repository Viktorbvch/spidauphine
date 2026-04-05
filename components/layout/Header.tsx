'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, ChevronRight } from 'lucide-react'

const leftLinks = [
  { href: '/engagement',  label: "S'engage" },
  { href: '#imperia',     label: 'Imperia' },
  { href: '#regate',      label: 'La Régate' },
  { href: '#multisports', label: 'Multisports' },
]

const rightLinks = [
  { href: '/village',     label: 'Le Village' },
  { href: '/partenaires', label: 'Partenaires' },
  { href: '/presse',      label: 'Presse' },
  { href: '/contact',     label: 'Contact' },
]

const allLinks = [...leftLinks, ...rightLinks]

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeSection, setActive] = useState('')
  const pathname = usePathname()
  const isHome   = pathname === '/'

  useEffect(() => {
    const ids = allLinks.filter(l => l.href.startsWith('#')).map(l => l.href.replace('#', ''))
    const handleScroll = () => {
      setScrolled(window.scrollY > 40)
      for (const id of [...ids].reverse()) {
        const el = document.getElementById(id)
        if (el && window.scrollY >= el.offsetTop - 120) { setActive(id); break }
      }
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    window.addEventListener('resize', () => setMenuOpen(false))
    return () => window.removeEventListener('resize', () => setMenuOpen(false))
  }, [])

  /* ── Helper : rendu d'un lien de nav desktop ── */
  const NavLink = ({ link, side }: { link: typeof leftLinks[0]; side: 'l' | 'r' }) => {
    const resolvedHref = !isHome && link.href.startsWith('#') ? `/${link.href}` : link.href
    const isPage  = resolvedHref.startsWith('/')
    const id      = link.href.replace('#', '')
    const isActive = !link.href.startsWith('/') && activeSection === id
    const cls = `relative px-2.5 py-2 text-[12px] font-bold rounded-lg whitespace-nowrap transition-colors duration-200 cursor-pointer uppercase tracking-[0.08em] ${
      isActive ? 'text-white' : 'text-white/55 hover:text-white/90'
    }`
    const inner = (
      <>
        {isActive && (
          <motion.span layoutId={`nav-bg-${side}`} className="absolute inset-0 rounded-lg pointer-events-none"
            style={{ background: 'rgba(255,255,255,0.07)' }} transition={{ type: 'spring', stiffness: 400, damping: 32 }} />
        )}
        <span className="relative z-10 pointer-events-none">{link.label}</span>
        <motion.span
          className="absolute bottom-[5px] left-3.5 right-3.5 h-[1.5px] rounded-full bg-[#E8A930] pointer-events-none origin-left"
          initial={{ scaleX: 0, opacity: 0 }} whileHover={{ scaleX: 1, opacity: 1 }} transition={{ duration: 0.18 }}
        />
        {isActive && (
          <motion.span layoutId={`nav-dot-${side}`} className="absolute bottom-[5px] left-3.5 right-3.5 h-[1.5px] rounded-full bg-[#E8A930] pointer-events-none" />
        )}
      </>
    )
    return isPage
      ? <Link key={link.href} href={resolvedHref} className={cls}>{inner}</Link>
      : <a    key={link.href} href={resolvedHref} className={cls}>{inner}</a>
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50">

      {/* ── Barre principale ── */}
      <div
        className="relative transition-all duration-500"
        style={{
          background: scrolled ? 'rgba(4,16,35,0.96)' : 'rgba(7,26,53,0.70)',
          backdropFilter: 'blur(28px)',
          WebkitBackdropFilter: 'blur(28px)',
          boxShadow: scrolled
            ? '0 1px 0 rgba(255,255,255,0.05), 0 12px 48px rgba(0,0,0,0.5)'
            : '0 1px 0 rgba(255,255,255,0.04)',
        }}
      >
        {/* Ligne dégradée haute */}
        <div
          className="absolute top-0 left-0 right-0 h-[1px] pointer-events-none transition-opacity duration-500"
          style={{
            background: 'linear-gradient(90deg, transparent 0%, #0BBFBF 25%, #E8A930 60%, transparent 100%)',
            opacity: scrolled ? 0.7 : 0.35,
          }}
          aria-hidden="true"
        />

        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-[82px]">

            {/* ── DESKTOP : grille 3 colonnes logo centré ── */}
            <div className="hidden lg:grid lg:grid-cols-[1fr_auto_1fr] lg:items-center lg:w-full lg:h-full lg:gap-2">

              {/* Colonne gauche */}
              <nav className="flex items-center justify-end gap-0 h-full" aria-label="Navigation gauche">
                {leftLinks.map(link => <NavLink key={link.href} link={link} side="l" />)}
                <div className="w-px h-5 ml-2 flex-shrink-0"
                  style={{ background: 'linear-gradient(to bottom, transparent, rgba(255,255,255,0.12), transparent)' }} aria-hidden="true" />
              </nav>

              {/* Colonne centrale — Logo */}
              <div className="flex justify-center items-center px-6 h-full">
                <Link href="/" className="flex flex-col items-center gap-1.5 group" aria-label="Challenge SPI Dauphine — Accueil">
                  <div className="relative flex items-center justify-center">
                    <motion.div
                      className="absolute rounded-full border pointer-events-none transition-colors duration-300"
                      style={{ inset: '-6px', borderColor: 'rgba(11,191,191,0.22)' }}
                      whileHover={{ borderColor: 'rgba(11,191,191,0.55)' }}
                    />
                    <Image
                      src="/assets/logo.png"
                      alt="SPI Dauphine"
                      width={46}
                      height={46}
                      className="brightness-0 invert opacity-85 group-hover:opacity-100 transition-opacity duration-200 relative z-10"
                    />
                  </div>
                  <div className="leading-none text-center mt-1">
                    <span className="block text-white/75 group-hover:text-white text-[8.5px] font-bold uppercase tracking-[0.26em] transition-colors duration-200">
                      SPI Dauphine
                    </span>
                  </div>
                </Link>
              </div>

              {/* Colonne droite */}
              <nav className="flex items-center justify-start gap-0 h-full" aria-label="Navigation droite">
                <div className="w-px h-5 mr-2 flex-shrink-0"
                  style={{ background: 'linear-gradient(to bottom, transparent, rgba(255,255,255,0.12), transparent)' }} aria-hidden="true" />
                {rightLinks.filter(l => l.href !== '/contact').map(link => <NavLink key={link.href} link={link} side="r" />)}
                <Link
                  href="/contact"
                  className="ml-4 flex-shrink-0 px-4 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-[0.08em] text-white transition-all duration-200 hover:brightness-110 active:scale-[0.97]"
                  style={{
                    background: 'linear-gradient(135deg, #1B5C8A 0%, #2E7DAF 100%)',
                    boxShadow: '0 2px 14px rgba(46,125,175,0.28), inset 0 1px 0 rgba(255,255,255,0.12)',
                  }}
                >
                  Contact
                </Link>
              </nav>
            </div>

            {/* ── MOBILE : logo gauche + burger droite ── */}
            <div className="flex lg:hidden items-center justify-between w-full">
              <Link href="/" className="flex items-center gap-3 group" aria-label="Challenge SPI Dauphine — Accueil">
                <div className="relative flex items-center justify-center">
                  <motion.div className="absolute rounded-full border pointer-events-none"
                    style={{ inset: '-5px', borderColor: 'rgba(11,191,191,0.25)' }}
                    whileHover={{ borderColor: 'rgba(11,191,191,0.6)' }} />
                  <Image src="/assets/logo.png" alt="SPI Dauphine" width={30} height={30}
                    className="brightness-0 invert opacity-80 group-hover:opacity-100 transition-opacity duration-200 relative z-10" />
                </div>
                <div className="leading-none">
                  <span className="block text-white/90 text-[11px] font-bold uppercase tracking-[0.22em]">SPI Dauphine</span>
                  <span className="block text-[#0BBFBF]/55 text-[8.5px] font-semibold uppercase tracking-[0.2em] mt-0.5">45ème édition · 2026</span>
                </div>
              </Link>

              <motion.button
                onClick={() => setMenuOpen(v => !v)}
                whileTap={{ scale: 0.88 }}
                className="p-2 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                aria-label={menuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
                aria-expanded={menuOpen}
              >
                <AnimatePresence mode="wait" initial={false}>
                  {menuOpen
                    ? <motion.span key="x"    initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90,  opacity: 0 }} transition={{ duration: 0.15 }} className="block"><X    className="w-5 h-5" /></motion.span>
                    : <motion.span key="menu" initial={{ rotate:  90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.15 }} className="block"><Menu className="w-5 h-5" /></motion.span>
                  }
                </AnimatePresence>
              </motion.button>
            </div>

          </div>
        </div>

        {/* Ligne dégradée basse */}
        <div
          className="absolute bottom-0 left-0 right-0 h-[1px] pointer-events-none transition-opacity duration-500"
          style={{
            background: 'linear-gradient(90deg, transparent 0%, rgba(11,191,191,0.25) 30%, rgba(232,169,48,0.2) 65%, transparent 100%)',
            opacity: scrolled ? 1 : 0.45,
          }}
          aria-hidden="true"
        />
      </div>

      {/* ── Menu mobile ── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="lg:hidden overflow-hidden"
            style={{
              background: 'rgba(4,16,35,0.97)',
              backdropFilter: 'blur(28px)',
              borderTop: '1px solid rgba(255,255,255,0.06)',
            }}
          >
            <nav className="max-w-7xl mx-auto px-4 py-5" aria-label="Navigation mobile">
              <div className="space-y-0.5">
                {allLinks.map((link, i) => {
                  const resolvedHref = !isHome && link.href.startsWith('#') ? `/${link.href}` : link.href
                  const isPage = resolvedHref.startsWith('/')
                  const cls = "flex items-center justify-between px-4 py-3 text-[11px] font-bold uppercase tracking-[0.12em] text-white/60 rounded-xl hover:bg-white/6 hover:text-white transition-colors cursor-pointer group"
                  const chevron = <ChevronRight className="w-3.5 h-3.5 text-white/20 group-hover:text-[#E8A930] group-hover:translate-x-0.5 transition-all pointer-events-none" aria-hidden="true" />
                  return isPage ? (
                    <motion.div key={link.href} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.03 }}>
                      <Link href={resolvedHref} onClick={() => setMenuOpen(false)} className={cls}>{link.label}{chevron}</Link>
                    </motion.div>
                  ) : (
                    <motion.a key={link.href} href={resolvedHref} onClick={() => setMenuOpen(false)} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.03 }} className={cls}>
                      {link.label}{chevron}
                    </motion.a>
                  )
                })}
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
