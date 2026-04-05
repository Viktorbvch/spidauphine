'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { Phone, CalendarDays, Users, MapPin } from 'lucide-react'
import { sports } from '@/data/sports'

function SportIcon({ id, className }: { id: string; className?: string }) {
  if (id === 'rugby') return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <ellipse cx="12" cy="12" rx="8" ry="5" transform="rotate(45 12 12)" />
      <line x1="12" y1="4.5" x2="12" y2="19.5" />
      <line x1="4.5" y1="12" x2="19.5" y2="12" />
    </svg>
  )
  if (id === 'football') return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <circle cx="12" cy="12" r="9" />
      <path d="M12 3a9 9 0 0 1 6.36 2.64M12 3a9 9 0 0 0-6.36 2.64M12 21a9 9 0 0 1-6.36-2.64M12 21a9 9 0 0 0 6.36-2.64M3 12h18M12 3l3 9-3 9-3-9z" />
    </svg>
  )
  if (id === 'volley') return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12 Q7 6 12 12 Q17 18 21 12" />
      <path d="M12 3 Q10 8 12 12 Q14 16 12 21" />
    </svg>
  )
  if (id === 'caritative') return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
      <circle cx="13" cy="4" r="1.5" />
      <path d="M5 21l3.5-7 2.5 3 3-4.5 4 2.5" />
      <path d="M9 9l2 3-3 3" />
    </svg>
  )
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="3" />
      <line x1="12" y1="3" x2="12" y2="9" />
      <line x1="12" y1="15" x2="12" y2="21" />
      <line x1="3" y1="12" x2="9" y2="12" />
      <line x1="15" y1="12" x2="21" y2="12" />
    </svg>
  )
}

