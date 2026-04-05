'use client'

import { motion } from 'framer-motion'
import { ExternalLink, Download, Mail, FileText } from 'lucide-react'
import SectionTitle from '@/components/ui/SectionTitle'

interface Article {
  titre: string
  media: string
  date: string
  resume: string
  url: string
  tag?: string
}

const articles: Article[] = [
  {
    titre: '44ème Challenge SPI Dauphine',
    media: 'Ministère de la Mer',
    date: 'Avril 2025',
    resume: 'Le ministère de la Transition écologique met en avant la régate étudiante qui réunit 700 étudiants à Cogolin pour une semaine d\'inclusion et de sensibilisation aux enjeux marins.',
    url: 'https://www.mer.gouv.fr/mer-en-commun/44eme-challenge-spi-dauphine',
    tag: 'Officiel',
  },
  {
    titre: 'Challenge SPI Dauphine — Le plus grand événement étudiant du sud de la France',
    media: 'Course au Large',
    date: 'Avril 2025',
    resume: 'Plus de 900 étudiants issus de 40 grandes écoles se retrouvent pour la 44e édition. L\'événement allie compétition nautique, challenge multisports et networking avec des entreprises partenaires.',
    url: 'https://www.courseaularge.com/challenge-spi-dauphine-le-plus-grand-evenement-etudiant-du-sud-de-la-france.html',
    tag: 'Nautisme',
  },
  {
    titre: 'JPA Group sponsor du Challenge SPI Dauphine 2024',
    media: 'JPA Paris',
    date: 'Mai 2024',
    resume: 'JPA Group, cabinet d\'expertise comptable, relate son engagement aux côtés de la 43e édition du Challenge SPI Dauphine à Portbou. Huit membres de l\'équipe ont rencontré plus de 650 étudiants.',
    url: 'https://www.jpa.fr/actualite/jpa-group-sponsor-challenge-spi-dauphine-2024',
    tag: 'Partenaires',
  },
  {
    titre: 'Le 42e Challenge SPI Dauphine se déroulera à Menton',
    media: 'Ville de Menton',
    date: 'Avril 2023',
    resume: 'La mairie de Menton annonce l\'accueil de la 42e édition du Challenge SPI Dauphine. Plus de 700 étudiants et 40 bateaux sont attendus pour des régates organisées dans les eaux méntonaises.',
    url: 'https://www.menton.fr/Le-42e-Challenge-Spi-Dauphine-se-deroulera-a-Menton.html',
    tag: 'Institutions',
  },
  {
    titre: 'Le Challenge Spi Dauphine is back !',
    media: 'Monde des Grandes Écoles',
    date: 'Octobre 2021',
    resume: 'Après deux années de report dues au Covid, le Challenge SPI Dauphine célèbre sa 40e édition. Retour sur 40 ans d\'histoire nautique étudiante, de Dauphine à la mer Méditerranée.',
    url: 'https://www.mondedesgrandesecoles.fr/challenge-spi-dauphine-2022/',
    tag: 'Presse étudiante',
  },
  {
    titre: '40ème Challenge SPI Dauphine',
    media: 'Université Paris Dauphine — PSL',
    date: 'Avril 2022',
    resume: 'Publication officielle de l\'université pour le retour de l\'événement emblématique après trois années d\'interruption. Retour sur les valeurs du challenge — voile, sport et engagement.',
    url: 'https://dauphine.psl.eu/dauphine/media-et-communication/article/40eme-challenge-spi-dauphine',
    tag: 'Université',
  },
  {
    titre: '600 étudiants pour le 30ème Challenge SPI Dauphine',
    media: 'Sea Bleue',
    date: 'Avril 2011',
    resume: 'Retour sur la 30e édition avec 40 bateaux et 600 étudiants. La régate itinérante sur trois ports méditerranéens s\'est imposée comme le plus grand rassemblement nautique du sud de la France.',
    url: 'https://www.seableue.fr/600-etudiants-pour-le-30eme-challenge-spi-dauphine/',
    tag: 'Nautisme',
  },
]

