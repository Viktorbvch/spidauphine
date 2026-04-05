import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import Presse from '@/components/sections/Presse'
import PageBanner from '@/components/ui/PageBanner'

export const metadata = {
  title: 'Espace Presse — Challenge SPI Dauphine 45',
  description: 'Revue de presse, accréditations médias et contact presse pour le Challenge SPI Dauphine 45ème édition.',
}

export default function PressePage() {
  return (
    <>
      <Header />
      <main className="pt-16">
        <PageBanner
          eyebrow="Challenge SPI Dauphine — 45ème édition"
          title="Espace"
          titleAccent="Presse"
          subtitle="Revue de presse, accréditations médias et contact presse pour la 45ème édition du Challenge SPI Dauphine à Marina di Imperia."
          photo="/photos/spi-09.jpg"
          photoAlt="Flotte de voiliers Challenge SPI Dauphine en régate"
        />
        <Presse />
      </main>
      <Footer />
    </>
  )
}
