# Événements Analytics Trackés

## Vue d'ensemble

Cette application track automatiquement plusieurs événements clés pour mesurer l'engagement utilisateur et les conversions.

## Événements implémentés

### 🛒 Conversion Premium

#### `premium_checkout_started`
- **Quand**: L'utilisateur clique sur "Passer Premium" sur la page pricing
- **Propriétés**:
  - `plan`: "monthly"
  - `price`: 5
- **Utilité**: Mesurer le taux de conversion du pricing à la checkout

#### `premium_checkout_failed`
- **Quand**: Erreur lors de la création de la session Stripe
- **Propriétés**:
  - `error`: Message d'erreur
- **Utilité**: Identifier les problèmes de paiement

#### `premium_checkout_redirected`
- **Quand**: Redirection réussie vers Stripe Checkout
- **Propriétés**: Aucune
- **Utilité**: Confirmer que l'utilisateur a été envoyé vers Stripe

#### `premium_subscription_success`
- **Quand**: Retour sur /dashboard/subscription?success=true
- **Propriétés**:
  - `plan`: "monthly"
  - `price`: 5
- **Utilité**: Mesurer les conversions réussies

### 🤖 Conseils IA

#### `ai_insights_generate_started`
- **Quand**: L'utilisateur demande la génération de conseils IA
- **Propriétés**: Aucune
- **Utilité**: Mesurer l'engagement avec la fonctionnalité IA

#### `ai_insights_generate_success`
- **Quand**: Les conseils sont générés avec succès
- **Propriétés**:
  - `insights_count`: 3
  - `daily_usage`: Nombre d'utilisations aujourd'hui
- **Utilité**: Mesurer le succès de la génération IA

#### `ai_insights_limit_reached`
- **Quand**: L'utilisateur atteint la limite quotidienne (2/jour)
- **Propriétés**:
  - `daily_limit`: 2
- **Utilité**: Identifier la frustration liée aux limites gratuites

#### `ai_insights_generate_failed`
- **Quand**: Erreur lors de la génération (autre que limite)
- **Propriétés**:
  - `error`: Message d'erreur
- **Utilité**: Détecter les problèmes avec l'API Claude

#### `ai_insights_generate_error`
- **Quand**: Erreur réseau ou exception
- **Propriétés**: Aucune
- **Utilité**: Identifier les problèmes techniques

## Métriques clés à surveiller

### Funnel de conversion Premium

```
Page Pricing → Checkout Started → Checkout Redirected → Subscription Success
```

**Calculs importants:**

1. **Taux de conversion global**:
   ```
   (premium_subscription_success / visiteurs_page_pricing) × 100
   ```

2. **Taux d'abandon au checkout**:
   ```
   ((premium_checkout_started - premium_checkout_redirected) / premium_checkout_started) × 100
   ```

3. **Taux de complétion du paiement**:
   ```
   (premium_subscription_success / premium_checkout_redirected) × 100
   ```

### Engagement IA

1. **Taux d'utilisation des conseils IA** (pour utilisateurs Premium):
   ```
   (ai_insights_generate_started / utilisateurs_premium) × 100
   ```

2. **Taux de succès IA**:
   ```
   (ai_insights_generate_success / ai_insights_generate_started) × 100
   ```

3. **Friction des limites**:
   ```
   ai_insights_limit_reached (nombre absolu)
   ```
   → Indicateur de la demande pour Premium

## Dashboard Analytics recommandé

### 1. Overview (Vue d'ensemble)
- Total de conversions Premium (ce mois)
- Revenus MRR (Monthly Recurring Revenue)
- Utilisateurs actifs quotidiens
- Taux de conversion global

### 2. Funnel de conversion
Graphique en entonnoir:
1. Visites page pricing
2. Checkout démarrés
3. Redirections Stripe
4. Abonnements réussis

### 3. Engagement IA
- Générations IA par jour (graphique temporel)
- Taux de succès vs échecs
- Nombre d'utilisateurs atteignant la limite

### 4. Erreurs et problèmes
- Erreurs de checkout (par type)
- Erreurs de génération IA (par type)
- Pages avec le plus d'erreurs

## Événements supplémentaires à ajouter (futur)

### Authentification
```typescript
track('user_signup', { method: 'email' });
track('user_login', { method: 'email' });
track('user_logout');
```

### Objectifs d'épargne
```typescript
track('goal_created', { is_premium: true });
track('goal_completed', {
  amount: 1000,
  days_to_complete: 30
});
track('goal_upgrade_blocked'); // Non-premium atteint 3 objectifs
```

### Dettes
```typescript
track('debt_added', { amount: 5000 });
track('debt_payment_logged', { amount: 500 });
track('debt_completed');
```

### Revenus/Dépenses
```typescript
track('income_added', {
  amount: 2000,
  category: 'salary'
});
track('expense_added', {
  amount: 50,
  category: 'groceries'
});
```

### Exportation de données (futur)
```typescript
track('data_export_started', {
  format: 'csv',
  is_premium: true
});
track('data_export_completed', { format: 'csv' });
```

## Configuration sur Vercel

1. **Activer Analytics**:
   - Projet Vercel → Analytics → Enable

2. **Créer des graphiques personnalisés**:
   - Events → Sélectionnez un événement
   - Create Chart → Choisissez le type
   - Configurez les filtres et propriétés

3. **Configurer des alertes**:
   - Settings → Notifications
   - Alerte si `premium_checkout_failed` > 5 par heure
   - Alerte si `ai_insights_generate_error` > 10 par jour

## Tests

Pour tester le tracking en local:

```javascript
// Dans la console du navigateur
import { track } from '@vercel/analytics';

// Tester un événement
track('test_event', { test: true });
```

Les événements apparaîtront dans Analytics une fois déployé sur Vercel (pas en développement local).

## Privacy et RGPD

✅ **Conforme RGPD**:
- Aucune donnée personnelle identifiable (PII) n'est trackée
- Pas d'emails, noms, ou adresses dans les événements
- Données anonymisées et agrégées
- Compatible avec le CookieConsent déjà implémenté

⚠️ **À éviter**:
```typescript
// ❌ NE PAS FAIRE
track('user_action', {
  email: 'user@example.com',  // PII!
  name: 'John Doe'             // PII!
});

// ✅ FAIRE
track('user_action', {
  user_tier: 'premium',
  action_type: 'export'
});
```
