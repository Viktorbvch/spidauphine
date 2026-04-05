import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import Hero from '@/components/sections/Hero'
import ChiffresClés from '@/components/sections/ChiffresClés'
import Imperia from '@/components/sections/Imperia'
import Regate from '@/components/sections/Regate'
import Multisports from '@/components/sections/Multisports'
import GalerieRegate from '@/components/sections/GalerieRegate'
import Link from 'next/link'
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

        {/* ── Bandeau contact discret ── */}
        <div
          style={{
            background: 'rgba(11,37,69,0.55)',
            borderTop: '1px solid rgba(255,255,255,0.06)',
          }}
        >
          <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-5 flex items-center justify-between gap-4">
            <p className="text-white/40 text-sm">
              Une question sur l&apos;événement ?
            </p>
            <Link
              href="/contact"
              className="flex items-center gap-1.5 text-sm font-medium text-white/55 hover:text-white transition-colors duration-200 group flex-shrink-0"
            >
              Contactez-nous
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform duration-200" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
