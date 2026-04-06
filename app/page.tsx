import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import Hero from '@/components/sections/Hero'
import AfficheSection from '@/components/sections/AfficheSection'
import ChiffresClés from '@/components/sections/ChiffresClés'
import Imperia from '@/components/sections/Imperia'
import Regate from '@/components/sections/Regate'
import Multisports from '@/components/sections/Multisports'
import DiscoverGrid from '@/components/sections/DiscoverGrid'

export default function Home() {
  return (
    <>
      <Header />
      <main>
        {/* Acte 1 — Immersion plein écran */}
        <Hero />

        {/* Acte 2 — L'affiche officielle (3D tilt) */}
        <AfficheSection />

        {/* Acte 3 — Le Challenge en chiffres */}
        <ChiffresClés />

        {/* Acte 4 — Imperia, ville hôte (parallax + galerie) */}
        <Imperia />

        {/* Acte 5 — La Régate (hero + ticker + binôme) */}
        <Regate />

        {/* Acte 6 — Challenge Multisports (tabs + planning) */}
        <Multisports />

        {/* Acte 7 — Découverte : Village · Engagement · Partenaires */}
        <DiscoverGrid />
      </main>
      <Footer />
    </>
  )
}
