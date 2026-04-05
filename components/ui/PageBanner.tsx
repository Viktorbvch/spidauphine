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
      style={{ height: 'clamp(380px, 52vh, 600px)' }}
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

      {/* Gradients */}
      <div
        className="absolute inset-0"
        style={{
          background: gradient ?? 'linear-gradient(to bottom, rgba(7,26,53,0.25) 0%, rgba(7,26,53,0.55) 50%, rgba(7,26,53,0.92) 100%)',
        }}
        aria-hidden="true"
      />
      <div
        className="absolute inset-0"
        style={{ background: 'linear-gradient(to right, rgba(7,26,53,0.65) 0%, transparent 60%)' }}
        aria-hidden="true"
      />

      {/* Back link */}
      <div className="absolute top-[82px] left-0 right-0 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        <Link
          href="/"
          className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full border border-white/25 bg-white/10 backdrop-blur-sm text-white/80 hover:text-white hover:bg-white/18 hover:border-white/40 transition-all duration-200 text-sm font-medium cursor-pointer group"
        >
          <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform duration-200" />
          Retour à l'accueil
        </Link>
      </div>

      {/* Text */}
      <div className="absolute inset-0 flex flex-col justify-end">
        <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pb-12 lg:pb-16">
          <p className="text-[#0BBFBF] text-xs font-semibold uppercase tracking-[0.3em] mb-4"
            style={{ textShadow: '0 1px 8px rgba(0,0,0,0.6)' }}>
            {eyebrow}
          </p>
          <h1
            style={{
              fontFamily: 'var(--font-playfair)',
              fontSize: 'clamp(2rem, 4.5vw, 3.5rem)',
              fontWeight: 700,
              lineHeight: 1.08,
              color: '#ffffff',
              textShadow: '0 2px 20px rgba(0,0,0,0.55), 0 1px 4px rgba(0,0,0,0.4)',
            }}
            className="mb-4"
          >
            {title}
            {titleAccent && (
              <>
                {' '}
                <span style={{ color: '#E8A930' }}>{titleAccent}</span>
              </>
            )}
          </h1>
          <p className="text-white/65 text-base max-w-xl leading-relaxed"
            style={{ textShadow: '0 1px 10px rgba(0,0,0,0.55)' }}>
            {subtitle}
          </p>
        </div>
      </div>

      {/* Accent bar */}
      <div
        className="absolute bottom-0 left-0 right-0 h-[3px]"
        style={{ background: 'linear-gradient(to right, #0B2545, #1A6B8C, #0BBFBF)' }}
        aria-hidden="true"
      />
    </div>
  )
}
