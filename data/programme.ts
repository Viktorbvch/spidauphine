export interface Evenement {
  heure: string
  titre: string
  lieu?: string
  type: 'regate' | 'sport' | 'soiree' | 'engagement' | 'ceremonie' | 'journee' | 'repas' | 'media'
  description?: string
}

export interface JourProgramme {
  jour: string
  date: string
  emoji: string
  theme?: string
  themeColor?: string
  evenements: Evenement[]
}

export const programme: JourProgramme[] = [
  {
    jour: 'Samedi',
    date: '18 avril',
    emoji: '⚓',
    evenements: [
      {
        heure: '12h – 18h',
        titre: 'Arrivée des participants',
        lieu: 'Marina di Imperia',
        type: 'ceremonie',
        description: 'Début des inscriptions, visites de sécurité des bateaux.',
      },
      {
        heure: '18h',
        titre: 'Cérémonie & cocktail d\'ouverture',
        lieu: 'Village SPI',
        type: 'ceremonie',
        description: 'Cocktail d\'ouverture offert par notre partenaire JPA International.',
      },
      {
        heure: '22h – 02h',
        titre: 'Soirée Chapiteau',
        lieu: 'Chapiteau Village SPI',
        type: 'soiree',
      },
    ],
  },
  {
    jour: 'Dimanche',
    date: '19 avril',
    emoji: '⛵',
    evenements: [
      { heure: '10h', titre: 'Petit déjeuner', type: 'repas' },
      {
        heure: '11h',
        titre: 'Réunion des skippers',
        lieu: 'Village SPI',
        type: 'regate',
        description: 'Point FFV avec le comité de course.',
      },
      {
        heure: '13h – 18h',
        titre: 'Prologue + Activités à terre',
        lieu: 'Mer Ligure',
        type: 'regate',
        description: 'Manche de repérage de la régate — première sortie officielle sur l\'eau.',
      },
      { heure: '19h – 21h', titre: 'After sea', type: 'soiree', description: 'À déterminer.' },
      {
        heure: '21h',
        titre: 'Grand Écran — Photos & Journal Télévisé',
        lieu: 'Village SPI',
        type: 'media',
        description: 'Diffusion photos & JT par nos prestataires Dauphinois.',
      },
      { heure: '22h – 02h', titre: 'Soirée Chapiteau', lieu: 'Chapiteau Village SPI', type: 'soiree' },
    ],
  },
  {
    jour: 'Lundi',
    date: '20 avril',
    emoji: '🤝',
    theme: 'Journée de l\'Inclusion',
    themeColor: '#1A6B8C',
    evenements: [
      { heure: '9h', titre: 'Réunion des skippers (Point FFV)', type: 'regate' },
      { heure: '10h', titre: 'Petit déjeuner', type: 'repas' },
      {
        heure: '11h',
        titre: 'Lancement de la régate & Challenge Multisports',
        lieu: 'Mer Ligure / Plage',
        type: 'regate',
      },
      {
        heure: '12h – 17h',
        titre: 'Challenge Multisports : Course Caritative',
        lieu: 'Front de mer d\'Imperia',
        type: 'engagement',
        description: 'Course à pied caritative sur le front de mer au profit de l\'association Vents Différents.',
      },
      {
        heure: '19h – 21h',
        titre: 'Tournoi de Cécifoot + Quizz & dîner Vents Différents',
        lieu: 'Village SPI',
        type: 'engagement',
        description: 'Tournoi de Cécifoot, quizz et dîner avec l\'association Vents Différents. Cocktail officiel de clôture de journée.',
      },
      {
        heure: '21h',
        titre: 'Grand Écran',
        lieu: 'Village SPI',
        type: 'media',
      },
      { heure: '22h – 02h', titre: 'Soirée Chapiteau', type: 'soiree' },
    ],
  },
  {
    jour: 'Mardi',
    date: '21 avril',
    emoji: '🏉',
    evenements: [
      { heure: '9h', titre: 'Réunion des skippers (Point FFV)', type: 'regate' },
      { heure: '10h', titre: 'Petit déjeuner', type: 'repas' },
      {
        heure: '11h',
        titre: 'Lancement de la régate & Challenge Multisports',
        lieu: 'Mer Ligure / Plage',
        type: 'regate',
      },
      {
        heure: '12h – 17h',
        titre: 'Challenge Multisports : Rugby',
        lieu: 'Plage d\'Imperia',
        type: 'sport',
      },
      { heure: '18h', titre: 'After sea', type: 'soiree' },
      {
        heure: '19h – 21h',
        titre: 'Collecte de déchets',
        lieu: 'Littoral & ville d\'Imperia',
        type: 'engagement',
        description: 'Collecte "Port Propre" en partenariat avec la Fondation de la Mer.',
      },
      { heure: '21h', titre: 'Grand Écran', lieu: 'Village SPI', type: 'media' },
      { heure: '22h – 02h', titre: 'Soirée Chapiteau', type: 'soiree' },
    ],
  },
  {
    jour: 'Mercredi',
    date: '22 avril',
    emoji: '🎤',
    theme: 'Journée de l\'Entrepreneuriat',
    themeColor: '#E8A930',
    evenements: [
      { heure: '9h', titre: 'Réunion des skippers (Point FFV)', type: 'regate' },
      { heure: '10h', titre: 'Petit déjeuner', type: 'repas' },
      {
        heure: '11h',
        titre: 'Lancement de la régate & Challenge Multisports : Rugby',
        lieu: 'Mer Ligure / Plage',
        type: 'regate',
      },
      { heure: '18h', titre: 'After sea', type: 'soiree' },
      {
        heure: '19h – 21h',
        titre: 'Interventions Start-ups & animations stands',
        lieu: 'Village SPI',
        type: 'journee',
        description: 'Quadmission, Solly, Ambassia, Sport Mate, Olago — pitchs et networking.',
      },
      { heure: '21h', titre: 'Grand Écran', lieu: 'Village SPI', type: 'media' },
      { heure: '22h – 02h', titre: 'Soirée Chapiteau', type: 'soiree' },
    ],
  },
  {
    jour: 'Jeudi',
    date: '23 avril',
    emoji: '⚽',
    evenements: [
      { heure: '9h', titre: 'Réunion des skippers (Point FFV)', type: 'regate' },
      { heure: '10h', titre: 'Petit déjeuner', type: 'repas' },
      {
        heure: '11h',
        titre: 'Lancement de la régate & Challenge Multisports : Foot',
        lieu: 'Mer Ligure / Plage',
        type: 'regate',
      },
      { heure: '18h', titre: 'After sea', type: 'soiree' },
      {
        heure: '19h – 21h',
        titre: 'Collecte de déchets',
        lieu: 'Littoral & ville d\'Imperia',
        type: 'engagement',
        description: 'Deuxième collecte "Port Propre" avec la Fondation de la Mer.',
      },
      { heure: '21h', titre: 'Grand Écran', lieu: 'Village SPI', type: 'media' },
      { heure: '22h – 02h', titre: 'Soirée Chapiteau', type: 'soiree' },
    ],
  },
  {
    jour: 'Vendredi',
    date: '24 avril',
    emoji: '🏆',
    evenements: [
      { heure: '9h', titre: 'Réunion des skippers (Point FFV)', type: 'regate' },
      { heure: '10h', titre: 'Petit déjeuner', type: 'repas' },
      {
        heure: '11h',
        titre: 'Lancement de la régate & Challenge Multisports : Rugby',
        lieu: 'Mer Ligure / Plage',
        type: 'regate',
      },
      { heure: '18h', titre: 'After sea', type: 'soiree' },
      {
        heure: '19h – 21h',
        titre: 'Cérémonie de remise des prix & Cocktail de clôture',
        lieu: 'Village SPI',
        type: 'ceremonie',
        description: 'Remise des trophées régate (70%) et multisports (30%). Discours de clôture.',
      },
      { heure: '21h', titre: 'Grand Écran', lieu: 'Village SPI', type: 'media' },
      { heure: '22h – 02h', titre: 'Dernière Soirée Chapiteau', type: 'soiree' },
    ],
  },
]
