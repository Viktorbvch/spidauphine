'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Phone, Mail, AlertTriangle } from 'lucide-react'
import SectionTitle from '@/components/ui/SectionTitle'
import { contactsEquipe, contactsSpecialises, urgences } from '@/data/contacts'

export default function Contact() {
  const [form, setForm] = useState({ nom: '', societe: '', email: '', message: '' })
  const [sent, setSent] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Connecter à un vrai backend ou service email (ex: Resend, Formspree)
    setSent(true)
  }

  return (
    <section id="contact" className="py-20 lg:py-28 bg-[#F8FAFC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-14">
          <SectionTitle
            eyebrow="Partenariats & questions"
            title="Nous"
            titleAccent="contacter"
            subtitle="Pour toute demande de partenariat ou question sur l'organisation, retrouvez ici l'ensemble de l'équipe."
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Équipe organisatrice */}
          <div>
            <h3 className="text-lg font-bold text-[#0B2545] mb-5" style={{ fontFamily: 'var(--font-playfair)' }}>
              L'équipe organisatrice
            </h3>
            <div className="space-y-3 mb-8">
              {contactsEquipe.map((c, i) => (
                <motion.div
                  key={c.email}
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.07 }}
                  className="flex items-start gap-4 p-4 bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-200"
                >
                  <div className="w-9 h-9 rounded-full bg-[#0B2545] flex items-center justify-center flex-shrink-0 text-white text-xs font-bold">
                    {c.nom.split(' ').map(n => n[0]).join('').slice(0, 2)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-[#0B2545]">{c.nom}</p>
                    <p className="text-xs text-[#94A3B8] mb-1.5">{c.role}</p>
                    <div className="flex flex-wrap gap-3">
                      <a href={`tel:${c.tel.replace(/\s/g, '')}`} className="flex items-center gap-1 text-xs text-[#1A6B8C] hover:text-[#0B2545] transition-colors cursor-pointer">
                        <Phone className="w-3 h-3" aria-hidden="true" />
                        {c.tel}
                      </a>
                      <a href={`mailto:${c.email}`} className="flex items-center gap-1 text-xs text-[#1A6B8C] hover:text-[#0B2545] transition-colors cursor-pointer truncate">
                        <Mail className="w-3 h-3" aria-hidden="true" />
                        {c.email}
                      </a>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Contacts spécialisés */}
            <h3 className="text-lg font-bold text-[#0B2545] mb-4" style={{ fontFamily: 'var(--font-playfair)' }}>
              Contacts spécialisés
            </h3>
            <div className="space-y-3 mb-8">
              {contactsSpecialises.map((c, i) => (
                <motion.div
                  key={c.nom}
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                  className="flex items-center gap-4 p-4 bg-white rounded-xl border border-gray-100 shadow-sm"
                >
                  <div className="w-9 h-9 rounded-full bg-[#1A6B8C] flex items-center justify-center flex-shrink-0 text-white text-xs font-bold">
                    {c.nom.split(' ').map(n => n[0]).join('').slice(0, 2)}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-[#0B2545]">{c.nom}</p>
                    <p className="text-xs text-[#94A3B8] mb-1">{c.role}</p>
                    <a href={`tel:${c.tel.replace(/\s/g, '')}`} className="flex items-center gap-1 text-xs text-[#1A6B8C] hover:text-[#0B2545] transition-colors cursor-pointer">
                      <Phone className="w-3 h-3" aria-hidden="true" />
                      {c.tel}
                    </a>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Numéros d'urgence */}
            <div className="rounded-2xl bg-[#FFF1EF] border border-[#FECACA] p-5">
              <div className="flex items-center gap-2 mb-4">
                <AlertTriangle className="w-4 h-4 text-[#E05B40]" aria-hidden="true" />
                <h4 className="text-sm font-bold text-[#0B2545]">Numéros d'urgence — Sur place à Imperia</h4>
              </div>
              <ul className="space-y-2">
                {urgences.map(u => (
                  <li key={u.label} className="flex items-center justify-between gap-3">
                    <span className="text-xs text-[#64748B]">{u.label}</span>
                    <a
                      href={`tel:${u.numero.replace(/\s/g, '')}`}
                      className="text-xs font-bold text-[#E05B40] hover:text-[#0B2545] transition-colors cursor-pointer tabular-nums"
                    >
                      {u.numero}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Formulaire partenariat */}
          <div>
            <h3 className="text-lg font-bold text-[#0B2545] mb-5" style={{ fontFamily: 'var(--font-playfair)' }}>
              Demande de partenariat
            </h3>

            {sent ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-[#EDFAF4] border border-[#A7F3D0] rounded-2xl p-8 text-center"
              >
                <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-[#A7F3D0] flex items-center justify-center" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                </div>
                <h4 className="font-bold text-[#0B2545] mb-2">Message envoyé !</h4>
                <p className="text-sm text-[#64748B]">Notre équipe vous répondra dans les plus brefs délais.</p>
              </motion.div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-4"
                noValidate
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="nom" className="block text-xs font-semibold text-[#0B2545] mb-1.5">
                      Nom <span className="text-[#E05B40]" aria-label="requis">*</span>
                    </label>
                    <input
                      id="nom"
                      type="text"
                      required
                      value={form.nom}
                      onChange={e => setForm(f => ({ ...f, nom: e.target.value }))}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm text-[#0B2545] placeholder-[#94A3B8] focus:outline-none focus:ring-2 focus:ring-[#1A6B8C]/30 focus:border-[#1A6B8C] transition-colors"
                      placeholder="Jean Dupont"
                    />
                  </div>
                  <div>
                    <label htmlFor="societe" className="block text-xs font-semibold text-[#0B2545] mb-1.5">
                      Société
                    </label>
                    <input
                      id="societe"
                      type="text"
                      value={form.societe}
                      onChange={e => setForm(f => ({ ...f, societe: e.target.value }))}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm text-[#0B2545] placeholder-[#94A3B8] focus:outline-none focus:ring-2 focus:ring-[#1A6B8C]/30 focus:border-[#1A6B8C] transition-colors"
                      placeholder="Mon Entreprise"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="block text-xs font-semibold text-[#0B2545] mb-1.5">
                    Email <span className="text-[#E05B40]" aria-label="requis">*</span>
                  </label>
                  <input
                    id="email"
                    type="email"
                    required
                    value={form.email}
                    onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm text-[#0B2545] placeholder-[#94A3B8] focus:outline-none focus:ring-2 focus:ring-[#1A6B8C]/30 focus:border-[#1A6B8C] transition-colors"
                    placeholder="jean@monentreprise.com"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-xs font-semibold text-[#0B2545] mb-1.5">
                    Message <span className="text-[#E05B40]" aria-label="requis">*</span>
                  </label>
                  <textarea
                    id="message"
                    required
                    rows={5}
                    value={form.message}
                    onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm text-[#0B2545] placeholder-[#94A3B8] focus:outline-none focus:ring-2 focus:ring-[#1A6B8C]/30 focus:border-[#1A6B8C] transition-colors resize-none"
                    placeholder="Décrivez votre demande de partenariat..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-[#0B2545] text-white text-sm font-semibold hover:bg-[#133366] transition-colors duration-200 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1A6B8C]"
                >
                  Envoyer ma demande
                </button>

                <p className="text-xs text-[#94A3B8] text-center">
                  Ce formulaire est réservé aux demandes de partenariat.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
