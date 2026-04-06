'use client'

import { motion } from 'framer-motion'
import AnimatedNumber from '@/components/ui/AnimatedNumber'

export default function ChiffresClés() {
  return (
    <section
      className="relative overflow-hidden"
      aria-label="Le Challenge en chiffres"
      style={{ background: 'linear-gradient(160deg, #0C1B33 0%, #0C1B33 55%, #0C1B33 100%)' }}
    >
      {/* Ligne haute */}
      <div
        className="absolute top-0 left-0 right-0 h-px pointer-events-none"
        style={{ background: 'linear-gradient(90deg, transparent 0%, rgba(61,184,164,0.28) 30%, rgba(200,162,77,0.22) 70%, transparent 100%)' }}
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 lg:pt-20 pb-0">

        {/* Eyebrow gauche — pas centré */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-[10px] font-bold uppercase tracking-[0.45em] mb-10 lg:mb-14"
          style={{ color: 'rgba(61,184,164,0.65)' }}
        >
          Le Challenge en chiffres
        </motion.p>

        {/* 2 grands chiffres phares */}
        <div
          className="grid grid-cols-1 sm:grid-cols-2"
          style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }}
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
                'py-12 lg:py-16 border-b border-white/[0.07]',
                i === 0 ? 'sm:border-r border-white/[0.07] sm:pr-10 lg:pr-16' : 'sm:pl-10 lg:pl-16',
              ].join(' ')}
            >
              <div
                className="text-white tabular-nums leading-none mb-3"
                style={{
                  fontFamily: 'var(--font-playfair)',
                  fontSize: 'clamp(4rem, 9vw, 7.5rem)',
                  fontWeight: 700,
                  letterSpacing: '-0.025em',
                }}
              >
                <AnimatedNumber value={item.valeur} suffix={item.suffix} duration={2000} />
              </div>
              <p
                className="font-bold uppercase mb-2"
                style={{ color: '#C8A24D', fontSize: 11, letterSpacing: '0.20em' }}
              >
                {item.label}
              </p>
              <p className="text-white/32 text-sm">{item.description}</p>
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
          style={{ borderBottom: '1px solid rgba(255,255,255,0.07)' }}
        >
          <div className="h-px flex-1" style={{ background: 'rgba(255,255,255,0.07)' }} aria-hidden="true" />
          <span
            className="text-white/22 font-medium flex-shrink-0"
            style={{ fontSize: 10, letterSpacing: '0.26em', textTransform: 'uppercase' }}
          >
            Marina di Imperia · 18 – 25 Avril 2026
          </span>
          <div className="h-px flex-1" style={{ background: 'rgba(255,255,255,0.07)' }} aria-hidden="true" />
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
                /* border-r entre les colonnes — responsive */
                i < 3 ? 'border-r border-white/[0.07] pr-5 md:pr-8' : '',
                i > 0 ? 'pl-5 md:pl-8' : '',
                /* border-b entre les deux lignes sur mobile (2 cols) */
                i < 2 ? 'border-b md:border-b-0 border-white/[0.07]' : '',
              ].join(' ')}
            >
              <div
                className="text-white tabular-nums leading-none mb-2"
                style={{
                  fontFamily: 'var(--font-playfair)',
                  fontSize: 'clamp(1.8rem, 4vw, 2.8rem)',
                  fontWeight: 700,
                }}
              >
                <AnimatedNumber value={item.valeur} suffix={item.suffix} duration={1600} />
              </div>
              <p
                className="font-bold uppercase mb-1"
                style={{ color: '#C8A24D', fontSize: 10, letterSpacing: '0.16em' }}
              >
                {item.label}
              </p>
              <p className="text-white/28 text-xs">{item.description}</p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  )
}
