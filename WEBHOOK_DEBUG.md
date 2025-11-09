# Débogage du Webhook Stripe

## Problème
Les paiements Stripe fonctionnent mais l'abonnement n'est pas enregistré dans Supabase.

## Cause
Le webhook Stripe n'arrive pas à communiquer avec l'API `/api/stripe/webhook`.

## Vérifications

### 1. Vérifier l'URL du webhook dans Stripe

1. Allez sur https://dashboard.stripe.com/test/webhooks
2. Cliquez sur votre webhook
3. Vérifiez que l'URL est: `https://www.financetrackers.app/api/stripe/webhook`
4. Si ce n'est pas le cas, cliquez sur "..." → Update endpoint → Changez l'URL

### 2. Vérifier les événements

Dans la page du webhook, onglet "Events":
- ✅ Les événements apparaissent avec un statut "Succeeded" → Le webhook fonctionne!
- ❌ Les événements sont en "Failed" (404, 500, etc.) → Il y a un problème

**Erreurs communes:**
- **404**: L'URL du webhook est incorrecte
- **500**: Erreur dans le code du webhook (vérifiez les logs Vercel)
- **Aucun événement**: Le webhook n'est pas configuré pour recevoir les bons événements

### 3. Vérifier les événements écoutés

Le webhook doit écouter ces événements:
- ✅ `checkout.session.completed`
- ✅ `customer.subscription.created`
- ✅ `customer.subscription.updated`
- ✅ `customer.subscription.deleted`
- ✅ `invoice.payment_succeeded`
- ✅ `invoice.payment_failed`

### 4. Vérifier le signing secret

1. Dans Stripe Dashboard → Webhooks → Votre webhook
2. Cliquez sur "Reveal" pour voir le signing secret
3. Comparez avec `STRIPE_WEBHOOK_SECRET` dans Vercel
4. Si différent, mettez à jour dans Vercel → Settings → Environment Variables

### 5. Vérifier les logs Vercel

1. Allez sur https://vercel.com/dashboard
2. Votre projet → Deployments → Latest deployment
3. Cliquez sur "View Function Logs"
4. Cherchez les erreurs dans `/api/stripe/webhook`

**Erreurs communes dans les logs:**
- `Webhook signature verification failed` → Mauvais STRIPE_WEBHOOK_SECRET
- `SUPABASE_SERVICE_ROLE_KEY` not found → Variable d'environnement manquante
- `42P01: relation "subscriptions" does not exist` → Migration SQL pas exécutée

## Solutions

### Solution 1: Recréer le webhook

1. **Supprimer l'ancien webhook** dans Stripe Dashboard
2. **Créer un nouveau webhook**:
   - URL: `https://www.financetrackers.app/api/stripe/webhook`
   - Événements: Les 6 listés ci-dessus
3. **Copier le nouveau signing secret**
4. **Mettre à jour `STRIPE_WEBHOOK_SECRET` sur Vercel**
5. **Redéployer l'application**

### Solution 2: Tester le webhook manuellement

Dans Stripe Dashboard → Webhooks → Votre webhook:
1. Cliquez sur "Send test webhook"
2. Choisissez `checkout.session.completed`
3. Cliquez sur "Send test webhook"
4. Vérifiez si ça crée une entrée dans Supabase → subscriptions

### Solution 3: Vérifier que la migration SQL a été exécutée

Dans Supabase SQL Editor, exécutez:

```sql
-- Vérifier que les tables existent
SELECT table_name
FROM information_schema.tables
WHERE table_schema = 'public'
AND table_name IN ('subscriptions', 'payment_history');

-- Vérifier que la fonction existe
SELECT routine_name
FROM information_schema.routines
WHERE routine_schema = 'public'
AND routine_name = 'update_user_premium_status';

-- Vérifier que le trigger existe
SELECT trigger_name
FROM information_schema.triggers
WHERE trigger_name = 'on_subscription_change';
```

Si une de ces vérifications échoue, réexécutez `supabase/add-subscriptions.sql`.

## Test complet

### Tester le flux de paiement complet:

1. **Effectuer un paiement test** sur votre site
2. **Vérifier dans Stripe** → Events que `checkout.session.completed` apparaît
3. **Vérifier dans Stripe** → Webhooks → Votre webhook → Events que l'événement a été reçu
4. **Vérifier dans Supabase** → Table Editor → subscriptions qu'une ligne a été créée
5. **Vérifier dans Supabase** → profiles que `is_premium` = true
6. **Rafraîchir votre site** → Les fonctionnalités Premium doivent être débloquées

## Commandes utiles

### Vérifier un abonnement dans Supabase

```sql
SELECT
  s.*,
  p.email,
  p.is_premium
FROM subscriptions s
JOIN profiles p ON p.id = s.user_id
WHERE p.email = 'votre-email@example.com';
```

### Forcer la mise à jour du statut Premium

```sql
-- Mettre manuellement is_premium à true
UPDATE profiles
SET is_premium = true
WHERE email = 'votre-email@example.com';
```

### Voir tous les paiements

```sql
SELECT
  ph.*,
  p.email
FROM payment_history ph
JOIN profiles p ON p.id = ph.user_id
ORDER BY ph.created_at DESC;
```

## Si rien ne fonctionne

Contactez le support avec ces informations:
- URL du webhook
- Exemple d'événement qui a échoué (ID de l'événement)
- Logs Vercel de l'erreur
- Version de Stripe SDK utilisée
