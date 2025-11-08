# Guide de Déploiement - Finance Tracker

Ce guide vous accompagne pas à pas pour déployer votre application Finance Tracker en production.

## Prérequis

- [ ] Compte GitHub
- [ ] Compte Supabase (gratuit)
- [ ] Compte Vercel (gratuit)
- [ ] Compte OpenAI avec une clé API (optionnel)

## Étape 1 : Configuration de Supabase

### 1.1 Créer un projet Supabase

1. Allez sur [https://supabase.com](https://supabase.com)
2. Cliquez sur "Start your project"
3. Connectez-vous avec GitHub
4. Cliquez sur "New Project"
5. Remplissez les informations :
   - **Name** : finance-tracker (ou votre nom)
   - **Database Password** : Choisissez un mot de passe fort
   - **Region** : Choisissez la région la plus proche de vos utilisateurs
   - **Pricing Plan** : Free (gratuit)
6. Cliquez sur "Create new project"

### 1.2 Récupérer les credentials

Une fois le projet créé :
1. Allez dans "Settings" > "API"
2. Notez les informations suivantes :
   - **Project URL** : `https://xxxxx.supabase.co`
   - **anon public key** : `eyJhbGc...`

### 1.3 Configurer la base de données

1. Dans votre projet Supabase, allez dans "SQL Editor"
2. Cliquez sur "New query"
3. Ouvrez le fichier `supabase/schema.sql` de votre projet local
4. Copiez tout le contenu et collez-le dans l'éditeur SQL
5. Cliquez sur "Run" pour exécuter le script
6. Vous devriez voir un message de succès

### 1.4 Vérifier les tables

1. Allez dans "Table Editor"
2. Vérifiez que toutes les tables sont créées :
   - profiles
   - income_categories
   - expense_categories
   - incomes
   - expenses
   - debts
   - savings_goals
   - ai_insights
   - budgets

### 1.5 Configurer l'authentification (optionnel)

1. Allez dans "Authentication" > "Settings"
2. Configurez les paramètres souhaités :
   - **Enable email confirmation** : Recommandé pour la production
   - **Secure email change** : Recommandé
   - **Enable phone confirmation** : Si vous voulez l'auth par SMS

## Étape 2 : Configuration d'OpenAI (optionnel)

Si vous voulez activer les conseils IA :

1. Allez sur [https://platform.openai.com](https://platform.openai.com)
2. Créez un compte ou connectez-vous
3. Allez dans "API keys"
4. Cliquez sur "Create new secret key"
5. Copiez la clé (elle ne sera affichée qu'une fois !)
6. **Important** : Configurez des limites de dépenses dans "Billing" > "Limits"

**Note** : Sans clé OpenAI, l'application fonctionnera mais les conseils IA ne seront pas disponibles.

## Étape 3 : Préparer le code pour le déploiement

### 3.1 Pousser le code sur GitHub

```bash
# Initialiser git si ce n'est pas déjà fait
git init

# Ajouter tous les fichiers
git add .

# Créer le premier commit
git commit -m "Initial commit - Finance Tracker"

# Créer un repository sur GitHub et le lier
git remote add origin https://github.com/votre-username/finance-tracker.git

# Pousser le code
git branch -M main
git push -u origin main
```

### 3.2 Vérifier le fichier .gitignore

Assurez-vous que `.env.local` est dans votre `.gitignore` pour ne pas exposer vos clés !

## Étape 4 : Déploiement sur Vercel

### 4.1 Créer un compte Vercel

1. Allez sur [https://vercel.com](https://vercel.com)
2. Cliquez sur "Sign Up"
3. Connectez-vous avec GitHub

### 4.2 Importer le projet

1. Sur le dashboard Vercel, cliquez sur "Add New Project"
2. Importez votre repository GitHub "finance-tracker"
3. Vercel détectera automatiquement qu'il s'agit d'un projet Next.js

### 4.3 Configurer les variables d'environnement

Dans la section "Environment Variables" :

**Variables obligatoires :**
```
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGc...
```

**Variables optionnelles (pour l'IA) :**
```
OPENAI_API_KEY=sk-...
```

**Important** : Cliquez sur les trois environnements (Production, Preview, Development) pour que les variables soient disponibles partout.

### 4.4 Déployer

1. Cliquez sur "Deploy"
2. Attendez quelques minutes pendant le build
3. Une fois terminé, vous aurez une URL de production : `https://finance-tracker-xxxxx.vercel.app`

### 4.5 Configurer le domaine personnalisé (optionnel)

1. Dans les settings du projet Vercel, allez dans "Domains"
2. Ajoutez votre domaine personnalisé
3. Suivez les instructions pour configurer les DNS

## Étape 5 : Configuration post-déploiement

### 5.1 Tester l'application

1. Allez sur votre URL de production
2. Créez un compte de test
3. Vérifiez que toutes les fonctionnalités marchent :
   - [ ] Inscription
   - [ ] Connexion
   - [ ] Ajout de revenus
   - [ ] Ajout de dépenses
   - [ ] Création d'objectifs
   - [ ] Gestion des dettes
   - [ ] Génération de conseils IA (si configuré)

### 5.2 Configurer l'URL de redirect dans Supabase

1. Dans Supabase, allez dans "Authentication" > "URL Configuration"
2. Ajoutez votre URL de production dans "Site URL" :
   ```
   https://finance-tracker-xxxxx.vercel.app
   ```
3. Ajoutez aussi dans "Redirect URLs" :
   ```
   https://finance-tracker-xxxxx.vercel.app/**
   ```

### 5.3 Activer la confirmation par email (recommandé)

1. Dans Supabase, allez dans "Authentication" > "Email Templates"
2. Personnalisez les templates d'email si souhaité
3. Dans "Authentication" > "Settings", activez "Enable email confirmations"

## Étape 6 : Surveillance et maintenance

### 6.1 Monitoring Vercel

- Consultez l'onglet "Analytics" dans Vercel pour voir les statistiques
- Vérifiez les logs dans l'onglet "Functions" pour débugger

### 6.2 Monitoring Supabase

- Consultez "Database" > "Database" pour voir les performances
- Vérifiez les logs d'authentification dans "Authentication" > "Logs"

### 6.3 Coûts OpenAI

- Surveillez votre usage sur [https://platform.openai.com/usage](https://platform.openai.com/usage)
- Configurez des alertes de dépenses

## Étape 7 : Mises à jour

Pour déployer de nouvelles versions :

```bash
# Faire vos modifications
git add .
git commit -m "Description des changements"
git push

# Vercel déploiera automatiquement !
```

## Limites du plan gratuit

### Vercel Free
- 100 GB de bande passante / mois
- Domaines personnalisés illimités
- Certificats SSL automatiques
- **Largement suffisant pour débuter**

### Supabase Free
- 500 MB de stockage base de données
- 2 GB de bande passante / mois
- 50 000 utilisateurs authentifiés mensuels
- **Suffisant pour quelques centaines d'utilisateurs**

### OpenAI
- Pay-as-you-go
- Environ 0.03$ pour 1000 tokens avec GPT-4
- Un conseil coûte environ 0.05-0.10$
- **Budget de 5-10$ / mois pour commencer**

## Dépannage

### Problème : "Invalid API key" avec Supabase
**Solution** : Vérifiez que vous avez bien copié la clé `anon` et non la clé `service_role`

### Problème : Les utilisateurs ne peuvent pas se connecter
**Solution** : Vérifiez les Redirect URLs dans Supabase

### Problème : Les conseils IA ne fonctionnent pas
**Solution** :
1. Vérifiez que la clé OpenAI est correcte
2. Vérifiez votre crédit OpenAI
3. Regardez les logs dans Vercel > Functions

### Problème : Erreur 500 sur l'API
**Solution** : Consultez les logs dans Vercel > Functions pour voir l'erreur exacte

## Support

Si vous rencontrez des problèmes :
1. Consultez les logs Vercel
2. Consultez les logs Supabase
3. Vérifiez que toutes les variables d'environnement sont correctes

## Checklist finale

Avant de lancer en production :

- [ ] Base de données Supabase configurée
- [ ] RLS activé sur toutes les tables
- [ ] Variables d'environnement configurées dans Vercel
- [ ] Application déployée et fonctionnelle
- [ ] Confirmation email activée (recommandé)
- [ ] Tests de tous les flux utilisateurs
- [ ] Monitoring activé (Vercel + Supabase)
- [ ] Limites de dépenses configurées (OpenAI)
- [ ] Backup de la base de données configuré

Félicitations ! Votre application Finance Tracker est en production ! 🎉
