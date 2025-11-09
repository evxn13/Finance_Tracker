# 🔧 Fix : Erreur "No such price" Stripe

## ❌ Problème
Erreur : `No such price: 'price_1SRKqB3PrS4AQiE7iOjrb27M'`

## ✅ Solution : Créer un Nouveau Price ID dans Stripe

### Étape 1 : Vérifier le Mode Stripe

1. Allez sur https://dashboard.stripe.com
2. **Vérifiez le mode** en haut à droite :
   - **Mode Production** : Toggle "Test mode" doit être **DÉSACTIVÉ** (gris)
   - **Mode Test** : Toggle "Test mode" doit être **ACTIVÉ** (bleu)

⚠️ **Important** : Vous devez être dans le **MÊME MODE** que votre application en production.

### Étape 2 : Créer un Nouveau Produit et Price ID

1. **Allez dans Products** → **Create product**

2. **Remplissez le formulaire** :
   - **Name** : `Finance Tracker Premium`
   - **Description** : `Accès illimité aux insights IA, rapports PDF et graphiques avancés`
   - **Images** : (optionnel)

3. **Dans la section Pricing** :
   - **Pricing model** : `Standard pricing`
   - **Price** : `5.00`
   - **Currency** : `EUR`
   - **Billing period** : `Monthly` (récurrent)
   - **Recurring** : ✅ Cocher "Recurring"

4. **Cliquez sur "Save product"**

5. **Copiez le Price ID** :
   - Il apparaît juste après la création
   - Format : `price_1XXXXXXXXXXXXX` (commence par `price_`)
   - ⚠️ **Copiez-le immédiatement**, vous en aurez besoin !

### Étape 3 : Vérifier les Clés API

Assurez-vous d'utiliser les **bonnes clés** selon le mode :

**Mode Production** :
- `pk_live_...` (Publishable key)
- `sk_live_...` (Secret key)

**Mode Test** :
- `pk_test_...` (Publishable key)
- `sk_test_...` (Secret key)

### Étape 4 : Mettre à Jour Vercel

1. **Allez sur** https://vercel.com
2. **Sélectionnez votre projet** Finance Tracker
3. **Settings** → **Environment Variables**
4. **Trouvez ou créez** la variable `STRIPE_PRICE_ID`
5. **Mettez à jour la valeur** avec votre nouveau Price ID :
   ```
   price_1XXXXXXXXXXXXX
   ```
6. **Vérifiez l'environnement** :
   - ✅ **Production** (si vous êtes en mode Production)
   - ✅ **Preview** (optionnel)
   - ✅ **Development** (optionnel)

### Étape 5 : Redéployer

1. **Dans Vercel**, allez dans **Deployments**
2. Cliquez sur les **3 points** de la dernière deployment
3. **Redeploy**
4. Décochez **"Use existing Build Cache"**
5. Cliquez sur **Redeploy**

### Étape 6 : Tester

1. Allez sur `https://financetrackers.app/pricing`
2. Cliquez sur **"Passer Premium ✨"**
3. Vous devriez être redirigé vers Stripe Checkout sans erreur

---

## 🔍 Vérifications

### Vérifier que le Price ID Existe

1. Dans Stripe Dashboard → **Products**
2. Cliquez sur votre produit "Finance Tracker Premium"
3. Vérifiez que le Price ID correspond à celui dans Vercel

### Vérifier les Variables d'Environnement

Dans Vercel, vous devez avoir **exactement** :

| Variable | Format | Exemple |
|----------|--------|---------|
| `STRIPE_PRICE_ID` | `price_1...` | `price_1AbCdEfGhIjKlMn` |
| `STRIPE_SECRET_KEY` | `sk_live_...` ou `sk_test_...` | `sk_live_51...` |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | `pk_live_...` ou `pk_test_...` | `pk_live_51...` |

⚠️ **Important** : Toutes les clés doivent être du **même mode** (toutes Production ou toutes Test).

---

## 🆘 Problèmes Courants

### "Price ID n'existe toujours pas"
- Vérifiez que vous êtes dans le bon mode (Test vs Production)
- Vérifiez que le Price ID est bien copié (sans espaces)
- Vérifiez que vous avez bien redéployé après avoir changé la variable

### "Erreur de clé API"
- Vérifiez que `STRIPE_SECRET_KEY` correspond au mode
- Vérifiez que `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` correspond au mode
- Toutes les clés doivent être du même mode

### "Le paiement fonctionne mais l'abonnement ne s'active pas"
- Vérifiez que le webhook est configuré
- Vérifiez que `STRIPE_WEBHOOK_SECRET` est correct
- Vérifiez les logs dans Stripe Dashboard → Webhooks

---

## ✅ Checklist

- [ ] Mode Stripe vérifié (Production ou Test)
- [ ] Nouveau produit créé dans Stripe
- [ ] Price ID copié (commence par `price_1...`)
- [ ] Variable `STRIPE_PRICE_ID` mise à jour dans Vercel
- [ ] Toutes les clés API sont du même mode
- [ ] Site redéployé sur Vercel
- [ ] Test du paiement réussi

---

**Une fois ces étapes terminées, l'erreur devrait disparaître !** 🎉

