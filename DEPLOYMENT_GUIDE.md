# 🚀 Guide de déploiement en production

## Passage Stripe en production

### 1️⃣ Récupérer les clés Stripe de production

1. **Aller sur le dashboard Stripe** : https://dashboard.stripe.com
2. **Passer en mode Production** (toggle en haut à droite)
3. **Aller dans Developers → API keys**
   - Copier la `Publishable key` : `pk_live_...`
   - Copier la `Secret key` : `sk_live_...` (cliquer sur "Reveal test key")

### 2️⃣ Créer le Price ID pour Premium (5€/mois)

1. **Aller dans Products** → **Create product**
2. Remplir :
   - **Name** : `Finance Tracker Premium`
   - **Description** : `Accès illimité aux insights IA, rapports détaillés et export PDF`
   - **Pricing** :
     - Type : `Recurring`
     - Price : `5 EUR`
     - Billing period : `Monthly`
3. **Créer le produit**
4. **Copier le Price ID** : `price_...` (commence par `price_`)

### 3️⃣ Configurer le webhook Stripe

1. **Aller dans Developers → Webhooks**
2. **Cliquer sur "Add endpoint"**
3. **Endpoint URL** : `https://votre-domaine.vercel.app/api/stripe/webhook`
4. **Description** : `Finance Tracker Production Webhook`
5. **Events to send** :
   - `checkout.session.completed`
   - `customer.subscription.created`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
   - `invoice.payment_succeeded`
   - `invoice.payment_failed`
6. **Add endpoint**
7. **Copier le Signing secret** : `whsec_...`

---

## 📦 Déploiement sur Vercel

### 1️⃣ Préparer le projet

```bash
# S'assurer que tout est commité
git add .
git commit -m "Production ready - Stripe live mode"
git push origin main
```

### 2️⃣ Déployer sur Vercel

#### Option A : Via le dashboard Vercel

1. **Aller sur** https://vercel.com
2. **Import project** depuis GitHub
3. **Sélectionner le repo** `Carrier Support`
4. **Framework Preset** : Next.js (auto-détecté)
5. **Root Directory** : `./` (par défaut)
6. **Build Command** : `npm run build` (par défaut)
7. **Output Directory** : `.next` (par défaut)

#### Option B : Via CLI

```bash
# Installer Vercel CLI
npm i -g vercel

# Se connecter
vercel login

# Déployer en production
vercel --prod
```

### 3️⃣ Configurer les variables d'environnement sur Vercel

**Aller dans votre projet Vercel → Settings → Environment Variables**

Ajouter ces variables pour **Production** :

| Variable | Valeur | Type |
|----------|--------|------|
| `NEXT_PUBLIC_SUPABASE_URL` | `https://xxx.supabase.co` | Plain Text |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | `eyJhbGc...` | Plain Text |
| `ANTHROPIC_API_KEY` | `sk-ant-...` | Secret |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | `pk_live_...` | Plain Text |
| `STRIPE_SECRET_KEY` | `sk_live_...` | **Secret** ⚠️ |
| `STRIPE_WEBHOOK_SECRET` | `whsec_...` | **Secret** ⚠️ |
| `STRIPE_PRICE_ID` | `price_...` | Plain Text |
| `NEXT_PUBLIC_APP_URL` | `https://votre-domaine.vercel.app` | Plain Text |

