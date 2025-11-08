# Finance Tracker - Guide de Démarrage Rapide ⚡

Ce guide vous permet de démarrer en 5 minutes !

## Démarrage Local

### 1. Installation (2 min)

```bash
# Installer les dépendances
npm install
```

### 2. Configuration Supabase (2 min)

1. Créez un compte sur [supabase.com](https://supabase.com)
2. Créez un nouveau projet
3. Dans SQL Editor, exécutez le fichier `supabase/schema.sql`
4. Récupérez votre URL et clé API (Settings > API)

### 3. Variables d'environnement (1 min)

Créez `.env.local` à la racine :

```bash
NEXT_PUBLIC_SUPABASE_URL=votre_url_ici
NEXT_PUBLIC_SUPABASE_ANON_KEY=votre_cle_ici
OPENAI_API_KEY=sk-xxx (optionnel)
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 4. Lancer l'application

```bash
npm run dev
```

Ouvrez [http://localhost:3000](http://localhost:3000) 🎉

## Structure des Dossiers Clés

```
📁 app/
  ├── 📄 page.tsx              → Page d'accueil
  ├── 📁 login/                → Connexion
  ├── 📁 register/             → Inscription
  └── 📁 dashboard/            → Application principale
      ├── 📄 page.tsx          → Dashboard
      ├── 📁 income/           → Gestion revenus
      ├── 📁 expenses/         → Gestion dépenses
      ├── 📁 goals/            → Objectifs épargne
      ├── 📁 debts/            → Gestion dettes
      └── 📁 insights/         → Conseils IA

📁 components/ui/              → Composants réutilisables
📁 lib/supabase/               → Configuration Supabase
📁 types/                      → Types TypeScript
📁 supabase/                   → Schéma base de données
```

## Fonctionnalités Disponibles

### ✅ Authentification
- Inscription avec email/mot de passe
- Connexion sécurisée
- Gestion de session automatique

### ✅ Gestion Financière
- **Revenus** : Ajout, modification, suppression avec catégories
- **Dépenses** : Suivi complet avec 8 catégories par défaut
- **Objectifs** : Définir et suivre vos projets d'épargne
- **Dettes** : Gérer vos emprunts et remboursements

### ✅ Visualisation
- Dashboard avec statistiques en temps réel
- Graphiques de tendances (6 derniers mois)
- Diagrammes circulaires par catégorie
- Calcul automatique du taux d'épargne

### ✅ Intelligence Artificielle
- Génération de conseils personnalisés
- Alertes sur comportements à risque
- Recommandations d'optimisation

## Premiers Pas dans l'Application

### 1. Créer un compte
- Allez sur [http://localhost:3000](http://localhost:3000)
- Cliquez sur "Commencer" ou "Créer un compte"
- Remplissez le formulaire

### 2. Ajouter vos premières données

**Revenus** :
1. Menu "Revenus"
2. Cliquez "Ajouter un revenu"
3. Renseignez montant, date, catégorie
4. Option : Cochez "récurrent" pour salaire mensuel

**Dépenses** :
1. Menu "Dépenses"
2. Cliquez "Ajouter une dépense"
3. Choisissez une catégorie (Alimentation, Transport, etc.)
4. Renseignez le montant et la date

**Objectifs** :
1. Menu "Objectifs"
2. Créez un objectif (ex: "Vacances d'été")
3. Définissez le montant cible et la date
4. Suivez votre progression !

### 3. Générer des conseils IA

1. Menu "Conseils IA"
2. Cliquez sur "Générer des conseils"
3. L'IA analyse vos données et produit des recommandations

**Note** : Nécessite une clé OpenAI. Sans clé, cette fonctionnalité est désactivée.

## Catégories par Défaut

### Dépenses
- 🍔 Alimentation
- 🚗 Transport
- 🏠 Logement
- 💊 Santé
- 🎮 Loisirs
- 🛍️ Shopping
- 📚 Éducation
- 📦 Autres

### Revenus
- Salaire
- Freelance
- Investissements
- Autres

*Vous pouvez créer vos propres catégories directement dans la base de données !*

## Personnalisation

### Changer les couleurs
Modifiez `tailwind.config.ts` :
```typescript
colors: {
  primary: {
    500: '#22c55e', // Votre couleur principale
    600: '#16a34a',
  }
}
```

### Ajouter des catégories par défaut
Modifiez `supabase/schema.sql` dans la fonction `handle_new_user()`.

### Modifier la devise
Dans la table `profiles`, changez la colonne `currency` (défaut: 'EUR').

## Commandes Utiles

```bash
# Développement
npm run dev

# Build de production
npm run build

# Lancer la version production localement
npm start

# Linter
npm run lint
```

## Déploiement en 1 clic

### Vercel (Recommandé)
1. Push votre code sur GitHub
2. Connectez-vous sur [vercel.com](https://vercel.com)
3. Importez votre repo
4. Ajoutez les variables d'environnement
5. Deploy ! ✨

**Détails complets** : Voir [DEPLOYMENT.md](./DEPLOYMENT.md)

## FAQ Rapide

**Q : Puis-je utiliser l'app sans clé OpenAI ?**
R : Oui ! Toutes les fonctionnalités marchent sauf la génération de conseils IA.

**Q : Mes données sont-elles sécurisées ?**
R : Oui ! Grâce au Row Level Security de Supabase, chaque utilisateur ne voit que ses propres données.

**Q : Combien ça coûte ?**
R :
- Supabase : Gratuit jusqu'à 500 MB
- Vercel : Gratuit pour toujours (plan hobby)
- OpenAI : ~0.10$ par génération de conseils

**Q : Puis-je l'utiliser hors ligne ?**
R : Non pour la version web. Oui pour la future version React Native.

**Q : Comment ajouter une langue ?**
R : L'app utilise `date-fns/locale`. Pour changer, modifiez les imports de `fr` vers votre langue.

## Support

**Problèmes courants** :
- ❌ Erreur "Invalid API key" → Vérifiez vos variables d'environnement
- ❌ "Cannot connect to database" → Vérifiez votre URL Supabase
- ❌ Les graphiques ne s'affichent pas → Vérifiez que recharts est installé

**Besoin d'aide ?**
- Consultez [README.md](./README.md) pour plus de détails
- Vérifiez [DEPLOYMENT.md](./DEPLOYMENT.md) pour le déploiement

## Prochaines Étapes

1. ✅ Faites tourner l'app localement
2. 📝 Ajoutez vos données financières
3. 📊 Explorez le dashboard
4. 🚀 Déployez sur Vercel
5. 📱 Attendez la version mobile React Native !

## Version Mobile à venir

La version React Native permettra :
- 📱 App native iOS et Android
- 📷 Scan de reçus (OCR)
- 🔔 Notifications push
- 💾 Mode hors ligne
- 🎨 Widget d'accueil

Restez connecté pour les updates !

---

**Bonne gestion financière ! 💰📈**
