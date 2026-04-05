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

/* Tag colors — dark theme */
const tagColors: Record<string, { bg: string; text: string; dot: string }> = {
  'Officiel':        { bg: 'rgba(46,125,175,0.18)',  text: '#7EC8E3', dot: '#2E7DAF' },
  'Nautisme':        { bg: 'rgba(11,191,191,0.14)',  text: '#0BBFBF', dot: '#0BBFBF' },
  'Partenaires':     { bg: 'rgba(232,169,48,0.14)',  text: '#E8C66A', dot: '#E8A930' },
  'Institutions':    { bg: 'rgba(224,91,64,0.14)',   text: '#F5956C', dot: '#E05B40' },
  'Presse étudiante':{ bg: 'rgba(124,58,237,0.14)',  text: '#C4B5FD', dot: '#8B5CF6' },
  'Université':      { bg: 'rgba(26,107,140,0.18)',  text: '#7EC8E3', dot: '#1A6B8C' },
}
const defaultTagColor = { bg: 'rgba(255,255,255,0.07)', text: 'rgba(255,255,255,0.5)', dot: 'rgba(255,255,255,0.3)' }

/* ── Article featured (premier, pleine largeur) ──────────────── */
function FeaturedArticle({ article }: { article: Article }) {
  const colors = tagColors[article.tag ?? ''] ?? defaultTagColor
  return (
    <motion.a
      href={article.url}
      target="_blank" rel="noopener noreferrer"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.55 }}
      className="group flex flex-col lg:flex-row gap-0 overflow-hidden rounded-2xl cursor-pointer transition-all duration-300"
      style={{
        background: 'rgba(255,255,255,0.04)',
        border: '1px solid rgba(255,255,255,0.07)',
      }}
      onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(11,191,191,0.28)' }}
      onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.07)' }}
    >
      {/* Accent coloré gauche */}
      <div
        className="w-full lg:w-[3px] flex-shrink-0 lg:h-auto h-[3px]"
        style={{ background: `linear-gradient(to bottom, ${colors.dot}, transparent)` }}
        aria-hidden="true"
      />
      <div className="flex-1 p-7 lg:p-9 flex flex-col lg:flex-row gap-7 items-start">
        {/* Contenu */}
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-5 flex-wrap">
            {article.tag && (
              <span
                className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.18em] px-2.5 py-1 rounded-full"
                style={{ background: colors.bg, color: colors.text }}
              >
                <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: colors.dot }} aria-hidden="true" />
                {article.tag}
              </span>
            )}
            <span className="text-white/30 text-xs">{article.date}</span>
          </div>
          <h3
            className="text-white font-bold mb-4 leading-snug group-hover:text-[#0BBFBF] transition-colors duration-300"
            style={{ fontFamily: 'var(--font-playfair)', fontSize: 'clamp(1.15rem, 2vw, 1.5rem)' }}
          >
            {article.titre}
          </h3>
          <p className="text-white/45 text-sm leading-relaxed max-w-2xl">{article.resume}</p>
        </div>
        {/* Droite : media + lien */}
        <div className="flex lg:flex-col items-center lg:items-end justify-between w-full lg:w-auto gap-4 lg:gap-6 flex-shrink-0 pt-1">
          <span
            className="text-xs font-semibold text-right leading-tight max-w-[140px]"
            style={{ color: colors.text }}
          >
            {article.media}
          </span>
          <div className="flex items-center gap-1.5 text-xs font-medium text-white/30 group-hover:text-[#0BBFBF] transition-colors whitespace-nowrap">
            Lire l&apos;article
            <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
          </div>
        </div>
      </div>
    </motion.a>
  )
}

