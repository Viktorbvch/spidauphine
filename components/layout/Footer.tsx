import Image from 'next/image'
import Link from 'next/link'
import { Mail, MapPin } from 'lucide-react'

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

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-[#0B2545] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-16">

          {/* ── Brand ── */}
          <div>
            <div className="flex items-center gap-3 mb-5">
              <Image
                src="/assets/logo.png"
                alt="Logo Challenge SPI Dauphine"
                width={48}
                height={48}
                className="brightness-0 invert flex-shrink-0"
              />
              <div>
                <p className="font-bold text-base leading-none" style={{ fontFamily: 'var(--font-playfair)' }}>
                  SPI Dauphine
                </p>
                <p className="text-xs text-[#0BBFBF] mt-0.5">45ème édition · Imperia 2026</p>
              </div>
            </div>
            <p className="text-sm text-white/50 leading-relaxed mb-1">18 — 25 Avril 2026</p>
            <p className="text-sm text-white/50 leading-relaxed mb-6">Marina di Imperia, Italie</p>
            <div className="flex gap-3">
              <a href="https://www.instagram.com/spidauphine/" target="_blank" rel="noopener noreferrer" aria-label="Instagram SPI Dauphine"
                className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#0BBFBF] transition-colors duration-200 cursor-pointer">
                <InstagramIcon className="w-4 h-4" />
              </a>
              <a href="https://www.facebook.com/challengespidauphine/" target="_blank" rel="noopener noreferrer" aria-label="Facebook SPI Dauphine"
                className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#0BBFBF] transition-colors duration-200 cursor-pointer">
                <FacebookIcon className="w-4 h-4" />
              </a>
              <a href="https://x.com/spidauphine" target="_blank" rel="noopener noreferrer" aria-label="X SPI Dauphine"
                className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#0BBFBF] transition-colors duration-200 cursor-pointer">
                <XIcon className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* ── Navigation ── */}
          <div>
            <h3 className="text-[10px] font-bold uppercase tracking-[0.28em] text-[#E8A930] mb-5">Navigation</h3>
            <ul className="space-y-2.5">
              {[
                { href: '/#imperia',     label: 'Imperia' },
                { href: '/#regate',      label: 'La Régate' },
                { href: '/#multisports', label: 'Le Challenge Multisports' },
                { href: '/engagement',   label: 'Histoire & engagements' },
                { href: '/partenaires',  label: 'Espace Partenaires' },
                { href: '/presse',       label: 'Espace Presse' },

                { href: '/contact',      label: 'Contact' },
              ].map(link => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-white/50 hover:text-white transition-colors duration-150 cursor-pointer">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Contact ── */}
          <div>
            <h3 className="text-[10px] font-bold uppercase tracking-[0.28em] text-[#E8A930] mb-5">Contact</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#0BBFBF] mt-0.5 flex-shrink-0" aria-hidden="true" />
                <span className="text-sm text-white/50">Marina di Imperia<br />Imperia, Ligurie — Italie</span>
              </li>
              <li className="flex items-start gap-2.5">
                <Mail className="w-4 h-4 text-[#0BBFBF] mt-0.5 flex-shrink-0" aria-hidden="true" />
                <div className="flex flex-col gap-1.5">
                  <a href="mailto:bureau@spidauphine.com" className="text-sm text-white/50 hover:text-white transition-colors cursor-pointer">
                    bureau@spidauphine.com
                  </a>
                  <a href="mailto:contact@spidauphine.com" className="text-sm text-white/50 hover:text-white transition-colors cursor-pointer">
                    contact@spidauphine.com
                  </a>
                </div>
              </li>
            </ul>
          </div>

        </div>

        {/* ── Bottom bar ── */}
        <div className="mt-12 pt-6 border-t border-white/8 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-white/30 text-center sm:text-left">
            © {currentYear} Association SPI Dauphine · Paris Dauphine-PSL
          </p>
          <p className="text-xs text-white/25 text-center">
            Site conçu et développé par{' '}
            <span className="text-white/40 font-medium">Viktor Bach</span>
            {' '}pour l&apos;association SPI Dauphine
          </p>
        </div>
      </div>
    </footer>
  )
}
