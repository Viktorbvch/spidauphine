'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { Heart, Leaf, Users, Lightbulb } from 'lucide-react'
import SectionTitle from '@/components/ui/SectionTitle'

const startups = [
  { nom: 'Quadmission', description: 'Accompagne les étudiants pour intégrer le master de leur choix via analyse des données et des attentes des jurys. Suivi personnalisé de la stratégie aux entretiens.' },
  { nom: 'Solly', description: 'Facilite les dons aux personnes sans-abri via paiement sans contact (carte ou QR code). Fonds utilisés uniquement pour biens essentiels.' },
  { nom: 'Ambassia', description: 'Plateforme mettant en relation marques et étudiants ambassadeurs. Les entreprises gagnent en visibilité sur les campus, les étudiants valorisent leur CV.' },
  { nom: 'Sport Mate', description: 'Application connectant passionnés de sport pour trouver des partenaires d\'entraînement à proximité.' },
  { nom: 'Olago', description: 'Application de mobilité urbaine pour piétons. Itinéraires plus sûrs en temps réel, partage de trajet et lieux refuges.' },
]

const engagements = [
  {
    id: 'caritatif',
    icon: Heart,
    couleur: '#E05B40',
    couleurBg: '#FFF1EF',
    tag: 'Solidarité',
    date: 'Lundi 20 avril',
    titre: 'La Course Caritative',
    accroche: 'Courir pour Vents Différents',
    description: 'Dans le cadre de la Journée de l\'Inclusion, une <strong>course à pied caritative</strong> est organisée sur le front de mer d\'Imperia au profit de l\'association <strong>Vents Différents</strong>. Une épreuve qui unit compétition et solidarité.',
    chiffre: '~1 000',
    detail: 'coureurs mobilisés pour la cause',
    points: [
      'Course à pied sur le front de mer d\'Imperia',
      'Au profit de l\'association Vents Différents',
      'Ouverte à tous les participants',
      'Dossards fournis par l\'organisation',
    ],
    image: 'https://images.unsplash.com/photo-1552674605-db6ffd4facb5?w=800&q=80',
    imageAlt: 'Course caritative sur le front de mer',
  },
  {
    id: 'environnement',
    icon: Leaf,
    couleur: '#1A8C6B',
    couleurBg: '#EDFAF4',
    tag: 'Environnement',
    date: 'Mardi 21 & Jeudi 23 (19h – 21h)',
    titre: 'Collecte de Déchets',
    accroche: 'Port Propre sur la mer Ligure',
    description: 'En partenariat avec la <strong>Fondation de la Mer</strong>, deux collectes type "Port Propre" sont organisées sur le littoral et en ville d\'Imperia. Co-construites avec le port et la commune, elles mobilisent associations locales et collectifs de tri.',
    chiffre: '2',
    detail: 'collectes officielles, mardi et jeudi soir',
    points: [
      'Collectes co-construites avec la commune d\'Imperia',
      'Tri sélectif, mobilier recyclé, ateliers pédagogiques',
      'Partenariat Fondation de la Mer',
      'Sensibilisation du public sur le village',
    ],
    image: 'https://images.unsplash.com/photo-1531263462782-2de427eb5e6c?w=800&q=80',
    imageAlt: 'Collecte de déchets sur la côte méditerranéenne',
  },
  {
    id: 'inclusion',
    icon: Users,
    couleur: '#1A6B8C',
    couleurBg: '#EFF8FF',
    tag: 'Inclusion',
    date: 'Lundi 20 avril — Journée dédiée',
    titre: 'Journée de l\'Inclusion',
    accroche: 'Label "100% Handinamique"',
    description: 'La SPI Dauphine est labellisée <strong>"Association Étudiante 100% Handinamique"</strong>. La journée de l\'inclusion propose un <strong>tournoi de Cécifoot</strong>, un quizz & dîner avec l\'association Vents Différents, et un cocktail officiel de clôture. Une table ronde a déjà été organisée en amont à Dauphine.',
    chiffre: '100%',
    detail: 'handinamique — label officiel obtenu',
    points: [
      'Tournoi de Cécifoot',
      'Quizz & dîner avec Vents Différents',
      'Table ronde organisée en amont à Dauphine',
      'Cocktail officiel de clôture de journée',
    ],
    image: 'https://images.unsplash.com/photo-1527168027773-0cc890c4f42e?w=800&q=80',
    imageAlt: 'Équipage divers en pleine manœuvre sur un voilier',
  },
  {
    id: 'entrepreneuriat',
    icon: Lightbulb,
    couleur: '#E8A930',
    couleurBg: '#FFFBEB',
    tag: 'Entrepreneuriat',
    date: 'Mercredi 22 avril (19h – 21h)',
    titre: 'Journée de l\'Entrepreneuriat',
    accroche: '5 start-ups prennent la parole',
    description: 'Dans l\'esprit fondateur du <em>binôme</em>, la journée de l\'Entrepreneuriat réunit <strong>5 start-ups innovantes</strong> avec stands et prises de parole. Networking, pitchs et rencontres entre étudiants et entrepreneurs — la Dauphine se connecte au monde pro.',
    chiffre: '5',
    detail: 'start-ups avec stand et prise de parole',
    points: [],
    image: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=800&q=80',
    imageAlt: 'Conférence entrepreneuriat étudiants',
    extra: 'startups',
  },
]

