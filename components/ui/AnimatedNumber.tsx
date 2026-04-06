'use client'

import { useEffect, useRef, useState } from 'react'

interface Props {
  value: number
  suffix?: string
  duration?: number
}

export default function AnimatedNumber({ value, suffix = '', duration = 2000 }: Props) {
  const [current, setCurrent] = useState(0)
  const [hasAnimated, setHasAnimated] = useState(false)
  const ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    if (hasAnimated) return
    const el = ref.current
    if (!el) return

    // Use a smaller margin on mobile for more reliable triggering
    const margin = window.innerWidth < 640 ? '0px' : '-40px'

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasAnimated(true)
          observer.disconnect()

          const startTime = performance.now()
          const easeOut = (t: number) => 1 - Math.pow(1 - t, 3)

          const animate = (now: number) => {
            const elapsed = now - startTime
            const progress = Math.min(elapsed / duration, 1)
            const currentValue = Math.round(value * easeOut(progress))
            setCurrent(currentValue)
            if (progress < 1) requestAnimationFrame(animate)
          }

          requestAnimationFrame(animate)
        }
      },
      { threshold: 0.1, rootMargin: margin }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [hasAnimated, value, duration])

  const formatted = current >= 1000 ? current.toLocaleString('fr-FR') : current.toString()

  return (
    <span ref={ref}>
      {formatted}{suffix}
    </span>
  )
}
