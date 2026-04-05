'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ChevronLeft, ChevronRight, Play } from 'lucide-react'

const galeriePhotos = [
  { src: '/photos/spi-09.jpg', alt: 'Flotte de voiliers avec voiles noires en régate, montagnes en arrière-plan', wide: true },
  { src: '/photos/spi-04.jpg', alt: 'Voilier avec grand spinnaker rouge déployé en mer Méditerranée' },
  { src: '/photos/spi-10.jpg', alt: 'Voilier rouge SPI Dauphine #24 avec équipage sur le pont' },
  { src: '/photos/spi-03.jpg', alt: 'Flotte de voiliers en régate sur mer calme — voiles bleues, noires et violettes', wide: true },
  { src: '/photos/spi-05.jpg', alt: 'Trois voiliers racing en file sur mer bleue' },
  { src: '/photos/spi-07.jpg', alt: 'Bateaux au départ — flotte colorée avec voilier rouge #34546' },
  { src: '/photos/spi-02.jpg', alt: 'Équipage célébrant sur voilier rouge près de la côte rocheuse' },
  { src: '/photos/spi-08.jpg', alt: 'Voiliers en compétition sur mer Méditerranée' },
]

export default function GalerieRegate() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

  const openLightbox = (i: number) => setLightboxIndex(i)
  const closeLightbox = () => setLightboxIndex(null)
  const prevPhoto = () => setLightboxIndex(i => (i !== null ? (i - 1 + galeriePhotos.length) % galeriePhotos.length : 0))
  const nextPhoto = () => setLightboxIndex(i => (i !== null ? (i + 1) % galeriePhotos.length : 0))

  return (
    <section className="bg-white py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="flex items-baseline justify-between mb-10">
          <div>
            <p className="text-[#0BBFBF] text-[10px] font-semibold uppercase tracking-[0.25em] mb-2">En images</p>
            <h2 className="text-2xl font-bold text-[#0B2545]" style={{ fontFamily: 'var(--font-playfair)' }}>
              Galerie photo
            </h2>
          </div>
          <span className="text-sm text-[#94A3B8]">{galeriePhotos.length} clichés</span>
        </div>

        {/* Grille éditoriale 12 colonnes */}
        <div className="grid grid-cols-12 gap-3 auto-rows-[200px]">
          {galeriePhotos.map((photo, i) => {
            const colSpan = photo.wide ? 'col-span-12 md:col-span-8' : 'col-span-6 md:col-span-4'
            const rowSpan = photo.wide ? 'row-span-2' : 'row-span-1'
            return (
              <motion.button
                key={photo.src}
                initial={{ opacity: 0, scale: 0.97 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.04 }}
                onClick={() => openLightbox(i)}
                className={`relative rounded-xl overflow-hidden cursor-pointer group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1A6B8C] ${colSpan} ${rowSpan}`}
                aria-label={`Ouvrir la photo : ${photo.alt}`}
              >
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  className="object-cover group-hover:scale-[1.04] transition-transform duration-700 ease-out"
                  sizes="(max-width: 768px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-[#0B2545]/0 group-hover:bg-[#0B2545]/20 transition-colors duration-300" />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center">
                    <Play className="w-4 h-4 text-white fill-white" aria-hidden="true" />
                  </div>
                </div>
              </motion.button>
            )
          })}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 bg-black/92 flex items-center justify-center p-4"
            onClick={closeLightbox} role="dialog" aria-modal="true" aria-label="Galerie photo agrandie"
          >
            <motion.div
              initial={{ scale: 0.93 }} animate={{ scale: 1 }} exit={{ scale: 0.93 }} transition={{ duration: 0.2 }}
              className="relative max-w-5xl w-full" onClick={e => e.stopPropagation()}
            >
              <div className="relative w-full" style={{ aspectRatio: '16/10' }}>
                <Image src={galeriePhotos[lightboxIndex].src} alt={galeriePhotos[lightboxIndex].alt} fill className="object-contain rounded-xl" sizes="90vw" />
              </div>
              <p className="absolute bottom-0 left-0 right-0 text-center text-white/60 text-xs p-3 rounded-b-xl bg-black/40">
                {galeriePhotos[lightboxIndex].alt} — {lightboxIndex + 1}/{galeriePhotos.length}
              </p>
            </motion.div>
            <button onClick={e => { e.stopPropagation(); closeLightbox() }} className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors cursor-pointer" aria-label="Fermer"><X className="w-5 h-5" /></button>
            <button onClick={e => { e.stopPropagation(); prevPhoto() }} className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors cursor-pointer" aria-label="Photo précédente"><ChevronLeft className="w-5 h-5" /></button>
            <button onClick={e => { e.stopPropagation(); nextPhoto() }} className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors cursor-pointer" aria-label="Photo suivante"><ChevronRight className="w-5 h-5" /></button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
