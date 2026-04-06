'use client'

import Image from 'next/image'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { Download } from 'lucide-react'
import { useRef, type MouseEvent } from 'react'
import ScrollReveal from '@/components/ui/ScrollReveal'

export default function AfficheSection() {
  /* ── 3D tilt state ── */
  const cardRef = useRef<HTMLDivElement>(null)
  const mouseX = useMotionValue(0.5)
  const mouseY = useMotionValue(0.5)

  const rotateX = useSpring(useTransform(mouseY, [0, 1], [8, -8]), { stiffness: 200, damping: 25 })
  const rotateY = useSpring(useTransform(mouseX, [0, 1], [-8, 8]), { stiffness: 200, damping: 25 })
  const glareX = useTransform(mouseX, [0, 1], ['0%', '100%'])
  const glareY = useTransform(mouseY, [0, 1], ['0%', '100%'])

  const handleMouse = (e: MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    mouseX.set((e.clientX - rect.left) / rect.width)
    mouseY.set((e.clientY - rect.top) / rect.height)
  }

  const handleLeave = () => {
    mouseX.set(0.5)
    mouseY.set(0.5)
  }

  return (
    <section
      id="affiche"
      className="relative py-24 lg:py-32 overflow-hidden"
      aria-label="Affiche officielle 45ème édition"
      style={{ background: '#070D1F' }}
    >
      {/* Subtle radial glow behind the poster */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse, rgba(30,111,168,0.06) 0%, transparent 65%)',
        }}
        aria-hidden="true"
      />

      <div className="max-w-5xl mx-auto px-6 sm:px-8 text-center relative">

        {/* Eyebrow */}
        <ScrollReveal direction="fade" delay={0}>
          <div className="flex items-center justify-center gap-3 mb-5">
            <div className="h-px w-8 bg-[#3DB8A4]/40" />
            <p
              className="text-[10px] font-bold uppercase tracking-[0.4em]"
              style={{ fontFamily: 'var(--font-mono)', color: 'rgba(61,184,164,0.7)' }}
            >
              45ème Challenge SPI Dauphine
            </p>
            <div className="h-px w-8 bg-[#3DB8A4]/40" />
          </div>
        </ScrollReveal>

        {/* Title */}
        <ScrollReveal direction="up" delay={0.1}>
          <h2
            className="text-white mb-16"
            style={{
              fontFamily: 'var(--font-playfair)',
              fontSize: 'var(--text-display)',
              fontWeight: 400,
              lineHeight: 1.15,
              letterSpacing: '-0.01em',
            }}
          >
            L&apos;Affiche{' '}
            <span style={{ color: '#C8A24D', fontStyle: 'italic' }}>Officielle</span>
          </h2>
        </ScrollReveal>

        {/* 3D tilting poster */}
        <ScrollReveal direction="up" delay={0.2}>
          <div
            ref={cardRef}
            onMouseMove={handleMouse}
            onMouseLeave={handleLeave}
            className="inline-block mb-12"
            style={{ perspective: 800 }}
          >
            <motion.div
              style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
              className="relative mx-auto rounded-2xl overflow-hidden cursor-default"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <div
                className="relative"
                style={{
                  width: 'min(440px, 85vw)',
                  aspectRatio: '210 / 297',
                  boxShadow: '0 40px 100px rgba(0,0,0,0.55), 0 8px 32px rgba(0,0,0,0.3), 0 0 0 1px rgba(255,255,255,0.04)',
                }}
              >
                <Image
                  src="/assets/affiche-45.png"
                  alt="Affiche officielle 45ème Challenge SPI Dauphine — Marina di Imperia, 18 au 25 avril 2026"
                  fill
                  className="object-cover rounded-2xl"
                  sizes="(max-width: 640px) 85vw, 440px"
                />

                {/* Reflective highlight following mouse */}
                <motion.div
                  className="absolute inset-0 rounded-2xl pointer-events-none"
                  style={{
                    background: useTransform(
                      [glareX, glareY],
                      ([x, y]) =>
                        `radial-gradient(ellipse at ${x} ${y}, rgba(255,255,255,0.12) 0%, transparent 60%)`
                    ),
                  }}
                  aria-hidden="true"
                />
              </div>
            </motion.div>
          </div>
        </ScrollReveal>

        {/* Download CTA */}
        <ScrollReveal direction="fade" delay={0.4}>
          <a
            href="/assets/affiche-45.png"
            download="affiche-challenge-spi-dauphine-45.png"
            className="inline-flex items-center gap-2.5 border border-white/15 rounded-full px-7 py-3 text-white/60 text-sm font-medium hover:bg-white/8 hover:text-white hover:border-white/35 transition-all duration-300 cursor-pointer group"
          >
            <Download className="w-4 h-4 group-hover:translate-y-0.5 transition-transform duration-200" aria-hidden="true" />
            Télécharger l&apos;affiche
          </a>
        </ScrollReveal>
      </div>
    </section>
  )
}
