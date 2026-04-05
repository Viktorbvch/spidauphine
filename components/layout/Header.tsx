'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, ChevronDown, ChevronRight } from 'lucide-react'

const leftLinks = [
  { href: '/engagement',  label: 'Histoire & engagements' },
  { href: '#imperia',     label: 'Imperia' },
]

const rightLinks = [
  { href: '#regate',      label: 'La Régate' },
  { href: '#multisports', label: 'Le Challenge Multisports' },
  { href: '/village',     label: 'Le Village' },
  { href: '/contact',     label: 'Contact' },
]

const navLinks = [...leftLinks, ...rightLinks]

const discoverLinks = [
  { href: '/partenaires', label: 'Espace Partenaires',  desc: 'Nos 28 partenaires de la 45ème édition',  num: '01' },
  { href: '/presse',      label: 'Espace Presse',       desc: 'Revue de presse & accréditations médias', num: '02' },
]

export default function Header() {
  const [scrolled, setScrolled]       = useState(false)
  const [menuOpen, setMenuOpen]       = useState(false)
  const [dropdownOpen, setDropdown]   = useState(false)
  const [mobileDiscover, setMobDisc]  = useState(false)
  const [activeSection, setActive]    = useState('')
  const dropdownRef = useRef<HTMLDivElement>(null)
  const pathname    = usePathname()
  const isHome      = pathname === '/'

  useEffect(() => {
    const ids = navLinks.filter(l => l.href.startsWith('#')).map(l => l.href.replace('#', ''))
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
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) setDropdown(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  useEffect(() => {
    const close = () => { setMenuOpen(false); setDropdown(false) }
    window.addEventListener('resize', close)
    return () => window.removeEventListener('resize', close)
  }, [])

  return (
    <header className="fixed top-0 left-0 right-0 z-50">

      {/* ── Barre principale ── */}
      <div
        className="relative transition-all duration-500"
        style={{
          background: scrolled
            ? 'rgba(4, 16, 35, 0.96)'
            : 'rgba(7, 26, 53, 0.70)',
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

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-[82px]">

            {/* ── DESKTOP : grille 3 colonnes logo centré ── */}
            <div className="hidden lg:grid lg:grid-cols-3 lg:items-center lg:w-full lg:h-full">

              {/* Colonne gauche */}
              <nav className="flex items-center justify-end gap-0 h-full" aria-label="Navigation gauche">
                {leftLinks.map(link => {
                  const resolvedHref = !isHome && link.href.startsWith('#') ? `/${link.href}` : link.href
                  const isPage = resolvedHref.startsWith('/')
                  const id = link.href.replace('#', '')
                  const isActive = !link.href.startsWith('/') && activeSection === id
                  const cls = `relative px-2.5 py-2 text-[13px] font-bold rounded-lg whitespace-nowrap transition-colors duration-200 cursor-pointer uppercase tracking-[0.08em] ${
                    isActive ? 'text-white' : 'text-white/50 hover:text-white/90'
                  }`
                  const inner = (
                    <>
                      {isActive && (
                        <motion.span layoutId="nav-bg-l" className="absolute inset-0 rounded-lg pointer-events-none"
                          style={{ background: 'rgba(255,255,255,0.07)' }} transition={{ type: 'spring', stiffness: 400, damping: 32 }} />
                      )}
                      <span className="relative z-10 pointer-events-none">{link.label}</span>
                      <motion.span className="absolute bottom-[5px] left-3.5 right-3.5 h-[1.5px] rounded-full bg-[#E8A930] pointer-events-none origin-left"
                        initial={{ scaleX: 0, opacity: 0 }} whileHover={{ scaleX: 1, opacity: 1 }} transition={{ duration: 0.18 }} />
                      {isActive && (
                        <motion.span layoutId="nav-dot-l" className="absolute bottom-[5px] left-3.5 right-3.5 h-[1.5px] rounded-full bg-[#E8A930] pointer-events-none" />
                      )}
                    </>
                  )
                  return isPage
                    ? <Link key={link.href} href={resolvedHref} className={cls}>{inner}</Link>
                    : <a    key={link.href} href={resolvedHref} className={cls}>{inner}</a>
                })}

                {/* Séparateur */}
                <div className="w-px h-5 mx-0 flex-shrink-0"
                  style={{ background: 'linear-gradient(to bottom, transparent, rgba(255,255,255,0.12), transparent)' }} aria-hidden="true" />
              </nav>

              {/* Colonne centrale — Logo */}
              <div className="flex justify-center items-center h-full">
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

                {/* Séparateur */}
                <div className="w-px h-5 mx-0 flex-shrink-0"
                  style={{ background: 'linear-gradient(to bottom, transparent, rgba(255,255,255,0.12), transparent)' }} aria-hidden="true" />

                {rightLinks.map(link => {
                  const resolvedHref = !isHome && link.href.startsWith('#') ? `/${link.href}` : link.href
                  const isPage = resolvedHref.startsWith('/')
                  const id = link.href.replace('#', '')
                  const isActive = !link.href.startsWith('/') && activeSection === id
                  const cls = `relative px-2.5 py-2 text-[13px] font-bold rounded-lg whitespace-nowrap transition-colors duration-200 cursor-pointer uppercase tracking-[0.08em] ${
                    isActive ? 'text-white' : 'text-white/50 hover:text-white/90'
                  }`
                  const inner = (
                    <>
                      {isActive && (
                        <motion.span layoutId="nav-bg-r" className="absolute inset-0 rounded-lg pointer-events-none"
                          style={{ background: 'rgba(255,255,255,0.07)' }} transition={{ type: 'spring', stiffness: 400, damping: 32 }} />
                      )}
                      <span className="relative z-10 pointer-events-none">{link.label}</span>
                      <motion.span className="absolute bottom-[5px] left-3.5 right-3.5 h-[1.5px] rounded-full bg-[#E8A930] pointer-events-none origin-left"
                        initial={{ scaleX: 0, opacity: 0 }} whileHover={{ scaleX: 1, opacity: 1 }} transition={{ duration: 0.18 }} />
                      {isActive && (
                        <motion.span layoutId="nav-dot-r" className="absolute bottom-[5px] left-3.5 right-3.5 h-[1.5px] rounded-full bg-[#E8A930] pointer-events-none" />
                      )}
                    </>
                  )
                  return isPage
                    ? <Link key={link.href} href={resolvedHref} className={cls}>{inner}</Link>
                    : <a    key={link.href} href={resolvedHref} className={cls}>{inner}</a>
                })}

                {/* Découvrir dropdown */}
                <div ref={dropdownRef} className="relative ml-2">
                  <motion.button
                    onClick={() => setDropdown(v => !v)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.97 }}
                    className="relative flex items-center gap-1.5 px-4 py-2 text-[13px] font-bold rounded-lg whitespace-nowrap transition-all duration-250 cursor-pointer uppercase tracking-[0.08em]"
                    style={{
                      background: dropdownOpen
                        ? 'linear-gradient(135deg, #E8A930 0%, #D4921A 100%)'
                        : 'linear-gradient(135deg, rgba(11,191,191,0.14) 0%, rgba(26,107,140,0.12) 100%)',
                      border: dropdownOpen ? '1px solid #E8A930' : '1px solid rgba(11,191,191,0.28)',
                      color: dropdownOpen ? '#0B2545' : '#ffffff',
                      boxShadow: dropdownOpen ? '0 4px 16px rgba(232,169,48,0.3)' : '0 2px 12px rgba(11,191,191,0.08)',
                    }}
                    aria-expanded={dropdownOpen}
                    aria-haspopup="true"
                  >
                    Découvrir
                    <motion.span animate={{ rotate: dropdownOpen ? 180 : 0 }} transition={{ duration: 0.22 }} className="flex items-center pointer-events-none">
                      <ChevronDown className="w-3.5 h-3.5" aria-hidden="true" />
                    </motion.span>
                  </motion.button>

                  <AnimatePresence>
                    {dropdownOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: -10, scale: 0.96 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -10, scale: 0.96 }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                        className="absolute top-full right-0 mt-2.5 w-[320px] rounded-2xl shadow-2xl overflow-hidden"
                        style={{
                          background: 'rgba(255,255,255,1)',
                          border: '1px solid rgba(15,30,60,0.08)',
                          boxShadow: '0 24px 64px rgba(7,26,53,0.18), 0 4px 16px rgba(7,26,53,0.08)',
                        }}
                        role="menu"
                      >
                        <div className="h-[2px] bg-gradient-to-r from-[#0B2545] via-[#1A6B8C] to-[#0BBFBF]" />
                        <div>
                          {discoverLinks.map(({ href, label, desc, num }, i) => (
                            <motion.div key={href} initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}>
                              <Link
                                href={href}
                                onClick={() => setDropdown(false)}
                                className={`flex items-center gap-4 px-5 py-4 group cursor-pointer transition-all duration-200 hover:bg-[#F8FAFC] border-l-[2px] border-transparent hover:border-[#E8A930] ${
                                  i < discoverLinks.length - 1 ? 'border-b border-b-slate-100' : ''
                                }`}
                                role="menuitem"
                              >
                                <span className="text-[10px] font-mono font-bold text-[#CBD5E1] group-hover:text-[#E8A930] transition-colors w-4 flex-shrink-0 select-none pointer-events-none">{num}</span>
                                <div className="flex-1 min-w-0 pointer-events-none">
                                  <p className="text-[13px] font-semibold text-[#0B2545] group-hover:text-[#1A6B8C] transition-colors leading-tight">{label}</p>
                                  <p className="text-[11px] text-[#94A3B8] mt-0.5">{desc}</p>
                                </div>
                                <ChevronRight className="w-3.5 h-3.5 text-[#CBD5E1] group-hover:text-[#1A6B8C] opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 transition-all duration-200 pointer-events-none flex-shrink-0" aria-hidden="true" />
                              </Link>
                            </motion.div>
                          ))}
                        </div>
                        <div className="px-5 py-3 bg-[#F8FAFC] border-t border-slate-100">
                          <a href="#contact" onClick={() => setDropdown(false)}
                            className="flex items-center gap-1.5 text-[11px] font-medium text-[#64748B] hover:text-[#0B2545] transition-colors cursor-pointer">
                            Contacter l'équipe organisatrice
                            <ChevronRight className="w-3 h-3 pointer-events-none" aria-hidden="true" />
                          </a>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
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
                    ? <motion.span key="x"    initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}  transition={{ duration: 0.15 }} className="block"><X    className="w-5 h-5" /></motion.span>
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

              <div className="space-y-0.5 mb-3">
                {navLinks.map((link, i) => {
                  const resolvedHref = !isHome && link.href.startsWith('#') ? `/${link.href}` : link.href
                  const isPage = resolvedHref.startsWith('/')
                  const cls = "flex items-center justify-between px-4 py-3 text-[11px] font-bold uppercase tracking-[0.12em] text-white/60 rounded-xl hover:bg-white/6 hover:text-white transition-colors cursor-pointer group"
                  const chevron = (
                    <ChevronRight className="w-3.5 h-3.5 text-white/20 group-hover:text-[#E8A930] group-hover:translate-x-0.5 transition-all pointer-events-none" aria-hidden="true" />
                  )
                  return isPage ? (
                    <motion.div key={link.href} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.04 }}>
                      <Link href={resolvedHref} onClick={() => setMenuOpen(false)} className={cls}>{link.label}{chevron}</Link>
                    </motion.div>
                  ) : (
                    <motion.a key={link.href} href={resolvedHref} onClick={() => setMenuOpen(false)} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.04 }} className={cls}>
                      {link.label}{chevron}
                    </motion.a>
                  )
                })}
              </div>

              <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent my-3" />

              {/* Découvrir accordéon */}
              <div>
                <button
                  onClick={() => setMobDisc(v => !v)}
                  className="flex items-center justify-between w-full px-4 py-3 text-[11px] font-bold uppercase tracking-[0.12em] rounded-xl transition-colors cursor-pointer"
                  style={{ color: '#E8A930', background: mobileDiscover ? 'rgba(232,169,48,0.08)' : 'transparent' }}
                >
                  <span>Découvrir</span>
                  <motion.span animate={{ rotate: mobileDiscover ? 180 : 0 }} transition={{ duration: 0.2 }} className="flex items-center pointer-events-none">
                    <ChevronDown className="w-4 h-4" aria-hidden="true" />
                  </motion.span>
                </button>
                <AnimatePresence>
                  {mobileDiscover && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden mt-1 space-y-0.5 pl-3"
                    >
                      {discoverLinks.map(({ href, label, desc, num }) => (
                        <Link
                          key={href}
                          href={href}
                          onClick={() => setMenuOpen(false)}
                          className="flex items-center gap-3.5 px-3 py-3 rounded-xl hover:bg-white/6 transition-colors cursor-pointer group border-l-2 border-transparent hover:border-[#E8A930]"
                        >
                          <span className="text-[10px] font-mono font-bold text-white/20 group-hover:text-[#E8A930] transition-colors w-4 flex-shrink-0 pointer-events-none">{num}</span>
                          <div className="pointer-events-none">
                            <p className="text-sm font-semibold text-white/75 group-hover:text-white transition-colors">{label}</p>
                            <p className="text-[11px] text-white/30">{desc}</p>
                          </div>
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
