# 🏦 Import de Relevés Bancaires avec IA - Documentation

## Vue d'ensemble

Fonctionnalité **Premium** permettant d'importer automatiquement des transactions à partir de relevés bancaires (CSV, Excel) en utilisant l'IA Claude pour l'extraction et la catégorisation intelligente.

## Fonctionnalités

### ✨ Extraction automatique avec IA
- Parse intelligemment les relevés bancaires
- Détecte automatiquement :
  - Date des transactions
  - Descriptions
  - Montants (revenus/dépenses)
  - Catégories suggérées
  - Niveau de confiance de l'IA

### 📁 Formats supportés
- ✅ **CSV** (Comma-Separated Values)
- ✅ **Excel** (.xlsx, .xls)
- ⏳ **PDF** (à venir)
- ⏳ **Images** (OCR - à venir)

### 🎯 Interface utilisateur
1. **Upload** : Drag & drop ou sélection de fichier
2. **Analyse IA** : Claude extrait les transactions
3. **Preview** : Vérification et modification avant import
4. **Import** : Import en masse en base de données

### 🔒 Sécurité
- Réservé aux membres **Premium uniquement**
- Vérification du statut d'abonnement côté serveur
- RLS (Row Level Security) sur la table `imports`
- Fichiers traités en mémoire (non stockés)

## Architecture technique

### Stack
```
Frontend:
- react-dropzone: Upload drag & drop
- xlsx: Parsing Excel
- papaparse: Parsing CSV

Backend:
- Claude API (Anthropic): Extraction IA
- Supabase: Stockage transactions
- Next.js API Routes: Endpoints

Database:
- Table `transactions`: Stockage des transactions
- Table `imports`: Historique des imports
```

### Flow de données
```
1. User uploads file
   ↓
2. API /parse-bank-statement
   - Vérifie statut Premium
   - Extrait contenu (CSV/Excel)
   - Envoie à Claude pour parsing
   - Retourne transactions parsées
   ↓
3. User valide/modifie transactions
   ↓
4. API /import-transactions
   - Vérifie statut Premium
   - Insert en batch dans DB
   - Met à jour historique imports
```

## Installation

### 1. Dépendances NPM
```bash
npm install react-dropzone xlsx papaparse @anthropic-ai/sdk @radix-ui/react-checkbox
```

### 2. Variables d'environnement
Ajouter à `.env.local`:
```bash
ANTHROPIC_API_KEY=sk-ant-xxxxx
```

### 3. Migration Supabase
Exécuter la migration:
```bash
supabase/migrations/20250111000000_create_imports_table.sql
```

Ou via Supabase Dashboard → SQL Editor → Coller le contenu

### 4. Vérifier les permissions
S'assurer que la table `users` a une colonne `subscription_status`

## Utilisation

### Accès à la feature
```
URL: /dashboard/import
Requis: Statut Premium actif
```

### Exemple de relevé CSV
```csv
Date,Description,Montant
2025-01-15,CARREFOUR MARKET,-45.32
2025-01-14,SALAIRE JANVIER,2500.00
2025-01-13,EDF ELECTRICITE,-89.50
```

### Catégories disponibles
- Alimentation
- Transport
- Logement
- Santé
- Loisirs
- Shopping
- Salaire
- Autre
- Épargne
- Abonnements

## API Endpoints

### POST `/api/parse-bank-statement`
Parse un relevé bancaire avec l'IA

**Request:**
```typescript
FormData {
  file: File,
  userId: string
}
```

**Response:**
```json
{
  "transactions": [
    {
      "date": "2025-01-15",
      "description": "CARREFOUR MARKET",
      "amount": -45.32,
      "category": "Alimentation",
      "type": "expense",
      "confidence": 0.95
    }
  ],
  "count": 1
}
```

### POST `/api/import-transactions`
Importe les transactions validées

**Request:**
```json
{
  "userId": "uuid",
  "transactions": [...],
  "filename": "relevé.csv"
}
```

**Response:**
```json
{
  "success": true,
  "count": 42,
  "message": "42 transactions importées avec succès"
}
```

## Limites actuelles

### Formats non supportés
- ❌ PDF (extraction de texte complexe)
- ❌ Images (nécessite OCR)

**Solution temporaire**: Demander aux utilisateurs d'exporter leurs relevés en CSV/Excel depuis leur banque en ligne.

### Limites techniques
- Taille max fichier: **10 MB**
- Max tokens Claude: **4000** (environ 200-300 transactions)
- Rate limiting Claude API

## Améliorations futures

### Court terme
1. ✅ Support PDF (pdf-parse)
2. ✅ Support images (Tesseract.js OCR)
3. ✅ Détection automatique de doublons
4. ✅ Historique des imports avec preview
5. ✅ Export de rapport d'import (PDF)

### Moyen terme
1. Apprentissage personnalisé des catégories
2. Détection de patterns récurrents
3. Suggestions d'optimisation budget
4. Import automatique via connexion bancaire (Open Banking)

## Troubleshooting

### Erreur: "Fonctionnalité réservée aux membres Premium"
- Vérifier que `subscription_status = 'active'` dans la table `users`
- Vérifier que le webhook Stripe fonctionne

### Erreur: "Format non reconnu"
- S'assurer que le CSV/Excel a des colonnes Date, Description, Montant
- Vérifier l'encodage du fichier (UTF-8 recommandé)

### Erreur: "Aucune transaction trouvée"
- Claude n'a pas pu parser le format
- Vérifier le format du relevé
- Essayer d'exporter depuis la banque avec un format standard

### Faible confiance IA (<60%)
- Réviser manuellement ces transactions
- Le relevé peut avoir un format non-standard
- Certaines descriptions peuvent être ambiguës

## Support

Pour toute question ou problème:
- Email: support@financetrackers.app
- Documentation: /docs/bank-import
- Vidéo tutoriel: À venir

## Changelog

### v1.0.0 (2025-01-11)
- ✅ Support CSV/Excel
- ✅ Parsing IA avec Claude
- ✅ Preview et validation
- ✅ Import batch
- ✅ Historique imports
- ✅ Réservé Premium

### v1.1.0 (À venir)
- PDF support
- Image support (OCR)
- Détection doublons
- Export rapport
