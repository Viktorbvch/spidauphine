'use client'

import { motion } from 'framer-motion'
import AnimatedNumber from '@/components/ui/AnimatedNumber'
import { chiffresClés } from '@/data/chiffres'

export default function ChiffresClés() {
  return (
    <section className="relative py-20 bg-[#0B2545] overflow-hidden" aria-label="Chiffres clés">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5 pointer-events-none" aria-hidden="true">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      {/* Glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full opacity-10 pointer-events-none"
        style={{ background: 'radial-gradient(circle, #0BBFBF, transparent)' }}
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Label */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center text-xs font-semibold uppercase tracking-widest text-[#0BBFBF] mb-12"
        >
          Le Challenge en chiffres
        </motion.p>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
          {chiffresClés.map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="text-center"
            >
              <div
                className="text-4xl lg:text-5xl font-bold text-white mb-1 tabular-nums"
                style={{ fontFamily: 'var(--font-playfair)' }}
              >
                <AnimatedNumber value={item.valeur} suffix={item.suffix} duration={1800} />
              </div>
              <div className="text-sm font-semibold text-[#E8A930] mb-0.5">{item.label}</div>
              <div className="text-xs text-white/40">{item.description}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
