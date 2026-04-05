'use client'

import { useEffect, useRef, useState } from 'react'
import { useInView } from 'framer-motion'

interface Props {
  value: number
  suffix?: string
  duration?: number
}

export default function AnimatedNumber({ value, suffix = '', duration = 2000 }: Props) {
  const [current, setCurrent] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  useEffect(() => {
    if (!isInView) return

    const startTime = performance.now()
    const startValue = 0

    const easeOut = (t: number) => 1 - Math.pow(1 - t, 3)

    const animate = (now: number) => {
      const elapsed = now - startTime
      const progress = Math.min(elapsed / duration, 1)
      const easedProgress = easeOut(progress)
      const currentValue = Math.round(startValue + (value - startValue) * easedProgress)

      setCurrent(currentValue)

      if (progress < 1) {
        requestAnimationFrame(animate)
      }
    }

    requestAnimationFrame(animate)
  }, [isInView, value, duration])

  const formatted = current >= 1000 ? current.toLocaleString('fr-FR') : current.toString()

  return (
    <span ref={ref}>
      {formatted}{suffix}
    </span>
  )
}
