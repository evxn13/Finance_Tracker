# Finance Tracker - Application de Gestion Financière

> Version BETA - Application SaaS de gestion financière personnelle avec conseils IA

![Version](https://img.shields.io/badge/version-0.1.0-blue.svg)
![Next.js](https://img.shields.io/badge/Next.js-14.1.0-black)
![License](https://img.shields.io/badge/license-MIT-green.svg)

Une application web moderne et sécurisée pour suivre et améliorer votre situation financière, avec des conseils personnalisés générés par Claude AI (Anthropic).

## ✨ Fonctionnalités

### Version Gratuite
- ✅ Suivi illimité des revenus et dépenses
- ✅ Gestion des dettes avec calcul d'intérêts
- ✅ Tableaux de bord visuels avec graphiques (Recharts)
- ✅ Catégories personnalisables
- ✅ **Maximum 3 objectifs d'épargne**
- ✅ Statistiques et analyses de base

### Version Premium 👑 (5€/mois)
- 💎 **Conseils IA personnalisés** par Claude (Anthropic)
- 💎 **Objectifs d'épargne illimités**
- 💎 Support prioritaire
- 💎 Export de données (à venir)
- 💎 Badge Premium
- 💎 Historique des paiements complet

### Fonctionnalités techniques
- 🔐 Authentification sécurisée (Supabase Auth)
- 💳 Paiements Stripe en mode récurrent
- 🤖 Intégration IA Claude 3 Haiku
- 📊 **Vercel Analytics** - Suivi des événements utilisateur
- ⚡ **Vercel Speed Insights** - Métriques de performance
- 🍪 Gestion du consentement cookies (RGPD)
- 🔒 Row Level Security (RLS)
- 🎨 Interface responsive et moderne
- 🏷️ Bannière BETA

## Stack Technologique

### Frontend
- **Next.js 14** : Framework React avec App Router
- **TypeScript** : Typage statique pour plus de sécurité
- **Tailwind CSS** : Styling moderne et responsive
- **Recharts** : Bibliothèque de graphiques React
- **Lucide React** : Icônes modernes

### Backend
- **Supabase** : BaaS (Backend as a Service)
  - PostgreSQL : Base de données relationnelle
  - Auth : Authentification et gestion des utilisateurs
  - Row Level Security : Sécurité au niveau des lignes

### IA & Paiements
- **Anthropic Claude 3 Haiku** : Génération de conseils personnalisés
- **Stripe** : Gestion des paiements et abonnements

### Déploiement & Monitoring
- **Vercel** : Hébergement et déploiement continu
- **Vercel Analytics** : Suivi des conversions et événements
- **Vercel Speed Insights** : Core Web Vitals et performance

## Installation et Configuration

### Prérequis
- Node.js 18+ et npm
- Compte Supabase (gratuit)
- Clé API OpenAI (optionnel pour les conseils IA)

### 1. Cloner le projet
```bash
git clone <votre-repo>
cd finance-tracker
```

### 2. Installer les dépendances
```bash
npm install
```

### 3. Configuration Supabase

#### Créer un projet Supabase
1. Allez sur [supabase.com](https://supabase.com)
2. Créez un nouveau projet
3. Notez votre URL et votre clé anonyme

#### Configurer la base de données
1. Dans le dashboard Supabase, allez dans SQL Editor
2. Copiez le contenu de `supabase/schema.sql`
3. Exécutez le script SQL

Cela créera :
- Toutes les tables nécessaires
- Les politiques RLS pour la sécurité
- Les fonctions et triggers
- Les catégories par défaut

### 4. Variables d'environnement

Créez un fichier `.env.local` à la racine du projet :

```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=votre_url_supabase
NEXT_PUBLIC_SUPABASE_ANON_KEY=votre_cle_anonyme_supabase

# OpenAI (optionnel - pour les conseils IA)
OPENAI_API_KEY=votre_cle_api_openai

# App
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 5. Lancer l'application en développement

```bash
npm run dev
```

Ouvrez [http://localhost:3000](http://localhost:3000) dans votre navigateur.

## Déploiement sur Vercel

### Option 1 : Via l'interface Vercel

1. Créez un compte sur [vercel.com](https://vercel.com)
2. Cliquez sur "New Project"
3. Importez votre repository Git
4. Configurez les variables d'environnement :
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `OPENAI_API_KEY`
   - `NEXT_PUBLIC_APP_URL` (sera généré automatiquement)
5. Déployez !

### Option 2 : Via CLI Vercel

```bash
# Installer Vercel CLI
npm i -g vercel

# Se connecter
vercel login

# Déployer
vercel

# Pour la production
vercel --prod
```

## Structure du Projet

```
finance-tracker/
├── app/                          # App Router Next.js
│   ├── api/                      # API Routes
│   │   └── ai/                   # Endpoints IA
│   ├── dashboard/                # Pages du dashboard
│   │   ├── expenses/            # Gestion des dépenses
│   │   ├── income/              # Gestion des revenus
│   │   ├── goals/               # Objectifs d'épargne
│   │   ├── debts/               # Gestion des dettes
│   │   └── insights/            # Conseils IA
│   ├── login/                    # Page de connexion
│   ├── register/                 # Page d'inscription
│   ├── layout.tsx               # Layout racine
│   ├── page.tsx                 # Page d'accueil
│   └── globals.css              # Styles globaux
│
├── components/                   # Composants réutilisables
│   └── ui/                      # Composants UI
│       ├── Button.tsx
│       ├── Input.tsx
│       ├── Card.tsx
│       ├── Modal.tsx
│       └── Select.tsx
│
├── lib/                         # Utilitaires
│   └── supabase/               # Configuration Supabase
│       ├── client.ts           # Client Supabase (client-side)
│       └── server.ts           # Client Supabase (server-side)
│
├── types/                       # Types TypeScript
│   ├── database.ts             # Types de la base de données
│   └── index.ts                # Types généraux
│
├── supabase/                    # Configuration Supabase
│   └── schema.sql              # Schéma de la base de données
│
├── public/                      # Fichiers statiques
├── package.json                 # Dépendances
├── tsconfig.json               # Configuration TypeScript
├── tailwind.config.ts          # Configuration Tailwind
├── next.config.js              # Configuration Next.js
└── README.md                    # Documentation
```

## Base de Données

### Tables principales

- **profiles** : Profils utilisateurs (extension de auth.users)
- **income_categories** : Catégories de revenus
- **expense_categories** : Catégories de dépenses
- **incomes** : Revenus enregistrés
- **expenses** : Dépenses enregistrées
- **debts** : Dettes et emprunts
- **savings_goals** : Objectifs d'épargne
- **ai_insights** : Conseils générés par IA
- **budgets** : Budgets par catégorie

### Sécurité (RLS)

Toutes les tables ont des politiques Row Level Security qui garantissent :
- Les utilisateurs ne peuvent voir que leurs propres données
- Les utilisateurs ne peuvent modifier que leurs propres données
- Les données sont automatiquement filtrées au niveau de la base de données

## Fonctionnalités futures

### Pour la version mobile (React Native)
- Notification push pour les échéances
- Scan de reçus avec OCR
- Mode hors ligne avec synchronisation
- Widget pour l'écran d'accueil

### Améliorations web
- Import/Export de données (CSV, Excel)
- Rapports PDF personnalisables
- Partage de budget familial
- Intégrations bancaires (via API)
- Prévisions basées sur l'historique
- Alertes email/SMS personnalisables

## Conseils pour la production

### Sécurité
- Activez la vérification email dans Supabase
- Configurez les limites de taux (rate limiting)
- Activez le CAPTCHA pour l'inscription
- Utilisez des variables d'environnement sécurisées

### Performance
- Activez le cache Next.js
- Optimisez les images
- Utilisez la pagination pour les listes longues
- Implémentez le lazy loading

### Monitoring
- Configurez Vercel Analytics
- Activez Supabase Database Insights
- Surveillez les coûts OpenAI API

## Support et Contribution

Pour signaler un bug ou demander une fonctionnalité, créez une issue sur GitHub.

## Licence

MIT License - voir le fichier LICENSE pour plus de détails.

## Auteur

Développé avec Next.js, Supabase et OpenAI.

---

**Note importante** : N'oubliez pas de remplacer les clés d'API de démonstration par vos propres clés en production !
