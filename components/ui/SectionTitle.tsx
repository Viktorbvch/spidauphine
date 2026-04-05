'use client'

import { motion } from 'framer-motion'

interface Props {
  eyebrow?: string
  title: string
  titleAccent?: string
  subtitle?: string
  centered?: boolean
  light?: boolean
}

export default function SectionTitle({
  eyebrow,
  title,
  titleAccent,
  subtitle,
  centered = false,
  light = false,
}: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={centered ? 'text-center' : ''}
    >
      {eyebrow && (
        <p
          className={`text-xs font-semibold uppercase tracking-widest mb-3 ${
            light ? 'text-[#0BBFBF]' : 'text-[#1A6B8C]'
          }`}
        >
          {eyebrow}
        </p>
      )}
      <h2
        className={`text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight mb-4 ${
          light ? 'text-white' : 'text-[#0B2545]'
        }`}
        style={{ fontFamily: 'var(--font-playfair)' }}
      >
        {title}
        {titleAccent && (
          <>
            {' '}
            <em className={`not-italic ${light ? 'text-[#E8A930]' : 'text-gradient-ocean'}`}>
              {titleAccent}
            </em>
          </>
        )}
      </h2>
      {subtitle && (
        <p
          className={`text-base sm:text-lg leading-relaxed max-w-2xl ${
            centered ? 'mx-auto' : ''
          } ${light ? 'text-white/70' : 'text-[#64748B]'}`}
        >
          {subtitle}
        </p>
      )}
    </motion.div>
  )
}