export default function Multisports() {
  const [activeTab, setActiveTab] = useState(sports[0].id)
  const activeSport = sports.find(s => s.id === activeTab)!

  return (
    <section id="multisports" className="relative bg-[#071A35] overflow-hidden">

      {/* ── BANNER — photo crossfade ── */}
      <div className="relative h-[65vh] min-h-[480px] max-h-[700px]">
        <AnimatePresence>
          <motion.div
            key={activeTab}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7 }}
            className="absolute inset-0"
          >
            <Image
              src={activeSport.imageUrl}
              alt={`${activeSport.nom} au Challenge SPI Dauphine`}
              fill
              className="object-cover object-center"
              sizes="100vw"
              priority={activeTab === sports[0].id}
            />
          </motion.div>
        </AnimatePresence>
        <div className="absolute inset-0 bg-gradient-to-t from-[#071A35] via-[#071A35]/40 to-black/20" aria-hidden="true" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#071A35]/60 via-transparent to-transparent" aria-hidden="true" />

        {/* Contenu ancré en bas */}
        <div className="absolute inset-x-0 bottom-0 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-10">

          {/* Titre + badge 30% sur la même ligne */}
          <div className="flex flex-wrap items-end gap-5 mb-8">
            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55 }}
              className="text-white"
              style={{
                fontFamily: 'var(--font-playfair)',
                fontSize: 'clamp(2rem, 5vw, 3.8rem)',
                fontWeight: 700,
                lineHeight: 1.1,
              }}
            >
              Challenge <span style={{ color: '#E8A930' }}>Multisports</span>
            </motion.h2>

            {/* Badge 30% — mis en avant, sobre, bien visible */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: 0.15 }}
              className="flex-shrink-0 mb-1"
            >
              <div className="flex items-baseline gap-1 px-4 py-2 rounded-full border border-[#E8A930]/40 bg-[#E8A930]/10 backdrop-blur-sm">
                <span
                  className="font-bold text-[#E8A930]"
                  style={{ fontFamily: 'var(--font-playfair)', fontSize: '1.6rem', lineHeight: 1 }}
                >
                  30%
                </span>
                <span className="text-white/60 text-xs font-medium">du classement final</span>
              </div>
            </motion.div>
          </div>

          {/* Tabs = planning intégré : jour · sport · lieu en une seule carte */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide"
            role="tablist"
            aria-label="Planning des épreuves"
          >
            {sports.map(sport => {
              const isActive = activeTab === sport.id
              return (
                <button
                  key={sport.id}
                  role="tab"
                  aria-selected={isActive}
                  aria-controls={`tab-panel-${sport.id}`}
                  onClick={() => setActiveTab(sport.id)}
                  className={`flex flex-col items-start px-4 py-3 rounded-xl text-left whitespace-nowrap transition-all duration-250 cursor-pointer border flex-shrink-0 min-w-[110px] ${
                    isActive
                      ? 'bg-white/15 border-white/30'
                      : 'bg-white/5 border-white/10 hover:bg-white/10'
                  }`}
                >
                  {/* Jour */}
                  <span className={`text-[10px] font-mono mb-1.5 ${isActive ? 'text-[#E8A930]' : 'text-white/40'}`}>
                    {sport.jours.split(' ').slice(0, 2).join(' ')}
                  </span>
                  {/* Icône + nom */}
                  <span className="flex items-center gap-1.5 mb-1">
                    <SportIcon id={sport.id} className={`w-3.5 h-3.5 flex-shrink-0 ${isActive ? 'text-white' : 'text-white/60'}`} />
                    <span className={`text-sm font-semibold ${isActive ? 'text-white' : 'text-white/70'}`}>
                      {sport.nom}
                    </span>
                  </span>
                  {/* Lieu */}
                  <span className="text-[10px] text-white/35 leading-tight">{sport.lieu}</span>
                </button>
              )
            })}
          </motion.div>
        </div>
      </div>

      {/* ── CONTEXTE CHALLENGE MULTISPORT ── */}
      <div className="border-t border-white/8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">

          {/* Barre de répartition 70 / 30 */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
            className="mb-12"
          >
            <p
              className="text-[10px] font-bold uppercase tracking-[0.35em] mb-3"
              style={{ color: 'rgba(255,255,255,0.28)' }}
            >
              Répartition du classement général
            </p>
            <div
              className="flex h-1.5 rounded-full overflow-hidden"
              style={{ background: 'rgba(255,255,255,0.06)' }}
              role="img"
              aria-label="70 % épreuves nautiques, 30 % épreuves terrestres"
            >
              <div
                className="h-full"
                style={{ width: '70%', background: 'linear-gradient(90deg, #0BBFBF, rgba(11,191,191,0.5))' }}
              />
              <div
                className="h-full"
                style={{ width: '30%', background: 'linear-gradient(90deg, rgba(232,169,48,0.5), #E8A930)' }}
              />
            </div>
            <div className="flex justify-between mt-2.5">
              <span className="text-[11px] font-semibold" style={{ color: 'rgba(11,191,191,0.7)' }}>
                70 % — épreuves nautiques
              </span>
              <span className="text-[11px] font-semibold" style={{ color: 'rgba(232,169,48,0.7)' }}>
                30 % — épreuves terrestres
              </span>
            </div>
          </motion.div>

          {/* Grille : texte éditorial + 3 piliers */}
          <div className="grid lg:grid-cols-[1fr_1fr] gap-10 lg:gap-16 items-start">

            {/* Colonne gauche — texte */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.05 }}
            >
              <p
                className="text-[10px] font-bold uppercase tracking-[0.38em] mb-4"
                style={{ color: '#0BBFBF' }}
              >
                Le volet terrestre
              </p>
              <h3
                className="text-white font-bold leading-tight mb-5"
                style={{
                  fontFamily: 'var(--font-playfair)',
                  fontSize: 'clamp(1.4rem, 2.5vw, 1.9rem)',
                }}
              >
                Une discipline différente<br />
                <span style={{ color: '#E8A930' }}>chaque jour</span>
              </h3>
              <p className="text-white/55 leading-relaxed mb-4" style={{ fontSize: 'clamp(0.88rem, 1.15vw, 0.97rem)' }}>
                Le Challenge Multisport constitue le volet terrestre de l&apos;événement et entre pleinement dans le classement général.
                Chaque jour, une discipline différente est proposée aux équipes — football, rugby, volley, kayak, course caritative —
                avec un programme volontairement évolutif d&apos;une édition à l&apos;autre, adapté aux infrastructures disponibles :
                plages, terrains et équipements municipaux.
              </p>
              <p className="text-white/55 leading-relaxed" style={{ fontSize: 'clamp(0.88rem, 1.15vw, 0.97rem)' }}>
                Les jeunes de la ville hôte sont invités à participer aux épreuves terrestres,
                favorisant les échanges entre équipes étudiantes et acteurs locaux.
              </p>
            </motion.div>

            {/* Colonne droite — 3 piliers */}
            <div className="flex flex-col gap-3">
              {([
                {
                  icon: CalendarDays,
                  color: '#E8A930',
                  label: 'Programme évolutif',
                  desc: 'Une nouvelle discipline à chaque édition, pensée selon les infrastructures locales disponibles — plages, terrains, équipements municipaux.',
                },
                {
                  icon: MapPin,
                  color: '#0BBFBF',
                  label: 'Associations sportives locales',
                  desc: 'Partenariats opérationnels avec les clubs du territoire — mise à disposition de terrains, encadrement et prêt de matériel.',
                },
                {
                  icon: Users,
                  color: '#1A6B8C',
                  label: 'Ouverture sur la ville',
                  desc: 'Les jeunes de la ville hôte participent aux épreuves aux côtés des équipes étudiantes — une rencontre unique entre campus et territoire.',
                },
              ] as { icon: React.ElementType; color: string; label: string; desc: string }[]).map(({ icon: Icon, color, label, desc }, i) => (
                <motion.div
                  key={label}
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.08 + i * 0.07 }}
                  className="flex items-start gap-4 p-5 rounded-xl"
                  style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}
                >
                  <div
                    className="w-9 h-9 rounded-lg flex-shrink-0 flex items-center justify-center mt-0.5"
                    style={{ background: `${color}18`, border: `1px solid ${color}30` }}
                  >
                    <Icon className="w-[18px] h-[18px]" style={{ color }} aria-hidden="true" />
                  </div>
                  <div>
                    <p className="text-white font-semibold text-sm mb-1 leading-snug">{label}</p>
                    <p className="text-white/42 text-xs leading-relaxed">{desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* ── DÉTAIL SPORT — léger, épuré ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            id={`tab-panel-${activeTab}`}
            role="tabpanel"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start"
          >
            {/* Description — 2 cols */}
            <div className="lg:col-span-2">
              <p className="text-white/65 text-base leading-relaxed mb-6">
                {activeSport.description}
              </p>
              {/* Règles en ligne compacte */}
              <ul className="flex flex-col gap-2">
                {activeSport.regles.map((regle, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-white/55">
                    <span className="text-[#E8A930]/60 mt-0.5 flex-shrink-0 text-xs">◆</span>
                    {regle}
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact — 1 col, sobre */}
            <div className="flex items-start gap-4 px-5 py-4 rounded-2xl bg-white/5 border border-white/10">
              <div className="w-8 h-8 rounded-lg bg-[#0BBFBF]/15 flex items-center justify-center flex-shrink-0 mt-0.5">
                <Phone className="w-3.5 h-3.5 text-[#0BBFBF]" aria-hidden="true" />
              </div>
              <div>
                <p className="text-[11px] text-white/35 mb-1 uppercase tracking-wide">Responsable</p>
                <p className="text-sm font-semibold text-white mb-0.5">Valentin Lottet</p>
                <a href="tel:+33784270365" className="text-sm text-[#0BBFBF] hover:text-[#40D4D4] transition-colors cursor-pointer">
                  +33 7 84 27 03 65
                </a>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Pied de section */}
        <div className="border-t border-white/10 mt-10 pt-8">
          <p className="text-[11px] font-medium text-white/25 uppercase tracking-[0.25em] text-center">
            Dépassement de soi · Esprit d'équipe · Aftersea à 18h
          </p>
        </div>
      </div>
    </section>
  )
}
