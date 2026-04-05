export interface Equipe {
  numero: number
  nom: string
  ecole: string
  domain: string | null // utilisé pour logo Clearbit
}

export const equipes: Equipe[] = [
  { numero: 1,  nom: 'NL Maastricht',       ecole: 'Maastricht University',       domain: 'maastrichtuniversity.nl' },
  { numero: 2,  nom: 'CVDO 1 – Yolo',       ecole: 'Paris Dauphine PSL',          domain: 'dauphine.psl.eu' },
  { numero: 3,  nom: 'CVDO 2 – Valhalla',   ecole: 'Paris Dauphine PSL',          domain: 'dauphine.psl.eu' },
  { numero: 4,  nom: 'Défi',                ecole: 'Paris Dauphine PSL',          domain: 'dauphine.psl.eu' },
  { numero: 5,  nom: 'St Andrews',           ecole: 'University of St Andrews',    domain: 'st-andrews.ac.uk' },
  { numero: 6,  nom: 'LST',                  ecole: 'Paris Dauphine PSL',          domain: 'dauphine.psl.eu' },
  { numero: 7,  nom: 'SPI Lausanne',         ecole: 'HEC Lausanne — UNIL',         domain: 'unil.ch' },
  { numero: 8,  nom: 'Sego SPI',             ecole: 'Sciences Po Paris',           domain: 'sciencespo.fr' },
  { numero: 9,  nom: 'SPI Barca',            ecole: 'ESADE Barcelona',             domain: 'esade.edu' },
  { numero: 10, nom: 'SPI Exeter',           ecole: 'University of Exeter',        domain: 'exeter.ac.uk' },
  { numero: 11, nom: 'Atlantis',             ecole: 'Paris Dauphine PSL',          domain: 'dauphine.psl.eu' },
  { numero: 12, nom: 'Bath',                 ecole: 'University of Bath',          domain: 'bath.ac.uk' },
  { numero: 13, nom: 'SPI Rotterdam',        ecole: 'Erasmus University Rotterdam',domain: 'eur.nl' },
  { numero: 14, nom: 'Dinos',               ecole: 'Paris Dauphine PSL',          domain: 'dauphine.psl.eu' },
  { numero: 15, nom: 'Warwick',              ecole: 'University of Warwick',       domain: 'warwick.ac.uk' },
  { numero: 16, nom: 'La Nav',              ecole: 'Paris Dauphine PSL',          domain: 'dauphine.psl.eu' },
  { numero: 17, nom: 'DLS',                  ecole: 'Paris Dauphine PSL',          domain: 'dauphine.psl.eu' },
  { numero: 18, nom: 'Carasail',             ecole: 'ESSEC Business School',       domain: 'essec.edu' },
  { numero: 19, nom: 'AS',                   ecole: 'Paris Dauphine PSL',          domain: 'dauphine.psl.eu' },
  { numero: 20, nom: 'Les Cirés de Purpan',  ecole: 'ESA Purpan',                  domain: 'purpan.fr' },
  { numero: 21, nom: 'Madforspi',            ecole: 'Université Paris Cité',       domain: 'u-paris.fr' },
  { numero: 22, nom: 'SPI Milano',           ecole: 'Università Bocconi',          domain: 'unibocconi.eu' },
  { numero: 23, nom: 'Leiden 1 – Equinox',   ecole: 'Universiteit Leiden',         domain: 'universiteitleiden.nl' },
  { numero: 24, nom: 'Leiden 2 – Musherika', ecole: 'Universiteit Leiden',         domain: 'universiteitleiden.nl' },
  { numero: 25, nom: "IAE Sail' Lille",      ecole: 'IAE Lille',                   domain: 'iae.univ-lille.fr' },
  { numero: 26, nom: 'DDD',                  ecole: 'Paris Dauphine PSL',          domain: 'dauphine.psl.eu' },
  { numero: 27, nom: 'AMD',                  ecole: 'Paris Dauphine PSL',          domain: 'dauphine.psl.eu' },
  { numero: 28, nom: 'DEE',                  ecole: 'Paris Dauphine PSL',          domain: 'dauphine.psl.eu' },
  { numero: 29, nom: 'Albert Crew',          ecole: 'HEC Paris',                   domain: 'hec.edu' },
  { numero: 30, nom: 'SPI Lille',            ecole: 'Université de Lille',         domain: 'univ-lille.fr' },
  { numero: 31, nom: 'Club Voile Junia',     ecole: 'JUNIA',                       domain: 'junia.com' },
  { numero: 32, nom: "Dauph'Vita",           ecole: 'Paris Dauphine PSL',          domain: 'dauphine.psl.eu' },
  { numero: 33, nom: 'ECL',                  ecole: 'Centrale Lille',              domain: 'centralelille.fr' },
  { numero: 34, nom: 'DDD',                  ecole: 'Paris Dauphine PSL',          domain: 'dauphine.psl.eu' },
  { numero: 35, nom: 'SPI St Gallen',        ecole: 'Universität St. Gallen HSG',  domain: 'unisg.ch' },
  { numero: 36, nom: 'DJC Londres',          ecole: 'Paris Dauphine London',       domain: 'dauphine.psl.eu' },
]
