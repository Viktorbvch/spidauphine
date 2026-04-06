'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

interface TimeLeft {
  jours: number
  heures: number
  minutes: number
  secondes: number
}

// 45ème édition : 18 avril 2026
const EVENT_DATE = new Date('2026-04-18T09:00:00')

function getTimeLeft(): TimeLeft {
  const now = new Date()
  const diff = EVENT_DATE.getTime() - now.getTime()

  if (diff <= 0) {
    return { jours: 0, heures: 0, minutes: 0, secondes: 0 }
  }

  return {
    jours: Math.floor(diff / (1000 * 60 * 60 * 24)),
    heures: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
    minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
    secondes: Math.floor((diff % (1000 * 60)) / 1000),
  }
}

/* ── Compact inline mode ─────────────────────────────────────── */
function CompactCountdown({ timeLeft }: { timeLeft: TimeLeft }) {
  const pad = (n: number) => String(n).padStart(2, '0')
  const units = [
    { value: timeLeft.jours, label: 'j' },
    { value: timeLeft.heures, label: 'h' },
    { value: timeLeft.minutes, label: 'min' },
    { value: timeLeft.secondes, label: 's' },
  ]

  return (
    <div className="flex items-center gap-3">
      {units.map(({ value, label }, i) => (
        <span key={label} className="flex items-baseline gap-0.5">
          <motion.span
            key={`${label}-${value}`}
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
            className="text-white font-semibold tabular-nums text-sm"
          >
            {pad(value)}
          </motion.span>
          <span className="text-white/40 text-xs">{label}</span>
          {i < units.length - 1 && (
            <span className="text-white/25 text-xs ml-1">·</span>
          )}
        </span>
      ))}
    </div>
  )
}

/* ── Full block mode (original) ──────────────────────────────── */
function Digit({ value, label }: { value: number; label: string }) {
  const display = String(value).padStart(2, '0')

  return (
    <div className="flex flex-col items-center gap-1">
      <div className="relative">
        <motion.div
          key={display}
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="w-16 h-16 sm:w-20 sm:h-20 bg-white/15 backdrop-blur-sm rounded-xl flex items-center justify-center border border-white/20"
        >
          <span
            className="text-3xl sm:text-4xl font-bold text-white tabular-nums"
            style={{ fontFamily: 'var(--font-playfair)' }}
          >
            {display}
          </span>
        </motion.div>
      </div>
      <span className="text-xs text-white/70 uppercase tracking-widest">{label}</span>
    </div>
  )
}

/* ── Export ──────────────────────────────────────────────────── */
export default function CountdownTimer({ compact = false }: { compact?: boolean }) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(getTimeLeft())
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const interval = setInterval(() => {
      setTimeLeft(getTimeLeft())
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  if (!mounted) return null

  const isOver =
    timeLeft.jours === 0 &&
    timeLeft.heures === 0 &&
    timeLeft.minutes === 0 &&
    timeLeft.secondes === 0

  if (isOver) {
    return (
      <span className={compact ? 'text-[#3DB8A4] text-sm font-semibold' : 'text-center text-white/90 text-lg font-semibold'}>
        L'événement est en cours !
      </span>
    )
  }

  if (compact) return <CompactCountdown timeLeft={timeLeft} />

  return (
    <div className="flex items-end gap-3 sm:gap-4">
      <Digit value={timeLeft.jours} label="Jours" />
      <span className="text-white/50 text-2xl font-light pb-6">:</span>
      <Digit value={timeLeft.heures} label="Heures" />
      <span className="text-white/50 text-2xl font-light pb-6">:</span>
      <Digit value={timeLeft.minutes} label="Minutes" />
      <span className="text-white/50 text-2xl font-light pb-6">:</span>
      <Digit value={timeLeft.secondes} label="Secondes" />
    </div>
  )
}
