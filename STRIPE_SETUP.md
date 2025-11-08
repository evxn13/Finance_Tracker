# Configuration Stripe et Premium

## Étape 1: Configuration de Stripe

1. **Créer un compte Stripe** (si pas déjà fait)
   - Allez sur https://stripe.com
   - Créez un compte ou connectez-vous

2. **Obtenir les clés API**
   - Allez dans Developers > API Keys
   - Copiez la "Publishable key" et la "Secret key"
   - **Mode Test**: Utilisez les clés de test pour développer
   - **Mode Production**: Activez votre compte et utilisez les clés en production

3. **Créer un produit et un prix**
   - Allez dans Products > Add Product
   - Nom: "Premium Monthly"
   - Prix: 5.00 EUR
   - Type: Récurrent / Mensuel
   - Copiez l'ID du prix (commence par `price_...`)

4. **Configurer le webhook**
   - Allez dans Developers > Webhooks
   - Cliquez sur "Add endpoint"
   - URL: `https://votre-domaine.com/api/stripe/webhook`
   - Événements à écouter:
     - `checkout.session.completed`
     - `customer.subscription.created`
     - `customer.subscription.updated`
     - `customer.subscription.deleted`
     - `invoice.payment_succeeded`
     - `invoice.payment_failed`
   - Copiez le "Signing secret" (commence par `whsec_...`)

## Étape 2: Configuration des variables d'environnement

Mettez à jour votre fichier `.env.local` avec vos vraies clés:

```env
# Stripe
STRIPE_SECRET_KEY=sk_test_...  # Remplacez par votre clé secrète
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...  # Remplacez par votre clé publique
STRIPE_WEBHOOK_SECRET=whsec_...  # Remplacez par votre webhook secret
STRIPE_PRICE_ID=price_...  # Remplacez par l'ID de votre prix
```

## Étape 3: Configuration Supabase

1. **Obtenir la clé Service Role**
   - Allez dans votre projet Supabase
   - Settings > API
   - Copiez la "service_role" key (attention: ne jamais exposer côté client!)

2. **Mettre à jour .env.local**
```env
SUPABASE_SERVICE_ROLE_KEY=eyJhbG...  # Remplacez par votre service role key
```

3. **Exécuter les migrations SQL**
   - Allez dans SQL Editor sur Supabase
   - Exécutez le fichier `supabase/add-subscriptions.sql`
   - Vérifiez qu'il n'y a pas d'erreurs

## Étape 4: Déploiement sur Vercel

1. **Ajouter les variables d'environnement**
   - Allez dans votre projet Vercel
   - Settings > Environment Variables
   - Ajoutez TOUTES les variables (y compris les nouvelles Stripe)

2. **Variables à ajouter sur Vercel:**
   ```
   NEXT_PUBLIC_SUPABASE_URL
   NEXT_PUBLIC_SUPABASE_ANON_KEY
   SUPABASE_SERVICE_ROLE_KEY
   ANTHROPIC_API_KEY
   STRIPE_SECRET_KEY
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
   STRIPE_WEBHOOK_SECRET
   STRIPE_PRICE_ID
   NEXT_PUBLIC_APP_URL
   ```

3. **Redéployer** après avoir ajouté les variables

## Étape 5: Installer les dépendances

Exécutez dans le terminal:
```bash
npm install
```

Cela installera le package Stripe nouvellement ajouté.

## Étape 6: Tester en local

1. **Démarrer le serveur de développement**
```bash
npm run dev
```

2. **Tester l'inscription Premium**
   - Allez sur http://localhost:3000/pricing
   - Cliquez sur "Passer Premium"
   - Utilisez une carte de test Stripe:
     - Numéro: 4242 4242 4242 4242
     - Date: N'importe quelle date future
     - CVC: N'importe quel 3 chiffres

3. **Vérifier que ça fonctionne**
   - Après paiement, vérifiez dans Supabase que:
     - La table `subscriptions` contient votre abonnement
     - Le champ `is_premium` dans `profiles` est à `true`
   - Vérifiez que vous avez accès aux fonctionnalités Premium:
     - Conseils IA (page complète débloquée)
     - Objectifs illimités

## Fonctionnalités Premium implémentées

### Pour les utilisateurs gratuits:
- ❌ Pas d'accès aux conseils IA
- ✅ Maximum 3 objectifs d'épargne
- ✅ Toutes les autres fonctionnalités de base

### Pour les utilisateurs Premium (5€/mois):
- ✅ Conseils IA personnalisés illimités
- ✅ Objectifs d'épargne illimités
- ✅ Badge Premium sur le dashboard
- ✅ Support prioritaire (à implémenter)
- ✅ Export de données (à implémenter)

## Pages ajoutées

1. **`/pricing`** - Page de tarification avec comparaison gratuit vs premium
2. **`/dashboard/subscription`** - Gestion de l'abonnement et historique des paiements

## APIs ajoutées

1. **`POST /api/stripe/create-checkout-session`** - Crée une session de paiement Stripe
2. **`POST /api/stripe/webhook`** - Reçoit les événements de Stripe (webhooks)

## Sécurité

- ✅ Les conseils IA sont protégés (vérification côté serveur dans l'API)
- ✅ Les objectifs sont limités à 3 pour les utilisateurs gratuits
- ✅ Les webhooks Stripe sont sécurisés avec signature verification
- ✅ Service role key utilisée uniquement côté serveur (jamais exposée au client)
- ✅ RLS (Row Level Security) activé sur toutes les nouvelles tables

## Prochaines étapes (optionnel)

1. **Portail client Stripe** - Permettre aux utilisateurs de gérer leur abonnement
2. **Emails transactionnels** - Confirmer les paiements par email
3. **Support prioritaire** - Système de tickets pour utilisateurs premium
4. **Export de données** - Permettre le téléchargement des données en CSV/PDF
5. **Période d'essai** - Offrir 7 jours gratuits de Premium

## Dépannage

### Webhook ne fonctionne pas
- Vérifiez que l'URL du webhook est correcte
- Vérifiez que le STRIPE_WEBHOOK_SECRET est correct
- En local, utilisez Stripe CLI: `stripe listen --forward-to localhost:3000/api/stripe/webhook`

### Premium status ne se met pas à jour
- Vérifiez que la fonction `update_user_premium_status()` existe dans Supabase
- Vérifiez que le trigger `on_subscription_change` est actif
- Exécutez manuellement: `SELECT is_user_premium('user-uuid-here');`

### Paiement réussi mais pas d'abonnement
- Vérifiez les logs du webhook dans Stripe Dashboard
- Vérifiez que la SUPABASE_SERVICE_ROLE_KEY est correcte
- Vérifiez les logs de Vercel/serveur pour voir les erreurs
