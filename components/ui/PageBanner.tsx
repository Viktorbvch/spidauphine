import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

interface PageBannerProps {
  eyebrow: string
  title: string
  titleAccent?: string
  subtitle: string
  photo: string
  photoAlt: string
  /** gradient direction override — defaults to bottom */
  gradient?: string
}

export default function PageBanner({
  eyebrow,
  title,
  titleAccent,
  subtitle,
  photo,
  photoAlt,
  gradient,
}: PageBannerProps) {
  return (
    <div
      className="relative w-full overflow-hidden"
      style={{ height: 'clamp(420px, 58vh, 680px)' }}
    >
      {/* Photo de fond */}
      <Image
        src={photo}
        alt={photoAlt}
        fill
        priority
        className="object-cover object-center"
        sizes="100vw"
      />

      {/* Gradients — cinematic depth */}
      <div
        className="absolute inset-0"
        style={{
          background: gradient ?? 'linear-gradient(to bottom, rgba(7,13,31,0.15) 0%, rgba(7,13,31,0.40) 45%, rgba(7,13,31,0.88) 100%)',
        }}
        aria-hidden="true"
      />
      <div
        className="absolute inset-0"
        style={{ background: 'linear-gradient(to right, rgba(7,13,31,0.55) 0%, transparent 55%)' }}
        aria-hidden="true"
      />

      {/* Vignette haute */}
      <div
        className="absolute top-0 left-0 right-0 h-32"
        style={{ background: 'linear-gradient(to bottom, rgba(7,13,31,0.30), transparent)' }}
        aria-hidden="true"
      />

      {/* Back link */}
      <div className="absolute top-[90px] left-0 right-0 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        <Link
          href="/"
          className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full border border-white/20 bg-white/8 backdrop-blur-sm text-white/70 hover:text-white hover:bg-white/15 hover:border-white/35 transition-all duration-200 text-sm font-medium cursor-pointer group"
        >
          <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform duration-200" />
          Retour
        </Link>
      </div>

      {/* Text */}
      <div className="absolute inset-0 flex flex-col justify-end">
        <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pb-14 lg:pb-18">
          {/* Eyebrow */}
          <div className="flex items-center gap-3 mb-5">
            <div className="h-px w-8 bg-[#3DB8A4]/40" />
            <p
              className="text-[10px] font-bold uppercase tracking-[0.4em]"
              style={{
                fontFamily: 'var(--font-mono)',
                color: 'rgba(61,184,164,0.8)',
                textShadow: '0 1px 8px rgba(0,0,0,0.6)',
              }}
            >
              {eyebrow}
            </p>
          </div>

          {/* Title */}
          <h1
            style={{
              fontFamily: 'var(--font-playfair)',
              fontSize: 'clamp(2.2rem, 5vw, 4rem)',
              fontWeight: 400,
              lineHeight: 1.08,
              color: '#ffffff',
              letterSpacing: '-0.01em',
              textShadow: '0 2px 24px rgba(0,0,0,0.45)',
            }}
            className="mb-5"
          >
            {title}
            {titleAccent && (
              <>
                {' '}
                <span style={{ color: '#C8A24D', fontStyle: 'italic' }}>{titleAccent}</span>
              </>
            )}
          </h1>

          {/* Subtitle */}
          <p
            className="text-white/55 max-w-xl leading-relaxed"
            style={{
              fontSize: 'var(--text-body)',
              textShadow: '0 1px 10px rgba(0,0,0,0.55)',
            }}
          >
            {subtitle}
          </p>
        </div>
      </div>

      {/* Accent gradient line */}
      <div
        className="absolute bottom-0 left-0 right-0 h-px"
        style={{
          background: 'linear-gradient(90deg, transparent 0%, rgba(61,184,164,0.3) 25%, rgba(200,162,77,0.25) 60%, transparent 100%)',
        }}
        aria-hidden="true"
      />
    </div>
  )
}
