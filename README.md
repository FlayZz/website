# SerruAccess - Plateforme Web Artisanale Premium

Ce projet est la refonte complète et moderne du site web de l'entreprise artisanale SerruAccess, spécialisée dans le domaine de la serrurerie en Bretagne.

## 🚀 Technologies Principales

L'architecture s'appuie sur une stack Next.js robuste et optimale pour le Server-Side Rendering (SSR) et le Static Site Generation (SSG), assurant un SEO local parfait.

- **Framework :** [Next.js 14+ (App Router)](https://nextjs.org/)
- **Langage :** [TypeScript](https://www.typescriptlang.org/)
- **Stylisation :** [Tailwind CSS](https://tailwindcss.com/) avec CSS Variables dynamiques pour les Thèmes.
- **Animations 2D/3D :**
  - [GSAP (ScrollTrigger)](https://gsap.com/) pour les chorégraphies au défilement.
  - [Framer Motion](https://www.framer.com/motion/) pour les interactions asynchrones et UI Components (Carousels, CTA).
- **Cartographie :** [Leaflet / React-Leaflet](https://react-leaflet.js.org/) (Rendu côté client avec `next/dynamic`).
- **Composants UI :** Icônes Heroicons, intégrations d'assets optimisés (`next/image`).

## 📂 Architecture des Dossiers

```
website/
├── public/                # Assets statiques (Images, SVG, Favicon)
├── src/
│   ├── app/               # Next.js App Router (Pages, Layout, Global CSS)
│   │   ├── zones-intervention/      # Page annuaire Dashboard
│   │   ├── serrurier/[dept]/[ville]/# Génération statique (SSG) des villes
│   │   ├── globals.css              # Variables CSS et Thèmes ultra-premium
│   │   └── page.tsx                 # Page d'accueil principale
│   ├── components/        # Composants encapsulés, modulaires et interactifs
│   │   ├── MapZone.tsx       # Carte interactive + directory cards
│   │   ├── FloatingCTA.tsx   # CTA qui devient ancré intelligemment
│   │   ├── Testimonials.tsx  # Slider Framer Motion avec popLayout
│   │   └── FAQ.tsx           # Accordéons structurés
│   └── lib/               # (Si utils variés)
└── ...
```

## ✨ Fonctionnalités Avancées

- **UI "Glassmorphism" Premium** : Utilisation intensive de `#texture-card` via `globals.css` qui crée des cartes à reflets inversés virtuels au survol de la souris. 
- **Géolocalisation & UX** : Intégration d'un système intelligent cherchant "Le serrurier le plus proche" dans le dashboard d'intervention.
- **Landing CTA Intelligent** : Le bouton de contact flottant (24/7) disparaît ou atterrit sagement quand l'utilisateur atteint la zone FAQ de la page afin de ne pas frustrer l'expérience utilisateur.
- **SSG SEO-First** : Génération statique (`generateStaticParams`) de millier de combinaisons `/serrurier/{departement}/{ville}` pour mailler le référencement local efficacement sur les moteurs de recherches.
- **Accessibilité & Dark Mode** : Parfaitement contrasté, prise en charge native du mode sombre OS ou manuel.

## 💻 Démarrage en Environnement de Développement

1. Prérequis : **Node.js 18+**
2. Installer les dépendances :
   ```bash
   npm install
   ```
3. Lancer le serveur local de dev :
   ```bash
   npm run dev
   ```
4. Ouvrir [http://localhost:3000](http://localhost:3000) dans votre navigateur.

## 📦 Compilation & Déploiement

Pour générer une version de production hautement optimisée (pour Vercel, Netlify, ou VPS pur) :

```bash
npm run build
npm run start
```

*Note : Lors du build, Next.js pré-compile tout le CSS Tailwind et rend les pages villes en HTML statique ultra léger.*

## 🛣️ Roadmap / Prochaines Étapes
- Intégration de l'asset vidéo/3D interactif dans le Hero Header.
- Amélioration de l'exploration colorimétrique du site.
- Couplage et traitement natif du formulaire `/devis` avec backend API/Brevo.

---
*Ce projet est orchestré localement via l'Engine OpenClaw par l'intermédiaire de Dev Agent.*
