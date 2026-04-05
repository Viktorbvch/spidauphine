'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Clock, MapPin, ChevronDown } from 'lucide-react'
import SectionTitle from '@/components/ui/SectionTitle'
import { programme } from '@/data/programme'

const typeConfig: Record<string, { bg: string; text: string; border: string; dot: string; label: string }> = {
  regate:    { bg: '#EFF8FF', text: '#1A6B8C', border: '#BAE6FD', dot: '#1A6B8C', label: '⛵ Régate' },
  sport:     { bg: '#EDFAF4', text: '#1A8C6B', border: '#A7F3D0', dot: '#1A8C6B', label: '🏃 Sport' },
  soiree:    { bg: '#FDF4FF', text: '#9333EA', border: '#E9D5FF', dot: '#9333EA', label: '🎉 Soirée' },
  engagement:{ bg: '#EDFAF4', text: '#1A8C6B', border: '#A7F3D0', dot: '#1A8C6B', label: '🤝 Engagement' },
  ceremonie: { bg: '#FFFBEB', text: '#92400E', border: '#FDE68A', dot: '#E8A930', label: '🏆 Cérémonie' },
  journee:   { bg: '#FFFBEB', text: '#B45309', border: '#FDE68A', dot: '#E8A930', label: '🎤 Entrepreneuriat' },
  repas:     { bg: '#F8FAFC', text: '#64748B', border: '#E2E8F0', dot: '#94A3B8', label: '☕ Repas' },
  media:     { bg: '#F1F5F9', text: '#475569', border: '#CBD5E1', dot: '#64748B', label: '📺 Grand Écran' },
}

