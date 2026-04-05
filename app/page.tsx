import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import Hero from '@/components/sections/Hero'
import ChiffresClés from '@/components/sections/ChiffresClés'
import Imperia from '@/components/sections/Imperia'
import Regate from '@/components/sections/Regate'
import Multisports from '@/components/sections/Multisports'
import GalerieRegate from '@/components/sections/GalerieRegate'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <ChiffresClés />
        <Imperia />
        <Regate />
        <Multisports />
        {/* <GalerieRegate /> */}

        {/* ── Découverte — 3 destinations ── */}
        <section
          aria-label="Explorer le Challenge SPI Dauphine"
          style={{ background: '#060f1e', borderTop: '1px solid rgba(255,255,255,0.06)' }}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">

            <p
              className="text-[10px] font-bold uppercase tracking-[0.45em] mb-12"
              style={{ color: 'rgba(11,191,191,0.65)' }}
            >
              Explorer
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 lg:gap-6">
              {(
                [
                  {
                    href: '/village',
                    photo: '/photos/spi-soiree-chapiteau.jpg',
                    title: 'Le Village',
                    subtitle: 'Vie du village · Journée type · Soirées',
                  },
                  {
                    href: '/engagement',
                    photo: '/photos/aftersea.jpg',
                    title: "SPI s'engage",
                    subtitle: 'Histoire · Valeurs · Engagements RSE',
                  },
                  {
                    href: '/partenaires',
                    photo: '/photos/spi-01.jpg',
                    title: 'Partenaires',
                    subtitle: 'Sponsoring · Visibilité · Offres',
                  },
                ] as { href: string; photo: string; title: string; subtitle: string }[]
              ).map((card) => (
                <Link
                  key={card.href}
                  href={card.href}
                  className="group relative overflow-hidden rounded-2xl block"
                  style={{ aspectRatio: '4 / 5' }}
                >
                  <Image
                    src={card.photo}
                    alt={card.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, 33vw"
                  />
                  <div
                    className="absolute inset-0"
                    style={{
                      background:
                        'linear-gradient(to top, rgba(7,26,53,0.92) 0%, rgba(7,26,53,0.25) 50%, transparent 100%)',
                    }}
                    aria-hidden="true"
                  />
                  <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-7">
                    <p
                      className="font-semibold uppercase mb-2"
                      style={{ color: '#E8A930', fontSize: 10, letterSpacing: '0.22em' }}
                    >
                      {card.subtitle}
                    </p>
                    <div className="flex items-center justify-between">
                      <h3
                        className="text-white text-xl font-bold"
                        style={{ fontFamily: 'var(--font-playfair)' }}
                      >
                        {card.title}
                      </h3>
                      <ArrowRight
                        className="w-4 h-4 text-white/35 group-hover:text-white group-hover:translate-x-1 transition-all duration-300 flex-shrink-0"
                        aria-hidden="true"
                      />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
