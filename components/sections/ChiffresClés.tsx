'use client'

import { motion } from 'framer-motion'
import AnimatedNumber from '@/components/ui/AnimatedNumber'

export default function ChiffresClés() {
  return (
    <section
      className="relative overflow-hidden"
      aria-label="Le Challenge en chiffres"
      style={{ background: '#F7F4EF' }}
    >
      {/* Ligne haute décorative */}
      <div
        className="absolute top-0 left-0 right-0 h-px pointer-events-none"
        style={{ background: 'linear-gradient(90deg, transparent 0%, rgba(30,111,168,0.25) 30%, rgba(200,162,77,0.20) 70%, transparent 100%)' }}
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 lg:pt-24 pb-0">

        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-3 mb-12 lg:mb-16"
        >
          <div className="h-px w-8 bg-[#1E6FA8]/30" />
          <p
            className="text-[10px] font-bold uppercase tracking-[0.45em]"
            style={{ fontFamily: 'var(--font-mono)', color: 'rgba(30,111,168,0.65)' }}
          >
            Le Challenge en chiffres
          </p>
        </motion.div>

        {/* 2 grands chiffres phares */}
        <div
          className="grid grid-cols-1 sm:grid-cols-2"
          style={{ borderTop: '1px solid rgba(26,26,46,0.08)' }}
        >
          {([
            {
              valeur: 45,
              suffix: 'ème',
              label: 'Édition',
              description: 'Depuis 1981 · Challenge SPI Dauphine',
              delay: 0,
            },
            {
              valeur: 1000,
              suffix: '+',
              label: 'Participants',
              description: 'Étudiants venus de toute l\'Europe',
              delay: 0.12,
            },
          ] as { valeur: number; suffix: string; label: string; description: string; delay: number }[]).map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: item.delay }}
              className={[
                'py-12 lg:py-16',
                i === 0
                  ? 'sm:border-r sm:pr-10 lg:pr-16'
                  : 'sm:pl-10 lg:pl-16',
              ].join(' ')}
              style={{
                borderBottomWidth: 1,
                borderBottomStyle: 'solid',
                borderBottomColor: 'rgba(26,26,46,0.08)',
                ...(i === 0 ? { borderRightColor: 'rgba(26,26,46,0.08)' } : {}),
              }}
            >
              <div
                className="tabular-nums leading-none mb-3"
                style={{
                  fontFamily: 'var(--font-playfair)',
                  fontSize: 'clamp(4rem, 9vw, 7.5rem)',
                  fontWeight: 400,
                  letterSpacing: '-0.025em',
                  color: '#1A1A2E',
                }}
              >
                <AnimatedNumber value={item.valeur} suffix={item.suffix} duration={2000} />
              </div>
              <p
                className="font-bold uppercase mb-2"
                style={{ color: '#C8A24D', fontSize: 11, letterSpacing: '0.20em', fontFamily: 'var(--font-mono)' }}
              >
                {item.label}
              </p>
              <p className="text-sm" style={{ color: 'rgba(26,26,46,0.4)' }}>{item.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Séparateur lieu */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.22 }}
          className="flex items-center gap-4 py-5"
          style={{ borderBottom: '1px solid rgba(26,26,46,0.08)' }}
        >
          <div className="h-px flex-1" style={{ background: 'rgba(26,26,46,0.08)' }} aria-hidden="true" />
          <span
            className="font-medium flex-shrink-0"
            style={{
              fontSize: 10,
              letterSpacing: '0.26em',
              textTransform: 'uppercase',
              color: 'rgba(26,26,46,0.25)',
              fontFamily: 'var(--font-mono)',
            }}
          >
            Marina di Imperia · 18 – 25 Avril 2026
          </span>
          <div className="h-px flex-1" style={{ background: 'rgba(26,26,46,0.08)' }} aria-hidden="true" />
        </motion.div>

        {/* 4 stats secondaires */}
        <div className="grid grid-cols-2 md:grid-cols-4">
          {([
            { valeur: 36, suffix: '', label: 'Équipages',    description: 'En régate · Mer Ligure' },
            { valeur: 7,  suffix: '', label: 'Jours',        description: 'Voile, sport, soirées' },
            { valeur: 5,  suffix: '', label: 'Start-ups',    description: 'Journée Entrepreneuriat' },
            { valeur: 2,  suffix: '', label: 'Collectes',    description: 'Mer Ligure · Port Propre' },
          ] as { valeur: number; suffix: string; label: string; description: string }[]).map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: 0.28 + i * 0.07 }}
              className={[
                'py-10 lg:py-12',
                i < 3 ? 'pr-5 md:pr-8' : '',
                i > 0 ? 'pl-5 md:pl-8' : '',
              ].join(' ')}
              style={{
                ...(i < 3 ? { borderRight: '1px solid rgba(26,26,46,0.08)' } : {}),
                ...(i < 2 ? { borderBottom: '1px solid rgba(26,26,46,0.08)' } : {}),
              }}
            >
              <div
                className="tabular-nums leading-none mb-2"
                style={{
                  fontFamily: 'var(--font-playfair)',
                  fontSize: 'clamp(1.8rem, 4vw, 2.8rem)',
                  fontWeight: 400,
                  color: '#1A1A2E',
                }}
              >
                <AnimatedNumber value={item.valeur} suffix={item.suffix} duration={1600} />
              </div>
              <p
                className="font-bold uppercase mb-1"
                style={{ color: '#C8A24D', fontSize: 10, letterSpacing: '0.16em', fontFamily: 'var(--font-mono)' }}
              >
                {item.label}
              </p>
              <p className="text-xs" style={{ color: 'rgba(26,26,46,0.35)' }}>{item.description}</p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  )
}
