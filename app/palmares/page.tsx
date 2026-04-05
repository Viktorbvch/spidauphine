import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { resultatsPassés } from '@/data/resultats'
import { Trophy, Calendar, MapPin, Users, Sailboat } from 'lucide-react'
import PageBanner from '@/components/ui/PageBanner'

export const metadata = {
  title: 'Anciennes éditions — Challenge SPI Dauphine',
  description: 'Palmarès complet et historique des vainqueurs du Challenge SPI Dauphine depuis 1981.',
}

export default function PalmaresPage() {
  return (
    <>
      <Header />
      <main className="bg-[#F8FAFC] min-h-screen pt-16">
        <PageBanner
          eyebrow="Depuis 1981 — 44 éditions"
          title="Palmarès des"
          titleAccent="anciennes éditions"
          subtitle="Depuis la première édition en 1981 imaginée par des étudiants de Paris Dauphine, le Challenge SPI est devenu la plus grande régate universitaire du sud de la France."
          photo="/photos/spi-07.jpg"
          photoAlt="Flotte de voiliers au départ de la régate SPI Dauphine"
        />

        <section className="py-16 lg:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

            {/* Tableau palmarès */}
            <div className="overflow-x-auto scrollbar-hide -mx-4 px-4 mb-16">
              <table className="w-full min-w-3xl bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm text-sm">
                <thead>
                  <tr className="bg-[#0B2545] text-white">
                    {[
                      { label: 'Édition', Icon: Trophy },
                      { label: 'Année', Icon: Calendar },
                      { label: 'Lieu', Icon: MapPin },
                      { label: 'Vainqueur', Icon: null },
                      { label: 'Université', Icon: null },
                      { label: 'Participants', Icon: Users },
                      { label: 'Bateaux', Icon: Sailboat },
                    ].map(({ label, Icon }) => (
                      <th key={label} className="text-left px-5 py-3.5 text-xs font-semibold uppercase tracking-wide">
                        <span className="flex items-center gap-2">
                          {Icon && <Icon className="w-3.5 h-3.5 opacity-60" aria-hidden="true" />}
                          {label}
                        </span>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {resultatsPassés.map((r, i) => (
                    <tr
                      key={r.edition}
                      className={`border-t border-gray-100 transition-colors hover:bg-blue-50/40 ${
                        i % 2 === 0 ? 'bg-white' : 'bg-[#F8FAFC]'
                      }`}
                    >
                      <td className="px-5 py-4">
                        <span className="inline-flex items-center gap-1.5 font-bold text-[#0B2545]">
                          <Trophy className="w-3.5 h-3.5 text-[#E8A930]" aria-hidden="true" />
                          {r.edition}ème
                        </span>
                      </td>
                      <td className="px-5 py-4 text-[#64748B] font-medium">{r.annee}</td>
                      <td className="px-5 py-4 text-[#64748B]">{r.lieu}</td>
                      <td className="px-5 py-4 font-semibold text-[#0B2545]">{r.vainqueur}</td>
                      <td className="px-5 py-4 text-[#64748B] text-xs">{r.universite}</td>
                      <td className="px-5 py-4 text-[#64748B]">{r.participants.toLocaleString('fr-FR')}+</td>
                      <td className="px-5 py-4 text-[#64748B]">{r.bateaux}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Anecdotes */}
            <div>
              <h2
                className="text-[#0B2545] mb-8"
                style={{ fontFamily: 'var(--font-playfair)', fontSize: '1.5rem', fontWeight: 700 }}
              >
                Moments marquants
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {resultatsPassés.filter(r => r.anecdote).map(r => (
                  <div
                    key={r.edition}
                    className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-baseline gap-2 mb-3">
                      <span
                        className="text-2xl font-bold text-[#E8A930]"
                        style={{ fontFamily: 'var(--font-playfair)' }}
                      >
                        {r.edition}ème
                      </span>
                      <span className="text-sm text-[#94A3B8]">{r.annee}</span>
                    </div>
                    <p className="text-xs font-semibold text-[#0B2545] mb-2">{r.vainqueur}</p>
                    <p className="text-sm text-[#64748B] leading-relaxed">{r.anecdote}</p>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
