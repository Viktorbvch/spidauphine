export interface Contact {
  role: string
  nom: string
  tel: string
  email: string
}

export const contactsEquipe: Contact[] = [
  {
    role: 'Présidente',
    nom: 'Pauline Petitdidier',
    tel: '+33 7 69 35 08 11',
    email: 'pauline.petitdidier@spidauphine.com',
  },
  {
    role: 'Responsable Logistique',
    nom: 'Titouan Longuet',
    tel: '+33 7 49 05 58 84',
    email: 'titouan.longuet@spidauphine.com',
  },
  {
    role: 'Responsable Équipages',
    nom: 'Anna Baudin',
    tel: '+33 7 68 00 08 81',
    email: 'anna.baudin@spidauphine.com',
  },
  {
    role: 'Coordinateur Logistique',
    nom: 'Théo Labbe',
    tel: '+33 7 67 30 50 73',
    email: 'theo.labbe@spidauphine.com',
  },
  {
    role: 'Coordinateur Logistique',
    nom: 'Viktor Bach',
    tel: '+33 6 38 02 25 26',
    email: 'viktor.bach@spidauphine.com',
  },
]

export const contactsSpecialises = [
  {
    role: 'Directeur Comité de course',
    nom: 'Marc Morgeneyer',
    tel: '+33 6 98 69 88 49',
    email: '',
  },
  {
    role: 'Responsable Challenge Multisports',
    nom: 'Valentin Lottet',
    tel: '+33 7 84 27 03 65',
    email: '',
  },
]

export const urgences = [
  { label: 'Capitainerie Marina di Imperia', numero: '+39 0183 66061' },
  { label: 'Police municipale Imperia', numero: '+39 0183 701 511' },
  { label: 'Urgence européenne', numero: '112' },
  { label: 'Garde-côtes italiens', numero: '1530' },
  { label: 'Secours médicaux (Italie)', numero: '118' },
]

export const signataires = [
  { prenom: 'Pauline', role: 'Présidente' },
  { prenom: 'Clara', role: 'Trésorière' },
  { prenom: 'Victor', role: 'Vice-Président' },
  { prenom: 'Marc', role: 'Directeur Comité' },
  { prenom: 'Foucault', role: 'Vice-Président' },
]