export default function Engagement() {
  return (
    <section id="engagement" className="py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-16">
          <SectionTitle
            eyebrow="Notre engagement"
            title="La SPI"
            titleAccent="s'engage"
            subtitle="Au-delà de la régate, le Challenge SPI Dauphine s'engage concrètement pour des causes qui nous tiennent à cœur : solidarité, environnement, inclusion et entrepreneuriat."
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {engagements.map((item, i) => {
            const Icon = item.icon
            return (
              <motion.article
                key={item.id}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.6, delay: i * 0.1, ease: "easeOut" }}
                className="group rounded-2xl overflow-hidden border border-gray-100 hover:shadow-xl hover:shadow-gray-200/60 transition-all duration-300"
              >
                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.imageAlt}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div
                    className="absolute inset-0"
                    style={{ background: `linear-gradient(to bottom, transparent 30%, ${item.couleur}99)` }}
                  />
                  <div
                    className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-white text-xs font-semibold"
                    style={{ backgroundColor: item.couleur }}
                  >
                    {item.tag}
                  </div>
                  <div
                    className="absolute bottom-3 right-3 w-9 h-9 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: item.couleur }}
                    aria-hidden="true"
                  >
                    <Icon className="w-4 h-4 text-white" />
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 lg:p-6">
                  <div className="flex items-center justify-between mb-1">
                    <p className="text-xs font-medium uppercase tracking-widest" style={{ color: item.couleur }}>
                      {item.accroche}
                    </p>
                    <span className="text-xs text-[#94A3B8] flex-shrink-0">{item.date}</span>
                  </div>
                  <h3
                    className="text-xl font-bold text-[#0B2545] mb-3"
                    style={{ fontFamily: 'var(--font-playfair)' }}
                  >
                    {item.titre}
                  </h3>
                  <p
                    className="text-sm text-[#64748B] leading-relaxed mb-4"
                    dangerouslySetInnerHTML={{ __html: item.description }}
                  />

                  {/* Chiffre clé */}
                  <div
                    className="inline-flex items-baseline gap-2 px-3 py-1.5 rounded-xl mb-4"
                    style={{ backgroundColor: item.couleurBg }}
                  >
                    <span
                      className="text-2xl font-bold"
                      style={{ fontFamily: 'var(--font-playfair)', color: item.couleur }}
                    >
                      {item.chiffre}
                    </span>
                    <span className="text-xs text-[#64748B]">{item.detail}</span>
                  </div>

                  {/* Points */}
                  {item.points.length > 0 && (
                    <ul className="space-y-1.5">
                      {item.points.map(point => (
                        <li key={point} className="flex items-center gap-2 text-sm text-[#64748B]">
                          <span
                            className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                            style={{ backgroundColor: item.couleur }}
                            aria-hidden="true"
                          />
                          {point}
                        </li>
                      ))}
                    </ul>
                  )}

                  {/* Start-ups list for entrepreneuriat */}
                  {item.extra === 'startups' && (
                    <div className="space-y-2 mt-1">
                      {startups.map(s => (
                        <div
                          key={s.nom}
                          className="p-3 rounded-xl"
                          style={{ backgroundColor: '#FFFBEB' }}
                        >
                          <p className="text-xs font-bold text-[#0B2545] mb-0.5">{s.nom}</p>
                          <p className="text-xs text-[#64748B] leading-relaxed">{s.description}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </motion.article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
