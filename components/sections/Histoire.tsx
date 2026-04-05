'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { Anchor } from 'lucide-react'
import SectionTitle from '@/components/ui/SectionTitle'

const jalons = [
  { annee: '1981', titre: 'La naissance', texte: 'Des étudiants de Paris Dauphine refusés à la régate EDHEC décident de créer leur propre événement. Catherine Chabaud, future première femme à réaliser un tour du monde en solitaire, fait partie des fondateurs.' },
  { annee: '1982', titre: 'L\'invention du binôme', texte: 'Création du concept fondateur : une équipe étudiante + une équipe d\'entreprise naviguent sous la même enseigne. Un lien unique entre le monde académique et professionnel.' },
  { annee: '1986', titre: 'Cap sur la Méditerranée', texte: 'Après des éditions atlantiques (Sables d\'Olonne, Bretagne), la SPI prend définitivement ses quartiers en mer Méditerranée. La voile et la fête estivale s\'imposent comme identité.' },
  { annee: '2017', titre: 'Le Challenge Multisports', texte: 'Lancement du Challenge Multisports à terre : rugby, football, volley, spikeball. L\'événement s\'enrichit d\'une dimension sportive plurielle et inclusive.' },
  { annee: '2021', titre: '40ème édition', texte: 'Le Challenge célèbre ses 40 ans à Cogolin. Paris Dauphine-PSL, l\'université fondatrice, remporte le classement général — un symbole fort pour l\'édition anniversaire.' },
  { annee: '2026', titre: '45ème édition — Imperia', texte: 'La SPI prend une nouvelle dimension internationale en posant ses voiles à la Marina di Imperia, côte ligure italienne. Plus de 1 000 étudiants, 36 équipages, 7 jours de compétition et de fête.' },
]

export default function Histoire() {
  return (
    <section id="histoire" className="py-20 lg:py-28 bg-[#F8FAFC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Left — titre + photo */}
          <div>
            <SectionTitle
              eyebrow="Depuis 1981"
              title="Une histoire"
              titleAccent="de passion"
              subtitle="Né de la volonté d'étudiants de Paris Dauphine, le Challenge SPI est devenu en 45 ans l'événement étudiant le plus emblématique du sud de l'Europe."
            />

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-8 relative rounded-2xl overflow-hidden h-72"
            >
              <Image
                src="https://images.unsplash.com/photo-1519914473038-3a4b1f10e929?w=900&q=80"
                alt="Voiliers en régate sur la Méditerranée — esprit du Challenge SPI Dauphine"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B2545]/70 to-transparent" />
              <div className="absolute bottom-5 left-5 right-5">
                <p className="text-white/80 text-sm italic leading-relaxed">
                  "Une passion commune : la mer, le sport et le partage."
                </p>
                <p className="text-[#E8A930] text-xs font-semibold mt-1">— L'esprit SPI depuis 1981</p>
              </div>
            </motion.div>

            {/* Fondatrice */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mt-6 p-5 rounded-2xl bg-[#0B2545] text-white"
            >
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-full bg-[#E8A930]/20 flex items-center justify-center flex-shrink-0">
                  <Anchor className="w-4 h-4 text-[#E8A930]" aria-hidden="true" />
                </div>
                <div>
                  <p className="font-semibold text-sm mb-1">Catherine Chabaud — Fondatrice</p>
                  <p className="text-white/70 text-sm leading-relaxed">
                    Étudiante à Paris Dauphine en 1981, elle cofonde la SPI avant de devenir la <strong className="text-white">première femme à réaliser un tour du monde en voile en solitaire</strong>. Un symbole de l'ambition qui anime la SPI depuis ses origines.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right — timeline */}
          <div>
            <div className="relative">
              <div className="absolute left-5 top-0 bottom-0 w-px bg-gradient-to-b from-[#0B2545] via-[#1A6B8C] to-[#E8A930]" aria-hidden="true" />

              <div className="space-y-6">
                {jalons.map((j, i) => (
                  <motion.div
                    key={j.annee}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: '-40px' }}
                    transition={{ duration: 0.5, delay: i * 0.08 }}
                    className="relative pl-14"
                  >
                    {/* Dot */}
                    <div
                      className={`absolute left-5 top-3 w-4 h-4 rounded-full -translate-x-1/2 border-2 border-white shadow-md ${
                        j.annee === '2026' ? 'bg-[#E8A930] scale-125' : 'bg-[#0B2545]'
                      }`}
                      aria-hidden="true"
                    />

                    <div className={`rounded-2xl p-4 border transition-all duration-200 ${
                      j.annee === '2026'
                        ? 'bg-[#0B2545] border-[#0B2545]'
                        : 'bg-white border-gray-100 hover:border-[#1A6B8C]/30 hover:shadow-sm'
                    }`}>
                      <div className="flex items-baseline gap-3 mb-1.5">
                        <span
                          className={`text-lg font-bold tabular-nums ${j.annee === '2026' ? 'text-[#E8A930]' : 'text-[#1A6B8C]'}`}
                          style={{ fontFamily: 'var(--font-playfair)' }}
                        >
                          {j.annee}
                        </span>
                        <span className={`text-sm font-semibold ${j.annee === '2026' ? 'text-white' : 'text-[#0B2545]'}`}>
                          {j.titre}
                        </span>
                      </div>
                      <p className={`text-sm leading-relaxed ${j.annee === '2026' ? 'text-white/75' : 'text-[#64748B]'}`}>
                        {j.texte}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
