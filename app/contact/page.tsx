'use client'

import { useState } from 'react'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { motion, AnimatePresence } from 'framer-motion'
import { Mail, MapPin, MessageSquare, Newspaper, Building2, ArrowRight, CheckCircle2 } from 'lucide-react'

/* ══ Canaux ══════════════════════════════════════════════════════ */
type ChannelId = 'general' | 'presse' | 'partenariat'

const CHANNELS = [
  {
    id: 'general'     as ChannelId,
    Icon: MessageSquare,
    label: 'Question générale',
    desc:  'Informations, inscriptions, logistique ou toute autre question sur l\'événement.',
    to:    'contact@spidophile.com',
    subject: 'Question générale — SPI Dauphine 45',
  },
  {
    id: 'presse'      as ChannelId,
    Icon: Newspaper,
    label: 'Demande de presse',
    desc:  'Accréditations, demandes d\'interviews, revue de presse et accès médias.',
    to:    'contact@spidophile.com',
    subject: 'Demande de presse — SPI Dauphine 45',
  },
  {
    id: 'partenariat' as ChannelId,
    Icon: Building2,
    label: 'Partenariat',
    desc:  'Rejoindre l\'aventure en tant que partenaire ou sponsor de la 45ème édition.',
    to:    'bureau@spidophile.com',
    subject: 'Demande de partenariat — SPI Dauphine 45',
  },
] as const

/* ══ Champs par canal ════════════════════════════════════════════ */
type FieldDef = {
  id: string; label: string; required: boolean
  type: 'text' | 'email' | 'textarea' | 'select'
  options?: string[]
  placeholder?: string
}
const FIELDS: Record<ChannelId, FieldDef[]> = {
  general: [
    { id:'nom',     label:'Nom complet',   type:'text',     required:true,  placeholder:'Jean Dupont' },
    { id:'email',   label:'Adresse e-mail',type:'email',    required:true,  placeholder:'jean@example.com' },
    { id:'objet',   label:'Objet',         type:'select',   required:false,
      options:['Informations générales','Inscriptions','Logistique & hébergement','Programme des épreuves','Autre'] },
    { id:'message', label:'Message',       type:'textarea', required:true,  placeholder:'Votre message…' },
  ],
  presse: [
    { id:'nom',     label:'Nom complet',      type:'text',    required:true,  placeholder:'Jean Dupont' },
    { id:'media',   label:'Média / Publication',type:'text',  required:true,  placeholder:'Le Figaro, France TV…' },
    { id:'role',    label:'Rôle',             type:'select',  required:false,
      options:['Journaliste','Photographe','Vidéaste','Community manager','Autre'] },
    { id:'email',   label:'Adresse e-mail',   type:'email',   required:true,  placeholder:'jean@media.fr' },
    { id:'message', label:'Demande',          type:'textarea',required:true,  placeholder:'Précisez votre demande…' },
  ],
  partenariat: [
    { id:'nom',     label:'Nom complet',      type:'text',    required:true,  placeholder:'Jean Dupont' },
    { id:'societe', label:'Société',          type:'text',    required:true,  placeholder:'Nom de votre entreprise' },
    { id:'fonction',label:'Fonction',         type:'text',    required:false, placeholder:'Directeur commercial…' },
    { id:'email',   label:'Adresse e-mail',   type:'email',   required:true,  placeholder:'jean@societe.com' },
    { id:'type',    label:'Type de partenariat',type:'select',required:false,
      options:['Sponsor titre','Partenaire officiel','Partenaire logistique','Fournisseur','Autre'] },
    { id:'message', label:'Message',          type:'textarea',required:true,  placeholder:'Décrivez votre projet…' },
  ],
}

