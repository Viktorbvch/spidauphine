# Challenge SPI Dauphine — Site Web Officiel 45ème Édition

Site web officiel de la **45ème édition du Challenge SPI Dauphine**, le plus grand événement étudiant du sud de la France. Construit avec Next.js 16, TypeScript, Tailwind CSS v4 et Framer Motion.

## Démarrage rapide

```bash
npm install
npm run dev
```

Ouvrir [http://localhost:3000](http://localhost:3000)

## Stack technique

- **Next.js 16** (App Router)
- **TypeScript**
- **Tailwind CSS v4** (nouvelle API `@import "tailwindcss"`)
- **Framer Motion 12** — animations scroll-triggered + parallax
- **Lucide React** — icônes SVG
- **next/font** — Playfair Display (titres) + Inter (corps)
- **next/image** — images optimisées (Unsplash CDN)

## Structure du projet

```
spi-dauphine/
├── app/
│   ├── globals.css          # Design tokens + styles globaux
│   ├── layout.tsx           # Root layout, fonts, metadata SEO
│   └── page.tsx             # Page principale (assemblage des sections)
├── components/
│   ├── layout/
│   │   ├── Header.tsx       # Navigation fixe, menu hamburger mobile
│   │   └── Footer.tsx       # Footer avec liens, réseaux sociaux, contact
│   ├── sections/
│   │   ├── Hero.tsx         # Hero plein-écran, parallax, countdown
│   │   ├── ChiffresClés.tsx # Bloc chiffres animés au scroll
│   │   ├── Engagement.tsx   # 4 sous-sections engagement
│   │   ├── Regate.tsx       # Format, bateaux, palmarès, galerie lightbox
│   │   ├── Multisports.tsx  # 4 sports avec tabs interactifs
│   │   ├── Programme.tsx    # Timeline interactive jour par jour
│   │   └── Partenaires.tsx  # Grille partenaires + CTA
│   └── ui/
│       ├── CountdownTimer.tsx  # Compte à rebours vers le 18 avril 2026
│       ├── AnimatedNumber.tsx  # Chiffres animés (Intersection Observer)
│       └── SectionTitle.tsx    # Composant titre réutilisable
├── data/
│   ├── chiffres.ts          # Chiffres clés
│   ├── programme.ts         # Programme 18-25 avril 2026
│   ├── partenaires.ts       # Partenaires + niveaux
│   ├── resultats.ts         # Palmarès éditions passées
│   └── sports.ts            # 4 sports + classement
└── public/
    └── logos/               # TODO: Déposer ici les logos SVG partenaires
```

## Personnalisation du contenu

### Date de l'événement

Dans `components/ui/CountdownTimer.tsx` :
```typescript
// TODO: Confirmer la date exacte de la 45ème édition
const EVENT_DATE = new Date('2026-04-18T09:00:00')
```

### Logos partenaires

Les logos sont des placeholders. Pour les remplacer :
1. Déposer les fichiers `.svg` dans `/public/logos/`
2. Dans `components/sections/Partenaires.tsx`, remplacer `<LogoPlaceholder>` par `<Image>`
3. Les chemins attendus sont dans `data/partenaires.ts` (champ `logoUrl`)

### Règlement de la régate

Dans `components/sections/Regate.tsx`, localiser le commentaire `// TODO:` :
remplacer le `<button>` par `<a href="/reglement-45.pdf">` après dépôt du PDF dans `/public/`.

### Programme, partenaires, chiffres

Éditer directement les fichiers dans `/data/` — tout le contenu est centralisé.

### Contact & Réseaux sociaux

Dans `components/layout/Footer.tsx` — confirmer les emails et URLs de réseaux sociaux.

## Identité visuelle

| Élément | Valeur |
|---------|--------|
| Police titres | Playfair Display (serif) |
| Police corps | Inter (sans-serif) |
| Bleu marine | `#0B2545` |
| Bleu océan | `#1A6B8C` |
| Turquoise | `#0BBFBF` |
| Or sable | `#E8A930` |
| Corail | `#E05B40` |

## SEO & Accessibilité

- Métadonnées OpenGraph + Twitter Card dans `app/layout.tsx`
- Alt text sur toutes les images, aria-labels sur boutons icônes
- Navigation clavier complète, focus states visibles
- `prefers-reduced-motion` respecté

## Déploiement

Build statique (SSG) — déployable sur Vercel, Netlify ou tout CDN :
```bash
npm run build
```
