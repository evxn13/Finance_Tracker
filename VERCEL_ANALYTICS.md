# Configuration Vercel Analytics et Speed Insights

## Packages installés

✅ `@vercel/analytics` - Pour suivre les événements et le comportement des utilisateurs
✅ `@vercel/speed-insights` - Pour mesurer les performances de votre site

## Étapes de configuration

### 1. Installer les dépendances

Exécutez dans votre terminal:
```bash
npm install
```

### 2. Activer Analytics sur Vercel

1. Allez sur votre projet Vercel: https://vercel.com/dashboard
2. Sélectionnez votre projet "Finance Tracker"
3. Allez dans **"Analytics"** dans le menu de gauche
4. Cliquez sur **"Enable Analytics"**
5. C'est tout! Les données commenceront à être collectées automatiquement

### 3. Activer Speed Insights sur Vercel

1. Dans votre projet Vercel
2. Allez dans **"Speed Insights"** dans le menu de gauche
3. Cliquez sur **"Enable Speed Insights"**
4. Les métriques de performance seront collectées automatiquement

### 4. Déployer sur Vercel

Une fois les packages installés, déployez votre application:
```bash
git add .
git commit -m "Add Vercel Analytics and Speed Insights"
git push
```

Vercel déploiera automatiquement les changements.

## Fonctionnalités

### Analytics
- **Événements personnalisés**: Suivez les actions des utilisateurs (clics, conversions, etc.)
- **Pages vues**: Nombre de visites par page
- **Démographie**: Pays, navigateurs, appareils
- **Taux de conversion**: Suivez les conversions Premium
- **Temps réel**: Visualisez les visiteurs en temps réel

### Speed Insights
- **Core Web Vitals**: LCP, FID, CLS
- **Performance par page**: Identifiez les pages lentes
- **Métriques par appareil**: Mobile vs Desktop
- **Scores de performance**: Notes globales
- **Recommandations**: Suggestions d'amélioration

## Événements personnalisés (optionnel)

Vous pouvez ajouter des événements personnalisés pour suivre des actions spécifiques:

```typescript
import { track } from '@vercel/analytics';

// Exemple: Suivre quand un utilisateur passe Premium
track('premium_subscription', {
  plan: 'monthly',
  amount: 5
});

// Exemple: Suivre la génération de conseils IA
track('ai_insights_generated', {
  insights_count: 3
});
```

## Visualiser les données

### Analytics
1. Allez sur https://vercel.com/dashboard
2. Sélectionnez votre projet
3. Cliquez sur **"Analytics"**
4. Vous verrez:
   - Trafic en temps réel
   - Pages les plus visitées
   - Sources de trafic
   - Événements personnalisés
   - Taux de rebond

### Speed Insights
1. Dans le même dashboard
2. Cliquez sur **"Speed Insights"**
3. Vous verrez:
   - Score de performance global
   - Core Web Vitals (LCP, FID, CLS)
   - Performance par page
   - Tendances de performance
   - Comparaison mobile/desktop

## Coûts

- **Analytics**:
  - Gratuit jusqu'à 10,000 événements/mois
  - Pro: 100,000 événements/mois
  - Enterprise: Illimité

- **Speed Insights**:
  - Gratuit jusqu'à 100,000 vues/mois
  - Pro: 500,000 vues/mois
  - Enterprise: Illimité

Pour la plupart des applications en démarrage, le plan gratuit est largement suffisant.

## Privacy et GDPR

Les deux outils sont conformes au RGPD:
- ✅ Pas de cookies
- ✅ Données anonymisées
- ✅ Hébergement EU disponible
- ✅ Respect de la vie privée
- ✅ Compatible avec le CookieConsent déjà implémenté

## Prochaines étapes recommandées

1. **Suivre les conversions Premium**
   - Ajoutez un événement `track('premium_signup')` lors de l'achat
   - Mesurez le taux de conversion gratuit → premium

2. **Optimiser les pages lentes**
   - Identifiez les pages avec un mauvais score
   - Optimisez les images, le code, les API calls

3. **A/B Testing**
   - Testez différentes versions de la page pricing
   - Mesurez l'impact sur les conversions

4. **Surveiller les erreurs**
   - Combinez avec un outil comme Sentry
   - Corrélez les erreurs avec les métriques de performance

## Ressources

- Documentation Analytics: https://vercel.com/docs/analytics
- Documentation Speed Insights: https://vercel.com/docs/speed-insights
- Core Web Vitals: https://web.dev/vitals/
