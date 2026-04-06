'use client'
import { useRef } from 'react'
import Image from 'next/image'
import { motion, useScroll, useTransform } from 'framer-motion'

interface Props {
  src: string
  alt: string
  className?: string
  speed?: number
  rounded?: '2xl' | '3xl' | 'none'
  priority?: boolean
  sizes?: string
  overlay?: string
  style?: React.CSSProperties
}

const radiusMap = { '2xl': 'rounded-2xl', '3xl': 'rounded-3xl', none: '' }

export default function ParallaxImage({
  src, alt, className = '', speed = 0.15, rounded = '2xl', priority = false,
  sizes = '100vw', overlay, style,
}: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], [`${speed * -100}%`, `${speed * 100}%`])
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.12, 1.05, 1.12])

  return (
    <div ref={ref} className={`relative overflow-hidden ${radiusMap[rounded]} ${className}`} style={style}>
      <motion.div className="absolute inset-0" style={{ y, scale }}>
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover"
          sizes={sizes}
          priority={priority}
        />
      </motion.div>
      {overlay && (
        <div className="absolute inset-0 pointer-events-none" style={{ background: overlay }} aria-hidden="true" />
      )}
    </div>
  )
}