const tagColors: Record<string, { bg: string; text: string; dot: string }> = {
  'Officiel':        { bg: '#EFF8FF', text: '#1A6B8C', dot: '#1A6B8C' },
  'Nautisme':        { bg: '#F0FDF9', text: '#0B8C6B', dot: '#0B8C6B' },
  'Partenaires':     { bg: '#FFFBEB', text: '#B45309', dot: '#B45309' },
  'Institutions':    { bg: '#FFF1EF', text: '#E05B40', dot: '#E05B40' },
  'Presse étudiante':{ bg: '#F5F3FF', text: '#7C3AED', dot: '#7C3AED' },
  'Université':      { bg: '#F0F9FF', text: '#0369A1', dot: '#0369A1' },
}

/* ── Article featured (premier) ─────────────────────────────── */
function FeaturedArticle({ article }: { article: Article }) {
  const colors = tagColors[article.tag ?? ''] ?? { bg: '#F1F5F9', text: '#64748B', dot: '#94A3B8' }
  return (
    <motion.a
      href={article.url}
      target="_blank" rel="noopener noreferrer"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.55 }}
      className="group flex flex-col lg:flex-row gap-0 overflow-hidden rounded-2xl border border-gray-100 hover:border-[#1A6B8C]/25 transition-all duration-300 cursor-pointer bg-white hover:shadow-lg"
    >
      {/* Accent coloré gauche */}
      <div
        className="w-full lg:w-1.5 flex-shrink-0 lg:h-auto h-1.5"
        style={{ background: `linear-gradient(to bottom, ${colors.dot}, transparent)` }}
        aria-hidden="true"
      />
      <div className="flex-1 p-7 lg:p-9 flex flex-col lg:flex-row gap-7 items-start">
        {/* Contenu */}
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-4 flex-wrap">
            {article.tag && (
              <span
                className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.18em] px-2.5 py-1 rounded-full"
                style={{ background: colors.bg, color: colors.text }}
              >
                <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: colors.dot }} aria-hidden="true" />
                {article.tag}
              </span>
            )}
            <span className="text-[#94A3B8] text-xs">{article.date}</span>
          </div>
          <h3
            className="text-[#0B2545] font-bold mb-3 leading-snug group-hover:text-[#1A6B8C] transition-colors"
            style={{ fontFamily: 'var(--font-playfair)', fontSize: 'clamp(1.15rem, 2vw, 1.45rem)' }}
          >
            {article.titre}
          </h3>
          <p className="text-[#64748B] text-sm leading-relaxed">{article.resume}</p>
        </div>
        {/* Droite : media + lien */}
        <div className="flex lg:flex-col items-center lg:items-end justify-between w-full lg:w-auto gap-4 lg:gap-6 flex-shrink-0 pt-1">
          <span className="text-xs font-semibold text-[#1A6B8C] text-right leading-tight max-w-[140px]">{article.media}</span>
          <div className="flex items-center gap-1.5 text-xs font-medium text-[#94A3B8] group-hover:text-[#1A6B8C] transition-colors whitespace-nowrap">
            Lire l'article
            <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
          </div>
        </div>
      </div>
    </motion.a>
  )
}

