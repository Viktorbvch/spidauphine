export interface ResultatEdition {
  edition: number
  annee: number
  lieu: string
  vainqueur: string
  universite: string
  participants: number
  bateaux: number
  anecdote?: string
}

export const resultatsPassés: ResultatEdition[] = [
  {
    edition: 44,
    annee: 2025,
    lieu: 'Marines de Cogolin',
    vainqueur: 'SeaTech / ISITV Toulon',
    universite: 'SeaTech — Université de Toulon',
    participants: 900,
    bateaux: 50,
    anecdote: 'Record de participation avec 20 bateaux étrangers (Suisse, Espagne, Italie, Angleterre, Pays-Bas).',
  },
  {
    edition: 43,
    annee: 2024,
    lieu: 'Marines de Cogolin',
    vainqueur: 'Centrale Marseille',
    universite: 'École Centrale de Marseille',
    participants: 700,
    bateaux: 40,
    anecdote: 'Première édition post-COVID avec retour en force des équipes européennes.',
  },
  {
    edition: 42,
    annee: 2023,
    lieu: 'Port Camargue',
    vainqueur: 'SeaTech Toulon',
    universite: 'SeaTech — Université de Toulon',
    participants: 650,
    bateaux: 35,
    anecdote: 'Conditions météo exceptionnelles — force 5 lors de la régate hauturière.',
  },
  {
    edition: 41,
    annee: 2022,
    lieu: 'Marines de Cogolin',
    vainqueur: 'ENSAM Montpellier',
    universite: 'Arts et Métiers ParisTech',
    participants: 580,
    bateaux: 32,
    anecdote: 'Retour du Challenge après la pandémie — ovation pour les organisateurs.',
  },
  {
    edition: 40,
    annee: 2021,
    lieu: 'Marines de Cogolin',
    vainqueur: 'Paris Dauphine PSL',
    universite: 'Université Paris Dauphine-PSL',
    participants: 500,
    bateaux: 28,
    anecdote: 'L\'université fondatrice remporte l\'édition anniversaire des 40 ans.',
  },
  {
    edition: 38,
    annee: 2019,
    lieu: 'Marines de Cogolin',
    vainqueur: 'SeaTech Toulon',
    universite: 'SeaTech — Université de Toulon',
    participants: 750,
    bateaux: 45,
    anecdote: 'SeaTech consolide son titre de grande école dominante de la Spi.',
  },
]
