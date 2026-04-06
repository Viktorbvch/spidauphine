'use client'
import { motion } from 'framer-motion'
import { type ReactNode } from 'react'

interface Props {
  children: ReactNode
  direction?: 'up' | 'left' | 'right' | 'fade'
  delay?: number
  duration?: number
  className?: string
  once?: boolean
}

const offsets = {
  up:    { y: 40 },
  left:  { x: -40 },
  right: { x: 40 },
  fade:  {},
}

export default function ScrollReveal({
  children, direction = 'up', delay = 0, duration = 0.7, className, once = true,
}: Props) {
  const offset = offsets[direction]
  return (
    <motion.div
      initial={{ opacity: 0, ...offset }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once, margin: '-60px' }}
      transition={{ duration, delay, ease: [0.25, 0.1, 0.25, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
