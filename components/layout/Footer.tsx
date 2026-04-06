import Image from 'next/image'
import Link from 'next/link'
import { Mail, MapPin, Phone } from 'lucide-react'

/* ── Social icons ──────────────────────────────────────────── */
function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  )
}
function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  )
}
function XIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  )
}
function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  )
}

/* ── Link columns ──────────────────────────────────────────── */
const navLinks = [
  { href: '/#imperia',     label: 'Imperia' },
  { href: '/#regate',      label: 'La Régate' },
  { href: '/#multisports', label: 'Challenge Multisports' },
  { href: '/village',      label: 'Le Village' },
]

const aboutLinks = [
  { href: '/engagement',   label: 'Histoire & Engagements' },
  { href: '/partenaires',  label: 'Espace Partenaires' },
  { href: '/presse',       label: 'Espace Presse' },
  { href: '/contact',      label: 'Nous Contacter' },
]

const socials = [
  { href: 'https://www.instagram.com/spidauphine/', label: 'Instagram', Icon: InstagramIcon },
  { href: 'https://www.facebook.com/challengespidauphine/', label: 'Facebook', Icon: FacebookIcon },
  { href: 'https://x.com/spidauphine', label: 'X', Icon: XIcon },
  { href: 'https://www.linkedin.com/company/spidauphine/', label: 'LinkedIn', Icon: LinkedInIcon },
]

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer style={{ background: '#070D1F', borderTop: '1px solid rgba(255,255,255,0.06)' }}>

      {/* ── Gradient accent line ── */}
      <div
        className="h-px"
        style={{
          background: 'linear-gradient(90deg, transparent 0%, rgba(61,184,164,0.3) 25%, rgba(200,162,77,0.25) 60%, transparent 100%)',
        }}
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 lg:pt-20 pb-10">

        {/* ── 4-column grid ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">

          {/* Col 1 — Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link href="/" className="flex items-center gap-3 mb-6 group">
              <div className="relative">
                <div
                  className="absolute -inset-1.5 rounded-full border border-[#3DB8A4]/20 group-hover:border-[#3DB8A4]/50 transition-colors duration-300"
                />
                <Image
                  src="/assets/logo.png"
                  alt="Logo Challenge SPI Dauphine"
                  width={44}
                  height={44}
                  className="brightness-0 invert opacity-80 group-hover:opacity-100 transition-opacity duration-200 relative z-10"
                />
              </div>
              <div>
                <p
                  className="text-white font-bold text-sm leading-none"
                  style={{ fontFamily: 'var(--font-playfair)' }}
                >
                  SPI Dauphine
                </p>
                <p
                  className="text-[10px] mt-1 uppercase tracking-[0.2em]"
                  style={{ fontFamily: 'var(--font-mono)', color: 'rgba(61,184,164,0.6)' }}
                >
                  45ème édition · 2026
                </p>
              </div>
            </Link>
            <p className="text-sm text-white/40 leading-relaxed mb-5 max-w-xs">
              Régate universitaire européenne en Méditerranée.
              18 — 25 Avril 2026, Marina di Imperia.
            </p>

            {/* Social icons */}
            <div className="flex gap-2.5">
              {socials.map(({ href, label, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${label} SPI Dauphine`}
                  className="w-9 h-9 rounded-full flex items-center justify-center text-white/50 hover:text-white transition-all duration-200 cursor-pointer"
                  style={{
                    background: 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(255,255,255,0.08)',
                  }}
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Col 2 — L'événement */}
          <div>
            <h3
              className="text-[10px] font-bold uppercase tracking-[0.3em] mb-5"
              style={{ color: '#C8A24D', fontFamily: 'var(--font-mono)' }}
            >
              L&apos;événement
            </h3>
            <ul className="space-y-3">
              {navLinks.map(link => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/40 hover:text-white transition-colors duration-200 cursor-pointer"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3 — Découvrir */}
          <div>
            <h3
              className="text-[10px] font-bold uppercase tracking-[0.3em] mb-5"
              style={{ color: '#C8A24D', fontFamily: 'var(--font-mono)' }}
            >
              Découvrir
            </h3>
            <ul className="space-y-3">
              {aboutLinks.map(link => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/40 hover:text-white transition-colors duration-200 cursor-pointer"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4 — Contact */}
          <div>
            <h3
              className="text-[10px] font-bold uppercase tracking-[0.3em] mb-5"
              style={{ color: '#C8A24D', fontFamily: 'var(--font-mono)' }}
            >
              Contact
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#3DB8A4]/60 mt-0.5 flex-shrink-0" aria-hidden="true" />
                <span className="text-sm text-white/40 leading-snug">
                  Marina di Imperia<br />
                  Imperia, Ligurie — Italie
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <Mail className="w-4 h-4 text-[#3DB8A4]/60 mt-0.5 flex-shrink-0" aria-hidden="true" />
                <div className="flex flex-col gap-1.5">
                  <a href="mailto:bureau@spidauphine.com" className="text-sm text-white/40 hover:text-white transition-colors cursor-pointer">
                    bureau@spidauphine.com
                  </a>
                  <a href="mailto:contact@spidauphine.com" className="text-sm text-white/40 hover:text-white transition-colors cursor-pointer">
                    contact@spidauphine.com
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-2.5">
                <Phone className="w-4 h-4 text-[#3DB8A4]/60 mt-0.5 flex-shrink-0" aria-hidden="true" />
                <a href="tel:+33698698849" className="text-sm text-white/40 hover:text-white transition-colors cursor-pointer">
                  +33 6 98 69 88 49
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* ── Bottom bar ── */}
        <div
          className="mt-14 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3"
          style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}
        >
          <p className="text-xs text-white/25 text-center sm:text-left">
            © {currentYear} Association SPI Dauphine · Paris Dauphine-PSL
          </p>
          <p className="text-xs text-white/20 text-center">
            Conçu par{' '}
            <span className="text-white/35 font-medium">Viktor Bach</span>
            {' '}pour l&apos;association SPI Dauphine
          </p>
        </div>

      </div>
    </footer>
  )
}
