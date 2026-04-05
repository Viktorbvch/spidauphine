export interface Partenaire {
  nom: string
  niveau: 'institutionnel-nautique' | 'academique' | 'principal' | 'media-tech' | 'securite'
  description?: string
  logoUrl: string
  siteUrl?: string
}

export const partenaires: Partenaire[] = [
  // Institutionnels & nautiques
  { nom: 'Marina di Imperia', niveau: 'institutionnel-nautique', description: 'Port hôte de la 45ème édition, côte ligure italienne.', logoUrl: '/logos/marina-imperia.svg' },
  { nom: 'Città di Imperia', niveau: 'institutionnel-nautique', description: 'Commune hôte et partenaire institutionnel de la 45ème édition.', logoUrl: '/logos/citta-imperia.svg' },
  { nom: 'Ineja', niveau: 'institutionnel-nautique', logoUrl: '/logos/ineja.svg' },
  { nom: 'Yacht Club Imperia', niveau: 'institutionnel-nautique', description: 'Sous l\'égide du YC Imperia pour la régate officielle.', logoUrl: '/logos/yc-imperia.svg' },
  { nom: 'FIV', niveau: 'institutionnel-nautique', description: 'Federazione Italiana Vela — fédération italienne de voile.', logoUrl: '/logos/fiv.svg' },
  { nom: 'FFVoile', niveau: 'institutionnel-nautique', description: 'Fédération Française de Voile — régate sous son égide.', logoUrl: '/logos/ffvoile.svg' },
  { nom: 'Fondation de la Mer', niveau: 'institutionnel-nautique', description: 'Partenaire environnemental — collectes "Port Propre" mardi et jeudi.', logoUrl: '/logos/fondation-mer.svg', siteUrl: 'https://www.fondationdelamer.org' },
  { nom: 'Geste pour la Mer', niveau: 'institutionnel-nautique', logoUrl: '/logos/geste-mer.svg' },
  { nom: 'FFTW', niveau: 'institutionnel-nautique', logoUrl: '/logos/fftw.svg' },

  // Académiques & associatifs
  { nom: 'Dauphine PSL', niveau: 'academique', description: 'Université fondatrice du Challenge SPI depuis 1981.', logoUrl: '/logos/dauphine-psl.svg', siteUrl: 'https://dauphine.psl.eu' },
  { nom: 'CVEC', niveau: 'academique', logoUrl: '/logos/cvec.svg' },

  // Partenaires principaux
  { nom: 'JPA International', niveau: 'principal', description: 'Partenaire historique du Challenge — offre le cocktail d\'ouverture.', logoUrl: '/logos/jpa-international.svg', siteUrl: 'https://www.jpa.fr' },
  { nom: 'Deliveroo', niveau: 'principal', logoUrl: '/logos/deliveroo.svg', siteUrl: 'https://deliveroo.fr' },
  { nom: 'Nautistore', niveau: 'principal', description: 'Partenaire nautique officiel.', logoUrl: '/logos/nautistore.svg' },
  { nom: "L'épaulette de Classe", niveau: 'principal', logoUrl: '/logos/epaulette-classe.svg' },
  { nom: 'BAP', niveau: 'principal', logoUrl: '/logos/bap.svg' },
  { nom: 'VandB Groupe', niveau: 'principal', logoUrl: '/logos/vandb.svg' },

  // Médias & tech
  { nom: 'Red Bull', niveau: 'media-tech', logoUrl: '/logos/redbull.svg', siteUrl: 'https://www.redbull.com' },
  { nom: 'CRCustom.fr', niveau: 'media-tech', logoUrl: '/logos/crcustom.svg' },
  { nom: 'Sumeria', niveau: 'media-tech', logoUrl: '/logos/sumeria.svg' },
  { nom: 'En Voiture Simone', niveau: 'media-tech', logoUrl: '/logos/en-voiture-simone.svg' },
  { nom: "Martinpêch'", niveau: 'media-tech', logoUrl: '/logos/martinpech.svg' },
  { nom: 'Solly', niveau: 'media-tech', description: 'Facilite les dons aux personnes sans-abri via paiement sans contact.', logoUrl: '/logos/solly.svg' },
  { nom: 'Ambassia', niveau: 'media-tech', description: 'Plateforme mettant en relation marques et étudiants ambassadeurs.', logoUrl: '/logos/ambassia.svg' },
  { nom: 'Sport Mate', niveau: 'media-tech', description: 'Application connectant passionnés de sport pour trouver des partenaires.', logoUrl: '/logos/sportmate.svg' },
  { nom: 'Quadmission', niveau: 'media-tech', description: 'Accompagne les étudiants pour intégrer le master de leur choix.', logoUrl: '/logos/quadmission.svg' },
  { nom: 'Olago', niveau: 'media-tech', description: 'Application de mobilité urbaine pour piétons avec itinéraires sûrs.', logoUrl: '/logos/olago.svg' },

  // Sécurité
  {
    nom: 'SafeHub',
    niveau: 'securite',
    description: 'Application accompagnant l\'inscription et la sécurité sur le village. Chaque participant dispose d\'un compte personnel et d\'un billet QR code regroupant toutes ses informations. Permet de signaler tout incident en quelques secondes. Présent sur le village du 18 au 20 avril.',
    logoUrl: '/logos/safehub.svg',
  },
]

export const niveauxPartenariat = [
  {
    niveau: 'institutionnel-nautique' as const,
    label: 'Institutionnel & Nautique',
    couleur: '#0B2545',
  },
  {
    niveau: 'academique' as const,
    label: 'Académique & Associatif',
    couleur: '#1A6B8C',
  },
  {
    niveau: 'principal' as const,
    label: 'Partenaire Principal',
    couleur: '#E8A930',
  },
  {
    niveau: 'media-tech' as const,
    label: 'Média & Tech',
    couleur: '#E05B40',
  },
  {
    niveau: 'securite' as const,
    label: 'Partenaire Sécurité',
    couleur: '#1A8C6B',
  },
]
