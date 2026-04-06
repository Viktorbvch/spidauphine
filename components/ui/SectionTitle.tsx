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
      transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
      className={centered ? 'text-center' : ''}
    >
      {eyebrow && (
        <div className={`flex items-center gap-3 mb-4 ${centered ? 'justify-center' : ''}`}>
          <div
            className="h-px w-8"
            style={{ background: light ? 'rgba(61,184,164,0.4)' : 'rgba(30,111,168,0.3)' }}
          />
          <p
            className="text-[10px] font-bold uppercase tracking-[0.4em]"
            style={{
              fontFamily: 'var(--font-mono)',
              color: light ? 'rgba(61,184,164,0.7)' : 'rgba(30,111,168,0.65)',
            }}
          >
            {eyebrow}
          </p>
          {centered && (
            <div
              className="h-px w-8"
              style={{ background: light ? 'rgba(61,184,164,0.4)' : 'rgba(30,111,168,0.3)' }}
            />
          )}
        </div>
      )}
      <h2
        className={`leading-tight mb-5 ${light ? 'text-white' : 'text-[#1A1A2E]'}`}
        style={{
          fontFamily: 'var(--font-playfair)',
          fontSize: 'var(--text-display)',
          fontWeight: 400,
          letterSpacing: '-0.01em',
        }}
      >
        {title}
        {titleAccent && (
          <>
            {' '}
            <span style={{ color: light ? '#C8A24D' : '#1E6FA8', fontStyle: 'italic' }}>
              {titleAccent}
            </span>
          </>
        )}
      </h2>
      {subtitle && (
        <p
          className={`leading-relaxed max-w-2xl ${centered ? 'mx-auto' : ''}`}
          style={{
            fontSize: 'var(--text-body)',
            color: light ? 'rgba(240,236,227,0.55)' : 'rgba(26,26,46,0.5)',
          }}
        >
          {subtitle}
        </p>
      )}
    </motion.div>
  )
}