/* ── Article compact ─────────────────────────────────────────── */
function ArticleCard({ article, index }: { article: Article; index: number }) {
  const colors = tagColors[article.tag ?? ''] ?? { bg: '#F1F5F9', text: '#64748B', dot: '#94A3B8' }
  return (
    <motion.a
      href={article.url}
      target="_blank" rel="noopener noreferrer"
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45, delay: index * 0.06 }}
      className="group flex flex-col bg-white rounded-xl border border-gray-100/80 hover:border-[#1A6B8C]/20 hover:shadow-md transition-all duration-250 cursor-pointer overflow-hidden"
    >
      {/* Barre top couleur */}
      <div className="h-[3px] w-full flex-shrink-0 transition-all duration-300"
        style={{ background: colors.dot, opacity: 0.35 }}
        aria-hidden="true"
      />
      <div className="p-5 flex flex-col flex-1 gap-3">
        {/* Header */}
        <div className="flex items-start justify-between gap-2">
          <div className="flex flex-col gap-1">
            <span className="text-[10px] font-bold text-[#1A6B8C] leading-tight">{article.media}</span>
            <span className="text-[10px] text-[#94A3B8]">{article.date}</span>
          </div>
          {article.tag && (
            <span
              className="flex-shrink-0 text-[9px] font-bold uppercase tracking-[0.15em] px-2 py-0.5 rounded-full"
              style={{ background: colors.bg, color: colors.text }}
            >
              {article.tag}
            </span>
          )}
        </div>
        {/* Titre */}
        <h3 className="text-[13px] font-bold text-[#0B2545] leading-snug group-hover:text-[#1A6B8C] transition-colors flex-1 line-clamp-3">
          {article.titre}
        </h3>
        {/* Résumé */}
        <p className="text-[11.5px] text-[#94A3B8] leading-relaxed line-clamp-2">
          {article.resume}
        </p>
        {/* Footer */}
        <div className="pt-3 border-t border-gray-50 flex items-center justify-end">
          <span className="text-[10px] font-medium text-[#94A3B8] group-hover:text-[#1A6B8C] transition-colors flex items-center gap-1">
            Lire <ExternalLink className="w-2.5 h-2.5" />
          </span>
        </div>
      </div>
    </motion.a>
  )
}

