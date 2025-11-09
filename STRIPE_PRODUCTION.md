# 🔴 Passage Stripe en PRODUCTION - Guide Rapide

## ⚡ Actions à faire MAINTENANT

### 1. Sur le Dashboard Stripe (https://dashboard.stripe.com)

#### A. Passer en mode Production
- Cliquer sur le toggle **"Test mode"** en haut à droite → le désactiver

#### B. Récupérer les clés API Production
1. **Aller dans Developers → API keys**
2. **Copier ces 2 clés** :
   ```
   Publishable key: pk_live_51...
   Secret key:      sk_live_51... (cliquer "Reveal")
   ```

#### C. Créer le produit Premium (5€/mois)
1. **Aller dans Products → Create product**
2. **Remplir** :
   - Name: `Finance Tracker Premium`
   - Description: `Accès illimité aux insights IA, rapports PDF et graphiques avancés`
3. **Pricing** :
   - Type: `Recurring`
   - Price: `5.00 EUR`
   - Billing period: `Monthly`
4. **Create product**
5. **Copier le Price ID** : `price_1...` (dans la section Pricing)

#### D. Créer le Webhook
1. **Aller dans Developers → Webhooks**
2. **Add endpoint**
3. **Endpoint URL** : `https://votre-domaine.vercel.app/api/stripe/webhook`
   - ⚠️ Remplacer `votre-domaine` par votre vrai domaine Vercel
4. **Events to send** (cocher ces 6 événements) :
   - ✅ `checkout.session.completed`
   - ✅ `customer.subscription.created`
   - ✅ `customer.subscription.updated`
   - ✅ `customer.subscription.deleted`
   - ✅ `invoice.payment_succeeded`
   - ✅ `invoice.payment_failed`
5. **Add endpoint**
6. **Copier le Signing secret** : `whsec_1...`

---

### 2. Sur Vercel (https://vercel.com)

#### A. Ajouter les variables d'environnement
1. **Aller dans votre projet** → **Settings** → **Environment Variables**
2. **Ajouter ces 4 nouvelles variables pour Production** :

| Variable Name | Value | Environment | Type |
|--------------|-------|-------------|------|
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | `pk_live_51...` | Production | Plain Text |
| `STRIPE_SECRET_KEY` | `sk_live_51...` | Production | **Secret** 🔒 |
| `STRIPE_WEBHOOK_SECRET` | `whsec_1...` | Production | **Secret** 🔒 |
| `STRIPE_PRICE_ID` | `price_1...` | Production | Plain Text |

**IMPORTANT** :
- ✅ Sélectionner **UNIQUEMENT** "Production" (pas Preview ni Development)
- ✅ Les variables `STRIPE_SECRET_KEY` et `STRIPE_WEBHOOK_SECRET` doivent être en mode **Secret**
- ✅ Mettre vos VRAIES valeurs (celles copiées à l'étape 1)

#### B. Mettre à jour NEXT_PUBLIC_APP_URL
1. **Modifier la variable** `NEXT_PUBLIC_APP_URL`
2. **Nouvelle valeur** : `https://votre-domaine.vercel.app`
   - ⚠️ Remplacer par votre VRAI domaine Vercel

#### C. Redéployer
1. **Aller dans Deployments**
2. **Cliquer sur les 3 points** de la dernière deployment → **Redeploy**
3. **Décocher** "Use existing Build Cache"
4. **Redeploy**

---

## ✅ Test Final

### 1. Tester le paiement

```
1. Aller sur https://votre-domaine.vercel.app/pricing
2. Cliquer sur "Passer Premium ✨"
3. Utiliser une VRAIE carte bancaire (plus de cartes de test en production)
4. Compléter le paiement
5. Vérifier la redirection vers /dashboard
6. Vérifier que le statut Premium est activé
```

### 2. Vérifier le webhook

```
1. Aller sur Stripe Dashboard → Developers → Webhooks
2. Cliquer sur votre endpoint
3. Onglet "Recent events"
4. Vérifier que l'événement checkout.session.completed apparaît
5. Vérifier le statut : ✅ Succeeded (code 200)
```

### 3. Annuler l'abonnement test

```
1. Aller sur Stripe Dashboard → Customers
2. Trouver votre client test
3. Annuler l'abonnement
```

---

## 🔐 Sécurité

### ⚠️ NE JAMAIS partager ces clés :
- ❌ `sk_live_...` (Secret Key)
- ❌ `whsec_...` (Webhook Secret)

### ✅ Variables qui PEUVENT être publiques :
- ✅ `pk_live_...` (Publishable Key)
- ✅ `price_...` (Price ID)

---

## 📋 Checklist Finale

- [ ] Mode Production activé sur Stripe
- [ ] Clés API Production copiées
- [ ] Produit Premium créé (5€/mois)
- [ ] Price ID copié
- [ ] Webhook créé avec la bonne URL
- [ ] Webhook Secret copié
- [ ] 4 variables ajoutées sur Vercel (Production uniquement)
- [ ] NEXT_PUBLIC_APP_URL mis à jour
- [ ] Application redéployée
- [ ] Test de paiement réussi
- [ ] Webhook reçu (code 200)
- [ ] Statut Premium vérifié

---

## 🆘 Problèmes courants

### Le webhook ne fonctionne pas (erreur 500)
```bash
# Vérifier que STRIPE_WEBHOOK_SECRET est correct
# Sur Vercel → Settings → Environment Variables
# Doit être whsec_... (PAS wh_...)
```

### "Price not found"
```bash
# Vérifier que STRIPE_PRICE_ID est correct
# Doit être price_... (en mode Production, pas Test)
```

### "Invalid API key"
```bash
# Vérifier que STRIPE_SECRET_KEY commence par sk_live_
# PAS sk_test_ (mode Test)
```

---

## 📞 Support

- **Stripe** : https://support.stripe.com
- **Vercel** : https://vercel.com/support
- **Documentation complète** : Voir `DEPLOYMENT_GUIDE.md`
