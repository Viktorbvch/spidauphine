'use client'
import { motion } from 'framer-motion'
import { type CSSProperties } from 'react'

interface Props {
  children: string
  as?: 'h1' | 'h2' | 'h3' | 'p'
  className?: string
  style?: CSSProperties
  delay?: number
}

const parent = {
  hidden: {},
  visible: (delay: number) => ({
    transition: { staggerChildren: 0.06, delayChildren: delay },
  }),
}

const child = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] as const },
  },
}

export default function TextReveal({ children, as: Tag = 'h2', className, style, delay = 0 }: Props) {
  const MotionTag = motion.create(Tag)
  return (
    <MotionTag
      className={className}
      style={style}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-60px' }}
      custom={delay}
      variants={parent}
    >
      {children.split(' ').map((word, i) => (
        <motion.span
          key={i}
          variants={child}
          className="inline-block"
          style={{ marginRight: '0.25em' }}
        >
          {word}
        </motion.span>
      ))}
    </MotionTag>
  )
}