/* ── Article compact ─────────────────────────────────────────── */
function ArticleCard({ article, index }: { article: Article; index: number }) {
  const colors = tagColors[article.tag ?? ''] ?? defaultTagColor
  return (
    <motion.a
      href={article.url}
      target="_blank" rel="noopener noreferrer"
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45, delay: index * 0.06 }}
      className="group flex flex-col rounded-xl cursor-pointer overflow-hidden transition-all duration-250"
      style={{
        background: 'rgba(255,255,255,0.03)',
        border: '1px solid rgba(255,255,255,0.07)',
      }}
      onMouseEnter={e => {
        (e.currentTarget as HTMLElement).style.borderColor = `${colors.dot}55`
        ;(e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.05)'
      }}
      onMouseLeave={e => {
        (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.07)'
        ;(e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.03)'
      }}
    >
      {/* Barre top couleur */}
      <div
        className="h-[2px] w-full flex-shrink-0"
        style={{ background: `linear-gradient(90deg, ${colors.dot}, ${colors.dot}40)` }}
        aria-hidden="true"
      />
      <div className="p-5 flex flex-col flex-1 gap-3">
        {/* Header */}
        <div className="flex items-start justify-between gap-2">
          <div className="flex flex-col gap-1">
            <span className="text-[10px] font-bold leading-tight" style={{ color: colors.text }}>{article.media}</span>
            <span className="text-[10px] text-white/28">{article.date}</span>
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
        <h3
          className="text-[13px] font-bold text-white leading-snug group-hover:text-[#0BBFBF] transition-colors flex-1 line-clamp-3"
        >
          {article.titre}
        </h3>
        {/* Résumé */}
        <p className="text-[11.5px] text-white/35 leading-relaxed line-clamp-2">
          {article.resume}
        </p>
        {/* Footer */}
        <div
          className="pt-3 flex items-center justify-end"
          style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}
        >
          <span className="text-[10px] font-medium text-white/28 group-hover:text-[#0BBFBF] transition-colors flex items-center gap-1">
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
    <section
      id="presse"
      className="py-20 lg:py-28"
      style={{ background: 'linear-gradient(180deg, #060f1e 0%, #071428 100%)' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Espace presse ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="rounded-3xl p-8 lg:p-10 mb-16"
          style={{
            background: 'linear-gradient(135deg, #0B2545 0%, #071A35 100%)',
            border: '1px solid rgba(255,255,255,0.08)',
            boxShadow: '0 24px 80px rgba(0,0,0,0.35)',
          }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <p className="text-[#0BBFBF] text-[10px] font-bold uppercase tracking-[0.38em] mb-4">Espace presse</p>
              <h2
                className="text-white mb-4 leading-tight"
                style={{
                  fontFamily: 'var(--font-playfair)',
                  fontSize: 'clamp(1.5rem, 3vw, 2.2rem)',
                  fontWeight: 700,
                }}
              >
                Couvrez la <span style={{ color: '#E8A930' }}>45ème édition</span>
              </h2>
              <p className="text-white/60 text-sm leading-relaxed max-w-lg">
                Le <strong className="text-white/90">45ème Challenge SPI Dauphine</strong> réunit plus de{' '}
                <strong className="text-white/90">1 000 étudiants</strong> à la Marina di Imperia du{' '}
                <strong className="text-white/90">18 au 25 avril 2026</strong>. Régate officielle FFVoile,
                challenge multisports, journées thématiques et soirées chapiteau.
              </p>
              <div className="mt-5 grid grid-cols-2 gap-3 text-xs text-white/50 max-w-sm">
                {(
                  [
                    ['Dates', '18 — 25 avril 2026'],
                    ['Lieu', 'Marina di Imperia, Italie'],
                    ['Participants', '~1 000 étudiants européens'],
                    ['Organisateur', 'SPI Dauphine — Paris Dauphine PSL'],
                  ] as [string, string][]
                ).map(([label, value]) => (
                  <div key={label}>
                    <span className="text-white/30">{label} :</span>{' '}
                    <span className="text-white/75 font-medium">{value}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <a
                href="mailto:contact@spidauphine.com?subject=Demande%20d%27accr%C3%A9ditation%20presse%20SPI%20Dauphine%2045"
                className="flex items-center gap-3 rounded-xl px-5 py-3.5 font-semibold text-sm transition-colors duration-200 cursor-pointer"
                style={{ background: '#E8A930', color: '#0B2545' }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = '#d4962a' }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = '#E8A930' }}
              >
                <FileText className="w-4 h-4 flex-shrink-0" aria-hidden="true" />
                Demande d&apos;accréditation presse
              </a>
              <a
                href="mailto:contact@spidauphine.com?subject=Contact%20presse%20SPI%20Dauphine"
                className="flex items-center gap-3 rounded-xl px-5 py-3.5 font-medium text-sm text-white transition-all duration-200 cursor-pointer"
                style={{
                  background: 'rgba(255,255,255,0.07)',
                  border: '1px solid rgba(255,255,255,0.14)',
                }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.12)' }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.07)' }}
              >
                <Mail className="w-4 h-4 flex-shrink-0" aria-hidden="true" />
                Contact presse
              </a>

              {/* Ressources */}
              <div
                className="rounded-xl p-4"
                style={{
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.08)',
                }}
              >
                <p className="text-white/40 text-[10px] uppercase tracking-[0.28em] mb-4 font-semibold">
                  Ressources téléchargeables
                </p>
                <div className="space-y-3">
                  {(
                    [
                      { label: 'Dossier de presse 2026', href: '/assets/dossier-presse-45.pdf', dl: 'Dossier-de-presse-SPI-Dauphine-45.pdf', badge: 'PDF' },
                      { label: 'Kit logos & chartes',    href: '/assets/kit-logos.zip',           dl: 'Kit-logos-SPI-Dauphine-45.zip',            badge: 'ZIP' },
                    ] as { label: string; href: string; dl: string; badge: string }[]
                  ).map(({ label, href, dl, badge }) => (
                    <a
                      key={label}
                      href={href}
                      download={dl}
                      className="flex items-center gap-2.5 text-white/65 text-xs hover:text-white transition-colors cursor-pointer group"
                    >
                      <Download className="w-3 h-3 flex-shrink-0 group-hover:text-[#E8A930]" aria-hidden="true" />
                      <span className="font-medium">{label}</span>
                      <span className="ml-auto text-[10px] text-[#0BBFBF] font-bold uppercase tracking-wide">{badge}</span>
                    </a>
                  ))}
                  <div className="flex items-center gap-2.5 text-white/25 text-xs">
                    <Download className="w-3 h-3 flex-shrink-0" aria-hidden="true" />
                    <span>Photos HD éditions passées</span>
                    <span className="ml-auto text-[10px] text-white/18 font-medium">Bientôt</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* ── Revue de presse ── */}
        <div className="mb-12">
          <SectionTitle
            eyebrow="Ils en parlent"
            title="Revue de"
            titleAccent="presse"
            subtitle="Articles, mentions et couvertures médias depuis la création du Challenge SPI Dauphine."
            light
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

        {/* Contact presse — bas de page */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-14 max-w-lg mx-auto rounded-2xl p-6 flex items-start gap-4"
          style={{
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(255,255,255,0.08)',
          }}
        >
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{ background: 'rgba(11,191,191,0.12)', border: '1px solid rgba(11,191,191,0.22)' }}
          >
            <Mail className="w-5 h-5 text-[#0BBFBF]" aria-hidden="true" />
          </div>
          <div>
            <p className="text-[#0BBFBF] text-[10px] font-semibold uppercase tracking-[0.30em] mb-1">Contact presse</p>
            <p className="text-white font-semibold text-sm mb-0.5">Pauline Petitdidier — Présidente</p>
            <a
              href="mailto:contact@spidauphine.com"
              className="text-white/45 text-sm hover:text-[#0BBFBF] transition-colors cursor-pointer"
            >
              contact@spidauphine.com
            </a>
          </div>
        </motion.div>

      </div>
    </section>
  )
}