/* ══ Composant champ ═════════════════════════════════════════════ */
function Field({ def, value, onChange }: {
  def: FieldDef
  value: string
  onChange: (v: string) => void
}) {
  const base = {
    background: 'rgba(255,255,255,0.04)',
    border: '1px solid rgba(255,255,255,0.09)',
    color: 'white',
    borderRadius: 10,
    outline: 'none',
    transition: 'border-color 0.2s',
    width: '100%',
    fontSize: 14,
  }

  if (def.type === 'textarea') return (
    <textarea
      id={def.id} rows={4} value={value} required={def.required}
      placeholder={def.placeholder}
      onChange={e => onChange(e.target.value)}
      className="placeholder-white/25 focus:border-[#0BBFBF]/60 resize-none"
      style={{ ...base, padding: '12px 16px' }}
    />
  )

  if (def.type === 'select') return (
    <select
      id={def.id} value={value} required={def.required}
      onChange={e => onChange(e.target.value)}
      className="focus:border-[#0BBFBF]/60"
      style={{ ...base, padding: '12px 16px', cursor: 'pointer' }}
    >
      <option value="" style={{ background: '#0B2545' }}>Sélectionner…</option>
      {def.options?.map(o => (
        <option key={o} value={o} style={{ background: '#0B2545' }}>{o}</option>
      ))}
    </select>
  )

  return (
    <input
      id={def.id} type={def.type} value={value} required={def.required}
      placeholder={def.placeholder}
      onChange={e => onChange(e.target.value)}
      className="placeholder-white/25 focus:border-[#0BBFBF]/60"
      style={{ ...base, padding: '12px 16px' }}
    />
  )
}