export default function Programme() {
  const [activeDay, setActiveDay] = useState(0)
  const [expandedEvent, setExpandedEvent] = useState<string | null>(null)

  const currentDay = programme[activeDay]

  return (
    <section id="programme" className="py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-12">
          <SectionTitle
            eyebrow="18 — 24 Avril 2026"
            title="Programme"
            titleAccent="officiel"
            subtitle="7 jours intenses : régates, sports, soirées chapiteau, engagements et rencontres. Chaque journée a sa couleur."
          />
        </div>

        {/* Jour tabs */}
        <div className="overflow-x-auto scrollbar-hide -mx-4 px-4 mb-10">
          <div className="flex gap-2 min-w-max pb-2">
            {programme.map((jour, i) => (
              <button
                key={jour.date}
                onClick={() => { setActiveDay(i); setExpandedEvent(null) }}
                className={`flex flex-col items-center gap-1 px-4 py-3 rounded-xl text-sm font-medium whitespace-nowrap transition-all duration-200 cursor-pointer border relative ${
                  activeDay === i
                    ? 'bg-[#0B2545] text-white border-[#0B2545] shadow-md'
                    : 'bg-white text-[#64748B] border-gray-200 hover:border-[#0B2545]/30 hover:text-[#0B2545]'
                }`}
                aria-pressed={activeDay === i}
              >
                {jour.theme && (
                  <span
                    className="absolute -top-1.5 left-1/2 -translate-x-1/2 text-xs px-2 py-0.5 rounded-full text-white font-semibold whitespace-nowrap"
                    style={{ backgroundColor: jour.themeColor, fontSize: '9px' }}
                  >
                    Journée thématique
                  </span>
                )}
                <span className="text-xl" role="img" aria-label={jour.jour}>{jour.emoji}</span>
                <span className="font-semibold text-xs">{jour.jour}</span>
                <span className={`text-xs ${activeDay === i ? 'text-white/70' : 'text-[#94A3B8]'}`}>{jour.date}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Timeline */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeDay}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3 }}
          >
            {/* Journée thématique badge */}
            {currentDay.theme && (
              <div
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-white text-sm font-semibold mb-4"
                style={{ backgroundColor: currentDay.themeColor }}
              >
                <span className="text-base">{currentDay.emoji}</span>
                {currentDay.theme}
              </div>
            )}

            <div className="flex items-center gap-3 mb-6">
              <div>
                <h3 className="text-xl font-bold text-[#0B2545]" style={{ fontFamily: 'var(--font-playfair)' }}>
                  {currentDay.jour} {currentDay.date}
                </h3>
                <p className="text-sm text-[#64748B]">
                  {currentDay.evenements.length} événement{currentDay.evenements.length > 1 ? 's' : ''} au programme
                </p>
              </div>
            </div>

            <div className="relative">
              <div className="absolute left-6 top-0 bottom-0 w-px bg-gray-200" aria-hidden="true" />

              <div className="space-y-3">
                {currentDay.evenements.map((ev, i) => {
                  const cfg = typeConfig[ev.type]
                  const eventId = `${activeDay}-${i}`
                  const isExpanded = expandedEvent === eventId
                  const hasDetail = !!ev.description || !!ev.lieu

                  return (
                    <motion.div
                      key={eventId}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: i * 0.05 }}
                      className="relative pl-14"
                    >
                      <div
                        className="absolute left-4 top-4 w-4 h-4 rounded-full border-2 border-white shadow-sm z-10 -translate-x-1/2"
                        style={{ backgroundColor: cfg.dot }}
                        aria-hidden="true"
                      />

                      <div
                        className={`rounded-xl border transition-all duration-200 overflow-hidden ${isExpanded ? 'shadow-md' : ''}`}
                        style={{ borderColor: isExpanded ? cfg.border : '#E2E8F0' }}
                      >
                        <div
                          className={`flex items-start justify-between gap-3 p-3.5 ${hasDetail ? 'cursor-pointer' : ''}`}
                          onClick={() => hasDetail && setExpandedEvent(isExpanded ? null : eventId)}
                          role={hasDetail ? 'button' : undefined}
                          aria-expanded={hasDetail ? isExpanded : undefined}
                        >
                          <div className="flex items-start gap-3 flex-1 min-w-0">
                            <div className="flex items-center gap-1 text-xs font-semibold text-[#64748B] min-w-16 flex-shrink-0 pt-0.5">
                              <Clock className="w-3 h-3" aria-hidden="true" />
                              <span className="whitespace-nowrap">{ev.heure}</span>
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex flex-wrap items-center gap-2 mb-0.5">
                                <h4 className="text-sm font-semibold text-[#0B2545]">{ev.titre}</h4>
                                <span
                                  className="text-xs px-2 py-0.5 rounded-full font-medium flex-shrink-0"
                                  style={{ backgroundColor: cfg.bg, color: cfg.text }}
                                >
                                  {cfg.label}
                                </span>
                              </div>
                              {ev.lieu && !isExpanded && (
                                <div className="flex items-center gap-1 text-xs text-[#94A3B8]">
                                  <MapPin className="w-3 h-3" aria-hidden="true" />
                                  {ev.lieu}
                                </div>
                              )}
                            </div>
                          </div>
                          {hasDetail && (
                            <ChevronDown
                              className={`w-4 h-4 text-[#94A3B8] flex-shrink-0 mt-0.5 transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`}
                              aria-hidden="true"
                            />
                          )}
                        </div>

                        <AnimatePresence>
                          {isExpanded && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.22 }}
                              className="overflow-hidden"
                            >
                              <div
                                className="px-4 pb-4 pt-2 text-sm text-[#64748B] leading-relaxed border-t space-y-1"
                                style={{ borderColor: cfg.border, backgroundColor: cfg.bg + '60' }}
                              >
                                {ev.lieu && (
                                  <div className="flex items-center gap-1.5 text-xs font-medium text-[#475569]">
                                    <MapPin className="w-3 h-3" aria-hidden="true" />
                                    {ev.lieu}
                                  </div>
                                )}
                                {ev.description && <p>{ev.description}</p>}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </motion.div>
                  )
                })}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}