/* ── Section principale ─────────────────────────────────────── */
export default function Presse() {
  return (
    <section id="presse" className="py-20 lg:py-28 bg-[#F8FAFC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Espace presse ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="bg-[#0B2545] rounded-3xl p-8 lg:p-10 mb-16"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <p className="text-[#0BBFBF] text-xs font-semibold uppercase tracking-[0.25em] mb-3">Espace presse</p>
              <h2 className="text-white mb-4 leading-tight" style={{ fontFamily: 'var(--font-playfair)', fontSize: 'clamp(1.5rem, 3vw, 2.2rem)', fontWeight: 700 }}>
                Couvrez la <span style={{ color: '#E8A930' }}>45ème édition</span>
              </h2>
              <p className="text-white/65 text-sm leading-relaxed max-w-lg">
                Le <strong className="text-white/90">45ème Challenge SPI Dauphine</strong> réunit plus de <strong className="text-white/90">1 000 étudiants</strong> à la Marina di Imperia du <strong className="text-white/90">18 au 25 avril 2026</strong>. Régate officielle FFVoile, challenge multisports, journées thématiques et soirées chapiteau.
              </p>
              <div className="mt-4 grid grid-cols-2 gap-3 text-xs text-white/60 max-w-sm">
                {[
                  ['Dates', '18 — 25 avril 2026'],
                  ['Lieu', 'Marina di Imperia, Italie'],
                  ['Participants', '~1 000 étudiants européens'],
                  ['Organisateur', 'SPI Dauphine — Paris Dauphine PSL'],
                ].map(([label, value]) => (
                  <div key={label}>
                    <span className="text-white/40">{label} :</span>{' '}
                    <span className="text-white/80 font-medium">{value}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <a
                href="mailto:pauline.petitdidier@spidauphine.com?subject=Demande%20d%27accr%C3%A9ditation%20presse%20SPI%20Dauphine%2045"
                className="flex items-center gap-3 bg-[#E8A930] hover:bg-[#D4962A] text-[#0B2545] rounded-xl px-5 py-3.5 font-semibold text-sm transition-colors duration-200 cursor-pointer"
              >
                <FileText className="w-4 h-4 flex-shrink-0" aria-hidden="true" />
                Demande d&apos;accréditation presse
              </a>
              <a
                href="mailto:pauline.petitdidier@spidauphine.com?subject=Contact%20presse%20SPI%20Dauphine"
                className="flex items-center gap-3 bg-white/10 hover:bg-white/15 border border-white/15 text-white rounded-xl px-5 py-3.5 font-medium text-sm transition-colors duration-200 cursor-pointer"
              >
                <Mail className="w-4 h-4 flex-shrink-0" aria-hidden="true" />
                Contact presse
              </a>

              {/* Ressources */}
              <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                <p className="text-white/50 text-xs uppercase tracking-widest mb-3">Ressources téléchargeables</p>
                <div className="space-y-2.5">
                  <a
                    href="/assets/dossier-presse-45.pdf"
                    download="Dossier-de-presse-SPI-Dauphine-45.pdf"
                    className="flex items-center gap-2.5 text-white text-xs hover:text-[#E8A930] transition-colors cursor-pointer group"
                  >
                    <Download className="w-3 h-3 flex-shrink-0 group-hover:text-[#E8A930]" aria-hidden="true" />
                    <span className="font-medium">Dossier de presse 2026</span>
                    <span className="ml-auto text-[10px] text-[#0BBFBF] font-bold uppercase tracking-wide">PDF</span>
                  </a>
                  <a
                    href="/assets/kit-logos.zip"
                    download="Kit-logos-SPI-Dauphine-45.zip"
                    className="flex items-center gap-2.5 text-white text-xs hover:text-[#E8A930] transition-colors cursor-pointer group"
                  >
                    <Download className="w-3 h-3 flex-shrink-0 group-hover:text-[#E8A930]" aria-hidden="true" />
                    <span className="font-medium">Kit logos & chartes</span>
                    <span className="ml-auto text-[10px] text-[#0BBFBF] font-bold uppercase tracking-wide">ZIP</span>
                  </a>
                  <div className="flex items-center gap-2.5 text-white/35 text-xs">
                    <Download className="w-3 h-3 flex-shrink-0" aria-hidden="true" />
                    <span>Photos HD éditions passées</span>
                    <span className="ml-auto text-[10px] text-white/20 font-medium">Bientôt</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* ── Revue de presse ── */}
        <div className="mb-10">
          <SectionTitle
            eyebrow="Ils en parlent"
            title="Revue de"
            titleAccent="presse"
            subtitle="Articles, mentions et couvertures médias depuis la création du Challenge SPI Dauphine."
          />
        </div>

        {/* Article featured */}
        <div className="mb-5">
          <FeaturedArticle article={articles[0]} />
        </div>

        {/* Grille compacte */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {articles.slice(1).map((article, i) => (
            <ArticleCard key={article.url} article={article} index={i} />
          ))}
        </div>

        {/* Contact presse */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-14 max-w-lg mx-auto bg-white rounded-2xl border border-gray-100 p-6 flex items-start gap-4 shadow-sm"
        >
          <div className="w-10 h-10 rounded-xl bg-[#EFF8FF] flex items-center justify-center flex-shrink-0">
            <Mail className="w-5 h-5 text-[#1A6B8C]" aria-hidden="true" />
          </div>
          <div>
            <p className="text-[#1A6B8C] text-xs font-semibold uppercase tracking-widest mb-1">Contact presse</p>
            <p className="text-[#0B2545] font-semibold mb-0.5">Pauline Petitdidier — Présidente</p>
            <a href="mailto:pauline.petitdidier@spidauphine.com" className="text-[#64748B] text-sm hover:text-[#1A6B8C] transition-colors cursor-pointer">
              pauline.petitdidier@spidauphine.com
            </a>
            <br />
            <a href="tel:+33769350811" className="text-[#64748B] text-sm hover:text-[#1A6B8C] transition-colors cursor-pointer">
              +33 7 69 35 08 11
            </a>
          </div>
        </motion.div>

      </div>
    </section>
  )
}