/* ══ Page ════════════════════════════════════════════════════════ */
export default function ContactPage() {
  const [channel, setChannel]   = useState<ChannelId>('general')
  const [formData, setFormData] = useState<Record<string, string>>({})
  const [submitted, setSubmitted] = useState(false)

  const current = CHANNELS.find(c => c.id === channel)!
  const fields  = FIELDS[channel]

  const setField = (id: string, val: string) =>
    setFormData(prev => ({ ...prev, [id]: val }))

  const handleChannelChange = (id: ChannelId) => {
    setChannel(id)
    setFormData({})
    setSubmitted(false)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const bodyLines = fields
      .map(f => `${f.label}: ${formData[f.id] || '—'}`)
      .join('\n')
    window.open(
      `mailto:${current.to}?subject=${encodeURIComponent(current.subject)}&body=${encodeURIComponent(bodyLines)}`
    )
    setSubmitted(true)
  }

  return (
    <>
      <Header />
      <main
        style={{
          background: 'linear-gradient(to bottom, #040d1e 0%, #071428 60%, #0b1e3a 100%)',
          minHeight: '100vh',
          paddingTop: 82,
        }}
      >
        {/* ── Banner ── */}
        <div
          className="relative overflow-hidden"
          style={{
            padding: 'clamp(48px, 8vw, 96px) 0 clamp(40px, 6vw, 72px)',
            borderBottom: '1px solid rgba(255,255,255,0.06)',
          }}
        >
          {/* Halo décoratif */}
          <div
            aria-hidden="true"
            className="absolute pointer-events-none"
            style={{
              top: -120, right: '15%',
              width: 480, height: 480,
              background: 'radial-gradient(circle, rgba(11,191,191,0.07) 0%, transparent 70%)',
              borderRadius: '50%',
            }}
          />
          <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
            <p className="text-[#0BBFBF] text-[10px] font-bold uppercase tracking-[0.50em] mb-4">
              SPI Dauphine · 45ème édition
            </p>
            <h1
              className="text-white mb-5"
              style={{
                fontFamily: 'var(--font-playfair)',
                fontSize: 'clamp(2.4rem, 5.5vw, 4rem)',
                fontWeight: 700,
                letterSpacing: '-0.02em',
                lineHeight: 1.1,
              }}
            >
              Contactez-nous
            </h1>
            <p className="text-white/45 text-base max-w-xl leading-relaxed">
              Une question, une demande d&apos;accréditation presse ou un projet de partenariat ?
              Choisissez le canal adapté — on vous répond rapidement.
            </p>
          </div>
        </div>

        {/* ── Contenu principal ── */}
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-14 lg:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.8fr] gap-10 lg:gap-16 items-start">

            {/* ── Colonne gauche : infos ── */}
            <div className="lg:sticky lg:top-28 space-y-6">

              {/* Emails */}
              <div
                className="rounded-2xl p-7"
                style={{
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(255,255,255,0.07)',
                }}
              >
                <p className="text-[10px] font-bold uppercase tracking-[0.40em] text-[#E8A930] mb-5">
                  Nous écrire directement
                </p>
                <div className="space-y-5">
                  {[
                    { label: 'Bureau',  email: 'bureau@spidophile.com' },
                    { label: 'Contact', email: 'contact@spidophile.com' },
                  ].map(({ label, email }) => (
                    <a
                      key={email}
                      href={`mailto:${email}`}
                      className="flex items-start gap-3.5 group"
                    >
                      <div
                        className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5 transition-colors duration-200"
                        style={{ background: 'rgba(11,191,191,0.12)', border: '1px solid rgba(11,191,191,0.22)' }}
                      >
                        <Mail className="w-4 h-4 text-[#0BBFBF]" aria-hidden="true" />
                      </div>
                      <div>
                        <p className="text-[10px] uppercase tracking-[0.32em] text-white/35 font-semibold mb-0.5">{label}</p>
                        <p className="text-sm text-white/70 group-hover:text-white transition-colors duration-200 font-medium">
                          {email}
                        </p>
                      </div>
                    </a>
                  ))}
                </div>
              </div>

              {/* Adresse */}
              <div
                className="rounded-2xl p-7"
                style={{
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(255,255,255,0.07)',
                }}
              >
                <p className="text-[10px] font-bold uppercase tracking-[0.40em] text-[#E8A930] mb-5">
                  Sur place
                </p>
                <div className="flex items-start gap-3.5">
                  <div
                    className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5"
                    style={{ background: 'rgba(11,191,191,0.12)', border: '1px solid rgba(11,191,191,0.22)' }}
                  >
                    <MapPin className="w-4 h-4 text-[#0BBFBF]" aria-hidden="true" />
                  </div>
                  <div>
                    <p className="text-sm text-white/70 leading-relaxed">Marina di Imperia</p>
                    <p className="text-sm text-white/40">Imperia, Ligurie — Italie</p>
                    <p className="text-sm text-white/40 mt-1">18 – 25 Avril 2026</p>
                  </div>
                </div>
              </div>
            </div>

            {/* ── Colonne droite : formulaire ── */}
            <div>

              {/* Sélecteur de canal */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-8">
                {CHANNELS.map(ch => {
                  const active = channel === ch.id
                  return (
                    <motion.button
                      key={ch.id}
                      onClick={() => handleChannelChange(ch.id)}
                      whileHover={{ scale: 1.015 }}
                      whileTap={{ scale: 0.985 }}
                      className="text-left rounded-2xl p-5 cursor-pointer transition-all duration-250 relative overflow-hidden"
                      style={{
                        background: active
                          ? 'rgba(11,191,191,0.10)'
                          : 'rgba(255,255,255,0.03)',
                        border: active
                          ? '1px solid rgba(11,191,191,0.38)'
                          : '1px solid rgba(255,255,255,0.07)',
                      }}
                    >
                      {active && (
                        <motion.div
                          layoutId="channel-glow"
                          className="absolute inset-0 pointer-events-none rounded-2xl"
                          style={{ background: 'rgba(11,191,191,0.05)' }}
                          transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                        />
                      )}
                      <ch.Icon
                        className="w-5 h-5 mb-3"
                        style={{ color: active ? '#0BBFBF' : 'rgba(255,255,255,0.35)' }}
                        aria-hidden="true"
                      />
                      <p
                        className="text-sm font-semibold mb-1 leading-tight"
                        style={{ color: active ? 'white' : 'rgba(255,255,255,0.55)' }}
                      >
                        {ch.label}
                      </p>
                      <p className="text-[11px] leading-relaxed hidden sm:block" style={{ color: 'rgba(255,255,255,0.28)' }}>
                        {ch.desc}
                      </p>
                    </motion.button>
                  )
                })}
              </div>

              {/* Formulaire */}
              <div
                className="rounded-2xl overflow-hidden"
                style={{
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(255,255,255,0.07)',
                }}
              >
                <AnimatePresence mode="wait">
                  {submitted ? (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.96 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                      className="flex flex-col items-center justify-center text-center p-16 gap-5"
                    >
                      <div
                        className="w-16 h-16 rounded-full flex items-center justify-center"
                        style={{ background: 'rgba(11,191,191,0.14)', border: '1px solid rgba(11,191,191,0.30)' }}
                      >
                        <CheckCircle2 className="w-7 h-7 text-[#0BBFBF]" />
                      </div>
                      <div>
                        <h3
                          className="text-white text-xl font-semibold mb-2"
                          style={{ fontFamily: 'var(--font-playfair)' }}
                        >
                          Message préparé
                        </h3>
                        <p className="text-white/45 text-sm leading-relaxed max-w-xs">
                          Votre client mail s&apos;est ouvert avec votre message pré-rempli.
                          Envoyez-le quand vous êtes prêt.
                        </p>
                      </div>
                      <button
                        onClick={() => { setSubmitted(false); setFormData({}) }}
                        className="text-[#0BBFBF] text-sm font-medium hover:text-white transition-colors cursor-pointer mt-2"
                      >
                        Envoyer un autre message
                      </button>
                    </motion.div>
                  ) : (
                    <motion.form
                      key={channel}
                      onSubmit={handleSubmit}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.30, ease: [0.22, 1, 0.36, 1] }}
                      className="p-7 sm:p-8"
                    >
                      {/* Destinataire */}
                      <div className="flex items-center gap-2 mb-7 pb-6" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                        <current.Icon className="w-4 h-4 text-[#0BBFBF]" aria-hidden="true" />
                        <span className="text-[11px] font-semibold uppercase tracking-[0.32em] text-white/40">
                          {current.label}
                        </span>
                        <span className="ml-auto text-[11px] text-white/25">→ {current.to}</span>
                      </div>

                      {/* Champs */}
                      <div className="space-y-5">
                        {fields.map(f => (
                          <div key={f.id}>
                            <label
                              htmlFor={f.id}
                              className="block text-[10px] font-semibold uppercase tracking-[0.32em] text-white/40 mb-2"
                            >
                              {f.label}{f.required && <span className="text-[#0BBFBF] ml-1">*</span>}
                            </label>
                            <Field
                              def={f}
                              value={formData[f.id] ?? ''}
                              onChange={v => setField(f.id, v)}
                            />
                          </div>
                        ))}
                      </div>

                      {/* Bouton envoyer */}
                      <motion.button
                        type="submit"
                        whileHover={{ scale: 1.015 }}
                        whileTap={{ scale: 0.985 }}
                        className="mt-7 w-full flex items-center justify-center gap-2.5 font-semibold text-sm rounded-xl cursor-pointer"
                        style={{
                          padding: '14px 24px',
                          background: 'linear-gradient(135deg, #0B2545 0%, #1A6B8C 100%)',
                          border: '1px solid rgba(11,191,191,0.28)',
                          color: 'white',
                        }}
                      >
                        Envoyer le message
                        <ArrowRight className="w-4 h-4" aria-hidden="true" />
                      </motion.button>

                      <p className="mt-4 text-center text-[11px] text-white/22">
                        Ce formulaire ouvrira votre client mail avec le message pré-rempli.
                      </p>
                    </motion.form>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
