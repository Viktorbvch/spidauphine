export interface Sport {
  id: string
  nom: string
  couleur: string
  jours: string
  lieu: string
  description: string
  format: string
  regles: string[]
  imageUrl: string
}

export const sports: Sport[] = [
  {
    id: 'caritative',
    nom: 'Course Caritative',
    couleur: '#9333EA',
    jours: 'Lundi 20 avril',
    lieu: 'Marina di Imperia',
    description: 'Course à pied sur le front de mer d\'Imperia au profit de l\'association Vents Différents. L\'épreuve qui unit compétition et solidarité dans l\'esprit de la Journée de l\'Inclusion.',
    format: 'Course à pied caritative',
    regles: [
      'Course à pied sur le front de mer d\'Imperia',
      'Ouverte à tous les participants',
      'Les fonds reversés à Vents Différents',
      'Dossards fournis par l\'organisation',
      'Ambiance festive et solidaire garantie',
    ],
    imageUrl: '/photos/cm-caritative.jpg',
  },
  {
    id: 'rugby',
    nom: 'Rugby',
    couleur: '#0B2545',
    jours: 'Mardi 21 avril',
    lieu: 'Spiaggia d\'Oro',
    description: 'Le tag rugby s\'impose comme l\'épreuve phare du Challenge Multisports. Intensité, esprit d\'équipe et fair-play sont les maîtres mots sur la plage d\'Imperia.',
    format: 'Tournoi en poules + phase finale',
    regles: [
      'Version sans contact du rugby — pas de plaquages',
      'Pour stopper un adversaire, retirer son tag (bande à la ceinture)',
      'Le joueur taggé s\'arrête, remet son tag et passe le ballon',
      'Les passes se font uniquement vers l\'arrière',
      'Objectif : aplatir le ballon derrière la ligne d\'en-but adverse',
    ],
    imageUrl: '/photos/cm-rugby.jpg',
  },
  {
    id: 'volley',
    nom: 'Beach Volley',
    couleur: '#E05B40',
    jours: 'Mercredi 22 avril',
    lieu: 'Spiaggia d\'Oro',
    description: 'Le beach volley en bord de mer Ligure — les pieds dans le sable, les yeux sur la Méditerranée.',
    format: 'Tournoi beach mixte',
    regles: [
      'Deux équipes s\'affrontent en envoyant le ballon au-dessus du filet',
      'Chaque équipe a droit à 3 touches maximum pour renvoyer la balle',
      'Le ballon ne doit pas toucher le sol dans son propre camp',
      'Alternance entre réception, passe et attaque pour marquer',
      'Auto-arbitrage dans l\'esprit sportsmanship',
    ],
    imageUrl: '/photos/cm-volley.jpg',
  },
  {
    id: 'football',
    nom: 'Football',
    couleur: '#1A8C6B',
    jours: 'Jeudi 23 avril',
    lieu: 'Spiaggia d\'Oro',
    description: 'Le football à 5 sur la plage d\'Imperia. Tournoi ultra-compétitif dans l\'esprit festif du Challenge.',
    format: 'Tournoi 5v5 + finales',
    regles: [
      'Marquer en envoyant le ballon dans le but adverse avec les pieds',
      'Utilisation des mains interdite (sauf le gardien dans sa zone)',
      'Jeu continu — passes, dribbles et tirs',
      'Les fautes donnent des coups francs ou des penalties',
      'Esprit fair-play exigé — contacts excessifs sanctionnés',
    ],
    imageUrl: '/photos/cm-football.jpg',
  },
  {
    id: 'spikeball',
    nom: 'Spikeball',
    couleur: '#E8A930',
    jours: 'Vendredi 24 avril',
    lieu: 'Spiaggia d\'Oro',
    description: 'Le sport révélation du Challenge ! Le Spikeball (roundnet) oppose deux équipes de 2 autour d\'un filet circulaire. Technique, vitesse et réflexes à la plage.',
    format: 'Tournoi en poules mixtes',
    regles: [
      'Frapper une balle sur un filet circulaire au sol pour qu\'elle rebondisse vers l\'adversaire',
      'L\'équipe adverse a jusqu\'à 3 touches pour renvoyer la balle sur le filet',
      'Jeu dynamique à 360° — sans côté fixe, échanges ultra-rapides',
      'Équipes de 2 joueurs (format doubles)',
      'Ouvert à tous niveaux — bonne ambiance obligatoire',
    ],
    imageUrl: '/photos/cm-spikeball.jpg',
  },
]