**Important** :
- ✅ Les secrets (`STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`, `ANTHROPIC_API_KEY`) doivent être en mode **Secret**
- ✅ Les variables `NEXT_PUBLIC_*` sont exposées au client (c'est normal)
- ✅ Après avoir ajouté les variables, **redéployer** l'application

### 4️⃣ Redéployer avec les nouvelles variables

```bash
# Via CLI
vercel --prod

# Ou via le dashboard
# Deployments → Redeploy → Use existing Build Cache (décoché)
```

---

## ✅ Vérifications post-déploiement

### 1. Tester le paiement Stripe

1. **Aller sur** `https://votre-domaine.vercel.app/pricing`
2. **Cliquer sur "Passer Premium"**
3. **Utiliser une vraie carte** (en production, plus de cartes de test)
4. **Vérifier** :
   - Redirection vers Stripe Checkout
   - Paiement réussi
   - Redirection vers `/dashboard`
   - Statut Premium activé

### 2. Vérifier les webhooks

1. **Aller dans Stripe** → **Developers** → **Webhooks**
2. **Cliquer sur votre endpoint**
3. **Onglet "Recent events"**
4. Vérifier que les événements sont reçus avec succès (code 200)

### 3. Tester les insights IA

1. **Se connecter au dashboard**
2. **Ajouter des transactions**
3. **Cliquer sur "Générer des insights IA"**
4. Vérifier que Claude AI fonctionne

### 4. Vérifier les logs

```bash
# Via CLI
vercel logs

# Ou via le dashboard
# Deployments → Select deployment → Logs
```

---

## 🔒 Sécurité en production

### Variables à NE JAMAIS commiter

❌ `.env.local` (déjà dans `.gitignore`)
❌ `.env.production`
❌ Tout fichier contenant des clés API

### Vérifier .gitignore

```bash
# Vérifier que ces fichiers sont ignorés
cat .gitignore | grep -E "\.env|\.env\.local"
```

Doit contenir :
```
.env
.env.local
.env.production
.env*.local
```

---

## 🌐 Configuration du domaine personnalisé (optionnel)

### 1. Acheter un domaine

- Namecheap, GoDaddy, Google Domains, etc.
- Ex: `financetracker.fr`

### 2. Configurer sur Vercel

1. **Projet Vercel** → **Settings** → **Domains**
2. **Add domain** : `financetracker.fr`
3. **Configurer les DNS** :
   - Type : `A`
   - Name : `@`
   - Value : `76.76.21.21` (IP Vercel)

   - Type : `CNAME`
   - Name : `www`
   - Value : `cname.vercel-dns.com`

4. **Attendre la propagation DNS** (5-60 minutes)

### 3. Mettre à jour les variables d'environnement

```
NEXT_PUBLIC_APP_URL=https://financetracker.fr
```

### 4. Mettre à jour Stripe webhook URL

```
https://financetracker.fr/api/stripe/webhook
```

---

## 📊 Monitoring en production

### Vercel Analytics (déjà installé ✅)

- **Dashboard** : https://vercel.com/analytics
- Métriques automatiques (visiteurs, performances, etc.)

### Stripe Dashboard

- **Paiements** : https://dashboard.stripe.com/payments
- **Clients** : https://dashboard.stripe.com/customers
- **Abonnements** : https://dashboard.stripe.com/subscriptions

### Supabase Dashboard

- **Utilisateurs** : https://supabase.com/dashboard → Authentication
- **Base de données** : https://supabase.com/dashboard → Database

---

## 🐛 Troubleshooting

### Problème : Webhook Stripe ne fonctionne pas

**Solution** :
1. Vérifier l'URL du webhook : `https://votre-domaine.vercel.app/api/stripe/webhook`
2. Vérifier que `STRIPE_WEBHOOK_SECRET` est correct sur Vercel
3. Vérifier les logs Stripe : Developers → Webhooks → Logs
4. Tester avec Stripe CLI :
   ```bash
   stripe listen --forward-to https://votre-domaine.vercel.app/api/stripe/webhook
   ```

### Problème : Variables d'environnement non chargées

**Solution** :
1. Vérifier qu'elles sont définies dans Vercel (Settings → Environment Variables)
2. Vérifier qu'elles sont pour **Production** (pas Preview ou Development)
3. **Redéployer** après avoir ajouté/modifié des variables
4. Vérifier les logs : `vercel logs --follow`

### Problème : Paiement échoue

**Solution** :
1. Vérifier que `STRIPE_SECRET_KEY` commence bien par `sk_live_` (pas `sk_test_`)
2. Vérifier que `STRIPE_PRICE_ID` est un Price ID de production (`price_...`)
3. Vérifier les logs Stripe Dashboard

### Problème : IA Claude ne fonctionne pas

**Solution** :
1. Vérifier que `ANTHROPIC_API_KEY` est définie sur Vercel
2. Vérifier le quota Claude : https://console.anthropic.com
3. Vérifier les logs Vercel pour les erreurs API

---

## 📝 Checklist finale

- [ ] Clés Stripe de production configurées
- [ ] Price ID créé (5€/mois)
- [ ] Webhook Stripe configuré et testé
- [ ] Variables d'environnement Vercel définies
- [ ] Application déployée sur Vercel
- [ ] Test paiement réussi
- [ ] Webhooks reçus (code 200)
- [ ] IA Claude fonctionne
- [ ] Analytics Vercel actif
- [ ] Domaine personnalisé configuré (optionnel)
- [ ] SSL/HTTPS actif (automatique avec Vercel)
- [ ] Emails de confirmation testés

---

## 🎉 C'est prêt !

Votre application Finance Tracker est maintenant en production avec Stripe en mode live !

**Prochaines étapes** :
1. Partager le lien avec vos premiers utilisateurs
2. Monitorer les paiements et webhooks
3. Collecter les feedbacks
4. Itérer et améliorer

**Support** :
- Stripe : https://support.stripe.com
- Vercel : https://vercel.com/support
- Supabase : https://supabase.com/support
