'use client'
import { motion } from 'framer-motion'
import { type ReactNode, type CSSProperties } from 'react'

interface Props {
  children: ReactNode
  className?: string
  hover?: boolean
  style?: CSSProperties
  padding?: 'none' | 'md' | 'lg'
}

const paddings = { none: '', md: 'p-6 lg:p-7', lg: 'p-7 lg:p-9' }

export default function GlassCard({ children, className = '', hover = true, style, padding = 'md' }: Props) {
  return (
    <motion.div
      whileHover={hover ? { y: -3 } : undefined}
      transition={{ duration: 0.25, ease: 'easeOut' }}
      className={`rounded-2xl backdrop-blur-xl ${paddings[padding]} ${className}`}
      style={{
        background: 'rgba(255,255,255,0.05)',
        border: '1px solid rgba(255,255,255,0.08)',
        ...style,
      }}
    >
      {children}
    </motion.div>
  )
}
